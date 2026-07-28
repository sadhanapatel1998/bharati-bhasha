import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  badge: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeader({
  icon: Icon,
  badge,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center space-y-3 mb-12 ${className}`}>
      <div className="inline-flex items-center gap-2 text-amber-800 font-bold text-sm tracking-wider uppercase bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
        <Icon className="w-4 h-4 text-amber-600" />
        <span>{badge}</span>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading-hi text-[#021545]">
        {title}
      </h2>

      {description && (
        <p className="text-slate-800 text-medium sm:text-lg font-devanagari max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}

      <div className="w-24 h-1 bg-gradient-to-r from-red-800 via-amber-600 to-red-800 mx-auto rounded-full" />
    </div>
  );
}