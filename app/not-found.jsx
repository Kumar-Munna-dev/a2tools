
export const metadata = {
  title: "404 Not Found | A2Tool",
  description: "The page you are looking for does not exist. Return to A2Tool and continue with fast PDF, image, and text tools.",
};

const NotFound = () => {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Page not found</p>
        <h1 className="mt-6 text-6xl font-extrabold">404</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
          The page you are looking for could not be found. Go back to the homepage or explore our tools.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="/"
            className="rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-800"
          >
            Home
          </a>
          <a
            href="/tools"
            className="rounded-full border border-slate-300 px-6 py-3 text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            Browse tools
          </a>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
