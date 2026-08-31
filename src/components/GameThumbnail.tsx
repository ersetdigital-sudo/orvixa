import Image from "next/image";

interface GameThumbnailProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
}

const SIZES = {
  sm: { container: "w-[76px] h-[76px] rounded-[12px]", image: 76 },
  md: { container: "w-[104px] h-[104px] md:w-[148px] md:h-[148px] rounded-[16px]", image: 148 },
  lg: { container: "w-full aspect-square rounded-[14px]", image: 400 },
};

export default function GameThumbnail({ src, alt, size = "lg", className = "", style }: GameThumbnailProps) {
  const s = SIZES[size];
  return (
    <div
      className={`relative overflow-hidden shrink-0 ${s.container} ${className}`}
      style={{ background: "var(--color-surface-2, #0D1117)", ...style }}
    >
      <Image
        loading="lazy"
        src={src}
        alt={alt}
        width={s.image}
        height={s.image}
        className="w-full h-full object-contain"
      />
    </div>
  );
}
