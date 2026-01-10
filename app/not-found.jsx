
const NotFound = ()=> {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-red-50 px-6 text-center">
      
      <h1 className="text-7xl font-extrabold text-pink-600 drop-shadow-sm">
        404
      </h1>

      <h2 className="text-2xl sm:text-3xl font-semibold mt-2 text-gray-800">
        Oops! Page Not Found 🍬
      </h2>

      <p className="mt-3 text-gray-600 max-w-md">
        Looks like this page wandered off… or maybe it never existed.  
        Let’s get you back to something sweet.
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition-all"
      >
        Go Home
      </a>

      <div className="mt-8 animate-bounce">
        <span className="text-5xl">🍭</span>
      </div>
    </div>
  );
}
export default NotFound
