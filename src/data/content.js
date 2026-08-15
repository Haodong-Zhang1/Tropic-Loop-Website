export const navigation = [
  { id: "home", path: "/", label: { zh: "本周", en: "This week" } },
  { id: "study", path: "/study", label: { zh: "学业", en: "Study" } },
  { id: "life", path: "/life", label: { zh: "生活", en: "Life" } },
  {
    id: "opportunities",
    path: "/opportunities",
    label: { zh: "机会", en: "Opportunities" },
  },
];

export const imageSources = {
  campus: {
    src: "https://www.jcu.edu.au/about-jcu/campuses/cairns/images/cairns-4.jpg",
    source: "https://www.jcu.edu.au/about-jcu/campuses/cairns",
  },
  ideasLab: {
    src: "https://www.jcu.edu.au/_media/reskin-banner-images-for-inside-pages/New-JCU-Ideas-Lab-banner-1-copy.jpg",
    source: "https://www.jcu.edu.au/jcu-ideas-lab",
  },
  johnGreyHall: {
    src: "https://www.jcu.edu.au/accommodation/student-accommodation-cairns/images/John-grey-hall-1.jpg",
    source: "https://www.jcu.edu.au/accommodation/student-accommodation-cairns",
  },
};

export const copy = {
  zh: {
    home: {
      eyebrow: "YOUR NORTH QUEENSLAND STUDENT HUB",
      headline: "在 JCU 学习，\n也在北昆士兰生活。",
      promise: "课程、生活与机会，一处找到。",
      intro: "从凯恩斯首发，逐步扩展到汤斯维尔，为中国与国际学生整理真正有用的本地信息。",
      weekly: "本周重点",
      exploreTitle: "本周去看看",
      exploreIntro: "从真实校园出发，继续探索生活与机会页面。",
    },
    study: {
      eyebrow: "STUDY AT JCU",
      title: "先看懂课程，\n再开始投入。",
      intro: "按专业整理课程脉络、关键术语与复习入口，减少在 LearnJCU、邮件和群聊之间来回寻找。",
      sectionTitle: "选择你的学习路径",
      selected: "当前课程",
      toolkit: "首批学习工具",
      toolkitItems: ["双语关键术语", "每周复习路线", "公开课程资源"],
      notice: "学习页只提供理解、规划与复习支持，不代写或代做评估任务。",
    },
    life: {
      eyebrow: "LIVE IN CAIRNS",
      title: "落地之后，\n少走一点弯路。",
      intro: "把交通、住宿、通信和日常决策放进清晰的场景里；需要实时信息时，直接回到官方来源。",
      sectionTitle: "生活服务入口",
      placeTitle: "先认识校园与住宿",
    },
    opportunities: {
      eyebrow: "BUILD WHAT COMES NEXT",
      title: "不只看到活动，\n也找到参与方式。",
      intro: "筛选与专业相关的项目、创新活动和真实任务，并明确它们现在处于什么阶段。",
      sectionTitle: "机会板",
      placeTitle: "Ideas Lab 连接点",
      planned: "筹备中",
    },
    searchPlaceholder: "搜索课程、公交、住宿、电话卡或活动",
    menu: "打开导航",
    close: "关闭导航",
    search: "搜索",
    searchFound: "找到相关内容",
    searchEmpty: "暂时没有找到，建议尝试课程代码、住宿、公交或活动。",
    openResult: "打开相关页面",
    source: "查看官方来源",
    learnMore: "进入页面",
    disclaimer: "本指南独立于任何大学或机构，内容由学生社区与教育从业者共同维护。",
  },
  en: {
    home: {
      eyebrow: "YOUR NORTH QUEENSLAND STUDENT HUB",
      headline: "Study at JCU.\nLive in North Queensland.",
      promise: "Courses, local life and opportunities — in one place.",
      intro: "Starting in Cairns and expanding to Townsville, with useful local information for Chinese and international students.",
      weekly: "This week",
      exploreTitle: "Explore this week",
      exploreIntro: "Start with the real campus, then continue into Life and Opportunities.",
    },
    study: {
      eyebrow: "STUDY AT JCU",
      title: "Understand the course.\nThen make a plan.",
      intro: "Course context, key terminology and revision entry points, organised by study path.",
      sectionTitle: "Choose your study path",
      selected: "Selected course",
      toolkit: "First-release study tools",
      toolkitItems: ["Bilingual key terms", "Weekly revision route", "Public learning resources"],
      notice: "Study support covers understanding, planning and revision. It does not provide assessment answers.",
    },
    life: {
      eyebrow: "LIVE IN CAIRNS",
      title: "Settle in with\nfewer wrong turns.",
      intro: "Transport, housing, mobile services and daily decisions organised by real student situations, with official links for live information.",
      sectionTitle: "Life service entry points",
      placeTitle: "Know the campus and housing first",
    },
    opportunities: {
      eyebrow: "BUILD WHAT COMES NEXT",
      title: "See the opportunity.\nKnow how to join.",
      intro: "Relevant projects, innovation activities and practical tasks, each shown with a clear current status.",
      sectionTitle: "Opportunity board",
      placeTitle: "Ideas Lab connection point",
      planned: "In preparation",
    },
    searchPlaceholder: "Search courses, buses, housing, SIM cards or events",
    menu: "Open navigation",
    close: "Close navigation",
    search: "Search",
    searchFound: "Relevant information found",
    searchEmpty: "No match yet. Try a course code, housing, buses or events.",
    openResult: "Open related page",
    source: "View official source",
    learnMore: "Open page",
    disclaimer: "This independent guide is not affiliated with any university. Content is maintained by the student community and education practitioners.",
  },
};

export const weeklyItems = [
  {
    id: "start",
    route: "/study",
    zh: "新学期冲刺：课程安排与学习计划建议",
    en: "Trim start: course planning and study checklist",
  },
  {
    id: "data",
    route: "/study",
    zh: "数据科学作业与项目时间线更新",
    en: "Data Science assessment and project timeline",
  },
  {
    id: "cairns",
    route: "/life",
    zh: "凯恩斯生活：交通、天气与活动推荐",
    en: "Cairns life: transport, weather and events",
  },
];

export const locations = [
  {
    id: "ideas-lab",
    route: "/opportunities",
    image: imageSources.ideasLab,
    title: { zh: "Ideas Lab · 创新与实习", en: "Ideas Lab · Innovation and projects" },
    description: {
      zh: "开放、协作、实践创新，连接课堂与真实世界。",
      en: "An open place for collaboration, practical innovation and industry connection.",
    },
  },
  {
    id: "john-grey-hall",
    route: "/life",
    image: imageSources.johnGreyHall,
    title: { zh: "John Grey Hall · 住宿与社区", en: "John Grey Hall · Housing and community" },
    description: {
      zh: "舒适安全的住宿环境，建立归属与支持的社区。",
      en: "A comfortable, safe place to build belonging and a supportive community.",
    },
  },
];

export const lifeServices = [
  {
    id: "transport",
    title: { zh: "公交与校园动线", en: "Buses and campus routes" },
    description: {
      zh: "从校区、公交站到常用目的地，按场景说明怎么走、去哪里查实时信息。",
      en: "Practical routes from campus and bus stops, with links back to live information.",
    },
    meta: { zh: "首批指南", en: "First-release guide" },
  },
  {
    id: "housing",
    title: { zh: "住宿与搬家", en: "Housing and moving" },
    description: {
      zh: "入住前要确认什么、常见住宿选择，以及建立稳定生活节奏的第一步。",
      en: "What to confirm before moving in and how to establish a stable first week.",
    },
    meta: { zh: "首批指南", en: "First-release guide" },
  },
  {
    id: "mobile",
    title: { zh: "电话卡与银行", en: "Mobile plans and banking" },
    description: {
      zh: "比较办理条件、校园附近网点和常见套餐，不把广告包装成建议。",
      en: "Compare setup requirements, nearby branches and common plans without promotional ranking.",
    },
    meta: { zh: "内容整理中", en: "Content in progress" },
  },
  {
    id: "daily",
    title: { zh: "吃饭与日常服务", en: "Food and daily services" },
    description: {
      zh: "餐厅、超市、理发等高频选择，优先记录价格区间、预约方式与更新时间。",
      en: "Food, groceries and services with price bands, booking details and update dates.",
    },
    meta: { zh: "内容整理中", en: "Content in progress" },
  },
];

export const opportunityItems = [
  {
    id: "ideas-projects",
    title: { zh: "Ideas Lab 项目连接", en: "Ideas Lab project connection" },
    description: {
      zh: "把适合学生参与的创新项目整理成目标、周期、需要能力与报名方式。",
      en: "Turn relevant innovation projects into clear goals, timelines, skills and joining steps.",
    },
    status: { zh: "首批内容筹备中", en: "First entries in preparation" },
  },
  {
    id: "brief-board",
    title: { zh: "真实任务与实习板", en: "Practical brief and placement board" },
    description: {
      zh: "发布边界清楚、可验证交付的短期任务；没有确认的岗位不会标成实习。",
      en: "Publish bounded, verifiable briefs; unconfirmed roles are not presented as placements.",
    },
    status: { zh: "需求收集中", en: "Collecting briefs" },
  },
  {
    id: "jcu-xut",
    title: { zh: "JCU–XUT 创新协作", en: "JCU–XUT innovation collaboration" },
    description: {
      zh: "为两校学生探索远程项目与创新交流，学校支持与学分安排以正式确认为准。",
      en: "Explore remote projects and exchange; institutional support and credit remain subject to formal confirmation.",
    },
    status: { zh: "合作方案准备中", en: "Collaboration plan in preparation" },
  },
];

export const studyPaths = [
  {
    id: "data-science",
    label: { zh: "Data Science 数据科学", en: "Data Science" },
    courses: [
      {
        code: "MA3831",
        title: "Natural Language Processing, Web Scraping and Large Data Processing",
        zh: "自然语言处理、网络爬取与大数据处理",
      },
      { code: "MA2405", title: "Advanced Statistical Modelling", zh: "高级统计建模" },
      { code: "MA2830", title: "Data Visualisation", zh: "数据可视化" },
      { code: "CP2414", title: "Network Security", zh: "网络安全" },
    ],
  },
  {
    id: "iot",
    label: { zh: "IoT 物联网", en: "Internet of Things" },
    courses: [
      { code: "IOT 01", title: "IoT study roadmap", zh: "物联网学习路线与术语" },
      { code: "IOT 02", title: "Embedded systems toolkit", zh: "嵌入式系统工具与实验准备" },
      { code: "IOT 03", title: "Project and lab planning", zh: "项目与实验时间线" },
    ],
  },
  {
    id: "electronic-engineering",
    label: { zh: "Electronic Engineering 电子工程", en: "Electronic Engineering" },
    courses: [
      { code: "EE 01", title: "Engineering study roadmap", zh: "电子工程学习路线" },
      { code: "EE 02", title: "Lab and safety checklist", zh: "实验室与安全清单" },
      { code: "EE 03", title: "Project preparation", zh: "项目准备与学术表达" },
    ],
  },
];
