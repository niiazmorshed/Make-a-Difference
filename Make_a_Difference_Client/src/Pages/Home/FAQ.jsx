const faqs = [
  {
    q: "Is Make a Difference free to use?",
    a: "Yes. MAD is and will always be free for volunteers and organizers. We do not charge fees, take commissions, or sell your data.",
  },
  {
    q: "Do I need experience to volunteer?",
    a: "No. Most opportunities welcome first-time volunteers. The post will clearly say if a specific skill is required (like medical training).",
  },
  {
    q: "How do I know an organizer is legitimate?",
    a: "Each post lists the organizer, contact info, and event details. You can also read reviews from past volunteers before applying.",
  },
  {
    q: "Can I cancel after I apply?",
    a: "Of course. Life happens — just let the organizer know as early as you can so they can plan around it.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 md:py-28 bg-base-200/60">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="text-sm tracking-[0.25em] uppercase text-sky-600 font-semibold mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Questions, answered.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              data-aos="fade-up"
              data-aos-delay={i * 80}
              className="collapse collapse-arrow bg-base-100 border border-base-300"
            >
              <input type="checkbox" />
              <div className="collapse-title text-lg font-semibold">{f.q}</div>
              <div className="collapse-content opacity-80">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
