import Image from 'next/image';

export default function Partners() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 mb-12">Impulsados por:</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
              <Image src="/vercel.svg" alt="Google for Startups" width={200} height={60} className="h-12 opacity-70 hover:opacity-100 transition" />
              <Image src="/vercel.svg" alt="Aceleratec" width={200} height={60} className="h-12 opacity-70 hover:opacity-100 transition" />
          </div>
      </div>
    </section>
  );
}
