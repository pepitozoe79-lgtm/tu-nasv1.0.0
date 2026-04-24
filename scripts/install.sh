#!/bin/bash
set -euo pipefail

echo "🚀 Instalando tu-nas..."

# 1. Instalar Docker si no existe
if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com | sh
fi

# 2. Instalar Git si no existe
if ! command -v git &> /dev/null; then
  apt-get update -qq && apt-get install -y -qq git >/dev/null
fi

# 3. Preparar el directorio
rm -rf /opt/tu-nas

# 4. Clonar el repositorio completo
echo "📦 Descargando código fuente..."
git clone https://github.com/pepitozoe79-lgtm/tu-nasv1.0.0.git /opt/tu-nas

# 5. Levantar el sistema
echo "⚙️ Construyendo y levantando contenedores..."
cd /opt/tu-nas
docker compose up -d --build

echo "✅ tu-nas instalado y corriendo en http://localhost"
