// app/about/page.tsx
import { Building2, Users, Target, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

// Force static generation (SSG)
export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <>
      {/* ==== HERO ==== */}
      <section className="relative overflow-hidden dark:bg-slate-950 dark:text-slate-50">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full mix-blend-multiply blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96  rounded-full mix-blend-multiply blur-3xl opacity-30"></div>
        </div>

        <div className="relative container mx-auto px-6 py-24 md:py-32 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text">
              A2Tool
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            Empowering developers and businesses with cutting-edge tools that simplify workflows,
            boost productivity, and drive innovation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/tools"
              className="px-8 py-3 transition-colors rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg"
            >
              Explore Tools <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border-2 border-cyan-400 hover:bg-cyan-400 hover:bg-opacity-20 transition-colors rounded-full font-semibold"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* ==== MISSION & VISION ==== */}
      <section className="py-20 ">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className=" p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3  rounded-xl">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold ">Our Mission</h3>
              </div>
              <p className="leading-relaxed">
                To deliver intuitive, reliable, and powerful tools that remove complexity from
                development and help teams focus on building amazing products.
              </p>
            </div>

            <div className="p-8 rounded-2xl shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Our Vision</h3>
              </div>
              <p className="leading-relaxed">
                A world where every developer has access to smart, efficient, and beautifully
                crafted tools that accelerate creativity without limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==== CORE VALUES ==== */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Core Values That Drive Us
          </h2>
          <p className="text-lg  mb-16 max-w-2xl mx-auto">
            Everything we build is rooted in principles that ensure quality, trust, and impact.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <CheckCircle className="w-10 h-10" />,
                title: 'Reliability',
                desc: 'Tools you can depend on, every single time.',
              },
              {
                icon: <Users className="w-10 h-10" />,
                title: 'Community',
                desc: 'Built with and for developers worldwide.',
              },
              {
                icon: <Building2 className="w-10 h-10" />,
                title: 'Innovation',
                desc: 'Pushing boundaries with modern solutions.',
              },
            ].map((v, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl hover:shadow-2xl transition-shadow border border-gray-200"
              >
                <div className="inline-flex p-4 bg-linear-to-br from-blue-500 to-cyan-500 text-white rounded-xl mb-6 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h4 className="text-xl fo mb-3">{v.title}</h4>
                <p className="">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==== FINAL CTA ==== */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of developers who trust A2Tool to supercharge their projects.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center gap-3 px-10 py-4 bg-white text-indigo-700 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-xl text-lg"
            >
              Get Started Now <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}