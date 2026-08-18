import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpenText,
  CaretDown,
  Compass,
  DotsThree,
  House,
  List,
  UsersThree,
  WaveSine,
  X,
} from "@phosphor-icons/react";
import { copy, mobilePrimaryNavigationIds, navigation, navigationGroups } from "./data/content.js";
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
  const activeGroupId = navigationGroups.find((group) => group.itemIds.includes(activeNavId))?.id;
  const mobileIcons = {
    home: House,
    support: Compass,
    community: UsersThree,
    academic: BookOpenText,
  };
  const mobileNavigation = mobilePrimaryNavigationIds.map((id) => {
    if (id === "home") return { ...navigation.find((item) => item.id === id), Icon: mobileIcons[id] };
    const group = navigationGroups.find((item) => item.id === id);
    return { id, path: group.landingPath, label: group.label, Icon: mobileIcons[id] };
  });
  const moreIsActive = menuOpen || activeNavId === "about";
  const homeNav = navigation.find((item) => item.id === "home");
  const aboutNav = navigation.find((item) => item.id === "about");

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
            <a
              href={browserPathForRoute(homeNav.path, basePath)}
              aria-current={activeNavId === homeNav.id ? "page" : undefined}
              className={activeNavId === homeNav.id ? "active" : ""}
              onClick={(event) => {
                event.preventDefault();
                navigate(homeNav.path);
              }}
            >
              {homeNav.label[locale]}
            </a>
            {navigationGroups.map((group) => (
              <div className={`desktop-nav-group ${activeGroupId === group.id ? "active" : ""}`} key={group.id}>
                <a
                  className="desktop-nav-trigger"
                  href={browserPathForRoute(group.landingPath, basePath)}
                  aria-current={activeGroupId === group.id ? "page" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(group.landingPath);
                  }}
                >
                  {group.label[locale]}<CaretDown size={14} weight="bold" aria-hidden="true" />
                </a>
                <div className="desktop-nav-menu">
                  <span>{group.description[locale]}</span>
                  {group.itemIds.map((itemId) => {
                    const item = navigation.find((entry) => entry.id === itemId);
                    return (
                      <a
                        href={browserPathForRoute(item.path, basePath)}
                        className={activeNavId === item.id ? "active" : ""}
                        key={item.id}
                        onClick={(event) => {
                          event.preventDefault();
                          navigate(item.path);
                        }}
                      >
                        {item.label[locale]}<ArrowRight size={15} aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
            <a
              href={browserPathForRoute(aboutNav.path, basePath)}
              aria-current={activeNavId === aboutNav.id ? "page" : undefined}
              className={activeNavId === aboutNav.id ? "active" : ""}
              onClick={(event) => {
                event.preventDefault();
                navigate(aboutNav.path);
              }}
            >
              {aboutNav.label[locale]}
            </a>
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
            <a
              href={browserPathForRoute(homeNav.path, basePath)}
              aria-current={activeNavId === homeNav.id ? "page" : undefined}
              className={activeNavId === homeNav.id ? "active" : ""}
              onClick={(event) => {
                event.preventDefault();
                navigate(homeNav.path);
              }}
            >
              {homeNav.label[locale]}<ArrowRight size={18} aria-hidden="true" />
            </a>
            {navigationGroups.map((group) => (
              <section className="mobile-nav-group" key={group.id}>
                <header>
                  <strong>{group.label[locale]}</strong>
                  <span>{group.description[locale]}</span>
                </header>
                {group.itemIds.map((itemId) => {
                  const item = navigation.find((entry) => entry.id === itemId);
                  return (
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
                      {item.label[locale]}<ArrowRight size={18} aria-hidden="true" />
                    </a>
                  );
                })}
              </section>
            ))}
            <a
              href={browserPathForRoute(aboutNav.path, basePath)}
              aria-current={activeNavId === aboutNav.id ? "page" : undefined}
              className={activeNavId === aboutNav.id ? "active" : ""}
              onClick={(event) => {
                event.preventDefault();
                navigate(aboutNav.path);
              }}
            >
              {aboutNav.label[locale]}<ArrowRight size={18} aria-hidden="true" />
            </a>
          </nav>
        )}
      </header>

      <nav className="mobile-bottom-nav" aria-label={locale === "zh" ? "手机快捷导航" : "Mobile quick navigation"}>
        {mobileNavigation.map(({ id, path: itemPath, label, Icon }) => (
          <a
            href={browserPathForRoute(itemPath, basePath)}
            aria-current={(id === "home" ? activeNavId === id : activeGroupId === id) ? "page" : undefined}
            className={(id === "home" ? activeNavId === id : activeGroupId === id) ? "active" : ""}
            key={id}
            onClick={(event) => {
              event.preventDefault();
              navigate(itemPath);
            }}
          >
            <Icon size={22} weight={(id === "home" ? activeNavId === id : activeGroupId === id) ? "fill" : "regular"} aria-hidden="true" />
            <span>{label[locale]}</span>
          </a>
        ))}
        <button
          type="button"
          className={moreIsActive ? "active" : ""}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? text.close : text.menu}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <DotsThree size={23} weight={moreIsActive ? "bold" : "regular"} aria-hidden="true" />
          <span>{text.more}</span>
        </button>
      </nav>

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
