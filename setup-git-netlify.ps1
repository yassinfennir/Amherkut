# Script para configurar Git y preparar para Netlify
# Esto es MÁS CONFIABLE que Netlify Drop

Write-Host "Configurando Git para Netlify..." -ForegroundColor Green
Write-Host ""

# Verificar si Git está instalado
try {
    $gitVersion = git --version
    Write-Host "Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git no está instalado" -ForegroundColor Red
    Write-Host "Instala Git desde: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Inicializar Git si no existe
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando Git..." -ForegroundColor Cyan
    git init
    Write-Host "Git inicializado" -ForegroundColor Green
} else {
    Write-Host "Git ya está inicializado" -ForegroundColor Yellow
}

# Verificar .gitignore
if (Test-Path ".gitignore") {
    Write-Host ".gitignore encontrado" -ForegroundColor Green
} else {
    Write-Host "ERROR: .gitignore no encontrado" -ForegroundColor Red
    exit 1
}

# Agregar archivos
Write-Host ""
Write-Host "Agregando archivos a Git..." -ForegroundColor Cyan
git add .

# Verificar estado
Write-Host ""
Write-Host "Estado de Git:" -ForegroundColor Cyan
git status --short | Select-Object -First 20

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "SIGUIENTE PASO:" -ForegroundColor Yellow
Write-Host "1. Crea un repositorio en GitHub.com" -ForegroundColor White
Write-Host "2. Ejecuta estos comandos:" -ForegroundColor White
Write-Host ""
Write-Host "   git commit -m 'Initial commit'" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Luego en Netlify:" -ForegroundColor White
Write-Host "   - Add new site -> Import from Git" -ForegroundColor Cyan
Write-Host "   - Selecciona GitHub" -ForegroundColor Cyan
Write-Host "   - Elige tu repositorio" -ForegroundColor Cyan
Write-Host "   - Build command: (vacío)" -ForegroundColor Cyan
Write-Host "   - Publish directory: ." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green

