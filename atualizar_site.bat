@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo  Atualizando o site (dados da planilha + codigo)
echo ============================================
echo.

python export_data.py
if errorlevel 1 (
    echo.
    echo ERRO ao ler o Excel. Feche o arquivo "Controle de Gastos.xlsx" se ele
    echo estiver aberto e tente novamente.
    echo.
    pause
    exit /b 1
)

echo.
git add -A

git diff --cached --quiet
if errorlevel 1 (
    git commit -m "Atualiza site" >nul
    echo.
    echo Enviando para o GitHub...
    echo (na primeira vez, uma janela do navegador pode abrir pedindo login)
    echo.
    git push
    if errorlevel 1 (
        echo.
        echo ERRO ao enviar para o GitHub. Verifique sua conexao com a internet
        echo e se o login foi concluido, depois tente novamente.
        echo.
        pause
        exit /b 1
    )
    echo.
    echo ============================================
    echo  Site atualizado! Deve aparecer no ar em
    echo  cerca de 1 minuto.
    echo ============================================
) else (
    echo.
    echo Nenhuma mudanca desde a ultima atualizacao.
)

echo.
pause
