import Image from "next/image";
import { PICTURES } from "../_lib/pictures";

// Real photo when one is registered, else a gradient "swatch" with fine hatching.
export default function Photo({
  id,
  label,
  swatch = ["#DAD5C8", "#8A6F4E"],
  sizes = "(min-width:1024px) 33vw, 100vw",
  className = "",
  priority = false,
  imgClassName = "",
}) {
  const src = PICTURES[id];
  return (
    <div
      className={`${/\babsolute\b/.test(className) ? "" : "relative"} overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(155deg, ${swatch[0]} 0%, ${swatch[1]} 100%)`,
      }}
    >
      {src ? (
        <Image
          src={src}
          alt={label || ""}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        <span
          aria-hidden='true'
          className='absolute inset-0 opacity-[0.08]'
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#000 0,#000 1px,transparent 1px,transparent 12px)",
          }}
        />
      )}
    </div>
  );
}
