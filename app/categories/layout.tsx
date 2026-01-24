export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="px-16">{children}</main>
    </div>
  );
}
