import { Laboratory } from '@/types';
import { Card, CardBody, CardTitle } from '@/components/ui/card';

type Props = {
  data: Laboratory[];
};

export function LaboratoriesSection({ data }: Props) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Laboratories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {data.slice(0, 3).map((lab) => (
            <Card key={lab.id}>
              {lab.image && (
                <img src={lab.image} alt={lab.name} className="w-full h-48 object-cover" />
              )}
              <CardBody>
                <CardTitle>{lab.name}</CardTitle>
                <p className="text-gray-600 mt-2 line-clamp-3">{lab.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
