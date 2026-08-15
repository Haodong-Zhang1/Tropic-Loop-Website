import { useMemo, useState } from "react";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { LocationCard } from "../components/LocationCard.jsx";
import { copy, imageSources, locations, studyPaths, weeklyItems } from "../data/content.js";

export function HomePage({ locale, onNavigate }) {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const text = copy[locale];
  const home = text.home;

  const searchableItems = useMemo(
    () => [
      ...studyPaths.flatMap((path) =>
        path.courses.map((course) => ({
          route: "/study",
          title: `${course.code} · ${locale === "zh" ? course.zh : course.title}`,
          detail: locale === "zh" ? course.title : course.zh,
          keywords: `${course.code} ${course.title} ${course.zh}`,
        })),
      ),
      ...locations.map((location) => ({
        route: location.route,
        title: location.title[locale],
        detail: location.description[locale],
        keywords: `${location.title.zh} ${location.title.en} 住宿 housing ideas lab innovation 实习`,
      })),
      ...weeklyItems.map((item) => ({
        route: item.route,
        title: item[locale],
        detail: locale === "zh" ? "来自本周重点" : "From this week's highlights",
        keywords: `${item.zh} ${item.en} 公交 bus 电话卡 sim 活动 events`,
      })),
    ],
    [locale],
  );

  const runSearch = (event) => {
    event.preventDefault();
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      setSearchResult({ kind: "empty" });
      return;
    }

    const match = searchableItems.find((item) =>
      item.keywords.toLowerCase().includes(normalizedQuery),
    );
    setSearchResult(match ? { kind: "match", ...match } : { kind: "empty" });
  };

  return (
    <>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-content">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1 id="hero-heading">
            {home.headline.split("\n").map((line) => <span key={line}>{line}</span>)}
          </h1>
          <p className="hero-promise">{home.promise}</p>
          <p className="hero-intro">{home.intro}</p>

          <form className="search-form" role="search" onSubmit={runSearch}>
            <MagnifyingGlass size={24} aria-hidden="true" />
            <label className="sr-only" htmlFor="site-search">{text.search}</label>
            <input
              id="site-search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                if (searchResult) setSearchResult(null);
              }}
              placeholder={text.searchPlaceholder}
            />
            <button type="submit" aria-label={text.search}>
              <ArrowRight size={24} weight="regular" />
            </button>
            {searchResult && (
              <div className={`search-result ${searchResult.kind}`} role="status">
                <strong>{searchResult.kind === "match" ? text.searchFound : text.searchEmpty}</strong>
                {searchResult.kind === "match" && (
                  <>
                    <span>{searchResult.title}</span>
                    <small>{searchResult.detail}</small>
                    <button
                      type="button"
                      onClick={() => onNavigate(searchResult.route)}
                    >
                      {text.openResult}
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
            )}
          </form>
        </div>

        <figure className="hero-media">
          <img
            src={imageSources.campus.src}
            alt={locale === "zh" ? "JCU 凯恩斯校区的学生与热带校园" : "Students walking through JCU Cairns campus"}
          />
        </figure>
      </section>

      <section className="weekly-strip" aria-labelledby="weekly-heading">
        <div className="weekly-title">
          <h2 id="weekly-heading">{home.weekly}</h2>
          <span aria-hidden="true" />
        </div>
        <div className="weekly-items">
          {weeklyItems.map((item, index) => (
            <a
              href={item.route}
              key={item.id}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.route);
              }}
            >
              <span className="weekly-number">0{index + 1}</span>
              <span>{item[locale]}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section className="campus-section home-explore" aria-labelledby="explore-heading">
        <div className="section-heading">
          <h2 id="explore-heading">{home.exploreTitle}</h2>
          <p>{home.exploreIntro}</p>
        </div>
        <div className="location-grid">
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              locale={locale}
              actionLabel={text.learnMore}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </section>
    </>
  );
}
