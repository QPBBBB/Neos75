@echo off
setlocal
set "RepositoryRoot=%~dp0"
"%RepositoryRoot%Tools\Python39\python.exe" -B "%RepositoryRoot%Code\Module\Screen\Utilities\WriteMarkdown.py" %*
exit /b %errorlevel%
