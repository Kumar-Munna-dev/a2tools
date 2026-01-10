 
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import InfoDropdown from "@/app/components/InfoDropdown";

export default function PasswordStrengthChecker() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState({
        score: 0,
        label: "Very Weak",
        color: "bg-red-500",
    });

    // Calculate password strength
    const checkStrength = (pwd: string) => {
        let score = 0;
        if (pwd.length >= 8) score++;
        if (pwd.length >= 12) score++;
        if (/[a-z]/.test(pwd)) score++;
        if (/[A-Z]/.test(pwd)) score++;
        if (/[0-9]/.test(pwd)) score++;
        if (/[^A-Za-z0-9]/.test(pwd)) score++;

        let label = "Very Weak";
        let color = "bg-red-500";
        if (score > 5) {
            label = "Very Strong";
            color = "bg-green-600";
        } else if (score > 4) {
            label = "Strong";
            color = "bg-green-500";
        } else if (score > 2) {
            label = "Moderate";
            color = "bg-yellow-500";
        } else if (score > 1) {
            label = "Weak";
            color = "bg-orange-500";
        }

        setStrength({ score, label, color });
    };

    useEffect(() => {
        checkStrength(password);
    }, [password]);

    // Get feedback tips
    const getTips = () => {
        const tips = [];
        if (password.length < 12)
            tips.push("Increase password length to at least 12 characters.");
        if (!/[A-Z]/.test(password))
            tips.push("Add uppercase letters for stronger security.");
        if (!/[0-9]/.test(password))
            tips.push("Include numbers to improve strength.");
        if (!/[^A-Za-z0-9]/.test(password))
            tips.push("Add symbols like !@#$%^&* for better protection.");
        return tips;
    };

    return (
        <main className="full w min-h-screen bg-transparent mt-20 dark:text-gray-100 py-10 px-4">
            <div className="full w p-6 bg-transparent dark:bg-gray-800 rounded-2xl ">
                <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
                    <ShieldCheck className="h-6 w-6 text-blue-600" /> Password Strength Checker – Test Password Security Online
                </h1>

                {/* Input Field */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password..."
                        className="w-full h-14 px-4 pr-12 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500" />
                        ) : (
                            <Eye className="h-5 w-5 text-gray-500" />
                        )}
                    </button>
                </div>

                {/* Strength Meter */}
                <div className="mt-6">
                    <div className="flex justify-between text-sm mb-1">
                        <span>Password Strength</span>
                        <span className="font-semibold">{strength.label}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${strength.color} transition-all duration-500`}
                            style={{ width: `${(strength.score / 6) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-20 border-t border-green-300">
                    <h2 className="font-semibold text-lg mb-2">🔑 Strength Tips</h2>
                    {password.length === 0 ? (
                        <p className="text-gray-500">Start typing to check your password strength.</p>
                    ) : getTips().length > 0 ? (
                        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            {getTips().map((tip, i) => (
                                <li key={i}>{tip}</li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-green-600 dark:text-green-400 font-medium">
                            Great! Your password is strong and secure.
                        </p>
                    )}
                </div>

                {/* SEO About Section */}
                <div className="mt-30 border-t border-gray-300 dark:border-gray-700 pt-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    <h2 className="text-lg font-bold mb-2">🧠 About Password Strength Checker Tool</h2>
                    <p>
                        Our <strong>Password Strength Checker</strong> helps you evaluate
                        how secure your passwords are. It instantly analyzes your input
                        using length, character diversity, and symbol usage to determine
                        its strength.
                    </p>
                    <p className="mt-2">
                        Weak passwords can be easily guessed, while strong passwords protect
                        you from hacking and identity theft. Use this tool to create
                        longer, complex, and unique passwords for better online safety.
                    </p>
                </div>

                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <h3 className="font-semibold mb-1">🔍 SEO Keywords:</h3>
                    <p>
                        password strength checker, online password analyzer, strong password tool,
                        secure password strength test, password security meter
                    </p>
                </div>



                <div className="mt-10 space-y-6 border-t border-green-300">
                    <InfoDropdown
                        title="🔐 What Is a Password Strength Checker?"
                        content="A password strength checker is an online tool that analyzes how secure your password is. It evaluates length, character combinations, and complexity to determine if your password is easy or hard to crack. This helps you understand your password’s resistance to hacking attempts and guides you in creating a stronger one."
                    />

                    <InfoDropdown
                        title="🧠 How Does the Password Strength Checker Work?"
                        content="This tool uses a scoring algorithm that measures password complexity. It looks for uppercase and lowercase letters, numbers, and special characters. It also considers password length — the longer and more complex it is, the higher your strength score. You get real-time feedback as you type, helping you improve instantly."
                    />

                    <InfoDropdown
                        title="⚙️ Why Strong Passwords Are Important for Security"
                        content="Weak passwords are one of the most common causes of security breaches. Hackers can easily guess or brute-force simple passwords. Strong passwords with a mix of symbols, letters, and numbers make it almost impossible for attackers to gain unauthorized access to your accounts, keeping your data and identity safe."
                    />

                    <InfoDropdown
                        title="💡 Tips to Improve Your Password Strength"
                        content="To make your password stronger, include at least 12–16 characters, mix uppercase and lowercase letters, add numbers and special symbols, and avoid using personal information like birthdays or names. Changing passwords regularly and using unique ones for every account greatly enhances your digital security."
                    />

                    <InfoDropdown
                        title="🌍 Why Use Our Password Strength Checker Tool?"
                        content="Our password strength checker is a free, secure, and privacy-focused online tool. It works entirely on your device — no passwords are stored or sent to any server. Designed for both casual users and IT professionals, it provides instant strength analysis and tips to help you build safer, stronger passwords effortlessly."
                    />
                </div>

            </div>
        </main>
    );
}
