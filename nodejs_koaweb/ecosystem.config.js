module.exports = {
  apps: 
  [
  {
    name: 'foo',
    script: 'main.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    exec_mode: "cluster",
    autorestart: true,
    min_uptime: "60s",
    max_restarts: 3,
    watch: false,
    max_memory_restart: '1G'
  }
  ],
};
