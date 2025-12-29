import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import { createSocket, setUsername as setGlobalUsername } from '../socket';

const Create = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<'roomId' | 'username' | null>(null);

  const handleCreate = async () => {
    if (!roomId.trim()) return toast.error("Room ID is required");
    if (!username.trim()) return toast.error("Username is required");
    
    setLoading(true);
    setGlobalUsername(username);
    createSocket(roomId, username);
    
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleCreate();
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-6 animate-slideInUp'>
      <Toaster position="top-right" />
      <div className='text-center mb-2'>
        <h1 className='font-doto text-2xl font-bold text-gradient-green'>Create a New Room</h1>
        <p className='text-sm text-zinc-500 font-doto mt-1'>Give your room a unique ID</p>
      </div>
      
      <div className='w-full space-y-4'>
        <div className={`transition-all duration-300 ${focusedField === 'roomId' ? 'transform scale-105' : ''}`}>
          <input 
            type="text"
            placeholder='Room ID (e.g., study-room-2025)'
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            onFocus={() => setFocusedField('roomId')}
            onBlur={() => setFocusedField(null)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className='input-primary'
            autoFocus
          />
        </div>
        
        <div className={`transition-all duration-300 ${focusedField === 'username' ? 'transform scale-105' : ''}`}>
          <input 
            type="text"
            placeholder='Your Username (e.g., John)'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setFocusedField('username')}
            onBlur={() => setFocusedField(null)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className='input-primary'
          />
        </div>
        <button
          onClick={handleCreate}
          disabled={loading || !roomId.trim() || !username.trim()}
          className='btn-primary w-full py-3'
        >
          {loading ? (
            <span className='flex items-center justify-center gap-2'>
              <span className='inline-block w-4 h-4 border-2 border-transparent border-t-white rounded-full animate-spin'></span>
              Creating Room...
            </span>
          ) : 'Create Room'}
        </button>
      </div>

      <div className='text-xs text-zinc-600 font-doto text-center pt-2'>
        <p>💡 Make it unique so others can find it easily</p>
      </div>
    </div>
  )
}

export default Create