import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Fetching images from Supabase...')
    
    // Fetch images from Supabase storage - using the correct bucket name
    const { data: images, error } = await supabase.storage
      .from('homepage')
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      })

    console.log('Supabase response:', { data: images, error })

    if (error) {
      console.error('Error fetching images:', error)
      return NextResponse.json({ error: 'Failed to fetch images', details: error }, { status: 500 })
    }

    if (!images || images.length === 0) {
      console.log('No images found in bucket')
      return NextResponse.json({ images: [] })
    }

    // Get public URLs for each image
    const imageUrls = images.map(image => {
      const { data: { publicUrl } } = supabase.storage
        .from('homepage')
        .getPublicUrl(image.name)
      
      console.log(`Generated URL for ${image.name}:`, publicUrl)
      
      return {
        name: image.name,
        url: publicUrl,
        alt: image.name.replace(/\.[^/.]+$/, '') // Remove file extension for alt text
      }
    })

    console.log('Final image URLs:', imageUrls)
    return NextResponse.json({ images: imageUrls })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error', details: error }, { status: 500 })
  }
}
