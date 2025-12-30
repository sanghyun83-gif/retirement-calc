"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, DollarSign, Info, TrendingUp } from "lucide-react";
import {
    SITE,
    RETIREMENT_CONSTANTS,
    calculateSocialSecurity,
    formatCurrency,
    parseFormattedNumber,
    SocialSecurityResult
} from "../site-config";

export default function SocialSecurityPage() {
    const { socialSecurity } = RETIREMENT_CONSTANTS;
    const [monthlyEarnings, setMonthlyEarnings] = useState("5,000");
    const [claimingAge, setClaimingAge] = useState(67);
    const [result, setResult] = useState<SocialSecurityResult | null>(null);

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value.replace(/[^0-9]/g, "");
            if (raw === "") { setter(""); return; }
            setter(parseInt(raw).toLocaleString("en-US"));
        };

    const handleCalculate = () => {
        const earnings = parseFormattedNumber(monthlyEarnings) || 5000;
        setResult(calculateSocialSecurity(earnings, claimingAge));
    };

    const ageOptions = [62, 63, 64, 65, 66, 67, 68, 69, 70];

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="text-slate-400 hover:text-emerald-600">
                        <ArrowLeft className="w-7 h-7" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-emerald-600" />
                        <span className="text-xl font-bold text-slate-800">Social Security Estimator</span>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">
                        Estimate Your Social Security Benefits
                    </h1>
                    <p className="text-lg text-slate-500 mb-8">
                        See how much you could receive based on when you claim
                    </p>

                    <div className="space-y-6 mb-8">
                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-2">
                                Your Average Monthly Earnings
                            </label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl">$</span>
                                <input type="text" value={monthlyEarnings} onChange={handleInputChange(setMonthlyEarnings)}
                                    className="w-full pl-10 pr-5 py-4 text-xl border-2 border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500" />
                            </div>
                            <p className="text-base text-slate-500 mt-2">
                                Average of your highest 35 years of earnings (monthly)
                            </p>
                        </div>

                        <div>
                            <label className="block text-lg font-semibold text-slate-700 mb-3">
                                When Do You Plan to Claim?
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {ageOptions.map((age) => (
                                    <button
                                        key={age}
                                        onClick={() => setClaimingAge(age)}
                                        className={`py-4 rounded-xl font-bold text-lg transition-colors ${claimingAge === age
                                                ? 'bg-emerald-600 text-white'
                                                : age === 67
                                                    ? 'bg-amber-100 text-amber-800 border-2 border-amber-300'
                                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {age}
                                        {age === 67 && <span className="block text-xs font-normal">Full Age</span>}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button onClick={handleCalculate}
                        className="w-full py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xl flex items-center justify-center gap-3">
                        <DollarSign className="w-6 h-6" />
                        Calculate Benefits
                    </button>
                </div>

                {result && (
                    <div className="mt-8 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 text-center">
                            <p className="text-xl text-blue-100 mb-2">Estimated Monthly Benefit at Age {result.claimingAge}</p>
                            <p className="text-5xl font-bold">{formatCurrency(result.monthlyBenefit)}</p>
                            <p className="text-lg text-blue-200 mt-2">per month</p>
                        </div>

                        <div className="p-8">
                            <div className="space-y-4 text-lg">
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span>Monthly Benefit</span>
                                    <span className="font-bold text-blue-600">{formatCurrency(result.monthlyBenefit)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span>Annual Benefit</span>
                                    <span className="font-medium">{formatCurrency(result.annualBenefit)}</span>
                                </div>
                                <div className="flex justify-between py-3 border-b border-slate-100">
                                    <span>Lifetime Benefit (est.)</span>
                                    <span className="font-medium">{formatCurrency(result.lifetimeBenefit)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Recommendation */}
                        <div className={`p-6 border-t ${result.claimingAge < 70 ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50 border-emerald-200'}`}>
                            <div className="flex items-start gap-3">
                                <TrendingUp className={`w-6 h-6 mt-1 ${result.claimingAge < 70 ? 'text-amber-600' : 'text-emerald-600'}`} />
                                <div>
                                    <h4 className={`text-lg font-bold mb-1 ${result.claimingAge < 70 ? 'text-amber-800' : 'text-emerald-800'}`}>
                                        {result.claimingAge < 70 ? 'Tip: You Could Get More' : 'Great Choice!'}
                                    </h4>
                                    <p className={`text-base ${result.claimingAge < 70 ? 'text-amber-700' : 'text-emerald-700'}`}>
                                        {result.recommendation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Comparison Table */}
                <div className="mt-8 bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">
                        {SITE.year} Maximum Social Security Benefits
                    </h3>
                    <div className="space-y-3">
                        <div className="flex justify-between py-3 border-b border-slate-100 text-lg">
                            <span>At Age 62 (earliest)</span>
                            <span className="font-medium text-red-500">{formatCurrency(socialSecurity.maxBenefit62)}/mo</span>
                        </div>
                        <div className="flex justify-between py-3 border-b border-slate-100 text-lg">
                            <span>At Age 67 (full retirement)</span>
                            <span className="font-medium text-amber-600">{formatCurrency(socialSecurity.maxBenefit67)}/mo</span>
                        </div>
                        <div className="flex justify-between py-3 text-lg">
                            <span>At Age 70 (maximum)</span>
                            <span className="font-bold text-emerald-600">{formatCurrency(socialSecurity.maxBenefit70)}/mo</span>
                        </div>
                    </div>
                </div>

                <div className="my-8 p-6 bg-white border border-slate-200 rounded-xl text-center">
                    <p className="text-base text-slate-400">Advertisement</p>
                </div>
            </main>
        </div>
    );
}
