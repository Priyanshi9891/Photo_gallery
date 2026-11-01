import Gallery from "./components/Gallery";

function App() {
  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Photo collection
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            My Photo Gallery
          </h1>
      
        </header>

        <Gallery />
      </div>
    </main>
  );
}

export default App;
