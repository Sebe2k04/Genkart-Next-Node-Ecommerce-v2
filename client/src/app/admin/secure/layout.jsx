import AdminNavbar from "@/components/Admin/AdminNavbar";
import SmallFooter from "@/components/SmallFooter";

export default function Layout({ children }) {
  return (
    <section className="flex ">
      <AdminNavbar />
      <div className=" h-full w-full">
        {children}
        <SmallFooter />
      </div>
    </section>
  );
}
