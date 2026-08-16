import { useEffect, useState } from "react";
import { ArrowRight, List, WaveSine, X } from "@phosphor-icons/react";
import { copy, navigation } from "./data/content.js";
import { CampusSelector } from "./components/CampusSelector.jsx";
import {
  browserPathForRoute,
  normalizePath,
  routeIdForPath,
  routePathFromBrowserPath,
} from "./router.js";
import { HomePage } from "./pages/HomePage.jsx";
import { CampusPage } from "./pages/CampusPage.jsx";
import { LifePage } from "./pages/LifePage.jsx";
import { OpportunitiesPage } from "./pages/OpportunitiesPage.jsx";
import { MarketPage } from "./pages/MarketPage.jsx";
import { CareerPage } from "./pages/CareerPage.jsx";
import { CulturePage } from "./pages/CulturePage.jsx";
import { AboutPage } from "./pages/AboutPage.jsx";
import { SetupPage } from "./pages/SetupPage.jsx";
import { EssentialsPage } from "./pages/EssentialsPage.jsx";
import { StudyPage } from "./pages/StudyPage.jsx";

export function App() {
  const basePath = import.meta.env.BASE_URL;
  const [locale, setLocale] = useState("zh");
  const [campusId, setCampusId] = useState(() => window.localStorage.getItem("tropic-loop-campus") || "cairns");
  const [path, setPath] = useState(() => routePathFromBrowserPath(window.location.pathname, basePath));
  const [menuOpen, setMenuOpen] = useState(false);
  const text = copy[locale];
  const routeId = routeIdForPath(path);
  const activeNavId = ["setup", "essentials"].includes(routeId)
    ? "life"
    : routeId === "opportunities" ? "career" : routeId;

  const selectCampus = (nextCampusId) => {
    setCampusId(nextCampusId);
    window.localStorage.setItem("tropic-loop-campus", nextCampusId);
  };

  useEffect(() => {
    const handlePopState = () => {
      setPath(routePathFromBrowserPath(window.location.pathname, basePath));
      setMenuOpen(false);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (nextPath) => {
    const normalized = normalizePath(nextPath);
    if (normalized !== path) {
      window.history.pushState({}, "", browserPathForRoute(normalized, basePath));
      setPath(normalized);
    }
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    if (routeId === "campus") return <CampusPage locale={locale} campusId={campusId} />;
    if (routeId === "study") return <StudyPage locale={locale} campusId={campusId} />;
    if (routeId === "life") return <LifePage locale={locale} campusId={campusId} onNavigate={navigate} />;
    if (routeId === "culture") return <CulturePage locale={locale} campusId={campusId} />;
    if (routeId === "market") return <MarketPage locale={locale} campusId={campusId} />;
    if (routeId === "career") return <CareerPage locale={locale} campusId={campusId} />;
    if (routeId === "about") return <AboutPage locale={locale} />;
    if (routeId === "opportunities") return <OpportunitiesPage locale={locale} campusId={campusId} />;
    if (routeId === "setup") return <SetupPage locale={locale} campusId={campusId} />;
    if (routeId === "essentials") return <EssentialsPage locale={locale} campusId={campusId} />;
    return <HomePage locale={locale} campusId={campusId} onCampusChange={selectCampus} onNavigate={navigate} />;
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <a
            className="brand"
            href={browserPathForRoute("/", basePath)}
            onClick={(event) => {
              event.preventDefault();
              navigate("/");
            }}
          >
            <WaveSine size={46} weight="regular" aria-hidden="true" />
            <span>Tropic Loop</span>
          </a>

          <nav className="desktop-nav" aria-label={locale === "zh" ? "主导航" : "Primary navigation"}>
            {navigation.map((item) => (
              <a
                href={browserPathForRoute(item.path, basePath)}
                aria-current={activeNavId === item.id ? "page" : undefined}
                className={activeNavId === item.id ? "active" : ""}
                key={item.id}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(item.path);
                }}
              >
                {item.label[locale]}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <CampusSelector campusId={campusId} locale={locale} onChange={selectCampus} compact />
            <div className="language-switch" aria-label="Language">
              <button className={locale === "zh" ? "active" : ""} type="button" onClick={() => setLocale("zh")}>
                中文
              </button>
              <span aria-hidden="true">|</span>
              <button className={locale === "en" ? "active" : ""} type="button" onClick={() => setLocale("en")}>
                EN
              </button>
            </div>
            <button
              className="menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? text.close : text.menu}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={24} /> : <List size={26} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label={locale === "zh" ? "移动端导航" : "Mobile navigation"}>
            <CampusSelector campusId={campusId} locale={locale} onChange={selectCampus} />
            {navigation.map((item) => (
              <a
                href={browserPathForRoute(item.path, basePath)}
                aria-current={activeNavId === item.id ? "page" : undefined}
                className={activeNavId === item.id ? "active" : ""}
                key={item.id}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(item.path);
                }}
              >
                {item.label[locale]}
                <ArrowRight size={18} />
              </a>
            ))}
          </nav>
        )}
      </header>

      <main key={path}>{renderPage()}</main>

      <footer>
        <p>{text.disclaimer}</p>
        <div>
          <span>{locale === "zh" ? "凯恩斯 · 汤斯维尔 · 北昆士兰" : "Cairns · Townsville · North Queensland"}</span>
          <span aria-hidden="true">|</span>
          <time dateTime="2026-08-15">15 August 2026</time>
        </div>
      </footer>
    </div>
  );
}
