import redirects from "./assets/redirect";

export default {
  buildModules: ["@nuxt/postcss8"],
  ssr: false,
  head: {
    title: "Creative Code Berlin",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content: "",
      },
    ],

    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.png",
      },
      {
        href: "favicon.png",
        rel: "shortcut icon",
        type: "image/x-icon",
      },
      {
        href: "/logo.png",
        rel: "apple-touch-icon",
      },
      {
        rel: "stylesheet",
        href: "https://use.typekit.net/cpf6ngv.css",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Comfortaa&display=swap",
        crossorigin: "",
      },
    ],
  },
  loading: {
    color: "#fff",
  },
  router: {
    // ran before every route on both client and server
    middleware: ["redirect"],
  },
  css: ["@/assets/main.pcss"],
  build: {
    postcss: {
      plugins: {
        "postcss-nested": {},
      },
    },
  },

  generate: {
    routes: redirects.map((link) => link.path),
  },
};
