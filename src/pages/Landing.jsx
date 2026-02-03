import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Briefcase,
  Receipt,
  FileText,
  ClipboardList,
  ShieldCheck,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  HardHat,
  Building2,
  Wallet,
  Clock,
  TrendingUp,
  Quote,
  Star,
} from 'lucide-react';

/* ── scroll-reveal hook ── */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll('.fade-up');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── data ── */
const features = [
  { icon: Briefcase, title: 'Contract Management', description: 'Track multiple contracts with budgets, milestones, and real-time progress all in one place.', color: 'bg-blue-50 text-blue-600', ring: 'ring-blue-100' },
  { icon: Receipt, title: 'Expense Tracking', description: 'Record every shilling per contract. Categorize by labor, materials, equipment, and more.', color: 'bg-emerald-50 text-emerald-600', ring: 'ring-emerald-100' },
  { icon: ShieldCheck, title: 'eTIMS Integration', description: 'Generate KRA-compliant invoices with eTIMS verification codes and QR codes built in.', color: 'bg-purple-50 text-purple-600', ring: 'ring-purple-100', featured: true },
  { icon: ClipboardList, title: 'LPO Generation', description: 'Create branded Local Purchase Orders for suppliers with automatic VAT calculations.', color: 'bg-amber-50 text-amber-600', ring: 'ring-amber-100' },
  { icon: BarChart3, title: 'Financial Dashboard', description: 'See budget vs actual spend, expense breakdowns, and contract health at a glance.', color: 'bg-rose-50 text-rose-600', ring: 'ring-rose-100' },
  { icon: FileText, title: 'Document Hub', description: 'Organize contracts, drawings, permits, and invoices per project in one central place.', color: 'bg-cyan-50 text-cyan-600', ring: 'ring-cyan-100' },
];

const stats = [
  { value: 'KES 7.7M', label: 'Total Budget Tracked', icon: Wallet },
  { value: '3', label: 'Active Contracts', icon: Building2 },
  { value: '20+', label: 'Expenses Recorded', icon: Receipt },
  { value: '92%', label: 'eTIMS Compliance', icon: ShieldCheck },
];

const painPoints = [
  'Tracking expenses across multiple contracts in spreadsheets',
  'Generating eTIMS-compliant invoices manually',
  'No clear view of budget health per project',
  'Creating LPOs by hand for every supplier order',
  'Scattered documents across emails and folders',
];

const steps = [
  { step: '01', title: 'Set Up Your Contracts', desc: 'Add your active contracts with budgets, timelines, and milestones. Everything organized by project.', icon: Briefcase },
  { step: '02', title: 'Track Every Expense', desc: 'Record expenses as they happen. Tag by category, supplier, and payment method. Mark eTIMS status instantly.', icon: Receipt },
  { step: '03', title: 'Generate Documents', desc: 'Create eTIMS invoices and LPOs in seconds. Professional, compliant, and ready to send.', icon: FileText },
];

/* ── mini dashboard mockup ── */
function DashboardMockup() {
  return (
    <div className="mockup-glow rounded-xl bg-white border border-slate-200 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-slate-700 rounded px-12 py-1 text-[10px] text-slate-400 font-mono">buildtrackpro.app/dashboard</div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 bg-slate-50">
        {/* Stat row */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { label: 'Active', val: '3', col: 'text-blue-600 bg-blue-50' },
            { label: 'Budget', val: '7.7M', col: 'text-emerald-600 bg-emerald-50' },
            { label: 'Spent', val: '4.9M', col: 'text-amber-600 bg-amber-50' },
            { label: 'Health', val: 'OK', col: 'text-emerald-600 bg-emerald-50' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-lg border border-slate-200 p-2.5">
              <div className={`text-[10px] font-medium text-slate-400`}>{s.label}</div>
              <div className={`text-sm font-extrabold ${s.col.split(' ')[0]}`}>{s.val}</div>
            </div>
          ))}
        </div>
        {/* Fake table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-700">Contract Overview</span>
            <span className="text-[9px] text-blue-600 font-medium">View All</span>
          </div>
          {[
            { name: 'Westlands Office Block', pct: 68, status: 'On Track', color: 'bg-blue-500', badge: 'text-emerald-700 bg-emerald-50' },
            { name: 'Karen Residential Villa', pct: 75, status: 'Over Budget', color: 'bg-red-500', badge: 'text-red-700 bg-red-50' },
            { name: 'Warehouse \u2013 Mombasa Rd', pct: 45, status: 'On Track', color: 'bg-blue-500', badge: 'text-emerald-700 bg-emerald-50' },
          ].map((r) => (
            <div key={r.name} className="px-3 py-2 flex items-center gap-3 border-b border-slate-50 last:border-0">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-slate-800 truncate">{r.name}</p>
                <div className="mt-1 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                </div>
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${r.badge}`}>{r.status}</span>
            </div>
          ))}
        </div>
        {/* Fake chart placeholder */}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="bg-white rounded-lg border border-slate-200 p-3">
            <span className="text-[10px] font-bold text-slate-700">Expense Breakdown</span>
            <div className="flex items-end gap-1 mt-2 h-12">
              {[40, 28, 18, 10, 8].map((h, i) => (
                <div key={i} className="flex-1 rounded-t" style={{ height: `${h * 1.2}px`, backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'][i] }} />
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-3">
            <span className="text-[10px] font-bold text-slate-700">Budget vs Actual</span>
            <div className="flex items-end gap-2 mt-2 h-12 px-1">
              {[
                { budget: 38, spent: 28 },
                { budget: 18, spent: 14 },
                { budget: 48, spent: 32 },
              ].map((d, i) => (
                <div key={i} className="flex-1 flex gap-0.5 items-end">
                  <div className="flex-1 rounded-t bg-blue-500" style={{ height: `${d.budget}px` }} />
                  <div className="flex-1 rounded-t bg-amber-400" style={{ height: `${d.spent}px` }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── page ── */
export default function Landing() {
  const pageRef = useReveal();

  return (
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* ━━ Navigation ━━ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <HardHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary">BuildTrack Pro</span>
          </div>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors shadow-sm"
          >
            Open Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* ━━ Hero ━━ */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-amber-50/30" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <div>
              <div className="fade-up inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-6">
                <HardHat className="w-4 h-4" />
                Built for Kenyan Construction Managers
              </div>

              <h1 className="fade-up fade-up-delay-1 text-5xl sm:text-[3.5rem] font-extrabold text-text-primary leading-[1.1] tracking-tight">
                Stop managing contracts
                <span className="block text-primary mt-2">in spreadsheets.</span>
              </h1>

              <p className="fade-up fade-up-delay-2 text-xl text-text-secondary mt-6 leading-relaxed max-w-xl">
                BuildTrack Pro gives you per-contract expense tracking, eTIMS-compliant invoicing,
                and a clear financial dashboard&mdash;so you can focus on building, not bookkeeping.
              </p>

              <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row gap-4 mt-10">
                <Link
                  to="/dashboard"
                  className="cta-pulse inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white text-base font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Explore the Live Demo <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-text-primary text-base font-semibold rounded-xl border-2 border-slate-200 hover:border-primary/30 hover:bg-slate-50 transition-all"
                >
                  See What It Does <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right: dashboard mockup */}
            <div className="fade-up fade-up-delay-3 hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-amber-500/10 rounded-2xl blur-2xl" />
                <div className="relative">
                  <DashboardMockup />
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map(({ value, label, icon: Icon }, i) => (
              <div
                key={label}
                className={`fade-up fade-up-delay-${i + 1} bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-text-primary">{value}</p>
                    <p className="text-xs text-text-muted font-medium">{label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Pain Points ━━ */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="fade-up text-amber-400 text-sm font-bold uppercase tracking-wider mb-3">The Problem</p>
              <h2 className="fade-up fade-up-delay-1 text-3xl sm:text-4xl font-extrabold leading-tight">
                Managing construction projects with Excel is costing you time and money.
              </h2>
              <p className="fade-up fade-up-delay-2 text-slate-400 mt-4 text-lg leading-relaxed">
                Every construction manager knows the pain. Multiple contracts, dozens of suppliers,
                KRA compliance deadlines&mdash;and everything living in scattered spreadsheets.
              </p>
            </div>
            <div className="space-y-3">
              {painPoints.map((point, i) => (
                <div
                  key={point}
                  className={`fade-up fade-up-delay-${i + 1} flex items-start gap-3 bg-white/5 rounded-lg px-5 py-4 border border-white/10 hover:bg-white/10 transition-colors`}
                >
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-slate-300 text-[15px]">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━ Features ━━ */}
      <section id="features" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="fade-up text-primary text-sm font-bold uppercase tracking-wider mb-3">Features</p>
            <h2 className="fade-up fade-up-delay-1 text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight">
              Everything you need to run your contracts professionally.
            </h2>
            <p className="fade-up fade-up-delay-2 text-text-secondary mt-4 text-lg">
              Purpose-built for Kenyan construction businesses managing multiple concurrent projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, color, ring, featured }, i) => (
              <div
                key={title}
                className={`fade-up fade-up-delay-${(i % 3) + 1} bg-white rounded-xl border p-6 hover:shadow-lg transition-all group ${featured ? 'border-primary/30 ring-2 ring-primary/10 shadow-md' : 'border-slate-200 hover:border-primary/20'}`}
              >
                {featured && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
                    <Star className="w-3 h-3" /> Key Feature
                  </div>
                )}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} ring-4 ${ring} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ How It Works ━━ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="fade-up text-primary text-sm font-bold uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="fade-up fade-up-delay-1 text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight">
              From chaos to clarity in three steps.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc, icon: Icon }, i) => (
              <div key={step} className={`fade-up fade-up-delay-${i + 1} relative ${i < steps.length - 1 ? 'step-connector' : ''}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="text-5xl font-black text-primary/10">{step}</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Testimonial ━━ */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="fade-up bg-white rounded-2xl border border-slate-200 shadow-lg p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <blockquote className="text-xl sm:text-2xl font-semibold text-text-primary leading-relaxed">
                I used to spend hours every week updating Excel sheets for three contracts, chasing receipts,
                and formatting invoices for KRA compliance. BuildTrack Pro puts everything in one place&mdash;I
                can see exactly where every shilling went, per project, in seconds.
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  N
                </div>
                <div>
                  <p className="font-bold text-text-primary">Njuguna</p>
                  <p className="text-sm text-text-secondary">Director, Njuguna Construction Ltd &middot; Nairobi</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ CTA ━━ */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="fade-up text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Ready to take control of your construction contracts?
          </h2>
          <p className="fade-up fade-up-delay-1 text-blue-100 mt-4 text-lg leading-relaxed">
            See how BuildTrack Pro handles real contract data from active Nairobi construction projects.
            No sign-up required&mdash;explore the full demo now.
          </p>
          <div className="fade-up fade-up-delay-2 flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/dashboard"
              className="cta-pulse inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-primary text-lg font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Launch the Demo <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="fade-up fade-up-delay-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-blue-100 text-sm">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 3 live contracts</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 20+ real expenses</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> eTIMS invoices</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> No sign-up needed</span>
          </div>
        </div>
      </section>

      {/* ━━ Footer ━━ */}
      <footer className="py-8 px-6 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <HardHat className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold">BuildTrack Pro</span>
          </div>
          <p className="text-sm">Built for Njuguna Construction Ltd &mdash; Demo Application</p>
        </div>
      </footer>
    </div>
  );
}
