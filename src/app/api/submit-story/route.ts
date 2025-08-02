import { NextRequest, NextResponse } from 'next/server'
import { sendStorySubmissionEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Extract form fields
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const email = formData.get('email') as string
    const country = formData.get('country') as string
    const city = formData.get('city') as string
    const storyTitle = formData.get('storyTitle') as string
    const storyLanguage = formData.get('storyLanguage') as string
    const consent = formData.get('consent') as string
    
    // Get the PDF file
    const pdfFile = formData.get('pdfFile') as File
    
    // Validate required fields
    if (!firstName || !lastName || !email || !country || !city || !storyTitle || !storyLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    if (!pdfFile) {
      return NextResponse.json(
        { error: 'PDF file is required' },
        { status: 400 }
      )
    }
    
    // Validate file type
    if (pdfFile.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      )
    }
    
    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (pdfFile.size > maxSize) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }
    
    // Validate consent
    if (consent !== 'true') {
      return NextResponse.json(
        { error: 'You must agree to the terms and conditions' },
        { status: 400 }
      )
    }
    
    // Generate submission ID
    const submissionId = `STORY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Here you would typically:
    // 1. Save the PDF file to your storage (e.g., AWS S3, Google Cloud Storage, or local filesystem)
    // 2. Save the form data to your database
    // 3. Send confirmation emails
    // 4. Log the submission
    
    // For now, we'll simulate a successful submission
    console.log('Story submission received:', {
      author: `${firstName} ${lastName}`,
      email,
      location: `${city}, ${country}`,
      story: {
        title: storyTitle,
        language: storyLanguage,
        fileName: pdfFile.name,
        fileSize: pdfFile.size
      },
      submissionId
    })
    
    // Send confirmation email
    try {
      await sendStorySubmissionEmail({
        firstName,
        lastName,
        email,
        storyTitle,
        submissionId
      })
      console.log('Confirmation email sent successfully')
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError)
      // Don't fail the submission if email fails, but log it
    }
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    return NextResponse.json({
      success: true,
      message: 'Your story has been submitted successfully!',
      submissionId
    })
    
  } catch (error) {
    console.error('Error processing story submission:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 