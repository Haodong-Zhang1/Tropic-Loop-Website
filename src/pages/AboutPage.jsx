import { ArrowUpRight, GithubLogo, MapPin, SealCheck, UserCircle } from "@phosphor-icons/react";
import { authorProfile, copy } from "../data/content.js";

export function AboutPage({ locale }) {
  const text = copy[locale];
  const page = text.about;

  return (
    <>
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 id="about-title">{page.title.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p>{page.intro}</p>
          <a href={authorProfile.github} target="_blank" rel="noreferrer"><GithubLogo size={21} />GitHub · Cairns-Loop-Website<ArrowUpRight size={17} /></a>
        </div>
        <div className="author-card">
          <div className="author-mark" aria-hidden="true">HZ</div>
          <div>
            <span>{locale === "zh" ? "作者" : "Author"}</span>
            <h2>{authorProfile.name}</h2>
            <p>{authorProfile.role[locale]}</p>
          </div>
          <ul>
            <li><UserCircle size={19} />{authorProfile.identity[locale]}</li>
            <li><MapPin size={19} />{locale === "zh" ? "Cairns · Australia" : "Cairns · Australia"}</li>
            <li><SealCheck size={19} />{locale === "zh" ? "当前唯一作者与维护者" : "Current sole author and maintainer"}</li>
          </ul>
        </div>
      </section>

      <section className="about-story page-section" aria-labelledby="about-story-heading">
        <div>
          <p className="eyebrow">WHY TROPIC LOOP</p>
          <h2 id="about-story-heading">{locale === "zh" ? "为什么做这个网站" : "Why this website exists"}</h2>
        </div>
        <p>{authorProfile.story[locale]}</p>
      </section>

      <section className="about-principles page-section" aria-labelledby="principles-heading">
        <div className="section-heading split-heading">
          <h2 id="principles-heading">{locale === "zh" ? "现在坚持的三件事" : "Three principles for now"}</h2>
          <p>{locale === "zh" ? "后续如果加入合作者，会在这里公开更新。" : "Any future collaborators will be disclosed here."}</p>
        </div>
        <div className="principle-grid">
          {authorProfile.principles.map((principle, index) => (
            <article key={principle.title.en}><span>0{index + 1}</span><h3>{principle.title[locale]}</h3><p>{principle.detail[locale]}</p></article>
          ))}
        </div>
      </section>
    </>
  );
}
