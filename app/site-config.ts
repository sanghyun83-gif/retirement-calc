// ============================================
// RETIREMENT-CALC SITE CONFIGURATION
// 2025 Retirement Planning Calculator
// Senior-Friendly Design
// ============================================

import { Calculator, PiggyBank, Building, DollarSign, Target } from 'lucide-react';

// ============================================
// SITE METADATA
// ============================================
export const SITE = {
    name: "Retirement Calculator",
    tagline: "Free 2025 Retirement Planning Tools",
    description: "Plan your retirement with our free calculators. Estimate how much you need to save, 401k growth, Social Security benefits, and more. Easy to understand results.",
    year: 2025,
    baseUrl: "https://retirement-calc.vercel.app",
};

// ============================================
// 2025 RETIREMENT CONSTANTS (IRS LIMITS)
// ============================================
export const RETIREMENT_CONSTANTS = {
    // 2025 401(k) Limits
    limits401k: {
        under50: 23500,
        catchUp: 7500, // Age 50+
        total50Plus: 31000, // 23500 + 7500
    },

    // 2025 IRA Limits
    limitsIRA: {
        under50: 7000,
        catchUp: 1000, // Age 50+
        total50Plus: 8000,
    },

    // Social Security 2025
    socialSecurity: {
        maxBenefit62: 2831, // Claiming at 62
        maxBenefit67: 3822, // Full retirement age
        maxBenefit70: 4873, // Maximum at 70
        cola2025: 2.5, // Cost of living adjustment
        fullRetirementAge: 67, // For those born 1960+
    },

    // Default calculation assumptions
    defaults: {
        currentAge: 55,
        retirementAge: 67,
        currentSavings: 250000,
        monthlyContribution: 1000,
        expectedReturn: 7, // Stock market average
        inflationRate: 2.5,
        withdrawalRate: 4, // 4% Rule
        lifeExpectancy: 90,
    },

    // Employer match defaults
    employerMatch: {
        percentage: 50, // 50% match
        upTo: 6, // Up to 6% of salary
    },

    // Helpful explanations for seniors
    explanations: {
        fourPercentRule: "The 4% Rule means you can safely withdraw 4% of your savings each year in retirement. This strategy is designed to make your money last 30+ years.",
        compoundInterest: "Compound interest means your money earns interest on both your original savings AND on the interest you've already earned. It's like a snowball that grows bigger over time.",
        employerMatch: "If your employer offers a 401k match, they add extra money to your retirement account when you contribute. This is essentially FREE money - always try to get the full match!",
        catchUpContribution: "If you're 50 or older, the IRS allows you to save extra money in your 401k and IRA beyond the normal limits. This helps you boost your savings as you approach retirement.",
        socialSecurity: "Social Security provides monthly income after you retire. The amount depends on your work history and when you claim. Waiting until age 70 gives you the highest monthly payment.",
    }
};

// ============================================
// CALCULATOR DEFINITIONS
// ============================================
export const CALCULATORS = [
    {
        id: "calculator",
        name: "Retirement Savings Calculator",
        shortName: "Retirement",
        description: "How much will I have when I retire?",
        longDescription: "Calculate how much your retirement savings will grow over time. See your projected balance and monthly retirement income.",
        icon: Calculator,
        category: "retirement",
        keywords: ["retirement calculator", "retirement savings calculator", "how much do I need to retire"],
        featured: true,
    },
    {
        id: "401k",
        name: "401(k) Calculator",
        shortName: "401(k)",
        description: "Maximize your 401(k) growth with employer match",
        longDescription: "See how your 401k will grow with employer matching. Includes 2025 contribution limits.",
        icon: Building,
        category: "retirement",
        keywords: ["401k calculator", "401k growth calculator", "employer match calculator"],
        featured: true,
    },
    {
        id: "social-security",
        name: "Social Security Estimator",
        shortName: "Social Security",
        description: "Estimate your Social Security benefits",
        longDescription: "See how much you could receive from Social Security based on when you claim.",
        icon: DollarSign,
        category: "retirement",
        keywords: ["social security calculator", "social security estimator", "when to claim social security"],
        featured: true,
    },
    {
        id: "savings-goal",
        name: "Savings Goal Calculator",
        shortName: "Savings Goal",
        description: "How much should I save each month?",
        longDescription: "Find out how much you need to save each month to reach your retirement goal.",
        icon: Target,
        category: "retirement",
        keywords: ["retirement savings goal", "how much to save for retirement", "monthly savings calculator"],
        featured: false,
    },
] as const;

// ============================================
// RETIREMENT CALCULATION FUNCTIONS
// ============================================

export interface RetirementResult {
    currentAge: number;
    retirementAge: number;
    yearsToRetirement: number;
    currentSavings: number;
    monthlyContribution: number;
    totalContributions: number;
    projectedBalance: number;
    monthlyRetirementIncome: number;
    annualRetirementIncome: number;
    yearsOfRetirement: number;
}

export function calculateRetirement(
    currentAge: number,
    retirementAge: number,
    currentSavings: number,
    monthlyContribution: number,
    expectedReturn: number = RETIREMENT_CONSTANTS.defaults.expectedReturn,
    withdrawalRate: number = RETIREMENT_CONSTANTS.defaults.withdrawalRate
): RetirementResult {
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyReturn = expectedReturn / 100 / 12;

    // Future Value calculation (compound interest with monthly contributions)
    let projectedBalance = currentSavings;
    for (let i = 0; i < monthsToRetirement; i++) {
        projectedBalance = projectedBalance * (1 + monthlyReturn) + monthlyContribution;
    }
    projectedBalance = Math.round(projectedBalance);

    const totalContributions = monthlyContribution * monthsToRetirement;
    const annualRetirementIncome = Math.round(projectedBalance * (withdrawalRate / 100));
    const monthlyRetirementIncome = Math.round(annualRetirementIncome / 12);

    const yearsOfRetirement = RETIREMENT_CONSTANTS.defaults.lifeExpectancy - retirementAge;

    return {
        currentAge,
        retirementAge,
        yearsToRetirement,
        currentSavings,
        monthlyContribution,
        totalContributions: Math.round(totalContributions),
        projectedBalance,
        monthlyRetirementIncome,
        annualRetirementIncome,
        yearsOfRetirement,
    };
}

// ============================================
// 401(K) CALCULATOR
// ============================================

export interface Result401k {
    annualSalary: number;
    contributionPercent: number;
    annualContribution: number;
    employerMatchPercent: number;
    employerMatchAmount: number;
    totalAnnualContribution: number;
    projectedBalance: number;
    yearsToRetirement: number;
    is50Plus: boolean;
    maxContribution: number;
}

export function calculate401k(
    annualSalary: number,
    contributionPercent: number,
    employerMatchPercent: number,
    employerMatchUpTo: number,
    currentAge: number,
    retirementAge: number,
    currentBalance: number,
    expectedReturn: number = 7
): Result401k {
    const is50Plus = currentAge >= 50;
    const maxContribution = is50Plus 
        ? RETIREMENT_CONSTANTS.limits401k.total50Plus 
        : RETIREMENT_CONSTANTS.limits401k.under50;

    // Your contribution (capped at IRS limit)
    let annualContribution = (annualSalary * (contributionPercent / 100));
    annualContribution = Math.min(annualContribution, maxContribution);

    // Employer match (based on your contribution up to their limit)
    const employerMatchableAmount = Math.min(
        annualSalary * (employerMatchUpTo / 100),
        annualContribution
    );
    const employerMatchAmount = Math.round(employerMatchableAmount * (employerMatchPercent / 100));

    const totalAnnualContribution = Math.round(annualContribution) + employerMatchAmount;

    // Project growth
    const yearsToRetirement = retirementAge - currentAge;
    const monthlyContribution = totalAnnualContribution / 12;
    const monthlyReturn = expectedReturn / 100 / 12;

    let projectedBalance = currentBalance;
    for (let i = 0; i < yearsToRetirement * 12; i++) {
        projectedBalance = projectedBalance * (1 + monthlyReturn) + monthlyContribution;
    }

    return {
        annualSalary,
        contributionPercent,
        annualContribution: Math.round(annualContribution),
        employerMatchPercent,
        employerMatchAmount,
        totalAnnualContribution,
        projectedBalance: Math.round(projectedBalance),
        yearsToRetirement,
        is50Plus,
        maxContribution,
    };
}

// ============================================
// SOCIAL SECURITY ESTIMATOR
// ============================================

export interface SocialSecurityResult {
    claimingAge: number;
    monthlyBenefit: number;
    annualBenefit: number;
    lifetimeBenefit: number;
    percentOfMax: number;
    recommendation: string;
}

export function calculateSocialSecurity(
    averageMonthlyEarnings: number, // AIME approximation
    claimingAge: number
): SocialSecurityResult {
    const { socialSecurity } = RETIREMENT_CONSTANTS;

    // Simplified PIA calculation (actual SSA formula is more complex)
    // This gives a rough estimate based on average earnings
    let baseBenefit = averageMonthlyEarnings * 0.4; // Simplified replacement rate
    baseBenefit = Math.min(baseBenefit, socialSecurity.maxBenefit67);

    // Adjust for claiming age
    let adjustmentFactor = 1;
    if (claimingAge < socialSecurity.fullRetirementAge) {
        // Reduce by ~6.67% per year before FRA
        const yearsEarly = socialSecurity.fullRetirementAge - claimingAge;
        adjustmentFactor = 1 - (yearsEarly * 0.0667);
    } else if (claimingAge > socialSecurity.fullRetirementAge) {
        // Increase by 8% per year after FRA
        const yearsLate = claimingAge - socialSecurity.fullRetirementAge;
        adjustmentFactor = 1 + (yearsLate * 0.08);
    }

    const monthlyBenefit = Math.round(baseBenefit * adjustmentFactor);
    const annualBenefit = monthlyBenefit * 12;
    const lifeExpectancy = RETIREMENT_CONSTANTS.defaults.lifeExpectancy;
    const lifetimeBenefit = annualBenefit * (lifeExpectancy - claimingAge);

    // Determine max based on claiming age
    let maxForAge = socialSecurity.maxBenefit67;
    if (claimingAge === 62) maxForAge = socialSecurity.maxBenefit62;
    if (claimingAge >= 70) maxForAge = socialSecurity.maxBenefit70;

    const percentOfMax = Math.round((monthlyBenefit / maxForAge) * 100);

    let recommendation = "";
    if (claimingAge < 67) {
        recommendation = "Waiting until 67 could increase your benefit by ~30%";
    } else if (claimingAge >= 67 && claimingAge < 70) {
        recommendation = "Each year you wait until 70 increases your benefit by 8%";
    } else {
        recommendation = "You've maximized your Social Security benefit!";
    }

    return {
        claimingAge,
        monthlyBenefit,
        annualBenefit,
        lifetimeBenefit: Math.round(lifetimeBenefit),
        percentOfMax,
        recommendation,
    };
}

// ============================================
// SAVINGS GOAL CALCULATOR
// ============================================

export interface SavingsGoalResult {
    targetAmount: number;
    currentSavings: number;
    yearsToRetirement: number;
    monthlyNeeded: number;
    totalContributions: number;
    interestEarned: number;
    isAchievable: boolean;
}

export function calculateSavingsGoal(
    targetAmount: number,
    currentSavings: number,
    currentAge: number,
    retirementAge: number,
    expectedReturn: number = 7
): SavingsGoalResult {
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    const monthlyReturn = expectedReturn / 100 / 12;

    // Future value of current savings
    const futureValueOfCurrent = currentSavings * Math.pow(1 + monthlyReturn, monthsToRetirement);

    // Amount still needed
    const amountNeeded = targetAmount - futureValueOfCurrent;

    // Monthly payment to reach goal (PMT formula)
    let monthlyNeeded = 0;
    if (amountNeeded > 0 && monthlyReturn > 0) {
        monthlyNeeded = (amountNeeded * monthlyReturn) / 
                       (Math.pow(1 + monthlyReturn, monthsToRetirement) - 1);
    }
    monthlyNeeded = Math.round(Math.max(0, monthlyNeeded));

    const totalContributions = monthlyNeeded * monthsToRetirement;
    const interestEarned = targetAmount - currentSavings - totalContributions;

    // Check if achievable (assuming max 401k + IRA contribution)
    const maxMonthlyContribution = (RETIREMENT_CONSTANTS.limits401k.total50Plus + 
                                    RETIREMENT_CONSTANTS.limitsIRA.total50Plus) / 12;
    const isAchievable = monthlyNeeded <= maxMonthlyContribution;

    return {
        targetAmount,
        currentSavings,
        yearsToRetirement,
        monthlyNeeded,
        totalContributions: Math.round(totalContributions),
        interestEarned: Math.round(Math.max(0, interestEarned)),
        isAchievable,
    };
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function parseFormattedNumber(value: string): number {
    return parseInt(value.replace(/[^0-9]/g, '')) || 0;
}
