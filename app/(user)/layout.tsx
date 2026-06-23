import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}


