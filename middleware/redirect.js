import redirects from "../assets/redirect";

export default function(ctx) {
  redirects.forEach(el => {
    if (ctx.route.fullPath.startsWith(el.path)) ctx.redirect(301, el.target);
  });
}
