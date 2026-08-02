"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTION_IDS = ["sobre", "areas", "como-funciona"] as const;

type NavLabels = { about: string; areas: string; how: string };

export function MainNav({ labels }: { labels: NavLabels }) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  const sections = [
    { id: "sobre", label: labels.about },
    { id: "areas", label: labels.areas },
    { id: "como-funciona", label: labels.how },
  ];

  // On the home page, scroll to the section directly instead of letting Next
  // do a same-page hash navigation (which needed two clicks and duplicated the
  // hash in the URL). On other pages, let the Link navigate to /#id normally.
  const handleClick = (e: React.MouseEvent, id: string) => {
    if (pathname !== "/") return;
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll-spy: mark the section currently near the top of the viewport.
  useEffect(() => {
    const hasSections = SECTION_IDS.some((id) => document.getElementById(id));
    if (!hasSections) return; // not on the home page

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const threshold = 120; // px from the top (sticky header + margin)
        let current: string | null = null;
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= threshold) current = id;
        }
        // Near the bottom, keep the last section highlighted.
        if (
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 4
        ) {
          current = SECTION_IDS[SECTION_IDS.length - 1];
        }
        setActiveId(current);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Move the sliding underline under the active link.
  useEffect(() => {
    const nav = navRef.current;
    const update = () => {
      const link = activeId ? linkRefs.current[activeId] : null;
      if (!link || !nav) {
        setIndicator((prev) => ({ ...prev, opacity: 0 }));
        return;
      }
      const navRect = nav.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    };

    update();
    const ro = nav ? new ResizeObserver(update) : null;
    if (nav && ro) ro.observe(nav);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [activeId]);

  return (
    <div ref={navRef} className="relative hidden items-center gap-6 md:flex">
      {sections.map((s) => (
        <Link
          key={s.id}
          href={`/#${s.id}`}
          onClick={(e) => handleClick(e, s.id)}
          ref={(el) => {
            linkRefs.current[s.id] = el;
          }}
          aria-current={activeId === s.id ? "true" : undefined}
          className={`text-sm transition-colors ${
            activeId === s.id ? "text-ink" : "text-muted hover:text-ink"
          }`}
        >
          {s.label}
        </Link>
      ))}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 h-0.5 rounded-full bg-sage transition-all duration-300 ease-out"
        style={{
          left: indicator.left,
          width: indicator.width,
          opacity: indicator.opacity,
        }}
      />
    </div>
  );
}
