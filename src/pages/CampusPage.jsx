import { useMemo, useState } from "react";
import { ArrowRight, Buildings, MapPin, MagnifyingGlass, UserFocus } from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import {
  buildingDirectory,
  campusOffices,
  campuses,
  copy,
  staffDirectory,
} from "../data/content.js";

export function CampusPage({ locale, campusId }) {
  const [query, setQuery] = useState("");
  const campus = campuses[campusId];
  const text = copy[locale];
  const page = text.campus;

  const buildings = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const all = buildingDirectory.filter((item) => item.campus === campusId);
    if (!normalized) return all;
    return all.filter((item) => `${item.code} ${item.name}`.toLowerCase().includes(normalized));
  }, [campusId, query]);

  const offices = campusOffices.filter((item) => item.campus === campusId);
  const staff = staffDirectory.filter((item) => item.campus === "both" || item.campus === campusId);

  return (
    <>
      <PageIntro
        eyebrow={`${page.eyebrow} · ${campus.name[locale]}`}
        title={page.title}
        intro={`${page.intro} ${campus.address}`}
        image={campus.image.src}
        source={campus.image.source}
        sourceLabel={text.source}
        alt={`${campus.name[locale]} · ${campus.traditionalName}`}
      />

      <section className="campus-tools page-section" aria-label={campus.name[locale]}>
        <div className="map-link-grid">
          <a href={campus.maps.interactive} target="_blank" rel="noreferrer"><MapPin size={22} /><strong>{text.officialMap}</strong><span>{campus.traditionalName}</span><ArrowRight size={18} /></a>
          <a href={campus.maps.printable} target="_blank" rel="noreferrer"><Buildings size={22} /><strong>{text.printableMap}</strong><span>{campus.address}</span><ArrowRight size={18} /></a>
          <a href={campus.maps.google} target="_blank" rel="noreferrer"><MapPin size={22} /><strong>{text.googleMap}</strong><span>{locale === "zh" ? "导航到校区" : "Navigate to campus"}</span><ArrowRight size={18} /></a>
        </div>
      </section>

      <section className="directory-section page-section" aria-labelledby="building-heading">
        <div className="directory-heading">
          <div><p className="eyebrow">{campus.traditionalName}</p><h2 id="building-heading">{page.sectionTitle}</h2></div>
          <label className="directory-search"><MagnifyingGlass size={20} /><span className="sr-only">{text.search}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={locale === "zh" ? "输入楼号或建筑名，例如 D4、Library" : "Building number or name, e.g. 018, Library"} /></label>
        </div>
        <p className="directory-count">{buildings.length} {locale === "zh" ? "栋建筑" : "buildings"}</p>
        <div className="building-grid">
          {buildings.map((building) => (
            <a key={building.id} href={campus.maps.interactive} target="_blank" rel="noreferrer">
              <span>{building.code}</span><strong>{building.name}</strong><ArrowRight size={16} />
            </a>
          ))}
        </div>
      </section>

      <section className="directory-support page-section">
        <div>
          <div className="section-heading"><h2>{page.officesTitle}</h2></div>
          <div className="office-list">
            {offices.map((office) => <a key={office.id} href={campus.maps.interactive} target="_blank" rel="noreferrer"><span>{office.code}</span><strong>{office.name[locale]}</strong><ArrowRight size={16} /></a>)}
          </div>
        </div>
        <div>
          <div className="section-heading"><h2>{page.staffTitle}</h2></div>
          <div className="staff-list">
            {staff.map((person) => <a key={person.id} href={person.url} target="_blank" rel="noreferrer"><UserFocus size={20} /><span><strong>{person.name[locale]}</strong><small>{person.office ? `${person.office.code} · ${person.office.name}` : person.role[locale]}</small></span><ArrowRight size={16} /></a>)}
          </div>
          <p className="data-note">{locale === "zh" ? "导师办公室可能调整；进入官方档案或人员目录确认最新地点。" : "Staff offices can change; confirm the latest location in the official profile or directory."}</p>
        </div>
      </section>
    </>
  );
}
