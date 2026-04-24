#!/bin/bash
set -euo pipefail

echo "🚀 Instalando tu-nas..."

if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com | sh
fi

sudo mkdir -p /opt/tu-nas

curl -fsSL https://raw.githubusercontent.com/tuusuario/tu-nas/main/docker-compose.yml -o /opt/tu-nas/docker-compose.yml

cd /opt/tu-nas
docker compose up -d

echo "✅ tu-nas instalado en http://localhost"
