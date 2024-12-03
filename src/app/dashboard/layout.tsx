import Header from "@/components/templates/header";
import Sidebar from "@/components/templates/sideBar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "لوحة التحكم",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex h-screen">
    <Sidebar />
    <div className="flex-1 flex flex-col relative h-full">
      <Header />
      <div className="flex-1 md:px-7  overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
  );
}