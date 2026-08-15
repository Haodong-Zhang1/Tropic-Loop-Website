import { useState } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import { copy, imageSources, studyPaths } from "../data/content.js";

export function StudyPage({ locale }) {
  const [activePath, setActivePath] = useState(studyPaths[0].id);
  const [selectedCourse, setSelectedCourse] = useState(studyPaths[0].courses[0]);
  const text = copy[locale];
  const page = text.study;
  const selectedPath = studyPaths.find((path) => path.id === activePath);

  return (
    <>
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        image={imageSources.campus.src}
        source={imageSources.campus.source}
        sourceLabel={text.source}
        alt={locale === "zh" ? "JCU 凯恩斯校区" : "JCU Cairns campus"}
      />

      <section className="study-section routed-section" aria-labelledby="study-heading">
        <div className="study-heading-row">
          <h2 id="study-heading">{page.sectionTitle}</h2>
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
            <strong>{page.toolkit}</strong>
            <ul>
              {page.toolkitItems.map((item) => (
                <li key={item}><CheckCircle size={18} weight="fill" />{item}</li>
              ))}
            </ul>
          </aside>
        </div>
        <p className="integrity-note">{page.notice}</p>
      </section>
    </>
  );
}
