import { ArrowRight } from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import { campuses, copy, opportunityItems } from "../data/content.js";

export function OpportunitiesPage({ locale, campusId }) {
  const text = copy[locale];
  const page = text.opportunities;
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
        alt={campusId === "cairns" ? (locale === "zh" ? "JCU Ideas Lab 内部空间" : "Interior of JCU Ideas Lab") : `${campus.name[locale]} · ${campus.traditionalName}`}
      />

      <section className="page-section opportunity-section" aria-labelledby="opportunity-heading">
        <div className="section-heading split-heading">
          <h2 id="opportunity-heading">{page.sectionTitle}</h2>
          <p>{locale === "zh" ? "只发布状态清楚、参与方式可核实的内容。" : "Only entries with a clear status and verifiable joining path."}</p>
        </div>
        <div className="opportunity-list">
          {opportunityItems.map((item, index) => (
            <article key={item.id}>
              <span className="opportunity-number">0{index + 1}</span>
              <div>
                <span className="status-pill">{item.status[locale]}</span>
                <h3>{item.title[locale]}</h3>
                <p>{item.description[locale]}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="source-band" aria-labelledby="ideas-place-heading">
        <div>
          <span>{campusId === "cairns" ? "JCU IDEAS LAB · D4" : "ENGINEERING & INNOVATION PLACE · 506"}</span>
          <h2 id="ideas-place-heading">{page.placeTitle}</h2>
        </div>
        <a href={campus.maps.interactive} target="_blank" rel="noreferrer">
          {text.source}<ArrowRight size={18} />
        </a>
      </section>
    </>
  );
}
