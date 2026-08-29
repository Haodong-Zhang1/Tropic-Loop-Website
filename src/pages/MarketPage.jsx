import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Flag,
  HandCoins,
  ImageSquare,
  MapPin,
  Package,
  Plus,
  ShieldCheck,
  Storefront,
  UploadSimple,
  X,
} from "@phosphor-icons/react";
import { PageIntro } from "../components/PageIntro.jsx";
import {
  campuses,
  communityRules,
  copy,
} from "../data/content.js";
import {
  claimCommunityPost,
  communityErrorMessage,
  createCommunityPost,
  listCommunityPosts,
  reportCommunityItem,
} from "../lib/communityApi.js";

const emptyForm = {
  title: "",
  description: "",
  category: "Study item",
  store: "",
  amount: "",
  contact: "",
  image: "",
};

const localize = (value, locale) => typeof value === "string" ? value : value?.[locale] ?? "";

export function MarketPage({ locale, campusId }) {
  const [mode, setMode] = useState("secondhand");
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [syncMode, setSyncMode] = useState("loading");
  const text = copy[locale];
  const page = text.market;
  const campus = campuses[campusId];

  const visiblePosts = useMemo(
    () => posts.filter((post) => post.type === mode && post.campus === campusId),
    [campusId, mode, posts],
  );

  useEffect(() => {
    let active = true;
    setLoading(true);
    listCommunityPosts(campusId, mode).then((result) => {
      if (!active) return;
      setPosts(result.items);
      setSyncMode(result.mode);
      setLoading(false);
    });
    return () => { active = false; };
  }, [campusId, mode]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const handleImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!new Set(["image/jpeg", "image/png", "image/webp"]).has(file.type)) {
      setMessage(locale === "zh" ? "请选择 JPEG、PNG 或 WebP 图片。" : "Please choose a JPEG, PNG or WebP image.");
      return;
    }
    if (file.size > communityRules.maxImageBytes) {
      setMessage(locale === "zh" ? "图片请控制在 1.2 MB 以内。" : "Please keep the image under 1.2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateField("image", reader.result);
    reader.readAsDataURL(file);
  };

  const submitPost = async (event) => {
    event.preventDefault();
    const amount = Number(form.amount);
    const minimum = mode === "errand" ? communityRules.minCommissionAud : 0;
    if (!form.title.trim() || !form.description.trim() || !Number.isFinite(amount) || amount < minimum) {
      setMessage(
        locale === "zh"
          ? `请填写标题、描述和有效金额${mode === "errand" ? "；佣金最低 1 AUD" : ""}。`
          : `Add a title, description and valid amount${mode === "errand" ? "; commission starts at AUD 1" : ""}.`,
      );
      return;
    }
    setSubmitting(true);
    try {
      const result = await createCommunityPost({
        type: mode,
        campus: campusId,
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category,
        store: form.store.trim() || campus.name[locale],
        amount,
        contact: form.contact.trim(),
        image: form.image,
      });
      setPosts((items) => [result.item, ...items]);
      setSyncMode(result.mode);
      setForm(emptyForm);
      setFormOpen(false);
      setMessage(
        result.mode === "shared"
          ? (locale === "zh" ? "发布成功，其他同学现在就能看到。" : "Published — other students can see it now.")
          : (locale === "zh" ? "已立即显示；当前预览只保存在这台设备。" : "Shown instantly; this preview is stored on this device."),
      );
    } catch (error) {
      setMessage(communityErrorMessage(error, locale));
    } finally {
      setSubmitting(false);
    }
  };

  const claimErrand = async (postId) => {
    try {
      const result = await claimCommunityPost(postId);
      setPosts((items) => items.map((post) => post.id === postId ? { ...post, status: "claimed" } : post));
      setSyncMode(result.mode);
      setMessage(locale === "zh" ? "已标记为有人顺手带。" : "Marked as claimed.");
    } catch (error) {
      setMessage(communityErrorMessage(error, locale));
    }
  };

  const reportPost = async (postId) => {
    try {
      await reportCommunityItem("post", postId);
      setMessage(locale === "zh" ? "已收到举报，谢谢你帮助维护社区。" : "Report received. Thanks for helping keep the community useful.");
    } catch (error) {
      setMessage(communityErrorMessage(error, locale));
    }
  };

  return (
    <>
      <PageIntro
        eyebrow={`${page.eyebrow} · ${campus.name[locale]}`}
        title={page.title}
        intro={page.intro}
        image={campus.lifeImage.src}
        source={campus.lifeImage.source}
        sourceLabel={text.source}
        alt={`${campus.name[locale]} · ${campus.traditionalName}`}
      />

      <section className="community-section page-section" aria-labelledby="community-heading">
        <div className="community-toolbar">
          <div>
            <p className="eyebrow">{campus.traditionalName}</p>
            <h2 id="community-heading">{page.sectionTitle}</h2>
          </div>
          <div className="community-actions">
            <div className="community-tabs" role="tablist" aria-label={page.sectionTitle}>
              <button type="button" role="tab" aria-selected={mode === "secondhand"} className={mode === "secondhand" ? "active" : ""} onClick={() => setMode("secondhand")}>
                <Package size={18} />{page.secondhand}
              </button>
              <button type="button" role="tab" aria-selected={mode === "errand"} className={mode === "errand" ? "active" : ""} onClick={() => setMode("errand")}>
                <HandCoins size={18} />{page.errand}
              </button>
            </div>
            <button className="primary-action" type="button" onClick={() => setFormOpen((value) => !value)}>
              {formOpen ? <X size={18} /> : <Plus size={18} />}
              {formOpen ? (locale === "zh" ? "收起" : "Close") : (locale === "zh" ? "发布" : "Post")}
            </button>
          </div>
        </div>

        <div className="local-demo-note">
          <ShieldCheck size={20} />
          <p>
            <strong>{syncMode === "shared" ? (locale === "zh" ? "提交后立即公开" : "Published immediately") : (locale === "zh" ? "本地预览模式" : "Local preview mode")}</strong>
            <span>{syncMode === "shared"
              ? (locale === "zh" ? "无需人工审核；发布后会直接显示，异常内容可由社区举报。" : "No manual review: posts appear immediately and problematic content can be reported.")
              : (locale === "zh" ? "当前预览会立即显示，但只保存在这台设备；共享服务上线后自动切换为跨设备公开。" : "Preview posts appear immediately but stay on this device. The shared service will switch on when published.")}</span>
          </p>
        </div>

        {formOpen && (
          <form className="community-form" onSubmit={submitPost}>
            <div className="form-heading">
              <div className="form-icon">{mode === "secondhand" ? <Package size={24} /> : <HandCoins size={24} />}</div>
              <div>
                <span>{mode === "secondhand" ? page.secondhand : page.errand}</span>
                <h3>{locale === "zh" ? "把关键信息一次写清楚" : "Make the essential details clear"}</h3>
              </div>
            </div>
            <div className="form-grid">
              <label className="field-span-2">
                <span>{locale === "zh" ? "标题" : "Title"}</span>
                <input required maxLength="70" value={form.title} onChange={(event) => updateField("title", event.target.value)} placeholder={mode === "secondhand" ? (locale === "zh" ? "例如：九成新电饭煲" : "e.g. Rice cooker in good condition") : (locale === "zh" ? "例如：顺路带一袋面包" : "e.g. Bring one loaf of bread")} />
              </label>
              <label className="field-span-2">
                <span>{locale === "zh" ? "联系或交接方式（可选，会公开显示）" : "Contact or handover method (optional, shown publicly)"}</span>
                <input maxLength="80" value={form.contact} onChange={(event) => updateField("contact", event.target.value)} placeholder={locale === "zh" ? "例如：站内约定后在图书馆门口交接" : "e.g. Arrange pickup outside the library"} />
              </label>
              {mode === "secondhand" ? (
                <label>
                  <span>{locale === "zh" ? "类别" : "Category"}</span>
                  <select value={form.category} onChange={(event) => updateField("category", event.target.value)}>
                    <option value="Study item">{locale === "zh" ? "学习用品" : "Study item"}</option>
                    <option value="Electronics">{locale === "zh" ? "电子产品" : "Electronics"}</option>
                    <option value="Furniture">{locale === "zh" ? "家具家居" : "Furniture"}</option>
                    <option value="Other">{locale === "zh" ? "其他" : "Other"}</option>
                  </select>
                </label>
              ) : (
                <label>
                  <span>{locale === "zh" ? "商店或地点" : "Store or place"}</span>
                  <input value={form.store} onChange={(event) => updateField("store", event.target.value)} placeholder="Smithfield / Stockland" />
                </label>
              )}
              <label>
                <span>{mode === "secondhand" ? (locale === "zh" ? "售价 AUD" : "Price AUD") : (locale === "zh" ? "佣金 AUD（最低 1）" : "Commission AUD (min 1)")}</span>
                <input required type="number" min={mode === "errand" ? communityRules.minCommissionAud : 0} step="0.5" value={form.amount} onChange={(event) => updateField("amount", event.target.value)} placeholder={mode === "errand" ? "1" : "20"} />
              </label>
              <label className="field-span-2">
                <span>{locale === "zh" ? "简单描述" : "Short description"}</span>
                <textarea required maxLength="240" rows="4" value={form.description} onChange={(event) => updateField("description", event.target.value)} placeholder={mode === "secondhand" ? (locale === "zh" ? "物品状态、包含配件、建议交接地点" : "Condition, included accessories and suggested handover") : (locale === "zh" ? "具体商品、数量、交接时间；商品费用如何结算" : "Exact item, quantity, handover time and item-cost reimbursement")} />
              </label>
              {mode === "secondhand" && (
                <label className="image-upload field-span-2">
                  <span>{locale === "zh" ? "上传一张图片（可选，≤ 1.2 MB）" : "Upload one image (optional, ≤ 1.2 MB)"}</span>
                  <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImage} />
                  <span className="upload-control"><UploadSimple size={18} />{form.image ? (locale === "zh" ? "图片已选择" : "Image selected") : (locale === "zh" ? "选择图片" : "Choose image")}</span>
                </label>
              )}
            </div>
            <div className="form-footer">
              <p>{locale === "zh" ? "请勿发布违禁品、药品、烟酒或需要专业资质的服务。平台不代收款。" : "Do not list prohibited goods, medicines, alcohol, tobacco or regulated services. The platform does not hold payments."}</p>
              <button className="primary-action" type="submit" disabled={submitting}>{submitting ? (locale === "zh" ? "正在发布…" : "Publishing…") : (locale === "zh" ? "立即发布" : "Publish now")}<ArrowRight size={18} /></button>
            </div>
          </form>
        )}

        <p className="community-message" aria-live="polite">{message}</p>

        <div className="community-grid" role="tabpanel">
          {loading && (
            <div className="empty-community community-loading" aria-live="polite">
              <span className="loading-pulse" />
              <h3>{locale === "zh" ? "正在读取社区内容" : "Loading community posts"}</h3>
            </div>
          )}
          {!loading && visiblePosts.length === 0 && (
            <div className="empty-community">
              <ImageSquare size={30} />
              <h3>{locale === "zh" ? "这个校区暂时没有帖子" : "No posts for this campus yet"}</h3>
              <p>{locale === "zh" ? "你可以发布第一条，试用完整流程。" : "Post the first one to try the full flow."}</p>
            </div>
          )}
          {visiblePosts.map((post) => (
            <article className="community-card" key={post.id}>
              <div className={`community-card-media${post.image ? " has-image" : ""}`}>
                {post.image ? <img src={post.image} alt={localize(post.title, locale)} /> : (post.type === "secondhand" ? <Package size={42} weight="light" /> : <Storefront size={42} weight="light" />)}
                {post.sample && <span>{locale === "zh" ? "示例" : "Sample"}</span>}
              </div>
              <div className="community-card-copy">
                <div className="community-card-meta">
                  <span><MapPin size={14} />{campus.name[locale]}</span>
                  <strong>{post.type === "secondhand" ? `AUD ${post.price}` : `+ AUD ${post.commission}`}</strong>
                </div>
                <h3>{localize(post.title, locale)}</h3>
                <p>{localize(post.description, locale)}</p>
                <div className="community-card-footer">
                  <span>{post.contact || (post.type === "secondhand" ? localize(post.category, locale) : post.store)}</span>
                  <div>
                    <button className="report-button" type="button" onClick={() => reportPost(post.id)}><Flag size={15} />{locale === "zh" ? "举报" : "Report"}</button>
                    {post.type === "errand" && (
                      <button type="button" disabled={post.status === "claimed"} onClick={() => claimErrand(post.id)}>
                        {post.status === "claimed" ? <CheckCircle size={17} /> : <HandCoins size={17} />}
                        {post.status === "claimed" ? (locale === "zh" ? "已有人顺手带" : "Claimed") : (locale === "zh" ? "我可以顺手带" : "I can bring it")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="community-safety">
          <ShieldCheck size={24} />
          <div>
            <h3>{locale === "zh" ? "线下交易的三个底线" : "Three rules for in-person exchanges"}</h3>
            <p>{locale === "zh" ? "优先在校园公共区域交接；付款前检查物品；顺手带任务用小票确认商品成本，佣金与商品费分开说清。" : "Meet in a public campus area, inspect before paying, and use a receipt to separate item cost from the errand commission."}</p>
          </div>
        </div>
      </section>
    </>
  );
}
