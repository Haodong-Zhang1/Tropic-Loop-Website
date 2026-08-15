import { ArrowRight } from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import { copy, imageSources, opportunityItems } from "../data/content.js";

export function OpportunitiesPage({ locale }) {
  const text = copy[locale];
  const page = text.opportunities;

  return (
    <>
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        image={imageSources.ideasLab.src}
        source={imageSources.ideasLab.source}
        sourceLabel={text.source}
        alt={locale === "zh" ? "JCU Ideas Lab 内部空间" : "Interior of JCU Ideas Lab"}
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
          <span>JCU IDEAS LAB</span>
          <h2 id="ideas-place-heading">{page.placeTitle}</h2>
        </div>
        <a href={imageSources.ideasLab.source} target="_blank" rel="noreferrer">
          {text.source}<ArrowRight size={18} />
        </a>
      </section>
    </>
  );
}
