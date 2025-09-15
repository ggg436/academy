import Link from "next/link";
import Image from "next/image";
import { LanguageSelector } from "@/components/language-selector";

export const Footer = () => {
  const sections = [
    {
      title: "Courses",
      links: [
        { label: "HTML", href: "/courses" },
        { label: "CSS", href: "/courses" },
        { label: "JavaScript", href: "/courses" },
        { label: "Python", href: "/courses" },
        { label: "React", href: "/courses" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/" },
        { label: "Careers", href: "/" },
        { label: "Blog", href: "/" },
        { label: "Press", href: "/" },
      ],
    },
    {
      title: "Help & Support",
      links: [
        { label: "Help Center", href: "/" },
        { label: "Contact", href: "/" },
        { label: "Status", href: "/" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Games", href: "/games" },
        { label: "Learn", href: "/learn" },
        { label: "Videos", href: "/videos" },
        { label: "Shop", href: "/shop" },
      ],
    },
  ];

  const socials = [
    { name: "X", icon: "/next.svg", href: "#" },
    { name: "YouTube", icon: "/video.svg", href: "#" },
    { name: "Instagram", icon: "/mascot.svg", href: "#" },
  ];

  return (
    <footer className="w-full border-t border-slate-200 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Image src="/mascot.svg" alt="Logo" height={28} width={28} />
          <span className="text-lg font-semibold">Merosoft</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-slate-900 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">
              Language
            </h3>
            <LanguageSelector />

            <h3 className="text-sm font-semibold text-slate-900 mt-6 mb-3 uppercase tracking-wide">
              Follow us
            </h3>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <Link
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="p-2 border border-slate-200 rounded-md hover:bg-slate-50 transition"
                >
                  <Image src={s.icon} alt={s.name} height={18} width={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Merosoft. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-slate-600 hover:text-slate-900">Privacy</Link>
            <Link href="#" className="text-xs text-slate-600 hover:text-slate-900">Terms</Link>
            <Link href="#" className="text-xs text-slate-600 hover:text-slate-900">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
