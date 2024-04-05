import fs from 'node:fs'
import redirects from "./assets/links";

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
      const file = redirects.map((redirect) => {
        return `${redirect.path} ${redirect.target} 301`;
      }).join("\n");

      fs.writeFileSync("public/_redirects", file);
    },
  }
});
