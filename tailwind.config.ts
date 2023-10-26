import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        baseTheme: {
          primary: "#075985",
          secondary: "#115e59",
          accent: "#7c3aed",
          neutral: "#302640",
          "base-100": "#161b21",
          info: "#6b7280",
          success: "#15803d",
          warning: "#8e5a10",
          error: "#ea1f48",
          body: {
            "background-color": "#121418",
          }
        },
      },
    ],
  },
}
export default config
