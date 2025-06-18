@echo off

echo [Step 1] Changing to project root directory
cd ..

echo [Step 2] Installing pnpm globally
call npm install pnpm -g

echo [Step 3] Installing project dependencies
call pnpm i

echo [Step 4] Starting development server
call pnpm dev

if errorlevel 1 (
    echo Error: Failed to start development server
    pause
    exit /b 1
)

pause 