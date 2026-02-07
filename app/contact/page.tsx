// app/contact/page.tsx
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

// Force static generation
export const dynamic = 'force-static';

export default function ContactPage() {
    return (
        <>
            {/* ==== HERO SECTION ==== */}
            <section className="relative dark:bg-slate-950 dark:text-slate-50 overflow-hidden">
                <div className="absolute inset-0"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-10 left-10 w-80 h-80  rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full mix-blend-multiply blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
                </div>

                <div className="relative container mx-auto px-6 py-24 text-center max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                        Get in Touch
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 animate-slide-up animation-delay-200">
                        We’d love to hear from you. Send us a message and we’ll respond as soon as possible.
                    </p>
                </div>
            </section>

            {/* ==== CONTACT INFO + FORM ==== */}
            <section className="py-20 ">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold animate-fade-in animation-delay-400">
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                {[
                                    { icon: <Mail className="w-6 h-6" />, label: 'Email', value: 'a2tool@zohomail.in', href: 'mailto:a2tool@zohomail.in' },
                                    { icon: <Phone className="w-6 h-6" />, label: 'Phone', value: '+91 8544221279', href: 'tel:+918544221279' },
                                    { icon: <MapPin className="w-6 h-6" />, label: 'Location', value: 'India', href: '#' },
                                ].map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.href}
                                        className="flex items-center gap-4 p-4rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-slide-up group"
                                        style={{ animationDelay: `${(i + 5) * 100}ms` }}
                                    >
                                        <div className="p-3 bg-linear-to-br from-blue-500 to-cyan-500 text-white rounded-lg group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-sm ">{item.label}</p>
                                            <p className="font-medium">{item.value}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="p-8 rounded-2xl shadow-xl animate-fade-in animation-delay-800">
                            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

                            <form className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 outline-none"
                                        required
                                    />
                                    <input
                                        type="email"
                                        placeholder="Your Email"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 outline-none"
                                        required
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 outline-none"
                                    required
                                />

                                <textarea
                                    rows={5}
                                    placeholder="Your Message"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
                                    required
                                ></textarea>

                                <button
                                    type="submit"
                                    className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 mx-auto md:mx-0 group"
                                >
                                    Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==== MAP (Optional Static Embed) ==== */}
            <section className="py-20">
                <div className="container mx-auto px-6 text-center max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in animation-delay-1000">
                        Powerful, Image & Text Utilities
                    </h2>

                    <p className="text-lg leading-relaxed mb-8 animate-slide-up animation-delay-1200">
                        A2Tool provides a complete suite of developer‑friendly utilities: <strong>compress File / Currency Converter/ Online Notepad</strong>,{' '}
                        <strong>image resize / convert / watermark</strong>, <strong>text extraction / formatting / regex</strong>, and more.
                        All tools run instantly in the browser—no installation required.
                    </p>

                    <a
                        href="/tools"
                        className="inline-flex items-center text-white gap-2 px-6 py-3 font-semibold rounded-full bg-indigo-600 hover:bg-indigo-400 transition-colors animate-fade-in animation-delay-1400"
                    >
                        Explore All Tools <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>
        </>
    );
}