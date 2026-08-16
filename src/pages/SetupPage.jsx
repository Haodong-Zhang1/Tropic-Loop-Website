import {
  ArrowUpRight,
  Bank,
  CheckCircle,
  DeviceMobile,
  IdentificationCard,
} from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import {
  bankAccounts,
  campuses,
  copy,
  mobilePlans,
  setupChecklist,
} from "../data/content.js";

const localize = (value, locale) => typeof value === "string" ? value : value[locale];

export function SetupPage({ locale, campusId }) {
  const text = copy[locale];
  const page = text.setup;
  const campus = campuses[campusId];

  return (
    <>
      <PageIntro
        eyebrow={`${page.eyebrow} · ${campus.name[locale]}`}
        title={page.title}
        intro={page.intro}
        image={campus.image.src}
        source={campus.image.source}
        sourceLabel={text.source}
        alt={`${campus.name[locale]} · ${campus.traditionalName}`}
      />

      <section className="setup-checklist page-section" aria-labelledby="setup-checklist-heading">
        <div className="section-heading split-heading">
          <h2 id="setup-checklist-heading">{page.checklistTitle}</h2>
          <p>{locale === "zh" ? "开户和激活通常都要进行实名核验。" : "Account opening and SIM activation generally require identity verification."}</p>
        </div>
        <div className="checklist-grid">
          {setupChecklist.map((item, index) => (
            <article key={item.id}>
              <span>0{index + 1}</span>
              <IdentificationCard size={23} />
              <h3>{item.title[locale]}</h3>
              <p>{item.detail[locale]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="comparison-section page-section" aria-labelledby="mobile-comparison-heading">
        <div className="comparison-heading">
          <div><DeviceMobile size={28} /><h2 id="mobile-comparison-heading">{page.mobileTitle}</h2></div>
          <p>{locale === "zh" ? "以下为常见入门档的长期价格或基础包含量；首月促销不作为主要排序依据。" : "Common entry plans are shown using ongoing price or base inclusions; first-month promotions are not the main comparison."}</p>
        </div>
        <div className="comparison-grid mobile-plan-grid">
          {mobilePlans.map((plan) => (
            <a key={plan.id} href={plan.url} target="_blank" rel="noreferrer" className="comparison-card">
              <div className="comparison-card-top"><span>{plan.provider}</span><ArrowUpRight size={18} /></div>
              <div className="price-line"><strong>{plan.price}</strong><span>/ {plan.period[locale]}</span></div>
              <h3>{localize(plan.data, locale)}</h3>
              <p className="comparison-meta">{plan.network[locale]}</p>
              <p>{plan.note[locale]}</p>
              <span className="official-link">{locale === "zh" ? "查看官方套餐" : "Open official plan"}<ArrowUpRight size={15} /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="comparison-section bank-section page-section" aria-labelledby="bank-comparison-heading">
        <div className="comparison-heading">
          <div><Bank size={28} /><h2 id="bank-comparison-heading">{page.bankTitle}</h2></div>
          <p>{locale === "zh" ? "这里比较日常交易账户，不是信用卡；免月费仍取决于年龄、学生身份或银行核验。" : "These are everyday transaction accounts, not credit cards; fee waivers still depend on age, student status or bank verification."}</p>
        </div>
        <div className="bank-list">
          {bankAccounts.map((bank) => (
            <a key={bank.id} href={bank.url} target="_blank" rel="noreferrer">
              <div className="bank-name"><span>{bank.provider}</span><strong>{bank.account}</strong></div>
              <div><CheckCircle size={18} weight="fill" /><strong>{bank.fee[locale]}</strong></div>
              <p>{bank.eligibility[locale]}</p>
              <ArrowUpRight size={18} />
            </a>
          ))}
        </div>
        <div className="accuracy-note">
          <strong>{locale === "zh" ? "更新时间：2026 年 8 月 15 日" : "Last checked: 15 August 2026"}</strong>
          <span>{locale === "zh" ? "费用、数据量与资格可能变化；办理前必须阅读官方条款。这不是金融建议。" : "Fees, data and eligibility can change; read the official terms before applying. This is not financial advice."}</span>
        </div>
      </section>
    </>
  );
}
