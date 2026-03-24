import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {

      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
        subheading: ['var(--font-subheading)'],
      },

      fontSize: {
        h1: ["2.25rem", { lineHeight: "2.8rem", letterSpacing: "-0.02em" }],
        h2: ["1.75rem", { lineHeight: "2.3rem", letterSpacing: "-0.015em" }],
        h3: ["1.35rem", { lineHeight: "1.9rem", letterSpacing: "-0.01em" }],
        h4: ["1.1rem", { lineHeight: "1.6rem", letterSpacing: "-0.005em" }],

        body: ["1rem", { lineHeight: "1.6rem" }],
        small: ["0.85rem", { lineHeight: "1.3rem" }],
      },

      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-muted": "var(--color-surface-muted)",

        primary: "var(--color-primary)",
        accent: "var(--color-accent)",

        text: "var(--color-text)",
        "text-muted": "var(--color-text-muted)",

        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",
      },

    },
  },
  plugins: [],
}

export default config