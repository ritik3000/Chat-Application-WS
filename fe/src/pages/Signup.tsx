import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Create from '../components/Create';
import Join from '../components/Join';

const Signup = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'create' | 'join'>('create');

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 relative overflow-hidden">
    
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-zinc-400 hover:text-green-400 transition-colors font-doto flex items-center gap-2 group"
      >
        <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back
      </button>

      {/* Main content */}
      <div className="max-w-md w-full relative z-10 animate-slideInDown">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2 font-doto">
            <span className="text-gradient-green">Join</span> <span className="text-zinc-300">the</span> <span className="text-gradient-green">Chat</span>
          </h2>
          <div className="h-1 w-12  rounded-full mx-auto mt-2"></div>
        </div>
        <p className="text-zinc-400 text-center mb-8 font-doto">
          Choose to create a new room or join an existing one
        </p>

        {/* Mode Toggle */}
        <div className="flex gap-2 mb-8 bg-zinc-900/50 p-1 rounded-lg border border-zinc-800 backdrop-blur-sm">
          <button
            onClick={() => setMode('create')}
            className={`flex-1 py-3 rounded-md font-doto font-semibold transition-all duration-300 ${
              mode === 'create'
                ? 'from-green-500 to-green-600 text-white shadow-glow scale-105'
                : 'text-zinc-400 hover:text-zinc-300'
            }`}
          >
            Create Room
          </button>
          <button
            onClick={() => setMode('join')}
            className={`flex-1 py-3 rounded-md font-doto font-semibold transition-all duration-300 ${
              mode === 'join'
                ? 'from-green-500 to-green-600 text-white shadow-glow scale-105'
                : 'text-zinc-400 hover:text-zinc-300'
            }`}
          >
            Join Room
          </button>
        </div>
        {/* Content Container */}
        <div className="card-dark p-8 backdrop-blur-md border-2 border-green-500/20 hover:border-green-500/40 transition-all duration-300">
          {mode === 'create' ? <Create /> : <Join />}
        </div>
      </div>
    </div>
  );
};

export default Signup;