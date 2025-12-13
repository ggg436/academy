import Link from "next/link";
import Image from "next/image";
import { LanguageSelector } from "@/components/language-selector";

export const Footer = () => {
  const sections: { title: string; links: { label: string; href: string }[] }[] = [
    {
      title: "About us",
      links: [
        { label: "Courses", href: "#" },
        { label: "Mission", href: "#" },
        { label: "Approach", href: "#" },
        { label: "Efficacy", href: "#" },
        { label: "Team", href: "#" },
        { label: "Research", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Brand guidelines", href: "#" },
        { label: "Store", href: "#" },
        { label: "Press", href: "#" },
        { label: "Investors", href: "#" },
        { label: "Contact us", href: "#" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Gharti Academy ABC", href: "#" },
        { label: "Gharti Academy Math", href: "#" },
        { label: "Podcast", href: "#" },
        { label: "Stories", href: "#" },
        { label: "Gharti Academy for Business", href: "#" },
        { label: "Super Gharti Academy", href: "#" },
        { label: "Gift Super Gharti Academy", href: "#" },
        { label: "Gharti Academy Max", href: "#" },
      ],
    },
    {
      title: "Apps",
      links: [
        { label: "Gharti Academy for Android", href: "#" },
        { label: "Gharti Academy for iOS", href: "#" },
        { label: "Gharti Academy ABC (iOS)", href: "#" },
      ],
    },
    {
      title: "Help and support",
      links: [
        { label: "Gharti Academy FAQs", href: "#" },
        { label: "Schools FAQs", href: "#" },
        { label: "Gharti Academy English Test FAQs", href: "#" },
        { label: "Status", href: "#" },
      ],
    },
    {
      title: "Privacy and terms",
      links: [
        { label: "Community guidelines", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Do not sell my personal information rights", href: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Blog", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "Twitter", href: "#" },
        { label: "YouTube", href: "#" },
      ],
    },
  ];

  const languages = [
    "English", "Español", "Français", "हिन्दी", "Magyar", "Bahasa Indonesia", "Italiano", "日本語", "한국어",
    "Nederlands", "Polski", "Português", "Română", "Русский", "svenska", "தமிழ்", "తెలుగు", "ภาษาไทย",
    "Tagalog", "Türkçe", "Українською", "Tiếng Việt", "中文",
  ];

  return (
    <footer className="w-full bg-green-600 text-white relative overflow-hidden">
      {/* Mountain shaped top border - matches page background color */}
      <div className="absolute top-0 left-0 right-0 h-[140px] pointer-events-none">
        <svg aria-hidden="true" className="w-full h-full block" viewBox="0 0 1440 140" preserveAspectRatio="none">
          {/* Background color to match page above footer */}
          <rect x="0" y="0" width="1440" height="140" fill="#f2f7ff" />
          {/* Mountain silhouette - green fills the cutout area */}
          <path
            d="M0 140 L0 95 L160 80 L300 90 L420 70 L560 85 L640 60 L720 12 L800 48 L880 62 L1000 52 L1120 85 L1260 68 L1360 86 L1440 75 L1440 140 Z"
            fill="#16a34a"
          />
          {/* Snow cap on central peak */}
          <path
            d="M670 58 L720 18 L770 50 L740 54 L720 40 L700 54 Z"
            fill="#f2f7ff"
            opacity="0.95"
          />
          {/* Additional snowy ridges */}
          <path d="M560 84 L600 70 L640 60 L620 74 Z" fill="#f2f7ff" opacity="0.9" />
          <path d="M800 60 L840 55 L880 62 L850 72 Z" fill="#f2f7ff" opacity="0.9" />
        </svg>
      </div>

      <div className="relative pt-[140px]">
        <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <div className="space-y-3">
                {section.links.map((l) => (
                  <Link key={l.label} href={l.href} className="block text-base/6 hover:text-green-100 transition-colors hover:translate-x-1 transform duration-200">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/20">
          <div className="max-w-screen-xl mx-auto px-6 py-6">
            <div className="text-sm font-semibold mb-3">Site language:</div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/90">
              {languages.map((lang) => (
                <span key={lang} className="text-sm hover:text-white cursor-pointer transition-colors">{lang}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
