@echo off
echo Iniciando aplicacion SAVI...
echo.

echo Verificando que XAMPP este ejecutandose...
echo Si no esta ejecutandose, inicia XAMPP manualmente
echo.

echo Iniciando Frontend (React)...
start "Frontend React" cmd /k "cd frontend && npm run dev"

echo.
echo Iniciando Backend (PHP)...
echo El backend ya esta disponible en: http://localhost/NAVI--main/backend/
echo.

echo Aplicacion iniciada!
echo Frontend: http://localhost:5173
echo Backend: http://localhost/NAVI--main/backend/
echo.
pause
