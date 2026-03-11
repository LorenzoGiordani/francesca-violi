import { useState, useRef, useEffect } from 'react';
import { Phone, Mail, Facebook, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Chi Sono', href: '#chi-sono' },
  { label: 'Cosa Offro', href: '#cosa-offro' },
  { label: 'Corsi/Lab/Seminari', href: '#corsi' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pubblicazioni/Eventi', href: '#pubblicazioni' },
  { label: 'Contatti', href: '#contatti' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(logoRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' });
      if (navRef.current) {
        gsap.fromTo(navRef.current.children, { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.2, ease: 'expo.out' });
      }
    });
    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container-custom py-2">
        <div className="flex items-center justify-between">
          <div ref={logoRef} className="cursor-pointer" onClick={() => scrollToSection('#home')}>
            <img src="https://www.francescavioli.it/wp-content/uploads/2022/09/Logo-con-firma-new-300x174.png" alt="Francesca Violi" className="h-14 md:h-16 w-auto" />
          </div>
          <nav className="hidden lg:block">
            <ul ref={navRef} className="flex items-center gap-5 xl:gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button onClick={() => scrollToSection(item.href)} className="text-xs tracking-wide text-gray-600 hover:text-black transition-colors py-1">{item.label}</button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+393299641121" className="text-gray-500 hover:text-[#C9A962] transition-colors" title="329 9641121"><Phone size={16} /></a>
            <a href="mailto:info@francescavioli.it" className="text-gray-500 hover:text-[#C9A962] transition-colors"><Mail size={16} /></a>
            <a href="https://www.facebook.com/francescavioliecobiopsicologia/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#C9A962] transition-colors"><Facebook size={16} /></a>
          </div>
          <button className="lg:hidden p-2 text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">{isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </div>
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="container-custom py-4">
          <ul className="flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.href}><button onClick={() => scrollToSection(item.href)} className="text-sm text-gray-700 hover:text-black transition-colors py-1">{item.label}</button></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
