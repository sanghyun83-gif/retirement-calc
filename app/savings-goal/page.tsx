"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Target, CheckCircle, AlertCircle } from "lucide-react";
import {
    SITE,
    RETIREMENT_CONSTANTS,
    calculateSavingsGoal,
    formatCurrency,
    parseFormattedNumber,
    SavingsGoalResult
} from "../site-config";

export default function SavingsGoalPage() {
    const { defaults } = RETIREMENT_CONSTANTS;
    const [targetAmount, setTargetAmount] = useState("1,000,000");
    const [currentSavings, setCurrentSavings] = useState("250,000");
    const [currentAge, setCurrentAge] = useState("55");
    const [retirementAge, setRetirementAge] = useState("67");
    const [result, setResult] = useState<SavingsGoalResult | null>(null);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            if (raw === "") { setter(""); return; }
            setter(parseInt(raw).toLocaleString("en-US"));
        };

    const handleCalculate = () => {
        const target = parseFormattedNumber(targetAmount) || 1000000;
        const savings = parseFormattedNumber(currentSavings) || 0;
        const age = parseInt(currentAge) || 55;
        const retAge = parseInt(retirementAge) || 67;
        setResult(calculateSavingsGoal(target, savings, age, retAge));
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-emerald-600">
                        <ArrowLeft className="w-7 h-7" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <Target className="w-6 h-6 text-emerald-600" />
                        <span className="text-xl font-bold text-slate-800">Savings Goal Calculator</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                        How Much Should I Save Each Month?
                    </h1>
                    <p className="text-lg text-slate-500 mb-8">
                        Find out how much you need to save to reach your retirement goal
                    </p>

                    <div className="space-y-6 mb-8">
                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-2">
                                Your Retirement Goal
                            </label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">$</span>
                                <input type="text" value={targetAmount} onChange={handleInputChange(setTargetAmount)}
                                    className="w-full pl-10 pr-5 py-4 text-xl border-2 border-emerald-400 rounded-xl bg-emerald-50 focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <p className="text-base text-slate-500 mt-2">
                                How much do you want to have when you retire?
                            </p>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-2">
                                How Much Have You Already Saved?
                            </label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">$</span>
                                <input type="text" value={currentSavings} onChange={handleInputChange(setCurrentSavings)}
                                    className="w-full pl-10 pr-5 py-4 text-xl border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                            </div>
                        </div>

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
                    </div>

                    <button onClick={handleCalculate}
                        className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xl flex items-center justify-center gap-3">
                        <Target className="w-6 h-6" />
                        Calculate Monthly Savings
                    </button>
                </div>

                {result && (
                    <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className={`p-8 text-center text-white ${result.isAchievable ? 'bg-gradient-to-r from-emerald-600 to-emerald-700' : 'bg-gradient-to-r from-amber-500 to-amber-600'}`}>
                            <p className="text-xl text-white/80 mb-2">To Reach {formatCurrency(result.targetAmount)}, Save</p>
                            <p className="text-5xl font-bold">{formatCurrency(result.monthlyNeeded)}</p>
                            <p className="text-xl text-white/80 mt-2">per month</p>
                        </div>

                        {/* Status */}
                        <div className={`p-6 border-b ${result.isAchievable ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                            <div className="flex items-center gap-3">
                                {result.isAchievable ? (
                                    <>
                                        <CheckCircle className="w-6 h-6 text-emerald-600" />
                                        <span className="text-lg font-bold text-emerald-800">This goal is achievable!</span>
                                    </>
                                ) : (
                                    <>
                                        <AlertCircle className="w-6 h-6 text-amber-600" />
                                        <span className="text-lg font-bold text-amber-800">This is a stretch goal - consider adjusting</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span>Years to Retirement</span>
                                    <span className="font-medium">{result.yearsToRetirement} years</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span>Starting Savings</span>
                                    <span className="font-medium">{formatCurrency(result.currentSavings)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span>Your Total Contributions</span>
                                    <span className="font-medium">{formatCurrency(result.totalContributions)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span>Investment Growth</span>
                                    <span className="font-medium text-emerald-600">+{formatCurrency(result.interestEarned)}</span>
                                </div>
                                <div className="flex justify-between py-3 bg-emerald-50 rounded-lg px-4">
                                    <span className="font-semibold">Goal Amount</span>
                                    <span className="font-bold text-emerald-700">{formatCurrency(result.targetAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center">
                    <p className="text-base text-slate-400">Advertisement</p>
                </div>

                <div className="text-center">
                    <Link href="/calculator" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold text-lg">
                        See Your Projected Savings →
                    </Link>
                </div>
            </main>
        </div>
    );
}
