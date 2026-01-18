# 🎮 Arcade Hub - Neo-Retro Gaming Platform

Una plataforma de arcade moderna con tema neon oscuro, construida con Angular 17 y WebComponents. Incluye 5 juegos clásicos completamente funcionales.

## 🕹️ Juegos Incluidos

- **Hangman** - Adivina la palabra antes de perder
- **Wordle** - 5 letras, 6 intentos
- **Snake** - El clásico juego de serpiente
- **Parchís** - Tablero con 4 zonas de jugadores
- **Hundir la Flota** - Batalla naval contra IA

## 🛠️ Tecnologías

- **Angular 17** (Standalone Components)
- **TypeScript 5.2**
- **SCSS** con CSS Variables
- **RxJS**
- **Material Symbols Icons**

## 📦 Instalación Local

```bash
npm install
npm start
```

Abre [http://localhost:4200](http://localhost:4200)

## 🚀 Build para Producción

```bash
npm run build
```

## 🌐 Despliegue en Netlify

### Opción 1: Conexión con GitHub (Recomendado)

1. Conecta tu repositorio a Netlify
2. Netlify detectará automáticamente `netlify.toml`
3. Configuración automática:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/arcade-hub`

### Opción 2: Netlify CLI

```bash
npm install -g netlify-cli
netlify init
netlify deploy --prod
```

### Archivos de Configuración

- `netlify.toml` - Configuración de build y redirects
- `src/_redirects` - Configuración de rutas para SPA

## 📊 Estructura del Proyecto

```
arcade-hub/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/
│   │   │   └── services/
│   │   ├── layout/
│   │   ├── pages/
│   │   ├── shared/
│   │   │   └── webcomponents/
│   │   └── app.routes.ts
│   ├── styles.scss
│   └── main.ts
├── angular.json
├── netlify.toml
└── package.json
```

## 🎨 Diseño

- **Tema**: Neon Dark Mode
- **Colores Primarios**:
  - Cyan: `#00d4ff`
  - Magenta: `#ff00ff`
  - Rojo: `#ff006e`
  - Verde: `#1f883d`
- **Fondo**: `#0a0c10`
- **Mobile First**: Totalmente responsive

## 🔧 Solución de Problemas Netlify

### Build falla
- Verifica que `node_modules` no esté en `.gitignore`
- Asegúrate de que `netlify.toml` esté en la raíz
- Comprueba la versión de Node en Netlify (debe ser 18+)

### Rutas no funcionan
- Verifica que `_redirects` esté en `src/`
- Angular automáticamente lo copia a `dist/` en build
- El archivo debe contener: `/* /index.html 200`

### Dominio personalizado
1. Ve a Netlify Dashboard
2. Domain Settings > Add custom domain
3. Sigue las instrucciones DNS
4. Espera 24-48 horas para propagación

## 📝 Notas de Desarrollo

- Todos los juegos guardan scores en localStorage
- Sistema de puntuación en tiempo real
- IA adaptativa en Hundir la Flota
- Animaciones neon con CSS personalizado

## 👨‍💻 Autor

**Carlos Ortiz** - [GitHub](https://github.com/Solracort)

## 📄 Licencia

MIT
