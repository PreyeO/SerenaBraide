export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="lg:px-16 px-6">{children}</main>
    </div>
  );
}
