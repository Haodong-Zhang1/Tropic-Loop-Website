import { ArrowRight, Bank, Bus, ForkKnife, HouseLine, DeviceMobile, MapPin } from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import { campusRoutes, campuses, copy, lifeServices } from "../data/content.js";

const serviceIcons = {
  transport: Bus,
  housing: HouseLine,
  mobile: DeviceMobile,
  daily: ForkKnife,
};

export function LifePage({ locale, campusId, onNavigate }) {
  const text = copy[locale];
  const page = text.life;
  const campus = campuses[campusId];

  return (
    <>
      <PageIntro
        eyebrow={`${page.eyebrow} · ${campus.name[locale]}`}
        title={page.title}
        intro={page.intro}
        image={campus.lifeImage.src}
        source={campus.lifeImage.source}
        sourceLabel={text.source}
        alt={`${campus.name[locale]} · ${campus.traditionalName}`}
      />

      <section className="page-section" aria-labelledby="life-services-heading">
        <div className="section-heading split-heading">
          <h2 id="life-services-heading">{page.sectionTitle}</h2>
          <p>{locale === "zh" ? "先回答下一步做什么，再提供完整资料。" : "Answer the next step first, then provide the detail."}</p>
        </div>
        <div className="service-grid">
          {lifeServices.map((service) => {
            const Icon = serviceIcons[service.id] ?? Bank;
            const externalUrl = service.externalByCampus?.[campusId];
            const href = externalUrl ?? service.route;
            return (
              <a
                className="service-card"
                key={service.id}
                href={href}
                target={externalUrl ? "_blank" : undefined}
                rel={externalUrl ? "noreferrer" : undefined}
                onClick={externalUrl ? undefined : (event) => {
                  event.preventDefault();
                  onNavigate(service.route);
                }}
              >
                <div className="service-icon"><Icon size={24} weight="regular" /></div>
                <span>{service.meta[locale]}</span>
                <h3>{service.title[locale]}</h3>
                <p>{service.description[locale]}</p>
                <div className="service-action"><span>{service.action[locale]}</span><ArrowRight size={17} /></div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="route-section page-section" aria-labelledby="route-heading">
        <div className="section-heading split-heading"><h2 id="route-heading">{page.routeTitle}</h2><p>{locale === "zh" ? "路线会在 Google Maps 中打开；实时班次以 Translink 为准。" : "Routes open in Google Maps; check Translink for live service times."}</p></div>
        <div className="route-grid">
          {campusRoutes[campusId].map((route) => <a key={route.id} href={route.url} target="_blank" rel="noreferrer"><MapPin size={22} /><span><strong>{route.title[locale]}</strong><small>{route.detail[locale]}</small></span><ArrowRight size={18} /></a>)}
          <a href="https://jp.translink.com.au/plan-your-journey/journey-planner" target="_blank" rel="noreferrer"><Bus size={22} /><span><strong>Translink Journey Planner</strong><small>{locale === "zh" ? "查询实时公交" : "Check live public transport"}</small></span><ArrowRight size={18} /></a>
        </div>
      </section>

      <section className="source-band" aria-labelledby="life-place-heading">
        <div>
          <span>{campus.traditionalName}</span>
          <h2 id="life-place-heading">{page.placeTitle}</h2>
        </div>
        <div className="source-actions"><a href={campus.maps.interactive} target="_blank" rel="noreferrer">{text.officialMap}<ArrowRight size={18} /></a><a href={campus.maps.google} target="_blank" rel="noreferrer">{text.googleMap}<ArrowRight size={18} /></a></div>
      </section>
    </>
  );
}
