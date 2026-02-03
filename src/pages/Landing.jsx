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
} from 'lucide-react';

const features = [
  {
    icon: Briefcase,
    title: 'Contract Management',
    description: 'Track multiple contracts with budgets, milestones, and real-time progress all in one place.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Receipt,
    title: 'Expense Tracking',
    description: 'Record every shilling per contract. Categorize by labor, materials, equipment, and more.',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: ShieldCheck,
    title: 'eTIMS Integration',
    description: 'Generate KRA-compliant invoices with eTIMS verification codes and QR codes built in.',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: ClipboardList,
    title: 'LPO Generation',
    description: 'Create branded Local Purchase Orders for suppliers with automatic VAT calculations.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: BarChart3,
    title: 'Financial Dashboard',
    description: 'See budget vs actual spend, expense breakdowns, and contract health at a glance.',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    icon: FileText,
    title: 'Document Hub',
    description: 'Organize contracts, drawings, permits, and invoices per project in one central place.',
    color: 'bg-cyan-50 text-cyan-600',
  },
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

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/40 to-amber-50/30" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              <HardHat className="w-4 h-4" />
              Built for Kenyan Construction Managers
            </div>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-text-primary leading-tight tracking-tight">
              Stop managing contracts
              <span className="block text-primary mt-1">in spreadsheets.</span>
            </h1>

            <p className="text-xl text-text-secondary mt-6 leading-relaxed max-w-2xl">
              BuildTrack Pro gives you per-contract expense tracking, eTIMS-compliant invoicing,
              and a clear financial dashboard -- so you can focus on building, not bookkeeping.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white text-base font-bold rounded-xl hover:bg-primary-hover transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
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

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm"
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

      {/* Pain Points Section */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-amber-400 text-sm font-bold uppercase tracking-wider mb-3">The Problem</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Managing construction projects with Excel is costing you time and money.
              </h2>
              <p className="text-slate-400 mt-4 text-lg leading-relaxed">
                Every construction manager knows the pain. Multiple contracts, dozens of suppliers,
                KRA compliance deadlines -- and everything living in scattered spreadsheets.
              </p>
            </div>
            <div className="space-y-3">
              {painPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 bg-white/5 rounded-lg px-5 py-4 border border-white/10"
                >
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-slate-300 text-[15px]">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight">
              Everything you need to run your contracts professionally.
            </h2>
            <p className="text-text-secondary mt-4 text-lg">
              Purpose-built for Kenyan construction businesses managing multiple concurrent projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary text-sm font-bold uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary leading-tight">
              From chaos to clarity in three steps.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Set Up Your Contracts',
                desc: 'Add your active contracts with budgets, timelines, and milestones. Everything organized by project.',
              },
              {
                step: '02',
                title: 'Track Every Expense',
                desc: 'Record expenses as they happen. Tag by category, supplier, and payment method. Mark eTIMS status instantly.',
              },
              {
                step: '03',
                title: 'Generate Documents',
                desc: 'Create eTIMS invoices and LPOs in seconds. Professional, compliant, and ready to send.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="text-6xl font-black text-primary/10 mb-2">{step}</div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IGZpbGw9InVybCgjZykiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=')] opacity-50" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Ready to take control of your construction contracts?
          </h2>
          <p className="text-blue-100 mt-4 text-lg leading-relaxed">
            See how BuildTrack Pro handles real contract data from active Nairobi construction projects.
            No sign-up required -- explore the full demo now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary text-base font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Launch the Demo <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-8 text-blue-100 text-sm">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 3 live contracts</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 20+ real expenses</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> eTIMS invoices</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> No sign-up needed</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-900 text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <HardHat className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold">BuildTrack Pro</span>
          </div>
          <p className="text-sm">Built for Njuguna Construction Ltd -- Demo Application</p>
        </div>
      </footer>
    </div>
  );
}
