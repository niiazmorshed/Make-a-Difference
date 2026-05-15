import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 12500, suffix: "+", label: "Volunteer hours logged" },
  { value: 380, suffix: "+", label: "Active community projects" },
  { value: 64, suffix: "", label: "Cities reached" },
  { value: 96, suffix: "%", label: "Volunteers who return" },
];

const useCountUp = (target, duration = 1600) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(target * eased));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return [value, ref];
};

const StatTile = ({ value, suffix, label, delay }) => {
  const [count, ref] = useCountUp(value);
  return (
    <div
      ref={ref}
      data-aos="zoom-in"
      data-aos-delay={delay}
      className="text-center px-4 py-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur"
    >
      <div className="stat-number text-4xl md:text-5xl font-black text-white">
        {count.toLocaleString()}
        {suffix}
      </div>
      <p className="text-white/80 text-sm md:text-base mt-2 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
};

const ImpactStats = () => {
  return (
    <section className="relative py-20 md:py-24 my-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-700 via-emerald-700 to-violet-700"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_55%)]"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-sm tracking-[0.25em] uppercase text-white/80 font-semibold mb-3">
            Our Impact So Far
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Real numbers from real volunteers.
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <StatTile key={s.label} {...s} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
