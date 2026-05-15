const steps = [
  {
    n: "01",
    title: "Create a free account",
    body: "Sign up in less than a minute. No paperwork, no fees — just your name and an email.",
  },
  {
    n: "02",
    title: "Browse local opportunities",
    body: "Filter by category, location, or date. Read who is running it and what they need help with.",
  },
  {
    n: "03",
    title: "Apply and show up",
    body: "Send your request to the organizer. Get confirmed, then meet the team on the day of the event.",
  },
  {
    n: "04",
    title: "Track your impact",
    body: "Your dashboard keeps a record of every hour you contribute and every cause you support.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-base-200/60"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="text-sm tracking-[0.25em] uppercase text-emerald-600 font-semibold mb-3">
            How It Works
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Four steps from <span className="text-gradient">curious</span> to{" "}
            <span className="text-gradient">contributing</span>.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              className="lift-on-hover relative bg-base-100 rounded-2xl border border-base-300 p-7 overflow-hidden"
            >
              <span className="absolute -top-3 -right-2 text-7xl font-black text-base-300/60 select-none">
                {s.n}
              </span>
              <h3 className="text-xl font-bold mt-6 mb-3 relative">
                {s.title}
              </h3>
              <p className="text-sm opacity-80 relative">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
