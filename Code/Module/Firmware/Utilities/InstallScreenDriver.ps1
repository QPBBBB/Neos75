param()

$ErrorActionPreference = 'Stop'
$RepositoryRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '../../../..')).Path
$DriverDirectory = Join-Path $RepositoryRoot 'Research/Driver'
$InstallerPath = Join-Path $DriverDirectory 'Package/driver_installer.exe'
$ConfigurationPath = Join-Path $DriverDirectory 'ScreenDrivers.txt'
$LogPath = Join-Path $DriverDirectory 'ScreenDriverInstall.log'
$ResultPath = Join-Path $DriverDirectory 'ScreenDriverInstall.json'
$Identity = [Security.Principal.WindowsIdentity]::GetCurrent()
$Principal = [Security.Principal.WindowsPrincipal]::new($Identity)
if (-not $Principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    throw 'Run this script as administrator after approving the screen driver installation.'
}
$ExpectedHash = '8a138938afc5e60a16cba99c12c4bb9161e3bb3cf48c382dee1f5374c91bf4da'
$ArchivePath = Join-Path $DriverDirectory 'Ub32DriverSetup.exe'
if ((Get-FileHash -LiteralPath $ArchivePath -Algorithm SHA256).Hash -ne $ExpectedHash) {
    throw 'Official driver archive hash mismatch.'
}
if ((Get-AuthenticodeSignature -LiteralPath $ArchivePath).Status -ne 'Valid') {
    throw 'Official driver archive signature is not valid.'
}
if ((Get-FileHash -LiteralPath $InstallerPath -Algorithm SHA256).Hash -ne 'ccd78a40e3db74a189f42e3eab93463ef6c214c4f928b586992d70863b094431') {
    throw 'Extracted official driver installer hash mismatch.'
}
$ExpectedConfiguration = 'winusb,UB32 Bootloader,5542,1000,9d7debbc-c85d-11d1-9eb4-006008c3a19a'
if ((Get-Content -LiteralPath $ConfigurationPath -Raw).Trim() -ne $ExpectedConfiguration) {
    throw 'The install list must contain only the screen DFU interface.'
}
& $InstallerPath --all --force $ConfigurationPath *> $LogPath
$InstallerExitCode = $LASTEXITCODE
[ordered]@{
    VendorId = '5542'
    ProductId = '1000'
    ExitCode = $InstallerExitCode
    CompletedUtc = [DateTime]::UtcNow.ToString('o')
} | ConvertTo-Json | Set-Content -LiteralPath $ResultPath -Encoding UTF8
exit $InstallerExitCode
