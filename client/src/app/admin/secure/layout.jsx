import AdminNavbar from "@/components/Admin/AdminNavbar";

export default function Layout({ children }) {
  return (
    <section className="flex ">
      <AdminNavbar />
      <div className=" h-full w-full">{children}</div>
    </section>
  );
}
