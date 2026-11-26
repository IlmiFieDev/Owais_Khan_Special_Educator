export interface NavLink {
  key: string;
  label: string;
  href: string;
}

export interface ApproachStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  detail: string;
  icon: string;
}

export interface ExpertiseArea {
  id: string;
  title: string;
  shortDescription: string;
  introduction: string;
  supportFocus: string;
  strategies: string[];
  objectives: string[];
  focusAreas: string[];
  icon: string;
  image?: string;
}

export interface CredentialItem {
  title: string;
  institution: string;
  year: string;
  badge?: string;
  description?: string;
}

export interface ExperienceRole {
  id: string;
  years: string;
  organisation: string;
  role: string;
  focus: string;
  current?: boolean;
  type: "institutional" | "clinic" | "independent";
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3002";

export const SITE_CONTENT = {
  personal: {
    name: "Owais Alam Khan",
    title: "Special Educator",
    credentials: "RCI Registered (CRR No. A16789)",
    crrNo: "CRR No. A16789",
    location: "Delhi NCR",
    tagline: "Every learner. Every possibility.",
  },

  nav: {
    primary: [
      { key: "home", label: "Home", href: "/" },
      { key: "about", label: "About", href: "/about" },
      { key: "expertise", label: "Expertise", href: "/expertise" },
      { key: "experience", label: "Experience", href: "/experience" },
      { key: "approach", label: "My Approach", href: "/approach" },
      { key: "feedback", label: "Feedback", href: "/feedback" },
      { key: "contact", label: "Contact", href: "/contact" },
    ] as NavLink[],
    more: [
      { key: "qualifications", label: "Qualifications", href: "/qualifications" },
      { key: "resources", label: "Parent Resources", href: "/resources" },
      { key: "privacy", label: "Privacy", href: "/privacy" },
      { key: "terms", label: "Terms of Use", href: "/terms" },
      { key: "disclaimer", label: "Disclaimer", href: "/disclaimer" },
      { key: "accessibility", label: "Accessibility", href: "/accessibility" },
    ] as NavLink[],
    cta: "Send an Enquiry",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    openA11y: "Accessibility options",
  },

  hero: {
    eyebrow: "Special Educator · Delhi NCR",
    name: "Owais Alam Khan",
    headline: "Every learner. Every possibility.",
    description:
      "Personalised education, individual attention and compassionate guidance to help learners develop their abilities, build confidence and progress at their own pace.",
    primaryCta: "Send an Enquiry",
    secondaryCta: "Explore My Expertise",
    videoSrc: "/media/hero-side.mp4",
    posterSrc: "/portfolio/expertise-autism.png",
    videoLabel:
      "Cinematic learning environment showing individualised educational activities",
  },

  trust: [
    {
      id: "experience",
      title: "15+ years",
      subtitle: "Verified professional experience",
    },
    {
      id: "independent",
      title: "Independent practice",
      subtitle: "One-to-one teaching since 2018",
    },
    {
      id: "rci",
      title: "RCI Registered",
      subtitle: "CRR No. A16789",
    },
    {
      id: "individual",
      title: "Individualised support",
      subtitle: "Personalised learning pathways",
    },
  ],

  about: {
    eyebrow: "About",
    heading: "Experience with purpose. Education with compassion.",
    introduction:
      "I believe that every learner has individual strengths, abilities and possibilities. My approach to special education focuses on understanding these differences and creating a supportive learning experience that respects each individual's pace and needs.",
    body: [
      "I am Owais Alam Khan, a Special Educator based in Delhi NCR. My professional practice brings together structured educational planning, practical skill development and close collaboration with families.",
      "Across schools, clinics and independent one-to-one teaching, I have supported learners with autism spectrum disorder, Down syndrome, intellectual disability, learning difficulties and early developmental needs.",
      "My work is grounded in observation, patience and respect. Progress is meaningful when it is individual, consistent and shared with the people who support a learner every day.",
    ],
    values: [
      {
        title: "Individualised educational support",
        text: "Every plan begins with the learner — their strengths, communication style and developmental needs.",
      },
      {
        title: "Commitment to learner development",
        text: "Goals stay practical, measurable and responsive so progress remains achievable and motivating.",
      },
      {
        title: "Family collaboration",
        text: "Parents and caregivers are partners. Guidance at home helps learning continue beyond each session.",
      },
    ],
    image: "/portfolio/about-workspace.webp",
    imageAlt:
      "Calm educational workspace with learning materials — illustrative visual, not a photograph of the educator or learners",
  },

  expertise: {
    eyebrow: "Areas of Expertise",
    heading: "Support shaped around each learner.",
    subtitle:
      "Five established areas of practice, delivered through structured teaching, practical skill development and family-centred guidance.",
    banner: "/portfolio/about-workspace.webp",
    bannerAlt:
      "Hands-on learning materials arranged for individualised educational support — illustrative visual",
    areas: [
      {
        id: "autism",
        title: "Autism Spectrum Disorder",
        shortDescription:
          "Structured teaching, visual supports, communication and sensory-friendly learning routines.",
        introduction:
          "Support for learners on the autism spectrum focuses on clarity, predictability and respectful communication.",
        supportFocus:
          "Building communication, emotional regulation, social engagement and flexible thinking through structured, strengths-based teaching.",
        strategies: [
          "Visual schedules and clear routines",
          "Sensory-aware learning environments",
          "Positive reinforcement and predictable transitions",
          "Social communication practice in meaningful contexts",
        ],
        objectives: [
          "Strengthen functional communication",
          "Support sensory regulation",
          "Develop social engagement skills",
          "Build confidence in learning routines",
        ],
        focusAreas: [
          "Visual schedules & communication",
          "Sensory regulation",
          "Social engagement & flexible thinking",
        ],
        icon: "autism",
        image: "/portfolio/expertise-autism.png",
      },
      {
        id: "down-syndrome",
        title: "Down Syndrome",
        shortDescription:
          "Cognitive, motor and expressive language development through repetition, play and encouragement.",
        introduction:
          "Teaching for learners with Down syndrome emphasises encouragement, repetition and joyful practice.",
        supportFocus:
          "Supporting language, motor coordination, cognitive development and growing independence in daily routines.",
        strategies: [
          "Play-based and multi-sensory instruction",
          "Repetition with meaningful variation",
          "Fine and gross motor practice",
          "Positive encouragement and paced goals",
        ],
        objectives: [
          "Develop expressive and receptive language",
          "Strengthen motor coordination",
          "Build daily living skills",
          "Encourage confident participation",
        ],
        focusAreas: [
          "Fine & gross motor coordination",
          "Speech & language rhythm",
          "Daily living & self-care",
        ],
        icon: "down",
        image: "/portfolio/expertise-down-syndrome.png",
      },
      {
        id: "intellectual-disability",
        title: "Intellectual Disability",
        shortDescription:
          "Functional academics, adaptive living skills, conceptual development and social independence.",
        introduction:
          "Educational support centres on functional learning that transfers into everyday life.",
        supportFocus:
          "Developing practical academics, adaptive skills and self-direction at a pace that respects each learner.",
        strategies: [
          "Functional reading and numeracy",
          "Routine structuring and habit formation",
          "Task analysis into manageable steps",
          "Consistent review and celebration of progress",
        ],
        objectives: [
          "Build functional academic skills",
          "Strengthen adaptive living skills",
          "Support social independence",
          "Encourage self-direction",
        ],
        focusAreas: [
          "Functional reading & numeracy",
          "Routine structuring",
          "Practical life skills",
        ],
        icon: "intellectual",
        image: "/portfolio/expertise-intellectual-disability.png",
      },
      {
        id: "learning-difficulties",
        title: "Learning Difficulties",
        shortDescription:
          "Remedial literacy and numeracy using multisensory strategies for dyslexia, dyscalculia and processing needs.",
        introduction:
          "Remedial teaching helps learners strengthen foundational literacy and numeracy with patience and clarity.",
        supportFocus:
          "Addressing reading, writing, mathematical concepts and study skills through multisensory, structured methods.",
        strategies: [
          "Phonics and decoding practice",
          "Tactile and visual maths tools",
          "Executive-function and organisation support",
          "Confidence-building through achievable steps",
        ],
        objectives: [
          "Improve literacy foundations",
          "Strengthen number sense",
          "Support focus and study skills",
          "Rebuild learning confidence",
        ],
        focusAreas: [
          "Phonics & decoding",
          "Math concepts through tactile tools",
          "Executive function & study skills",
        ],
        icon: "learning",
        image: "/portfolio/expertise-learning-difficulties.png",
      },
      {
        id: "early-intervention",
        title: "Early Intervention",
        shortDescription:
          "Foundational support for young children experiencing mild to moderate developmental delays.",
        introduction:
          "Early intervention creates a supportive foundation during the most formative years of learning.",
        supportFocus:
          "Scaffolding developmental milestones, play skills and parent-child interaction for children typically aged 2–6.",
        strategies: [
          "Play-based developmental activities",
          "Parent-child interaction coaching",
          "Pre-academic skill nurturing",
          "Gentle milestone scaffolding",
        ],
        objectives: [
          "Support developmental progress",
          "Strengthen early communication",
          "Build play and pre-academic skills",
          "Empower caregivers with practical strategies",
        ],
        focusAreas: [
          "Developmental milestone scaffolding",
          "Parent-child interaction coaching",
          "Pre-academic & play skills",
        ],
        icon: "early",
        image: "/portfolio/expertise-early-intervention.png",
      },
    ] as ExpertiseArea[],
  },

  experience: {
    eyebrow: "Professional Experience",
    heading: "A career grounded in education and collaboration.",
    subtitle:
      "Professional experience across schools, clinics and independent practice in Delhi NCR.",
    image: "/portfolio/feedback.webp",
    imageAlt:
      "Decorative abstract career journey visual — illustrative, not a photograph of workplaces",
    roles: [
      {
        id: "enable-361",
        years: "Present",
        organisation: "Enable Therapeutic Centre",
        role: "Special Educator",
        focus:
          "Supporting learners through structured special education practice in a contemporary educational setting.",
        current: true,
        type: "institutional",
      },
      {
        id: "manthan",
        years: "2016–2018",
        organisation: "The Manthan School",
        role: "Special Educator",
        focus:
          "Individual and group sessions with therapist and parent collaboration.",
        type: "institutional",
      },
      {
        id: "rhythm",
        years: "2014–2016",
        organisation: "Rhythm Play School",
        role: "Special Educator",
        focus: "Early intervention, teaching aids and inclusion.",
        type: "institutional",
      },
      {
        id: "udaan",
        years: "2013–2014",
        organisation: "FSMHP Udaan (J.R.C.)",
        role: "Special Educator",
        focus: "Intellectual disability support, IEP delivery and documentation.",
        type: "institutional",
      },
      {
        id: "shaura",
        years: "2012",
        organisation: "Shaura Centre",
        role: "Special Educator",
        focus: "Remedial literacy and numeracy interventions.",
        type: "institutional",
      },
      {
        id: "tamana",
        years: "2009–2012",
        organisation: "Tamana Special School",
        role: "Special Educator",
        focus: "Autism, Down syndrome and inclusion programmes.",
        type: "institutional",
      },
      {
        id: "adhaar",
        years: "2014–2018",
        organisation: "Adhaar Clinic, Noida",
        role: "Special Educator",
        focus:
          "Assessments, parent training, and collaboration with speech and occupational therapy.",
        type: "clinic",
      },
      {
        id: "independent",
        years: "2018–Present",
        organisation: "Independent Special Education Practice",
        role: "Special Educator",
        focus:
          "One-to-one, personalised teaching with families across Delhi NCR.",
        type: "independent",
      },
    ] as ExperienceRole[],
  },

  independentPractice: {
    eyebrow: "Independent Special Education Practice",
    heading: "Dedicated teaching. Personalised progress.",
    body: [
      "My professional journey extends beyond institutional education. Through years of independent, one-to-one teaching, I have worked closely with learners and their families, adapting educational approaches to individual strengths, abilities and learning needs.",
      "This hands-on experience has strengthened my understanding of personalised instruction, practical skill development, individual learning challenges and the importance of consistent family collaboration.",
    ],
    highlights: [
      "Years of dedicated independent teaching since 2018",
      "Individualised learning sessions",
      "Personal attention and paced instruction",
      "Tailored educational strategies",
      "Practical and functional skill development",
      "Family-centred educational guidance",
      "Continuous observation and progress review",
    ],
    counterLabel: "Independent Practice Since 2018",
    counterNote: "Independent one-to-one teaching since 2018",
    image: "/portfolio/independent-practice-faceless.png",
    imageAlt:
      "Calm one-to-one learning setting with educational materials — illustrative visual",
  },

  qualifications: {
    eyebrow: "Qualifications & Credentials",
    heading: "Education grounded in professional standards.",
    subtitle:
      "A pedagogical foundation recognised by the Rehabilitation Council of India, with specialised training across intellectual disability and autism spectrum support.",
    image: "/portfolio/qualifications.webp",
    imageAlt:
      "Decorative academic visual representing professional credentials — illustrative",
    cards: [
      {
        title: "RCI Registration (CRR No. A16789)",
        institution: "Rehabilitation Council of India",
        year: "Active registration on record",
        badge: "Statutory Credential",
        description:
          "Official statutory registration recognising qualification as a Special Educator. Please verify current status on the RCI register when required.",
      },
      {
        title: "B.Ed. Special Education (Intellectual Disability)",
        institution: "M.P. Bhoj Open University, Bhopal",
        year: "2009",
        badge: "Degree",
        description:
          "Specialised teacher training in intellectual disability, pedagogy and psychological assessment.",
      },
      {
        title: "Diploma in Special Education (Autism Spectrum Disorder)",
        institution:
          "National Institute for Empowerment of Persons with Multiple Disabilities (NIEPMD)",
        year: "2016 – 2018",
        badge: "Diploma",
        description:
          "Comprehensive practical and theoretical specialisation in autism spectrum interventions.",
      },
      {
        title: "Bachelor of Commerce (B.Com)",
        institution: "M.J.P. Rohilkhand University, Bareilly",
        year: "2002",
        badge: "Undergraduate",
        description: "Foundational undergraduate degree in commerce and general studies.",
      },
    ] as CredentialItem[],
    additionalSkills:
      "Additional certifications: Diploma in Computer Applications (NCPUL, 2001) · Diploma in Hindi Stenography (ITI, NCVT, 2002).",
  },

  approach: {
    eyebrow: "My Teaching Approach",
    heading: "A clear, collaborative process.",
    subtitle:
      "Every learner is unique. Learning succeeds when it is structured, responsive and shared with families.",
    image: "/portfolio/teaching-approach.webp",
    imageAlt:
      "Decorative visual representing a structured teaching journey — illustrative",
    steps: [
      {
        step: 1,
        title: "Understand",
        subtitle: "Baseline Assessment",
        description:
          "Recognise individual learning strengths, abilities and support needs.",
        detail:
          "Observation of strengths, sensory profile, communication style and developmental needs forms the foundation of every plan.",
        icon: "understand",
      },
      {
        step: 2,
        title: "Plan",
        subtitle: "Individualised Education Plan",
        description:
          "Develop appropriate, personalised educational goals and strategies.",
        detail:
          "A tailored IEP with concrete, measurable milestones is shaped in close consultation with the family.",
        icon: "plan",
      },
      {
        step: 3,
        title: "Teach",
        subtitle: "Individualised Sessions",
        description:
          "Deliver structured, engaging and individualised learning activities.",
        detail:
          "Positive-reinforcement, hands-on, structured learning using adaptive teaching aids and engaging activities.",
        icon: "teach",
      },
      {
        step: 4,
        title: "Review",
        subtitle: "Progress Evaluation",
        description:
          "Observe progress and adapt teaching approaches where necessary.",
        detail:
          "Consistent observational reviews and milestone adjustments keep learning moving forward with clarity.",
        icon: "review",
      },
      {
        step: 5,
        title: "Involve",
        subtitle: "Family Collaboration",
        description:
          "Encourage meaningful collaboration with parents and caregivers.",
        detail:
          "Practical home-based guidance helps progress continue naturally into daily routines and play.",
        icon: "involve",
      },
    ] as ApproachStep[],
  },

  resources: {
    eyebrow: "Parent Resources",
    heading: "Guidance for the journey ahead.",
    subtitle:
      "Clear answers and practical orientation for parents beginning or continuing special education support.",
    image: "/portfolio/parent-resources-faceless.png",
    imageAlt:
      "Hands reviewing a learning plan with educational materials",
    guidance: [
      {
        title: "Getting started",
        text: "Share what you notice at home — strengths, interests and moments of difficulty. This helps shape a respectful starting point.",
      },
      {
        title: "Understanding individual needs",
        text: "Meaningful progress often looks like clearer communication, steadier routines or greater confidence in everyday tasks.",
      },
      {
        title: "Working with a special educator",
        text: "Learning continues between sessions. Simple, consistent home strategies make the greatest difference over time.",
      },
    ],
    faqs: [
      {
        question: "How long is a session?",
        answer:
          "Session length is discussed during consultation so it fits your child’s needs and attention span.",
      },
      {
        question: "Where are sessions offered?",
        answer:
          "Online, home-visit and centre options can be considered. Availability is confirmed during consultation.",
      },
      {
        question: "How is progress shared?",
        answer:
          "Progress is reviewed together through clear, practical updates focused on what is working and what to practise next.",
      },
      {
        question: "What are the fees?",
        answer:
          "Fees depend on the support required and are shared during a personal consultation. Please send an enquiry to begin that conversation.",
      },
    ] as FaqItem[],
  },

  skills: {
    items: [
      {
        id: "iep",
        name: "IEP Development & Goal Setting",
        explanation:
          "Designing measurable, personalised Individualised Education Plans aligned with multidisciplinary goals.",
      },
      {
        id: "psychology",
        name: "Child Psychology & Behaviour Support",
        explanation:
          "Positive behaviour interventions, functional behavioural assessment and emotional co-regulation.",
      },
      {
        id: "early-interv",
        name: "Early Intervention & Remedial Teaching",
        explanation:
          "Foundational strategies and compensatory learning frameworks for developmental and learning needs.",
      },
      {
        id: "assessment",
        name: "Special Needs Assessment & Documentation",
        explanation:
          "Baseline profiling, progress mapping and documentation for schools and collaborating professionals.",
      },
      {
        id: "sensory",
        name: "Sensory Integration Techniques",
        explanation:
          "Sensory-aware routines and supportive learning environments.",
      },
      {
        id: "cognitive",
        name: "Emotional & Cognitive Skill Building",
        explanation:
          "Fostering focus, memory, emotional regulation and growing self-advocacy.",
      },
      {
        id: "curriculum",
        name: "Curriculum Adaptation & Material Design",
        explanation:
          "Adapting learning materials and creating practical teaching aids.",
      },
      {
        id: "observation",
        name: "Classroom Observation & Progress Evaluation",
        explanation:
          "Observation in natural settings and objective evaluation of learning gains over time.",
      },
      {
        id: "soft",
        name: "Empathy, Patience & Active Listening",
        explanation:
          "Deep parent collaboration, rapport with learners and compassionate communication.",
      },
    ],
  },

  contact: {
    email: "khan.owais05@gmail.com",
    eyebrow: "Enquiry & Contact",
    heading: "Let's discuss the next step.",
    introduction:
      "Share a brief introduction to your enquiry. I will respond with care and next steps. Please avoid including a child’s full name, diagnosis or sensitive documents in the first message.",
    image: "/portfolio/contact.webp",
    imageAlt: "Decorative contact visual — illustrative",
    privacyNote:
      "Your enquiry is stored securely and used only to respond to your request. See the Privacy page for details.",
    enquiryTypes: [
      "Individualised Educational Support",
      "One-to-One Learning Sessions",
      "Parent Guidance",
      "Professional Collaboration",
      "General Enquiry",
    ],
    contactMethods: ["Email", "Phone", "Either"],
  },

  feedback: {
    eyebrow: "Feedback",
    heading: "Your experience matters.",
    introduction:
      "Your feedback helps me reflect, improve and continue providing meaningful educational support.",
    image: "/portfolio/feedback.webp",
    imageAlt: "Decorative feedback visual — illustrative",
    relationships: [
      "Parent / Guardian",
      "Teacher",
      "Therapist",
      "Institution",
      "Other",
    ],
  },

  privacy: {
    heading: "Privacy information",
    updated: "November 2025",
  },

  footer: {
    tagline: "Personalised education with compassion and clarity.",
    rci: "RCI Registered · CRR No. A16789",
    location: "Delhi NCR",
    copyright: `© ${new Date().getFullYear()} Owais Alam Khan. All rights reserved.`,
  },

  a11y: {
    title: "Accessibility Options",
    reduceMotion: "Reduce motion",
    dyslexiaFont: "Dyslexia-friendly font",
    textSize: "Text size",
    highContrast: "High contrast",
    calmMode: "Calm mode",
    small: "S",
    medium: "M",
    large: "L",
    xLarge: "XL",
    close: "Close accessibility panel",
    open: "Open accessibility options",
  },
} as const;
