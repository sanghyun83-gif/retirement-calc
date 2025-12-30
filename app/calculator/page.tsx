"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, PiggyBank, Info, HelpCircle } from "lucide-react";
import {
    SITE,
    RETIREMENT_CONSTANTS,
    calculateRetirement,
    formatCurrency,
    parseFormattedNumber,
    RetirementResult
} from "../site-config";

export default function RetirementCalculatorPage() {
    const { defaults } = RETIREMENT_CONSTANTS;
    const [currentAge, setCurrentAge] = useState(defaults.currentAge.toString());
    const [retirementAge, setRetirementAge] = useState(defaults.retirementAge.toString());
    const [currentSavings, setCurrentSavings] = useState("250,000");
    const [monthlyContribution, setMonthlyContribution] = useState("1,000");
    const [expectedReturn, setExpectedReturn] = useState(defaults.expectedReturn.toString());
    const [result, setResult] = useState<RetirementResult | null>(null);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            if (raw === "") { setter(""); return; }
            setter(parseInt(raw).toLocaleString("en-US"));
        };

    const handleCalculate = () => {
        const age = parseInt(currentAge) || defaults.currentAge;
        const retAge = parseInt(retirementAge) || defaults.retirementAge;
        const savings = parseFormattedNumber(currentSavings);
        const monthly = parseFormattedNumber(monthlyContribution);
        const returns = parseFloat(expectedReturn) || defaults.expectedReturn;
        setResult(calculateRetirement(age, retAge, savings, monthly, returns));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-emerald-600 transition-colors">
                        <ArrowLeft className="w-7 h-7" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-emerald-600" />
                        <span className="text-xl font-bold text-slate-800">Retirement Calculator</span>
                    </div>
                    <span className="ml-auto text-sm text-white bg-emerald-600 px-3 py-1 rounded-full font-bold">
                        {SITE.year}
                    </span>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                {/* Calculator Card */}
                <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                        How Much Will I Have When I Retire?
                    </h1>
                    <p className="text-lg text-slate-500 mb-8">
                        Enter your information below to see your projected retirement savings.
                    </p>

                    {/* Inputs - Large and Clear */}
                    <div className="space-y-6 mb-8">
                        {/* Current Age */}
                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-2">
                                Your Current Age
                            </label>
                            <input
                                type="number"
                                value={currentAge}
                                onChange={(e) => setCurrentAge(e.target.value)}
                                placeholder="55"
                                className="w-full px-5 py-4 text-xl bg-white border-2 border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>

                        {/* Retirement Age */}
                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-2">
                                Age You Want to Retire
                            </label>
                            <input
                                type="number"
                                value={retirementAge}
                                onChange={(e) => setRetirementAge(e.target.value)}
                                placeholder="67"
                                className="w-full px-5 py-4 text-xl bg-white border-2 border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <p className="text-base text-slate-500 mt-2 flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Full Social Security age is 67 for most people
                            </p>
                        </div>

                        {/* Current Savings */}
                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-2">
                                How Much Have You Already Saved?
                            </label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-bold">$</span>
                                <input
                                    type="text"
                                    value={currentSavings}
                                    onChange={handleInputChange(setCurrentSavings)}
                                    placeholder="250,000"
                                    className="w-full pl-10 pr-5 py-4 text-xl bg-white border-2 border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                            <p className="text-base text-slate-500 mt-2">
                                Include all retirement accounts: 401(k), IRA, etc.
                            </p>
                        </div>

                        {/* Monthly Contribution */}
                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-2">
                                How Much Will You Save Each Month?
                            </label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl font-bold">$</span>
                                <input
                                    type="text"
                                    value={monthlyContribution}
                                    onChange={handleInputChange(setMonthlyContribution)}
                                    placeholder="1,000"
                                    className="w-full pl-10 pr-5 py-4 text-xl bg-white border-2 border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                />
                            </div>
                            <p className="text-base text-slate-500 mt-2">
                                Financial advisors recommend saving 15% of your income
                            </p>
                        </div>

                        {/* Expected Return */}
                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-2">
                                Expected Annual Return (%)
                            </label>
                            <input
                                type="number"
                                step="0.5"
                                value={expectedReturn}
                                onChange={(e) => setExpectedReturn(e.target.value)}
                                placeholder="7"
                                className="w-full px-5 py-4 text-xl bg-white border-2 border-slate-300 rounded-xl text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            />
                            <p className="text-base text-slate-500 mt-2 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4" />
                                Historical stock market average is around 7% after inflation
                            </p>
                        </div>
                    </div>

                    {/* Calculate Button - Big */}
                    <button
                        onClick={handleCalculate}
                        className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xl transition-colors flex items-center justify-center gap-3 shadow-md"
                    >
                        <Calculator className="w-6 h-6" />
                        Calculate My Retirement
                    </button>
                </div>

                {/* Results */}
                {result && (
                    <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        {/* Main Result - Big and Clear */}
                        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-8 text-center">
                            <p className="text-xl text-emerald-100 mb-2">At Age {result.retirementAge}, You Could Have</p>
                            <p className="text-5xl md:text-6xl font-bold">{formatCurrency(result.projectedBalance)}</p>
                        </div>

                        {/* Monthly Income - What It Means */}
                        <div className="p-8 bg-amber-50 border-b border-amber-200">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">
                                What Does This Mean For You?
                            </h3>
                            <p className="text-lg text-slate-600 mb-4">
                                Using the 4% Rule, you could safely withdraw:
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-xl p-4 text-center border border-amber-300">
                                    <p className="text-base text-slate-500">Monthly Income</p>
                                    <p className="text-3xl font-bold text-amber-600">{formatCurrency(result.monthlyRetirementIncome)}</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 text-center border border-amber-300">
                                    <p className="text-base text-slate-500">Yearly Income</p>
                                    <p className="text-3xl font-bold text-amber-600">{formatCurrency(result.annualRetirementIncome)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Breakdown */}
                        <div className="p-8">
                            <h3 className="text-lg font-semibold text-slate-500 uppercase tracking-wider mb-4">
                                How You&apos;ll Get There
                            </h3>

                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-slate-600">Years Until Retirement</span>
                                    <span className="font-bold text-slate-800">{result.yearsToRetirement} years</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-slate-600">Starting Savings</span>
                                    <span className="font-bold text-slate-800">{formatCurrency(result.currentSavings)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-slate-600">Your Contributions</span>
                                    <span className="font-bold text-emerald-600">+{formatCurrency(result.totalContributions)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span className="text-slate-600">Investment Growth</span>
                                    <span className="font-bold text-emerald-600">
                                        +{formatCurrency(result.projectedBalance - result.currentSavings - result.totalContributions)}
                                    </span>
                                </div>
                                <div className="flex justify-between py-3 bg-emerald-50 rounded-lg px-4">
                                    <span className="text-slate-800 font-semibold">Total at Retirement</span>
                                    <span className="font-bold text-emerald-700">{formatCurrency(result.projectedBalance)}</span>
                                </div>
                            </div>
                        </div>

                        {/* 4% Rule Explanation */}
                        <div className="p-6 bg-blue-50 border-t border-blue-200">
                            <div className="flex items-start gap-3">
                                <Info className="w-6 h-6 text-blue-600 mt-1" />
                                <div>
                                    <h4 className="text-lg font-bold text-blue-800 mb-1">About the 4% Rule</h4>
                                    <p className="text-base text-blue-700">
                                        {RETIREMENT_CONSTANTS.explanations.fourPercentRule}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Ad Placeholder */}
                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center shadow-sm">
                    <p className="text-base text-slate-400">Advertisement</p>
                </div>

                {/* Links to Other Calculators */}
                <div className="grid grid-cols-2 gap-4">
                    <Link href="/401k" className="bg-white border border-slate-200 rounded-lg p-5 text-center hover:border-emerald-500 transition-colors">
                        <p className="text-lg font-medium text-slate-600">401(k) Calculator →</p>
                    </Link>
                    <Link href="/social-security" className="bg-white border border-slate-200 rounded-lg p-5 text-center hover:border-emerald-500 transition-colors">
                        <p className="text-lg font-medium text-slate-600">Social Security →</p>
                    </Link>
                </div>
            </main>
        </div>
    );
}
