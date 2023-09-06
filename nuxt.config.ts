import fs from 'node:fs'
import redirects from "./assets/redirects";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Comfortaa: true,
    },
  },
  hooks: {
    "build:done"() {
        const file = redirects.map((redirect) => {
          return `${redirect.path}/ ${redirect.target} 200`;
        }).join("\n");

        fs.writeFileSync("public/_redirects",file);
      },
    }
});
