import Sidebar from "./sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 border-r bg-gray-50">
        <Sidebar />
      </aside>

      <main className="flex-1 overflow-auto bg-white">
        {children}
      </main>
    </div>
  );
}
