module.exports = {
  apps: [
    {
      name: "mapguru",
      script: "npm start",
      watch: true,
      instances: 1,
      ignore_watch: ["node_modules", ".git", ".next", ".vercel"],
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
