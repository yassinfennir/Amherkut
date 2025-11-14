# Versión TINY - Solo lo MÍNIMO ABSOLUTO para funcionar
# Objetivo: <2MB total

$targetFolder = "amherkut-tiny"

if (Test-Path $targetFolder) {
    Remove-Item $targetFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $targetFolder | Out-Null

Write-Host "Creando version TINY (<2MB)..." -ForegroundColor Green

# Solo archivos CRÍTICOS
Copy-Item "index.html" -Destination $targetFolder -Force
Copy-Item "netlify.toml" -Destination $targetFolder -Force
Copy-Item "_redirects" -Destination $targetFolder -Force
Copy-Item "productos.json" -Destination $targetFolder -Force

Write-Host "Archivos base copiados" -ForegroundColor Cyan

# Assets - SOLO CSS (sin JS pesados, sin imágenes)
New-Item -ItemType Directory -Path "$targetFolder\assets\css" | Out-Null
if (Test-Path "assets\css\styles.css") {
    Copy-Item "assets\css\styles.css" -Destination "$targetFolder\assets\css" -Force
}

# Solo 1 icono mínimo
New-Item -ItemType Directory -Path "$targetFolder\assets\icons" | Out-Null
$iconFiles = Get-ChildItem -Path "assets\icons" -File | Sort-Object Length | Select-Object -First 1
if ($iconFiles) {
    Copy-Item $iconFiles.FullName -Destination "$targetFolder\assets\icons" -Force
}

# Photos - SOLO 1 imagen pequeña TOTAL (no por categoría)
New-Item -ItemType Directory -Path "$targetFolder\photos" | Out-Null
$allPhotos = Get-ChildItem -Path "photos" -Recurse -File -Include *.jpg,*.png | Where-Object { $_.Length -lt 500KB } | Sort-Object Length | Select-Object -First 4
foreach ($photo in $allPhotos) {
    $relativePath = $photo.FullName.Replace((Get-Location).Path + "\photos\", "")
    $destPath = Join-Path $targetFolder "photos\$relativePath"
    $destDir = Split-Path $destPath -Parent
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }
    Copy-Item $photo.FullName -Destination $destPath -Force
    Write-Host "  Foto: $relativePath ($([math]::Round($photo.Length / 1KB, 2)) KB)" -ForegroundColor Yellow
}

# Config - solo lo esencial
if (Test-Path "config\site-config.json") {
    New-Item -ItemType Directory -Path "$targetFolder\config" | Out-Null
    Copy-Item "config\site-config.json" -Destination "$targetFolder\config" -Force
}

# Data - solo productos.json (ya copiado arriba)

$finalSize = (Get-ChildItem -Path $targetFolder -Recurse -File | Measure-Object -Property Length -Sum).Sum
$finalSizeMB = [math]::Round($finalSize / 1MB, 2)
$finalCount = (Get-ChildItem -Path $targetFolder -Recurse -File).Count

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "TINY creada: $targetFolder" -ForegroundColor Green
Write-Host "Tamaño: $finalSizeMB MB" -ForegroundColor Yellow
Write-Host "Archivos: $finalCount" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

if ($finalSizeMB -gt 5) {
    Write-Host "ADVERTENCIA: Aún es grande para Drop" -ForegroundColor Red
    Write-Host "MEJOR: Usa Git + Netlify (más confiable)" -ForegroundColor Yellow
} else {
    Write-Host "Prueba arrastrar '$targetFolder' a Netlify Drop" -ForegroundColor Cyan
}

Write-Host ""

