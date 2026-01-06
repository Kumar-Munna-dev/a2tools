export default function ComingSoon() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-500 text-transparent bg-clip-text">
        🍬 Something Sweet is Coming!
      </h1>

      <p className="mt-3 text-gray-600 max-w-xl">
        We’re preparing something delightful just for you.  
        Our <span className="font-semibold text-pink-600">Plagiarism Checker</span> 
        is almost ready — polished, tested, and sprinkled with features.  
        Thanks for your patience! 💖
      </p>

      <div className="mt-6 animate-bounce">
        <span className="text-4xl">🍭</span>
      </div>

      <p className="mt-4 text-gray-500 text-sm">
        Stay tuned — launching very soon!
      </p>
    </div>
  );
}
