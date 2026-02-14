# 🔧 Solución Completa para Error de Netlify

## ❌ Error Actual
```
Error checking out repo. Please verify Netlify app installation on GitHub.
```

## 🎯 Causa del Problema

Este es un **sitio HTML estático** pero hay un `package.json` con scripts de React que confunde a Netlify. Netlify piensa que necesita hacer build cuando en realidad NO lo necesita.

## ✅ Solución Completa

### Opción 1: Configurar Netlify Manualmente (Recomendado)

1. **Ve a Netlify**: https://app.netlify.com
2. **Click en "Add new site" → "Import an existing project"**
3. **Selecciona "GitHub"** y autoriza Netlify
4. **Selecciona el repositorio**: `yassinfennir/Amherkut`
5. **Configura estos valores:**

   **Branch to deploy**: `main`
   
   **Build command**: (DEJAR VACÍO)
   ```
   (vacío - no escribir nada)
   ```
   
   **Publish directory**: 
   ```
   .
   ```

6. **Click en "Deploy site"**

### Opción 2: Usar Netlify Drop (Más Rápido - Sin GitHub)

1. **Ve a**: https://app.netlify.com/drop
2. **Arrastra toda la carpeta del proyecto**
3. **Obtén tu link en 30 segundos**

### Opción 3: Configurar en Site Settings

Si ya tienes el sitio creado:

1. **Ve a tu sitio en Netlify**
2. **Site settings → Build & deploy → Continuous Deployment**
3. **Click en "Edit settings"**
4. **Configura:**

   **Build command**: (vacío)
   ```
   
   ```

   **Publish directory**:
   ```
   .
   ```

5. **Guarda y haz "Trigger deploy"**

## 📋 Verificación de Archivos

El repositorio ya tiene:
- ✅ `netlify.toml` - Configurado correctamente
- ✅ `index.html` - En la raíz
- ✅ Todos los archivos necesarios

## ⚠️ Importante

**NO necesitas:**
- ❌ npm install
- ❌ npm run build
- ❌ Node.js
- ❌ Dependencias

**Este es un sitio HTML estático puro.**

## 🔄 Si el Error Persiste

1. **Verifica permisos de GitHub:**
   - GitHub → Settings → Applications → Authorized OAuth Apps
   - Asegúrate de que Netlify esté autorizado

2. **Desconecta y reconecta:**
   - Netlify → Site settings → Build & deploy
   - "Disconnect repository" → "Connect repository"

3. **Usa Netlify Drop** como alternativa rápida

---

**El archivo `netlify.toml` ya está actualizado y listo.**
