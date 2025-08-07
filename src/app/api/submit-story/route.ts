import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Upload PDF file to Supabase Storage
    const fileName = `${submissionId}_${pdfFile.name}`
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
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev', // Use Resend's test domain
        to: ['admin@athousandvoices.com'],
        subject: `New Story Submission: ${storyTitle}`,
        html: `
          <h2>New Story Submission Received</h2>
          <p><strong>Submission ID:</strong> ${submissionId}</p>
          <p><strong>Author:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Location:</strong> ${city}, ${country}</p>
          <p><strong>Story Title:</strong> ${storyTitle}</p>
          <p><strong>Language:</strong> ${storyLanguage}</p>
          <p><strong>File:</strong> <a href="${publicUrl}">Download PDF</a></p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `
      })
      console.log('Admin email sent successfully')
    } catch (emailError) {
      console.error('Admin email error:', emailError)
    }

    // Send confirmation email to user
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev', // Use Resend's test domain
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
        `
      })
      console.log('User email sent successfully')
    } catch (emailError) {
      console.error('User email error:', emailError)
    }

    console.log('Story submitted successfully:', submissionId)

    return NextResponse.json({ 
      success: true, 
      message: 'Story submitted successfully',
      submissionId: submissionId,
      data: submissionData[0]
    })

  } catch (error) {
    console.error('Submission error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 