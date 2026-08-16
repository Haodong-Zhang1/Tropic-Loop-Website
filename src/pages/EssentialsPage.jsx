import { useMemo, useState } from "react";
import {
  Armchair,
  ArrowUpRight,
  FilmSlate,
  ForkKnife,
  MapPin,
  Scissors,
} from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import {
  campuses,
  copy,
  essentialCategories,
  essentialPlaces,
} from "../data/content.js";

const categoryIcons = {
  food: ForkKnife,
  entertainment: FilmSlate,
  care: Scissors,
  home: Armchair,
};

const localize = (value, locale) => typeof value === "string" ? value : value[locale];

export function EssentialsPage({ locale, campusId }) {
  const [categoryId, setCategoryId] = useState("food");
  const text = copy[locale];
  const page = text.essentials;
  const campus = campuses[campusId];
  const places = useMemo(
    () => essentialPlaces.filter((place) => place.campus === campusId && place.category === categoryId),
    [campusId, categoryId],
  );

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

      <section className="essentials-section page-section" aria-labelledby="essentials-heading">
        <div className="essentials-heading">
          <div><p className="eyebrow">{campus.traditionalName}</p><h2 id="essentials-heading">{page.sectionTitle}</h2></div>
          <p>{locale === "zh" ? "这是一份公开信息目录，不是付费排名；价格符号仅表示大致消费层级。" : "This is a public-information directory, not a paid ranking; price symbols only show a rough spending level."}</p>
        </div>

        <div className="essential-tabs" role="tablist" aria-label={page.sectionTitle}>
          {essentialCategories.map((category) => {
            const Icon = categoryIcons[category.id];
            return (
              <button key={category.id} type="button" role="tab" aria-selected={categoryId === category.id} className={categoryId === category.id ? "active" : ""} onClick={() => setCategoryId(category.id)}>
                <Icon size={20} />{category.label[locale]}
              </button>
            );
          })}
        </div>

        <div className="essential-grid" role="tabpanel">
          {places.map((place) => (
            <a key={place.id} href={place.url} target="_blank" rel="noreferrer" className="essential-card">
              <div className="essential-card-top"><span>{localize(place.type, locale)}</span><strong>{localize(place.price, locale)}</strong></div>
              <h3>{place.name}</h3>
              <p>{place.detail[locale]}</p>
              <div><MapPin size={17} /><span>{locale === "zh" ? "打开公开页面或地图" : "Open public page or map"}</span><ArrowUpRight size={17} /></div>
            </a>
          ))}
        </div>
        <div className="accuracy-note">
          <strong>{locale === "zh" ? "更新时间：2026 年 8 月 15 日" : "Last checked: 15 August 2026"}</strong>
          <span>{locale === "zh" ? "营业时间、门票、预约和配送范围可能变化，请以链接页面为准。" : "Opening hours, tickets, bookings and delivery areas can change; confirm on the linked page."}</span>
        </div>
      </section>
    </>
  );
}
