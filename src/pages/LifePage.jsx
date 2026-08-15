import { ArrowRight, Bank, Bus, ForkKnife, HouseLine, DeviceMobile } from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import { copy, imageSources, lifeServices } from "../data/content.js";

const serviceIcons = {
  transport: Bus,
  housing: HouseLine,
  mobile: DeviceMobile,
  daily: ForkKnife,
};

export function LifePage({ locale }) {
  const text = copy[locale];
  const page = text.life;

  return (
    <>
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.intro}
        image={imageSources.johnGreyHall.src}
        source={imageSources.johnGreyHall.source}
        sourceLabel={text.source}
        alt={locale === "zh" ? "John Grey Hall 学生住宿" : "John Grey Hall student accommodation"}
      />

      <section className="page-section" aria-labelledby="life-services-heading">
        <div className="section-heading split-heading">
          <h2 id="life-services-heading">{page.sectionTitle}</h2>
          <p>{locale === "zh" ? "先回答下一步做什么，再提供完整资料。" : "Answer the next step first, then provide the detail."}</p>
        </div>
        <div className="service-grid">
          {lifeServices.map((service) => {
            const Icon = serviceIcons[service.id] ?? Bank;
            return (
              <article className="service-card" key={service.id}>
                <div className="service-icon"><Icon size={24} weight="regular" /></div>
                <span>{service.meta[locale]}</span>
                <h3>{service.title[locale]}</h3>
                <p>{service.description[locale]}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="source-band" aria-labelledby="life-place-heading">
        <div>
          <span>JCU CAIRNS</span>
          <h2 id="life-place-heading">{page.placeTitle}</h2>
        </div>
        <a href={imageSources.campus.source} target="_blank" rel="noreferrer">
          {text.source}<ArrowRight size={18} />
        </a>
      </section>
    </>
  );
}
