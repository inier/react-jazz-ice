module.exports = {
  apps: [
    {
      name: 'Admin-server',
      script: './server-test.js',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
