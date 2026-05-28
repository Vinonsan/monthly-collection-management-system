import Link from 'next/link'

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 text-slate-950">
      <section className="w-full max-w-[560px] rounded-md border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-theme-primary">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-theme-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-theme-primary/90"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:border-theme-primary/30 hover:bg-theme-primary/5 hover:text-theme-primary"
          >
            Go to Login
          </Link>
        </div>
      </section>
    </main>
  )
}

export default NotFound
