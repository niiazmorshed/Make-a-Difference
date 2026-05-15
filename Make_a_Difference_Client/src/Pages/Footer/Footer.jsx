import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <h1 className="text-3xl font-extrabold">
            Make A <span className="text-amber-300">Difference</span>
          </h1>
          <p className="opacity-90 mt-3 text-sm leading-relaxed">
            A free volunteer platform connecting everyday people with local
            causes that need them.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Visit</h2>
          <p className="text-sm opacity-90">Merul Badda, DIT Project</p>
          <p className="text-sm opacity-90">Dhaka, Bangladesh</p>
          <p className="text-sm opacity-90 mt-3">+880 1734 804 733</p>
          <p className="text-sm opacity-90">niazmorshedrafi@gmail.com</p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Follow</h2>
          <div className="flex gap-3 text-2xl">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-amber-300 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-amber-300 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-amber-300 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-amber-300 transition"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Stay in the loop</h2>
          <p className="text-sm opacity-90 mb-3">
            Monthly updates on new opportunities. No spam.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full"
          >
            <input
              type="email"
              placeholder="you@email.com"
              className="input input-sm rounded-l-full rounded-r-none flex-1 text-slate-900"
            />
            <button
              type="submit"
              className="btn btn-sm btn-warning rounded-r-full rounded-l-none border-none"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="max-w-6xl mx-auto px-6 py-5 text-xs opacity-80 flex flex-col md:flex-row gap-2 md:justify-between">
          <span>© {new Date().getFullYear()} Make a Difference. All rights reserved.</span>
          <span>Built with care in Dhaka, Bangladesh.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
