"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/config/site";
import { MainNav } from "@/components/MainNav";

export function SiteHeader() {
  const pathname = usePathname();

  // On the home page, clicking the name scrolls to the top and clears any
  // lingering #hash from the URL, instead of leaving e.g. /#sobre behind.
  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname !== "/") return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.replaceState(
      window.history.state,
      "",
      window.location.pathname + window.location.search,
    );
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={handleLogoClick}
          className="font-serif text-lg font-medium text-ink transition-colors hover:text-sage-dark"
        >
          {site.practitionerName}
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <MainNav />
          <Link
            href="/marcar-consulta"
            className="rounded-full bg-sage px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sage-dark"
          >
            Marcar consulta
          </Link>
        </div>
      </div>
    </header>
  );
}
