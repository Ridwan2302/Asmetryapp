import { ProgramDetail } from '@/screens/ProgramDetail';

export default async function ProgramDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProgramDetail id={id} />;
}
