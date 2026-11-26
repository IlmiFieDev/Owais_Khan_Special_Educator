"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackNav, { NavigationTracker } from "@/components/navigation/BackNav";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const showBack = !isAdmin && pathname !== "/";

  return (
    <>
      {!isAdmin && <NavigationTracker />}
      {!isAdmin && <Header />}
      <main id="main-content" tabIndex={-1}>
        {showBack && <BackNav />}
        {children}
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}
