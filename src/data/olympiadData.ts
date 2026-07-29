import {
  FAQItem,
  ExamDateItem,
  SyllabusItem,
  SamplePaper,
  MockQuestion,
  BlogPost,
  PartnerSchool,
  Testimonial,
  AwardItem,
  StudentReport,
  StateParticipation,
  SubjectSchedule,
  ExamDetail,
  RegistrationStep,
  VisionMissionPage,
  WhyUsData,
  SchoolRegistrationFormData
} from "../types";



export const BOARD_OPTIONS = [
  'CBSE',
  'ICSE',
  'राज्य बोर्ड (State Board)',
  'IB',
  'ब्रिटिश (British)',
  'अमेरिकी (American)',
  'अन्य (Other)',
] as const;

export const COUNTRY_OPTIONS = [
  'भारत (India)',
  'विदेश (Other)',
] as const;

export const INITIAL_FORM_DATA: SchoolRegistrationFormData = {
  schoolCode: '',
  schoolName: '',
  address: '',
  city: '',
  district: '',
  state: '',
  pincode: '',
  country: 'भारत (India)',
  mobileNumber: '',
  landline: '',
  email: '',
  website: '',
  boardAffiliation: 'CBSE',
  otherBoard: '',
  principalName: '',
  principalMobile: '',
  principalEmail: '',
  coordinatorName: '',
  coordinatorMobile: '',
  coordinatorEmail: '',
  estimatedParticipantsHindi: 50,
  estimatedParticipantsSanskrit: 25,
};

export const WHY_US_DATA: WhyUsData = {

  advantages: [
    {
      id: "adv1",
      title: "12-आयामी वैज्ञानिक मूल्यांकन",
      description:
        "व्याकरण, वर्तनी, शब्दज्ञान, समझ, साहित्य व गति का सूक्ष्म विश्लेषण।",
      icon: "Cpu",
      color: "from-blue-600 to-indigo-900",
    },
    {
      id: "adv2",
      title: "₹1 करोड़ की विशाल छात्रवृत्ति",
      description:
        "राष्ट्रीय विजेताओं को नकद राशि, लैपटॉप, आईपैड एवं पदक।",
      icon: "Award",
      color: "from-amber-600 to-yellow-900",
    },
    {
      id: "adv3",
      title: "विज्ञान भवन नई दिल्ली में सम्मान",
      description:
        "मान्यवर केंद्रीय मंत्रियों एवं शिक्षाविदों द्वारा प्रशस्ति पत्र।",
      icon: "Trophy",
      color: "from-rose-600 to-rose-900",
    },
    {
      id: "adv4",
      title: "एनईपी 2020 पूर्ण सामंजस्य",
      description:
        "NCERT व राष्ट्रीय पाठ्यचर्या रूपरेखा (NCF) के अनुसार निर्मित।",
      icon: "GraduationCap",
      color: "from-emerald-600 to-teal-900",
    },
    {
      id: "adv5",
      title: "डिजिटल रिपोर्ट कार्ड व ई-सर्टिफिकेट",
      description:
        "QR कोड सत्यापित डिजिटल प्रमाण पत्र एवं पर्सेंटाइल रिपोर्ट।",
      icon: "ShieldCheck",
      color: "from-lime-600 to-lime-900",
    },
    {
      id: "adv6",
      title: "शिक्षकों व विद्यालयों का अभिनंदन",
      description:
        "संयोजक शिक्षकों को नकद प्रोत्साहन राशि एवं सेवा सम्मान।",
      icon: "Users",
      color: "from-red-600 to-pink-900",
    },
  ],
};

export const VISION_MISSION: VisionMissionPage = {
  vision: {
    title: "दूरदृष्टि",
    description:
      "भारतीय भाषाओं के माध्यम से प्रत्येक विद्यार्थी में ज्ञान, संस्कार, आत्मविश्वास और नेतृत्व क्षमता का विकास करना हमारा लक्ष्य है। हम हिंदी एवं संस्कृत को केवल अध्ययन का विषय नहीं, बल्कि भारतीय संस्कृति और राष्ट्रीय पहचान का आधार मानते हैं। हमारा संकल्प है कि प्रत्येक विद्यार्थी अपनी भाषा पर गर्व करे और वैश्विक मंच पर भारत का गौरव बढ़ाए।",
  },

  mission: {
    title: "हमारा लक्ष्य",
    items: [
      "राष्ट्रीय स्तर पर वैज्ञानिक व 12-आयामी भाषा परीक्षा आयोजित करना।",
      "शिक्षकों एवं विद्यालयों को उत्कृष्ट भाषा शिक्षण हेतु सम्मानित करना।",
      "NEP 2020 की त्रि-भाषा सूत्र नीति को जमीनी स्तर पर क्रियान्वित करना।",
    ],
  },

  coreValues: [
    {
      id: "cv1",
      icon: "ShieldCheck",
      title: "सत्य व शुद्धता",
      description: "पारदर्शिता और निष्पक्षता।",
      color: "emerald",
    },
    {
      id: "cv2",
      icon: "Sparkles",
      title: "वैज्ञानिकता",
      description: "बेंचमार्क आधारित मूल्यांकन।",
      color: "blue",
    },
    {
      id: "cv3",
      icon: "Award",
      title: "प्रतिभा प्रोत्साहन",
      description: "हर प्रतिभा को पहचान।",
      color: "amber",
    },
    {
      id: "cv4",
      icon: "Heart",
      title: "संस्कृति संरक्षण",
      description: "भारतीय विरासत का संवर्धन।",
      color: "rose",
    },
    {
      id: "cv5",
      icon: "Star",
      title: "पारदर्शिता",
      description: "स्पष्ट मूल्यांकन।",
      color: "purple",
    },
  ],

  quote: {
    text: "हमारे सिद्धांत हमें सही दिशा देते हैं – हर छात्र, हर शिक्षक और हर विद्यालय का सम्मान हमारा कर्तव्य है।",
    author: "भारती भाषा ओलंपियाड",
  },
};

export const KEY_STATS = {
  schoolsRegistered: 2850,
  studentsParticipated: 450000,
  statesCovered: 28,
  scholarshipsDistributedInLakhs: 50,
  districtsCovered: 520,
  teachersTrained: 12400,
};

export const ANNOUNCEMENTS = [
  {
    id: "a1",
    text: "राष्ट्रीय हिंदी एवं संस्कृत ओलंपियाड 2026 पंजीकरण प्रारम्भ! 30 अगस्त तक विशेष छूट प्राप्त करें।",
    link: "/registration",
  },
  {
    id: "a2",
    text: "राष्ट्रीय विजेताओं को नई दिल्ली में ₹1 करोड़ मूल्य की छात्रवृत्ति व लैपटॉप प्रदान किए जाएंगे।",
    link: "/awards",
  },
];
export const EXAM_SCHEDULE: ExamDateItem[] = [
  {
    id: "ed1",
    title: "राष्ट्रीय स्तर हिंदी भाषा ओलंपियाड - प्रथम चरण",
    subject: "Hindi",
    date: "October 18, 2026",
    time: "10:00 AM - 11:30 AM IST",
    mode: "Online (School Portal)",
    eligibleClasses: "Classes 1st to 12th",
  },
  {
    id: "ed2",
    title: "राष्ट्रीय स्तर संस्कृत भाषा ओलंपियाड - प्रथम चरण",
    subject: "Sanskrit",
    date: "October 25, 2026",
    time: "10:00 AM - 11:30 AM IST",
    mode: "Online (School Portal)",
    eligibleClasses: "Classes 3rd to 12th",
  },
  {
    id: "ed3",
    title: "राष्ट्रीय ऑफ़लाइन केंद्र ओएमआर परीक्षा (विद्यालय केंद्र)",
    subject: "Both",
    date: "November 12, 2026",
    time: "11:00 AM - 12:30 PM IST",
    mode: "Offline (OMR Based)",
    eligibleClasses: "Classes 1st to 12th",
  },
  {
    id: "ed4",
    title: "भव्य समापन एवं सम्मान समारोह (विज्ञान भवन, दिल्ली)",
    subject: "Both",
    date: "December 20, 2026",
    time: "02:00 PM IST Onwards",
    mode: "Offline (OMR Based)",
    eligibleClasses: "Top Rankers All Classes",
  },
];
export const SYLLABUS_DATA: SyllabusItem[] = [
  {
    classLevel: "Classes 1st - 2nd",
    hindiTopics: [
      "वर्णमाला एवं मात्रा ज्ञान",
      "संज्ञा (प्रारंभिक)",
      "समानार्थी व विलोम शब्द",
      "चित्र पहचान व वाक्य रचना",
      "शुद्ध-अशुद्ध शब्द",
    ],
    sanskritTopics: [
      "वर्णमाला व स्वर-व्यंजन",
      "सरल संस्कृत शब्दवली",
      "संख्याज्ञान (1-10)",
      "चित्र देखकर संस्कृत नाम",
      "सरल वंदना व श्लोक",
    ],
    totalQuestions: 35,
    durationMinutes: 45,
    totalMarks: 100,
  },
  {
    classLevel: "Classes 3rd - 5th",
    hindiTopics: [
      "व्याकरण (संज्ञा, सर्वनाम, विशेषण, क्रिया)",
      "पर्यायवाची व विलोम शब्द",
      "मुहावरे व लोकोक्तियाँ",
      "अपठित गद्यांश",
      "वर्तनी शुद्धिकरण",
    ],
    sanskritTopics: [
      "सन्धिविचार (दीर्घ व गुण)",
      "शब्दरूप (बालक, लता, फल)",
      "धातुरूप (लट् व लृट् लकार)",
      "संस्कृत अनुवाद (सरल वाक्य)",
      "सुभाषित एवं नीति श्लोक",
    ],
    totalQuestions: 50,
    durationMinutes: 60,
    totalMarks: 100,
  },
  {
    classLevel: "Classes 6th - 8th",
    hindiTopics: [
      "संधि, समास व प्रत्यय-उपसर्ग",
      "कारक व वाक्य भेद",
      "अलंकार एवं रस परिचय",
      "साहित्य ज्ञान (प्रमुख कवि व रचनाएँ)",
      "अपठित गद्यांश व पद्यांश",
    ],
    sanskritTopics: [
      "स्वर व व्यञ्जन सन्धि",
      "समास (तत्पुरुष, द्वन्द्व, द्विगु)",
      "कारक व उपपद विभक्ति",
      "अव्यय व प्रत्यय (क्त्वा, ल्यप्, तुमुन्)",
      "संस्कृत साहित्य का इतिहास (कालिदास, बाणभट्ट)",
    ],
    totalQuestions: 50,
    durationMinutes: 60,
    totalMarks: 100,
  },
  {
    classLevel: "Classes 9th - 12th",
    hindiTopics: [
      "उच्चतर व्याकरण (छंद, रस, अलंकार)",
      "वाक्य शुद्धि व पद परिचय",
      "हिंदी साहित्य का इतिहास (आदिकाल से आधुनिक काल)",
      "पत्र, निबंध व अपठित अवबोधन",
      "भाषा विज्ञान व बोलियाँ",
    ],
    sanskritTopics: [
      "विस्तृत सन्धि व समास चक्र",
      "कृदन्त व तद्धित प्रत्यय",
      "वैदिक एवं लौकिक संस्कृत परिचय",
      "श्रीमद्भगवद्गीता व उपनिषद् श्लोकार्थ",
      "काव्यशास्त्र एवं अनुवाद दक्षता",
    ],
    totalQuestions: 60,
    durationMinutes: 75,
    totalMarks: 100,
  },
];
export const EXAM_SCHEDULES: SubjectSchedule[] = [
  {
    subject: "Hindi",
    subjectHindi: "हिंदी ओलंपियाड",
    option1Date: "3 सितंबर 2026",
    option1Day: "गुरुवार",
    option2Date: "15 अक्टूबर 2026",
    option2Day: "गुरुवार",
    iconName: "BookOpen",
    image: "/books/hindi.png",
  },
  {
    subject: "Sanskrit",
    subjectHindi: "संस्कृत ओलंपियाड",
    option1Date: "6 अक्टूबर 2026",
    option1Day: "मंगलवार",
    option2Date: "4 नवंबर 2026",
    option2Day: "बुधवार",
    iconName: "Feather",
    image: "/books/sanskrit.png",
  },
];

export const EXAM_DETAILS: ExamDetail[] = [
  {
    id: "syllabus",
    label: "पाठ्यक्रम (Syllabus)",
    value: "कक्षा I से X",
    subtext: "एनसीईआरटी एवं प्रमुख बोर्डों के स्तरानुसार",
    icon: "BookMarked",
  },
  {
    id: "mode",
    label: "परीक्षा मोड (Exam Mode)",
    value: "ऑफलाइन (OMR आधारित)",
    subtext: "विद्यालय परिसर में सुरक्षित आयोजन",
    icon: "FileCheck",
  },
  {
    id: "format",
    label: "प्रश्न प्रकार (Question Format)",
    value: "बहुविकल्पीय एवं वर्णनात्मक",
    subtext: "बहुविकल्पीय प्रश्न एवं वर्णनात्मक मूल्यांकन",
    icon: "HelpCircle",
  },
  {
    id: "duration",
    label: "अवधि (Duration)",
    value: "60 मिनट",
    subtext: "समय प्रबंधन व विश्लेषणात्मक दक्षता",
    icon: "Clock",
  },
  {
    id: "level",
    label: "स्तर (Exam Level)",
    value: "राष्ट्रीय स्तर (National Level)",
    subtext: "अखिल भारतीय स्तर पर मूल्यांकन",
    icon: "Award",
  },
  {
    id: "certificate",
    label: "प्रमाणपत्र (Certificate)",
    value: "सभी प्रतिभागियों को",
    subtext: "राष्ट्रीय पहचान एवं प्रोत्साहन प्रमाण-पत्र",
    icon: "Scroll",
  },
];

// src/data/registrationSteps.ts

export const REGISTRATION_STEPS: RegistrationStep[] = [
  {
    stepNumber: 1,
    title: "विद्यालय द्वारा पंजीकरण",
    description:
      "विद्यालय द्वारा आधिकारिक पंजीकरण फॉर्म भरकर संस्थान का कोड प्राप्त करें।",
  },
  {
    stepNumber: 2,
    title: "विद्यार्थियों का नामांकन",
    description:
      "कक्षा 1 से 10 तक के इच्छुक विद्यार्थियों का विषयवार विवरण तैयार करें।",
  },
  {
    stepNumber: 3,
    title: "शुल्क भुगतान",
    description:
      "निर्धारित परीक्षा शुल्क का बैंक ट्रांसफर/यूपीआई के माध्यम से भुगतान करें।",
  },
  {
    stepNumber: 4,
    title: "एडमिट कार्ड जारी",
    description:
      "परीक्षा तिथि से पूर्व रोल नंबर एवं एडमिट कार्ड विद्यालय पोर्टल पर जारी होंगे।",
  },
  {
    stepNumber: 5,
    title: "परीक्षा में भागीदारी",
    description:
      "विद्यालय परिसर में ओएमआर शीट पर सुचारू एवं निष्पक्ष परीक्षा का आयोजन।",
  },
  {
    stepNumber: 6,
    title: "रिपोर्ट एवं पुरस्कार",
    description:
      "विस्तृत बेंचमार्क रिपोर्ट, मेडल, प्रमाण-पत्र व छात्रवृत्ति का वितरण।",
  },
];
export const SAMPLE_PAPERS: SamplePaper[] = [
  {
    id: "sp1",
    title: "राष्ट्रीय हिंदी ओलंपियाड आधिकारिक मॉडल प्रश्न पत्र 2025",
    subject: "हिंदी",
    classLevel: "कक्षा 5वीं",
    year: "2025",
    questionsCount: 50,
    pdfUrl: "#",
  },
  {
    id: "sp2",
    title: "हिंदी भाषा ओलंपियाड उच्च स्तरीय अभ्यास पत्र",
    subject: "हिंदी",
    classLevel: "कक्षा 8वीं",
    year: "2025",
    questionsCount: 50,
    pdfUrl: "#",
  },
  {
    id: "sp3",
    title: "हिंदी वरिष्ठ माध्यमिक उत्कृष्ट मॉडल सेट",
    subject: "हिंदी",
    classLevel: "कक्षा 10वीं",
    year: "2025",
    questionsCount: 60,
    pdfUrl: "#",
  },
  {
    id: "sp4",
    title: "राष्ट्रीय संस्कृत भाषा प्रथमा परीक्षा पत्र",
    subject: "संस्कृत",
    classLevel: "कक्षा 6ठीं",
    year: "2025",
    questionsCount: 50,
    pdfUrl: "#",
  },
  {
    id: "sp5",
    title: "संस्कृत साहित्य एवं व्याकरण मॉडल प्रश्न पत्र",
    subject: "संस्कृत",
    classLevel: "कक्षा 9वीं",
    year: "2025",
    questionsCount: 60,
    pdfUrl: "#",
  },
  {
    id: "sp6",
    title: "संस्कृत उच्चतर राष्ट्रीय ओलंपियाड पत्र",
    subject: "संस्कृत",
    classLevel: "कक्षा 12वीं",
    year: "2025",
    questionsCount: 60,
    pdfUrl: "#",
  },
];
export const MOCK_QUESTIONS_HINDI: MockQuestion[] = [
  {
    id: 1,
    question: "'सूरज' शब्द का सही पर्यायवाची शब्द कौन सा है?",
    options: ["A) नीरद", "B) दिनकर", "C) शशांक", "D) पावक"],
    correctIndex: 1,
    explanation:
      "सही विकल्प B है। 'दिनकर', 'भास्कर' और 'रवि' सूर्य/सूरज के पर्यायवाची शब्द हैं।",
    category: "Vocabulary & Synonyms",
  },
  {
    id: 2,
    question: "'सूर्योदय' शब्द में कौन सी संधि है?",
    options: [
      "A) गुण स्वर संधि",
      "B) दीर्घ स्वर संधि",
      "C) वृद्धि स्वर संधि",
      "D) व्यंजन संधि",
    ],
    correctIndex: 0,
    explanation:
      "सूर्य + उदय = सूर्योदय (अ + उ = ओ)। यह गुण स्वर संधि का नियम है।",
    category: "Grammar (Vyakaran)",
  },
  {
    id: 3,
    question: "प्रसिद्ध महाकाव्य 'कामायनी' की रचना किसने की?",
    options: [
      "A) मुंशी प्रेमचंद",
      "B) जयशंकर प्रसाद",
      "C) सूर्यकांत त्रिपाठी 'निराला'",
      "D) महादेवी वर्मा",
    ],
    correctIndex: 1,
    explanation:
      "जयशंकर प्रसाद ने 'कामायनी' महाकाव्य की रचना की, जो छायावादी काव्यधारा की अमूल्य धरोहर है।",
    category: "Literature & Authors",
  },
  {
    id: 4,
    question: "'नाकों चने चबाना' मुहावरे का क्या अर्थ है?",
    options: [
      "A) पौष्टिक भोजन करना",
      "B) बहुत तंग या परेशान करना",
      "C) विजयोत्सव मनाना",
      "D) भय से छिप जाना",
    ],
    correctIndex: 1,
    explanation:
      "विकल्प B सही है। इसका अर्थ अत्यधिक कठिन स्थिति पैदा करना या बहुत परेशान करना है।",
    category: "Idioms & Phrases",
  },
  {
    id: 5,
    question:
      "राष्ट्रीय शिक्षा नीति (NEP 2020) के अंतर्गत मातृभाषा एवं भारतीय भाषाओं को क्या स्थान दिया गया है?",
    options: [
      "A) प्राथमिक स्तर तक शिक्षण का मुख्य माध्यम",
      "B) केवल अतिरिक्त विषय",
      "C) विदेशी भाषाओं से प्रतिस्थापन",
      "D) मात्र परीक्षा हेतु",
    ],
    correctIndex: 0,
    explanation:
      "NEP 2020 प्राथमिक एवं उच्च प्राथमिक स्तर (कक्षा 5/8 तक) में मातृभाषा और भारतीय भाषाओं में शिक्षण का निर्देश देता है।",
    category: "NEP 2020 Awareness",
  },
];
export const MOCK_QUESTIONS_SANSKRIT: MockQuestion[] = [
  {
    id: 1,
    question: "'पठ्' धातोः लट् लकारे उत्तमपुरुषस्य बहुवचन रूपं किम् अस्ति?",
    options: ["A) पठति", "B) पठामः", "C) पठन्ति", "D) पठसि"],
    correctIndex: 1,
    explanation:
      "उत्तम पुरुष बहुवचन में लट् लकार का रूप 'पठामः' (वयं पठामः) होता है।",
    category: "Sanskrit Verb Forms (Dhaturup)",
  },
  {
    id: 2,
    question: "सूक्तिं पूरयत: 'विद्या ददाति _____'",
    options: ["A) धनम्", "B) विनयं", "C) बलम्", "D) राज्यम्"],
    correctIndex: 1,
    explanation:
      "'विद्या ददाति विनयं, विनयाद्याति पात्रताम्'। विद्या नम्रता प्रदान करती है।",
    category: "Subhashita & Ethics",
  },
  {
    id: 3,
    question: "संस्कृत व्याकरणे कति कारकाणि मन्त्यन्ते?",
    options: ["A) षट् (6)", "B) सप्त (7)", "C) अष्ट (8)", "D) पञ्च (5)"],
    correctIndex: 0,
    explanation:
      "संस्कृत में ६ कारक माने गए हैं: कर्ता, कर्म, करण, सम्प्रदान, अपादान, और अधिकरण।",
    category: "Sanskrit Vyakaran",
  },
];
export const AWARDS_LIST: AwardItem[] = [
  {
    id: "aw1",
    rank: "Rank 1 (National Winner)",
    title: "भारती भाषा राष्ट्रीय रत्न स्वर्ण पदक एवं छात्रवृत्ति",
    cashPrize: "₹1,00,000 Cash + Apple iPad",
    perks: [
      "24K स्वर्ण मण्डित ट्रॉफी व स्मृति चिह्न",
      "आजीवन राष्ट्रीय भाषा विद्वान सम्मान",
      "वाराणसी व नई दिल्ली की पूर्ण प्रायोजित सांस्कृतिक यात्रा",
      "मान्यवर अतिथियों द्वारा हस्ताक्षरित उत्कृष्टता प्रमाण पत्र",
    ],
    iconName: "Trophy",
  },
  {
    id: "aw2",
    rank: "Rank 2 (National Runner Up)",
    title: "राष्ट्रीय भाषा श्रेष्ठ पुरस्कार",
    cashPrize: "₹50,000 Cash + Laptop",
    perks: [
      "रजत पदक एवं प्रशंसा शील्ड",
      "राष्ट्रीय भाषा ओलंपियाड प्रमाण पत्र",
      "उन्नत संस्कृत व हिंदी ई-पुस्तकालय की नि:शुल्क सदस्यता",
      "राष्ट्रीय पोर्टल एवं मीडिया में विशेष उल्लेख",
    ],
    iconName: "Medal",
  },
  {
    id: "aw3",
    rank: "Rank 3 (National Bronze Winner)",
    title: "भाषा गौरव सम्मान",
    cashPrize: "₹25,000 Cash + Smart Tab",
    perks: [
      "कांस्य पदक एवं शिखा",
      "मेधावी छात्रवृत्ति प्रमाण पत्र",
      "वार्षिक पुस्तक उपहार व पत्रिका सदस्यता",
      "विद्यालय स्तर पर विशेष अभिनंदन",
    ],
    iconName: "Award",
  },
  {
    id: "aw4",
    rank: "State Rank 1 to 10",
    title: "राज्य भाषा प्रतिभा पुरस्कार",
    cashPrize: "₹5,000 Cash + Gold Medal (State Level)",
    perks: [
      "राज्यस्तरीय ट्रॉफी एवं प्रशस्ति पत्र",
      "विशिष्टता प्रमाण पत्र",
      "पुस्तक वाउचर एवं छात्रवृत्ति",
    ],
    iconName: "Star",
  },
];
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "डॉ. रमेशचंद्र शर्मा",
    role: "प्रधानाचार्य",
    school: "दिल्ली पब्लिक विद्यालय, वसंत कुंज",
    state: "दिल्ली",
    quote:
      "भारती भाषा ओलंपियाड ने हमारे विद्यार्थियों में हिंदी और संस्कृत के प्रति नई रुचि विकसित की है। इसकी वैज्ञानिक मूल्यांकन प्रणाली से प्रत्येक छात्र की भाषाई क्षमता का सटीक विश्लेषण संभव हुआ।",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "t2",
    name: "अनन्या श्रीवास्तव",
    role: "राष्ट्रीय स्वर्ण पदक विजेता (कक्षा 8)",
    school: "एम.जी.डी. गर्ल्स विद्यालय, जयपुर",
    state: "राजस्थान",
    quote:
      "भारती भाषा ओलंपियाड में भाग लेने से मेरी हिंदी और संस्कृत दोनों विषयों में रुचि बढ़ी। मॉक टेस्ट और अभ्यास सामग्री ने मुझे राष्ट्रीय स्तर पर उत्कृष्ट प्रदर्शन करने में सहायता की।",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "t3",
    name: "श्रीमती सुनीता कुलकर्णी",
    role: "वरिष्ठ संस्कृत शिक्षिका",
    school: "भावन्स विद्या मंदिर, नागपुर",
    state: "महाराष्ट्र",
    quote:
      "यह ओलंपियाड राष्ट्रीय शिक्षा नीति 2020 और भारतीय ज्ञान परंपरा के मूल्यों के अनुरूप है। विद्यार्थियों में भाषा के साथ-साथ संस्कृति के प्रति भी सम्मान विकसित होता है।",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "t4",
    name: "राजीव मेहता",
    role: "अभिभावक",
    school: "सेंट जेवियर्स विद्यालय",
    state: "गुजरात",
    quote:
      "मेरे बच्चे का आत्मविश्वास और भाषा कौशल इस ओलंपियाड के बाद उल्लेखनीय रूप से बढ़ा है। विस्तृत प्रदर्शन रिपोर्ट ने उसकी वास्तविक प्रगति को समझने में बहुत सहायता की।",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
  },
  {
    id: "t5",
    name: "डॉ. सीमा अग्रवाल",
    role: "हिंदी विभागाध्यक्ष",
    school: "सरस्वती विद्या मंदिर, भोपाल",
    state: "मध्य प्रदेश",
    quote:
      "भारती भाषा ओलंपियाड विद्यार्थियों में भाषा, संस्कृति और भारतीय मूल्यों के प्रति जागरूकता विकसित करने का एक उत्कृष्ट मंच है। इसकी परीक्षा प्रक्रिया और विश्लेषणात्मक रिपोर्ट अत्यंत प्रभावशाली हैं।",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
  },
];
export const PARTNER_SCHOOLS: PartnerSchool[] = [
  {
    id: "s1",
    name: "Delhi Public School (R.K. Puram)",
    city: "New Delhi",
    state: "Delhi",
    studentsCount: 1420,
    logo: "🏛️",
    rating: 4.9,
  },
  {
    id: "s2",
    name: "DAV Public School (Chandrasekharpur)",
    city: "Bhubaneswar",
    state: "Odisha",
    studentsCount: 1180,
    logo: "🏫",
    rating: 4.8,
  },
  {
    id: "s3",
    name: "Kensri School & College",
    city: "Bengaluru",
    state: "Karnataka",
    studentsCount: 890,
    logo: "🎓",
    rating: 4.9,
  },
  {
    id: "s4",
    name: "Modern School (Barakhamba Road)",
    city: "New Delhi",
    state: "Delhi",
    studentsCount: 1650,
    logo: "🏛️",
    rating: 5.0,
  },
  {
    id: "s5",
    name: "City Montessori School",
    city: "Lucknow",
    state: "Uttar Pradesh",
    studentsCount: 3200,
    logo: "🏫",
    rating: 4.9,
  },
  {
    id: "s6",
    name: "Mayo College",
    city: "Ajmer",
    state: "Rajasthan",
    studentsCount: 950,
    logo: "👑",
    rating: 4.9,
  },
  {
    id: "s7",
    name: "Bhavan's Vidya Mandir",
    city: "Kochi",
    state: "Kerala",
    studentsCount: 1100,
    logo: "🌿",
    rating: 4.8,
  },
];
export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "भारती भाषा ओलंपियाड में भाग लेने के लिए कौन पात्र हैं?",
    answer:
      "भारत एवं विदेश के किसी भी मान्यता प्राप्त बोर्ड (CBSE, ICSE, स्टेट बोर्ड) के कक्षा 1 से 12 तक के छात्र हिंदी ओलंपियाड तथा कक्षा 3 से 12 तक के छात्र संस्कृत ओलंपियाड में भाग ले सकते हैं।",
    category: "registration",
  },
  {
    id: "faq2",
    question: "बेंचमार्क मूल्यांकन किस प्रकार कार्य करता है?",
    answer:
      "केवल अंक देने के स्थान पर, BBO बेंचमार्क रिपोर्ट छात्र के 12 भाषाई आयामों (व्याकरण, शब्द भण्डार, समझ, साहित्यिक रुचि) का गहन विश्लेषण कर राष्ट्रीय स्तर का सटीक रिपोर्ट कार्ड प्रदान करती है।",
    category: "exam",
  },
  {
    id: "faq3",
    question:
      "यदि विद्यालय पंजीकृत न हो, तो क्या छात्र व्यक्तिगत रूप से पंजीकरण कर सकते हैं?",
    answer:
      "हाँ! छात्र हमारी वेबसाइट पर 'व्यक्तिगत छात्र पंजीकरण' चुनकर ऑनलाइन पोर्टल के माध्यम से सीधे परीक्षा दे सकते हैं।",
    category: "registration",
  },
  {
    id: "faq4",
    question: "क्या यह परीक्षा राष्ट्रीय शिक्षा नीति (NEP 2020) के अनुसार है?",
    answer:
      "जी हाँ, पूर्ण रूप से। BBO का पाठ्यक्रम NCERT एवं NEP 2020 के नए दिशानिर्देशों व भारतीय ज्ञान परंपरा के अनुरूप तैयार किया गया है।",
    category: "general",
  },
  {
    id: "faq5",
    question:
      "विजेता शिक्षकों एवं विद्यालयों को क्या पुरस्कार एवं सम्मान प्रदान किए जाते हैं?",
    answer:
      "प्रधानाचार्यों एवं भाषा शिक्षकों को 'राष्ट्रीय भाषा सेवा सम्मान', स्मृति चिह्न, नकद प्रोत्साहन राशि तथा विज्ञान भवन, नई दिल्ली में आयोजित राष्ट्रीय सम्मेलन में आमंत्रित किया जाता है।",
    category: "awards",
  },
];
export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog1",
    title:
      "संस्कृत आधुनिक एआई एवं कंप्यूटर कोडिंग हेतु सर्वाधिक वैज्ञानिक भाषा क्यों है?",
    excerpt:
      "जानिए किस प्रकार पाणिनि रचित अष्टाध्यायी के सूत्र आधुनिक एआई व भाषा प्रसंस्करण की गणितीय संरचना का आधार बने।",
    content:
      "संस्कृत भारत की प्राचीनतम एवं वैज्ञानिक भाषा है। इसकी संरचना इतनी पूर्ण एवं नियमबद्ध है कि नासा के वैज्ञानिकों ने भी स्वीकार किया कि कृत्रिम बुद्धिमत्ता (AI) के लिए यह सर्वाधिक उपयुक्त भाषा है...",
    category: "Sanskrit & Tech",
    author: "Prof. V. K. Chaturvedi",
    authorRole: "Language Research Chair",
    date: "July 12, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
    tags: ["Sanskrit", "AI", "NEP 2020", "Indian Heritage"],
  },
  {
    id: "blog2",
    title:
      "हिंदी एवं संस्कृत की दक्षता से बच्चों के संज्ञानात्मक विकास व परीक्षा परिणामों में सुधार",
    excerpt:
      "नवीनतम तंत्रिका विज्ञान अध्ययनों के अनुसार देवानागरी उच्चारण व संस्कृत श्लोक पाठ से मस्तिष्क की स्मरण शक्ति व तार्किक क्षमता में 40% की वृद्धि होती है।",
    content:
      "मातृभाषा एवं संस्कृत का नियमित अभ्यास बच्चों की बुद्धि को प्रखर बनाता है। देवनागरी वर्णमाला का वैज्ञानिक उच्चारण स्वरयंत्र और मस्तिष्क के तंत्रिका तंत्र को सक्रिय करता है...",
    category: "Cognitive Science",
    author: "Dr. Meenakshi Sundaram",
    authorRole: "Educational Psychologist",
    date: "July 18, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    tags: ["Child Psychology", "Brain Power", "Olympiad Preparation"],
  },
  {
    id: "blog3",
    title:
      "राष्ट्रीय शिक्षा नीति 2020 की त्रि-भाषा सूत्र योजना एवं भारतीय भाषा पुनर्जागरण",
    excerpt:
      "अभिभावकों एवं शिक्षकों के लिए एनईपी 2020 की भाषा नीति और भारतीय भाषाओं के पुनरोद्धार पर विस्तृत मार्गदर्शिका।",
    content:
      "राष्ट्रीय शिक्षा नीति 2020 भारत की शिक्षा व्यवस्था में नए युग का सूत्रपात करती है। यह भारतीय भाषाओं, संस्कृति एवं ज्ञान परंपरा को नई दिशा प्रदान करती है...",
    category: "NEP 2020 Policy",
    author: "Shri Rajeev Verma",
    authorRole: "Olympiad Convenor",
    date: "July 22, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    tags: ["NEP2020", "Education", "School Curriculum"],
  },
];
export const SAMPLE_STUDENT_REPORTS: Record<string, StudentReport> = {
  "BBO2026-9842": {
    rollNumber: "BBO2026-9842",
    studentName: "Aditya Vikram Sharma",
    schoolName: "Modern High School, New Delhi",
    classLevel: "Class 8th",
    subject: "Hindi & Sanskrit Olympiad",
    score: 96,
    totalMarks: 100,
    percentile: 99.8,
    nationalRank: 4,
    stateRank: 1,
    grade: "A+ Exceptional Distinction",
    strengths: [
      "Vyakaran & Sandhi Vichar (100% accuracy)",
      "Devanagari Phonetics & Spelling Precision",
      "Reading Comprehension & Speed",
    ],
    areasForImprovement: ["Classical Sanskrit Sahitya History details"],
    categoryScores: {
      grammar: 30,
      literature: 23,
      vocabulary: 24,
      comprehension: 19,
    },
  },
  "BBO2026-1045": {
    rollNumber: "BBO2026-1045",
    studentName: "Ananya Joshi",
    schoolName: "DAV Model School, Pune",
    classLevel: "Class 6th",
    subject: "Sanskrit Bhasha Olympiad",
    score: 88,
    totalMarks: 100,
    percentile: 94.5,
    nationalRank: 42,
    stateRank: 5,
    grade: "A Excellent",
    strengths: ["Subhashita Shloka Meaning", "Vocabulary & Synonyms"],
    areasForImprovement: [
      "Dhaturup tenses (Lrit Lakar)",
      "Unseen Sanskrit Passage",
    ],
    categoryScores: {
      grammar: 25,
      literature: 22,
      vocabulary: 23,
      comprehension: 18,
    },
  },
};
export const STATE_PARTICIPATION_DATA: StateParticipation[] = [
  {
    state: "Uttar Pradesh",
    schoolsCount: 480,
    studentsCount: 82000,
    rank1Count: 12,
  },
  {
    state: "Madhya Pradesh",
    schoolsCount: 320,
    studentsCount: 54000,
    rank1Count: 8,
  },
  {
    state: "Rajasthan",
    schoolsCount: 390,
    studentsCount: 68000,
    rank1Count: 10,
  },
  {
    state: "Delhi NCR",
    schoolsCount: 450,
    studentsCount: 75000,
    rank1Count: 15,
  },
  {
    state: "Maharashtra",
    schoolsCount: 280,
    studentsCount: 42000,
    rank1Count: 6,
  },
  {
    state: "Bihar",
    schoolsCount: 310,
    studentsCount: 51000,
    rank1Count: 7,
  },
  {
    state: "Haryana & Punjab",
    schoolsCount: 260,
    studentsCount: 38000,
    rank1Count: 5,
  },
  {
    state: "Gujarat",
    schoolsCount: 190,
    studentsCount: 26000,
    rank1Count: 3,
  },
  {
    state: "Southern & Eastern States",
    schoolsCount: 170,
    studentsCount: 14000,
    rank1Count: 2,
  },
];
export const GALLERY_ITEMS = [
  {
    id: "g1",
    type: "image",
    title: "National Felicitation at Vigyan Bhawan, New Delhi",
    category: "Events",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g2",
    type: "image",
    title: "Students appearing in OMR Examination Hall",
    category: "Exams",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g3",
    type: "image",
    title: "Hon. Education Ministers awarding Gold Trophy to National Rank 1",
    category: "Awards",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g4",
    type: "image",
    title: "Sanskrit Workshop for Educators in Varanasi",
    category: "Teachers",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "g5",
    type: "video",
    title: "Watch Grand Finale Highlights 2025",
    category: "Videos",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "g6",
    type: "image",
    title: "School Principal receiving Best Language Promotion Shield",
    category: "Schools",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
  },
];
export const FOUR_PILLARS = [
  {
    title: "भाषाओं से प्रेम",
    sub: "Love for Indian Languages",
    desc: "हम भारतीय भाषाओं से प्रेम करते हैं। हमारा संकल्प है कि हम नई पीढ़ी में भाषाओं के प्रति सम्मान और लगाव जगाएँ।",
    icon: "HeartHandshake",
    color: "amber",
    image: "/why-choose/img-1.jpg",
  },
  {
    title: "भारतीय भाषाओं को बढ़ावा",
    sub: "Promoting Heritage",
    desc: "यह ओलंपियाड हिंदी और संस्कृत भाषाओं के अध्ययन, संरक्षण और उनके प्रचार-प्रसार के उद्देश्य से आयोजित किया जाता है।",
    icon: "Flag",
    color: "rose",
    image: "/why-choose/img-2.jpg",
  },
  {
    title: "भारत का प्रथम हिंदी एवं संस्कृत ओलंपियाड",
    sub: "Pioneer National Olympiad",
    desc: "कक्षा I से X तक के विद्यार्थियों के लिए विशेष रूप से आयोजित अद्वितीय राष्ट्रीय मंच।",
    icon: "Trophy",
    color: "yellow",
    image: "/why-choose/img-3.jpg",
  },
  {
    title: "बेंचमार्क आधारित मूल्यांकन",
    sub: "Growth over Ranking",
    desc: "हम रैंकिंग में विश्वास नहीं करते, हम विकास में विश्वास करते हैं। हमारा उद्देश्य बेंचमार्क, समग्रता और आगे बढ़ना है।",
    icon: "TrendingUp",
    color: "emerald",
    image: "/why-choose/img-4.jpg",
  },
];
export const NEP_2020_PILLARS = [
  {
    title: "बहुभाषिक शिक्षा",
    desc: "Multilingual Education",
    icon: "Globe2",
  },
  {
    title: "भारतीय ज्ञान परंपरा",
    desc: "Indian Knowledge System",
    icon: "BookOpenCheck",
  },
  {
    title: "समग्र विकास",
    desc: "Holistic Student Growth",
    icon: "Sparkles",
  },
  {
    title: "क्षमता आधारित शिक्षा",
    desc: "Competency-based Evaluation",
    icon: "Brain",
  },
  {
    title: "समावेशी शिक्षा",
    desc: "Inclusive Learning Opportunity",
    icon: "Users",
  },
];
