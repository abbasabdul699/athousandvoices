export interface Judge {
  slug: string
  name: string
  title: string
  image: string
  bio: string[]
}

export const judges: Judge[] = [
  {
    slug: 'judge-three',
    name: 'Adam Sexton',
    title: 'Senior Lecturer in the English Department @ Yale University',
    image: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/judges/Adam.png',
    bio: [
      'Adam Reid Sexton is a Senior Lecturer in the English Department at Yale University, where he teaches The Craft of Fiction and Writing About Music.  His books include Master Class in Fiction Writing: Techniques from Austen, Hemingway, and Other Greats.  With a team of visual artists Sexton adapted four of Shakespeare\u2019s tragedies as manga (Japanese-style graphic novels), and his anthology Rap on Rap was acquired by Harvard\u2019s W.E.B. DuBois Institute for African and African American Research.',
    ],
  },
  {
    slug: 'judge-two',
    name: 'Tahmina Sobat',
    title: 'Ph.D. candidate in the Department of Gender, Women, and Sexuality Studies @ University of Minnesota\u2013Twin Cities.',
    image: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/judges/Tahmina.jpg',
    bio: [
      'Tahmina Sobat is a Ph.D. candidate in the Department of Gender, Women, and Sexuality Studies at the University of Minnesota\u2013Twin Cities. She began the program as a Fellow of the Interdisciplinary Center for the Study of Global Change (ICGC). Sobat earned her law degree from Herat University in 2015 and later completed an LL.M. in International Human Rights Law at the University of Notre Dame in 2020. She continued her academic journey as a Fulbright Scholar, earning a second master\u2019s degree in Gender and Women\u2019s Studies from Minnesota State University, Mankato in 2022. Her interdisciplinary research engages transnational feminist theory, epistemic violence, and the politics of representation. Her dissertation critically examines the complex intersections of gender and imperialism in the context of Afghanistan. She employs feminist and postcolonial research methodologies, to challenge systems of power and exclusion. She has contributed to these fields through publications and conference presentations on national and international platforms. Her recent work on Afghan women and peacebuilding, gender apartheid, and transnational feminist solidarities has been published in The Global South, Contending Modernities at the University of Notre Dame, the Gender Policy Report at the University of Minnesota, SIGMA: The South Asian Journal, and beyond.',
    ],
  },
  {
    slug: 'judge-one',
    name: 'Omar Sharifi',
    title: 'Research Fellow and Lecturer @ University of Minnesota',
    image: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/judges/Omar.png',
    bio: [
      'Omar Sharifi is a research fellow at the Humphrey School of Public Affairs. In addition, he is an assistant professor at the American University of Afghanistan, senior research fellow and Kabul director of the American Institute of Afghanistan Studies, Asia Society fellow, and a member of Afghan 21 Young Leaders Forum.Sharifi graduated from Kabul Medical Institute in 2003. Following his medical studies, he worked as head of research and publications for the Foundation for Culture and Civil Society in Kabul, and as director of the Open Media Fund for Afghanistan.From 2006 to 2008, he studied cultural anthropology at Columbia University in New York under a Fulbright Fellowship. He completed his PhD in anthropology from Boston University in 2019. He recently joined the New School University Scholars in Exile Consortium.',
    ],
  },
  {
    slug: 'judge-five',
    name: 'Mina Sharif',
    title: 'Narrative Strategist\nAuthor of *Your War, Our Lives*\nSpeaker',
    image: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/judges/Mina.png',
    bio: [
      'That means I moderate conversations on identity, power, and global belonging. I work with universities, media platforms, and public forums to guide discussions that require clarity, depth, and steady pacing - especially when perspectives differ or identities are challenged. This could be a sensitive discourse on culture, identity, gender, or even general human habit and dynamic.  My perspective is shaped by lived experience across Canada and Afghanistan, and decades of navigating diaspora, media, and political spaces. Its having this cross-system experience that allows me to recognize the narratives shaping a room. I use my experience and my methodology to guide conversations without letting them spiral into noise. Its my mission to have conversations end with a solid combination of learning, hope, and actionable change for individuals and communities. Whether hosting a podcast, moderating a panel, or delivering a keynote, I bring structure, composure, and thoughtful framing to complex discussions.',
    ],
  },
  {
    slug: 'judge-four',
    name: 'Lotfullah Najafizada',
    title: 'Afghan journalist\nChief Executive Officer of Amu TV',
    image: 'https://vncsjyedvqrhgeedwusw.supabase.co/storage/v1/object/public/judges/Lotfullah.jpg',
    bio: [
      'Lotfullah Najafizada is an Afghan journalist and the Founder and CEO of Amu TV, a Washington, DC-based international news channel for Afghanistan, broadcasting via satellite and digital platforms to Afghan audiences at home and abroad. Najafizada brings nearly 20 years of experience in journalism, including more than a decade as Director of TOLOnews TV (2009\u20132021), Afghanistan\u2019s largest news network. During his tenure, he hosted Afghanistan\u2019s only televised presidential debate in 2019 and interviewed numerous global leaders. In 2024, he received the joint UK-Canada Press Freedom Award at the UN General Assembly in New York on behalf of his fellow Afghan journalists. He was named Journalist of the Year by One Young World in 2022 and awarded the Press Freedom Hero Medal by Reporters Without Borders in 2016. He is a former fellow with leading institutions including the Institute of Politics, University of Chicago, the Asia Society, the Atlantic Council, and the World Press Institute. He holds a BSc in Economics. He is married to Farida Darvish, and the two of them have three children: Shahryar, Gawharshad, and Ariana.',
    ],
  },
]
