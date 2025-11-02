# Simple run-tests.ps1 - quick smoke tests for frontend and backend
$errors = @()

try {
  $b = Invoke-RestMethod http://localhost:8000/ -TimeoutSec 5
  Write-Host "Backend: OK - $($b.message)"
} catch {
  Write-Host "Backend: FAILED - $_"
  $errors += 'backend'
}

try {
  $f = Invoke-WebRequest http://localhost:3000/ -UseBasicParsing -TimeoutSec 5
  Write-Host "Frontend: OK - HTTP $($f.StatusCode)"
} catch {
  Write-Host "Frontend: FAILED - $_"
  $errors += 'frontend'
}

if ($errors.Count -gt 0) {
  Write-Host "Some checks failed: $($errors -join ', ')" -ForegroundColor Red
  exit 1
} else {
  Write-Host "All smoke checks passed." -ForegroundColor Green
  exit 0
}
