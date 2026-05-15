import { FaHandsHelping, FaHeart, FaUsers } from "react-icons/fa";

const pillars = [
  {
    icon: <FaHandsHelping className="text-3xl" />,
    title: "Connect",
    description:
      "Find local needs in your city — from food banks to literacy programs — and join the people running them.",
  },
  {
    icon: <FaHeart className="text-3xl" />,
    title: "Contribute",
    description:
      "Give what you can: an hour after work, a Saturday morning, or a skill you have always wanted to share.",
  },
  {
    icon: <FaUsers className="text-3xl" />,
    title: "Belong",
    description:
      "Meet neighbours who care about the same things you do. Volunteering is how communities are built.",
  },
];

const Mission = () => {
  return (
    <section id="mission" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14" data-aos="fade-up">
          <p className="text-sm tracking-[0.25em] uppercase text-sky-600 font-semibold mb-3">
            Our Mission
          </p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Volunteering, made <span className="text-gradient">simple</span> for
            anyone.
          </h2>
          <p className="text-base md:text-lg opacity-80 mt-5 max-w-2xl mx-auto">
            You should not need an inside connection or a fancy CV to help your
            community. MAD is a free, open platform that lists real local
            opportunities and the people running them.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              className="lift-on-hover card bg-base-100 border border-base-200 shadow-md p-7 text-left"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mb-5">
                {p.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
              <p className="text-base opacity-80">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
