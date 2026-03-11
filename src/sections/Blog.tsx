import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const blogPosts = [
  {
    title: 'IL FILO DELLA VITA - II Congresso Nazionale di Ecobiopsicologia "La vita si fa mente"',
    excerpt: 'Avevo da poco espresso il desidero di poter contribuire al Secondo Congresso Nazionale di Ecobiopsicologia. La mia mente cercava ispirazione per ordinare pensiero e contenuti...',
    date: '19 maggio 2025',
    image: 'https://www.francescavioli.it/wp-content/uploads/2024/09/attiok.jpg',
    link: '#',
  },
  {
    title: 'ESSERE virgola UMANO',
    excerpt: 'La virgola è lì. Con una pausa breve separa l\'Essere dall\'Umano, così come noi ci separiamo apparentemente dal tutto attraverso l\'autocoscienza, pur rimanendone interrelati...',
    date: '7 maggio 2025',
    image: 'https://www.francescavioli.it/wp-content/uploads/2025/05/essere_umano_violi.png',
    link: '#',
  },
  {
    title: 'SOSTENIBILITA\'. IL RAPPORTO UOMO NATURA',
    excerpt: 'FESTIVAL DELLA COMPLESSITA\' 2025 - 24 MAGGIO ore 15-16 presso P.le Santafiora 1, 43121 Parma. Riflettere insieme sulla sostenibilità e il rapporto uomo-natura...',
    date: '5 maggio 2025',
    image: 'https://www.francescavioli.it/wp-content/uploads/2025/05/fb_sostenibilita.png',
    link: '#',
  },
  {
    title: 'IL FILO DEL SE\'. VIE VERSO L\'INTERIORITA\'. DIARI TACCUINI QUADERNI',
    excerpt: '24 MAGGIO ore 10.30-12 presso P.le Santafiora 1, 43121 Parma. "La scrittura non è il luogo dove riversiamo la vita interiore, la scrittura è il mezzo attraverso...',
    date: '5 maggio 2025',
    image: 'https://www.francescavioli.it/wp-content/uploads/2025/05/fb_interiorita.png',
    link: '#',
  },
];

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const paginationRef = useRef<HTMLDivElement>(null);

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
              start: 'top 90%',
              onEnter: () => {
                gsap.fromTo(
                  card,
                  { scale: 0.95, opacity: 0 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'expo.out',
                  }
                );
              },
              once: true,
            })
          );
        }
      });

      // Pagination animation
      scrollTriggers.push(
        ScrollTrigger.create({
          trigger: paginationRef.current,
          start: 'top 95%',
          onEnter: () => {
            gsap.fromTo(
              paginationRef.current,
              { opacity: 0 },
              { opacity: 1, duration: 0.4, delay: 0.8, ease: 'power2.out' }
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
    <section
      id="blog"
      ref={sectionRef}
      className="section-padding bg-cream relative overflow-hidden"
    >
      <div className="container-custom">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="font-display text-4xl md:text-5xl text-center mb-16 opacity-0"
          style={{ willChange: 'transform, opacity' }}
        >
          Blog
        </h2>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-2 opacity-0"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-black/50 mb-3">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl md:text-2xl mb-3 text-black/90 group-hover:text-[#C9A962] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-black/60 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <a
                  href={post.link}
                  className="inline-flex items-center gap-2 text-sm text-black/70 group-hover:text-[#C9A962] transition-colors"
                >
                  Continua a leggere
                  <ArrowRight
                    size={14}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div
          ref={paginationRef}
          className="flex justify-center items-center gap-2 mt-12 opacity-0"
          style={{ willChange: 'opacity' }}
        >
          <span className="text-sm text-black/50 mr-4">Pagina 1 di 10</span>
          <button className="w-10 h-10 flex items-center justify-center bg-[#C9A962] text-white rounded-sm text-sm font-medium">
            1
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-white text-black/70 hover:bg-[#C9A962] hover:text-white rounded-sm text-sm transition-colors">
            2
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-white text-black/70 hover:bg-[#C9A962] hover:text-white rounded-sm text-sm transition-colors">
            3
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-white text-black/70 hover:bg-[#C9A962] hover:text-white rounded-sm text-sm transition-colors">
            ›
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-white text-black/70 hover:bg-[#C9A962] hover:text-white rounded-sm text-sm transition-colors">
            »
          </button>
        </div>
      </div>
    </section>
  );
}
