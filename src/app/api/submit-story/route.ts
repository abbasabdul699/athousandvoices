import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

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

    // Generate unique submission ID
    const submissionId = `STORY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

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

    // Store submission data in database - only include required fields
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