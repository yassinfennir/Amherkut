# Versión ULTRA MINIMAL - Solo lo absolutamente esencial
# Máximo 5MB para Netlify Drop

$targetFolder = "amherkut-ultra-minimal"

if (Test-Path $targetFolder) {
    Remove-Item $targetFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $targetFolder | Out-Null

Write-Host "Creando version ULTRA MINIMAL (<5MB)..." -ForegroundColor Green

# Solo archivos CRÍTICOS
Copy-Item "index.html" -Destination $targetFolder -Force
Copy-Item "netlify.toml" -Destination $targetFolder -Force
Copy-Item "_redirects" -Destination $targetFolder -Force
Copy-Item "productos.json" -Destination $targetFolder -Force

Write-Host "Archivos base copiados" -ForegroundColor Cyan

# Assets - SOLO CSS y JS esenciales (sin imágenes)
New-Item -ItemType Directory -Path "$targetFolder\assets\css" | Out-Null
Copy-Item "assets\css\styles.css" -Destination "$targetFolder\assets\css" -Force -ErrorAction SilentlyContinue

New-Item -ItemType Directory -Path "$targetFolder\assets\js" | Out-Null
$essentialJS = @("language-switcher-v2.js")
foreach ($js in $essentialJS) {
    if (Test-Path "assets\js\$js") {
        Copy-Item "assets\js\$js" -Destination "$targetFolder\assets\js" -Force
    }
}

# Solo 1 icono pequeño
New-Item -ItemType Directory -Path "$targetFolder\assets\icons" | Out-Null
if (Test-Path "assets\icons\amherkut-logo-original.jpg") {
    Copy-Item "assets\icons\amherkut-logo-original.jpg" -Destination "$targetFolder\assets\icons" -Force -ErrorAction SilentlyContinue
}

# Photos - SOLO 1 imagen por categoría (las más pequeñas)
New-Item -ItemType Directory -Path "$targetFolder\photos" | Out-Null
$categories = @("FOOD", "DRINKS", "SWEET", "Bread")
foreach ($cat in $categories) {
    if (Test-Path "photos\$cat") {
        $catPath = Join-Path $targetFolder "photos\$cat"
        New-Item -ItemType Directory -Path $catPath | Out-Null
        
        # Solo la imagen más pequeña de cada categoría
        $smallest = Get-ChildItem -Path "photos\$cat" -File | Sort-Object Length | Select-Object -First 1
        if ($smallest) {
            Copy-Item $smallest.FullName -Destination $catPath -Force
            Write-Host "  $cat : 1 imagen ($([math]::Round($smallest.Length / 1KB, 2)) KB)" -ForegroundColor Yellow
        }
    }
}

# Config
if (Test-Path "config") {
    Copy-Item "config" -Destination $targetFolder -Recurse -Force
}

# Data
if (Test-Path "data") {
    Copy-Item "data" -Destination $targetFolder -Recurse -Force
}

$finalSize = (Get-ChildItem -Path $targetFolder -Recurse -File | Measure-Object -Property Length -Sum).Sum
$finalSizeMB = [math]::Round($finalSize / 1MB, 2)
$finalCount = (Get-ChildItem -Path $targetFolder -Recurse -File).Count

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "ULTRA MINIMAL creada: $targetFolder" -ForegroundColor Green
Write-Host "Tamaño: $finalSizeMB MB" -ForegroundColor Yellow
Write-Host "Archivos: $finalCount" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Prueba arrastrar '$targetFolder' a Netlify Drop" -ForegroundColor Cyan
Write-Host ""
Write-Host "O MEJOR: Usa Git + Netlify (más confiable)" -ForegroundColor Yellow
Write-Host ""

