# run-dev.ps1 - start backend and frontend dev server
# Usage: Right-click -> Run with PowerShell, or from PowerShell: .\run-dev.ps1

$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Start backend using the backend\run.ps1 script (hidden window)
$BackendScript = Join-Path $RepoRoot "backend\run.ps1"
Write-Host "Starting backend by running: $BackendScript"
Start-Process -FilePath powershell -ArgumentList '-NoProfile','-ExecutionPolicy','Bypass','-File',"$BackendScript" -WindowStyle Hidden
Start-Sleep -Seconds 2

# Start frontend in a new cmd window so the Vite console stays visible
$FrontendPath = Join-Path $RepoRoot 'frontend'
Write-Host "Starting frontend (npm run dev) in: $FrontendPath"
$cmd = "cd /d `"$FrontendPath`" && npm run dev"
Start-Process -FilePath cmd.exe -ArgumentList '/k', $cmd -WorkingDirectory $FrontendPath

Write-Host "run-dev: backend and frontend start commands issued. Check the separate windows for logs."