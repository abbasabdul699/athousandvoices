import { NextResponse } from 'next/server'
import {
  avatar,
  brand,
  innovation,
  onlinePresence,
  creativeMind,
  WebResultTag,
  startupPlan,
  faq,
  achievements,
} from '@/app/types/menu'

const avatarList: avatar[] = [
  {
    image: '/images/home/avatar_1.jpg',
    title: 'Sarah Johnson',
  },
  {
    image: '/images/home/avatar_2.jpg',
    title: 'Olivia Miller',
  },
  {
    image: '/images/home/avatar_3.jpg',
    title: 'Sophia Roberts',
  },
  {
    image: '/images/home/avatar_4.jpg',
    title: 'Isabella Clark',
  },
]

const brandList: brand[] = [
  {
    image: '/images/home/brand/brand-peace.png',
    darkImg: '/images/home/brand/ProjectforPeace.png',
    title: 'Project for Peace',
  },
  {
    image: '/images/home/brand/ProjectforPeace.png',
    darkImg: '/images/home/brand/ProjectforPeace.png',
    title: 'Project for Peace',
  },
]

const innovationList: innovation[] = [
  {
    image: '/images/home/innovation/brand.svg',
    title: 'Brand\nStrategy',
    bg_color: 'bg-purple/20',
    txt_color: 'text-purple',
  },
  {
    image: '/images/home/innovation/digitalmarketing.svg',
    title: 'Digital\nMarketing',
    bg_color: 'bg-blue/20',
    txt_color: 'text-blue',
  },
  {
    image: '/images/home/innovation/uiux.svg',
    title: 'UI/UX\nDesign',
    bg_color: 'bg-orange/20',
    txt_color: 'text-orange',
  },
  {
    image: '/images/home/innovation/analitics.svg',
    title: 'Analytics &\nReporting',
    bg_color: 'bg-green/20',
    txt_color: 'text-green',
  },
  {
    image: '/images/home/innovation/webdevp.svg',
    title: 'Web\nDevelopment',
    bg_color: 'bg-pink/20',
    txt_color: 'text-pink',
  },
]

const onlinePresenceList: onlinePresence[] = [
  {
    image: '/images/home/onlinePresence/online_img_1.jpg',
    title: 'FlowBank',
    tag: ['UX Research', 'Interface Design'],
    link: 'https://www.wrappixel.com/',
  },
  {
    image: '/images/home/onlinePresence/online_img_2.jpg',
    title: 'Academy.co',
    tag: ['Product Design', 'Interaction Design'],
    link: 'https://www.wrappixel.com/',
  },
  {
    image: '/images/home/onlinePresence/online_img_3.jpg',
    title: 'Genome',
    tag: ['Brand identity design', 'UX Research'],
    link: 'https://www.wrappixel.com/',
  },
  {
    image: '/images/home/onlinePresence/online_img_4.jpg',
    title: 'Hotto',
    tag: ['Visual Storytelling', 'Web & Mobile Design'],
    link: 'https://www.wrappixel.com/',
  },
]

const creativeMindList: creativeMind[] = [
  {
    image: '/images/home/creative/Zakira.png',
    name: 'Zakira Baskhshi',
    position: 'President',
    linkedinLink: 'https://www.linkedin.com/in/zakira-bakhshi-5570811b2/',
  },
  {
    image: '/images/home/creative/Ahmad.png',
    name: 'Ahmadzia Momand',
    position: 'Outreach Coordinator',
    linkedinLink: 'https://www.linkedin.com/in/ahmadzia-momand-a6a343167/',
  },
  {
    image: '/images/home/creative/Abbas1.png',
    name: 'Abdul Abbas',
    position: 'Software Engineer',
    linkedinLink: 'https://www.linkedin.com/in/abdul-abbas-b78921122/',
  },
  {
    image: '/images/home/creative/tamana.png',
    name: 'Tamana Farewar',
    position: 'Board Member',
    linkedinLink: 'https://www.linkedin.com/in/tamana-farewar-21352a177/',
  },
  {
    image: '/images/home/creative/ethan.png',
    name: 'Ethan Schroyer',
    position: 'Board Member',
    linkedinLink: 'https://www.linkedin.com/in/ethan-schroyer-a63107238/',
  },
  {
    image: '/images/home/creative/Sadia.png',
    name: 'Sadia Ansari',
    position: 'Social Media Outreach',
    linkedinLink: 'https://www.linkedin.com/in/sadia-ansari-6a1653247/',
  },
]

const WebResultTagList: WebResultTag[] = [
  {
    image: '/images/home/result/creativity.svg',
    name: 'Creativity',
    bg_color: 'bg-purple/20',
    txt_color: 'text-purple',
  },
  {
    image: '/images/home/result/innovation.svg',
    name: 'Innovation',
    bg_color: 'bg-blue/20',
    txt_color: 'text-blue',
  },
  {
    image: '/images/home/result/strategy.svg',
    name: 'Strategy',
    bg_color: 'bg-orange/20',
    txt_color: 'text-orange',
  },
]

const startupPlanList: startupPlan[] = [
  {
    plan_bg_color: 'bg-pale-yellow',
    text_color: 'text-dark_black',
    descp_color: 'dark_black/60',
    border_color: 'border-dark_black/10',
    plan_name: 'Starter',
    plan_descp: 'For companies who need design support. One request at a time',
    plan_price: '$2500',
    icon_img: '/images/home/startupPlan/white_tick.svg',
    plan_feature: [
      'Design Updates Every 2 Days',
      'Mid-level Designer',
      'SEO optimization',
      'Monthly analytics',
      '2x Calls Per Month',
      'License free assets',
    ],
  },
  {
    plan_bg_color: 'bg-purple_blue',
    text_color: 'text-white',
    descp_color: 'white/60',
    border_color: 'border-white/10',
    plan_name: 'Pro',
    plan_descp: '2x the speed. Great for an MVP, Web App or complex problem',
    plan_price: '$3800',
    icon_img: '/images/home/startupPlan/black_tick.svg',
    plan_feature: [
      'Design Updates Daily',
      'Senior-level Designer',
      'AI Advisory Framework',
      'Full-service Creative Team',
      '4x Calls Per Month',
      'License free assets',
    ],
  },
]

const faqList: faq[] = [
  {
    faq_que: 'Who can submit stories to your platform?',
    faq_ans:
      'We welcome submissions from Afghan youth around the world, including those living in Afghanistan and in the diaspora. Writers do not need professional experience — just a story to tell.',
  },
  {
    faq_que: 'Is there a deadline to submit?',
    faq_ans:
      'Submissions are currently accepted on a rolling basis. Specific deadlines may apply to themed issues or contests, which will be announced on our website and social media.',
  },
  {
    faq_que: 'How do you support contributors beyond publication?',
    faq_ans:
      'We offer free writing workshops, mentorship from experienced Afghan creatives, and opportunities to participate in panels, residencies, and events hosted in partnership with universities and NGOs',
  },
  {
    faq_que: 'How can I get involved if I’m not Afghan?',
    faq_ans:
      'We welcome allies who want to support our mission through donations, volunteer work, mentorship, translation help, or by amplifying our writers’ work. Please reach out via our contact page.',
  },
  {
    faq_que: 'Is A Thousand Voices a registered nonprofit?',
    faq_ans:
      'Yes, we operate as a registered nonprofit initiative under the umbrella of fellowship-backed programming, and are working toward independent nonprofit status to expand our reach.',
  },
  {
    faq_que: 'How can I support your work?',
    faq_ans:
      'You can support us by donating, sponsoring workshops, volunteering as a mentor or editor, or simply by reading and sharing the stories on our platform.',
  },
]


export const GET = async () => {
  return NextResponse.json({
    avatarList,
    brandList,
    innovationList,
    onlinePresenceList,
    creativeMindList,
    WebResultTagList,
    startupPlanList,
    faqList,
  });
};
