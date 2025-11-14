# Script automático para deploy a Netlify
# Este método es 100% confiable (no usa Drop)

Write-Host "========================================" -ForegroundColor Green
Write-Host "  DEPLOY AUTOMÁTICO A NETLIFY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Verificar Git
try {
    $gitVersion = git --version
    Write-Host "Git encontrado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git no está instalado" -ForegroundColor Red
    exit 1
}

# Verificar que estamos en un repo Git
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando Git..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Verificar remote
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "Repositorio remoto: $remote" -ForegroundColor Green
} else {
    Write-Host "ADVERTENCIA: No hay repositorio remoto configurado" -ForegroundColor Yellow
    Write-Host "Configura uno con: git remote add origin https://github.com/USUARIO/REPO.git" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Agregando archivos..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "Estado de cambios:" -ForegroundColor Cyan
git status --short | Select-Object -First 20

Write-Host ""
Write-Host "¿Hacer commit y push? (S/N)" -ForegroundColor Yellow
$response = Read-Host

if ($response -eq "S" -or $response -eq "s" -or $response -eq "Y" -or $response -eq "y") {
    Write-Host ""
    Write-Host "Haciendo commit..." -ForegroundColor Cyan
    git commit -m "Deploy to Netlify - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    
    Write-Host ""
    Write-Host "Haciendo push..." -ForegroundColor Cyan
    git push
    
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ¡CAMBIOS SUBIDOS A GITHUB!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "AHORA:" -ForegroundColor Yellow
    Write-Host "1. Ve a: https://app.netlify.com" -ForegroundColor White
    Write-Host "2. Click en: Add new site -> Import an existing project" -ForegroundColor White
    Write-Host "3. Selecciona: GitHub" -ForegroundColor White
    Write-Host "4. Busca tu repositorio: Amherkut" -ForegroundColor White
    Write-Host "5. Configuración:" -ForegroundColor White
    Write-Host "   - Build command: (VACÍO)" -ForegroundColor Cyan
    Write-Host "   - Publish directory: ." -ForegroundColor Cyan
    Write-Host "6. Click en: Deploy site" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "Cancelado. Ejecuta manualmente:" -ForegroundColor Yellow
    Write-Host "  git commit -m 'Deploy to Netlify'" -ForegroundColor Cyan
    Write-Host "  git push" -ForegroundColor Cyan
}

