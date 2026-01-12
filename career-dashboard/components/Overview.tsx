import Image from 'next/image';

export default function Overview() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left: Photo and Title */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start">
          <Image
            src="/images/EthanJablonowski_Headshot.png"
            alt="Ethan Jablonowski"
            width={280}
            height={280}
            className="rounded-2xl ring-4 ring-sage-100 shadow-lg mb-6"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-medium text-warm-900 mb-2">
              Ethan Jablonowski
            </h1>
            <p className="text-base text-warm-600">
              Product • Growth • Ops & Strategy
            </p>
          </div>
        </div>

        {/* Right: Hero Text */}
        <div className="md:col-span-8 space-y-6">
          <p className="text-lg md:text-xl leading-relaxed text-warm-800">
            I build and scale digital products, services, and brands across challenging markets—including fitness, healthcare, video games, ecommerce, and real estate.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-warm-700">
            Over 13+ years, I&apos;ve learned how businesses actually grow: by understanding who your audience is, building things they find valuable, and creating a story they identify with. I work at the intersection of product development and growth marketing—focused on how things are built, how they reach the right people, and how they scale.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-warm-700">
            The portfolio below is my collection of big swings and experiments—the product of a persistent curiosity about how businesses work. That curiosity has led me to high-impact opportunities, and I&apos;m excited to see where it leads next.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-warm-700">
            Reach out if you&apos;d like to connect.
          </p>
        </div>
      </div>
    </section>
  );
}