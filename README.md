# 💬 Real-Time Chat Application

A modern, real-time chat application built with **WebSockets**, **React**, and **TypeScript**. Create or join chat rooms instantly and communicate with others in real-time.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)
![WebSocket](https://img.shields.io/badge/WebSocket-ws-green?style=flat)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.18-06B6D4?style=flat&logo=tailwindcss)

## ✨ Features

- 🚀 **Real-time Messaging** - Instant message delivery using WebSockets
- 🎨 **Beautiful UI** - Modern dark theme with green accents and smooth animations
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobiles
- 👥 **Multi-Room Support** - Create or join unlimited chat rooms
- 💾 **Message History** - Messages persist during your session
- ⚡ **Fast & Lightweight** - Built with performance in mind
- 🎯 **Type-Safe** - Full TypeScript support
- 🎭 **Smooth Animations** - Delightful UI/UX with custom animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ritik3000/Chat-Application-WS.git
cd Chat-Application-WS
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../fe
npm install
```

### Running the Application

#### Terminal 1 - Start Backend Server
```bash
cd backend
npm run dev
```
The WebSocket server will start on `ws://localhost:8081`

#### Terminal 2 - Start Frontend Development Server
```bash
cd fe
npm run dev
```
The React app will be available at `http://localhost:5173`

## 📖 Usage Guide

### Creating a Room
1. Click **"Get Started"** on the landing page
2. Select **"Create Room"** tab
3. Enter a unique Room ID (e.g., `study-room-2025`)
4. Enter your Username
5. Click **"Create Room"**
6. Share the Room ID with others

### Joining a Room
1. Click **"Get Started"** on the landing page
2. Select **"Join Room"** tab
3. Enter the Room ID shared with you
4. Enter your Username
5. Click **"Join Room"**
6. Start chatting!

### Chatting
- Type your message in the input field
- Press **Enter** or click **Send** to send
- Messages appear in real-time for all users in the room
- Your messages appear on the right (green), others on the left (dark)
- Leave the room anytime with the **"Leave Room"** button

## 🏗️ Project Structure

```
ws-chat-application/
├── backend/
│   ├── src/
│   │   └── index.ts          # WebSocket server logic
│   ├── dist/                 # Compiled JavaScript
│   ├── package.json
│   └── tsconfig.json
│
├── fe/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.tsx   # Home page
│   │   │   ├── Signup.tsx    # Room creation/join page
│   │   │   └── Dashboard.tsx # Chat interface
│   │   ├── components/
│   │   │   ├── Create.tsx    # Create room form
│   │   │   └── Join.tsx      # Join room form
│   │   ├── App.tsx           # Main app component
│   │   ├── App.css           # Custom styles
│   │   ├── socket.ts         # WebSocket logic & session management
│   │   └── main.tsx          # Entry point
│   ├── public/               # Static assets
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js    # Tailwind configuration
│   ├── vite.config.ts        # Vite configuration
│   └── tsconfig.json
│
└── README.md
```

## 🔧 Configuration

### Backend Port
Edit `backend/src/index.ts` to change the WebSocket server port:
```typescript
const PORT = Number(process.env.PORT) || 8081;
```

Or set via environment variable:
```bash
PORT=3000 npm run dev
```

### Frontend WebSocket URL
The frontend connects to `ws://localhost:8081` by default. Edit `fe/src/socket.ts` to change:
```typescript
socket = new WebSocket('ws://localhost:8081');
```

## 📦 Build for Production

### Backend
```bash
cd backend
npm run build  # Compiles TypeScript
npm run dev    # Runs from compiled dist/
```

### Frontend
```bash
cd fe
npm run build  # Creates optimized build in dist/
npm run preview # Preview the production build locally
```

## 🔐 Security Notes

- Current implementation uses plain WebSocket (ws://)
- For production, use **WSS** (WebSocket Secure) with SSL/TLS
- Messages are not encrypted in transit
- No authentication system currently implemented
- Use in trusted networks only

## 🎨 Customization

### Theme Colors
Edit `fe/tailwind.config.js` to customize the color scheme:
```javascript
colors: {
    primary: "#22c55e",      // Green
    primaryDark: "#16a34a",
    // ... more colors
}
```

### Animations
Add custom animations in `fe/src/App.css`:
```css
@keyframes customAnimation {
    /* Your animation */
}
```

## 📱 Browser Support

- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)


## Future Enhancements

- [ ] User authentication & authorization
- [ ] Message persistence with database
- [ ] File sharing
- [ ] Typing indicators
- [ ] User presence status
- [ ] Message editing & deletion
- [ ] Emoji picker
- [ ] Dark/Light theme toggle
- [ ] Audio/Video calling
- [ ] Message search functionality
- [ ] User profiles
- [ ] Admin controls

## 📄 License

ISC

## 👨‍💻 Author

**Ritik** - [GitHub](https://github.com/ritik3000)

---

**Happy Chatting!** 🚀
