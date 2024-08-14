import AdminNavBar from "@/components/AdminNavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-[70px] bg-white sticky top-0 left-0 right-0 z-[100]">
        <AdminNavBar />
      </div>
      {children}
    </div>
  );
}
