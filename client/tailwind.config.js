/** @type {import('tailwindcss').Config} */
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-secondary-fixed-variant": "#00586b",
        "on-tertiary": "#fff0e5",
        "background": "#f5f7f9",
        "surface-container-highest": "#d9dde0",
        "outline": "#747779",
        "error-container": "#fb5151",
        "secondary-container": "#77dfff",
        "on-error-container": "#570008",
        "surface": "#f5f7f9",
        "error": "#b31b25",
        "on-secondary-container": "#004e60",
        "inverse-surface": "#0b0f10",
        "primary": "#0053cc",
        "on-surface-variant": "#595c5e",
        "inverse-primary": "#5b8cff",
        "on-tertiary-fixed": "#2b1600",
        "surface-container-lowest": "#ffffff",
        "tertiary-fixed": "#fd9d1a",
        "on-secondary": "#e0f6ff",
        "surface-variant": "#d9dde0",
        "on-surface": "#2c2f31",
        "primary-fixed-dim": "#608fff",
        "on-primary-fixed": "#000000",
        "surface-bright": "#f5f7f9",
        "on-tertiary-container": "#4c2b00",
        "secondary-dim": "#00576a",
        "on-error": "#ffefee",
        "on-secondary-fixed": "#003a47",
        "surface-container-high": "#dfe3e6",
        "secondary": "#006479",
        "secondary-fixed-dim": "#48d3f8",
        "primary-container": "#779dff",
        "surface-container": "#e5e9eb",
        "surface-tint": "#0053cc",
        "tertiary-fixed-dim": "#ed9000",
        "tertiary": "#854f00",
        "secondary-fixed": "#77dfff",
        "on-tertiary-fixed-variant": "#583300",
        "on-background": "#2c2f31",
        "primary-dim": "#0048b3",
        "surface-container-low": "#eef1f3",
        "primary-fixed": "#779dff",
        "outline-variant": "#abadaf",
        "tertiary-container": "#fd9d1a",
        "on-primary-fixed-variant": "#00286a",
        "error-dim": "#9f0519",
        "inverse-on-surface": "#9a9d9f",
        "tertiary-dim": "#744400",
        "on-primary-container": "#001f56"
      },
      fontFamily: {
        "headline": ["Manrope", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "label": ["Inter", "sans-serif"]
      },
      borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "1.5rem", "2xl": "1rem", "3xl": "1.5rem", "full": "9999px" },
    },
  },
  plugins: [
    containerQueries,
    forms
  ],
  important: true,
}
