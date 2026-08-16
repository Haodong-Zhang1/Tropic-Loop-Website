import { useState } from "react";
import {
  ArrowRight,
  ArrowSquareOut,
  BookOpenText,
  Books,
  CheckCircle,
  GraduationCap,
  PlayCircle,
  Sparkle,
  MapPin,
  UserFocus,
  WarningCircle,
} from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import {
  campuses,
  copy,
  jointPathwayModes,
  jointPathways,
  openLearningTopics,
  resourceRecommendationUrl,
  studyPaths,
} from "../data/content.js";

function CourseLibrary({ locale, page, text }) {
  const [activePath, setActivePath] = useState(studyPaths[0].id);
  const [selectedCourse, setSelectedCourse] = useState(studyPaths[0].courses[0]);
  const selectedPath = studyPaths.find((path) => path.id === activePath);

  return (
    <div className="study-mode-panel" role="tabpanel" id="jcu-course-panel">
      <div className="study-heading-row course-path-heading">
        <div>
          <span className="study-kicker">{locale === "zh" ? "按方向浏览" : "Browse by discipline"}</span>
          <h2>{locale === "zh" ? "JCU 课程与伴学入口" : "JCU subjects and study support"}</h2>
        </div>
        <div className="path-tabs" role="tablist" aria-label={page.sectionTitle}>
          {studyPaths.map((path) => (
            <button
              type="button"
              role="tab"
              aria-selected={activePath === path.id}
              className={activePath === path.id ? "active" : ""}
              key={path.id}
              onClick={() => {
                setActivePath(path.id);
                setSelectedCourse(path.courses[0]);
              }}
            >
              {path.label[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="study-workspace">
        <div className="course-list" role="tabpanel">
          {selectedPath.courses.map((course) => (
            <button
              className={`course-row ${selectedCourse?.code === course.code ? "selected" : ""}`}
              type="button"
              key={course.code}
              onClick={() => setSelectedCourse(course)}
            >
              <span className="course-code">{course.code}</span>
              <strong>{course.title}</strong>
              <span>{course.zh}</span>
              <ArrowRight size={20} weight="regular" aria-hidden="true" />
            </button>
          ))}
        </div>

        <aside className="course-panel" aria-live="polite">
          <span>{page.selected}</span>
          <h3>{selectedCourse.code}</h3>
          <p>{locale === "zh" ? selectedCourse.zh : selectedCourse.title}</p>
          <strong>{locale === "zh" ? "匹配的公开学习资源" : "Matched public learning resources"}</strong>
          <ul className="course-resource-list">
            {selectedCourse.resources.map((resource) => (
              <li key={resource.url}>
                <BookOpenText size={18} weight="fill" aria-hidden="true" />
                <a href={resource.url} target="_blank" rel="noreferrer">{resource.label[locale]}</a>
              </li>
            ))}
          </ul>
          <div className="course-actions">
            <a href={selectedCourse.url} target="_blank" rel="noreferrer"><ArrowSquareOut size={17} />{locale === "zh" ? "打开官方课程页" : "Open official subject page"}</a>
            <a href="https://apps.jcu.edu.au/contact-us/" target="_blank" rel="noreferrer"><UserFocus size={17} />{text.staffSearch}</a>
            <a href={selectedPath.advisor.url} target="_blank" rel="noreferrer"><ArrowSquareOut size={17} />{selectedPath.advisor.label[locale]}</a>
          </div>
        </aside>
      </div>
      <p className="integrity-note">{locale === "zh" ? "公开资源用于预习与复习，不替代 LearnJCU 课件、Subject Outline 或老师对评估任务的说明。" : "Public resources support preparation and revision; they do not replace LearnJCU materials, the Subject Outline or assessment instructions."}</p>
    </div>
  );
}

function OpenResourceLibrary({ locale }) {
  const [activeTopicId, setActiveTopicId] = useState(openLearningTopics[0].id);
  const activeTopic = openLearningTopics.find((topic) => topic.id === activeTopicId);

  const recommendUrl = `${resourceRecommendationUrl}?${new URLSearchParams({
    title: "[公开资源推荐] ",
    body: locale === "zh"
      ? "推荐人（老师 / Tutor / 学生）：\n学科：\n资源名称：\n公开链接：\n推荐理由：\n适合的 JCU 课程：\n是否免费：是 / 否\n"
      : "Recommender (teacher / tutor / student):\nDiscipline:\nResource title:\nPublic URL:\nWhy it is useful:\nRelevant JCU subjects:\nFree to access: yes / no\n",
  }).toString()}`;

  return (
    <div className="study-mode-panel open-resource-panel" role="tabpanel" id="open-resource-panel">
      <div className="open-resource-intro">
        <div>
          <span className="study-kicker">OPEN LEARNING LIBRARY</span>
          <h2>{locale === "zh" ? "按学科找到真正能学完的免费资源" : "Free resources organised by discipline"}</h2>
          <p>{locale === "zh" ? "首批覆盖机器学习、线性代数、概率统计、Python、电子与网络安全。每项都标注平台、语言、难度和使用建议。" : "The first release covers machine learning, linear algebra, probability, Python, electronics and cybersecurity, with platform, language, level and study guidance."}</p>
        </div>
        <a className="recommend-resource-link" href={recommendUrl} target="_blank" rel="noreferrer">
          <Sparkle size={19} weight="fill" aria-hidden="true" />
          <span>
            <strong>{locale === "zh" ? "老师 / Tutor 推荐资源" : "Teacher / tutor recommendations"}</strong>
            <small>{locale === "zh" ? "提交后核实，再加入正式列表" : "Reviewed before joining the library"}</small>
          </span>
          <ArrowSquareOut size={17} aria-hidden="true" />
        </a>
      </div>

      <div className="resource-topic-tabs" role="tablist" aria-label={locale === "zh" ? "公开资源学科" : "Open resource disciplines"}>
        {openLearningTopics.map((topic) => (
          <button
            type="button"
            role="tab"
            aria-selected={topic.id === activeTopicId}
            className={topic.id === activeTopicId ? "active" : ""}
            key={topic.id}
            onClick={() => setActiveTopicId(topic.id)}
          >
            {topic.title[locale]}
          </button>
        ))}
      </div>

      <section className="resource-topic" aria-live="polite">
        <header>
          <div>
            <span>{locale === "zh" ? "当前学科" : "Current discipline"}</span>
            <h3>{activeTopic.title[locale]}</h3>
            <p>{activeTopic.description[locale]}</p>
          </div>
          <div className="resource-prerequisite">
            <Books size={19} weight="fill" aria-hidden="true" />
            <span>{locale === "zh" ? "开始前" : "Before you start"}</span>
            <strong>{activeTopic.prerequisite[locale]}</strong>
          </div>
        </header>

        <div className="open-resource-grid">
          {activeTopic.resources.map((resource) => (
            <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}>
              <div className="resource-card-topline">
                <span>{resource.platform}</span>
                <ArrowSquareOut size={17} aria-hidden="true" />
              </div>
              <PlayCircle size={31} weight="duotone" aria-hidden="true" />
              <h4>{resource.title}</h4>
              <p className="resource-provider">{resource.provider}</p>
              <p>{resource.note[locale]}</p>
              <div className="resource-meta">
                <span>{resource.language[locale]}</span>
                <span>{resource.level[locale]}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <p className="integrity-note">{locale === "zh" ? "筛选标准：免费公开、来源可追溯、内容结构完整。第三方平台的可用性和字幕可能变化；正式考核仍以 Subject Outline 与授课老师要求为准。" : "Selection criteria: free public access, traceable source and coherent teaching structure. Third-party availability and captions can change; the Subject Outline and teaching team remain authoritative for assessment."}</p>
    </div>
  );
}

function JointPathway({ locale }) {
  const [activeMode, setActiveMode] = useState(jointPathwayModes[0].id);
  const [activeProgram, setActiveProgram] = useState(jointPathways[0].id);
  const availablePrograms = jointPathways.filter((pathway) => pathway.mode === activeMode);
  const selectedProgram = availablePrograms.find((pathway) => pathway.id === activeProgram) || availablePrograms[0];

  const switchMode = (modeId) => {
    setActiveMode(modeId);
    setActiveProgram(jointPathways.find((pathway) => pathway.mode === modeId).id);
  };

  return (
    <div className="study-mode-panel joint-panel" role="tabpanel" id="joint-pathway-panel">
      <div className="joint-controls">
        <div>
          <span className="study-kicker">JCU × XUT</span>
          <h2>{locale === "zh" ? "联合培养路径导航" : "Joint pathway navigator"}</h2>
          <p>{locale === "zh" ? "先选培养模式，再看对应专业、学分和学期安排。" : "Choose the model first, then review the program, credit and trimester details."}</p>
        </div>
        <div className="joint-mode-switch" role="tablist" aria-label={locale === "zh" ? "培养模式" : "Pathway model"}>
          {jointPathwayModes.map((mode) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeMode === mode.id}
              className={activeMode === mode.id ? "active" : ""}
              key={mode.id}
              onClick={() => switchMode(mode.id)}
            >
              {mode.label[locale]}
            </button>
          ))}
        </div>
      </div>

      <div className="joint-program-tabs" role="tablist" aria-label={locale === "zh" ? "联合培养专业" : "Joint pathway programs"}>
        {availablePrograms.map((program) => (
          <button
            type="button"
            role="tab"
            aria-selected={selectedProgram.id === program.id}
            className={selectedProgram.id === program.id ? "active" : ""}
            key={program.id}
            onClick={() => setActiveProgram(program.id)}
          >
            <GraduationCap size={20} weight={selectedProgram.id === program.id ? "fill" : "regular"} aria-hidden="true" />
            <span>{program.shortLabel[locale]}</span>
          </button>
        ))}
      </div>

      <article className="joint-program" aria-live="polite">
        <header className="joint-program-header">
          <div>
            <span className="verified-pill"><CheckCircle size={15} weight="fill" />{selectedProgram.status[locale]}</span>
            <h3>{selectedProgram.title[locale]}</h3>
            <p>{selectedProgram.summary[locale]}</p>
          </div>
          <span className="pathway-mark" aria-label={activeMode === "2plus2" ? "2 plus 2" : "3 plus 2"}>
            {activeMode === "2plus2" ? "2+2" : "3+2"}
          </span>
        </header>

        <div className="joint-facts">
          {selectedProgram.facts.map((fact) => (
            <div key={fact.label.en}>
              <span>{fact.label[locale]}</span>
              <strong>{fact.value[locale]}</strong>
            </div>
          ))}
        </div>

        <section className="pathway-timeline" aria-labelledby="pathway-timeline-heading">
          <div className="joint-section-heading">
            <span>{locale === "zh" ? "培养时间线" : "Study timeline"}</span>
            <h4 id="pathway-timeline-heading">{locale === "zh" ? "每一阶段要完成什么" : "What happens at each stage"}</h4>
          </div>
          <div className="timeline-grid">
            {selectedProgram.stages.map((stage, index) => (
              <article key={stage.label.en}>
                <span className="timeline-number">0{index + 1}</span>
                <div>
                  <h5>{stage.label[locale]}</h5>
                  <p>{stage.detail[locale]}</p>
                  <ul>
                    {stage.items[locale].map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {selectedProgram.termPlan && (
          <section className="trimester-section" aria-labelledby="trimester-heading">
            <div className="joint-section-heading">
              <span>{locale === "zh" ? "2026 TR1 入学示例" : "2026 TR1 entry example"}</span>
              <h4 id="trimester-heading">{locale === "zh" ? "JCU 两年 Trimester 计划" : "Two-year JCU trimester plan"}</h4>
            </div>
            <div className="trimester-grid">
              {selectedProgram.termPlan.map((term) => (
                <article key={term.term}>
                  <strong>{term.term}</strong>
                  <ul>{term.subjects.map((subject) => <li key={subject}>{subject}</li>)}</ul>
                </article>
              ))}
            </div>
          </section>
        )}

        <div className="joint-bottom-grid">
          <section className="confirmation-card">
            <WarningCircle size={27} weight="fill" aria-hidden="true" />
            <div>
              <span>{locale === "zh" ? "正式选课前" : "Before formal enrolment"}</span>
              <h4>{selectedProgram.curriculum.title[locale]}</h4>
              <ul>
                {selectedProgram.curriculum.items[locale].map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>
          <section className="official-source-card">
            <MapPin size={27} weight="fill" aria-hidden="true" />
            <div>
              <span>{locale === "zh" ? "一手来源" : "Primary sources"}</span>
              <h4>{locale === "zh" ? "继续核对官方文件" : "Continue with official documents"}</h4>
              <div>
                {selectedProgram.links.map((link) => (
                  <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                    {link.label[locale]}<ArrowSquareOut size={15} />
                  </a>
                ))}
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}

export function StudyPage({ locale, campusId }) {
  const [activeSection, setActiveSection] = useState("jcu");
  const text = copy[locale];
  const page = text.study;
  const campus = campuses[campusId];

  return (
    <>
      <PageIntro
        eyebrow={`${page.eyebrow} · ${campus.name[locale]}`}
        title={page.title}
        intro={page.intro}
        image={campus.studyImage.src}
        source={campus.studyImage.source}
        sourceLabel={text.source}
        alt={`${campus.name[locale]} · ${campus.traditionalName}`}
      />

      <section className="study-section routed-section" aria-labelledby="study-heading">
        <div className="study-overview-heading">
          <div>
            <span className="study-kicker">STUDY NAVIGATOR</span>
            <h2 id="study-heading">{page.sectionTitle}</h2>
          </div>
          <div className="study-mode-switch" role="tablist" aria-label={page.sectionTitle}>
            <button
              type="button"
              role="tab"
              aria-controls="jcu-course-panel"
              aria-selected={activeSection === "jcu"}
              className={activeSection === "jcu" ? "active" : ""}
              onClick={() => setActiveSection("jcu")}
            >
              <BookOpenText size={19} weight={activeSection === "jcu" ? "fill" : "regular"} />
              {page.jcuMode}
            </button>
            <button
              type="button"
              role="tab"
              aria-controls="open-resource-panel"
              aria-selected={activeSection === "open"}
              className={activeSection === "open" ? "active" : ""}
              onClick={() => setActiveSection("open")}
            >
              <PlayCircle size={19} weight={activeSection === "open" ? "fill" : "regular"} />
              {page.publicMode}
            </button>
            <button
              type="button"
              role="tab"
              aria-controls="joint-pathway-panel"
              aria-selected={activeSection === "joint"}
              className={activeSection === "joint" ? "active" : ""}
              onClick={() => setActiveSection("joint")}
            >
              <GraduationCap size={19} weight={activeSection === "joint" ? "fill" : "regular"} />
              {page.jointMode}
            </button>
          </div>
        </div>

        {activeSection === "jcu" && <CourseLibrary locale={locale} page={page} text={text} />}
        {activeSection === "open" && <OpenResourceLibrary locale={locale} />}
        {activeSection === "joint" && <JointPathway locale={locale} />}

        <p className="integrity-note study-integrity">{page.notice}</p>
      </section>
    </>
  );
}
