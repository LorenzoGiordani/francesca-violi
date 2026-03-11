import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Divider animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'top 95%',
          onEnter: () => {
            gsap.fromTo(
              dividerRef.current,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.6, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Links animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: linksRef.current,
          start: 'top 95%',
          onEnter: () => {
            gsap.fromTo(
              linksRef.current,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.4, delay: 0.2, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-black text-white py-8 relative overflow-hidden"
    >
      {/* Gradient Divider */}
      <div
        ref={dividerRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#C9A962] to-transparent origin-center"
        style={{ willChange: 'transform' }}
      />

      <div className="container-custom">
        <div
          ref={linksRef}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          <a
            href="#"
            className="text-sm text-white/60 hover:text-[#C9A962] transition-colors link-underline"
          >
            Privacy Policy
          </a>
          <span className="hidden md:inline text-white/30">|</span>
          <a
            href="#"
            className="text-sm text-white/60 hover:text-[#C9A962] transition-colors link-underline"
          >
            Cookie Policy
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Francesca Violi. Tutti i diritti riservati.
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-4 left-4 w-8 h-8 border border-white/5 rounded-full" />
      <div className="absolute top-4 right-4 w-6 h-6 border border-white/5 rounded-full" />
    </footer>
  );
}
