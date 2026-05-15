import { NavLink } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 md:py-28">
      <div
        data-aos="zoom-in"
        className="max-w-5xl mx-auto px-6 py-14 md:py-20 rounded-3xl text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #0284c7 0%, #16a34a 55%, #7c3aed 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_60%)]"></div>
        <div className="relative text-white">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-base md:text-lg opacity-95 max-w-2xl mx-auto mb-8">
            It takes two minutes to sign up. After that, your weekend can mean
            something to someone who really needs it.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <NavLink
              to="/register"
              className="btn bg-white text-slate-900 hover:bg-white/90 border-none rounded-full px-7"
            >
              Join MAD — it&apos;s free
            </NavLink>
            <NavLink
              to="/needvolunteerpage"
              className="btn btn-outline border-white text-white hover:bg-white hover:text-slate-900 rounded-full px-7"
            >
              Browse Opportunities
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
