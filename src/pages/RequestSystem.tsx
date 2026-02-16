import { FormEvent, useMemo, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";

const industryOptions = [
  "Retail shop",
  "Phone repair",
  "Pharmacy",
  "Restaurant",
  "Hardware store",
  "Other",
] as const;

const modeOptions = ["Offline-only", "Online-only", "Hybrid (offline + online sync)"] as const;
const timelineOptions = ["ASAP", "2-4 weeks", "1-2 months"] as const;

const moduleOptions = [
  "POS",
  "Inventory",
  "Receipts",
  "Expenses",
  "Reports",
  "Profit & Loss analytics",
  "Barcode scanning",
] as const;

type RequestFormState = {
  fullName: string;
  businessName: string;
  businessEmail: string;
  phone: string;
  industry: string;
  mode: string;
  devicesCount: string;
  branchesCount: string;
  timeline: string;
  budgetRange: string;
  modules: string[];
};

const initialState: RequestFormState = {
  fullName: "",
  businessName: "",
  businessEmail: "",
  phone: "",
  industry: "",
  mode: "",
  devicesCount: "1",
  branchesCount: "1",
  timeline: "",
  budgetRange: "",
  modules: [],
};

const RequestSystem = () => {
  const [formState, setFormState] = useState<RequestFormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [moduleError, setModuleError] = useState("");

  const summary = useMemo(() => {
    const selectedModules =
      formState.modules.length > 0 ? formState.modules.join(", ") : "None selected";

    return [
      "System Request",
      "",
      "Business details",
      `Full name: ${formState.fullName}`,
      `Business name: ${formState.businessName}`,
      `Business email: ${formState.businessEmail}`,
      `Phone / WhatsApp: ${formState.phone}`,
      "",
      "System configuration",
      `Industry: ${formState.industry}`,
      `Mode: ${formState.mode}`,
      `Devices/computers count: ${formState.devicesCount}`,
      `Branches count: ${formState.branchesCount}`,
      `Modules: ${selectedModules}`,
      `Timeline: ${formState.timeline}`,
      `Budget range: ${formState.budgetRange || "Not provided"}`,
    ].join("\n");
  }, [formState]);

  const handleModuleToggle = (module: string, checked: boolean) => {
    setFormState((prev) => {
      const modules = checked
        ? prev.modules.includes(module)
          ? prev.modules
          : [...prev.modules, module]
        : prev.modules.filter((item) => item !== module);

      return { ...prev, modules };
    });
    setModuleError("");
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formState.modules.length === 0) {
      setModuleError("Select at least one module.");
      return;
    }

    const mailtoUrl = `mailto:nitiance@gmail.com?subject=${encodeURIComponent(
      "System Request",
    )}&body=${encodeURIComponent(summary)}`;
    const whatsappUrl = `https://wa.me/263782750867?text=${encodeURIComponent(summary)}`;

    setSubmitted(true);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 120);
  };

  return (
    <div>
      <section className="bg-[#0B0F14] text-[#F7F3EE] border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-24">
          <p className="text-xs uppercase tracking-wide text-[#F7F3EE]/50 mb-4">Lead Capture</p>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Request a System</h1>
          <p className="mt-5 text-sm md:text-base text-[#F7F3EE]/75 max-w-2xl leading-relaxed">
            Configure what your business needs. Submission sends the request to email and WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-[#F7F3EE]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-20">
          <form onSubmit={onSubmit} className="rounded-xl border border-[#D8CEC2] bg-white/80 p-6 md:p-8 shadow-[0_12px_30px_rgba(11,31,59,0.08)]">
            <div className="grid md:grid-cols-2 gap-5 md:gap-6">
              <div>
                <label htmlFor="full-name" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                  Full name
                </label>
                <input
                  id="full-name"
                  required
                  value={formState.fullName}
                  onChange={(event) => setFormState((prev) => ({ ...prev, fullName: event.target.value }))}
                  className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                />
              </div>

              <div>
                <label htmlFor="business-name" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                  Business name
                </label>
                <input
                  id="business-name"
                  required
                  value={formState.businessName}
                  onChange={(event) => setFormState((prev) => ({ ...prev, businessName: event.target.value }))}
                  className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                />
              </div>

              <div>
                <label htmlFor="business-email" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                  Business email
                </label>
                <input
                  id="business-email"
                  type="email"
                  required
                  value={formState.businessEmail}
                  onChange={(event) => setFormState((prev) => ({ ...prev, businessEmail: event.target.value }))}
                  className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                  Phone / WhatsApp number
                </label>
                <input
                  id="phone"
                  required
                  value={formState.phone}
                  onChange={(event) => setFormState((prev) => ({ ...prev, phone: event.target.value }))}
                  className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                />
              </div>

              <div>
                <label htmlFor="industry" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                  Industry
                </label>
                <select
                  id="industry"
                  required
                  value={formState.industry}
                  onChange={(event) => setFormState((prev) => ({ ...prev, industry: event.target.value }))}
                  className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                >
                  <option value="" disabled>
                    Select an industry
                  </option>
                  {industryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mode" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                  Mode
                </label>
                <select
                  id="mode"
                  required
                  value={formState.mode}
                  onChange={(event) => setFormState((prev) => ({ ...prev, mode: event.target.value }))}
                  className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                >
                  <option value="" disabled>
                    Select a mode
                  </option>
                  {modeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="devices-count" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                  Devices/computers count
                </label>
                <input
                  id="devices-count"
                  type="number"
                  required
                  min={1}
                  value={formState.devicesCount}
                  onChange={(event) => setFormState((prev) => ({ ...prev, devicesCount: event.target.value }))}
                  className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                />
              </div>

              <div>
                <label htmlFor="branches-count" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                  Branches count
                </label>
                <input
                  id="branches-count"
                  type="number"
                  required
                  min={1}
                  value={formState.branchesCount}
                  onChange={(event) => setFormState((prev) => ({ ...prev, branchesCount: event.target.value }))}
                  className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-[#2B3440]/70 mb-3">Needed modules</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {moduleOptions.map((module) => (
                  <label
                    key={module}
                    className="flex items-center gap-2 rounded-lg border border-[#D8CEC2] bg-white px-3 py-2 text-sm text-[#0B0F14]"
                  >
                    <input
                      type="checkbox"
                      checked={formState.modules.includes(module)}
                      onChange={(event) => handleModuleToggle(module, event.target.checked)}
                      className="accent-[#0B1F3B]"
                    />
                    {module}
                  </label>
                ))}
              </div>
              {moduleError && <p className="text-xs text-[#3B0D0D] mt-2">{moduleError}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6 mt-6">
              <div>
                <label htmlFor="timeline" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                  Timeline
                </label>
                <select
                  id="timeline"
                  required
                  value={formState.timeline}
                  onChange={(event) => setFormState((prev) => ({ ...prev, timeline: event.target.value }))}
                  className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                >
                  <option value="" disabled>
                    Select timeline
                  </option>
                  {timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="budget" className="block text-xs uppercase tracking-wide text-[#2B3440]/70 mb-2">
                  Budget range (optional)
                </label>
                <input
                  id="budget"
                  value={formState.budgetRange}
                  onChange={(event) => setFormState((prev) => ({ ...prev, budgetRange: event.target.value }))}
                  placeholder="e.g. $2,000 - $5,000"
                  className="w-full rounded-lg border border-[#CFC3B5] bg-white px-3 py-2 text-sm text-[#0B0F14] placeholder:text-[#2B3440]/45 focus:outline-none focus:ring-2 focus:ring-[#0B1F3B]"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0B1F3B] text-[#F7F3EE] text-sm font-medium px-4 py-2.5 hover:bg-[#0B1F3B]/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Submit Request
              </button>
              <a
                href="https://wa.me/263782750867?text=Hi%20Nitiance%2C%20I%20want%20to%20request%20a%20system."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#0F2A1D]/30 bg-white text-[#0F2A1D] text-sm font-medium px-4 py-2.5 hover:bg-[#F3EEE5] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Direct
              </a>
            </div>

            {submitted && (
              <p className="mt-4 text-sm text-[#0F2A1D] font-medium">Sent. We'll reply shortly.</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};

export default RequestSystem;
