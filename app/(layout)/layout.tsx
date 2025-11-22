// app/about/(layout)/layout.tsx  <-- example
import Navbar from "@/components/SmallNavbar";
import FooterSmall from "@/components/FooterSmall";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white antialiased">
        {children}
    </div>
  );
}
