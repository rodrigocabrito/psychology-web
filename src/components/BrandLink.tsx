"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BrandLink({ name }: { name: string }) {
  const pathname = usePathname();

  // On the home page, scroll to top and clear any lingering #hash.
  const handleClick = (e: React.MouseEvent) => {
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
    <Link
      href="/"
      onClick={handleClick}
      className="font-serif text-lg font-medium text-ink transition-colors hover:text-sage-dark"
    >
      {name}
    </Link>
  );
}
