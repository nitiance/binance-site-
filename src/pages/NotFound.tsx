import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="bg-[#F7F3EE] min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center rounded-xl border border-[#D8CEC2] bg-white/70 p-8 shadow-[0_12px_30px_rgba(11,31,59,0.08)]">
        <p className="text-xs uppercase tracking-wide text-[#2B3440]/60">404</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-[#0B0F14]">
          Page not found.
        </h1>
        <p className="mt-4 text-sm text-[#2B3440]/75 leading-relaxed">
          This route does not exist. Use the main navigation or go back home.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-[#0B1F3B] text-[#F7F3EE] text-sm font-medium px-4 py-2.5 hover:bg-[#0B1F3B]/90 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
