import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    title: 'Conosci Te Stesso',
    description: 'Un percorso di esplorazione interiore attraverso la psicologia, la natura e le arti espressive.',
    image: 'https://www.francescavioli.it/wp-content/uploads/2022/09/conosciok-705x705.png',
    link: '#',
  },
  {
    title: 'Il Filo del Sè',
    description: 'Laboratorio di scrittura autobiografica e narrazione per ritrovare il filo della propria storia.',
    image: 'https://www.francescavioli.it/wp-content/uploads/2022/09/copertina-705x705.png',
    link: '#',
  },
];

export default function Courses() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTriggers: ScrollTrigger[] = [];

      // Title animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: titleRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              titleRef.current,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, ease: 'expo.out' }
            );
          },
          once: true,
        })
      );

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          scrollTriggers.push(
            ScrollTrigger.create({
              trigger: card,
              start: 'top 85%',
              onEnter: () => {
                gsap.fromTo(
                  card,
                  {
                    x: index === 0 ? -80 : 80,
                    opacity: 0,
                  },
                  {
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    delay: 0.2 + index * 0.15,
                    ease: 'expo.out',
                  }
                );
              },
              once: true,
            })
          );
        }
      });

      return () => {
        scrollTriggers.forEach(st => st.kill());
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="corsi"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl text-center mb-16 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          Corsi/Lab/Seminari
        </h2>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {courses.map((course, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative bg-cream rounded-lg overflow-hidden cursor-pointer opacity-0 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl mb-3 text-black/90 group-hover:text-[#C9A962] transition-colors">
                  {course.title}
                </h3>
                <p className="text-black/60 text-sm md:text-base leading-relaxed mb-4">
                  {course.description}
                </p>
                <a
                  href={course.link}
                  className="inline-flex items-center gap-2 text-sm tracking-widest uppercase text-black/70 group-hover:text-[#C9A962] transition-colors"
                >
                  Scopri di più
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-2 transition-transform"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-32 h-32 border border-[#C9A962]/10 rounded-full -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-24 h-24 border border-[#C9A962]/10 rounded-full translate-x-1/2" />
    </section>
  );
}
