import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Header />
      <main className="relative z-0">{/* page content */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
