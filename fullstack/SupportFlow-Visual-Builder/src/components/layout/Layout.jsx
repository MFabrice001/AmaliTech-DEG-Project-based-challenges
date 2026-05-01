import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-surface">
      <Navbar />
      <main className="flex-1 flex overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}