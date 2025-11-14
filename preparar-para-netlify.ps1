# Script para preparar el proyecto para Netlify
# Elimina archivos grandes y crea una versión optimizada

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  PREPARANDO PROYECTO PARA NETLIFY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Crear carpeta para Netlify
$netlifyFolder = "amherkut-para-netlify"
if (Test-Path $netlifyFolder) {
    Remove-Item -Path $netlifyFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $netlifyFolder | Out-Null

Write-Host "✓ Carpeta creada: $netlifyFolder" -ForegroundColor Green

# Archivos esenciales a copiar
$essentialFiles = @(
    "index.html",
    "productos-simple.html",
    "productos.json",
    "manifest.json",
    "robots.txt",
    "sitemap.xml",
    "netlify.toml",
    "_redirects",
    ".gitignore"
)

# Copiar archivos esenciales
foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        Copy-Item -Path $file -Destination $netlifyFolder -Force
        Write-Host "✓ Copiado: $file" -ForegroundColor Green
    }
}

# Copiar carpetas esenciales
$essentialFolders = @(
    "assets",
    "config",
    "photos"
)

foreach ($folder in $essentialFolders) {
    if (Test-Path $folder) {
        $destPath = Join-Path $netlifyFolder $folder
        New-Item -ItemType Directory -Path $destPath -Force | Out-Null
        
        # Copiar solo archivos pequeños (menos de 2MB)
        $maxSize = 2MB
        Get-ChildItem -Path $folder -Recurse -File | Where-Object { $_.Length -lt $maxSize } | ForEach-Object {
            $relativePath = $_.FullName.Substring((Get-Location).Path.Length + 1)
            $destFile = Join-Path $netlifyFolder $relativePath
            $destDir = Split-Path $destFile -Parent
            if (-not (Test-Path $destDir)) {
                New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            }
            Copy-Item -Path $_.FullName -Destination $destFile -Force
        }
        Write-Host "✓ Copiada carpeta: $folder (solo archivos menores a 2MB)" -ForegroundColor Green
    }
}

# Eliminar videos de la carpeta photos
Write-Host ""
Write-Host "Eliminando videos grandes..." -ForegroundColor Yellow
Get-ChildItem -Path (Join-Path $netlifyFolder "photos") -Recurse -File | Where-Object { 
    $_.Extension -in @(".mp4", ".mov", ".avi", ".mkv") -or $_.Length -gt 5MB 
} | Remove-Item -Force
Write-Host "✓ Videos eliminados" -ForegroundColor Green

# Calcular tamaño total
$totalSize = (Get-ChildItem -Path $netlifyFolder -Recurse -File | Measure-Object -Property Length -Sum).Sum
$totalMB = [math]::Round($totalSize / 1MB, 2)
$fileCount = (Get-ChildItem -Path $netlifyFolder -Recurse -File).Count

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  PROYECTO LISTO PARA NETLIFY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host "Carpeta: $netlifyFolder" -ForegroundColor Yellow
Write-Host "Tamaño: $totalMB MB" -ForegroundColor Yellow
Write-Host "Archivos: $fileCount" -ForegroundColor Yellow
Write-Host ""
Write-Host "INSTRUCCIONES:" -ForegroundColor Cyan
Write-Host "1. Ve a: https://app.netlify.com" -ForegroundColor White
Write-Host "2. Add new site -> Import from Git -> GitHub" -ForegroundColor White
Write-Host "3. Busca: Amherkut" -ForegroundColor White
Write-Host "4. Build command: (VACIO)" -ForegroundColor White
Write-Host "5. Publish directory: ." -ForegroundColor White
Write-Host ""
Write-Host "O arrastra la carpeta '$netlifyFolder' a Netlify Drop" -ForegroundColor Green
Write-Host ""

