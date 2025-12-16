import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

// Initialize Resend with API key validation
if (!process.env.RESEND_API_KEY) {
  console.warn('WARNING: RESEND_API_KEY is not set in environment variables')
}

const resend = new Resend(process.env.RESEND_API_KEY)

// Get from email address, defaulting to Resend's test domain
// Using a friendly sender name instead of "noreply" for better deliverability
const getFromEmail = () => {
  // Prefer notifications@ or submissions@ over noreply@ for better trust
  if (process.env.RESEND_FROM_EMAIL) {
    return process.env.RESEND_FROM_EMAIL
  }
  // Default to a friendly sender if no env var is set
  return 'notifications@athousandvoices.com'
}

// Get admin email address for notifications
const getAdminEmail = () => {
  return process.env.ADMIN_EMAIL || 'athousandvoices3@gmail.com'
}

export async function GET() {
  return NextResponse.json({ message: 'API is working' })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form data
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const country = formData.get('country') as string
    const city = formData.get('city') as string
    const storyTitle = formData.get('storyTitle') as string
    const storyLanguage = formData.get('storyLanguage') as string
    const consent = formData.get('consent') === 'true'
    const pdfFile = formData.get('pdfFile') as File

    // Validate required fields
    if (!firstName || !lastName || !email || !country || !city || !storyTitle || !storyLanguage || !consent || !pdfFile) {
      return NextResponse.json({ 
        error: 'All fields are required' 
      }, { status: 400 })
    }

    // Generate a proper UUID
    const submissionId = crypto.randomUUID()

    // Sanitize filename to remove special characters that Supabase doesn't allow
    const sanitizeFileName = (fileName: string) => {
      return fileName
        .replace(/[^\w\s.-]/g, '') // Remove special characters except word chars, spaces, dots, hyphens
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .substring(0, 100) // Limit length to prevent issues
    }

    // Upload PDF file to Supabase Storage
    const fileName = `${submissionId}_${sanitizeFileName(pdfFile.name)}`
    const { data: fileData, error: fileError } = await supabaseAdmin.storage
      .from('story-pdfs')
      .upload(fileName, pdfFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (fileError) {
      console.error('File upload error:', fileError)
      return NextResponse.json({ 
        error: 'Failed to upload file' 
      }, { status: 500 })
    }

    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('story-pdfs')
      .getPublicUrl(fileName)

    // Store submission data in database
    const { data: submissionData, error: dbError } = await supabaseAdmin
      .from('submissions')
      .insert([
        {
          id: submissionId,
          first_name: firstName,
          last_name: lastName,
          email: email,
          country: country,
          city: city,
          story_title: storyTitle,
          story_language: storyLanguage,
          consent: consent,
          pdf_file_path: publicUrl,
          submission_date: new Date().toISOString(),
          status: 'pending'
        }
      ])
      .select()

    if (dbError) {
      console.error('Database error details:', dbError)
      return NextResponse.json({ 
        error: 'Failed to save submission',
        details: dbError
      }, { status: 500 })
    }

    // Send email to admin
    let adminEmailError: any = null
    let adminEmailSent = false
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is not configured')
      }

      const adminEmail = getAdminEmail()
      console.log('Attempting to send admin notification email to:', adminEmail)

      const adminEmailResult = await resend.emails.send({
        from: getFromEmail(),
        to: [adminEmail],
        subject: `New Story Submission: ${storyTitle}`,
        html: `
          <h2>New Story Submission Received</h2>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
          <p><strong>Author:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Location:</strong> ${city}, ${country}</p>
          <p><strong>Story Title:</strong> ${storyTitle}</p>
          <p><strong>Language:</strong> ${storyLanguage}</p>
          <p><strong>File:</strong> <a href="${publicUrl}" rel="noopener noreferrer">Download PDF</a></p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">This is an automated notification from A Thousand Voices. The PDF file is stored securely in our system.</p>
        `
      })
      
      // Check for Resend API errors
      if (adminEmailResult.error) {
        throw new Error(adminEmailResult.error.message || 'Failed to send admin email')
      }
      
      adminEmailSent = true
      console.log('Admin email sent successfully:', {
        emailId: adminEmailResult.data?.id || 'No ID returned',
        recipient: adminEmail,
        from: getFromEmail()
      })
    } catch (emailError: any) {
      adminEmailError = emailError
      adminEmailSent = false
      console.error('Admin email error:', {
        message: emailError?.message || 'Unknown error',
        name: emailError?.name,
        statusCode: emailError?.statusCode,
        response: emailError?.response,
        error: emailError?.error,
        recipient: getAdminEmail()
      })
      
      // Log specific Resend error details if available
      if (emailError?.response) {
        console.error('Admin email - Resend API response:', JSON.stringify(emailError.response, null, 2))
      }
    }

    // Send confirmation email to user
    let userEmailError: any = null
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY is not configured')
      }

      const userEmailResult = await resend.emails.send({
        from: getFromEmail(),
        to: [email],
        subject: 'Your Story Submission - A Thousand Voices',
        html: `
          <h2>Thank you for your submission!</h2>
          <p>Dear ${firstName},</p>
          <p>We have successfully received your story submission "<strong>${storyTitle}</strong>".</p>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
          <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
          <p>Our team will review your story and get back to you within 2-3 weeks. Please keep this submission ID for reference.</p>
          <p>Thank you for sharing your voice with A Thousand Voices!</p>
          <br>
          <p>Best regards,<br>The A Thousand Voices Team</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">If you have any questions, please reply to this email or contact us at <a href="mailto:${getAdminEmail()}">${getAdminEmail()}</a></p>
        `
      })
      
      if (userEmailResult.error) {
        throw new Error(userEmailResult.error.message || 'Failed to send user email')
      }
      
      console.log('User email sent successfully:', userEmailResult.data?.id || 'No ID returned')
    } catch (emailError: any) {
      userEmailError = emailError
      console.error('User email error:', {
        message: emailError?.message || 'Unknown error',
        name: emailError?.name,
        statusCode: emailError?.statusCode,
        response: emailError?.response,
        recipient: email
      })
      
      // Log specific Resend error details if available
      if (emailError?.response) {
        console.error('Resend API response:', JSON.stringify(emailError.response, null, 2))
      }
    }

    console.log('Story submitted successfully:', submissionId)

    // Log email status summary
    if (userEmailError) {
      console.warn(`⚠️  User confirmation email failed for submission ${submissionId}:`, userEmailError?.message)
    } else {
      console.log(`✅ User confirmation email sent successfully for submission ${submissionId}`)
    }
    
    if (adminEmailError || !adminEmailSent) {
      console.warn(`⚠️  Admin notification email failed for submission ${submissionId}:`, adminEmailError?.message || 'Unknown error')
      console.warn(`   Admin email address used: ${getAdminEmail()}`)
    } else {
      console.log(`✅ Admin notification email sent successfully for submission ${submissionId} to ${getAdminEmail()}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Story submitted successfully',
      submissionId: submissionId,
      data: submissionData[0],
      // Include email status in development for debugging
      ...(process.env.NODE_ENV === 'development' && {
        emailStatus: {
          userEmailSent: !userEmailError,
          adminEmailSent: !adminEmailError,
          userEmailError: userEmailError?.message || null,
          adminEmailError: adminEmailError?.message || null
        }
      })
    })

  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 