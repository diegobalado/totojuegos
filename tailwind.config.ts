import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      theme: {
        minWidth: {
          "30r": "30rem",
        },
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-animated")],
} satisfies Config;
