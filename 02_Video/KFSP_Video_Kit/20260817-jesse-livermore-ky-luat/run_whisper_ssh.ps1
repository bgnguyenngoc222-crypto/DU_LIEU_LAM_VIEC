# Run Whisper via SSH on Linux Media Server
# Usage: Open PowerShell -> .\run_whisper_ssh.ps1

$ErrorActionPreference = "Stop"

$LocalAudio = "audio/voice_full.mp3"
$LocalOutput = "audio/timestamps.json"
$RemoteHost = "kf-media-agent"
$RemoteAudio = "/home/media/voice_full.mp3"
$RemoteOutput = "/home/media/timestamps.json"
$RemotePython = "/home/media/myenv/bin/python"

if (-not (Test-Path $LocalAudio)) {
    Write-Error "Audio file not found: $LocalAudio"
}

# Create temp Python script
$PythonCode = @"
import whisper, json
model = whisper.load_model('small')
result = model.transcribe('$RemoteAudio', language='vi', word_timestamps=True)
output = []
for seg in result['segments']:
    entry = {
        's': round(seg['start'], 2),
        'e': round(seg['end'], 2),
        't': seg['text'].strip()
    }
    if 'words' in seg:
        entry['words'] = [{'w': w['word'].strip(), 's': round(w['start'], 2), 'e': round(w['end'], 2)} for w in seg['words']]
    output.append(entry)
with open('$RemoteOutput', 'w', encoding='utf-8') as f:
    json.dump(output, f, ensure_ascii=False, indent=2)
"@

$TmpPythonFile = "whisper_run_tmp.py"
$PythonCode | Out-File -FilePath $TmpPythonFile -Encoding ascii

Write-Host "1. Uploading audio and script to remote host ($RemoteHost)..." -ForegroundColor Cyan
scp $LocalAudio "media@${RemoteHost}:${RemoteAudio}"
scp $TmpPythonFile "media@${RemoteHost}:/home/media/whisper_run_tmp.py"

Write-Host "2. Running Whisper small model on Linux server..." -ForegroundColor Cyan
Write-Host "   (Please wait, this may take a few minutes for the first run)..." -ForegroundColor Yellow
ssh $RemoteHost "$RemotePython /home/media/whisper_run_tmp.py"

Write-Host "3. Downloading timestamps.json back to Windows..." -ForegroundColor Cyan
scp "media@${RemoteHost}:${RemoteOutput}" $LocalOutput

Write-Host "4. Cleaning up temporary files on both hosts..." -ForegroundColor Cyan
Remove-Item -Path $TmpPythonFile -Force -ErrorAction SilentlyContinue
ssh $RemoteHost "rm -f $RemoteAudio $RemoteOutput /home/media/whisper_run_tmp.py"

Write-Host "SUCCESS! Timestamps saved to: $LocalOutput" -ForegroundColor Green
Write-Host "Please send the contents of timestamps.json to Claude to sync Remotion timing." -ForegroundColor Green
