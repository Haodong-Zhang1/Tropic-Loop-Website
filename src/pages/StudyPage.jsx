import { useState } from "react";
import {
  ArrowRight,
  ArrowSquareOut,
  BookOpenText,
  CheckCircle,
  GraduationCap,
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
          <h2>{locale === "zh" ? "JCU 课程与公开学习资源" : "JCU subjects and public learning resources"}</h2>
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
        image={campus.image.src}
        source={campus.image.source}
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

        {activeSection === "jcu" ? (
          <CourseLibrary locale={locale} page={page} text={text} />
        ) : (
          <JointPathway locale={locale} />
        )}

        <p className="integrity-note study-integrity">{page.notice}</p>
      </section>
    </>
  );
}
