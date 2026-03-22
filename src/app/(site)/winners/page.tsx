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

type SubmissionType = 'story' | 'poem' | 'art'

interface RunnerUpSubmission {
  id: string
  title: string
  creator: string
  type: SubmissionType
  category: string
  image?: string
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
}

const writingExcerpts = [
  'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
]

const runnerUps: RunnerUpSubmission[] = [
  {
    id: 'ru-001',
    title: 'The Word of Science',
    creator: 'Mohammad Tareq Jamiulahmadi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/f86f3a3a-0ee0-4303-b2f4-1faa88131f9b_The_Word_of_Science.pdf',
    excerpt: 'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  },
  {
    id: 'ru-002',
    title: 'The Dream of justice',
    creator: 'Sahra Amin',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/5ceb9329-2288-42dc-82fb-f26a4d9c924d_5_6325802926480562626.pdf',
    excerpt: 'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  },
  {
    id: 'ru-003',
    title: 'If I were a man',
    creator: 'Nilab Mohammadi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/b7cc0a80-ea90-4214-9b0c-e9f46f0c79b7_If_I_were_a_Man_Nilab_Mohammadi_.pdf',
    excerpt: 'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  },
  {
    id: 'ru-004',
    title: 'Shattered Souls',
    creator: 'Tayyaba Agha',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/fab3a84c-bd00-424d-8d9e-3f385cb136d3_Shattered_Souls.pdf',
    excerpt: 'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  },
  {
    id: 'ru-005',
    title: 'Where Memories Lie and Future Awaits',
    creator: 'Nahid Karimi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/dc5e51ed-744e-4dd3-8df9-22ecaac773f8_Where_memories_lie_and_the_future_awaits.pdf',
    excerpt: 'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  },
  {
    id: 'ru-006',
    title: 'Through The Crack',
    creator: 'Khumari Ayoub',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/68686376-93e0-44af-8421-9e907bd20658_Through_the_Crack.pdf',
    excerpt: 'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  },
  {
    id: 'ru-007',
    title: 'If it was up to me.',
    creator: 'Raihan Rahimi',
    type: 'poem',
    category: 'Poetry',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/faf1a5fd-8777-436d-8124-0cf4bf82998d_inbound3407067591840478139.pdf',
    excerpt: 'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  },
  {
    id: 'ru-008',
    title: 'Nowhere to Belong',
    creator: 'Angela Gulistani',
    type: 'art',
    category: 'Visual Art',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/e435dd53-0c38-4c83-b01c-01bc70834265__Artwork%20Nowhere%20to%20Belong.pdf',
    excerpt: 'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  },
  {
    id: 'ru-009',
    title: 'The Forbidden Kiss',
    creator: 'Angela Gulistani',
    type: 'art',
    category: 'Visual Art',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/1329df12-0340-4af5-9f6b-a4c6a68fca04_The%20kiss.pdf',
    excerpt: 'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  },
  {
    id: 'ru-010',
    title: 'The Book of Wings',
    creator: 'Angela Gulistani',
    type: 'art',
    category: 'Visual Art',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/b2fb427b-fb3e-4217-b55e-dc4279cc16b7_Artwork_%20The%20Book%20of%20Wings.pdf',
    excerpt: 'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  },
  {
    id: 'ru-011',
    title: 'Vertigo in Kabul',
    creator: 'Waheed Hamoon',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/9b92d49f-906e-432d-b5cb-4a3be3fba058_Vertigo_in_Kabul.pdf',
    excerpt: 'Professional-quality story.  Highly recommended.',
  },
  {
    id: 'ru-012',
    title: 'Beneath the Mulberry Tree',
    creator: 'Mursal Nader',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/a68688ab-5d87-446a-96bb-a6c462ac4fba_Beneath_the_Mulberry_Tree_By_Mursal_Nader.pdf',
    excerpt: 'Best of first 15 stories.  Highly recommended.',
  },
  {
    id: 'ru-013',
    title: 'A Mother\'s Sacrifice, A Daughter\'s shattered hope',
    creator: 'Kiramuddin Ahmadi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/d4a2e939-32f9-405c-b890-aef51108c3d8_A_Mothers_Sacrifice_A_daughters_Shattered_Hope.pdf',
    excerpt: 'Second-best of first 15.  Highly recommended (perhaps without illustrations)',
  },
  {
    id: 'ru-014',
    title: 'When Do We Mourn the Land?',
    creator: 'Tamanna Saidi',
    type: 'poem',
    category: 'Poetry',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/f4318d04-5b11-47a6-878b-ca4094858952_When_Do_We_Mourn_the_Land_.pdf',
    excerpt: 'Very strong poem.  Recommended.',
  },
  {
    id: 'ru-015',
    title: 'Threads of Home',
    creator: 'Farhad Khatibi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/c3e7fa58-292e-4682-b0d3-a455db98cf80_Threads_of_Home.pdf',
    excerpt: 'Professional-quality. Best submission so far? About Afghan beauty, not victimhood.',
  },
  {
    id: 'ru-016',
    title: 'Truth and Silence',
    creator: 'Karima Qias',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/20ad44be-63b2-4509-a78a-9eba902802b2_Truth_and_Silence_2025-10-30.pdf',
    excerpt: 'Takes place in Brussels -- interestingly different.  Recommended',
  },
  {
    id: 'ru-017',
    title: 'I am not Bechara',
    creator: 'Rana Safi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/9d088b6f-330c-4ac2-80d5-78634488ebeb_Rana_me_short_story.pdf',
    excerpt: 'Novelistic saga.  Recommended.',
  },
  {
    id: 'ru-018',
    title: 'Life without a signal in kabul',
    creator: 'Nilofar Sadat',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/dcb5e472-13ed-44dc-96ab-dcf36686e316_Life_without_a_signal_in_Kabul.pdf',
    excerpt: 'Tight, focused (Kabul without internet): recommended',
  },
  {
    id: 'ru-019',
    title: 'The keeper of silent things (Maryam)',
    creator: 'Sumaya Barakzai',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/52bb0f3b-cd7b-4a9b-b11b-66efc8f38552_The_Keeper_of_Silent_Things_Maryam_.pdf',
    excerpt: 'PRIZEWINNER',
  },
  {
    id: 'ru-020',
    title: 'There is still light',
    creator: 'Zinat Naderi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/3521459d-d22c-49be-a625-f22f9c29d592_Story.pdf',
    excerpt: 'Poem "There Is Still Light" recommended',
  },
  {
    id: 'ru-021',
    title: 'A Thousand and one lives: A tale of Patched Life in Three Pieces',
    creator: 'Hasina Zadran',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/bec34657-1838-4c4c-9edd-b2a1a7783131_A_thousand_and_One_Lives.pdf',
    excerpt: 'Little Match Girl -- recommended?  (Without illustrations)',
  },
  {
    id: 'ru-022',
    title: '«من و باران»',
    creator: 'Raihana Samimi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/55dabe58-66ac-4041-8934-463c883c9f47_inbound7860924487866546740.pdf',
    excerpt: 'Recommended for prize consideration:strong imagination, framing complex emotions about war- rain- place (kabul that is known to her anymore), finding peace in little things, hope for continuation... figuring out how to continue and rise out of despair! she finds ways to work through what she is f...',
  },
  {
    id: 'ru-023',
    title: 'من تنها ماندم',
    creator: 'Akhiba Tariq',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/ee805ce6-a2e1-410f-87bd-67bfd71309e1__.pdf',
    excerpt: 'Recommended: Framing extreme pain, loss, and lonliness. There is hope for a future, hope to continue living and building despite the teremendous amount of loss. Framing loss on a deeply personal way.',
  },
  {
    id: 'ru-024',
    title: 'زندگینامه ای من',
    creator: 'Ezzatullah Ehsani',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/101efffc-ea67-4419-ad4a-69b34ce82c7f__AutoRecovered_073143.pdf',
    excerpt: 'Recommended:on love, heartbreak, reframing kabul not as a city of conglict but memory, reminder that not all is related to war narratives but some simply write on unfulfilled love.',
  },
  {
    id: 'ru-025',
    title: 'فاطمه',
    creator: 'محمد فرامرز',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/2962c4db-7fa8-4f1a-9a32-04b88cfce7ea__.pdf',
    excerpt: 'Recommended:on earthquake, framing the depth of negative traditions, and the cost that the new generation is ready to pay for resisting these traditions. Resistance with cost, and value for life.',
  },
  {
    id: 'ru-026',
    title: 'قدم نو رسیده',
    creator: 'Fatima Mohammadi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/ab2f5194-eb69-4553-835b-28f99f9b91e2__-_.pdf',
    excerpt: 'Recommended:on love and marriage that were promising and proved otherwise. On devalued lives of women and girls. on violence that moves throough generations.... based on true story!',
  },
  {
    id: 'ru-027',
    title: 'دخترک آیینه',
    creator: 'Hosna Pari Sharifi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/eb3608f1-47d6-4a79-b74d-56c628941f93__.pdf',
    excerpt: 'Recommended:imaginative, using mirror as a symbol of fractured identity, blures lines of reality and psyche, losing onself in isolation and lonliness, inner dialogue.',
  },
  {
    id: 'ru-028',
    title: 'چشمان بی ترس',
    creator: 'Fahima Shafiq',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/61b850d0-d516-4aad-9345-00ef6f38efb1__1.pdf',
    excerpt: 'Recommended for prize consideration:On fearless eyes, told from the perspective of authority confronting resistance, focused on psychology of power, anger, and fragile masculinity behind the weapon. Framing that depth of oppression has made women fearless... bravery!',
  },
  {
    id: 'ru-029',
    title: 'پر از خالی',
    creator: 'Asia Sultani',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/510a88ed-6a2c-4555-9235-787f8ce3a2d4__.pdf',
    excerpt: 'Recommended:Full of emptiness, on memory and wound, bomb explosion, amnesia and on a mind that has been fractured by trauma... frames loss and the pain surrounding that... made me think of bodily imprisonment...',
  },
  {
    id: 'ru-030',
    title: 'Modern God',
    creator: 'Farkhunda Sadr',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/73f0dd0d-9233-476c-8f1a-5912b007734b_story.pdf',
    excerpt: 'Recommended: reimagines God through the language of algorithms, beauty standards, and visibility. On powerful methaphore of god,  modern one ( as a figure shaped by social media optics, and transactional success), the need to be seen at the cost of pain... God becomes projection, echo, interior v...',
  },
  {
    id: 'ru-031',
    title: 'ده روایت از یک شهر',
    creator: 'Zainab Husainzai',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/9fe52209-46e5-4ebc-b547-b34f9087dd85__.pdf',
    excerpt: 'Recommended: a fragmented portrait of Kabul 2025, on women as the moral spine of the city (teachers, mothers, daughters, brides, secret students, beauticians). On motherhood both sacred and burdened: to protect daughthers from the pain, isolation, imposed hijab ... on girls bravery and courage fo...',
  },
  {
    id: 'ru-032',
    title: 'Eyes That Listen',
    creator: 'Amina Yaqobi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/de2aad98-abe0-4beb-ad73-1414cc1dcdf9____.pdf',
    excerpt: 'Recommended: inspiring narrative from rejection and loss to empowerment and voice. space of motivational/biographical storytelling, delivering its message of resilience and hope with clarity and sincerity.',
  },
  {
    id: 'ru-033',
    title: 'Hidden blood',
    creator: 'Zainab Rahimi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/5ef7d996-e47d-46f6-a594-b4fcc557aabb__.pdf',
    excerpt: 'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  },
  {
    id: 'ru-034',
    title: 'The days of white-collared girls',
    creator: 'Sakina Ehsani',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/ce6ec835-3435-4b3c-a0f8-04260f7049fb_inbound3294205683223138722.pdf',
    excerpt: 'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  },
  {
    id: 'ru-035',
    title: 'The shrine that lives in me',
    creator: 'shokria Man sory',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/beddbcd8-ca90-4220-b15e-ed33434d5fb2__.pdf',
    excerpt: 'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  },
  {
    id: 'ru-036',
    title: 'A is like Abbas.',
    creator: 'Reza Aaghaaz',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/11fcc704-8874-4fa8-8cf1-6ccd235e194f__-_.pdf',
    excerpt: 'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  },
  {
    id: 'ru-037',
    title: 'Where are you, father?',
    creator: 'Raihaneh Karimi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/c0ab8c5a-70b9-4726-90f9-2bc8790e09c5__.pdf',
    excerpt: 'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  },
  {
    id: 'ru-038',
    title: 'Silent alley',
    creator: 'شهلا سامح',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/5527f113-12d4-438a-aacb-ac9f8e8499f9_inbound4448682748260920432.pdf',
    excerpt: 'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  },
  {
    id: 'ru-039',
    title: 'A house beyond borders',
    creator: 'Nik Mohammad Shirzad',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/496b0392-ee2f-4e88-b08e-688c0229254b_inbound6884060405355676646.pdf',
    excerpt: 'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  },
  {
    id: 'ru-040',
    title: 'When the word crime is written: Literature of women\'s consumption as if it were the truth',
    creator: 'Fatema Karimi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/8616fd9a-c4e0-45f3-aada-925b1ee8093d__.pdf',
    excerpt: 'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  },
  {
    id: 'ru-041',
    title: 'Batur',
    creator: 'Masih Mojahed',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/d6bf29dd-e171-4bd1-95ae-cd0dd2e481fe_.pdf',
    excerpt: 'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  },
  {
    id: 'ru-042',
    title: 'Cold silence',
    creator: 'Aysha Qasemi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/b163c70d-3100-4942-b899-7fa3f9a12430__.pdf',
    excerpt: 'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  },
  {
    id: 'ru-043',
    title: 'The principle of every love',
    creator: 'Parwiz Mohammadi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/944622a9-4af0-437b-aa91-c265b4c8b79a__.pdf',
    excerpt: 'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  },
  {
    id: 'ru-044',
    title: 'Two in the morning at the airport.',
    creator: 'Fatema Rahimi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/44d629c5-8857-4b05-869a-d652dab38a85_inbound5398856079750140549.pdf',
    excerpt: 'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  },
  {
    id: 'ru-045',
    title: 'Living on your own beliefs',
    creator: 'amina hassina faqir',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/3a89e583-d77a-4203-87c2-e095cee6f225_Amina-Hassania-Faqir.pdf',
    excerpt: 'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  },
  {
    id: 'ru-046',
    title: 'نامه ای از آینده',
    creator: 'Mahboba Muhammadi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/1f9257f9-eae6-4b29-b430-ea5f153e7391__.pdf',
    excerpt: 'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  },
  {
    id: 'ru-047',
    title: 'The memories of coming Taliban and the difficulties of migration',
    creator: 'Anisa Ahmadi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/1ee77e41-b0fe-4a0f-8f81-c5edf23d145c__new_.pdf',
    excerpt: 'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  },
  {
    id: 'ru-048',
    title: 'The fallen walls',
    creator: 'Sayed adel Sadat',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/21c81039-537a-40d3-a465-b440ceef7f6b__.pdf',
    excerpt: 'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  },
  {
    id: 'ru-049',
    title: 'خوشحالی در قرنطینه‌ی اجباری',
    creator: 'Najla Zarifi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/9295319c-2bb7-440d-b620-646c1fc9ea68__.pdf',
    excerpt: 'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  },
  {
    id: 'ru-050',
    title: '«دختری در قفس شیشه‌ای با آرزوی تحصیل در دل برای رهایی از زندان (روایت پرندهٔ اسیر)»',
    creator: 'Farangiz Mohammadi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/57624973-2a0c-4ee3-b387-1760455acbcd__.pdf',
    excerpt: 'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  },
  {
    id: 'ru-051',
    title: 'رد پای خسته',
    creator: 'Farangis Rahimi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/aa3e2a34-f95c-4499-92d6-0a8fd0d3b69f__.pdf',
    excerpt: 'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  },
  {
    id: 'ru-052',
    title: 'A Dream Behind the Fences رویایی پشت حصارها',
    creator: 'Rahima Mehrabi',
    type: 'poem',
    category: 'Poetry',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/38d794ba-3dcb-4dc6-be68-dd0c3ab0986b__.pdf',
    excerpt: 'In our house, the one window faced west. Every evening, my mother would stand there and recite the names of the cities she still hoped to see.',
  },
  {
    id: 'ru-053',
    title: 'آنسوی مرز',
    creator: 'عزیزه احدی',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/806de570-416d-4de3-b463-5db3476c9870__1.pdf',
    excerpt: 'I wrote your name on seven envelopes and posted none of them. Some grief folds itself neatly, then waits in a drawer for a country to return.',
  },
  {
    id: 'ru-054',
    title: 'کبوتری در آرزوی پرواز با عقاب.',
    creator: 'Latifa Sadeqi',
    type: 'story',
    category: 'Story',
    fileUrl: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/story-pdfs/9d6bab62-ae0f-4b1b-91db-59672258559d__1.pdf',
    excerpt: 'We crossed with pockets full of keys and no doors left to open. Still, my father said: carry them. One day, even metal will remember.',
  },
]

const featuredWinners: FeaturedWinner[] = [
  {
    rank: 'First Place',
    title: 'When the Apricots Returned',
    creator: 'A. Rahimi',
    summary:
      'A reflective narrative on memory and return, this piece stood out for its emotional precision, original voice, and layered storytelling.',
    image:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/about/wmremove-transformed.png',
    tag: '01',
  },
  {
    rank: 'Second Place',
    title: 'Threads of Kabul',
    creator: 'M. Ahmadi',
    summary:
      'Through vivid imagery and composition, this work bridges personal memory with collective history and offers a powerful visual statement.',
    image:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/judges/Lotfullah.jpg',
    tag: '02',
  },
  {
    rank: 'Third Place',
    title: 'After the Checkpoint',
    creator: 'N. Wafa',
    summary:
      'A concise and deeply resonant piece that balances restraint and intensity while capturing displacement, dignity, and hope.',
    image:
      'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/judges/Adam.png',
    tag: '03',
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
          'sticky top-0 h-svh max-h-[100dvh]',
          panelClassName || 'overflow-hidden'
        )}>
        {children}
      </motion.div>
    </section>
  )
}

export default function WinnersPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [openWinnerBook, setOpenWinnerBook] = useState<Record<string, boolean>>({})
  const [submittedHotspots, setSubmittedHotspots] =
    useState<SubmissionHotspot[]>(fallbackSubmittedHotspots)

  const activeSubmission = useMemo(
    () => runnerUps.find((item) => item.id === activeId) ?? null,
    [activeId]
  )

  const toggleWinnerBook = (rank: FeaturedWinner['rank']) => {
    setOpenWinnerBook((prev) => ({
      ...prev,
      [rank]: !prev[rank],
    }))
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

          <div className='order-2 flex min-h-0 flex-1 flex-col pt-4 lg:order-1 lg:col-span-4 lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:justify-center lg:pt-0'>
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

            <div className='mt-4 min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-y-contain pr-1 lg:mt-7 lg:max-h-[45svh] lg:flex-none'>
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

      {featuredWinners.map((winner, winnerIndex) => (
        <ScrollUnmaskSection
          key={winner.rank}
          containerClassName='bg-[#efefef] dark:bg-gray-900'
          onUnmaskComplete={() => fireWinnerPlaceConfetti(winner.rank)}>
          <article className='relative bg-[#efefef] dark:bg-gray-900 min-h-screen overflow-hidden px-4 md:px-8 lg:px-10'>
            <div className='h-full min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-4 md:px-12 py-14 md:py-20'>
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
                  <div
                    className={`absolute inset-0 rounded-[12px] bg-[#f8f7f3] dark:bg-gray-800 px-5 md:px-8 py-5 md:py-8 overflow-hidden transition-opacity duration-300 ${
                      openWinnerBook[winner.rank] ? 'opacity-100' : 'opacity-0'
                    }`}>
                    <p className='text-[11px] md:text-xs uppercase tracking-[0.22em] text-black/60 dark:text-white/65'>
                      {winner.rank} Writing
                    </p>
                    <h3 className='mt-3 text-xl md:text-2xl font-semibold text-black dark:text-white'>
                      {winner.title}
                    </h3>
                    <p className='mt-1 text-sm md:text-base text-black/75 dark:text-white/75'>
                      by {winner.creator}
                    </p>
                    <p className='mt-5 text-sm md:text-base leading-relaxed text-black/80 dark:text-white/80'>
                      {winner.summary}
                    </p>
                    <p className='mt-4 text-sm md:text-base leading-relaxed text-black/80 dark:text-white/80 italic'>
                      {writingExcerpts[winnerIndex % writingExcerpts.length]}
                    </p>
                  </div>

                  <motion.button
                    type='button'
                    onClick={() => toggleWinnerBook(winner.rank)}
                    aria-label={`Open or close ${winner.rank} winner book`}
                    animate={{ rotateY: openWinnerBook[winner.rank] ? -165 : 0 }}
                    transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                    className='absolute inset-0 origin-left [transform-style:preserve-3d] cursor-pointer'>
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
                        <p className='mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/85'>
                          Tap to {openWinnerBook[winner.rank] ? 'close' : 'open'}
                        </p>
                      </div>
                    </div>

                    <div className='absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-l-[12px] bg-[#ebe8df] dark:bg-gray-800 px-5 md:px-8 py-6 text-left'>
                      <p className='text-[11px] md:text-xs uppercase tracking-[0.2em] text-black/65 dark:text-white/70'>
                        Inside Cover
                      </p>
                      <p className='mt-4 text-base md:text-lg leading-relaxed text-black/80 dark:text-white/80'>
                        This selected piece reflects craft, honesty, and narrative depth. Continue reading on the right page.
                      </p>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </article>
        </ScrollUnmaskSection>
      ))}

      <ScrollUnmaskSection containerClassName='bg-[#efefef] dark:bg-gray-900'>
      <section className='relative flex h-full min-h-0 w-full flex-col overflow-hidden px-5 md:px-10 pt-24 md:pt-28 pb-10'>
        {/* Preview canvas */}
        <div className='absolute inset-0 pl-5 md:pl-[360px] lg:pl-[420px] pr-5 md:pr-10 pt-24 md:pt-28 pb-10 pointer-events-none'>
          <AnimatePresence mode='wait'>
            {activeSubmission ? (
              <motion.div
                key={activeSubmission.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className='w-full h-full flex items-center justify-center'>
                {activeSubmission.type === 'art' && activeSubmission.image ? (
                  <div className='relative w-full max-w-[980px] h-[72vh] max-h-[640px]'>
                    <Image
                      src={activeSubmission.image}
                      alt={activeSubmission.title}
                      fill
                      className='object-cover'
                      priority
                    />
                  </div>
                ) : (
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
                )}
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
        <div className='relative z-10 flex min-h-0 w-full max-w-[320px] flex-1 flex-col md:max-w-[360px]'>
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
              return (
                <button
                  key={submission.id}
                  type='button'
                  onMouseEnter={() => setActiveId(submission.id)}
                  onFocus={() => setActiveId(submission.id)}
                  onClick={() => setActiveId(submission.id)}
                  className='w-full text-left border-b border-black/10 dark:border-white/15 py-2.5 md:py-2 transition-opacity'>
                  <div className='grid grid-cols-[1fr_auto_auto] gap-3 items-center'>
                    <p
                      className={`text-[11px] md:text-xs leading-tight uppercase tracking-wide ${
                        isActive
                          ? 'text-black dark:text-white'
                          : 'text-black/65 dark:text-white/70 hover:text-black dark:hover:text-white'
                      }`}>
                      {submission.title}
                    </p>
                    <span className='text-[10px] md:text-[11px] uppercase text-black/45 dark:text-white/45'>
                      {submission.type === 'art'
                        ? 'Visual'
                        : submission.type === 'poem'
                          ? 'Poem'
                          : 'Story'}
                    </span>
                    <span className='text-[10px] md:text-[11px] text-black/45 dark:text-white/45 tabular-nums'>
                      {String(index + 1).padStart(3, '0')}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>
      </ScrollUnmaskSection>

      {/* Mobile fallback details */}
      <section className='md:hidden px-5 pb-14'>
        <div className='rounded-lg border border-black/10 dark:border-white/15 p-4'>
          <p className='text-xs uppercase tracking-[0.18em] text-black/60 dark:text-white/70 mb-2'>
            Tap a title to preview
          </p>
          {activeSubmission && (
            <p className='text-sm text-black/80 dark:text-white/80'>
              {activeSubmission.title} by {activeSubmission.creator}
            </p>
          )}
        </div>
      </section>

      <SignatureReveal />
      </main>
    </>
  )
}
