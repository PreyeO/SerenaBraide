import VariantsScreen from "@/features/profile/dashboard/admin-screens/VariantsScreen";

interface VariantsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const VariantsPage = async ({ params }: VariantsPageProps) => {
  const { id } = await params;
  return <VariantsScreen productId={parseInt(id)} />;
};

export default VariantsPage;
