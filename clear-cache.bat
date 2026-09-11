@echo off
echo Clearing Angular cache...
rmdir /s /q .angular 2>nul
echo Cache cleared!
echo.
echo You can now run: npm start or ng serve
pause
