require('dotenv').config();

module.exports = {
  apps: [
    {
      name: "web-local",
      cwd: "./apps/web",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "development",
      }
    },
    {
      name: "api-local",
      cwd: "./apps/api",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "development",
        ENV_FILE_PATH: "../../.env"
      }
    },
    {
      name: "ws-local",
      cwd: "./apps/ws",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "development",
        ENV_FILE_PATH: "../../.env"
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
      env: {
        NODE_ENV: "development",
        ENV_FILE_PATH: "/home/ubuntu/.env.api.dev"
      }
    },
    {
      name: "ws-dev",
      cwd: "./apps/ws",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "development",
        ENV_FILE_PATH: "/home/ubuntu/.env.ws.dev"
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
      env: {
        NODE_ENV: "production",
        ENV_FILE_PATH: "/home/ubuntu/.env.api.prod"
      }
    },
    {
      name: "ws-prod",
      cwd: "./apps/ws",
      script: "pnpm",
      args: "start",
      env: {
        NODE_ENV: "production",
        ENV_FILE_PATH: "/home/ubuntu/.env.ws.prod"
      }
    }
  ]
};
