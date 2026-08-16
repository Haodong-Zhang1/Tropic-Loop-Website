export const navigation = [
  { id: "home", path: "/", label: { zh: "本周", en: "This week" } },
  { id: "campus", path: "/campus", label: { zh: "校园", en: "Campus" } },
  { id: "study", path: "/study", label: { zh: "学业", en: "Study" } },
  { id: "life", path: "/life", label: { zh: "生活", en: "Life" } },
  { id: "culture", path: "/culture", label: { zh: "文化", en: "Culture" } },
  { id: "market", path: "/market", label: { zh: "社区", en: "Community" } },
  { id: "career", path: "/career", label: { zh: "发展", en: "Career" } },
  { id: "about", path: "/about", label: { zh: "作者", en: "About" } },
];

export const appRoutes = [
  ...navigation,
  { id: "opportunities", path: "/opportunities" },
  { id: "setup", path: "/setup" },
  { id: "essentials", path: "/essentials" },
];

export const imageSources = {
  cairnsCampus: {
    src: "https://www.jcu.edu.au/about-jcu/campuses/cairns/images/cairns-4.jpg",
    source: "https://www.jcu.edu.au/about-jcu/campuses/cairns",
  },
  townsvilleCampus: {
    src: "https://www.jcu.edu.au/about-jcu/campuses/townsville/images/Tnsvl-2.jpg",
    source: "https://www.jcu.edu.au/about-jcu/campuses/townsville",
  },
  cairnsCampusGuide: {
    src: "https://www.jcu.edu.au/__data/assets/image/0006/2333463/Still-2026-04-16-151931_1.21.1-1.jpg",
    source: "https://www.jcu.edu.au/about-jcu/campuses/cairns",
  },
  cairnsStudy: {
    src: "https://www.jcu.edu.au/jcu-ideas-lab/create/Maren_Eibner_Makerspace_03022022-19.jpg/feature-image.jpg",
    source: "https://www.jcu.edu.au/jcu-ideas-lab/create",
  },
  cairnsCulture: {
    src: "https://www.cairns.qld.gov.au/__data/assets/image/0004/334057/Visiting_CFImage.jpg",
    source: "https://www.cairns.qld.gov.au/festival/your-festival",
  },
  townsvilleCampusGuide: {
    src: "https://www.jcu.edu.au/about-jcu/campuses/townsville/images/Tnsvl-10.jpg",
    source: "https://www.jcu.edu.au/about-jcu/campuses/townsville",
  },
  townsvilleStudy: {
    src: "https://www.jcu.edu.au/_media/l1-homepage-wall-images/ttlgs0002875-3028-1.jpg",
    source: "https://www.jcu.edu.au/about-jcu/campuses/townsville",
  },
  townsvilleCulture: {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Cultural_Fest_in_The_Strand_2009.jpg/1920px-Cultural_Fest_in_The_Strand_2009.jpg",
    source: "https://commons.wikimedia.org/wiki/File:Cultural_Fest_in_The_Strand_2009.jpg",
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

const parseBuildingList = (campusId, value) => value.trim().split("\n").map((line) => {
  const [, code, name] = line.match(/^(\S+)\s+(.+)$/);
  return { id: `${campusId}-${code.toLowerCase()}`, campus: campusId, code, name };
});

const cairnsBuildings = parseBuildingList("cairns", `
A1 Chancellery Building
A2 A2
A3 Crowther Theatres
A4 A4
A11 Post Graduate Centre
A21 Indigenous Education and Research Centre
A22 The Boathouse
A23 Amphitheatre
A24 Gymnasium
A25 Refectory
B1 Library
B10 Community Garden Shed
B20 Environmental Research Complex Shed
D1 College of Medicine & Dentistry
D2 Dental Clinic
D3 The Cairns Institute
D4 JCU Ideas Lab
E1 Health and Sciences
E2 Sir Robert Norman Building
E3 Tropical Medicine Mosquito Research
E4 Queensland Tropical Health Alliance
E5 AITHM Cairns
E11 JCU eduQuarium
F1 Cairns Student Accommodation
NCC Newman Catholic College (non-JCU)
`);

const townsvilleBuildings = parseBuildingList("townsville", `
001 Ken Back Chancellery Building
004 Social Sciences
005 Central Lecture Theatre
012 Refectory (Closed)
013 Student Association Store
014 Engineering and Physical Sciences 2
015 Engineering and Physical Sciences 1
016 Store
017 Faculty of Science and Engineering
018 Eddie Koiki Mabo Library
018A End of Ride Facility
019 Kevin Stark Research Building
020 Molecular Genetics Laboratory
025 Nursing Sciences
026 Sir George Kneipp Auditorium
027 Enterprise Exchange
028 Building 028
029 Building 029
030 Enkindle Village School
031 Immunogenetics Research Facility
032 Sir George Fisher Research Building
033 Building 033
034 Earth and Environmental Sciences
035 Chemistry Solvent Store
039 Medical 1
040 Padua Theatre
041 Building 041
042 Anton Breini Centre
043 Rehabilitation and Exercise Sciences
045 Medical Lecture Theatre
046 Anatomy and Clinical Skills
047 Pharmacy and Medical Research
048 Australian Institute of Tropical Health and Medicine
050 Estate Directorate - Equipment Shed
052 Cyclone Testing Station Wind Tunnel - Amenities
053 Cyclone Testing Station Wind Tunnel
055 Demountables A and B
056 Facilities Workshop
057 Estate Directorate
058 Mechanical Engineering Workshop
059 Bulk Store 1
060 Bulk Store 2
061 Engineering Lab and Pilot Plant
061A Chemical Engineering Garage
062 CDC Storage Hut
063 ATSIP General Store
064 Nursery
065 AIMS@JCU Aqua Shed
066 Garden Shed
067 Marine and Aquaculture Research
069 CO2 Research Glass House
070 Animal and Entomology House
071 Aquaculture Research
071A Aquaculture Research Shed
075B AquaShed 2
078D MARF 78D
079 Amphibian Research
080 North Queensland Controlled Environment Facility
081 Cattle Pens
082 Metabolism Unit
083 Hay Shed
084 Post Mortem Building
085 Aquatic Pathology Lab
086 Small Animal House
087 Veterinary and Biomedical Sciences
088 Barra Shed
089 Microbiology Teaching Lab
090 Medical Laboratory Science Teaching Lab
092 Physiology and Pharmacology Research Lab
093 Central Solvent Store
094 Veterinary and Biomedical Sciences
095 Unicare Centre
096 Pump House
097 Veterinary and Biomedical Sciences
098 Tennis Shelter
099 Sport and Recreation Centre
100 Squash Courts
101 Cricket Pavillion
102 Veterinary Anatomy and Pathology
103 Lamb Shed
104 Veterinary Emergency Centre and Hospital
105 Veterinary Amenities Building
106 Veterinary Reproduction Facility
107 Veterinary Post-Graduate Facility
108 Veterinary Pathology and Biomedical Sciences
109 MARF Store
110 MARF Teaching Facility
112 University Hall - Administration
113 University Hall - Store
114 University Hall - Townhouse 5
115 University Hall - Townhouse 4
116 University Hall - Townhouse 3
117 University Hall - Townhouse 2
118 University Hall - Townhouse 1
119 University Hall - The Lodge
120 University Hall Storage Shed 1
121 University Hall Storage Shed 2
122 Pig Shed
131 Chaplaincy
132 Uni Kids
133 Building 133
134 Education Central
135 Outdoor Indigenous Learning Space
136 University Hall - Clark Wing
137 St Marks College - McGregor Wing
139 St Marks College - Shed
140 Manager's Residence
142 The Science Place
142A The Science Place - Annex
143 Central Plaza
145 Australian Tropical Science and Innovation Precinct (ATSIP)
146 ATSIP Booster Pump House
148 ATSIP Support
150 ATSIP Glass House
151 ATSIP Shade House
152 ATSIP Vehicle Shelter
161 Saints Catholic College - Grail and Merrick
162 Saints Catholic College - O'Leary Wing
164 Saints Catholic College - Kneipp Wing
166 Saints Catholic College - Tom Priestly
168 Saints Catholic College - MacKillop Wing
170 MARF Shed
171 MARF Greenhouse
180 Macroalgae Research Facility
191 Rotary International House - Administration
192 Rotary International House - Common Room 1
193 Rotary International House - B Block
194 Rotary International House - A Block
195 Rotary International House - D Block
196 Rotary International House - C Block
197 Rotary International House - F Block
198 Rotary International House - E Block
199 Rotary International House - Laundry and Toilets
200 Rotary International House - Common Room 2
201 John Flynn College - Rosendale House
202 John Flynn College - Martin House
203 John Flynn College - Stewart Close
204 John Flynn College - Mackay House
205 John Flynn College - Philip Wing
206 John Flynn College - Dining Hall
207 John Flynn College - Harrison Wing
208 John Flynn College - Wigney Lodge
209 John Flynn College - Traeger House
211 John Flynn College - Lachie Marsh House
212 John Flynn College - Caddies Place
213 John Flynn College - L Deck 1
214 John Flynn College - L Deck 2
215 John Flynn College - L Deck 3
216 John Flynn College - Study Room
217 John Flynn College - Workshop
245 Act for Kids Administration
246 Act for Kids - Shed 1
247 Act for Kids - Shed 2
281 George Roberts Hall - Dining Hall
282 George Roberts Hall - Manager's Residence
283 George Roberts Hall - Administration
284 George Roberts Hall - A Block
285 George Roberts Hall - B Block
286 George Roberts Hall - C Block
287 George Roberts Hall - D Block
288 George Roberts Hall - E Block
289 George Roberts Hall - F Block
290 George Roberts Hall - G Block
291 George Roberts Hall - H Block
292 George Roberts Hall - Shed 3
300 Bebegu Yumba - Design Garage
301 Bebegu Yumba - Indigenous Education and Research
302 Bebegu Yumba - Arts and Creative Media
303 Bebegu Yumba - Amenities
310 Chilled Water Plant
311 Thermal Energy Storage Tank
312 Pressure Loading and Air Cannon Facility
315 Estate Directorate - Garage
316 Estate Directorate - Storage Shed
398 Sport Shed
403 Sport and Recreation Store
404 Equine Shed
405 Animal Shed 1
406 Animal Shed 2
407 Animal Shed 3
408 Animal Shed 4
409 Animal Shed 5
410 MARF Shed 2
411 Biology Field Trip Preparation and Stores
412 ATSIP Research Container
413 MARF Shelter 1 / Hay Shed 2
414 MARF Shelter 2
418 Animal Shed 6
500 Clinical Practice Building
502 Burralga Yumba
506 Engineering & Innovation Place
`);

export const buildingDirectory = [...cairnsBuildings, ...townsvilleBuildings];

export const campuses = {
  cairns: {
    id: "cairns",
    name: { zh: "凯恩斯校区", en: "Cairns campus" },
    traditionalName: "Nguma-bada campus, Smithfield",
    address: "14–88 McGregor Road, Smithfield QLD 4878",
    image: imageSources.cairnsCampus,
    campusImage: imageSources.cairnsCampusGuide,
    studyImage: imageSources.cairnsStudy,
    cultureImage: imageSources.cairnsCulture,
    maps: {
      interactive: "https://jcu.app/map",
      printable: "https://www.jcu.edu.au/about-jcu/campuses/maps/Cairns_Green_A3.pdf",
      google: "https://www.google.com/maps/search/?api=1&query=James+Cook+University+Cairns+14-88+McGregor+Road+Smithfield+QLD",
    },
    lifeImage: imageSources.johnGreyHall,
    opportunityImage: imageSources.ideasLab,
  },
  townsville: {
    id: "townsville",
    name: { zh: "汤斯维尔校区", en: "Townsville campus" },
    traditionalName: "Bebegu Yumba campus, Douglas",
    address: "1 James Cook Drive, Douglas QLD 4811",
    image: imageSources.townsvilleCampus,
    campusImage: imageSources.townsvilleCampusGuide,
    studyImage: imageSources.townsvilleStudy,
    cultureImage: imageSources.townsvilleCulture,
    maps: {
      interactive: "https://jcu.app/map",
      printable: "https://www.jcu.edu.au/about-jcu/campuses/maps/Townsville_Green_A3.pdf",
      google: "https://www.google.com/maps/search/?api=1&query=James+Cook+University+Townsville+1+James+Cook+Drive+Douglas+QLD",
    },
    lifeImage: imageSources.townsvilleCampus,
    opportunityImage: imageSources.townsvilleCampus,
  },
};

export const staffDirectory = [
  {
    id: "staff-search",
    name: { zh: "JCU 导师与员工目录", en: "JCU staff directory" },
    role: { zh: "按姓名查找官方联系方式；办公室变动以目录为准", en: "Search official contacts by name; confirm office details in the directory" },
    campus: "both",
    url: "https://apps.jcu.edu.au/contact-us/",
  },
  {
    id: "dianna-hardy",
    name: { zh: "Dianna Hardy", en: "Dianna Hardy" },
    role: { zh: "JCU Research Portfolio 研究者档案", en: "JCU Research Portfolio profile" },
    campus: "cairns",
    url: "https://portfolio.jcu.edu.au/Researchers/dianna.hardy",
  },
  {
    id: "shaun-belward",
    name: { zh: "Shaun Belward", en: "Shaun Belward" },
    role: { zh: "Master of Data Science 课程协调信息", en: "Master of Data Science course coordination" },
    campus: "townsville",
    office: { code: "017", name: "Faculty of Science and Engineering" },
    url: "https://portfolio.jcu.edu.au/researchers/shaun.belward/",
  },
  {
    id: "yvette-everingham",
    name: { zh: "Yvette Everingham", en: "Yvette Everingham" },
    role: { zh: "JCU Research Portfolio 研究者档案", en: "JCU Research Portfolio profile" },
    campus: "townsville",
    url: "https://portfolio.jcu.edu.au/Researchers/yvette.everingham",
  },
  {
    id: "mark-cyrus",
    name: { zh: "Mark Cyrus", en: "Mark Cyrus" },
    role: { zh: "JCU Research Portfolio 研究者档案", en: "JCU Research Portfolio profile" },
    campus: "cairns",
    url: "https://portfolio.jcu.edu.au/researchers/mark.cyrus/",
  },
];

export const campusOffices = [
  { id: "library-cairns", campus: "cairns", code: "B1", name: { zh: "凯恩斯图书馆", en: "Cairns Library" } },
  { id: "student-cairns", campus: "cairns", code: "A24", name: { zh: "学生会", en: "Student Association" } },
  { id: "ideas-cairns", campus: "cairns", code: "D4", name: { zh: "JCU Ideas Lab", en: "JCU Ideas Lab" } },
  { id: "grs-cairns", campus: "cairns", code: "E2", name: { zh: "研究生院 GRS", en: "Graduate Research School" } },
  { id: "library-townsville", campus: "townsville", code: "018", name: { zh: "Eddie Koiki Mabo 图书馆", en: "Eddie Koiki Mabo Library" } },
  { id: "student-townsville", campus: "townsville", code: "133", name: { zh: "学生会", en: "Student Association" } },
  { id: "research-townsville", campus: "townsville", code: "142", name: { zh: "Research and Innovation · Science Place", en: "Research and Innovation · Science Place" } },
  { id: "ierc-townsville", campus: "townsville", code: "301", name: { zh: "原住民教育与研究中心", en: "Indigenous Education and Research Centre" } },
];

export const copy = {
  zh: {
    home: {
      eyebrow: "YOUR NORTH QUEENSLAND STUDENT HUB",
      headline: "在 JCU 学习，\n也在北昆士兰生活。",
      promise: "课程、生活与机会，一处找到。",
      intro: "先选择你所在的校区；本周安排、校园路线与课程入口会随之更新。",
      weekly: "本周重点",
      exploreTitle: "从校园开始",
      exploreIntro: "官方校园信息、住宿与创新空间，一次找到正确入口。",
    },
    campus: {
      eyebrow: "FIND YOUR WAY AROUND JCU",
      title: "楼号、办公室、路线，\n一搜就到。",
      intro: "搜索楼号、建筑、服务或导师；详细位置与路线回到 JCU 官方地图和 Google Maps。",
      sectionTitle: "校园建筑目录",
      officesTitle: "常用办公室",
      staffTitle: "查导师与员工",
    },
    study: {
      eyebrow: "STUDY AT JCU",
      title: "先看懂课程，\n再开始投入。",
      intro: "查 JCU 课程，也看懂 JCU–XUT 2+2 与 3+2 的培养路径、学分边界和每一步要确认的材料。",
      sectionTitle: "规划你的学业路径",
      jcuMode: "JCU 课程库",
      publicMode: "公开学习资源",
      jointMode: "JCU–XUT 中外合办",
      selected: "当前课程",
      toolkit: "首批学习工具",
      toolkitItems: ["双语关键术语", "每周复习路线", "公开课程资源"],
      notice: "学习页只提供理解、规划与复习支持，不代写或代做评估任务。",
    },
    life: {
      eyebrow: "LIVE IN NORTH QUEENSLAND",
      title: "落地之后，\n少走一点弯路。",
      intro: "把交通、住宿、通信和日常决策放进清晰场景；实时信息直接回到官方来源。",
      sectionTitle: "生活服务入口",
      routeTitle: "常用路线",
      placeTitle: "校园位置与交通入口",
    },
    culture: {
      eyebrow: "UNDERSTAND THE PLACE YOU STUDY IN",
      title: "先理解这里，\n再真正融入这里。",
      intro: "从澳洲日常、JCU 校园到北昆士兰节庆，了解新环境的表达方式、文化边界和参与入口。",
      layersTitle: "从三个层次认识新环境",
      eventsTitle: "北昆士兰年度文化日历",
      tipsTitle: "同学真正会用到的 Tips",
      contributeTitle: "分享你的生活经验",
    },
    setup: {
      eyebrow: "SET UP YOUR FIRST WEEK",
      title: "电话卡和银行卡，\n一次比较清楚。",
      intro: "先看长期价格、覆盖和开户条件，再进入运营商或银行官方页面办理。促销可能随时变化。",
      mobileTitle: "电话卡套餐比较",
      bankTitle: "学生日常账户比较",
      checklistTitle: "办理前准备",
    },
    essentials: {
      eyebrow: "EVERYDAY NORTH QUEENSLAND",
      title: "吃饭、娱乐和生活采购，\n按场景找到。",
      intro: "先收录校区附近和学生高频使用的公开入口；价格、营业时间和预约要求以商家页面为准。",
      sectionTitle: "日常生活目录",
    },
    opportunities: {
      eyebrow: "BUILD WHAT COMES NEXT",
      title: "不只看到活动，\n也找到参与方式。",
      intro: "筛选与专业相关的项目、创新活动和真实任务，并明确当前状态。",
      sectionTitle: "机会板",
      placeTitle: "创新与实践连接点",
    },
    market: {
      eyebrow: "STUDENT-TO-STUDENT COMMUNITY",
      title: "闲置流动起来，\n小事顺手解决。",
      intro: "发布二手物品，或请同校区同学顺路带一件。先把需求、价格和交接方式说清楚。",
      sectionTitle: "社区发布板",
      secondhand: "二手物品",
      errand: "顺手带一件",
    },
    career: {
      eyebrow: "CAREER & DEVELOPMENT",
      title: "从第一份经历，\n走向下一份机会。",
      intro: "把就业入口、实践路径和申请准备整理在一起；公开信息优先回到 JCU 与澳洲官方来源。",
      sectionTitle: "你的发展路线",
      resourcesTitle: "可信就业入口",
      voicesTitle: "老师与学长学姐经验",
    },
    about: {
      eyebrow: "ABOUT TROPIC LOOP",
      title: "一个学生做的，\n也为学生持续更新。",
      intro: "Tropic Loop 由 Haodong Zhang 独立发起和维护，源于在 JCU 凯恩斯校区学习生活两年的真实信息痛点。",
    },
    chooseCampus: "选择校区",
    searchPlaceholder: "搜索课程、导师、楼号、公交、住宿或活动",
    menu: "打开导航",
    close: "关闭导航",
    search: "搜索",
    searchFound: "找到相关内容",
    searchEmpty: "暂时没有找到。可尝试课程代码、导师姓名、楼号或服务名称。",
    openResult: "打开结果",
    source: "查看官方来源",
    learnMore: "进入页面",
    officialMap: "JCU 互动地图",
    printableMap: "下载详细校园地图",
    googleMap: "Google Maps",
    staffSearch: "搜索官方人员目录",
    disclaimer: "本指南独立于任何大学或机构，内容由学生社区与教育从业者共同维护。",
  },
  en: {
    home: {
      eyebrow: "YOUR NORTH QUEENSLAND STUDENT HUB",
      headline: "Study at JCU.\nLive in North Queensland.",
      promise: "Courses, local life and opportunities — in one place.",
      intro: "Choose your campus first; weekly tasks, campus routes and course links update with it.",
      weekly: "This week",
      exploreTitle: "Start with the campus",
      exploreIntro: "Official campus information, housing and innovation spaces with the right next link.",
    },
    campus: {
      eyebrow: "FIND YOUR WAY AROUND JCU",
      title: "Buildings, offices, routes.\nOne search away.",
      intro: "Search building numbers, services or staff, then continue to the official JCU map or Google Maps.",
      sectionTitle: "Campus building directory",
      officesTitle: "Common offices",
      staffTitle: "Find staff",
    },
    study: {
      eyebrow: "STUDY AT JCU",
      title: "Understand the course.\nThen make a plan.",
      intro: "Explore JCU subjects and understand the credit, timing and confirmation points across JCU–XUT 2+2 and 3+2 pathways.",
      sectionTitle: "Plan your study pathway",
      jcuMode: "JCU subject library",
      publicMode: "Open learning resources",
      jointMode: "JCU–XUT joint pathways",
      selected: "Selected course",
      toolkit: "First-release study tools",
      toolkitItems: ["Bilingual key terms", "Weekly revision route", "Public learning resources"],
      notice: "Study support covers understanding, planning and revision. It does not provide assessment answers.",
    },
    life: {
      eyebrow: "LIVE IN NORTH QUEENSLAND",
      title: "Settle in with\nfewer wrong turns.",
      intro: "Transport, housing, mobile services and daily decisions organised by real situations with official live links.",
      sectionTitle: "Life service entry points",
      routeTitle: "Useful routes",
      placeTitle: "Campus location and transport",
    },
    culture: {
      eyebrow: "UNDERSTAND THE PLACE YOU STUDY IN",
      title: "Understand the place.\nThen become part of it.",
      intro: "Explore Australian everyday life, JCU campus culture and North Queensland events, with practical ways to participate respectfully.",
      layersTitle: "Understand your new environment in three layers",
      eventsTitle: "North Queensland annual culture calendar",
      tipsTitle: "Tips students will actually use",
      contributeTitle: "Share what you have learned",
    },
    setup: {
      eyebrow: "SET UP YOUR FIRST WEEK",
      title: "Compare mobile and banking.\nThen set them up.",
      intro: "Check ongoing price, coverage and eligibility before continuing to the provider's official application page. Promotions can change.",
      mobileTitle: "Mobile plan comparison",
      bankTitle: "Student everyday account comparison",
      checklistTitle: "What to prepare",
    },
    essentials: {
      eyebrow: "EVERYDAY NORTH QUEENSLAND",
      title: "Food, fun and essentials.\nSorted by situation.",
      intro: "A first directory of useful public options near campus. Confirm prices, opening hours and bookings with each provider.",
      sectionTitle: "Everyday directory",
    },
    opportunities: {
      eyebrow: "BUILD WHAT COMES NEXT",
      title: "See the opportunity.\nKnow how to join.",
      intro: "Relevant projects, innovation activities and practical tasks with a clear current status.",
      sectionTitle: "Opportunity board",
      placeTitle: "Innovation and practice connection",
    },
    market: {
      eyebrow: "STUDENT-TO-STUDENT COMMUNITY",
      title: "Give useful things another life.\nGet small errands done.",
      intro: "List second-hand items or ask a student on the same campus to pick up one thing along the way. Keep the request, price and handover clear.",
      sectionTitle: "Community board",
      secondhand: "Second-hand",
      errand: "Bring one thing",
    },
    career: {
      eyebrow: "CAREER & DEVELOPMENT",
      title: "Build your first experience.\nThen your next opportunity.",
      intro: "Employment links, practical pathways and application preparation in one place, prioritising official JCU and Australian sources.",
      sectionTitle: "Your development route",
      resourcesTitle: "Trusted career entry points",
      voicesTitle: "Teacher and alumni experience",
    },
    about: {
      eyebrow: "ABOUT TROPIC LOOP",
      title: "Built by a student.\nKept useful for students.",
      intro: "Tropic Loop is independently created and maintained by Haodong Zhang, shaped by two years of studying and living at JCU Cairns.",
    },
    chooseCampus: "Choose campus",
    searchPlaceholder: "Search courses, staff, buildings, buses, housing or events",
    menu: "Open navigation",
    close: "Close navigation",
    search: "Search",
    searchFound: "Relevant information found",
    searchEmpty: "No match yet. Try a course code, staff name, building number or service.",
    openResult: "Open result",
    source: "View official source",
    learnMore: "Open page",
    officialMap: "JCU interactive map",
    printableMap: "Download detailed campus map",
    googleMap: "Google Maps",
    staffSearch: "Search official staff directory",
    disclaimer: "This independent guide is not affiliated with any university. Content is maintained by the student community and education practitioners.",
  },
};

export const weeklyItems = [
  { id: "start", route: "/study", zh: "课程安排与学习计划入口", en: "Course planning and study checklist" },
  { id: "map", route: "/campus", zh: "校园建筑、办公室与路线查询", en: "Campus buildings, offices and routes" },
  { id: "life", route: "/life", zh: "交通、住宿与日常生活指南", en: "Transport, housing and daily life guide" },
];

export const campusLocations = {
  cairns: [
    {
      id: "ideas-lab", route: "/career", image: imageSources.ideasLab,
      title: { zh: "Ideas Lab · 创新与实习", en: "Ideas Lab · Innovation and projects" },
      description: { zh: "D4：连接课堂、产业与实践项目。", en: "D4: connecting study, industry and practical projects." },
    },
    {
      id: "john-grey-hall", route: "/life", image: imageSources.johnGreyHall,
      title: { zh: "John Grey Hall · 住宿与社区", en: "John Grey Hall · Housing and community" },
      description: { zh: "校区旁的学生住宿与社区入口。", en: "Student housing and community beside the campus." },
    },
  ],
  townsville: [
    {
      id: "townsville-map", route: "/campus", image: imageSources.townsvilleCampus,
      title: { zh: "Bebegu Yumba · 汤斯维尔校园", en: "Bebegu Yumba · Townsville campus" },
      description: { zh: "从互动地图开始查找教学楼与学生服务。", en: "Start with the interactive map for teaching and student services." },
    },
    {
      id: "engineering-place", route: "/career", image: imageSources.townsvilleCampus,
      title: { zh: "506 · Engineering & Innovation Place", en: "506 · Engineering & Innovation Place" },
      description: { zh: "工程、创新与协作项目的校园连接点。", en: "A campus connection for engineering, innovation and collaboration." },
    },
  ],
};

export const lifeServices = [
  {
    id: "transport", title: { zh: "公交与校园动线", en: "Buses and campus routes" },
    description: { zh: "校园地址、常用目的地、Google 路线与 Translink 实时规划。", en: "Campus addresses, common destinations, Google directions and live Translink planning." },
    meta: { zh: "官方实时入口", en: "Official live links" },
    action: { zh: "导航到最近公交站", en: "Route to the nearest bus stop" },
    externalByCampus: {
      cairns: "https://www.google.com/maps/dir/?api=1&origin=James+Cook+University+Cairns+Smithfield+QLD&destination=JCU+Cairns+Bus+Stop+Smithfield+QLD&travelmode=walking",
      townsville: "https://www.google.com/maps/dir/?api=1&origin=James+Cook+University+Townsville+Douglas+QLD&destination=JCU+Townsville+Bus+Stop+Douglas+QLD&travelmode=walking",
    },
  },
  {
    id: "housing", title: { zh: "住宿与搬家", en: "Housing and moving" },
    description: { zh: "校内住宿、入住前检查与搬家第一周清单。", en: "On-campus housing, pre-arrival checks and a first-week moving list." },
    meta: { zh: "场景指南", en: "Situation guide" },
    action: { zh: "查看 JCU 官方住宿准备", en: "Open JCU accommodation guide" },
    externalByCampus: {
      cairns: "https://www.jcu.edu.au/accommodation/student-accommodation-cairns",
      townsville: "https://www.jcu.edu.au/accommodation/student-accommodation-townsville",
    },
  },
  {
    id: "mobile", title: { zh: "电话卡与银行", en: "Mobile plans and banking" },
    description: { zh: "比较办理条件、附近网点和常见套餐，不把广告包装成建议。", en: "Compare setup requirements, nearby branches and common plans without promotional ranking." },
    meta: { zh: "持续更新", en: "Continuously updated" },
    action: { zh: "比较套餐与开户条件", en: "Compare plans and accounts" },
    route: "/setup",
  },
  {
    id: "daily", title: { zh: "吃饭与日常服务", en: "Food and daily services" },
    description: { zh: "餐厅、超市、理发等高频选择，记录价格区间、预约方式和更新时间。", en: "Food, groceries and services with price bands, booking details and update dates." },
    meta: { zh: "社区共建", en: "Community maintained" },
    action: { zh: "打开日常生活目录", en: "Open everyday directory" },
    route: "/essentials",
  },
];

export const setupChecklist = [
  {
    id: "identity",
    title: { zh: "准备身份证明", en: "Prepare your identity documents" },
    detail: { zh: "护照、有效签证；银行可能还需要澳洲地址、手机号和税务居民信息。", en: "Passport and valid visa; banks may also require an Australian address, mobile number and tax-residency details." },
  },
  {
    id: "coverage",
    title: { zh: "先检查覆盖，再看促销", en: "Check coverage before promotions" },
    detail: { zh: "在住所和校区检查网络覆盖；比较长期续费价格，不只看首月优惠。", en: "Check coverage at home and campus, and compare the ongoing recharge price rather than the first-month offer." },
  },
  {
    id: "branch",
    title: { zh: "预留一次线下核验", en: "Allow time for an in-person ID check" },
    detail: { zh: "国际学生开户后可能仍需去分行核验护照；出发前先确认最近网点和营业时间。", en: "International students may still need a branch passport check; confirm the nearest branch and opening hours first." },
  },
];

export const mobilePlans = [
  {
    id: "aldi-23",
    provider: "ALDI Mobile",
    price: "$23",
    period: { zh: "30 天", en: "30 days" },
    data: "12GB",
    network: { zh: "Telstra Wholesale · 4G · 100Mbps 上限", en: "Telstra Wholesale · 4G · 100Mbps cap" },
    note: { zh: "无限澳洲标准通话/短信；符合条件可结转流量。该套餐计划于 2026-09-29 后停止向新用户销售。", en: "Unlimited standard Australian calls/texts and eligible data rollover. Scheduled to close to new customers after 29 Sep 2026." },
    url: "https://www.aldimobile.com.au/products/23-mobile-plan",
  },
  {
    id: "optus-39",
    provider: "Optus Flex Plus",
    price: "$39",
    period: { zh: "28 天", en: "28 days" },
    data: { zh: "长期 25GB；前 3 次充值可能为 45GB", en: "25GB ongoing; first 3 recharges may include 45GB" },
    network: { zh: "Optus 4G / 标准 5G", en: "Optus 4G / standard 5G" },
    note: { zh: "含澳洲标准通话/短信；自动充值可能影响周末流量与促销资格。", en: "Includes standard Australian calls/texts; AutoRecharge can affect weekend data and offer eligibility." },
    url: "https://www.optus.com.au/for-you/prepaid/sim-plans.html",
  },
  {
    id: "telstra-44",
    provider: "Telstra Pre-Paid",
    price: "$44",
    period: { zh: "28 天", en: "28 days" },
    data: "20GB",
    network: { zh: "Telstra 零售网络 · 150Mbps 上限", en: "Telstra retail network · 150Mbps cap" },
    note: { zh: "含澳洲标准通话/短信；到期前充值可结转最多 200GB。", en: "Includes standard Australian calls/texts; recharge before expiry to roll over up to 200GB." },
    url: "https://www.telstra.com.au/mobile-phones/prepaid-mobiles/compare-prepaid-plans",
  },
  {
    id: "vodafone-35",
    provider: "Vodafone Prepaid Plus",
    price: "$35",
    period: { zh: "28 天", en: "28 days" },
    data: { zh: "高速流量以实时页面为准", en: "Check the live page for current high-speed data" },
    network: { zh: "Vodafone 4G / 5G", en: "Vodafone 4G / 5G" },
    note: { zh: "高速流量用尽后可继续使用最高 1.5Mbps 的 Infinite Data；先检查住处覆盖。", en: "Infinite Data continues at up to 1.5Mbps after the high-speed allowance; check coverage at home first." },
    url: "https://www.vodafone.com.au/prepaid/plans",
  },
];

export const bankAccounts = [
  {
    id: "nab-classic",
    provider: "NAB",
    account: "Classic Banking",
    fee: { zh: "$0 月费，无最低入账要求", en: "$0 monthly fee, no minimum deposit" },
    eligibility: { zh: "国际学生通常需有效签证、澳洲地址与手机号，并带护照到分行核验。", en: "International students generally need a valid visa, Australian address/mobile and branch passport verification." },
    url: "https://www.nab.com.au/personal/banking-in-australia/international-students",
  },
  {
    id: "commbank-smart",
    provider: "CommBank",
    account: "Everyday Smart Access",
    fee: { zh: "30 岁以下或符合学生选项时 $0 月费", en: "$0 monthly fee when under 30 or eligible for Student Options" },
    eligibility: { zh: "可在抵澳前 14 天内或抵澳后申请；国际学生需到澳洲分行核验护照。", en: "Can apply within 14 days before arrival or after arrival; international students verify their passport at an Australian branch." },
    url: "https://www.commbank.com.au/banking/students.html",
  },
  {
    id: "anz-access",
    provider: "ANZ",
    account: "Access Advantage",
    fee: { zh: "全日制学生可申请免 $5 月费", en: "Full-time students can apply to waive the $5 monthly fee" },
    eligibility: { zh: "需要澳洲居住及邮寄地址；新客户准备外国护照和澳洲签证等身份证明。", en: "Requires Australian residential and mailing addresses; new customers prepare a foreign passport and Australian visa or other accepted ID." },
    url: "https://www.anz.com.au/personal/bank-accounts/everyday-accounts/access-advantage/",
  },
  {
    id: "westpac-choice",
    provider: "Westpac",
    account: "Choice",
    fee: { zh: "全日制学生、35 岁以下或新抵澳首年通常免月费", en: "Monthly fee generally waived for full-time students, under-35s or the first year after arrival" },
    eligibility: { zh: "准备有效护照、澳洲住址及银行要求的身份证明；具体豁免以申请结果为准。", en: "Prepare a valid passport, Australian address and accepted identification; fee-waiver eligibility is confirmed during application." },
    url: "https://www.westpac.com.au/personal-banking/bank-accounts/transaction",
  },
];

export const essentialCategories = [
  { id: "food", label: { zh: "餐饮与采购", en: "Food & groceries" } },
  { id: "entertainment", label: { zh: "娱乐与周末", en: "Entertainment" } },
  { id: "care", label: { zh: "个人护理", en: "Personal care" } },
  { id: "home", label: { zh: "家具与家居", en: "Furniture & home" } },
];

export const essentialPlaces = [
  {
    id: "cairns-smithfield", campus: "cairns", category: "food", name: "Smithfield Shopping Centre",
    type: { zh: "餐饮、Coles、Woolworths", en: "Dining, Coles and Woolworths" },
    detail: { zh: "离校区较近的一站式餐饮和日常采购入口。", en: "A nearby one-stop option for dining and everyday groceries." }, price: "$–$$",
    url: "https://www.smithfieldcentre.com.au/centre-information/about/",
  },
  {
    id: "cairns-rustys", campus: "cairns", category: "food", name: "Rusty's Markets",
    type: { zh: "果蔬与本地食品市场", en: "Produce and local food market" },
    detail: { zh: "适合周末采购果蔬；出发前查看当天营业安排。", en: "Useful for weekend produce shopping; check current trading days before travelling." }, price: "$",
    url: "https://rustysmarkets.com.au/",
  },
  {
    id: "cairns-night-market", campus: "cairns", category: "food", name: "Cairns Night Markets",
    type: { zh: "市中心餐饮与夜市", en: "CBD food court and night market" },
    detail: { zh: "集中餐饮选择，适合刚到凯恩斯时快速了解市中心。", en: "Concentrated food choices and a simple first look at the CBD." }, price: "$–$$",
    url: "https://nightmarkets.com.au/",
  },
  {
    id: "townsville-stockland-food", campus: "townsville", category: "food", name: "Stockland Townsville",
    type: { zh: "餐饮、超市与日常采购", en: "Dining, supermarkets and everyday shopping" },
    detail: { zh: "从校区出发较常用的大型购物中心。", en: "A commonly used major shopping centre from campus." }, price: "$–$$",
    url: "https://www.stockland.com.au/shopping-centres/centres/stockland-townsville",
  },
  {
    id: "townsville-strand-food", campus: "townsville", category: "food", name: "The Strand dining",
    type: { zh: "海滨餐厅与咖啡店", en: "Waterfront restaurants and cafés" },
    detail: { zh: "适合周末沿海滨步道用餐；通过地图查看当前商家。", en: "Useful for a weekend meal along the waterfront; use Maps for current venues." }, price: "$$",
    url: "https://www.google.com/maps/search/?api=1&query=restaurants+The+Strand+Townsville+QLD",
  },
  {
    id: "townsville-cotters", campus: "townsville", category: "food", name: "Cotters Market",
    type: { zh: "周末市集", en: "Weekend market" },
    detail: { zh: "查看市中心周末摊位和活动安排。", en: "Check current CBD weekend stalls and event arrangements." }, price: "$",
    url: "https://www.google.com/maps/search/?api=1&query=Cotters+Market+Townsville+QLD",
  },
  {
    id: "cairns-esplanade", campus: "cairns", category: "entertainment", name: "Cairns Esplanade & Lagoon",
    type: { zh: "免费泳池、步道与公共烧烤", en: "Free lagoon, paths and public barbecues" },
    detail: { zh: "免费公共空间；下水前查看当日开放和安全提示。", en: "Free public space; check same-day opening and safety notices before swimming." }, price: { zh: "免费", en: "Free" },
    url: "https://www.cairns.qld.gov.au/experience-cairns/Cairns-Esplanade",
  },
  {
    id: "cairns-cinema", campus: "cairns", category: "entertainment", name: "Event Cinemas Cairns Smithfield",
    type: { zh: "电影院", en: "Cinema" }, detail: { zh: "位于 Smithfield Shopping Centre，页面可查场次与票价。", en: "Inside Smithfield Shopping Centre, with current sessions and prices online." }, price: "$$",
    url: "https://www.eventcinemas.com.au/Cinema/Cairns-Smithfield",
  },
  {
    id: "cairns-aquarium", campus: "cairns", category: "entertainment", name: "Cairns Aquarium",
    type: { zh: "水族馆", en: "Aquarium" }, detail: { zh: "付费景点；购票前查看学生或本地居民优惠。", en: "Ticketed attraction; check student or local-resident offers before booking." }, price: "$$$",
    url: "https://www.cairnsaquarium.com.au/general-admission/",
  },
  {
    id: "townsville-strand", campus: "townsville", category: "entertainment", name: "The Strand",
    type: { zh: "海滨步道、水上乐园与 Rockpool", en: "Foreshore, water park and Rockpool" }, detail: { zh: "大部分公共空间免费；Rockpool 通常每周二维护。", en: "Most public areas are free; the Rockpool is commonly closed Tuesdays for maintenance." }, price: { zh: "免费", en: "Free" },
    url: "https://www.townsville.qld.gov.au/facilities-and-recreation/parks-beaches-and-community-venues/the-strand-and-beaches",
  },
  {
    id: "townsville-museum", campus: "townsville", category: "entertainment", name: "Museum of Tropical Queensland",
    type: { zh: "博物馆", en: "Museum" }, detail: { zh: "查看当前展览、票价和开放时间。", en: "Check current exhibitions, admission and opening hours." }, price: "$$",
    url: "https://mtq.qm.qld.gov.au/",
  },
  {
    id: "townsville-cinema", campus: "townsville", category: "entertainment", name: "Townsville cinema search",
    type: { zh: "电影院与实时场次", en: "Cinemas and current sessions" }, detail: { zh: "通过地图比较距离，再进入影院页面确认票价。", en: "Compare distance in Maps, then confirm ticket prices with the cinema." }, price: "$$",
    url: "https://www.google.com/maps/search/?api=1&query=cinema+Townsville+QLD",
  },
  {
    id: "cairns-hair", campus: "cairns", category: "care", name: "Hair & barber near JCU Cairns",
    type: { zh: "理发与男士理容", en: "Hairdressers and barbers" }, detail: { zh: "先看是否需要预约、最新营业时间和公开价目。", en: "Check booking requirements, current hours and published prices first." }, price: "$–$$",
    url: "https://www.google.com/maps/search/?api=1&query=hairdresser+barber+near+JCU+Cairns+Smithfield+QLD",
  },
  {
    id: "cairns-pharmacy", campus: "cairns", category: "care", name: "Pharmacy near JCU Cairns",
    type: { zh: "药房与日常健康用品", en: "Pharmacy and everyday health items" }, detail: { zh: "Smithfield 周边药房地图；处方和紧急情况应使用正式医疗服务。", en: "Map of nearby Smithfield pharmacies; use formal medical services for prescriptions and emergencies." }, price: "$–$$",
    url: "https://www.google.com/maps/search/?api=1&query=pharmacy+near+JCU+Cairns+Smithfield+QLD",
  },
  {
    id: "townsville-hair", campus: "townsville", category: "care", name: "Hair & barber near JCU Townsville",
    type: { zh: "理发与男士理容", en: "Hairdressers and barbers" }, detail: { zh: "比较校区、Stockland 与市区距离，并确认是否预约。", en: "Compare campus, Stockland and CBD options and confirm whether booking is required." }, price: "$–$$",
    url: "https://www.google.com/maps/search/?api=1&query=hairdresser+barber+near+JCU+Townsville+Douglas+QLD",
  },
  {
    id: "townsville-pharmacy", campus: "townsville", category: "care", name: "Pharmacy near JCU Townsville",
    type: { zh: "药房与日常健康用品", en: "Pharmacy and everyday health items" }, detail: { zh: "按当前位置查看药房；紧急医疗需求请使用正式医疗渠道。", en: "Find pharmacies from your current location; use formal health services for urgent medical needs." }, price: "$–$$",
    url: "https://www.google.com/maps/search/?api=1&query=pharmacy+near+JCU+Townsville+Douglas+QLD",
  },
  {
    id: "cairns-kmart", campus: "cairns", category: "home", name: "Kmart Smithfield",
    type: { zh: "床品、厨具与基础家居", en: "Bedding, kitchenware and basic home items" }, detail: { zh: "适合入住第一周集中采购基础用品。", en: "Useful for a first-week essentials shop." }, price: "$",
    url: "https://www.google.com/maps/search/?api=1&query=Kmart+Smithfield+Cairns+QLD",
  },
  {
    id: "cairns-furniture", campus: "cairns", category: "home", name: "Furniture stores Cairns",
    type: { zh: "桌椅、床垫与家具", en: "Desks, chairs, mattresses and furniture" }, detail: { zh: "比较配送费、到货时间和退货政策后再购买。", en: "Compare delivery fees, lead times and return policies before buying." }, price: "$–$$$",
    url: "https://www.google.com/maps/search/?api=1&query=furniture+stores+Cairns+QLD",
  },
  {
    id: "cairns-secondhand", campus: "cairns", category: "home", name: "Second-hand furniture Cairns",
    type: { zh: "二手家具与慈善商店", en: "Second-hand furniture and charity shops" }, detail: { zh: "适合低预算采购；确认运输、尺寸和物品状态。", en: "Useful on a low budget; confirm transport, dimensions and condition." }, price: "$",
    url: "https://www.google.com/maps/search/?api=1&query=second+hand+furniture+Cairns+QLD",
  },
  {
    id: "townsville-kmart", campus: "townsville", category: "home", name: "Kmart Townsville",
    type: { zh: "床品、厨具与基础家居", en: "Bedding, kitchenware and basic home items" }, detail: { zh: "通过地图选择 Stockland 等距离合适的门店。", en: "Use Maps to choose the most convenient store, including Stockland." }, price: "$",
    url: "https://www.google.com/maps/search/?api=1&query=Kmart+Townsville+QLD",
  },
  {
    id: "townsville-furniture", campus: "townsville", category: "home", name: "Furniture stores Townsville",
    type: { zh: "桌椅、床垫与家具", en: "Desks, chairs, mattresses and furniture" }, detail: { zh: "比较配送范围、上楼费用和退货政策。", en: "Compare delivery zones, access charges and return policies." }, price: "$–$$$",
    url: "https://www.google.com/maps/search/?api=1&query=furniture+stores+Townsville+QLD",
  },
  {
    id: "townsville-secondhand", campus: "townsville", category: "home", name: "Second-hand furniture Townsville",
    type: { zh: "二手家具与慈善商店", en: "Second-hand furniture and charity shops" }, detail: { zh: "低预算入口；购买前检查尺寸、运输和物品状态。", en: "A low-budget entry point; check size, transport and condition before purchase." }, price: "$",
    url: "https://www.google.com/maps/search/?api=1&query=second+hand+furniture+Townsville+QLD",
  },
];

export const campusRoutes = {
  cairns: [
    { id: "cairns-city", title: { zh: "凯恩斯校区 → Cairns City", en: "Cairns campus → Cairns City" }, detail: { zh: "打开公共交通路线", en: "Open public transport directions" }, url: "https://www.google.com/maps/dir/?api=1&origin=James+Cook+University+Cairns+Smithfield+QLD&destination=Cairns+City+QLD&travelmode=transit" },
    { id: "smithfield", title: { zh: "凯恩斯校区 → Smithfield Shopping Centre", en: "Cairns campus → Smithfield Shopping Centre" }, detail: { zh: "常用购物路线", en: "Common shopping route" }, url: "https://www.google.com/maps/dir/?api=1&origin=James+Cook+University+Cairns+Smithfield+QLD&destination=Smithfield+Shopping+Centre+QLD&travelmode=walking" },
  ],
  townsville: [
    { id: "townsville-city", title: { zh: "汤斯维尔校区 → Townsville City", en: "Townsville campus → Townsville City" }, detail: { zh: "打开公共交通路线", en: "Open public transport directions" }, url: "https://www.google.com/maps/dir/?api=1&origin=James+Cook+University+Townsville+Douglas+QLD&destination=Townsville+City+QLD&travelmode=transit" },
    { id: "stockland", title: { zh: "汤斯维尔校区 → Stockland Townsville", en: "Townsville campus → Stockland Townsville" }, detail: { zh: "常用购物路线", en: "Common shopping route" }, url: "https://www.google.com/maps/dir/?api=1&origin=James+Cook+University+Townsville+Douglas+QLD&destination=Stockland+Townsville+QLD&travelmode=transit" },
  ],
};

export const opportunityItems = [
  {
    id: "ideas-projects",
    title: { zh: "创新项目连接", en: "Innovation project connection" },
    description: { zh: "把适合学生参与的项目整理成目标、周期、需要能力与报名方式。", en: "Turn relevant projects into clear goals, timelines, skills and joining steps." },
    status: { zh: "首批内容筹备中", en: "First entries in preparation" },
  },
  {
    id: "brief-board",
    title: { zh: "真实任务与实习板", en: "Practical brief and placement board" },
    description: { zh: "发布边界清楚、可验证交付的短期任务；未确认岗位不标成实习。", en: "Publish bounded, verifiable briefs; unconfirmed roles are not presented as placements." },
    status: { zh: "需求收集中", en: "Collecting briefs" },
  },
  {
    id: "jcu-xut",
    title: { zh: "JCU–XUT 创新协作", en: "JCU–XUT innovation collaboration" },
    description: { zh: "探索远程项目与创新交流；学校支持与学分安排以正式确认为准。", en: "Explore remote projects and exchange; institutional support and credit remain subject to formal confirmation." },
    status: { zh: "合作方案准备中", en: "Collaboration plan in preparation" },
  },
];

export const communityRules = {
  minCommissionAud: 1,
  maxImageBytes: 1200000,
  storageKey: "tropic-loop-community-posts-v1",
};

export const communitySeedPosts = [
  {
    id: "sample-desk-lamp",
    type: "secondhand",
    campus: "cairns",
    title: { zh: "示例：可调节书桌灯", en: "Sample: adjustable desk lamp" },
    description: { zh: "正常使用，有轻微使用痕迹。建议在校区公共区域当面检查后交易。", en: "Working condition with light wear. Inspect in a public campus area before paying." },
    category: { zh: "学习用品", en: "Study item" },
    price: 12,
    sample: true,
    status: "open",
  },
  {
    id: "sample-kitchen-set",
    type: "secondhand",
    campus: "cairns",
    title: { zh: "示例：小锅与餐具组合", en: "Sample: small cookware and cutlery set" },
    description: { zh: "适合刚入住的同学；当面确认数量和状态，不配送。", en: "Useful for a new arrival. Confirm the pieces and condition in person; pickup only." },
    category: { zh: "家具家居", en: "Home essentials" },
    price: 18,
    sample: true,
    status: "open",
  },
  {
    id: "sample-course-books",
    type: "secondhand",
    campus: "cairns",
    title: { zh: "示例：统计学参考书两本", en: "Sample: two statistics reference books" },
    description: { zh: "有少量笔记，版本信息发布前应拍清楚；可在 B1 图书馆附近交接。", en: "Light annotations. Show the edition clearly before listing; handover near B1 Library." },
    category: { zh: "学习用品", en: "Study items" },
    price: 15,
    sample: true,
    status: "open",
  },
  {
    id: "sample-grocery-run",
    type: "errand",
    campus: "cairns",
    title: { zh: "示例：从 Smithfield 带一盒牛奶", en: "Sample: bring one carton of milk from Smithfield" },
    description: { zh: "今晚回 John Grey Hall 前交接，商品费用凭小票另付。", en: "Handover before returning to John Grey Hall tonight; item cost reimbursed with receipt." },
    store: "Smithfield Shopping Centre",
    commission: 2,
    sample: true,
    status: "open",
  },
  {
    id: "sample-stationery-run",
    type: "errand",
    campus: "cairns",
    title: { zh: "示例：顺路带一包打印纸", en: "Sample: bring one pack of printer paper" },
    description: { zh: "需要 A4 纸，交接时按小票支付商品费，另付 1 AUD 佣金。", en: "A4 paper needed. Reimburse the receipt plus the AUD 1 commission at handover." },
    store: "Smithfield Shopping Centre",
    commission: 1,
    sample: true,
    status: "open",
  },
  {
    id: "sample-laundry-run",
    type: "errand",
    campus: "cairns",
    title: { zh: "示例：顺手带一瓶洗衣液", en: "Sample: bring one bottle of laundry liquid" },
    description: { zh: "请先在任务描述中确认品牌和预算上限，晚上在住宿公共区域交接。", en: "Confirm the brand and budget cap in the request; evening handover in a shared housing area." },
    store: "Woolworths Smithfield",
    commission: 2,
    sample: true,
    status: "open",
  },
  {
    id: "sample-monitor",
    type: "secondhand",
    campus: "townsville",
    title: { zh: "示例：24 英寸显示器", en: "Sample: 24-inch monitor" },
    description: { zh: "含电源线，不含 HDMI 线。建议在图书馆附近测试后交接。", en: "Power cable included; HDMI cable not included. Test near the library before handover." },
    category: { zh: "电子产品", en: "Electronics" },
    price: 55,
    sample: true,
    status: "open",
  },
  {
    id: "sample-townsville-kettle",
    type: "secondhand",
    campus: "townsville",
    title: { zh: "示例：电热水壶", en: "Sample: electric kettle" },
    description: { zh: "工作正常；在公共区域通电检查后交接。", en: "Working condition; test it in a public area before handover." },
    category: { zh: "家具家居", en: "Home essentials" },
    price: 10,
    sample: true,
    status: "open",
  },
  {
    id: "sample-townsville-run",
    type: "errand",
    campus: "townsville",
    title: { zh: "示例：从 Stockland 带一盒鸡蛋", en: "Sample: bring eggs from Stockland" },
    description: { zh: "交接时按小票支付商品费，佣金另付。", en: "Reimburse the item receipt at handover; commission is separate." },
    store: "Stockland Townsville",
    commission: 2,
    sample: true,
    status: "open",
  },
];

export const careerTracks = [
  {
    id: "foundation",
    number: "01",
    title: { zh: "先建立可展示的基础", en: "Build evidence you can show" },
    description: { zh: "整理英文简历、LinkedIn、课程项目和一段清楚的自我介绍；每个项目写明你的具体贡献。", en: "Prepare an English resume, LinkedIn profile, course projects and a clear introduction. State your specific contribution to every project." },
    action: { zh: "适合入学至第一年", en: "Best from arrival to first year" },
  },
  {
    id: "experience",
    number: "02",
    title: { zh: "用真实任务换取经历", en: "Turn real work into experience" },
    description: { zh: "优先关注 WIL、Professional Placement、Ideas Lab 项目、志愿活动和边界清楚的短期任务。", en: "Prioritise WIL, professional placements, Ideas Lab projects, volunteering and clearly scoped short briefs." },
    action: { zh: "适合中段学习期", en: "Best during the middle of the degree" },
  },
  {
    id: "application",
    number: "03",
    title: { zh: "把申请变成固定节奏", en: "Make applications a repeatable rhythm" },
    description: { zh: "每周筛选岗位、核对签证工作条件、定制简历并记录结果；不要只在毕业前集中投递。", en: "Screen roles weekly, check visa conditions, tailor applications and track outcomes rather than waiting until graduation." },
    action: { zh: "适合毕业前 12–18 个月", en: "Best 12–18 months before graduation" },
  },
];

export const careerResources = [
  {
    id: "jcu-careers",
    kind: { zh: "JCU 官方", en: "Official JCU" },
    title: "JCU Careers & Employability",
    description: { zh: "预约职业建议，获取简历、面试与求职准备资源。", en: "Book career advice and access resume, interview and job-search support." },
    url: "https://www.jcu.edu.au/careers",
  },
  {
    id: "careerhub",
    kind: { zh: "JCU 学生入口", en: "JCU student access" },
    title: "JCU CareerHub",
    description: { zh: "查看兼职、实习、毕业生岗位、志愿活动和职业工作坊。", en: "Find casual work, placements, graduate roles, volunteering and career workshops." },
    url: "https://www.jcu.edu.au/careers-and-employability/find-a-job/careerhub",
  },
  {
    id: "jcu-wil",
    kind: { zh: "实践与实习", en: "Placement & WIL" },
    title: "JCU CSE Work Integrated Learning",
    description: { zh: "查看 IT、Data Science 与 Engineering 的 WIL 和 Professional Placement 入口。", en: "Open WIL and professional-placement information for IT, Data Science and Engineering." },
    url: "https://www.jcu.edu.au/college-of-science-and-engineering/student-resources/work-integrated-learning",
  },
  {
    id: "jobs-skills",
    kind: { zh: "澳洲政府数据", en: "Australian Government data" },
    title: "Jobs and Skills Australia",
    description: { zh: "按职业查看就业规模、工作内容、教育背景与劳动力市场数据。", en: "Explore occupation tasks, employment, education and labour-market data." },
    url: "https://www.jobsandskills.gov.au/data/occupation-and-industry-profiles",
  },
  {
    id: "fair-work",
    kind: { zh: "工资与权益", en: "Pay & rights" },
    title: "Fair Work Ombudsman",
    description: { zh: "核对最低工资、Award、工资单和工作权益；不要只相信招聘广告口头承诺。", en: "Check minimum pay, awards, payslips and workplace rights rather than relying on verbal promises." },
    url: "https://www.fairwork.gov.au/pay-and-wages/minimum-wages",
  },
  {
    id: "visa-work",
    kind: { zh: "签证工作条件", en: "Visa work conditions" },
    title: "Home Affairs · Work restrictions",
    description: { zh: "用 VEVO 和官方条件页核对自己的实际工作限制；不同签证和学位情况可能不同。", en: "Check your own work restrictions through VEVO and the official conditions page; rules vary by visa and degree." },
    url: "https://immi.homeaffairs.gov.au/visas/working-in-australia/work-rights-and-exploitation/work-restrictions",
  },
];

export const authorProfile = {
  name: "Haodong Zhang",
  role: { zh: "Tropic Loop 发起人及当前唯一维护者", en: "Founder and sole current maintainer of Tropic Loop" },
  identity: { zh: "JCU–XUT 联合培养 Information Technology 博士生", en: "JCU–XUT joint PhD student in Information Technology" },
  story: {
    zh: "我在 JCU 凯恩斯校区学习和生活了两年。Tropic Loop 来自这些亲身经历：信息分散在课程页面、邮件、群聊、地图和不同机构网站里，而学生真正需要的是下一步应该做什么。",
    en: "I have studied and lived at JCU Cairns for two years. Tropic Loop grew from that experience: information is scattered across course pages, emails, group chats, maps and service websites, while students need to know what to do next.",
  },
  principles: [
    { title: { zh: "公开信息先整理清楚", en: "Make public information usable" }, detail: { zh: "保留来源，标注边界，把复杂页面变成可执行的入口。", en: "Keep sources, state boundaries and turn complex pages into actionable entry points." } },
    { title: { zh: "不冒充学校官方", en: "Remain independent" }, detail: { zh: "这是独立学生项目；政策、课程与服务变更以官方页面为准。", en: "This is an independent student project; official pages remain authoritative for policy, study and service changes." } },
    { title: { zh: "先对学生真正有用", en: "Student value comes first" }, detail: { zh: "未来可以探索收入，但不会用付费排名替代真实判断。", en: "Revenue can be explored later, but paid ranking will not replace honest judgement." } },
  ],
  github: "https://github.com/Haodong-Zhang1/Tropic-Loop-Website",
};

export const openLearningTopics = [
  {
    id: "machine-learning",
    title: { zh: "机器学习", en: "Machine learning" },
    description: { zh: "从监督学习、优化到深度学习，适合 MA5832 和数据科学项目打基础。", en: "Supervised learning, optimisation and deep learning foundations for MA5832 and data projects." },
    prerequisite: { zh: "建议先会 Python、线性代数和基础概率", en: "Python, linear algebra and basic probability recommended" },
    resources: [
      {
        title: "Stanford CS229 · Machine Learning",
        provider: "Stanford Online · Andrew Ng",
        platform: "YouTube",
        language: { zh: "英语 · 可开字幕", en: "English · captions available" },
        level: { zh: "进阶", en: "Intermediate" },
        note: { zh: "体系完整、数学要求较高；先看课程概览，再按当前 JCU 主题选讲。", en: "A rigorous full course; start with the overview and match lectures to your JCU topic." },
        url: "https://www.youtube.com/watch?v=jGwO_UgTS7I",
      },
      {
        title: "李宏毅 2023 春季机器学习课程",
        provider: "National Taiwan University · authorised Bilibili upload",
        platform: "Bilibili",
        language: { zh: "中文", en: "Mandarin" },
        level: { zh: "入门到进阶", en: "Beginner to intermediate" },
        note: { zh: "解释直观，包含生成式 AI 与深度学习；页面标注已取得老师转载授权。", en: "Accessible explanations across deep and generative learning; the upload states instructor permission." },
        url: "https://www.bilibili.com/video/BV1TD4y137mP/",
      },
    ],
  },
  {
    id: "linear-algebra",
    title: { zh: "线性代数", en: "Linear algebra" },
    description: { zh: "理解向量、矩阵、特征值与最小二乘，是统计、机器学习和信号处理的共同底层。", en: "Vectors, matrices, eigenvalues and least squares underpin statistics, machine learning and signal processing." },
    prerequisite: { zh: "高中代数；建议边看边手算", en: "School algebra; work examples by hand" },
    resources: [
      {
        title: "MIT 18.06SC · Linear Algebra",
        provider: "MIT OpenCourseWare · Gilbert Strang",
        platform: "MIT OCW",
        language: { zh: "英语 · 视频/讲义/习题", en: "English · videos, notes and problems" },
        level: { zh: "系统课程", en: "Full course" },
        note: { zh: "完整公开课，含视频、总结、Problem Sets 与答案，适合系统补基础。", en: "A complete self-study course with videos, summaries, problem sets and solutions." },
        url: "https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/",
      },
      {
        title: "线性代数的本质",
        provider: "3Blue1Brown · 中国官方账号",
        platform: "Bilibili",
        language: { zh: "官方双语", en: "Official bilingual edition" },
        level: { zh: "概念入门", en: "Conceptual primer" },
        note: { zh: "先建立几何直觉，再回到公式和习题；不建议只看动画不做题。", en: "Build geometric intuition first, then return to equations and exercises." },
        url: "https://www.bilibili.com/list/88461692?bvid=BV1ys411472E&oid=6731067",
      },
    ],
  },
  {
    id: "probability-statistics",
    title: { zh: "概率论与统计", en: "Probability & statistics" },
    description: { zh: "覆盖条件概率、随机变量、常见分布、期望与极限定理，为统计建模建立理论基础。", en: "Conditional probability, random variables, distributions, expectation and limit laws for statistical modelling." },
    prerequisite: { zh: "单变量微积分与基础矩阵运算", en: "Single-variable calculus and basic matrix operations" },
    resources: [
      {
        title: "Harvard STAT 110 · Probability",
        provider: "Harvard University · Joe Blitzstein",
        platform: "YouTube + course site",
        language: { zh: "英语 · 视频/讲义/习题", en: "English · videos, notes and problems" },
        level: { zh: "系统课程", en: "Full course" },
        note: { zh: "强调条件化思维，官方页面同时提供讲义、练习与免费教材入口。", en: "Strong focus on conditional thinking, with notes, practice and a free textbook from the official site." },
        url: "https://stat110.hsites.harvard.edu/",
      },
      {
        title: "MIT 6.041SC · Applied Probability",
        provider: "MIT OpenCourseWare · John Tsitsiklis",
        platform: "MIT OCW",
        language: { zh: "英语 · 视频/习题/考试", en: "English · videos, problems and exams" },
        level: { zh: "工程方向", en: "Engineering focus" },
        note: { zh: "适合工程与数据专业，课程设计支持独立学习并包含解答。", en: "Designed for independent engineering study with worked support and solutions." },
        url: "https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/",
      },
    ],
  },
  {
    id: "python-data",
    title: { zh: "Python 与数据处理", en: "Python & data" },
    description: { zh: "把语言基础、NumPy、pandas 与 Notebook 工作流连起来，适合第一次用 Python 完成作业。", en: "Connect Python, NumPy, pandas and notebook workflows for a first data assignment." },
    prerequisite: { zh: "无需编程基础", en: "No programming prerequisite" },
    resources: [
      {
        title: "Python 官方教程",
        provider: "Python Software Foundation",
        platform: "Documentation",
        language: { zh: "英语 · 可翻译", en: "English" },
        level: { zh: "入门", en: "Beginner" },
        note: { zh: "把语法当成查询手册使用；先完成变量、控制流、函数和数据结构。", en: "Use it as a reference; prioritise variables, control flow, functions and data structures." },
        url: "https://docs.python.org/3/tutorial/",
      },
      {
        title: "pandas Getting Started",
        provider: "pandas project",
        platform: "Documentation",
        language: { zh: "英语 · 可运行示例", en: "English · runnable examples" },
        level: { zh: "入门", en: "Beginner" },
        note: { zh: "从表格读写、筛选、缺失值与分组开始，直接对应多数数据作业。", en: "Start with I/O, filtering, missing data and grouping for common coursework tasks." },
        url: "https://pandas.pydata.org/docs/getting_started/",
      },
    ],
  },
  {
    id: "signals-electronics",
    title: { zh: "信号、系统与电子", en: "Signals, systems & electronics" },
    description: { zh: "面向电子工程与 IoT，连接时域、频域、滤波、通信和嵌入式应用。", en: "Time and frequency domains, filtering, communications and embedded applications for electronics and IoT." },
    prerequisite: { zh: "微积分、复数与基础线性代数", en: "Calculus, complex numbers and basic linear algebra" },
    resources: [
      {
        title: "MIT Signals and Systems",
        provider: "MIT OpenCourseWare · Alan V. Oppenheim",
        platform: "MIT OCW + YouTube",
        language: { zh: "英语 · 视频/讲义", en: "English · videos and notes" },
        level: { zh: "进阶", en: "Intermediate" },
        note: { zh: "先掌握离散时间信号、系统性质和 Fourier 表示，再进入 DSP。", en: "Cover discrete-time signals, system properties and Fourier representations before DSP." },
        url: "https://ocw.mit.edu/courses/res-6-007-signals-and-systems-spring-2011/",
      },
      {
        title: "Digital Signal Processing",
        provider: "TU Delft OpenCourseWare",
        platform: "OpenCourseWare",
        language: { zh: "英语 · 视频/课程资料", en: "English · videos and course material" },
        level: { zh: "进阶", en: "Intermediate" },
        note: { zh: "覆盖 DFT、FFT、OFDM、估计与滤波，适合 EE3010 相关复习。", en: "Covers DFT, FFT, OFDM, estimation and filtering for EE3010-related revision." },
        url: "https://ocw.tudelft.nl/courses/digital-signal-processing/",
      },
    ],
  },
  {
    id: "cybersecurity",
    title: { zh: "网络与信息安全", en: "Cybersecurity" },
    description: { zh: "从账号、系统和网络安全到 Web 漏洞实践，适合 CP2414 与 CP5603。", en: "Accounts, systems, networks and practical web vulnerabilities for CP2414 and CP5603." },
    prerequisite: { zh: "基础网络概念", en: "Basic networking concepts" },
    resources: [
      {
        title: "CS50's Introduction to Cybersecurity",
        provider: "Harvard University · CS50",
        platform: "OpenCourseWare",
        language: { zh: "英语 · 视频/作业", en: "English · videos and assignments" },
        level: { zh: "入门", en: "Beginner" },
        note: { zh: "五周免费公开课程，从账户、数据、系统、软件和隐私建立整体框架。", en: "A free five-week overview of accounts, data, systems, software and privacy." },
        url: "https://cs50.harvard.edu/cybersecurity/",
      },
      {
        title: "Web Security Academy",
        provider: "PortSwigger",
        platform: "Interactive labs",
        language: { zh: "英语 · 免费实验", en: "English · free labs" },
        level: { zh: "入门到进阶", en: "Beginner to advanced" },
        note: { zh: "只在授权实验环境练习，不要对学校、公司或他人系统进行测试。", en: "Practise only in authorised labs, never against university, company or third-party systems." },
        url: "https://portswigger.net/web-security",
      },
    ],
  },
];

export const resourceRecommendationUrl = "https://github.com/Haodong-Zhang1/Tropic-Loop-Website/issues/new";

export const cultureLayers = [
  {
    id: "australia",
    eyebrow: { zh: "AUSTRALIA", en: "AUSTRALIA" },
    title: { zh: "日常表达与学习方式", en: "Everyday communication and learning" },
    points: {
      zh: ["交流通常直接、友好，称呼相对随意，但守时和提前说明很重要。", "课堂更强调 independent learning、批判性思考和主动提问。", "澳洲多元文化并不意味着所有习惯都一样；先观察、尊重差异，再确认。"],
      en: ["Communication is often direct and informal, while punctuality and advance notice matter.", "Classes emphasise independent learning, critical thinking and asking questions.", "A multicultural society does not mean everyone shares the same habits; observe, respect and clarify."],
    },
    links: [
      { label: { zh: "Study Australia · 文化与生活", en: "Study Australia · Culture and lifestyle" }, url: "https://www.studyaustralia.gov.au/en/why-australia/australian-culture-and-lifestyle" },
      { label: { zh: "国际学生的文化适应经验", en: "Culture insights from international students" }, url: "https://www.studyaustralia.gov.au/en_in/tools-and-resources/tips-and-advice-for-students/australian-culture" },
    ],
  },
  {
    id: "jcu",
    eyebrow: { zh: "JCU", en: "JCU" },
    title: { zh: "校园共同体与文化边界", en: "Campus community and cultural respect" },
    points: {
      zh: ["International Student Orientation 对学生签证持有人是 mandatory；它也是认识支持服务的最快入口。", "加入 JCUSA Clubs & Societies，比只待在同语种群聊里更容易建立本地联系。", "Nguma-bada 与 Bebegu Yumba 位于 First Nations Country；理解 Acknowledgement of Country 是校园文化的一部分。"],
      en: ["International Student Orientation is mandatory for student-visa holders and the fastest route into support services.", "JCUSA clubs and societies make it easier to build local connections beyond one language group.", "Nguma-bada and Bebegu Yumba are on First Nations Country; understanding Acknowledgement of Country is part of campus culture."],
    },
    links: [
      { label: { zh: "JCU 国际学生抵澳准备", en: "JCU international pre-departure guide" }, url: "https://www.jcu.edu.au/international-students/coming-to-australia" },
      { label: { zh: "JCU 文化协议说明", en: "JCU cultural protocols" }, url: "https://www.jcu.edu.au/ierc/our-centre/ierc-purpose" },
      { label: { zh: "JCUSA 凯恩斯社团", en: "JCUSA Cairns clubs" }, url: "https://www.jcusa.edu.au/clubs/join-a-club-cairns/" },
    ],
  },
  {
    id: "north-queensland",
    eyebrow: { zh: "NORTH QUEENSLAND", en: "NORTH QUEENSLAND" },
    title: { zh: "热带节奏与本地参与", en: "Tropical rhythms and local participation" },
    points: {
      zh: ["Wet season、炎热和突发天气会改变交通与活动安排；出发当天再看官方更新。", "Show、Festival、First Nations art 和多元文化活动是理解当地社区的直接入口。", "参加自然与文化活动时遵守场地、Country 与野生动物安全要求。"],
      en: ["Wet season, heat and sudden weather can change travel and events; check the official update on the day.", "Shows, festivals, First Nations art and multicultural events are direct ways into local community life.", "Follow venue, Country and wildlife-safety requirements during nature and cultural activities."],
    },
    links: [
      { label: { zh: "凯恩斯年度活动", en: "Cairns annual events" }, url: "https://www.cairns.qld.gov.au/experience-cairns/events/annual-events" },
      { label: { zh: "What's On Townsville", en: "What's On Townsville" }, url: "https://whatson.townsville.qld.gov.au/" },
    ],
  },
];

export const culturalEvents = [
  {
    id: "cairns-show", campus: "cairns", month: { zh: "通常 7 月", en: "Usually July" },
    title: "Cairns Show", type: { zh: "农业展 · 游乐设施 · 社区传统", en: "Agricultural show · rides · local tradition" },
    description: { zh: "凯恩斯长期举办的年度 Show；具体日期、门票与 Show Holiday 每年确认。", en: "Cairns' long-running annual show; confirm dates, tickets and the local show holiday each year." },
    access: { zh: "部分付费", en: "Mostly ticketed" }, url: "https://cairnsshow.com.au/",
  },
  {
    id: "ciaf", campus: "cairns", month: { zh: "通常 7 月", en: "Usually July" },
    title: "Cairns Indigenous Art Fair", type: { zh: "First Nations 艺术与文化", en: "First Nations art and culture" },
    description: { zh: "连接 Queensland First Nations 艺术家、表演、讲座与社区活动；不同项目可能免费或售票。", en: "First Nations art, performance, talks and community programs from across Queensland; access varies by event." },
    access: { zh: "免费 + 付费项目", en: "Free + ticketed program" }, url: "https://ciaf.com.au/",
  },
  {
    id: "cairns-festival", campus: "cairns", month: { zh: "通常 8–9 月", en: "Usually Aug–Sep" },
    title: "Cairns Festival", type: { zh: "艺术 · 音乐 · Parade · 社区", en: "Arts · music · parade · community" },
    description: { zh: "Council 举办的十日城市节庆，许多 Esplanade 项目免费，适合第一次了解凯恩斯公共文化生活。", en: "A ten-day Council festival with many free Esplanade events and an accessible introduction to Cairns civic life." },
    access: { zh: "大量免费项目", en: "Many free events" }, url: "https://www.cairns.qld.gov.au/festival",
  },
  {
    id: "cairns-multicultural", campus: "cairns", month: { zh: "通常 8–10 月", en: "Usually Aug–Oct" },
    title: { zh: "Cairns Multicultural Month", en: "Cairns Multicultural Month" }, type: { zh: "多元文化 · 社区节庆", en: "Multicultural community events" },
    description: { zh: "集中展示不同社区的食物、表演和节庆；当年活动以 Council 列表为准。", en: "Food, performance and celebrations from local communities; use the Council list for the current program." },
    access: { zh: "多为免费", en: "Mostly free" }, url: "https://www.cairns.qld.gov.au/community-environment/community-support/multicultural/multicultural-month",
  },
  {
    id: "townsville-whats-on", campus: "townsville", month: { zh: "全年", en: "Year-round" },
    title: "What's On Townsville", type: { zh: "官方活动日历", en: "Official event calendar" },
    description: { zh: "按日期查找表演、市场、文化节、讲座和社区活动，是最稳妥的实时入口。", en: "The live Council entry point for performances, markets, festivals, talks and community activities." },
    access: { zh: "免费与付费", en: "Free and ticketed" }, url: "https://whatson.townsville.qld.gov.au/",
  },
  {
    id: "townsville-cultural", campus: "townsville", month: { zh: "全年分布", en: "Across the year" },
    title: { zh: "Townsville 多元文化活动", en: "Townsville multicultural events" }, type: { zh: "文化节 · 社区活动", en: "Festivals · community events" },
    description: { zh: "Council 汇总 Diwali、Greek Festival、Townsville Cultural Festival 等多元文化参与入口。", en: "Council information covering Diwali, Greek Festival, Townsville Cultural Festival and other community events." },
    access: { zh: "以当年页面为准", en: "Check each current listing" }, url: "https://www.townsville.qld.gov.au/community-support/services-and-community-development/culturally-diverse-people",
  },
];

export const studentCultureTips = [
  {
    id: "tutorial", category: { zh: "课堂", en: "Classroom" },
    title: { zh: "Tutorial 不是只听答案", en: "Tutorials are not answer sessions" },
    detail: { zh: "提前带着一个具体问题去；老师更容易回应你卡在哪一步，而不是泛泛地问“怎么做作业”。", en: "Bring one specific question. Staff can respond to where you are stuck more effectively than to a broad request for assignment answers." },
  },
  {
    id: "small-talk", category: { zh: "交流", en: "Communication" },
    title: { zh: "从一句简短 Small Talk 开始", en: "Start with brief small talk" },
    detail: { zh: "天气、周末和校园活动都是安全开场；对方问“How are you?”通常是问候，不必给很长的个人汇报。", en: "Weather, weekends and campus events are easy openers. “How are you?” is often a greeting rather than a request for a long personal update." },
  },
  {
    id: "wet-season", category: { zh: "凯恩斯", en: "Cairns" },
    title: { zh: "Wet season 的计划留余量", en: "Leave room in wet-season plans" },
    detail: { zh: "出门前再看天气、道路和活动官方更新；重要 appointment 不要只预留刚好够用的公交时间。", en: "Recheck weather, roads and event updates before leaving, and allow extra travel time for important appointments." },
  },
  {
    id: "club", category: { zh: "融入", en: "Belonging" },
    title: { zh: "加入一个会定期见面的社团", en: "Join one group that meets regularly" },
    detail: { zh: "一次性活动容易结束，固定训练、志愿活动或课程社团更容易形成真实关系。", en: "One-off events end quickly; recurring sport, volunteering or course clubs create more durable connections." },
  },
];

export const cultureTipSubmissionUrl = "https://github.com/Haodong-Zhang1/Tropic-Loop-Website/issues/new";

export const studyPaths = [
  {
    id: "data-science", label: { zh: "Data Science 数据科学", en: "Data Science" },
    courses: [
      {
        code: "MA3831", title: "Natural Language Processing, Web Scraping and Large Data Processing", zh: "自然语言处理、网络爬取与大数据处理", url: "https://handbook.jcu.edu.au/subject/2026/ma3831", campus: "both",
        resources: [
          { label: { zh: "Python 官方教程", en: "Official Python tutorial" }, url: "https://docs.python.org/3/tutorial/" },
          { label: { zh: "Hugging Face NLP Course", en: "Hugging Face NLP Course" }, url: "https://huggingface.co/learn/nlp-course/" },
          { label: { zh: "pandas 入门", en: "pandas getting started" }, url: "https://pandas.pydata.org/docs/getting_started/" },
        ],
      },
      {
        code: "MA2405", title: "Advanced Statistical Modelling", zh: "高级统计建模", url: "https://handbook.jcu.edu.au/subject/2026/ma2405", campus: "both",
        resources: [
          { label: { zh: "R 语言官方入门", en: "Official introduction to R" }, url: "https://cran.r-project.org/doc/manuals/r-release/R-intro.html" },
          { label: { zh: "statsmodels 用户指南", en: "statsmodels user guide" }, url: "https://www.statsmodels.org/stable/user-guide.html" },
        ],
      },
      {
        code: "MA2830", title: "Data Visualisation", zh: "数据可视化", url: "https://handbook.jcu.edu.au/subject/2026/ma2830", campus: "both",
        resources: [
          { label: { zh: "ggplot2 官方文档", en: "Official ggplot2 documentation" }, url: "https://ggplot2.tidyverse.org/" },
          { label: { zh: "Vega-Lite 示例库", en: "Vega-Lite examples" }, url: "https://vega.github.io/vega-lite/examples/" },
        ],
      },
      {
        code: "CP2414", title: "Network Security", zh: "网络安全", url: "https://handbook.jcu.edu.au/subject/2026/cp2414", campus: "both",
        resources: [
          { label: { zh: "OWASP Top 10", en: "OWASP Top 10" }, url: "https://owasp.org/www-project-top-ten/" },
          { label: { zh: "PortSwigger Web Security Academy", en: "PortSwigger Web Security Academy" }, url: "https://portswigger.net/web-security" },
        ],
      },
    ],
    advisor: { label: { zh: "JCU Enrolment Planner", en: "JCU Enrolment Planner" }, url: "https://www.jcu.edu.au/course-enrolment-planners" },
  },
  {
    id: "iot", label: { zh: "IoT 物联网", en: "Internet of Things" },
    courses: [
      {
        code: "CC5901", title: "IoT Communication Systems", zh: "物联网通信系统", url: "https://handbook.jcu.edu.au/subject/2026/cc5901", campus: "cairns",
        resources: [
          { label: { zh: "MQTT 官方资源", en: "Official MQTT resources" }, url: "https://mqtt.org/" },
          { label: { zh: "LoRaWAN 学习资源", en: "LoRaWAN learning resources" }, url: "https://lora-alliance.org/about-lorawan/" },
        ],
      },
      {
        code: "EE5901", title: "Advanced Sensor Technologies", zh: "高级传感器技术", url: "https://handbook.jcu.edu.au/subject/2026/ee5901", campus: "cairns",
        resources: [
          { label: { zh: "Arduino 官方文档", en: "Official Arduino documentation" }, url: "https://docs.arduino.cc/" },
          { label: { zh: "Raspberry Pi 文档", en: "Raspberry Pi documentation" }, url: "https://www.raspberrypi.com/documentation/" },
        ],
      },
      {
        code: "MA5832", title: "Data Mining and Machine Learning", zh: "数据挖掘与机器学习", url: "https://handbook.jcu.edu.au/subject/2026/ma5832", campus: "cairns",
        resources: [
          { label: { zh: "scikit-learn 教程", en: "scikit-learn tutorials" }, url: "https://scikit-learn.org/stable/tutorial/" },
          { label: { zh: "Jupyter 文档", en: "Jupyter documentation" }, url: "https://docs.jupyter.org/" },
        ],
      },
      {
        code: "CP5603", title: "Advanced E-Security", zh: "高级电子安全", url: "https://handbook.jcu.edu.au/subject/2026/cp5603", campus: "cairns",
        resources: [
          { label: { zh: "NIST IoT Cybersecurity", en: "NIST IoT Cybersecurity" }, url: "https://www.nist.gov/itl/applied-cybersecurity/nist-cybersecurity-iot-program" },
          { label: { zh: "OWASP IoT Project", en: "OWASP IoT Project" }, url: "https://owasp.org/www-project-internet-of-things/" },
        ],
      },
    ],
    advisor: { label: { zh: "IoT & Data Engineering 课程页", en: "IoT & Data Engineering course page" }, url: "https://www.jcu.edu.au/courses/master-of-engineering-professional" },
  },
  {
    id: "electronic-engineering", label: { zh: "Electronic Engineering 电子工程", en: "Electronic Engineering" },
    courses: [
      {
        code: "EE3901", title: "Sensor Technologies", zh: "传感器技术", url: "https://handbook.jcu.edu.au/subject/2026/ee3901", campus: "both",
        resources: [
          { label: { zh: "Arduino 电子基础", en: "Arduino electronics basics" }, url: "https://docs.arduino.cc/learn/electronics/" },
          { label: { zh: "SciPy Signal 文档", en: "SciPy Signal documentation" }, url: "https://docs.scipy.org/doc/scipy/reference/signal.html" },
        ],
      },
      {
        code: "CC3501", title: "Computer Interfacing and Control", zh: "计算机接口与控制", url: "https://handbook.jcu.edu.au/subject/2026/cc3501", campus: "both",
        resources: [
          { label: { zh: "Raspberry Pi GPIO 指南", en: "Raspberry Pi GPIO guide" }, url: "https://www.raspberrypi.com/documentation/computers/raspberry-pi.html" },
          { label: { zh: "Arduino Language Reference", en: "Arduino Language Reference" }, url: "https://docs.arduino.cc/language-reference/" },
        ],
      },
      {
        code: "EE3010", title: "Digital Signal Processing", zh: "数字信号处理", url: "https://handbook.jcu.edu.au/subject/2026/ee3010", campus: "both",
        resources: [
          { label: { zh: "SciPy Signal 教程", en: "SciPy Signal tutorial" }, url: "https://docs.scipy.org/doc/scipy/tutorial/signal.html" },
          { label: { zh: "NumPy 学习资源", en: "NumPy learning resources" }, url: "https://numpy.org/learn/" },
        ],
      },
      {
        code: "CC4510", title: "Digital System Design", zh: "数字系统设计", url: "https://handbook.jcu.edu.au/subject/2026/cc4510", campus: "both",
        resources: [
          { label: { zh: "HDLBits 练习", en: "HDLBits practice" }, url: "https://hdlbits.01xz.net/wiki/Main_Page" },
          { label: { zh: "Digilent 学习材料", en: "Digilent learning materials" }, url: "https://digilent.com/reference/learn/start" },
        ],
      },
    ],
    advisor: { label: { zh: "2026 Engineering Study Plans", en: "2026 Engineering Study Plans" }, url: "https://www.jcu.edu.au/college-of-science-and-engineering/student-resources/2026-study-plans" },
  },
];

export const jointPathwayModes = [
  { id: "2plus2", label: { zh: "2+2 本科双学位", en: "2+2 dual bachelor pathway" } },
  { id: "3plus2", label: { zh: "3+2 本硕衔接", en: "3+2 bachelor-to-master pathway" } },
];

export const jointPathways = [
  {
    id: "xut-data-science",
    mode: "2plus2",
    shortLabel: { zh: "Data Science", en: "Data Science" },
    title: { zh: "计算机科学与技术 → Data Science (Honours)", en: "Computer Science and Technology → Data Science (Honours)" },
    summary: {
      zh: "前两年在 XUT 完成经联合培养协议认可的计算机课程，后两年进入 JCU 凯恩斯校区。JCU 公开 Handbook 明确确认 48 JCU 学分抵免。",
      en: "Complete the approved first two years of Computer Science at XUT, then continue at JCU Cairns. The public JCU Handbook confirms 48 JCU credit points of articulation credit.",
    },
    status: { zh: "学分公开可核实", en: "Public credit mapping verified" },
    facts: [
      { label: { zh: "培养模式", en: "Model" }, value: { zh: "2年 XUT + 2年 JCU", en: "2 years XUT + 2 years JCU" } },
      { label: { zh: "JCU 学位", en: "JCU award" }, value: { zh: "BSc(Hons) · 115809", en: "BSc(Hons) · 115809" } },
      { label: { zh: "确认抵免", en: "Confirmed credit" }, value: { zh: "48 JCU 学分（42+6）", en: "48 JCU credit points (42+6)" } },
      { label: { zh: "JCU 校区", en: "JCU campus" }, value: { zh: "Cairns Nguma-bada", en: "Cairns Nguma-bada" } },
    ],
    stages: [
      {
        label: { zh: "第 1–2 年 · XUT", en: "Years 1–2 · XUT" },
        detail: { zh: "完成 XUT 计算机科学与技术前两年、且列入 JCU–XUT Articulation Schedule 的课程。", en: "Complete the first two years of XUT Computer Science and Technology included in the JCU–XUT Articulation Schedule." },
        items: {
          zh: ["离散数学、数据结构、计算机组成", "计算机网络、操作系统、数据库", "软件工程、IoT 技术、大数据与 AI 应用"],
          en: ["Discrete mathematics, data structures and computer organisation", "Networks, operating systems and databases", "Software engineering, IoT, big data and AI applications"],
        },
      },
      {
        label: { zh: "第 3–4 年 · JCU Cairns", en: "Years 3–4 · JCU Cairns" },
        detail: { zh: "完成剩余 48 JCU 学分。公开结构包含高级统计、可视化、网络安全、NLP/大数据、项目与专业实践；实际 Trimester 顺序按个人 Study Plan。", en: "Complete the remaining 48 JCU credit points. The published structure spans advanced statistics, visualisation, security, NLP/data, projects and professional practice; trimester order follows the individual study plan." },
        items: {
          zh: ["MA2405 / MA2830 / MA3405 等数据科学核心", "MA3831、CP2414、CP5603 等计算与安全课程", "MA4601–4602 项目与 SC3008 Professional Placement"],
          en: ["Data Science core including MA2405, MA2830 and MA3405", "Computing and security including MA3831, CP2414 and CP5603", "MA4601–4602 project work and SC3008 Professional Placement"],
        },
      },
    ],
    curriculum: {
      title: { zh: "选课时先核对", en: "Check before enrolling" },
      items: {
        zh: ["48 学分抵免只适用于批准的 XUT 课程组合", "选修、先修课和开课 Trimester 可能随年级调整", "英语要求为 JCU Band 1；具体内部英语认定以当届通知为准"],
        en: ["The 48-credit articulation applies only to the approved XUT subject set", "Electives, prerequisites and trimester availability can change by cohort", "JCU Band 1 English applies; confirm any internal English recognition for the intake"],
      },
    },
    links: [
      { label: { zh: "JCU 2+2 课程与 48 学分说明", en: "JCU 2+2 course and 48-credit details" }, url: "https://www.jcu.edu.au/course-and-subject-handbook2/course-and-subject-handbook-2024/courses/undergraduate-courses/bachelor-of-science-honours-embedded" },
      { label: { zh: "XUT 国际工学院培养模式", en: "XUT International Engineering College model" }, url: "https://iec.xaut.edu.cn/info/1039/1732.htm" },
      { label: { zh: "JCU Course Enrolment Planners", en: "JCU Course Enrolment Planners" }, url: "https://www.jcu.edu.au/course-enrolment-planners" },
    ],
  },
  {
    id: "xut-electronic",
    mode: "2plus2",
    shortLabel: { zh: "电子科学与技术", en: "Electronic Science" },
    title: { zh: "电子科学与技术 → Electronic Systems & IoT Engineering", en: "Electronic Science and Technology → Electronic Systems & IoT Engineering" },
    summary: {
      zh: "XUT 官方页面确认专业对接关系；2+2 的公开培养模式成立，但当届逐科抵免和入读 Trimester 没有在公开网页完整列出。",
      en: "XUT confirms the program pairing and the public 2+2 model, but the cohort-specific subject credit schedule and starting trimester are not fully published online.",
    },
    status: { zh: "专业对接已核实 · 抵免表待当届确认", en: "Program match verified · credit schedule requires confirmation" },
    facts: [
      { label: { zh: "培养模式", en: "Model" }, value: { zh: "2年 XUT + 2年 JCU", en: "2 years XUT + 2 years JCU" } },
      { label: { zh: "JCU 学位", en: "JCU award" }, value: { zh: "BEng(Hons) · 116209", en: "BEng(Hons) · 116209" } },
      { label: { zh: "JCU 课程总量", en: "JCU course total" }, value: { zh: "96 JCU 学分", en: "96 JCU credit points" } },
      { label: { zh: "专业 Major", en: "Major" }, value: { zh: "48 学分 · BEH-IOT", en: "48 credit points · BEH-IOT" } },
    ],
    stages: [
      {
        label: { zh: "第 1–2 年 · XUT", en: "Years 1–2 · XUT" },
        detail: { zh: "按 XUT 联合培养方案完成电子科学基础与专业核心，是否对应 JCU 具体课程以正式抵免表为准。", en: "Complete the XUT electronics foundations and core; exact JCU subject equivalence follows the formal credit schedule." },
        items: {
          zh: ["微电子基础、半导体物理", "模拟 / 数字集成电路与 IC 设计", "IC 制造、DSP 与 AI 应用"],
          en: ["Microelectronics and semiconductor physics", "Analogue/digital integrated circuits and IC design", "IC manufacturing, DSP and AI applications"],
        },
      },
      {
        label: { zh: "第 3–4 年 · JCU", en: "Years 3–4 · JCU" },
        detail: { zh: "JCU 当前 Major 涵盖控制、通信、传感器、接口、DSP、网络安全和毕业设计。具体校区与科目顺序看 Offer 和个人 Study Plan。", en: "The current JCU major covers control, communications, sensors, interfacing, DSP, security and design. Campus and sequencing follow the offer and individual study plan." },
        items: {
          zh: ["EE3600 / EE3700 / EE3901 控制、通信与传感器", "CC3501 / EE3010 接口控制与 DSP", "CP3404 / CP3406 安全与移动计算", "EG4011–4012 Thesis 与 CC4510 / EE4500 设计"],
          en: ["EE3600 / EE3700 / EE3901 control, communications and sensors", "CC3501 / EE3010 interfacing, control and DSP", "CP3404 / CP3406 security and mobile computing", "EG4011–4012 thesis and CC4510 / EE4500 design"],
        },
      },
    ],
    curriculum: {
      title: { zh: "公开资料的边界", en: "Boundary of public information" },
      items: {
        zh: ["96 学分是完整 JCU 工程学位结构，不等于每位 2+2 学生都要在 JCU 重修 96 学分", "48 学分是 Major 结构，也不等于自动抵免 48 学分", "最终请向 IEC / JCU 索取当届 Articulation Schedule 与 Study Plan"],
        en: ["The 96 credits describe the full JCU engineering degree; they are not automatically all retaken in the JCU stage", "The 48-credit major is not an automatic 48-credit transfer", "Request the intake-specific Articulation Schedule and Study Plan from IEC/JCU"],
      },
    },
    links: [
      { label: { zh: "XUT 专业对接说明", en: "XUT program pairing" }, url: "https://iec.xaut.edu.cn/info/1051/1829.htm" },
      { label: { zh: "JCU Electronic Systems & IoT Major", en: "JCU Electronic Systems & IoT major" }, url: "https://handbook.jcu.edu.au/aos/2026/behiot?year=2026" },
      { label: { zh: "JCU 2026 Engineering Study Plans", en: "JCU 2026 Engineering Study Plans" }, url: "https://www.jcu.edu.au/college-of-science-and-engineering/student-resources/2026-study-plans" },
    ],
  },
  {
    id: "xut-iot-master",
    mode: "3plus2",
    shortLabel: { zh: "IoT & Data Engineering", en: "IoT & Data Engineering" },
    title: { zh: "获批工科方向 → Master of Engineering (Professional)", en: "Approved cognate engineering discipline → Master of Engineering (Professional)" },
    summary: {
      zh: "这里的“3+2 IoT”是本科到硕士的衔接：完成 XUT 获批工科前三年，再进入 JCU 凯恩斯的 IoT and Data Engineering 硕士。它不是 XUT 四个联合本科专业之外新增的“IoT 本科”。",
      en: "This 3+2 IoT route is a bachelor-to-master articulation: complete three approved engineering years at XUT, then enter the JCU Cairns IoT and Data Engineering master's. It is not a separate XUT IoT bachelor program.",
    },
    status: { zh: "入学路径与 2026 课程计划已核实", en: "Entry route and 2026 planner verified" },
    facts: [
      { label: { zh: "培养模式", en: "Model" }, value: { zh: "3年 XUT + 2年 JCU", en: "3 years XUT + 2 years JCU" } },
      { label: { zh: "JCU 学位", en: "JCU award" }, value: { zh: "MEng(Prof) · 118304", en: "MEng(Prof) · 118304" } },
      { label: { zh: "JCU 学制", en: "JCU duration" }, value: { zh: "2年全日制", en: "2 years full-time" } },
      { label: { zh: "JCU 校区", en: "JCU campus" }, value: { zh: "Cairns Nguma-bada", en: "Cairns Nguma-bada" } },
    ],
    stages: [
      {
        label: { zh: "第 1–3 年 · XUT", en: "Years 1–3 · XUT" },
        detail: { zh: "完成 XUT Bachelor of Engineering 前三年，且专业必须是 Articulation Schedule 批准、与 IoT and Data Engineering 相近的工科方向。", en: "Complete three years of the XUT Bachelor of Engineering in an approved discipline cognate to IoT and Data Engineering under the Articulation Schedule." },
        items: {
          zh: ["不是所有工程专业自动符合", "前三年课程与成绩须满足当届双方协议", "英语与签证条件按 JCU Offer 执行"],
          en: ["Not every engineering discipline qualifies automatically", "The first three years and results must meet the current agreement", "English and visa conditions follow the JCU offer"],
        },
      },
      {
        label: { zh: "第 4–5 年 · JCU Cairns", en: "Years 4–5 · JCU Cairns" },
        detail: { zh: "完成两年 MEng(Prof)，内容覆盖数据科学、IoT 通信、传感器、安全、机器学习、工程实践和研究项目。", en: "Complete the two-year MEng(Prof), spanning data science, IoT communications, sensors, security, machine learning, engineering practice and research projects." },
        items: {
          zh: ["每门多数为 3 学分；EG5300 Engineering Practice 为 6 学分", "包含 EG5200 Career Planning 与工程实践", "实际开课与先修关系每年复核"],
          en: ["Most subjects are 3 credit points; EG5300 Engineering Practice is 6", "Includes EG5200 Career Planning and engineering practice", "Offerings and prerequisites must be checked each year"],
        },
      },
    ],
    termPlan: [
      { term: "2026 · TR1", subjects: ["MA5800 Foundations for Data Science", "MA5820 Statistical Methods for Data Scientists", "Major elective · 3 cp (Block 2)"] },
      { term: "2026 · TR2", subjects: ["EG5220 Advanced Asset Management and Reliability", "MA5810 Introduction to Data Mining", "EE5901 Advanced Sensor Technologies"] },
      { term: "2026 · TR3", subjects: ["EG5200 Career Planning", "CC5901 IoT Communication Systems"] },
      { term: "2027 · TR1", subjects: ["EG5300 Engineering Practice · 6 cp", "LB5205 People in Organisations"] },
      { term: "2027 · TR2", subjects: ["EG5311 Research Project 1", "EG5210 Risk Engineering and Systems Safety", "MA5832 Data Mining and Machine Learning"] },
      { term: "2027 · TR3", subjects: ["EG5312 Research Project 2", "CP5603 Advanced E-Security"] },
    ],
    curriculum: {
      title: { zh: "这张学期表怎么使用", en: "How to use this trimester plan" },
      items: {
        zh: ["这是 JCU 2026 TR1 入学 Enrolment Planner 的排法，不是永久不变的课表", "TR1、TR2、TR3 都可能有必修或签证相关最低在校学习要求", "正式选课前同时核对 Handbook、先修课、Class Registration 与 CoE"],
        en: ["This is the JCU 2026 TR1 entry planner, not a permanent timetable", "TR1, TR2 and TR3 can each carry compulsory or visa-related on-campus requirements", "Before enrolling, check the Handbook, prerequisites, Class Registration and CoE together"],
      },
    },
    links: [
      { label: { zh: "JCU MEng(Prof) 入学与专业说明", en: "JCU MEng(Prof) entry and major details" }, url: "https://www.jcu.edu.au/courses/master-of-engineering-professional" },
      { label: { zh: "JCU 2026 Enrolment Planner 入口", en: "JCU 2026 Enrolment Planner index" }, url: "https://www.jcu.edu.au/course-enrolment-planners" },
      { label: { zh: "XUT 2+2 / 3+2 培养模式", en: "XUT 2+2 / 3+2 model" }, url: "https://iec.xaut.edu.cn/info/1039/1732.htm" },
    ],
  },
];
