export function AboutSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Visi</h3>
            <p className="text-gray-600">Menjadi laboratorium unggulan dalam riset teknologi komputasi masa depan.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Misi</h3>
            <p className="text-gray-600">Menyediakan fasilitas modern dan memfasilitasi riset inovatif bagi mahasiswa dan dosen.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
