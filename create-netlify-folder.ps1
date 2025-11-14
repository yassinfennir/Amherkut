# Script PowerShell para crear carpeta limpia para Netlify
# Ejecuta: .\create-netlify-folder.ps1

$sourceFolder = "."
$targetFolder = "amherkut-netlify"

# Crear carpeta destino
if (Test-Path $targetFolder) {
    Remove-Item $targetFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $targetFolder | Out-Null

Write-Host "Creando carpeta optimizada para Netlify..." -ForegroundColor Green

# Archivos esenciales a copiar
$essentialFiles = @(
    "index.html",
    "productos.html",
    "productos-simple.html",
    "productos.json",
    "manifest.json",
    "sitemap.xml",
    "robots.txt",
    "sw.js",
    "netlify.toml",
    "_redirects"
)

# Copiar archivos esenciales
foreach ($file in $essentialFiles) {
    if (Test-Path $file) {
        Copy-Item $file -Destination $targetFolder -Force
        Write-Host "Copiado: $file" -ForegroundColor Cyan
    }
}

# Copiar carpetas esenciales
$essentialFolders = @(
    "assets",
    "photos",
    "config",
    "data"
)

foreach ($folder in $essentialFolders) {
    if (Test-Path $folder) {
        Copy-Item $folder -Destination $targetFolder -Recurse -Force
        Write-Host "Copiada carpeta: $folder" -ForegroundColor Cyan
    }
}

# Eliminar videos de la carpeta photos si existen
$photosPath = Join-Path $targetFolder "photos"
if (Test-Path $photosPath) {
    Get-ChildItem -Path $photosPath -Recurse -Include *.mp4,*.mov,*.avi,*.mkv | Remove-Item -Force
    Write-Host "Videos eliminados de photos/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Carpeta $targetFolder creada exitosamente!" -ForegroundColor Green
Write-Host "Ahora puedes arrastrar $targetFolder a Netlify Drop" -ForegroundColor Yellow
Write-Host ""
