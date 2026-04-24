const fs = require('fs');
const { exec } = require('child_process');

function addProxy(domain, containerName, port = 80) {
  const config = `
server {
  listen 80;
  server_name ${domain};
  location / {
    proxy_pass http://${containerName}:${port};
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
`;
  fs.writeFileSync(`/opt/tu-nas/proxy/conf.d/${domain}.conf`, config);
  exec('docker exec tu-nas-proxy nginx -s reload');
}

module.exports = { addProxy };
