@echo off
echo Starting Resume Builder Project...

REM Start backend server in a new command window
echo Starting backend server...
start cmd /k "cd %~dp0\backend && npm run dev"

REM Start frontend server in a new command window
echo Starting frontend server...
start cmd /k "cd %~dp0\frontend && npm run dev"

echo Both servers are now running in separate windows.
echo Close the server windows when you're done with development.
