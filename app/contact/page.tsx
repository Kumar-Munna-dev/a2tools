import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Contact | A2Tool",
  description:
    "Contact A2Tool for support, feedback, or questions about browser-based PDF, image, and text tools.",
};

export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
      <section className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Contact A2Tool
          </p>
          <h1 className="text-4xl font-bold">We're here to help.</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-300">
            Send us a message with your questions about tools, privacy, or how A2Tool works. We reply as soon as possible.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-bold mb-6">Contact details</h2>
            <div className="space-y-4">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  value: "a2tool@zohomail.in",
                  href: "mailto:a2tool@zohomail.in",
                },
                {
                  icon: <Phone className="w-5 h-5" />,
                  label: "Phone",
                  value: "+91 85442 21279",
                  href: "tel:+918544221279",
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Location",
                  value: "India",
                  href: "#",
                },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="flex items-start gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
                >
                  <div className="mt-1 rounded-2xl bg-slate-100 p-3 text-slate-900 dark:bg-slate-800 dark:text-white">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                    <p className="font-semibold">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-bold mb-6">Send a message</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                required
              />
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />

            <textarea
              rows={5}
              placeholder="Message"
              className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              required
            />

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
            >
              Send message
            </button>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              This form is a frontend demo and does not send email automatically.
            </p>
          </form>
        </div>

        <div className="mt-16 text-center">
          <a
            href="/tools"
            className="inline-flex items-center gap-2 text-slate-900 dark:text-slate-100 font-semibold hover:underline"
          >
            Browse tools <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
