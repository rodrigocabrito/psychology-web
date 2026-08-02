import Link from "next/link";
import { BrandLink } from "@/components/BrandLink";
import { MainNav } from "@/components/MainNav";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary } from "@/i18n/server";

export async function SiteHeader() {
  const { locale, t } = await getDictionary();

  return (
    <header className="sticky top-0 z-20 border-b border-line/80 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <BrandLink name={t.name} />
        <div className="flex items-center gap-4 sm:gap-6">
          <MainNav labels={t.nav} />
          <LanguageSwitcher locale={locale} />
          <Link
            href="/marcar-consulta"
            className="rounded-full bg-sage px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sage-dark"
          >
            {t.nav.book}
          </Link>
        </div>
      </div>
    </header>
  );
}
