'use client'
import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import Header from './components/layout/header'
import Footer from './components/layout/footer/Footer'
import ScrollToTop from './components/scroll-to-top'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta name="description" content="A Thousand Voices - Amplifying Afghan storytellers and creating a platform for cultural exchange through literature. Join our global community of writers and cultural ambassadors." />
        <meta name="keywords" content="Afghan stories, storytelling, cultural exchange, literature, Afghan writers, diaspora, Project for Peace" />
        <meta name="author" content="A Thousand Voices" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="A Thousand Voices - Afghan Storytelling Platform" />
        <meta property="og:description" content="Amplifying Afghan storytellers and creating a platform for cultural exchange through literature." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://athousandvoices.com" />
        <meta property="og:image" content="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="A Thousand Voices - Afghan Storytelling Platform" />
        <meta name="twitter:description" content="Amplifying Afghan storytellers and creating a platform for cultural exchange through literature." />
        <meta name="twitter:image" content="https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/homepage/twitter-card.jpg" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://vncsjyedvqrhgeedwusw.supabase.co" />
        <link rel="dns-prefetch" href="https://vncsjyedvqrhgeedwusw.supabase.co" />
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute='class'
            enableSystem={false}
            defaultTheme='light'>
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
