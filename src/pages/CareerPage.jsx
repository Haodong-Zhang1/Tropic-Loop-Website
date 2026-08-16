import { ArrowUpRight, Briefcase, CheckCircle, GraduationCap, PresentationChart, UsersThree } from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import {
  campuses,
  careerResources,
  careerTracks,
  copy,
  opportunityItems,
} from "../data/content.js";

export function CareerPage({ locale, campusId }) {
  const text = copy[locale];
  const page = text.career;
  const campus = campuses[campusId];

  return (
    <>
      <PageIntro
        eyebrow={`${page.eyebrow} · ${campus.name[locale]}`}
        title={page.title}
        intro={page.intro}
        image={campus.opportunityImage.src}
        source={campus.opportunityImage.source}
        sourceLabel={text.source}
        alt={`${campus.name[locale]} · ${campus.traditionalName}`}
      />

      <section className="career-section page-section" aria-labelledby="career-track-heading">
        <div className="section-heading split-heading">
          <h2 id="career-track-heading">{page.sectionTitle}</h2>
          <p>{locale === "zh" ? "就业不是毕业前才开始，而是一条逐步积累证据的路线。" : "Career preparation starts before graduation and builds evidence over time."}</p>
        </div>
        <div className="career-track-grid">
          {careerTracks.map((track) => (
            <article key={track.id}>
              <span>{track.number}</span>
              <h3>{track.title[locale]}</h3>
              <p>{track.description[locale]}</p>
              <strong><CheckCircle size={17} />{track.action[locale]}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="career-resource-section page-section" aria-labelledby="career-resource-heading">
        <div className="section-heading split-heading">
          <h2 id="career-resource-heading">{page.resourcesTitle}</h2>
          <p>{locale === "zh" ? "最后核实：2026 年 8 月 15 日。岗位、资格与签证条件以打开后的页面为准。" : "Last checked: 15 August 2026. Confirm roles, eligibility and visa conditions on the linked page."}</p>
        </div>
        <div className="career-resource-grid">
          {careerResources.map((resource) => (
            <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer">
              <span>{resource.kind[locale]}</span>
              <h3>{resource.title}</h3>
              <p>{resource.description[locale]}</p>
              <strong>{locale === "zh" ? "打开官方入口" : "Open source"}<ArrowUpRight size={17} /></strong>
            </a>
          ))}
        </div>
      </section>

      <section className="career-opportunity-section page-section" aria-labelledby="career-opportunity-heading">
        <div className="section-heading split-heading">
          <h2 id="career-opportunity-heading">{locale === "zh" ? "实践与创新" : "Practice and innovation"}</h2>
          <p>{locale === "zh" ? "保留原机会板：没有确认的岗位不会被包装成实习。" : "The existing opportunity board remains: unconfirmed roles are not presented as placements."}</p>
        </div>
        <div className="career-opportunity-list">
          {opportunityItems.map((item, index) => (
            <article key={item.id}>
              <span>0{index + 1}</span>
              <div><strong>{item.status[locale]}</strong><h3>{item.title[locale]}</h3><p>{item.description[locale]}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="career-voices page-section" aria-labelledby="career-voices-heading">
        <div className="career-voices-copy">
          <p className="eyebrow">EXPERIENCE LIBRARY · PLANNED</p>
          <h2 id="career-voices-heading">{page.voicesTitle}</h2>
          <p>{locale === "zh" ? "后续邀请老师、Tutor 和毕业学长学姐，围绕选方向、找实习、作品集、面试与北昆士兰就业分享可验证的经验。公开内容与深度付费内容会明确区分。" : "A future library of verifiable teacher, tutor and alumni experience on pathways, placements, portfolios, interviews and work in North Queensland. Free and paid depth will be clearly separated."}</p>
        </div>
        <div className="career-voices-grid">
          <article><GraduationCap size={26} /><span>{locale === "zh" ? "学长学姐" : "Alumni"}</span><strong>{locale === "zh" ? "从课程项目到第一份工作" : "From course project to first role"}</strong></article>
          <article><PresentationChart size={26} /><span>{locale === "zh" ? "老师与 Tutor" : "Teachers & tutors"}</span><strong>{locale === "zh" ? "行业能力与学习重点" : "Industry skills and study priorities"}</strong></article>
          <article><UsersThree size={26} /><span>{locale === "zh" ? "小型分享会" : "Small sessions"}</span><strong>{locale === "zh" ? "先验证需求，再开放付费" : "Validate demand before paid access"}</strong></article>
        </div>
        <div className="planned-badge"><Briefcase size={18} />{locale === "zh" ? "筹备中 · 当前不收费" : "Planned · no payment yet"}</div>
      </section>
    </>
  );
}
