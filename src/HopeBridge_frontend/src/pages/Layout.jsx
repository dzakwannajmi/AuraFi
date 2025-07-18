import useAuth from "../hooks/useAuth";

export default function Layout({ greetText }) {
  const { user, login, logout, authReady } = useAuth();

  if (!authReady)
    return (
      <p className="text-center mt-10 font-poppins text-neutral">
        Loading Identity...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <header className="p-6 shadow-md bg-white flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">HopeBridge</h1>
          <p className="text-sm text-neutral">{greetText}</p>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <p className="text-secondary text-sm">
                Logged in as: <span className="font-medium">{user}</span>
              </p>
              <button
                onClick={logout}
                className="px-4 py-2 bg-danger hover:bg-red-600 text-white rounded-xl shadow transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="px-4 py-2 bg-primary hover:bg-blue-700 text-white rounded-xl shadow transition"
            >
              Login with Internet Identity
            </button>
          )}
        </div>
      </header>

      <main className="p-6">{/* Konten anak akan muncul di sini */}</main>
    </div>
  );
}
