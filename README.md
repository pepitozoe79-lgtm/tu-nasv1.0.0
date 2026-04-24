<p align="center">
  <img src="banner.svg" alt="tu-nas Banner" width="100%" />
</p>

# tu-nas

**Tu nube personal que se repara sola.**

Instálala con un solo comando:

```bash
curl -fsSL https://raw.githubusercontent.com/pepitozoe79-lgtm/tu-nasv1.0.0/main/scripts/install.sh | bash
```

Abre `http://localhost` y tendrás un panel donde desplegar apps con un clic, ver el estado de tus nodos, y olvidarte de configuraciones manuales.

## ✨ Características principales

- **Instalación en una línea**.
- **Auto‑healing**: los contenedores caídos se reinician automáticamente.
- **Multi‑nodo**: añade más máquinas y el sistema redistribuye la carga.
- **Marketplace**: Jellyfin, Home Assistant, Nextcloud y más.
- **Docker Compose nativo**: tus apps se gestionan con Compose, sin magia.
- **Event‑Sourcing**: cada cambio queda registrado y puedes reconstruir el estado.

## 🧱 Arquitectura

```
[ tu PC / NAS / VPS ] → docker compose up
        ↓
[ Manager ] ←→ [ Agentes en otros nodos ]
        ↓
[ Apps (Docker Compose) ]
        ↓
[ Proxy Nginx dinámico ]
```

## 📦 Requisitos

- Linux con Docker y Docker Compose.
- (Opcional) Node.js 20 si quieres ejecutar el manager fuera de contenedores.

## 🤝 Contribuir

Lee [CONTRIBUTING.md] y abre un issue para discutir cambios. ¡Toda ayuda es bienvenida!

## 📜 Licencia

MIT
