import Link from "next/link";
import { site } from "@/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-lg font-medium text-ink transition-colors hover:text-sage-dark"
        >
          {site.practitionerName}
        </Link>
        <nav className="flex items-center gap-4 text-sm sm:gap-6">
          <Link
            href="/"
            className="text-muted transition-colors hover:text-ink"
          >
            Sobre mim
          </Link>
          <Link
            href="/marcar-consulta"
            className="rounded-full bg-sage px-4 py-2 font-medium text-white transition-colors hover:bg-sage-dark"
          >
            Marcar consulta
          </Link>
        </nav>
      </div>
    </header>
  );
}
