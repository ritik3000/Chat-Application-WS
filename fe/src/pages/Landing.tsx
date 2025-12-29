import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500 rounded-full opacity-5 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-500 rounded-full opacity-5 blur-3xl animate-pulse-slow delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-green-500 rounded-full opacity-3 blur-2xl animate-pulse-slow delay-500"></div>

      <div className="text-center max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <div className="mb-8 animate-slideInDown">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 font-doto leading-tight">
            <span className="text-zinc-200 drop-shadow-[0_0_10px_rgba(212,212,212,0.3)] block mb-2">
              Real-Time
            </span>
            <span className="text-transparent  from-green-400 via-green-500 to-green-600 bg-clip-text drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]">
              Chat Rooms
            </span>
          </h1>
          <div className="h-1 w-16  from-green-400 to-green-600 rounded-full mx-auto mb-4"></div>
        </div>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed font-doto animate-slideInUp">
          Create or join a chat room instantly and start messaging — powered by WebSockets for lightning-fast, real-time communication.
        </p>

        {/* Feature indicators */}
        <div className="flex justify-center items-center gap-6 mb-12 text-sm md:text-base animate-slideInUp flex-wrap">
          {["Secure", "Instant", "Real-time"].map((item, i) => (
            <div key={i} className="flex items-center gap-2 hover:text-green-400 transition-colors">
              <span className="text-green-400">✓</span>
              <span className="text-zinc-300 font-medium font-doto">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slideInUp">
          <button
            onClick={handleGetStarted}
            className="btn-primary px-10 py-4 text-lg shadow-glow hover:shadow-glow-lg"
          >
            Get Started Now
          </button>

          <button
            onClick={handleGetStarted}
            className="px-10 py-4 bg-zinc-900/50 border-2 border-green-500/50 hover:border-green-500 text-green-400 font-semibold rounded-lg transition-all duration-300 text-lg font-doto hover:bg-zinc-900"
          >
            Learn More →
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 px-4">
          {[
            { icon: "⚡", text: "Lightning Fast" },
            { icon: "🔐", text: "Fully Secure" },
            { icon: "👥", text: "Group Chat" },
          ].map((item, i) => (
            <div
              key={i}
              className="card-dark p-4 md:p-6 rounded-lg animate-fadeIn"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                {item.icon}
              </div>
              <p className="text-zinc-400 font-doto text-sm">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-16 opacity-40 animate-fadeIn">
          <div className="flex justify-center space-x-2 mb-8">
            {[0, 0.1, 0.2].map((d, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-green-400 rounded-full animate-bounceGently"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-zinc-800">
          <p className="text-zinc-600 font-doto text-sm">
            💚 Made with love by Ritik
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
