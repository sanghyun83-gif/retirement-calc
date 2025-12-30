"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building, Info, Gift } from "lucide-react";
import {
    SITE,
    RETIREMENT_CONSTANTS,
    calculate401k,
    formatCurrency,
    parseFormattedNumber,
    Result401k
} from "../site-config";

export default function Page401k() {
    const { defaults, limits401k } = RETIREMENT_CONSTANTS;
    const [annualSalary, setAnnualSalary] = useState("80,000");
    const [contributionPercent, setContributionPercent] = useState("10");
    const [employerMatch, setEmployerMatch] = useState("50");
    const [employerMatchUpTo, setEmployerMatchUpTo] = useState("6");
    const [currentAge, setCurrentAge] = useState("55");
    const [retirementAge, setRetirementAge] = useState("67");
    const [currentBalance, setCurrentBalance] = useState("150,000");
    const [result, setResult] = useState<Result401k | null>(null);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            if (raw === "") { setter(""); return; }
            setter(parseInt(raw).toLocaleString("en-US"));
        };

    const handleCalculate = () => {
        const salary = parseFormattedNumber(annualSalary) || 80000;
        const contribPct = parseFloat(contributionPercent) || 10;
        const empMatch = parseFloat(employerMatch) || 50;
        const empUpTo = parseFloat(employerMatchUpTo) || 6;
        const age = parseInt(currentAge) || 55;
        const retAge = parseInt(retirementAge) || 67;
        const balance = parseFormattedNumber(currentBalance) || 0;
        setResult(calculate401k(salary, contribPct, empMatch, empUpTo, age, retAge, balance));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-emerald-600">
                        <ArrowLeft className="w-7 h-7" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Building className="w-6 h-6 text-emerald-600" />
                        <span className="text-xl font-bold text-slate-800">401(k) Calculator</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                        401(k) Growth Calculator
                    </h1>
                    <p className="text-lg text-slate-500 mb-8">
                        See how your 401(k) will grow with employer matching
                    </p>

                    <div className="space-y-6 mb-8">
                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-2">Your Annual Salary</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">$</span>
                                <input type="text" value={annualSalary} onChange={handleInputChange(setAnnualSalary)}
                                    className="w-full pl-10 pr-5 py-4 text-xl border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-2">
                                Your Contribution (% of salary)
                            </label>
                            <input type="number" value={contributionPercent} onChange={(e) => setContributionPercent(e.target.value)}
                                className="w-full px-5 py-4 text-xl border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                            <p className="text-base text-slate-500 mt-2">
                                {SITE.year} limit: {formatCurrency(limits401k.under50)} (or {formatCurrency(limits401k.total50Plus)} if 50+)
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-lg font-semibold text-slate-700 mb-2">Employer Match (%)</label>
                                <input type="number" value={employerMatch} onChange={(e) => setEmployerMatch(e.target.value)}
                                    className="w-full px-5 py-4 text-xl border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <div>
                                <label className="block text-lg font-semibold text-slate-700 mb-2">Up To (% of salary)</label>
                                <input type="number" value={employerMatchUpTo} onChange={(e) => setEmployerMatchUpTo(e.target.value)}
                                    className="w-full px-5 py-4 text-xl border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>
                        <p className="text-base text-slate-500 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Example: "50% match up to 6%" means your employer adds 50¢ for every $1 you contribute, up to 6% of your salary
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-lg font-semibold text-slate-700 mb-2">Current Age</label>
                                <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)}
                                    className="w-full px-5 py-4 text-xl border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <div>
                                <label className="block text-lg font-semibold text-slate-700 mb-2">Retirement Age</label>
                                <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)}
                                    className="w-full px-5 py-4 text-xl border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-2">Current 401(k) Balance</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">$</span>
                                <input type="text" value={currentBalance} onChange={handleInputChange(setCurrentBalance)}
                                    className="w-full pl-10 pr-5 py-4 text-xl border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>
                    </div>

                    <button onClick={handleCalculate}
                        className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xl flex items-center justify-center gap-3">
                        <Building className="w-6 h-6" />
                        Calculate 401(k) Growth
                    </button>
                </div>

                {result && (
                    <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-8 text-center">
                            <p className="text-xl text-emerald-100 mb-2">Your 401(k) at Retirement</p>
                            <p className="text-5xl font-bold">{formatCurrency(result.projectedBalance)}</p>
                        </div>

                        {/* Employer Match - FREE MONEY */}
                        {result.employerMatchAmount > 0 && (
                            <div className="p-6 bg-amber-50 border-b border-amber-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <Gift className="w-6 h-6 text-amber-600" />
                                    <span className="text-xl font-bold text-amber-800">Free Money from Your Employer!</span>
                                </div>
                                <p className="text-lg text-amber-700">
                                    Your employer contributes <strong>{formatCurrency(result.employerMatchAmount)}</strong> per year to your 401(k).
                                    That&apos;s {formatCurrency(result.employerMatchAmount * result.yearsToRetirement)} over {result.yearsToRetirement} years!
                                </p>
                            </div>
                        )}

                        <div className="p-8">
                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span>Your Annual Contribution</span>
                                    <span className="font-medium">{formatCurrency(result.annualContribution)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span>Employer Match</span>
                                    <span className="font-medium text-amber-600">+{formatCurrency(result.employerMatchAmount)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span>Total Annual Contribution</span>
                                    <span className="font-bold text-emerald-600">{formatCurrency(result.totalAnnualContribution)}</span>
                                </div>
                                <div className="flex justify-between py-3">
                                    <span>Years to Retirement</span>
                                    <span className="font-medium">{result.yearsToRetirement} years</span>
                                </div>
                            </div>
                        </div>

                        {result.is50Plus && (
                            <div className="p-6 bg-blue-50 border-t border-blue-200">
                                <div className="flex items-start gap-3">
                                    <Info className="w-6 h-6 text-blue-600 mt-1" />
                                    <p className="text-base text-blue-800">
                                        <strong>You qualify for catch-up contributions!</strong> At 50+, you can contribute up to {formatCurrency(limits401k.total50Plus)} per year.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center">
                    <p className="text-base text-slate-400">Advertisement</p>
                </div>
            </main>
        </div>
    );
}
