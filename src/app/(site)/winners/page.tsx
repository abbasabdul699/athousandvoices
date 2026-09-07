'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import FlyingPlaneHero from '@/app/components/winners/FlyingPlaneHero'
import SubmissionGlobe from '@/app/components/winners/SubmissionGlobe'
import SignatureReveal from '@/app/components/winners/SignatureReveal'
import { primeConfettiAudio } from '@/lib/confetti-sound'
import { fireWinnerPlaceConfetti } from '@/lib/winner-confetti'
import { cn } from '@/lib/utils'
import { winnerStories } from '@/content/winner-stories'

interface RunnerUpSubmission {
  id: string
  title: string
  creator: string
  fileUrl?: string
  excerpt: string
}

interface FeaturedWinner {
  rank: 'First Place' | 'Second Place' | 'Third Place'
  title: string
  creator: string
  summary: string
  image: string
  tag: string
  /** Full story split into pages (one string per page). Use `\\n\\n` for paragraph breaks within a page. If omitted, the reader uses the summary plus a sample excerpt as two pages. */
  pages?: string[]
  direction?: 'rtl' | 'ltr'
  lang?: string
}

const writingExcerpts = [
  'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
]

const runnerUps: RunnerUpSubmission[] = [
  {
    id: 'ru-001',
    title: 'ده روایت از یک شهر',
    creator: 'Z. H.',
    fileUrl: '',
    excerpt: 'A fragmented portrait of Kabul told through ten voices—teachers, mothers, daughters, and brides who carry the city\'s courage in ordinary days.',
  },
  {
    id: 'ru-002',
    title: 'The days of white-collared girls',
    creator: 'Sakina Ehsani',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/ce6ec835-3435-4b3c-a0f8-04260f7049fb_inbound3294205683223138722.pdf',
    excerpt: 'A vivid portrait of schoolgirls and the everyday bravery of learning, friendship, and hope—centered on one day that changed everything.',
  },
  {
    id: 'ru-003',
    title: 'A house beyond borders',
    creator: 'Nik Mohammad Shirzad',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/496b0392-ee2f-4e88-b08e-688c0229254b_inbound6884060405355676646.pdf',
    excerpt: 'A home beyond borders: a story of displacement and return, asking what we carry when the place we love can no longer hold us.',
  },
  {
    id: 'ru-004',
    title: 'The keeper of silent things (Maryam)',
    creator: 'Sumaya Barakzai',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/52bb0f3b-cd7b-4a9b-b11b-66efc8f38552_The_Keeper_of_Silent_Things_Maryam_.pdf',
    excerpt: 'Maryam tends to what others overlook—small objects, quiet grief, and the memories that refuse to be thrown away.',
  },
  {
    id: 'ru-005',
    title: 'When the word crime is written: Literature of women\'s consumption as if it were the truth',
    creator: 'Fatema Karimi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/8616fd9a-c4e0-45f3-aada-925b1ee8093d__.pdf',
    excerpt: 'A thoughtful reflection on literature, womanhood, and the power of words to name truths a society prefers to hide.',
  },
  {
    id: 'ru-006',
    title: 'The Word of Science',
    creator: 'Mohammad Tareq Jamiulahmadi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/f86f3a3a-0ee0-4303-b2f4-1faa88131f9b_The_Word_of_Science.pdf',
    excerpt: 'I was born in Khaja, a small village near Herat. Dust on the road, mulberry trees, quiet nights. My father\'s bookshelf stood like a small wall—and opened a world of science and wonder.',
  },
  {
    id: 'ru-007',
    title: 'If it was up to me.',
    creator: 'Raihan Rahimi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/faf1a5fd-8777-436d-8124-0cf4bf82998d_inbound3407067591840478139.pdf',
    excerpt: 'If it was up to me, I would love Afghanistan and embrace it hard. I would breathe in the smell of girls\' hair, listen to their footsteps, their throats singing.',
  },
  {
    id: 'ru-008',
    title: 'Nowhere to Belong',
    creator: 'Angela Gulistani',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/e435dd53-0c38-4c83-b01c-01bc70834265__Artwork%20Nowhere%20to%20Belong.pdf',
    excerpt: 'A moving visual exploration of displacement and belonging—where home is remembered in color, line, and longing.',
  },
  {
    id: 'ru-009',
    title: 'The Forbidden Kiss',
    creator: 'Angela Gulistani',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/1329df12-0340-4af5-9f6b-a4c6a68fca04_The%20kiss.pdf',
    excerpt: 'Bold visual storytelling that captures restraint, desire, and the quiet courage of a moment held in silence.',
  },
  {
    id: 'ru-010',
    title: 'The Book of Wings',
    creator: 'Angela Gulistani',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/b2fb427b-fb3e-4217-b55e-dc4279cc16b7_Artwork_%20The%20Book%20of%20Wings.pdf',
    excerpt: 'An imaginative artwork where wings become a symbol of freedom, memory, and the stories we carry across borders.',
  },
  {
    id: 'ru-011',
    title: 'Vertigo in Kabul',
    creator: 'Waheed Hamoon',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/9b92d49f-906e-432d-b5cb-4a3be3fba058_Vertigo_in_Kabul.pdf',
    excerpt: 'Kabul as it is—streets, sky, and daily life observed with clarity, where the city\'s vertigo is felt in the body as much as in the mind.',
  },
  {
    id: 'ru-012',
    title: 'When Do We Mourn the Land?',
    creator: 'Tamanna Saidi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/f4318d04-5b11-47a6-878b-ca4094858952_When_Do_We_Mourn_the_Land_.pdf',
    excerpt: 'A poem that asks when grief for the land becomes ceremony—and when silence is no longer enough.',
  },
  {
    id: 'ru-013',
    title: 'Threads of Home',
    creator: 'Farhad Khatibi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/c3e7fa58-292e-4682-b0d3-a455db98cf80_Threads_of_Home.pdf',
    excerpt: 'A tender story about Afghan beauty and belonging—woven from memory, family, and the threads that tie us to home.',
  },
  {
    id: 'ru-014',
    title: 'Truth and Silence',
    creator: 'Karima Qias',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/20ad44be-63b2-4509-a78a-9eba902802b2_Truth_and_Silence_2025-10-30.pdf',
    excerpt: 'Set in Brussels, a story of immigration, distance, and the truths we carry when home is far away.',
  },
  {
    id: 'ru-015',
    title: 'A Thousand and one lives: A tale of Patched Life in Three Pieces',
    creator: 'Hasina Zadran',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/bec34657-1838-4c4c-9edd-b2a1a7783131_A_thousand_and_One_Lives.pdf',
    excerpt: 'Three pieces of a patched life in Kabul—small flames of hope flickering against hardship, told with warmth and resilience.',
  },
  {
    id: 'ru-016',
    title: '«من و باران»',
    creator: 'Raihana Samimi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/55dabe58-66ac-4041-8934-463c883c9f47_inbound7860924487866546740.pdf',
    excerpt: 'Me and the rain: a story of finding peace in little things, and hope for continuation beyond a Kabul that is no longer familiar.',
  },
  {
    id: 'ru-017',
    title: 'من تنها ماندم',
    creator: 'Akhiba Tariq',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/ee805ce6-a2e1-410f-87bd-67bfd71309e1__.pdf',
    excerpt: 'I was left alone: a portrait of university students navigating loss, ordinary conversations, and the will to keep living.',
  },
  {
    id: 'ru-018',
    title: 'فاطمه',
    creator: 'محمد فرامرز',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/2962c4db-7fa8-4f1a-9a32-04b88cfce7ea__.pdf',
    excerpt: 'In the aftermath of an earthquake, a story about tradition, resistance, and the cost a new generation is willing to pay.',
  },
  {
    id: 'ru-019',
    title: 'قدم نو رسیده',
    creator: 'Fatima Mohammadi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/ab2f5194-eb69-4553-835b-28f99f9b91e2__-_.pdf',
    excerpt: 'A new step has arrived: a tender look at gender and welcome—the different worlds awaiting newborn boys and girls.',
  },
  {
    id: 'ru-020',
    title: 'چشمان بی ترس',
    creator: 'Fahima Shafiq',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/61b850d0-d516-4aad-9345-00ef6f38efb1__1.pdf',
    excerpt: 'Fearless eyes: told from the perspective of authority confronting resistance—a study in power, anger, and unbreakable courage.',
  },
  {
    id: 'ru-021',
    title: 'پر از خالی',
    creator: 'Asia Sultani',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/510a88ed-6a2c-4555-9235-787f8ce3a2d4__.pdf',
    excerpt: 'Full of emptiness: memory and wound after explosion—a mind fractured by trauma, searching for what was lost.',
  },
  {
    id: 'ru-022',
    title: 'Eyes That Listen',
    creator: 'Amina Yaqobi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/de2aad98-abe0-4beb-ad73-1414cc1dcdf9____.pdf',
    excerpt: 'An inspiring journey from rejection and loss to empowerment—a story of resilience, family, and finding one\'s voice.',
  },
  {
    id: 'ru-024',
    title: 'Where are you, father?',
    creator: 'Raihaneh Karimi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/c0ab8c5a-70b9-4726-90f9-2bc8790e09c5__.pdf',
    excerpt: 'Where are you, Father? On my last year of university, the days tasted of both ending and beginning—laughter with classmates, and the call to serve my community.',
  },
  {
    id: 'ru-025',
    title: 'Silent alley',
    creator: 'شهلا سامح',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/5527f113-12d4-438a-aacb-ac9f8e8499f9_inbound4448682748260920432.pdf',
    excerpt: 'I lean against the wall and watch from the window as neighbors carry a coffin through the alley toward the cemetery—a silent lane holding more grief than words.',
  },
  {
    id: 'ru-026',
    title: 'Batur',
    creator: 'Masih Mojahed',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/d6bf29dd-e171-4bd1-95ae-cd0dd2e481fe_.pdf',
    excerpt: 'After that day when the weight of my body fell onto my hands, even the ground felt too narrow. Yet in that cramped room, life still found room to breathe.',
  },
  {
    id: 'ru-027',
    title: 'Two in the morning at the airport.',
    creator: 'Fatema Rahimi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/44d629c5-8857-4b05-869a-d652dab38a85_inbound5398856079750140549.pdf',
    excerpt: 'Two in the morning at Imam Khomeini International Airport. The transit hall looked empty and cold—yet among the tired travelers, one Afghan girl still carried her dreams forward.',
  },
  {
    id: 'ru-028',
    title: 'The fallen walls',
    creator: 'Sayed adel Sadat',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/21c81039-537a-40d3-a465-b440ceef7f6b__.pdf',
    excerpt: 'The Fallen Walls: on a hot Helmand summer day, sunlight on a beloved face—and in a blink, the world went dark, and love learned how to survive ruin.',
  },
  {
    id: 'ru-029',
    title: 'خوشحالی در قرنطینه‌ی اجباری',
    creator: 'Najla Zarifi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/9295319c-2bb7-440d-b620-646c1fc9ea68__.pdf',
    excerpt: 'Happiness in forced quarantine: joy found even when the heart is confined, refusing to surrender light in life\'s darkness.',
  },
  {
    id: 'ru-030',
    title: '«دختری در قفس شیشه‌ای با آرزوی تحصیل در دل برای رهایی از زندان (روایت پرندهٔ اسیر)»',
    creator: 'Farangiz Mohammadi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/57624973-2a0c-4ee3-b387-1760455acbcd__.pdf',
    excerpt: 'An inspiring story of a girl who dreams of education as freedom—a bird in a glass cage still learning to sing.',
  },
  {
    id: 'ru-031',
    title: 'رد پای خسته',
    creator: 'Farangis Rahimi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/aa3e2a34-f95c-4499-92d6-0a8fd0d3b69f__.pdf',
    excerpt: 'Weary footsteps: a resilient journey traced in real, lived experience—proof that endurance itself can be a form of hope.',
  },
  {
    id: 'ru-032',
    title: 'A Dream Behind the Fences رویایی پشت حصارها',
    creator: 'Rahima Mehrabi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/38d794ba-3dcb-4dc6-be68-dd0c3ab0986b__.pdf',
    excerpt: 'A dream behind the fences: the story of a high-spirited girl who, on the path to her dreams, bears the pains of tradition—and still refuses to stop reaching.',
  },
  {
    id: 'ru-033',
    title: 'آنسوی مرز',
    creator: 'عزیزه احدی',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/806de570-416d-4de3-b463-5db3476c9870__1.pdf',
    excerpt: 'Beyond the border, my hands trembled like dry poplar branches. Dust rose to the sky and darkness fell—yet even in that grief, something in me kept walking forward.',
  },
  {
    id: 'ru-034',
    title: 'Cold silence',
    creator: 'Aysha Qasemi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/b163c70d-3100-4942-b899-7fa3f9a12430__.pdf',
    excerpt: 'Cold silence: snowy air, my sister\'s laughter behind me, and winter wind in my open hair—childhood persisting even when the season turns harsh.',
  },
  {
    id: 'ru-035',
    title: 'نامه ای از آینده',
    creator: 'Mahboba Muhammadi',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/1f9257f9-eae6-4b29-b430-ea5f153e7391__.pdf',
    excerpt: 'A letter from the future, from the year 2040, to a girl who never went silent: "In this dark night, someone must remain to keep the lantern lit."',
  },
]

function storyPagesForWinner(winner: FeaturedWinner, winnerIndex: number): string[] {
  if (winner.pages && winner.pages.length > 0) return winner.pages
  const imported = winnerStories[winner.rank]
  if (imported?.pages?.length) return imported.pages
  return [winner.summary, writingExcerpts[winnerIndex % writingExcerpts.length]]
}

function storyDirectionForWinner(winner: FeaturedWinner): 'rtl' | 'ltr' {
  if (winner.direction) return winner.direction
  return winnerStories[winner.rank]?.direction ?? 'ltr'
}

function storyLangForWinner(winner: FeaturedWinner): string | undefined {
  if (winner.lang) return winner.lang
  return winnerStories[winner.rank]?.lang
}

const featuredWinners: FeaturedWinner[] = [
  {
    rank: 'First Place',
    title: 'A is like Abbas',
    creator: 'R. Aaghaaz',
    summary:
      'An elderly man, isolated and forgotten by his family, clings to memories of his grandson Abbas through small treasured objects and imagined conversations. In his loneliness, he creates one final reunion—only for it to be revealed that Abbas has long been dead, and the visit was a reflection of his grief and longing.',
    image:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/firstplace(1).png',
    tag: '01',
    direction: winnerStories['First Place']?.direction,
    lang: winnerStories['First Place']?.lang,
  },
  {
    rank: 'Second Place',
    title: 'The Memories of Coming Taliban and the Difficulties of Migration',
    creator: 'A. Ahmadi',
    summary:
      'The Memories of the Taliban’s Return and the Hardships of Migration is about a young Afghan student, recounting the day the Taliban returned to power and the devastating impact it had on her life. Forced to abandon her education, home, and dreams, she and her family embark on a perilous journey across borders in search of safety and the chance to continue learning. Through vivid memories of fear, loss, resilience, and hope, the story captures the human cost of conflict, the struggles faced by refugees, and the enduring determination of Afghan girls to pursue education despite overwhelming obstacles.  ',
    image:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/secondplace.png',
    tag: '02',
    direction: winnerStories['Second Place']?.direction,
    lang: winnerStories['Second Place']?.lang,
  },
  {
    rank: 'Third Place',
    title: 'Beneath the Mulberry Tree',
    creator: 'M. Nader',
    summary:
      'Beneath the Mulberry Tree is an inspiring story that explores the transformative power of education across three generations of an Afghan family. Guided by the father’s unwavering belief in her potential—and inspired by the sacrifices of her grandfather—Mursal leaves Afghanistan to pursue an education abroad, eventually finding her voice as an advocate for women’s rights and earning a place in academia. Through memories of home, family, and the symbolic mulberry tree, the story reflects on resilience, identity, and the enduring legacy of those who fought to ensure that future generations would have the freedom to learn, dream, and choose their own paths.',
    image:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/winners/thirdplace.png',
    tag: '03',
    direction: winnerStories['Third Place']?.direction,
    lang: winnerStories['Third Place']?.lang,
  },
]

type SubmissionHotspot = {
  label: string
  lat: number
  lng: number
  submissions: number
}

const fallbackSubmittedHotspots: SubmissionHotspot[] = [
  { label: 'Kabul, Afghanistan', lat: 34.5553, lng: 69.2075, submissions: 63 },
  { label: 'Herat, Afghanistan', lat: 34.3529, lng: 62.204, submissions: 34 },
  { label: 'Toronto, Canada', lat: 43.6532, lng: -79.3832, submissions: 27 },
  { label: 'London, UK', lat: 51.5072, lng: -0.1276, submissions: 21 },
  { label: 'Berlin, Germany', lat: 52.52, lng: 13.405, submissions: 18 },
  { label: 'Istanbul, Turkey', lat: 41.0082, lng: 28.9784, submissions: 16 },
  { label: 'Islamabad, Pakistan', lat: 33.6844, lng: 73.0479, submissions: 14 },
  { label: 'Fremont, USA', lat: 37.5483, lng: -121.9886, submissions: 11 },
]

interface ScrollUnmaskSectionProps {
  children: React.ReactNode
  containerClassName?: string
  panelClassName?: string
  /** Fires once each time scroll progress crosses fully-unmasked (after user scrolls away and returns). */
  onUnmaskComplete?: () => void
}

function ScrollUnmaskSection({
  children,
  containerClassName = '',
  panelClassName = '',
  onUnmaskComplete,
}: ScrollUnmaskSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const unmaskCompleteFiredRef = useRef(false)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!onUnmaskComplete) return
    if (latest < 0.08) {
      unmaskCompleteFiredRef.current = false
      return
    }
    if (latest >= 0.35 && !unmaskCompleteFiredRef.current) {
      unmaskCompleteFiredRef.current = true
      onUnmaskComplete()
    }
  })

  const revealTop = useTransform(scrollYProgress, [0, 0.35, 1], [100, 0, 0])
  const clipPath = useMotionTemplate`inset(${revealTop}% 0% 0% 0%)`
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.35], [0.45, 0.85, 1])

  return (
    <section ref={sectionRef} className={`relative h-[170svh] ${containerClassName}`}>
      <motion.div
        style={{ clipPath, opacity }}
        className={cn(
          'pointer-events-none sticky top-0 h-svh max-h-[100dvh]',
          panelClassName || 'overflow-hidden'
        )}>
        <div className='h-full [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_select]:pointer-events-auto [&_textarea]:pointer-events-auto [&_.overflow-y-auto]:pointer-events-auto'>
          {children}
        </div>
      </motion.div>
    </section>
  )
}

export default function WinnersPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [openWinnerBook, setOpenWinnerBook] = useState<Record<string, boolean>>({})
  const [winnerBookPage, setWinnerBookPage] = useState<Record<string, number>>({})
  const [submittedHotspots, setSubmittedHotspots] =
    useState<SubmissionHotspot[]>(fallbackSubmittedHotspots)

  const activeSubmission = useMemo(
    () => runnerUps.find((item) => item.id === activeId) ?? null,
    [activeId]
  )

  const toggleWinnerBook = (rank: FeaturedWinner['rank']) => {
    setOpenWinnerBook((prev) => {
      const willOpen = !prev[rank]
      if (willOpen) {
        setWinnerBookPage((p) => ({ ...p, [rank]: 0 }))
      }
      return { ...prev, [rank]: willOpen }
    })
  }

  useEffect(() => {
    const onFirstGesture = () => {
      primeConfettiAudio()
    }
    window.addEventListener('pointerdown', onFirstGesture, { passive: true })
    window.addEventListener('keydown', onFirstGesture, { passive: true })
    return () => {
      window.removeEventListener('pointerdown', onFirstGesture)
      window.removeEventListener('keydown', onFirstGesture)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const loadSubmissionHotspots = async () => {
      try {
        const response = await fetch('/api/submission-hotspots')
        if (!response.ok) return

        const payload = (await response.json()) as { hotspots?: SubmissionHotspot[] }
        if (!isMounted || !payload.hotspots || payload.hotspots.length === 0) return

        setSubmittedHotspots(payload.hotspots)
      } catch {
        // Keep fallback hotspots if API is unavailable.
      }
    }

    loadSubmissionHotspots()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <>
      <main className='min-h-screen bg-[#efefef] dark:bg-gray-900'>
      <FlyingPlaneHero />

      <ScrollUnmaskSection containerClassName='bg-white dark:bg-gray-900'>
        <section className='flex h-full min-h-0 flex-col overflow-hidden bg-white text-black dark:bg-gray-900 dark:text-white px-5 py-8 md:px-10 md:py-12 lg:grid lg:grid-cols-12 lg:gap-10 lg:py-16'>
          <div className='order-1 flex shrink-0 justify-center lg:order-2 lg:col-span-8 lg:h-full lg:min-h-0'>
            <div className='aspect-square w-full max-w-[min(100%,400px)] max-h-[min(92vw,42svh)] shrink-0 sm:max-w-[440px] sm:max-h-[46svh] lg:mx-0 lg:aspect-auto lg:h-full lg:max-h-none lg:max-w-none lg:min-h-[460px] xl:min-h-[620px]'>
              <SubmissionGlobe hotspots={submittedHotspots} />
            </div>
          </div>

          <div className='order-2 flex min-h-0 flex-1 flex-col overflow-hidden pt-4 lg:order-1 lg:col-span-4 lg:h-full lg:min-h-0 lg:pt-0'>
            <div className='shrink-0'>
              <p className='text-[10px] md:text-xs uppercase tracking-[0.22em] text-black/65 dark:text-white/65'>
                Global Reach
              </p>
              <h2 className='mt-3 text-3xl md:text-5xl font-semibold tracking-tight'>
                Where submissions came from
              </h2>
              <p className='mt-5 text-sm md:text-base text-black/72 dark:text-white/72 leading-relaxed max-w-md'>
                Highlighted points mark locations where contestants submitted entries. Dot size reflects the relative submission count.
              </p>
            </div>

            <div className='mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-y-contain pr-1 lg:mt-7'>
              {submittedHotspots.map((spot) => (
                <div
                  key={spot.label}
                  className='border-b border-black/10 dark:border-white/10 pb-2'>
                  <p className='text-xs md:text-sm text-black/82 dark:text-white/82'>{spot.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollUnmaskSection>

      {featuredWinners.map((winner, winnerIndex) => {
        const storyPages = storyPagesForWinner(winner, winnerIndex)
        const bookPageIndex = Math.min(
          Math.max(0, winnerBookPage[winner.rank] ?? 0),
          Math.max(0, storyPages.length - 1),
        )
        const pageText = storyPages[bookPageIndex] ?? ''
        const pageParagraphs = pageText
          .trim()
          .split(/\n\n+/)
          .map((p) => p.trim())
          .filter(Boolean)
        const storyDirection = storyDirectionForWinner(winner)
        const storyLang = storyLangForWinner(winner)

        return (
        <ScrollUnmaskSection
          key={winner.rank}
          containerClassName='bg-[#efefef] dark:bg-gray-900'
          onUnmaskComplete={() => fireWinnerPlaceConfetti(winner.rank)}>
          <article className='relative bg-[#efefef] dark:bg-gray-900 min-h-screen overflow-hidden px-4 md:px-8 lg:px-10'>
            <div className='h-full min-h-screen grid grid-cols-1 gap-8 items-center px-4 py-14 max-lg:pt-[4.5rem] md:px-12 md:py-20 lg:grid-cols-12'>
              <div className='lg:col-span-6 max-w-xl'>
                <p className='text-xs md:text-sm uppercase tracking-[0.2em] text-black/65 dark:text-white/70'>
                  {winner.rank}
                </p>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-black dark:text-white'>
                  {winner.title}
                </h2>
                <p className='mt-3 text-base md:text-lg text-black/80 dark:text-white/80'>
                  by {winner.creator}
                </p>
                <p className='mt-6 text-[15px] md:text-lg leading-relaxed text-black/78 dark:text-white/78'>
                  {winner.summary}
                </p>
              </div>

              <div className='lg:col-span-6'>
                <div className='relative w-full max-w-[560px] ml-auto aspect-[3/4] md:aspect-[5/7] max-h-[780px] [perspective:2000px]'>
                  <motion.div
                    aria-hidden
                    className={cn(
                      'pointer-events-none absolute z-10 -translate-x-1 sm:translate-x-0',
                      'right-full top-6 mr-2 sm:mr-4 md:top-8 md:mr-5',
                      'hidden md:block',
                      'transition-opacity duration-300',
                      openWinnerBook[winner.rank] ? 'opacity-0' : 'opacity-100',
                    )}
                    animate={{ y: [0, -7, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
                    <div className='flex items-center gap-0'>
                      <p className='whitespace-nowrap text-right text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-black/72 sm:text-[11px] sm:tracking-[0.16em] dark:text-white/78'>
                        Click the book
                      </p>
                      <svg
                        width='72'
                        height='56'
                        viewBox='6 0 74 58'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='-ml-1 shrink-0 text-black/78 drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] dark:text-white/88 dark:drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]'
                        aria-hidden>
                        <path
                          d='M6 46 C 22 38 34 26 48 14 C 56 7 64 4 72 4'
                          stroke='currentColor'
                          strokeWidth='2.35'
                          strokeLinecap='round'
                          fill='none'
                        />
                        <path
                          d='M64 1 L 74 4 L 69 11'
                          stroke='currentColor'
                          strokeWidth='2.35'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          fill='none'
                        />
                      </svg>
                    </div>
                  </motion.div>
                  <div
                    className={cn(
                      'absolute inset-0 flex min-h-0 flex-col rounded-[12px] bg-[#f8f7f3] dark:bg-gray-800 px-5 md:px-8 py-5 md:py-8 transition-opacity duration-300',
                      openWinnerBook[winner.rank]
                        ? 'z-[4] opacity-100'
                        : 'z-0 opacity-0 pointer-events-none',
                    )}>
                    <div className='flex shrink-0 items-start justify-between gap-3'>
                      <div>
                        <p className='text-[11px] md:text-xs uppercase tracking-[0.22em] text-black/60 dark:text-white/65'>
                          {winner.rank} Writing
                        </p>
                        <h3 className='mt-2 text-lg md:text-xl font-semibold text-black dark:text-white'>
                          {winner.title}
                        </h3>
                        <p className='mt-0.5 text-xs md:text-sm text-black/70 dark:text-white/75'>
                          by {winner.creator}
                        </p>
                      </div>
                      <button
                        type='button'
                        onClick={() => toggleWinnerBook(winner.rank)}
                        className='shrink-0 rounded-full border border-black/15 bg-white/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/75 transition hover:bg-white dark:border-white/20 dark:bg-gray-900/80 dark:text-white/85 dark:hover:bg-gray-900'>
                        Close book
                      </button>
                    </div>
                    <div
                      dir={storyDirection}
                      lang={storyLang}
                      className={cn(
                        'mt-4 min-h-0 flex-1 overflow-y-auto overscroll-y-contain pr-1',
                        storyDirection === 'rtl' && 'pl-1 pr-0 font-[Vazirmatn,system-ui,sans-serif]',
                      )}
                      aria-live='polite'>
                      {pageParagraphs.map((para, i) => (
                        <p
                          key={`${bookPageIndex}-${i}`}
                          className={cn(
                            'text-sm md:text-base leading-relaxed text-black/82 dark:text-white/82 [&+&]:mt-4',
                            storyDirection === 'rtl' && 'text-right',
                          )}>
                          {para}
                        </p>
                      ))}
                    </div>
                    <div className='mt-4 flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4 dark:border-white/15'>
                      <p className='text-[10px] font-medium uppercase tracking-[0.16em] text-black/55 dark:text-white/60'>
                        Page {bookPageIndex + 1} of {storyPages.length}
                      </p>
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          disabled={bookPageIndex <= 0}
                          onClick={() =>
                            setWinnerBookPage((p) => ({
                              ...p,
                              [winner.rank]: Math.max(0, bookPageIndex - 1),
                            }))
                          }
                          className='min-h-9 min-w-[4.5rem] rounded-lg border border-black/15 bg-white/90 px-3 text-xs font-semibold text-black/80 transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:bg-gray-900/90 dark:text-white/85 enabled:dark:hover:bg-gray-900'>
                            Previous
                          </button>
                        <button
                          type='button'
                          disabled={bookPageIndex >= storyPages.length - 1}
                          onClick={() =>
                            setWinnerBookPage((p) => ({
                              ...p,
                              [winner.rank]: Math.min(storyPages.length - 1, bookPageIndex + 1),
                            }))
                          }
                          className='min-h-9 min-w-[4.5rem] rounded-lg border border-black/15 bg-white/90 px-3 text-xs font-semibold text-black/80 transition enabled:hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:bg-gray-900/90 dark:text-white/85 enabled:dark:hover:bg-gray-900'>
                            Next
                          </button>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    type='button'
                    onClick={() => toggleWinnerBook(winner.rank)}
                    aria-label={`Open or close ${winner.rank} winner book`}
                    animate={{ rotateY: openWinnerBook[winner.rank] ? -165 : 0 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className={cn(
                      'absolute inset-0 origin-left [transform-style:preserve-3d] cursor-pointer',
                      openWinnerBook[winner.rank] ? 'z-[2]' : 'z-[5]',
                    )}>
                    <div className='absolute inset-0 [backface-visibility:hidden] rounded-[12px] bg-white dark:bg-gray-700 overflow-hidden shadow-[0_16px_28px_rgba(0,0,0,0.2)]'>
                      <Image
                        src={winner.image}
                        alt={`${winner.rank} winner cover artwork`}
                        fill
                        className='object-cover'
                      />
                      {/* Tint + soft gloss for Apple Books-like card finish */}
                      <div className='absolute inset-0 bg-[linear-gradient(165deg,rgba(64,96,255,0.24)_0%,rgba(27,34,98,0.12)_52%,rgba(6,8,14,0.18)_100%)]' />
                      <div className='absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/35 to-transparent' />
                      {/* Apple Books-style spine */}
                      <div className='absolute inset-y-0 left-0 w-[28px] md:w-[36px] bg-gradient-to-r from-black/32 via-black/18 to-transparent' />
                      <div className='absolute inset-y-0 left-[2px] w-[1px] bg-white/45' />
                      <div className='absolute inset-y-0 left-[5px] w-[1px] bg-white/20' />
                      <div className='absolute inset-y-0 right-[1px] w-[1px] bg-white/30' />
                      <div className='absolute left-4 md:left-5 right-4 top-4 md:top-5 text-left'>
                        <p className='text-[22px] md:text-[30px] leading-[0.96] font-bold tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]'>
                          {winner.title}
                        </p>
                        <p className='mt-2 text-lg md:text-[30px] leading-none font-semibold text-black/90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.22)]'>
                          {winner.creator}
                        </p>
                      </div>
                      {!openWinnerBook[winner.rank] && (
                        <div className='pointer-events-none absolute inset-x-4 bottom-4 z-[1] md:hidden'>
                          <span className='block rounded-full border border-white/25 bg-black/50 px-3 py-2 text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.16em] text-white shadow-[0_4px_14px_rgba(0,0,0,0.35)] backdrop-blur-[6px]'>
                            Tap to open
                          </span>
                        </div>
                      )}
                    </div>

                    <div className='absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-l-[12px] bg-[#ebe8df] dark:bg-gray-800 px-5 md:px-8 py-6 text-left'>
                      <p className='text-[11px] md:text-xs uppercase tracking-[0.2em] text-black/65 dark:text-white/70'>
                        Title page
                      </p>
                      <p className='mt-5 text-xl md:text-2xl font-semibold leading-tight text-black dark:text-white'>
                        {winner.title}
                      </p>
                      <p className='mt-2 text-sm md:text-base text-black/75 dark:text-white/78'>
                        by {winner.creator}
                      </p>
                      <p className='mt-6 text-sm md:text-base leading-relaxed text-black/72 dark:text-white/75'>
                        The story begins on the facing page. Use <span className='font-medium'>Next</span> to turn the page.
                      </p>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </article>
        </ScrollUnmaskSection>
        )
      })}

      <ScrollUnmaskSection containerClassName='bg-[#efefef] dark:bg-gray-900'>
      <section className='relative flex h-full min-h-0 w-full flex-col overflow-hidden px-5 md:px-10 pt-24 md:pt-28 pb-10'>
        {/* Preview canvas (desktop hover only — mobile uses direct links in the list) */}
        <div className='pointer-events-none absolute inset-0 hidden pl-5 pt-24 pb-10 pr-5 md:block md:pl-[360px] md:pr-10 md:pt-28 lg:pl-[420px]'>
          <AnimatePresence mode='wait'>
            {activeSubmission ? (
              <motion.div
                key={activeSubmission.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className='w-full h-full flex items-center justify-center'>
                <div className='w-full max-w-[980px] h-[72vh] max-h-[640px] flex items-center justify-center px-8 md:px-16'>
                  <div className='max-w-3xl text-center'>
                    <p className='text-lg md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 italic'>
                      &ldquo;{activeSubmission.excerpt}&rdquo;
                    </p>
                    {activeSubmission.fileUrl && (
                      <a
                        href={activeSubmission.fileUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex mt-6 text-xs md:text-sm uppercase tracking-[0.16em] text-[#fabc68] hover:text-[#e3a952] transition-colors'>
                        Open submission
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key='idle'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='w-full h-full flex items-center justify-center'>
                <p className='text-xs uppercase tracking-[0.25em] text-black/30 dark:text-white/30'>
                  Hover a title to preview
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submission index list — scroll inside sticky viewport (parent is overflow-hidden h-svh) */}
        <div className='relative z-10 flex min-h-0 w-full max-w-none flex-1 flex-col md:max-w-[360px]'>
          <div className='mb-6 shrink-0'>
            <p className='text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/50 dark:text-white/60'>
              Runner-Up Selection
            </p>
          </div>

          <div
            onMouseLeave={() => setActiveId(null)}
            className='min-h-0 flex-1 overflow-y-auto overscroll-y-contain border-t border-black/15 dark:border-white/20 [scrollbar-gutter:stable]'>
            {runnerUps.map((submission, index) => {
              const isActive = submission.id === activeId
              const submissionHref = submission.fileUrl
              const indexLabel = String(index + 1).padStart(3, '0')

              const renderRowGrid = (forDesktop: boolean) => (
                <div className='grid grid-cols-[1fr_auto] gap-3 items-center'>
                  <p
                    className={cn(
                      'text-[11px] md:text-xs leading-tight uppercase tracking-wide',
                      forDesktop
                        ? isActive
                          ? 'text-black dark:text-white'
                          : 'text-black/65 dark:text-white/70 md:hover:text-black md:dark:hover:text-white'
                        : 'text-black/85 dark:text-white/88',
                    )}>
                    {submission.title}
                  </p>
                  <span className='text-[10px] md:text-[11px] text-black/45 dark:text-white/45 tabular-nums'>
                    {indexLabel}
                  </span>
                </div>
              )

              return (
                <div
                  key={submission.id}
                  className='border-b border-black/10 dark:border-white/15'>
                  {submissionHref ? (
                    <a
                      href={submissionHref}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='md:hidden block w-full py-2.5 text-left transition-opacity active:opacity-70'>
                      {renderRowGrid(false)}
                    </a>
                  ) : (
                    <div className='md:hidden py-2.5 opacity-60'>{renderRowGrid(false)}</div>
                  )}
                  <button
                    type='button'
                    onMouseEnter={() => setActiveId(submission.id)}
                    onFocus={() => setActiveId(submission.id)}
                    onClick={() => setActiveId(submission.id)}
                    className='hidden w-full text-left py-2.5 md:block md:py-2 transition-opacity'>
                    {renderRowGrid(true)}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      </ScrollUnmaskSection>

      <SignatureReveal />
      </main>
    </>
  )
}
