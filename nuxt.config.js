const pkg = require("./package");

export default {
  ssr: false,
  head: {
    title: pkg.name,
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: pkg.description
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.png"
      },
      {
        href: "favicon.png",
        rel: "shortcut icon",
        type: "image/x-icon"
      },
      {
        href: "/logo.png",
        rel: "apple-touch-icon"
      },
      {
        rel: "stylesheet",
        href: "https://use.typekit.net/cpf6ngv.css"
      }
    ]
  },
  loading: {
    color: "#fff"
  },
  router: {
    // ran before every route on both client and server
    middleware: ["redirect"]
  },
  css: ["@/assets/main.pcss"],
  build: {
    postcss: {
      plugins: {
        "postcss-nested": {}
      }
    }
  }
};
