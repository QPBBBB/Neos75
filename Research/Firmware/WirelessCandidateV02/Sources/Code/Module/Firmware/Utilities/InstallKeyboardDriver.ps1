param()

$ErrorActionPreference = 'Stop'
$RepositoryRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '../../../..')).Path
$DriverDirectory = Join-Path $RepositoryRoot 'Research/Driver'
$InstallerPath = Join-Path $DriverDirectory 'Package/driver_installer.exe'
$ConfigurationPath = Join-Path $DriverDirectory 'KeyboardDrivers.txt'
$OutputDirectory = Join-Path $DriverDirectory ('Keyboard' + [DateTime]::UtcNow.ToString('yyyyMMddTHHmmssZ'))
$Identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$Principal = [Security.Principal.WindowsPrincipal]::new($Identity)
if (-not $Principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    throw 'Run as administrator only after approval for the main keyboard DFU driver.'
}
$ArchivePath = Join-Path $DriverDirectory 'Ub32DriverSetup.exe'
if ((Get-FileHash -LiteralPath $ArchivePath -Algorithm SHA256).Hash -ne '8a138938afc5e60a16cba99c12c4bb9161e3bb3cf48c382dee1f5374c91bf4da') {
    throw 'Official driver archive hash mismatch.'
}
if ((Get-AuthenticodeSignature -LiteralPath $ArchivePath).Status -ne 'Valid') {
    throw 'Official driver archive signature is not valid.'
}
if ((Get-FileHash -LiteralPath $InstallerPath -Algorithm SHA256).Hash -ne 'ccd78a40e3db74a189f42e3eab93463ef6c214c4f928b586992d70863b094431') {
    throw 'Extracted official driver installer hash mismatch.'
}
$ExpectedConfiguration = 'winusb,UB32 Bootloader,2E3C,DF11,88bae032-5a81-49f0-bc3d-a4ff138216d6'
if ((Get-Content -LiteralPath $ConfigurationPath -Raw).Trim() -ne $ExpectedConfiguration) {
    throw 'Install list must contain only the main keyboard DFU interface.'
}
New-Item -ItemType Directory -Path $OutputDirectory -ErrorAction Stop | Out-Null
$LogPath = Join-Path $OutputDirectory 'Install.log'
& $InstallerPath --all --force $ConfigurationPath *> $LogPath
$InstallerExitCode = $LASTEXITCODE
[ordered]@{
    VendorId = '2E3C'
    ProductId = 'DF11'
    ExitCode = $InstallerExitCode
    CompletedUtc = [DateTime]::UtcNow.ToString('o')
    MainKeyboardFirmwareWritten = $false
} | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $OutputDirectory 'Result.json') -Encoding UTF8
exit $InstallerExitCode
