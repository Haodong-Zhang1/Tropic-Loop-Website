import { MapPin } from "@phosphor-icons/react";
import { campuses, copy } from "../data/content.js";

export function CampusSelector({ campusId, locale, onChange, compact = false }) {
  return (
    <div className={`campus-selector ${compact ? "compact" : ""}`}>
      {!compact && <span><MapPin size={16} weight="fill" />{copy[locale].chooseCampus}</span>}
      <div role="group" aria-label={copy[locale].chooseCampus}>
        {Object.values(campuses).map((campus) => (
          <button
            key={campus.id}
            type="button"
            aria-pressed={campus.id === campusId}
            className={campus.id === campusId ? "active" : ""}
            onClick={() => onChange(campus.id)}
          >
            {campus.name[locale].replace(locale === "zh" ? "校区" : " campus", "")}
          </button>
        ))}
      </div>
    </div>
  );
}
