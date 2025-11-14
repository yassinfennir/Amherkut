# Script para actualizar la página en Netlify automáticamente

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ACTUALIZAR PAGINA EN NETLIFY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Agregar cambios
Write-Host "Agregando cambios..." -ForegroundColor Yellow
git add .

Write-Host ""
$mensaje = Read-Host "Escribe un mensaje para esta actualización"

# Guardar cambios
Write-Host ""
Write-Host "Guardando cambios..." -ForegroundColor Yellow
git commit -m $mensaje

# Subir a GitHub
Write-Host ""
Write-Host "Subiendo a GitHub..." -ForegroundColor Yellow
git push

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  LISTO!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Netlify actualizará tu página automáticamente" -ForegroundColor Green
Write-Host "en 1-2 minutos." -ForegroundColor Green
Write-Host ""
Write-Host "Ve a: https://app.netlify.com" -ForegroundColor Cyan
Write-Host ""

