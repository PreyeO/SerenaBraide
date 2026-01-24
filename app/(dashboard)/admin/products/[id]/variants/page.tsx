import VariantsScreen from "@/features/profile/dashboard/admin-screens/VariantsScreen";

interface VariantsPageProps {
  params: {
    id: string;
  };
}

const VariantsPage = ({ params }: VariantsPageProps) => {
  return <VariantsScreen productId={parseInt(params.id)} />;
};

export default VariantsPage;


