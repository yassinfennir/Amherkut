@echo off
echo ========================================
echo   ACTUALIZAR PAGINA EN NETLIFY
echo ========================================
echo.

echo Agregando cambios...
git add .

echo.
echo Escribe un mensaje para esta actualizacion:
set /p mensaje="Mensaje: "

echo.
echo Guardando cambios...
git commit -m "%mensaje%"

echo.
echo Subiendo a GitHub...
git push

echo.
echo ========================================
echo   LISTO!
echo ========================================
echo.
echo Netlify actualizara tu pagina automaticamente
echo en 1-2 minutos.
echo.
echo Ve a: https://app.netlify.com
echo.
pause

