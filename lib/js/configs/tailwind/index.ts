import type { Config } from "tailwindcss"

import formsPlugin from "@tailwindcss/forms"
import typographyPlugin from "@tailwindcss/typography"
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
    typographyPlugin,
    formsPlugin,
    // Custom plugin
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
