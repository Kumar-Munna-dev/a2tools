// ---------------------------------------------------------
// PURE CALCULATION LOGIC FOR A2TOOLS CALCULATORS
// ---------------------------------------------------------

import { evaluate, format } from "mathjs";

// --- 1. AGE CALCULATOR ---
export function calculateAge(birthDate: Date, targetDate: Date = new Date()) {
  if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) return null;

  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let months = targetDate.getMonth() - birthDate.getMonth();
  let days = targetDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = targetDate.getTime() - birthDate.getTime();
  const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const totalMonths = years * 12 + months;
  const weeks = Math.floor(totalDays / 7);

  let nextBirthday = new Date(targetDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday < targetDate) {
    nextBirthday.setFullYear(targetDate.getFullYear() + 1);
  }

  const daysToNext = Math.ceil(
    (nextBirthday.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  return { years, months, days, totalDays, totalMonths, weeks, nextBirthday, daysToNext };
}


// --- 2. BASIC & SCIENTIFIC EVALUATION ---
export function evaluateMath(expression: string, precision: number = 14): string {
  try {
    if (!expression || expression.trim() === "") return "";
    
    // Safety check against extremely large evaluation attempts
    if (expression.length > 200) return "Error: Expression too long";

    const result = evaluate(expression);
    
    if (typeof result === "function" || typeof result === "object") {
      return "Error";
    }

    if (!isFinite(result) || isNaN(result)) {
      return "Error: Invalid Math";
    }

    return format(result, { precision, lowerExp: -12, upperExp: 12 }).toString();
  } catch {
    return "Error";
  }
}


// --- 3. BMI CALCULATOR ---
export function calculateBMI(heightValue: number, heightUnit: "cm" | "in" | "ft", weightValue: number, weightUnit: "kg" | "lbs") {
  if (heightValue <= 0 || weightValue <= 0) return null;

  let heightInMeters = 0;
  if (heightUnit === "cm") heightInMeters = heightValue / 100;
  if (heightUnit === "in") heightInMeters = heightValue * 0.0254;
  if (heightUnit === "ft") heightInMeters = heightValue * 0.3048;

  let weightInKg = 0;
  if (weightUnit === "kg") weightInKg = weightValue;
  if (weightUnit === "lbs") weightInKg = weightValue * 0.453592;

  const bmi = weightInKg / (heightInMeters * heightInMeters);
  
  let category = "Normal weight";
  let color = "text-green-500";
  
  if (bmi < 18.5) {
    category = "Underweight";
    color = "text-blue-500";
  } else if (bmi >= 25 && bmi < 29.9) {
    category = "Overweight";
    color = "text-yellow-500";
  } else if (bmi >= 30) {
    category = "Obesity";
    color = "text-red-500";
  }

  const healthyWeightMin = 18.5 * (heightInMeters * heightInMeters);
  const healthyWeightMax = 24.9 * (heightInMeters * heightInMeters);

  return {
    bmi: Number(bmi.toFixed(2)),
    category,
    color,
    healthyWeightRange: [Number(healthyWeightMin.toFixed(1)), Number(healthyWeightMax.toFixed(1))]
  };
}


// --- 4. DISCOUNT CALCULATOR ---
export function calculateDiscount(originalPrice: number, discountPercentage: number, taxPercentage: number = 0) {
  if (originalPrice < 0) return null;
  
  const discountAmount = originalPrice * (Math.max(0, discountPercentage) / 100);
  const priceAfterDiscount = Math.max(0, originalPrice - discountAmount);
  
  const taxAmount = priceAfterDiscount * (Math.max(0, taxPercentage) / 100);
  const finalPrice = priceAfterDiscount + taxAmount;

  return {
    discountAmount: Number(discountAmount.toFixed(2)),
    priceAfterDiscount: Number(priceAfterDiscount.toFixed(2)),
    taxAmount: Number(taxAmount.toFixed(2)),
    finalPrice: Number(finalPrice.toFixed(2)),
    totalSaved: Number((originalPrice - finalPrice).toFixed(2))
  };
}


// --- 5. EMI CALCULATOR ---
export function calculateEMI(principal: number, annualRate: number, tenureInMonths: number) {
  if (principal <= 0 || annualRate < 0 || tenureInMonths <= 0) return null;
  
  const monthlyRate = (annualRate / 12) / 100;
  let monthlyEMI = 0;

  if (monthlyRate === 0) {
    monthlyEMI = principal / tenureInMonths;
  } else {
    monthlyEMI =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
      (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
  }

  const totalPayment = monthlyEMI * tenureInMonths;
  const totalInterest = totalPayment - principal;

  return {
    monthlyEMI: Number(monthlyEMI.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    principal: Number(principal.toFixed(2))
  };
}


// --- 6. GST/VAT CALCULATOR ---
export function calculateGST(baseAmount: number, ratePercentage: number, mode: "add" | "remove") {
  if (baseAmount < 0 || ratePercentage < 0) return null;

  const rateDecimal = ratePercentage / 100;
  
  if (mode === "add") {
    const taxAmount = baseAmount * rateDecimal;
    const finalAmount = baseAmount + taxAmount;
    return {
      netAmount: Number(baseAmount.toFixed(2)),
      taxAmount: Number(taxAmount.toFixed(2)),
      grossAmount: Number(finalAmount.toFixed(2))
    };
  } else {
    const netAmount = baseAmount / (1 + rateDecimal);
    const taxAmount = baseAmount - netAmount;
    return {
      netAmount: Number(netAmount.toFixed(2)),
      taxAmount: Number(taxAmount.toFixed(2)),
      grossAmount: Number(baseAmount.toFixed(2))
    };
  }
}


// --- 7. PERCENTAGE CALCULATOR ---
export function calculatePercentage(mode: string, v1: number, v2: number) {
  // Gracefully handle incomplete input
  if (isNaN(v1) || isNaN(v2)) return null;

  switch (mode) {
    case "percent_of":
      // What is V1% of V2?
      return { result: Number(((v1 / 100) * v2).toFixed(4)), explanation: `${v1}% of ${v2}` };
      
    case "is_what_percent":
      // V1 is what percent of V2?
      if (v2 === 0) return { result: null, error: "Division by zero" };
      return { result: Number(((v1 / v2) * 100).toFixed(4)), explanation: `${v1} is what % of ${v2}` };
      
    case "percent_change":
      // Percentage increase/decrease from V1 to V2
      if (v1 === 0) return { result: null, error: "Division by zero" };
      const change = ((v2 - v1) / Math.abs(v1)) * 100;
      return { 
        result: Number(change.toFixed(4)), 
        explanation: `${change > 0 ? 'Increase' : 'Decrease'} from ${v1} to ${v2}`
      };

    default:
      return null;
  }
}

// ---------------------------------------------------------
// FORMATTING UTILITIES
// ---------------------------------------------------------
export function formatCurrency(amount: number, currency: string = "USD", locale: string = "en-US") {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return amount.toFixed(2);
  }
}

export function formatNumber(num: number, locale: string = "en-US", decimals: number = 2) {
  try {
    return new Intl.NumberFormat(locale, {
      maximumFractionDigits: decimals,
    }).format(num);
  } catch {
    return num.toFixed(decimals);
  }
}
