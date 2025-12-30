import Link from "next/link";
import { SITE, CALCULATORS, RETIREMENT_CONSTANTS, formatCurrency } from "./site-config";
import { ArrowRight, CheckCircle, PiggyBank, Info } from "lucide-react";

export default function HomePage() {
  const featuredCalculators = CALCULATORS.filter(c => c.featured);
  const otherCalculators = CALCULATORS.filter(c => !c.featured);
  const { limits401k, limitsIRA, socialSecurity } = RETIREMENT_CONSTANTS;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PiggyBank className="w-7 h-7 text-emerald-600" />
            <span className="text-xl font-bold text-slate-800">{SITE.name}</span>
          </div>
          <span className="text-sm text-white bg-emerald-600 px-4 py-2 rounded-full font-bold">
            FREE {SITE.year}
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-800 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/50 rounded-full px-4 py-2 mb-6">
            <CheckCircle className="w-5 h-5 text-emerald-300" />
            <span className="text-base text-emerald-200">{SITE.year} IRS Limits • Easy to Understand</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {SITE.year} Retirement
            <span className="block text-amber-400">Calculator</span>
          </h1>

          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Plan your retirement with confidence. Our free calculators help you understand
            how much you need to save and what you&apos;ll have when you retire.
          </p>

          <Link
            href="/calculator"
            className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-5 rounded-xl font-bold text-xl transition-all hover:scale-105 shadow-lg"
          >
            <PiggyBank className="w-6 h-6" />
            Start Planning
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* 2025 Limits - Easy to Read */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
            {SITE.year} Contribution Limits
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-emerald-50 rounded-xl border border-emerald-200">
              <p className="text-lg text-slate-600 mb-2">401(k) Limit</p>
              <p className="text-4xl font-bold text-emerald-700">{formatCurrency(limits401k.under50)}</p>
              <p className="text-base text-emerald-600 mt-2">+{formatCurrency(limits401k.catchUp)} if 50+</p>
            </div>
            <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200">
              <p className="text-lg text-slate-600 mb-2">IRA Limit</p>
              <p className="text-4xl font-bold text-amber-700">{formatCurrency(limitsIRA.under50)}</p>
              <p className="text-base text-amber-600 mt-2">+{formatCurrency(limitsIRA.catchUp)} if 50+</p>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-lg text-slate-600 mb-2">Max Social Security</p>
              <p className="text-4xl font-bold text-blue-700">{formatCurrency(socialSecurity.maxBenefit70)}</p>
              <p className="text-base text-blue-600 mt-2">per month at age 70</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Calculators - Big Cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          Free Retirement Tools
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featuredCalculators.map((calc) => {
            const IconComponent = calc.icon;
            return (
              <Link
                key={calc.id}
                href={`/${calc.id}`}
                className="group bg-white border-2 border-slate-200 rounded-xl p-8 hover:border-emerald-500 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col">
                  <div className="p-4 bg-emerald-100 rounded-xl w-fit group-hover:bg-emerald-600 transition-colors mb-5">
                    <IconComponent className="w-8 h-8 text-emerald-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors mb-2">
                    {calc.name}
                  </h3>
                  <p className="text-lg text-slate-500 mb-4">
                    {calc.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-emerald-600 text-lg font-bold group-hover:gap-3 transition-all mt-auto">
                    Open Calculator <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Other Tools */}
        {otherCalculators.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {otherCalculators.map((calc) => {
              const IconComponent = calc.icon;
              return (
                <Link
                  key={calc.id}
                  href={`/${calc.id}`}
                  className="group bg-white border border-slate-200 rounded-lg p-5 hover:border-emerald-500 transition-all flex items-center gap-4"
                >
                  <IconComponent className="w-6 h-6 text-slate-400 group-hover:text-emerald-600" />
                  <span className="text-lg text-slate-600 group-hover:text-emerald-600 font-medium">
                    {calc.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Helpful Explanations */}
      <section className="bg-emerald-50 border-y border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">
            Retirement Terms Explained
          </h2>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-emerald-200">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">The 4% Rule</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {RETIREMENT_CONSTANTS.explanations.fourPercentRule}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-emerald-200">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Employer 401(k) Match</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {RETIREMENT_CONSTANTS.explanations.employerMatch}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-emerald-200">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Catch-Up Contributions (50+)</h3>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {RETIREMENT_CONSTANTS.explanations.catchUpContribution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Planning Your Retirement Today
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            It takes less than 2 minutes to see your projected retirement savings.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-emerald-700 px-8 py-5 rounded-xl font-bold text-xl transition-colors"
          >
            <PiggyBank className="w-6 h-6" />
            Open Calculator
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <PiggyBank className="w-6 h-6 text-emerald-400" />
              <span className="text-lg font-semibold">{SITE.name}</span>
            </div>
            <p className="text-base text-slate-400 text-center">
              For informational purposes only. Consult a financial advisor for personalized advice.
            </p>
            <p className="text-base text-slate-500">
              © {SITE.year} {SITE.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
