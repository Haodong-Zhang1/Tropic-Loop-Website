import { useState } from "react";
import {
  ArrowRight,
  ArrowSquareOut,
  BookOpenText,
  CheckCircle,
  GraduationCap,
  ListChecks,
  Translate,
  WarningCircle,
} from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import {
  academicEnglishModules,
  academicEnglishResources,
  academicVocabularyGroups,
  campuses,
  copy,
  jcuCourseAreas,
} from "../data/content.js";

function CourseGuide({ locale }) {
  const [activeCourseId, setActiveCourseId] = useState(jcuCourseAreas[0].id);
  const course = jcuCourseAreas.find((item) => item.id === activeCourseId);

  return (
    <div className="study-mode-panel degree-guide" role="tabpanel" id="jcu-course-panel">
      <div className="degree-guide-intro">
        <div>
          <span className="study-kicker">OFFICIAL JCU SOURCES</span>
          <h2>{locale === "zh" ? "先确认学位，再进入 Handbook 选课" : "Confirm the degree before planning subjects"}</h2>
          <p>{locale === "zh" ? "这里整理学位层面的校区、学制、入学时间和方向。具体科目、先修课与个人进度仍以当年 Handbook 和 Enrolment Planner 为准。" : "This guide organises course-level locations, duration, intakes and focus areas. Confirm subjects, prerequisites and your individual progression in the current Handbook and Enrolment Planner."}</p>
        </div>
        <a href="https://www.jcu.edu.au/course-enrolment-planners" target="_blank" rel="noreferrer" className="study-primary-link">
          <ListChecks size={22} weight="fill" aria-hidden="true" />
          <span>
            <strong>{locale === "zh" ? "打开 JCU 选课计划" : "Open JCU enrolment plans"}</strong>
            <small>{locale === "zh" ? "按年份与入学期核对" : "Check by year and intake"}</small>
          </span>
          <ArrowSquareOut size={17} aria-hidden="true" />
        </a>
      </div>

      <div className="degree-tabs" role="tablist" aria-label={locale === "zh" ? "JCU 学位" : "JCU degrees"}>
        {jcuCourseAreas.map((item) => (
          <button
            type="button"
            role="tab"
            aria-selected={item.id === activeCourseId}
            aria-controls="degree-detail"
            className={item.id === activeCourseId ? "active" : ""}
            key={item.id}
            onClick={() => setActiveCourseId(item.id)}
          >
            <span>{item.code}</span>
            <strong>{item.label[locale]}</strong>
            <small>{item.title}</small>
          </button>
        ))}
      </div>

      <article className={`degree-detail ${course.statusTone}`} id="degree-detail" aria-live="polite">
        <header>
          <div>
            <span className="degree-code">JCU · {course.code}</span>
            <h3>{course.title}</h3>
            <p>{course.summary[locale]}</p>
          </div>
          <span className={`course-status ${course.statusTone}`}>
            {course.statusTone === "verified"
              ? <CheckCircle size={17} weight="fill" aria-hidden="true" />
              : <WarningCircle size={17} weight="fill" aria-hidden="true" />}
            {course.status[locale]}
          </span>
        </header>

        <div className="degree-facts">
          <div><span>{locale === "zh" ? "学制" : "Duration"}</span><strong>{course.duration[locale]}</strong></div>
          <div><span>{locale === "zh" ? "校区" : "Locations"}</span><strong>{course.locations[locale]}</strong></div>
          <div><span>{locale === "zh" ? "入学时间" : "Intakes"}</span><strong>{course.intakes[locale]}</strong></div>
        </div>

        <div className="degree-detail-body">
          <section>
            <span>{locale === "zh" ? "你会看到的方向" : "What you will find"}</span>
            <ul>{course.highlights[locale].map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <aside>
            <span>{locale === "zh" ? "继续到官方页面" : "Continue to official sources"}</span>
            <div>
              {course.links.map((link) => (
                <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                  {link.label[locale]}<ArrowSquareOut size={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </article>

      <p className="integrity-note">{locale === "zh" ? "说明：Bachelor of Technology and Innovation 的当前招生状态无法从 JCU 2026 课程搜索页确认，因此仅保留带警示的历史入口，不把旧资料当作现行培养方案。" : "Note: the current admission status of the Bachelor of Technology and Innovation could not be confirmed in JCU's 2026 course finder, so archived information is shown with a warning and is not presented as a current study plan."}</p>
    </div>
  );
}

function AcademicEnglishGuide({ locale }) {
  const [activeGroupId, setActiveGroupId] = useState(academicVocabularyGroups[0].id);
  const group = academicVocabularyGroups.find((item) => item.id === activeGroupId);

  return (
    <div className="study-mode-panel academic-english-panel" role="tabpanel" id="academic-english-panel">
      <div className="academic-english-lead">
        <div>
          <span className="study-kicker">ACADEMIC ENGLISH</span>
          <h2>{locale === "zh" ? "重点不是“写得复杂”，而是准确完成任务" : "The goal is not complexity. It is accurate academic work."}</h2>
          <p>{locale === "zh" ? "把学术英语拆成四个可练习动作：看懂任务、建立论证、控制语气、引用与修订。每次 Assessment 都按同一顺序检查。" : "Treat Academic English as four trainable actions: unpack the task, build an argument, control the tone, then reference and revise. Use the same sequence for every assessment."}</p>
        </div>
        <div className="academic-loop" aria-label={locale === "zh" ? "学术英语练习循环" : "Academic English practice loop"}>
          <Translate size={30} weight="duotone" aria-hidden="true" />
          <strong>{locale === "zh" ? "词 → 词组 → 任务语境 → 自己造句" : "Word → phrase → task context → your own sentence"}</strong>
          <span>{locale === "zh" ? "不要只背中文释义" : "Do not memorise translations alone"}</span>
        </div>
      </div>

      <section className="academic-workflow" aria-labelledby="academic-workflow-heading">
        <div className="academic-section-heading">
          <span>{locale === "zh" ? "每次 Assessment 都能复用" : "Reusable for every assessment"}</span>
          <h3 id="academic-workflow-heading">{locale === "zh" ? "四步学术表达流程" : "A four-step academic communication workflow"}</h3>
        </div>
        <div className="academic-module-grid">
          {academicEnglishModules.map((module) => (
            <article key={module.id}>
              <span>{module.number}</span>
              <h4>{module.title[locale]}</h4>
              <p>{module.description[locale]}</p>
              <strong>{module.prompt[locale]}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="vocabulary-lab" aria-labelledby="vocabulary-heading">
        <div className="academic-section-heading">
          <span>{locale === "zh" ? "第一版核心词表" : "First-release vocabulary"}</span>
          <h3 id="vocabulary-heading">{locale === "zh" ? "按使用场景记，而不是按字母记" : "Learn by use, not alphabetically"}</h3>
        </div>
        <div className="vocabulary-layout">
          <div className="vocabulary-tabs" role="tablist" aria-label={locale === "zh" ? "词汇场景" : "Vocabulary contexts"}>
            {academicVocabularyGroups.map((item) => (
              <button
                type="button"
                role="tab"
                aria-selected={item.id === activeGroupId}
                className={item.id === activeGroupId ? "active" : ""}
                key={item.id}
                onClick={() => setActiveGroupId(item.id)}
              >
                <strong>{item.title[locale]}</strong>
                <span>{item.hint[locale]}</span>
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="vocabulary-sheet" aria-live="polite">
            <header>
              <span>{group.hint[locale]}</span>
              <h4>{group.title[locale]}</h4>
            </header>
            <dl>
              {group.words.map((word) => (
                <div key={word.term}>
                  <dt>{word.term}</dt>
                  <dd>{word.meaning[locale]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="academic-resources" aria-labelledby="academic-resources-heading">
        <div className="academic-section-heading">
          <span>{locale === "zh" ? "JCU 官方支持" : "Official JCU support"}</span>
          <h3 id="academic-resources-heading">{locale === "zh" ? "遇到具体问题，找真人确认" : "Get human support for specific questions"}</h3>
        </div>
        <div className="academic-resource-grid">
          {academicEnglishResources.map((resource) => (
            <a href={resource.url} target="_blank" rel="noreferrer" key={resource.url}>
              <BookOpenText size={25} weight="duotone" aria-hidden="true" />
              <div>
                <h4>{resource.title[locale]}</h4>
                <p>{resource.description[locale]}</p>
              </div>
              <ArrowSquareOut size={17} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <p className="integrity-note">{locale === "zh" ? "学术英语工具用于理解、规划和独立表达，不代写 Assessment；使用生成式 AI 前仍需查看课程的 Subject Outline 与 JCU 学术诚信要求。" : "These Academic English tools support understanding, planning and independent expression. They do not write assessments for you; check the Subject Outline and JCU academic integrity requirements before using generative AI."}</p>
    </div>
  );
}

export function StudyPage({ locale, campusId }) {
  const [activeSection, setActiveSection] = useState("english");
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
              aria-controls="academic-english-panel"
              aria-selected={activeSection === "english"}
              className={activeSection === "english" ? "active" : ""}
              onClick={() => setActiveSection("english")}
            >
              <Translate size={19} weight={activeSection === "english" ? "fill" : "regular"} aria-hidden="true" />
              {page.academicMode}
            </button>
            <button
              type="button"
              role="tab"
              aria-controls="jcu-course-panel"
              aria-selected={activeSection === "courses"}
              className={activeSection === "courses" ? "active" : ""}
              onClick={() => setActiveSection("courses")}
            >
              <GraduationCap size={19} weight={activeSection === "courses" ? "fill" : "regular"} aria-hidden="true" />
              {page.jcuMode}
            </button>
          </div>
        </div>

        {activeSection === "english" && <AcademicEnglishGuide locale={locale} />}
        {activeSection === "courses" && <CourseGuide locale={locale} />}

        <p className="integrity-note study-integrity">{page.notice}</p>
      </section>
    </>
  );
}
