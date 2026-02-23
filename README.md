![Creative Code Berlin Logo](https://creativecode.berlin/logo.svg)

# Creative Code Berlin website


Welcome to the Creative Code Berlin website source code. You can view the site at [creativecode.berlin](http://creativecode.berlin)

## Build and run locally

After cloning the repo, follow these steps:

```shell
# Install dependencies
npm install

# Start development server
npm run dev
```

This renders the site locally. You can browse it at `http://localhost:3000`. The server has hot reloading, so your changes are reflected immediately in the browser.



## Netlify auto-deploy

If you want to publish any changes, create a new branch and work on that. Push the branch to GitHub and create a Pull Request (PR).

The Netlify integration will run "checks" in the PR, which include creating a pre-release preview. You can view this at `https://deploy-preview-NNN--vigilant-edison-dfd992.netlify.app`, where NNN is the PR number. If you push additional commits to the PR before merging, the checks will re-run and the preview will get updated.

Merging the PR to master deploys the changes on the live website.

The Netlify actions are triggered automagically through the Netlify App, which is configured under the repository's [Settings / GitHub Apps](https://github.com/CreativeCodeBerlin/creativecode.berlin/settings/installations).

## Adding artworks

Add the generated JSON generated to the [project.js file](/assets/projects.js).  
We must host ShaderToy sketches ourselves since 2026. [Here's how to do it](docs/shadertoy.md).


## More info on Nuxt

The site uses Vue with server-side rendering via Nuxt. More info on Nuxt: [Introduction](https://nuxt.com/docs/4.x/getting-started/introduction) and [Deployment](https://nuxt.com/docs/4.x/getting-started/deployment).

The short of it is that the site is authored like a dynamic single-page app built in Vue, except pages are pre-rendered by Nuxt on the server side for speed and static joy. The client-side dynamic fun begins in the `onMounted` hook in the Vue files.

You can build and view the site's production version locally like so:

```shell
npm run build
npm run preview
```

