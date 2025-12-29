/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                doto: ["Doto", "system-ui", "sans-serif"],
            },
            colors: {
                primary: "#22c55e", // green-500
                primaryDark: "#16a34a", // green-600
                dark: "#0a0a0a",
                surface: "#1a1a1a",
                border: "#27272a",
                text: {
                    primary: "#fafafa",
                    secondary: "#a1a1a1",
                    tertiary: "#71717a",
                },
            },
            animation: {
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "float": "float 6s ease-in-out infinite",
                "glow": "glow 2s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glow: {
                    "0%, 100%": { opacity: "0.5" },
                    "50%": { opacity: "1" },
                },
            },
            boxShadow: {
                glow: "0 0 20px rgba(34, 197, 94, 0.3)",
                "glow-lg": "0 0 30px rgba(34, 197, 94, 0.5)",
                "glow-sm": "0 0 10px rgba(34, 197, 94, 0.2)",
            },
            backdrop: {
                glass: "rgba(255, 255, 255, 0.05)",
            },
        },
    },
    plugins: [],
}