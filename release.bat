@echo off
REM nest-chat-customer one-click release (Git Bash wrapper)
REM Usage: release.bat [version]   e.g. release.bat v1.0.1
cd /d %~dp0
"C:\Program Files\Git\bin\bash.exe" release.sh %*
pause
