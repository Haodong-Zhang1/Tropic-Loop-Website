import { ArrowRight } from "@phosphor-icons/react";

export function LocationCard({ location, locale, actionLabel, onNavigate }) {
  return (
    <a
      className="location-card"
      href={location.route}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(location.route);
      }}
    >
      <img src={location.image.src} alt={location.title[locale]} />
      <div className="location-copy">
        <div>
          <h3>{location.title[locale]}</h3>
          <p>{location.description[locale]}</p>
          <small>{actionLabel}</small>
        </div>
        <ArrowRight size={24} weight="regular" aria-hidden="true" />
      </div>
    </a>
  );
}
