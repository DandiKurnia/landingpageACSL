type Props = {
  params: Promise<{ id: string }>;
};

export default async function LaboratoryDetailPage({ params }: Props) {
  const { id } = await params;
  return <main>Laboratory Detail: {id}</main>;
}
