import { Helmet } from "react-helmet";
import { FaQuoteLeft } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";

const reviews = [
  {
    name: "Anika Rahman",
    role: "Weekend Volunteer, Dhaka",
    avatar: "https://i.ibb.co/9b7XsgL/wallpaperflare-com-wallpaper-2.jpg",
    rating: 5,
    text:
      "I stumbled upon MAD while searching for ways to give back on weekends, and it instantly clicked. The platform makes it effortless to find local opportunities that match my schedule. I've already joined three clean-up drives and met some genuinely wonderful people.",
  },
  {
    name: "Tanvir Hossain",
    role: "Community Organizer, Chittagong",
    avatar: "https://i.ibb.co/N64tgkY/HD-wallpaper-robert-pattinson-batman-3d-model.jpg",
    rating: 5,
    text:
      "As someone running monthly food drives, MAD has been a game-changer. Posting a need takes less than two minutes and we consistently reach motivated volunteers. The team behind the platform is responsive and clearly cares about impact.",
  },
  {
    name: "Sumaiya Akter",
    role: "First-time Volunteer",
    avatar: "https://i.ibb.co/HVsyCjh/wallpaperflare-com-wallpaper-1-1.jpg",
    rating: 5,
    text:
      "I had never volunteered before and felt intimidated. MAD walked me through everything — from filters to applying — and the organizer reached out the same day. It's now part of my monthly routine.",
  },
];

const Stars = ({ count }) => (
  <div className="flex gap-0.5 text-amber-400">
    {Array.from({ length: count }).map((_, i) => (
      <IoStarSharp key={i} />
    ))}
  </div>
);

const Review = () => {
  return (
    <div className="px-4 md:px-6 pb-20">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reviews | MAD</title>
      </Helmet>

      <header className="page-header">
        <p className="eyebrow">Loved by volunteers</p>
        <h1>What our <span className="text-gradient">community</span> says</h1>
        <p>
          Stories from people who use Make a Difference to give back, organize
          causes, and connect with their community.
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <article
            key={r.name}
            data-aos="fade-up"
            data-aos-delay={i * 120}
            className="surface-card p-6 md:p-7 flex flex-col"
          >
            <FaQuoteLeft className="text-3xl text-sky-500/60 mb-4" />
            <p className="opacity-85 leading-relaxed flex-1">
              {r.text}
            </p>
            <div className="mt-6 pt-5 border-t border-base-200 flex items-center gap-3">
              <img
                src={r.avatar}
                alt={r.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-sky-500/30"
              />
              <div className="flex-1">
                <p className="font-bold">{r.name}</p>
                <p className="text-xs opacity-70">{r.role}</p>
              </div>
              <Stars count={r.rating} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Review;
