import Image from 'next/image';

export default function Overview() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left: Photo and Title - Centered */}
        <div className="md:col-span-4 flex flex-col items-center">
          <Image
            src="/images/EthanJablonowski_Headshot.png"
            alt="Ethan Jablonowski"
            width={280}
            height={280}
            className="rounded-2xl ring-4 ring-sage-100 shadow-lg mb-6"
          />
          <div className="text-center">
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
            I build and scale products, services, and brands across challenging markets — including fitness, healthcare, video games, ecommerce, and real estate.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-warm-700">
            Over 13+ years, I&apos;ve learned that growth comes from alignment: understanding your audience, building things they genuinely value, and communicating clearly enough that it resonates. My work focuses on what gets built, how it reaches the right people, and how it&apos;s designed to scale.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-warm-700">
            The portfolio below reflects a decade of big swings and experiments. I started in digital marketing and gradually expanded into product development and leadership, driven by a long-standing fascination with how businesses succeed in a changing digital landscape.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-warm-700">
            I&apos;m currently open to new opportunities. Reach out if you&apos;d like to connect.
          </p>
        </div>
      </div>
    </section>
  );
}
