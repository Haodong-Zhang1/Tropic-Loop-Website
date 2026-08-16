import { useState } from "react";
import {
  ArrowSquareOut,
  CalendarDots,
  ChatCircleText,
  Compass,
  Lightbulb,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import {
  campuses,
  copy,
  culturalEvents,
  cultureLayers,
  cultureTipSubmissionUrl,
  studentCultureTips,
} from "../data/content.js";

const emptyTip = { category: "daily", name: "", tip: "" };

export function CulturePage({ locale, campusId }) {
  const [tipForm, setTipForm] = useState(emptyTip);
  const [formError, setFormError] = useState("");
  const page = copy[locale].culture;
  const campus = campuses[campusId];
  const events = culturalEvents.filter((event) => event.campus === campusId);

  const submitTip = (event) => {
    event.preventDefault();
    const tip = tipForm.tip.trim();
    if (tip.length < 20) {
      setFormError(locale === "zh" ? "请至少写 20 个字，把场景和建议说明清楚。" : "Please give at least 20 characters of context and advice.");
      return;
    }

    setFormError("");
    const title = locale === "zh" ? "[学生 Tip] 文化与生活经验" : "[Student tip] Culture and local life";
    const body = locale === "zh"
      ? `校区：${campus.name.zh}\n类别：${tipForm.category}\n署名（可留空）：${tipForm.name.trim() || "匿名"}\n\n经验内容：\n${tip}\n\n我确认这段内容不包含他人隐私、广告或未经证实的安全/签证/法律结论。`
      : `Campus: ${campus.name.en}\nCategory: ${tipForm.category}\nDisplay name (optional): ${tipForm.name.trim() || "Anonymous"}\n\nTip:\n${tip}\n\nI confirm this contains no private information, advertising or unverified safety, visa or legal claims.`;
    const url = `${cultureTipSubmissionUrl}?${new URLSearchParams({ title, body }).toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <PageIntro
        eyebrow={`${page.eyebrow} · ${campus.name[locale]}`}
        title={page.title}
        intro={page.intro}
        image={campus.cultureImage.src}
        source={campus.cultureImage.source}
        sourceLabel={copy[locale].source}
        alt={`${campus.name[locale]} · ${campus.traditionalName}`}
      />

      <section className="culture-layers page-section" aria-labelledby="culture-layers-heading">
        <div className="section-heading">
          <div>
            <span className="study-kicker">CULTURE STARTER</span>
            <h2 id="culture-layers-heading">{page.layersTitle}</h2>
          </div>
          <p>{locale === "zh" ? "不是教你模仿某种“澳洲人设”，而是帮助你看懂常见情境、尊重文化边界并找到参与入口。" : "The goal is not to imitate a stereotype, but to read common situations, respect cultural boundaries and know how to participate."}</p>
        </div>

        <div className="culture-layer-grid">
          {cultureLayers.map((layer, index) => (
            <article key={layer.id}>
              <header>
                <span>0{index + 1}</span>
                <div>
                  <small>{layer.eyebrow[locale]}</small>
                  <h3>{layer.title[locale]}</h3>
                </div>
              </header>
              <ul>
                {layer.points[locale].map((point) => <li key={point}>{point}</li>)}
              </ul>
              <div className="culture-source-links">
                {layer.links.map((link) => (
                  <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>
                    {link.label[locale]}<ArrowSquareOut size={15} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="culture-events page-section" aria-labelledby="culture-events-heading">
        <div className="culture-events-heading">
          <div>
            <span className="study-kicker">{campus.name[locale]} · ANNUAL RHYTHM</span>
            <h2 id="culture-events-heading">{page.eventsTitle}</h2>
          </div>
          <a href={campusId === "cairns" ? "https://www.cairns.qld.gov.au/experience-cairns/events/annual-events" : "https://whatson.townsville.qld.gov.au/"} target="_blank" rel="noreferrer">
            <CalendarDots size={19} weight="fill" aria-hidden="true" />
            {locale === "zh" ? "查看官方实时活动日历" : "Open the official live calendar"}
            <ArrowSquareOut size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="culture-event-grid">
          {events.map((item) => (
            <a href={item.url} target="_blank" rel="noreferrer" key={item.id}>
              <div className="event-card-date">
                <CalendarDots size={22} weight="duotone" aria-hidden="true" />
                <span>{item.month[locale]}</span>
              </div>
              <h3>{typeof item.title === "string" ? item.title : item.title[locale]}</h3>
              <strong>{item.type[locale]}</strong>
              <p>{item.description[locale]}</p>
              <div>
                <span>{item.access[locale]}</span>
                <ArrowSquareOut size={17} aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>
        <p className="integrity-note">{locale === "zh" ? "月份用于理解年度节奏，不是永久日历。天气、场地、票价和日期可能变化，出发前必须回到活动官方页面确认。" : "Months describe the annual rhythm, not a permanent calendar. Weather, venue, price and dates can change; confirm on the official event page before travelling."}</p>
      </section>

      <section className="culture-tips page-section" aria-labelledby="culture-tips-heading">
        <div className="section-heading">
          <div>
            <span className="study-kicker">STUDENT-TO-STUDENT</span>
            <h2 id="culture-tips-heading">{page.tipsTitle}</h2>
          </div>
          <p>{locale === "zh" ? "首批内容由 Tropic Loop 按真实高频场景整理；后续逐条加入经过核实的学长学姐投稿。" : "The first set is curated around common situations; verified student submissions can be added over time."}</p>
        </div>

        <div className="student-tip-grid">
          {studentCultureTips.map((tip) => (
            <article key={tip.id}>
              <div>
                <Lightbulb size={22} weight="duotone" aria-hidden="true" />
                <span>{tip.category[locale]}</span>
              </div>
              <h3>{tip.title[locale]}</h3>
              <p>{tip.detail[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="culture-contribute page-section" aria-labelledby="culture-contribute-heading">
        <div className="contribute-copy">
          <Compass size={34} weight="duotone" aria-hidden="true" />
          <span className="study-kicker">COMMUNITY CONTRIBUTION</span>
          <h2 id="culture-contribute-heading">{page.contributeTitle}</h2>
          <p>{locale === "zh" ? "写下“什么场景、踩过什么坑、下一位同学该怎么做”。提交后会打开 Tropic Loop 的公开 GitHub Issue，由作者核实来源、隐私和时效后再发布。" : "Explain the situation, what went wrong and what the next student should do. Submission opens a public Tropic Loop GitHub issue for privacy, accuracy and freshness review before publication."}</p>
          <small>{locale === "zh" ? "当前需要 GitHub 账号；不会自动出现在网站，也不接受商业软文。" : "A GitHub account is currently required. Tips are not auto-published and promotional posts are not accepted."}</small>
        </div>

        <form className="culture-tip-form" onSubmit={submitTip}>
          <label>
            <span>{locale === "zh" ? "类别" : "Category"}</span>
            <select value={tipForm.category} onChange={(event) => setTipForm({ ...tipForm, category: event.target.value })}>
              <option value="daily">{locale === "zh" ? "日常与交流" : "Daily life & communication"}</option>
              <option value="study">{locale === "zh" ? "课堂与校园" : "Study & campus"}</option>
              <option value="event">{locale === "zh" ? "活动与文化" : "Events & culture"}</option>
              <option value="cairns">Cairns</option>
              <option value="townsville">Townsville</option>
            </select>
          </label>
          <label>
            <span>{locale === "zh" ? "展示名（可留空）" : "Display name (optional)"}</span>
            <input value={tipForm.name} maxLength={40} onChange={(event) => setTipForm({ ...tipForm, name: event.target.value })} placeholder={locale === "zh" ? "匿名 / 姓名 / 届别" : "Anonymous / name / cohort"} />
          </label>
          <label>
            <span>{locale === "zh" ? "你的 Tip" : "Your tip"}</span>
            <textarea value={tipForm.tip} maxLength={800} rows={6} onChange={(event) => setTipForm({ ...tipForm, tip: event.target.value })} placeholder={locale === "zh" ? "例如：第一次参加 Cairns Show 前，应该提前确认什么……" : "For example: before attending Cairns Show for the first time, check…"} />
          </label>
          {formError && <p className="culture-form-error" role="alert">{formError}</p>}
          <button type="submit">
            <PaperPlaneTilt size={18} weight="fill" aria-hidden="true" />
            {locale === "zh" ? "提交给作者审核" : "Send for review"}
          </button>
          <p><ChatCircleText size={16} aria-hidden="true" />{locale === "zh" ? "请不要填写手机号、住址、学生证或他人隐私。" : "Do not include phone numbers, addresses, student IDs or another person's private information."}</p>
        </form>
      </section>
    </>
  );
}
