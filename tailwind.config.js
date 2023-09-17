/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleInCenter: {
          '0%': {
            // transform: 'scale(0)',
            opacity: '0'
          },
          '100%': {
            // transform: 'scale(1)',
            opacity: '1'
          }
        },
        scaleOutCenter: {
          '0%': {
            opacity: '0'
          },
          '10%': {
            // transform: 'scale(1)',
            opacity: '1'
          },
          '100%': {
            // transform: 'scale(0)',
            opacity: '0'
          }
        },
      },
      animation: {
        'scaleInCenter': 'scaleInCenter 1s ease-in-out 1 forwards',
        'scaleOutCenter': 'scaleOutCenter 1s ease-in-out 1 forwards',
      }

    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      mytheme1: {
        "primary": "#080a91",
        "secondary": "#d6d62c",
        "accent": "#aaffd9",
        "neutral": "#202B32",
        "base-100": "#383A51",
        "info": "#5B85F1",
        "success": "#135852",
        "warning": "#94710A",
        "error": "#EA7775",
      },
    },

    {
      mytheme2: {
        "primary": "#8bd354",
        "secondary": "#cc2a73",
        "accent": "#2821f2",
        "neutral": "#24202D",
        "base-100": "#374C5C",
        "info": "#1659E9",
        "success": "#4BD89D",
        "warning": "#C16F0B",
        "error": "#F4153A",
      },
    },

    {
      mytheme3: {
        "primary": "#3b82f6",
        "secondary": "#6ee9f4",
        "accent": "#20bf6f",
        "neutral": "#221924",
        "base-100": "#374151",
        "info": "#9EB9EA",
        "success": "#1AC77C",
        "warning": "#AF6504",
        "error": "#EA413E",
      },
    },

    {
      mytheme4: {
        "primary": "#193c8e",
        "secondary": "#1f719e",
        "accent": "#30e898",
        "neutral": "#16161d",
        "base-100": "#fcfcfd",
        "info": "#4cacf0",
        "success": "#187c63",
        "warning": "#c99908",
        "error": "#f45b4e",
      },
    },

    {
      mytheme5: {
        "primary": "#01a598",
        "secondary": "#f7e4b2",
        "accent": "#7ded85",
        "neutral": "#301d35",
        "base-100": "#e9e8ed",
        "info": "#aab7e4",
        "success": "#54e8aa",
        "warning": "#ae790f",
        "error": "#e6432d",
      },
    },"light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
  },
}

