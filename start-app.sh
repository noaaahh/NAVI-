#!/bin/bash

echo "Iniciando aplicacion SAVI..."
echo

echo "Verificando que XAMPP este ejecutandose..."
echo "Si no esta ejecutandose, inicia XAMPP manualmente"
echo

echo "Iniciando Frontend (React)..."
cd frontend
npm run dev &
FRONTEND_PID=$!

echo
echo "Iniciando Backend (PHP)..."
echo "El backend ya esta disponible en: http://localhost/NAVI--main/backend/"
echo

echo "Aplicacion iniciada!"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost/NAVI--main/backend/"
echo

# Esperar a que el usuario presione Ctrl+C
trap "echo 'Cerrando aplicacion...'; kill $FRONTEND_PID; exit" INT
wait
