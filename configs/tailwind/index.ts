import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

export default {
  content: [],
  theme: {
    extend: {
      spacing: {
        unset: "unset"
      }
    }
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        "a.link": {
          "text-decoration": "underline"
        },
        ".invisible-scrollbar": {
          "scrollbar-width": "none"
        },
        ".invisible-scrollbar::-webkit-scrollbar": {
          display: "none"
        }
      })
    })
  ]
} satisfies Config
