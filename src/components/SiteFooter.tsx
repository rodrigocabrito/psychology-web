import { site } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white/50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-serif text-base text-ink">{site.practitionerName}</p>
          <p>
            {site.role} · {site.city}
          </p>
        </div>
        <div className="flex flex-col gap-1 sm:text-right">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-ink"
          >
            {site.email}
          </a>
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="transition-colors hover:text-ink"
          >
            {site.phone}
          </a>
        </div>
      </div>
      <div className="border-t border-line/70 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} {site.practitionerName}. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
