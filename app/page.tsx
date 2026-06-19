import HeroSection from '@/components/sections/hero';

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <section
        id="about"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Visi</h3>
              <p className="text-gray-600">
                Menjadi laboratorium unggulan dalam riset teknologi komputasi masa depan.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Misi</h3>
              <p className="text-gray-600">
                Menyediakan fasilitas modern dan memfasilitasi riset inovatif bagi mahasiswa dan dosen.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="laboratories"
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Laboratories</h2>
          <p className="text-center text-gray-600">5 laboratorium siap melayani.</p>
        </div>
      </section>
      <section
        id="gallery"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Gallery</h2>
          <p className="text-center text-gray-600">Dokumentasi kegiatan laboratorium.</p>
        </div>
      </section>
      <section
        id="team"
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Team</h2>
          <p className="text-center text-gray-600">Tim aslab yang berdedikasi.</p>
        </div>
      </section>
    </main>
  );
}
