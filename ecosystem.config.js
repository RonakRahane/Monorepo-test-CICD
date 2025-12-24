module.exports = {
  apps: [
    
    {
      name: "web-local",
      cwd: "./apps/web",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "development"
      }
    },

    {
      name: "api-local",
      cwd: "./apps/api",
      script: "pnpm",
      args: "start",
      env_file: "../../.env",
      env: {
        NODE_ENV: "development"
      }
    },

    {
      name: "ws-local",
      cwd: "./apps/ws",
      script: "pnpm",
      args: "start",
      env_file: "../../.env",
      env: {
        NODE_ENV: "development"
      }
    },

    {
      name: "web-dev",
      cwd: "./apps/web",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "development"
      }
    },

    {
      name: "api-dev",
      cwd: "./apps/api",
      script: "pnpm",
      args: "start",
      env_file: "/home/ubuntu/.env.api.dev",
      env: {
        NODE_ENV: "development"
      }
    },

    {
      name: "ws-dev",
      cwd: "./apps/ws",
      script: "pnpm",
      args: "start",
      env_file: "/home/ubuntu/.env.ws.dev",
      env: {
        NODE_ENV: "development"
      }
    },

    {
      name: "web-prod",
      cwd: "./apps/web",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "production"
      }
    },

    {
      name: "api-prod",
      cwd: "./apps/api",
      script: "pnpm",
      args: "start",
      env_file: "/home/ubuntu/.env.api.prod",
      env: {
        NODE_ENV: "production"
      }
    },

    {
      name: "ws-prod",
      cwd: "./apps/ws",
      script: "pnpm",
      args: "start",
      env_file: "/home/ubuntu/.env.ws.prod",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
