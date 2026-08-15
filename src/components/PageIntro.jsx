export function PageIntro({ eyebrow, title, intro, image, alt, source, sourceLabel }) {
  return (
    <section className="page-intro" aria-labelledby="page-title">
      <div className="page-intro-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-title">
          {title.split("\n").map((line) => <span key={line}>{line}</span>)}
        </h1>
        <p>{intro}</p>
      </div>
      <figure className="page-intro-media">
        <img src={image} alt={alt} />
        <a href={source} target="_blank" rel="noreferrer">{sourceLabel}</a>
      </figure>
    </section>
  );
}
