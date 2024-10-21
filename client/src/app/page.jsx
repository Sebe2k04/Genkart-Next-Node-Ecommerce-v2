import Hero from "@/components/Home/Hero";

export default function Home() {
  return (
    <main className="container">
      <Hero />
      <div className="flex justify-center py-12 lg:px-20 px-8">
        <iframe
          src="https://github.com/sponsors/Sebe2k04/card"
          title="Sponsor Sebe"
          className="max-w-[600px] bg-white rounded-2xl lg:min-w-[600px] object-contain min-h-[200px] min-w-[300px]"
        ></iframe>
      </div>
    </main>
  );
}
