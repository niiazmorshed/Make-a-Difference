import { useState } from "react";
import { placeholderGradient, placeholderLabel } from "../utils/thumbnail";

const Thumbnail = ({ src, alt, category, seed, className = "" }) => {
  const [errored, setErrored] = useState(false);
  const hasImage = src && !errored;

  if (hasImage) {
    return (
      <img
        src={src}
        alt={alt || ""}
        loading="lazy"
        className={`w-full h-full object-cover ${className}`}
        onError={() => setErrored(true)}
      />
    );
  }

  const gradient = placeholderGradient(seed || category || alt || "MAD");
  const label = placeholderLabel(category || alt);

  return (
    <div
      className={`w-full h-full flex items-center justify-center text-white ${className}`}
      style={{ background: gradient }}
      aria-label={alt || "Placeholder"}
    >
      <span className="text-3xl font-extrabold tracking-wide opacity-90">
        {label}
      </span>
    </div>
  );
};

export default Thumbnail;
