import fs from 'node:fs'
import links from "./assets/links";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts"],

  googleFonts: {
    families: {
      Comfortaa: [400, 700],
    },
  },

  hooks: {
    "build:done"() {
      const file = links
        .filter(link => !link.page)
        .map(link => `${link.path} ${link.target} 301`)
        .join("\n");

      fs.writeFileSync("public/_redirects", `# Generated by Nuxt \n${file}`);
    },
  },

  compatibilityDate: "2025-02-06"
});