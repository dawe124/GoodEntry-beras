/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        light: {
          primary: "#0E0F11",  //#475569

          secondary: "#0A371B",
          neutral: "#FFF",
          success: "#feb800",
          "base-100": "#121418",
          "base-200": "#475569",
          "base-300": "#777D84",
          warning: "#B32C2D",

          "secondary-content": "#1a1d29",
          accent: "#10DA5D",
          "accent-content": "#212638",
          "neutral-content": "#ffffff",
          // "base-300": "#DAE8FF",
          "base-content": "#FFF",
          info: "#93BBFB",
          error: "#FF8863",

          "--rounded-btn": "0.8rem",
          "--rounded-box": "0rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
          // primary: "#93BBFB",
          // "primary-content": "#212638",
          // secondary: "#DAE8FF",
          // "secondary-content": "#212638",
          // accent: "#93BBFB",
          // "accent-content": "#212638",
          // neutral: "#212638",
          // "neutral-content": "#ffffff",
          // "base-100": "#ffffff",
          // "base-200": "#f4f8ff",
          // "base-300": "#DAE8FF",
          // "base-content": "#212638",
          // info: "#93BBFB",
          // success: "#34EEB6",
          // warning: "#FFCF72",
          // error: "#FF8863",

          // "--rounded-btn": "0.2rem",
          // "--rounded-box": "0rem",

          // ".tooltip": {
          //   "--tooltip-tail": "6px",
          // },
          // ".link": {
          //   textUnderlineOffset: "2px",
          // },
          // ".link:hover": {
          //   opacity: "80%",
          // },
          ".input": {
            background: "#1D2329",
            borderRadius: "4px"
          },
          ".textarea": {
            background: "#1D2329",
            borderRadius: "4px"
          }
        },
      },
      {
        dark: {
          primary: "#0E0F11",  //#475569

          secondary: "#0A371B",
          neutral: "#FFF",
          success: "#feb800",
          "base-100": "#121418",
          "base-200": "#475569",
          "base-300": "#777D84",
          warning: "#B32C2D",

          "secondary-content": "#1a1d29",
          accent: "#10DA5D",
          "accent-content": "#212638",
          "neutral-content": "#ffffff",
          // "base-300": "#DAE8FF",
          "base-content": "#FFF",
          info: "#93BBFB",
          error: "#FF8863",

          "--rounded-btn": "0.8rem",
          "--rounded-box": "0rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
          // primary: "#93BBFB",
          // "primary-content": "#212638",
          // secondary: "#DAE8FF",
          // "secondary-content": "#212638",
          // accent: "#93BBFB",
          // "accent-content": "#212638",
          // neutral: "#212638",
          // "neutral-content": "#ffffff",
          // "base-100": "#ffffff",
          // "base-200": "#f4f8ff",
          // "base-300": "#DAE8FF",
          // "base-content": "#212638",
          // info: "#93BBFB",
          // success: "#34EEB6",
          // warning: "#FFCF72",
          // error: "#FF8863",

          // "--rounded-btn": "0.2rem",
          // "--rounded-box": "0rem",

          // ".tooltip": {
          //   "--tooltip-tail": "6px",
          // },
          // ".link": {
          //   textUnderlineOffset: "2px",
          // },
          // ".link:hover": {
          //   opacity: "80%",
          // },
          ".input": {
            background: "#1D2329",
            borderRadius: "4px"
          },
          ".textarea": {
            background: "#1D2329",
            borderRadius: "4px"
          }
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      animation: {
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        'custom-bounce': 'bounce 0.1s infinite',
      },
    },
    variants: {
      extend: {
        animation: ['hover'],
      }
    }
  },
};
