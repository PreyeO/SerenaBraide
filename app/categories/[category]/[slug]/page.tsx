import ProductDetailContent from "@/features/products/components/ProductDetailContent";

interface ProductDetailPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { category, slug } = await params;

  return <ProductDetailContent category={category} slug={slug} />;
};

export default ProductDetailPage;
