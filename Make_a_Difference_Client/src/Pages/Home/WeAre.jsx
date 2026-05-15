import { FaQuoteLeft } from "react-icons/fa";

const team = [
  {
    name: "Niaz Morshed",
    role: "Founder & Lead Engineer",
    image: "https://i.ibb.co/4PffJnR/photo-2023-02-28-19-26-32-2.jpg",
    quote:
      "I built MAD because I wanted volunteering to feel less like applying for a job and more like joining a neighbour for the afternoon.",
  },
  {
    name: "Community Organizers",
    role: "On-the-ground Partners",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80",
    quote:
      "Every opportunity you see on MAD is run by real people who care — local NGOs, student groups, and neighbourhood collectives.",
  },
  {
    name: "Our Volunteers",
    role: "The Heart of MAD",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    quote:
      "From students to retirees, MAD volunteers come from every walk of life. What they share is the belief that showing up matters.",
  },
];

const WeAre = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="text-sm tracking-[0.25em] uppercase text-rose-600 font-semibold mb-3">
            Who We Are
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            A small team, powered by a{" "}
            <span className="text-gradient">large community</span>.
          </h2>
          <p className="text-base md:text-lg opacity-80 mt-5 max-w-2xl mx-auto">
            MAD is not a corporation. It is a platform built by one engineer
            and held up by thousands of organizers and volunteers who do the
            actual work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <div
              key={m.name}
              data-aos="fade-up"
              data-aos-delay={i * 130}
              className="lift-on-hover bg-base-100 rounded-2xl border border-base-200 overflow-hidden"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-bold">{m.name}</h3>
                <p className="text-sm uppercase tracking-wider text-sky-600 font-semibold mt-1 mb-4">
                  {m.role}
                </p>
                <div className="relative pl-6 text-sm opacity-85">
                  <FaQuoteLeft className="absolute left-0 top-0 text-sky-500/60" />
                  {m.quote}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeAre;
