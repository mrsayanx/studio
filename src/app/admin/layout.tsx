export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {children}
    </div>
  );
}
