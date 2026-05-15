import {
  FaBookReader,
  FaHandHoldingHeart,
  FaLeaf,
  FaPaw,
  FaSeedling,
  FaUserGraduate,
} from "react-icons/fa";

const categories = [
  {
    icon: <FaLeaf />,
    title: "Environment",
    blurb: "Tree planting, beach clean-ups, recycling drives.",
    tone: "from-emerald-400 to-green-600",
  },
  {
    icon: <FaBookReader />,
    title: "Education",
    blurb: "Tutoring, library help, after-school programs.",
    tone: "from-sky-400 to-blue-600",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Healthcare",
    blurb: "Blood drives, hospital outreach, mental health.",
    tone: "from-rose-400 to-red-600",
  },
  {
    icon: <FaSeedling />,
    title: "Food & Hunger",
    blurb: "Food banks, community kitchens, meal delivery.",
    tone: "from-amber-400 to-orange-600",
  },
  {
    icon: <FaPaw />,
    title: "Animal Welfare",
    blurb: "Shelter care, rescue support, fostering.",
    tone: "from-fuchsia-400 to-purple-600",
  },
  {
    icon: <FaUserGraduate />,
    title: "Youth & Mentorship",
    blurb: "Career mentoring, sports coaching, life skills.",
    tone: "from-cyan-400 to-teal-600",
  },
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="text-sm tracking-[0.25em] uppercase text-violet-600 font-semibold mb-3">
            Causes
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Find a cause you actually care about.
          </h2>
          <p className="text-base md:text-lg opacity-80 mt-5 max-w-2xl mx-auto">
            Browse opportunities by category. Each one is run by a real
            organizer in your area — not a faceless platform.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <div
              key={c.title}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="lift-on-hover group relative overflow-hidden rounded-2xl bg-base-100 border border-base-200 p-7"
            >
              <div
                className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${c.tone} opacity-15 group-hover:opacity-30 transition`}
              ></div>
              <div
                className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${c.tone} text-white flex items-center justify-center text-2xl mb-5`}
              >
                {c.icon}
              </div>
              <h3 className="relative text-xl font-bold mb-2">{c.title}</h3>
              <p className="relative text-sm opacity-80">{c.blurb}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
