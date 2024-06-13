const Home = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mb-6 flex flex-row">
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank"></a>
        <a href="https://redux-saga.js.org/" target="_blank">
          <img className="logo saga bg-cover" alt="Saga logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold">
        Hello{' '}
        <span className="underline decoration-green-400 decoration-4">
          World
        </span>
      </h1>
      <h2 className="text-2xl font-semibold italic text-slate-500">
        Vite + React + R Saga
      </h2>
      <p className="italic text-slate-400">
        Note: Click on the Vite and React logos to learn more
      </p>
      <p className="mt-2 font-bold text-slate-600 underline decoration-indigo-400 decoration-4"></p>
    </div>
  );
};

export default Home;
