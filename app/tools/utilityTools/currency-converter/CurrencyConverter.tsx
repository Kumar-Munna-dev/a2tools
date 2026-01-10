"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight, RefreshCcw } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

interface Rates {
  [key: string]: number;
}

export default function CurrencyConverter() {
  const [rates, setRates] = useState<Rates>({});
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");
  const [result, setResult] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
const currencyNames: Record<string, string> = {
  // Major World Currencies
  USD: "US Dollar 🇺🇸",
  EUR: "Euro 🇪🇺",
  INR: "Indian Rupee 🇮🇳",
  GBP: "British Pound 🇬🇧",
  JPY: "Japanese Yen 🇯🇵",
  CNY: "Chinese Yuan 🇨🇳",
  AUD: "Australian Dollar 🇦🇺",
  CAD: "Canadian Dollar 🇨🇦",
  CHF: "Swiss Franc 🇨🇭",
  NZD: "New Zealand Dollar 🇳🇿",
  SGD: "Singapore Dollar 🇸🇬",
  HKD: "Hong Kong Dollar 🇭🇰",
  KRW: "South Korean Won 🇰🇷",
  RUB: "Russian Ruble 🇷🇺",
  ZAR: "South African Rand 🇿🇦",
  AED: "UAE Dirham 🇦🇪",
  SAR: "Saudi Riyal 🇸🇦",
  QAR: "Qatari Riyal 🇶🇦",
  BHD: "Bahraini Dinar 🇧🇭",
  OMR: "Omani Rial 🇴🇲",
  KWD: "Kuwaiti Dinar 🇰🇼",

  // Asian
  PKR: "Pakistani Rupee 🇵🇰",
  BDT: "Bangladeshi Taka 🇧🇩",
  NPR: "Nepalese Rupee 🇳🇵",
  LKR: "Sri Lankan Rupee 🇱🇰",
  THB: "Thai Baht 🇹🇭",
  MYR: "Malaysian Ringgit 🇲🇾",
  IDR: "Indonesian Rupiah 🇮🇩",
  VND: "Vietnamese Dong 🇻🇳",
  PHP: "Philippine Peso 🇵🇭",
  MNT: "Mongolian Tugrik 🇲🇳",

  // Europe
  SEK: "Swedish Krona 🇸🇪",
  NOK: "Norwegian Krone 🇳🇴",
  DKK: "Danish Krone 🇩🇰",
  PLN: "Polish Zloty 🇵🇱",
  HUF: "Hungarian Forint 🇭🇺",
  CZK: "Czech Koruna 🇨🇿",
  RON: "Romanian Leu 🇷🇴",
  HRK: "Croatian Kuna 🇭🇷",
  BGN: "Bulgarian Lev 🇧🇬",
  ISK: "Icelandic Krona 🇮🇸",
  TRY: "Turkish Lira 🇹🇷",
  UAH: "Ukrainian Hryvnia 🇺🇦",
  BYN: "Belarusian Ruble 🇧🇾",

  // Middle East & Africa
  EGP: "Egyptian Pound 🇪🇬",
  MAD: "Moroccan Dirham 🇲🇦",
  TND: "Tunisian Dinar 🇹🇳",
  DZD: "Algerian Dinar 🇩🇿",
  NGN: "Nigerian Naira 🇳🇬",
  GHS: "Ghanaian Cedi 🇬🇭",
  KES: "Kenyan Shilling 🇰🇪",
  UGX: "Ugandan Shilling 🇺🇬",
  TZS: "Tanzanian Shilling 🇹🇿",
  ETB: "Ethiopian Birr 🇪🇹",

  // Americas
  MXN: "Mexican Peso 🇲🇽",
  BRL: "Brazilian Real 🇧🇷",
  ARS: "Argentine Peso 🇦🇷",
  CLP: "Chilean Peso 🇨🇱",
  COP: "Colombian Peso 🇨🇴",
  PEN: "Peruvian Sol 🇵🇪",
  BOB: "Bolivian Boliviano 🇧🇴",
  PYG: "Paraguayan Guarani 🇵🇾",
  UYU: "Uruguayan Peso 🇺🇾",
  DOP: "Dominican Peso 🇩🇴",

  // Small Nations / Islands
  JMD: "Jamaican Dollar 🇯🇲",
  TTD: "Trinidad & Tobago Dollar 🇹🇹",
  XCD: "East Caribbean Dollar 🇱🇨",
  BSD: "Bahamian Dollar 🇧🇸",
  BBD: "Barbadian Dollar 🇧🇧",
  KYD: "Cayman Islands Dollar 🇰🇾",
  BZD: "Belize Dollar 🇧🇿",

  // Central Asia
  KZT: "Kazakhstani Tenge 🇰🇿",
  UZS: "Uzbekistani Som 🇺🇿",
  TJS: "Tajikistani Somoni 🇹🇯",
  AZN: "Azerbaijani Manat 🇦🇿",
  GEL: "Georgian Lari 🇬🇪",
  AMD: "Armenian Dram 🇦🇲",
  IRR: "Iranian Rial 🇮🇷",
  IQD: "Iraqi Dinar 🇮🇶",
  AFN: "Afghan Afghani 🇦🇫",

  // Pacific & Oceania
  FJD: "Fijian Dollar 🇫🇯",
  WST: "Samoan Tala 🇼🇸",
  PGK: "Papua New Guinea Kina 🇵🇬",
  SBD: "Solomon Islands Dollar 🇸🇧",
  VUV: "Vanuatu Vatu 🇻🇺",
  TOP: "Tongan Paʻanga 🇹🇴",

  // Others
  MADAGASCAR: "Malagasy Ariary 🇲🇬",
  MUR: "Mauritian Rupee 🇲🇺",
  SCR: "Seychellois Rupee 🇸🇨",
  XAF: "CFA Franc (Central Africa) 🌍",
  XOF: "CFA Franc (West Africa) 🌍",
  XPF: "CFP Franc 🇵🇫",
  GYD: "Guyanese Dollar 🇬🇾",
  SRD: "Surinamese Dollar 🇸🇷",
  BWP: "Botswana Pula 🇧🇼",
  LSL: "Lesotho Loti 🇱🇸",
  SZL: "Eswatini Lilangeni 🇸🇿",
  MWK: "Malawian Kwacha 🇲🇼",
  ZMW: "Zambian Kwacha 🇿🇲",
  MZN: "Mozambican Metical 🇲🇿",
  BIF: "Burundian Franc 🇧🇮",
  RWF: "Rwandan Franc 🇷🇼",
};

  // 🧠 Fetch exchange rates
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        const data = await res.json();
        if (data.result === "success") {
          setRates(data.rates);
          localStorage.setItem("currencyRates", JSON.stringify(data.rates));
        } else {
          throw new Error("API failed");
        }
      } catch (err) {
        console.error("⚠️ Using offline rates");
        const cached = localStorage.getItem("currencyRates");
        if (cached) setRates(JSON.parse(cached));
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  // 💱 Convert values
  useEffect(() => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return;
    const converted = (amount / rates[fromCurrency]) * rates[toCurrency];
    setResult(converted);
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(num);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-700 dark:text-gray-300">Fetching live exchange rates...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-green-100 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full backdrop-blur-md bg-white/40 dark:bg-gray-800/60 rounded-3xl shadow-xl p-8 border border-white/30 dark:border-gray-700"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          Currency Converter – Convert Exchange Rates Online
        </h1>

        {/* Conversion Inputs */}
        <div className="grid sm:grid-cols-3 gap-4 items-center mb-8">
          {/* From */}
          <div className="p-4 rounded-xl bg-white/60 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-inner">
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
              From
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-2 outline-none focus:ring-2 focus:ring-green-400"
            />
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            >
              {Object.keys(currencyNames).map((code) => (
                <option key={code} value={code}>
                  {code} – {currencyNames[code]}
                </option>
              ))}
            </select>
          </div>

          {/* Swap */}
          <div className="flex justify-center">
            <motion.button
              whileTap={{ rotate: 180, scale: 0.9 }}
              onClick={handleSwap}
              className="p-4 bg-linear-to-r from-green-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-2xl transition-all"
            >
              <ArrowLeftRight className="h-6 w-6" />
            </motion.button>
          </div>

          {/* To */}
          <div className="p-4 rounded-xl bg-white/60 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-inner">
            <label className="text-sm text-gray-600 dark:text-gray-300 mb-1 block">
              To
            </label>
            <input
              type="text"
              readOnly
              value={formatNumber(result)}
              className="w-full p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-2 outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full p-2 rounded-lg border dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            >
              {Object.keys(currencyNames).map((code) => (
                <option key={code} value={code}>
                  {code} – {currencyNames[code]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => {
              setAmount(1);
              setFromCurrency("USD");
              setToCurrency("INR");
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <RefreshCcw className="h-4 w-4" /> Reset
          </button>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <InfoDropdown
            title="🌍 What Is a Currency Converter?"
            content="A currency converter lets you instantly convert values between different world currencies based on live exchange rates. It's essential for travelers, traders, and global businesses."
          />
          <InfoDropdown
            title="📈 How Are Rates Calculated?"
            content="We use live rates from Open Exchange Rate API. The tool automatically updates to reflect the latest global market rates and stores offline copies for reliability."
          />
          <InfoDropdown
            title="🔁 Why Show Country Flags?"
            content="Showing both currency codes and flags (like USD – 🇺🇸 US Dollar) makes it easier to identify and select the right currency without confusion."
          />
          <InfoDropdown
            title="🔒 Offline Support"
            content="Rates are cached in your browser’s localStorage so you can perform conversions even without an active internet connection."
          />
          <InfoDropdown
            title="🌐 Supported Currencies"
            content="Supports all major world currencies including USD, EUR, INR, GBP, JPY, CAD, AUD, CNY, AED, SAR, and more."
          />
        </div>
      </motion.div>
    </main>
  );
}
