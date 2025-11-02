param(
    [string]$VenvName = "venv311"
)

# Navigate to backend folder (script location)
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
Set-Location $ScriptDir

Write-Host "Using venv: $VenvName"

# Create venv if it doesn't exist
if (-not (Test-Path "./$VenvName")) {
    Write-Host "Virtual environment not found. Creating $VenvName..."
    if (Get-Command py -ErrorAction SilentlyContinue) {
        py -3.11 -m venv $VenvName
    } else {
        python -m venv $VenvName
    }
    Write-Host "Upgrading pip and installing requirements..."
    & ".\$VenvName\Scripts\python.exe" -m pip install --upgrade pip
    & ".\$VenvName\Scripts\python.exe" -m pip install -r requirements.txt
} else {
    Write-Host "Virtual environment exists. Skipping creation."
}

Write-Host "Starting backend with uvicorn (detached window)..."
Start-Process -FilePath ".\$VenvName\Scripts\python.exe" -ArgumentList '-m','uvicorn','main:app','--host','0.0.0.0','--port','8000' -WindowStyle Normal
Write-Host "Backend start command issued. Uvicorn will run in a separate window."