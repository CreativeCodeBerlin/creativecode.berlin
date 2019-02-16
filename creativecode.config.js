module.exports = {
  apps: [{
    name: 'Creative Code Berlin',
    script: './node_modules/nuxt/bin/nuxt.js',

    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};