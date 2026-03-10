type WelcomeSearchParams = {
  email?: string;
};

type WelcomePageProps = {
  searchParams?: WelcomeSearchParams;
};

export default function WelcomePage({ searchParams }: WelcomePageProps) {
  const email = searchParams?.email ?? "";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 px-6 py-4">
      <header className="flex items-center justify-end">
        {email && (
          <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm ring-1 ring-blue-100">
            {email}
          </div>
        )}
      </header>
      <main className="flex flex-1 items-center justify-center">
        <h1 className="text-center text-5xl font-bold tracking-wide text-blue-600 md:text-6xl">
          Signed in successfully
        </h1>
      </main>
    </div>
  );
}

