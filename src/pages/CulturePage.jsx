import { useEffect, useMemo, useState } from "react";
import {
  ArrowSquareOut,
  CalendarDots,
  ChatCircleText,
  Compass,
  Eye,
  Flag,
  Lightbulb,
  PaperPlaneTilt,
  Sparkle,
} from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import {
  campuses,
  copy,
  culturalEvents,
  cultureLayers,
  studentCultureTips,
} from "../data/content.js";
import {
  communityErrorMessage,
  createCultureTip,
  listCultureTips,
  markCultureTipViewed,
  reportCommunityItem,
} from "../lib/communityApi.js";

const emptyTip = { category: "daily", name: "", tip: "" };
const popularTipMinimumViews = 5;
const tipCategoryLabels = {
  daily: { zh: "日常与交流", en: "Daily life & communication" },
  study: { zh: "课堂与校园", en: "Study & campus" },
  event: { zh: "活动与文化", en: "Events & culture" },
  cairns: { zh: "凯恩斯", en: "Cairns" },
  townsville: { zh: "汤斯维尔", en: "Townsville" },
};

export function CulturePage({ locale, campusId }) {
  const [tipForm, setTipForm] = useState(emptyTip);
  const [formError, setFormError] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [communityTips, setCommunityTips] = useState([]);
  const [syncMode, setSyncMode] = useState("loading");
  const page = copy[locale].culture;
  const campus = campuses[campusId];
  const events = culturalEvents.filter((event) => event.campus === campusId);

  useEffect(() => {
    let active = true;
    setSyncMode("loading");
    listCultureTips(campusId).then((result) => {
      if (!active) return;
      setCommunityTips(result.items);
      setSyncMode(result.mode);
    });
    return () => { active = false; };
  }, [campusId]);

  const popularTips = useMemo(
    () => [...communityTips].filter((tip) => Number(tip.views) >= popularTipMinimumViews).sort((a, b) => Number(b.views) - Number(a.views)).slice(0, 3),
    [communityTips],
  );

  const submitTip = async (event) => {
    event.preventDefault();
    const tip = tipForm.tip.trim();
    if (tip.length < 20) {
      setFormError(locale === "zh" ? "请至少写 20 个字，把场景和建议说明清楚。" : "Please give at least 20 characters of context and advice.");
      return;
    }

    setFormError("");
    setFormMessage("");
    setSubmitting(true);
    try {
      const result = await createCultureTip({
        campus: campusId,
        category: tipForm.category,
        name: tipForm.name.trim() || (locale === "zh" ? "匿名同学" : "Anonymous student"),
        tip,
      });
      setCommunityTips((items) => [result.item, ...items]);
      setSyncMode(result.mode);
      setTipForm(emptyTip);
      setFormMessage(
        result.mode === "shared"
          ? (locale === "zh" ? "已发布，其他同学现在就能看到。" : "Published — other students can see it now.")
          : (locale === "zh" ? "已立即显示；当前预览仅保存在这台设备。" : "Shown instantly; this preview is stored on this device."),
      );
    } catch (error) {
      setFormError(communityErrorMessage(error, locale));
    } finally {
      setSubmitting(false);
    }
  };

  const openTip = async (tipId) => {
    try {
      const result = await markCultureTipViewed(tipId);
      setCommunityTips((items) => items.map((tip) => tip.id === tipId ? { ...tip, views: result.views } : tip));
    } catch (error) {
      setFormError(communityErrorMessage(error, locale));
    }
  };

  const reportTip = async (tipId) => {
    try {
      await reportCommunityItem("tip", tipId);
      setFormMessage(locale === "zh" ? "已收到举报，谢谢你帮助维护社区。" : "Report received. Thanks for helping keep the community useful.");
    } catch (error) {
      setFormError(communityErrorMessage(error, locale));
    }
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
          <p>{locale === "zh" ? "编辑整理与同学投稿放在一起。每位访客的有效浏览会计入热度；达到 5 次后，Tip 会在气泡区浮现。" : "Editorial and student tips sit together. Valid visitor views build popularity; a Tip floats into the bubble area after five views."}</p>
        </div>

        <div className={`tip-bubble-stage${popularTips.length ? " has-popular-tips" : ""}`}>
          <div className="tip-bubble-heading">
            <span><Sparkle size={18} weight="fill" />{locale === "zh" ? "正在浮现" : "Bubbling up"}</span>
            <small>{locale === "zh" ? "5 次有效浏览后自动浮现" : "Appears after five valid views"}</small>
          </div>
          {popularTips.length ? (
            <div className="tip-bubble-field">
              {popularTips.map((tip, index) => (
                <button
                  type="button"
                  className="popular-tip-bubble"
                  style={{ "--bubble-index": index }}
                  key={tip.id}
                  onClick={() => openTip(tip.id)}
                >
                  <strong>{tip.tip}</strong>
                  <span><Eye size={14} />{tip.views}</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="tip-bubble-empty">{locale === "zh" ? "投稿达到 5 次有效浏览后，热门内容会像气泡一样轻轻浮现。" : "After five valid views, popular contributions will float up here like bubbles."}</p>
          )}
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
          {communityTips.map((tip) => (
            <article className="community-tip-card" key={tip.id}>
              <button type="button" className="tip-open-button" onClick={() => openTip(tip.id)}>
                <span className="tip-card-meta">
                  <span>{tip.name || (locale === "zh" ? "匿名同学" : "Anonymous student")}</span>
                  <span><Eye size={14} />{tip.views}</span>
                </span>
                <h3>{tip.tip}</h3>
                <p>{campus.name[locale]} · {tipCategoryLabels[tip.category]?.[locale] || tip.category}</p>
              </button>
              <button type="button" className="tip-report-button" onClick={() => reportTip(tip.id)}>
                <Flag size={14} />{locale === "zh" ? "举报" : "Report"}
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="culture-contribute page-section" aria-labelledby="culture-contribute-heading">
        <div className="contribute-copy">
          <Compass size={34} weight="duotone" aria-hidden="true" />
          <span className="study-kicker">COMMUNITY CONTRIBUTION</span>
          <h2 id="culture-contribute-heading">{page.contributeTitle}</h2>
          <p>{locale === "zh" ? "写下“什么场景、踩过什么坑、下一位同学该怎么做”。无需 GitHub 账号或人工审核，提交成功后立即显示。" : "Explain the situation, what went wrong and what the next student should do. No GitHub account or manual review is required; successful submissions appear immediately."}</p>
          <small>{locale === "zh" ? "请不要公开隐私、广告或未经证实的安全、签证和法律结论；异常内容可以举报。" : "Do not post private information, advertising or unverified safety, visa or legal claims. Problematic content can be reported."}</small>
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
          <button type="submit" disabled={submitting}>
            <PaperPlaneTilt size={18} weight="fill" aria-hidden="true" />
            {submitting ? (locale === "zh" ? "正在发布…" : "Publishing…") : (locale === "zh" ? "立即发布" : "Publish now")}
          </button>
          {formMessage && <p className="culture-form-success" role="status">{formMessage}</p>}
          <p><ChatCircleText size={16} aria-hidden="true" />{locale === "zh" ? "请不要填写手机号、住址、学生证或他人隐私。" : "Do not include phone numbers, addresses, student IDs or another person's private information."}</p>
          <span className={`community-sync-state ${syncMode}`}>
            {syncMode === "shared"
              ? (locale === "zh" ? "已连接共享社区" : "Connected to the shared community")
              : (locale === "zh" ? "本地预览模式" : "Local preview mode")}
          </span>
        </form>
      </section>
    </>
  );
}
