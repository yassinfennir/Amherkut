# Script para crear versión MINIMAL para Netlify Drop
# Solo archivos absolutamente esenciales

$targetFolder = "amherkut-minimal"

# Limpiar si existe
if (Test-Path $targetFolder) {
    Remove-Item $targetFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $targetFolder | Out-Null

Write-Host "Creando version MINIMAL para Netlify..." -ForegroundColor Green

# Solo archivos CRÍTICOS
$criticalFiles = @(
    "index.html",
    "productos.json",
    "netlify.toml",
    "_redirects"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Copy-Item $file -Destination $targetFolder -Force
        Write-Host "Copiado: $file" -ForegroundColor Cyan
    }
}

# Solo assets esenciales (sin imágenes grandes)
if (Test-Path "assets") {
    New-Item -ItemType Directory -Path "$targetFolder\assets" | Out-Null
    
    # CSS
    if (Test-Path "assets\css") {
        Copy-Item "assets\css" -Destination "$targetFolder\assets" -Recurse -Force
        Write-Host "Copiada: assets\css" -ForegroundColor Cyan
    }
    
    # JS (solo esenciales)
    if (Test-Path "assets\js") {
        New-Item -ItemType Directory -Path "$targetFolder\assets\js" | Out-Null
        $essentialJS = @(
            "language-switcher-v2.js",
            "keywords-search.js"
        )
        foreach ($js in $essentialJS) {
            if (Test-Path "assets\js\$js") {
                Copy-Item "assets\js\$js" -Destination "$targetFolder\assets\js" -Force
                Write-Host "Copiado JS: $js" -ForegroundColor Cyan
            }
        }
    }
    
    # Solo iconos pequeños
    if (Test-Path "assets\icons") {
        Copy-Item "assets\icons" -Destination "$targetFolder\assets" -Recurse -Force
        Write-Host "Copiada: assets\icons" -ForegroundColor Cyan
    }
}

# Photos - SOLO imágenes pequeñas (menos de 2MB cada una)
if (Test-Path "photos") {
    New-Item -ItemType Directory -Path "$targetFolder\photos" | Out-Null
    
    Get-ChildItem -Path "photos" -Directory | ForEach-Object {
        $category = $_.Name
        $categoryPath = Join-Path $targetFolder "photos\$category"
        New-Item -ItemType Directory -Path $categoryPath | Out-Null
        
        Get-ChildItem -Path $_.FullName -File | Where-Object { $_.Length -lt 2MB } | ForEach-Object {
            Copy-Item $_.FullName -Destination $categoryPath -Force
        }
        
        $copied = (Get-ChildItem -Path $categoryPath -File).Count
        Write-Host "Photos\$category : $copied archivos (solo <2MB)" -ForegroundColor Yellow
    }
}

# Config
if (Test-Path "config") {
    Copy-Item "config" -Destination $targetFolder -Recurse -Force
    Write-Host "Copiada: config" -ForegroundColor Cyan
}

# Data
if (Test-Path "data") {
    Copy-Item "data" -Destination $targetFolder -Recurse -Force
    Write-Host "Copiada: data" -ForegroundColor Cyan
}

# Calcular tamaño final
$finalSize = (Get-ChildItem -Path $targetFolder -Recurse -File | Measure-Object -Property Length -Sum).Sum
$finalSizeMB = [math]::Round($finalSize / 1MB, 2)
$finalCount = (Get-ChildItem -Path $targetFolder -Recurse -File).Count

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Carpeta MINIMAL creada: $targetFolder" -ForegroundColor Green
Write-Host "Tamaño total: $finalSizeMB MB" -ForegroundColor Yellow
Write-Host "Archivos totales: $finalCount" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Ahora arrastra '$targetFolder' a Netlify Drop" -ForegroundColor Cyan
Write-Host ""

