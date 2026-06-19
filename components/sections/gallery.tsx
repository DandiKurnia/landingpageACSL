import { Gallery } from '@/types';

type Props = {
  data: Gallery[];
};

export function GallerySection({ data }: Props) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.slice(0, 6).map((item) => (
            <div key={item.id} className="overflow-hidden rounded-lg">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover hover:scale-105 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
