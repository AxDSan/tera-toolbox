const RequiredVersion = '6.0.5';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { isAdmin } = require('./utils');

function updateRequired() {
    return process.versions.electron !== RequiredVersion;
}

async function update() {
    const RunAsAdmin = await isAdmin();

    const request = require('request-promise-native');
    const data = await request({ url: `https://github.com/electron/electron/releases/download/v${RequiredVersion}/electron-v${RequiredVersion}-${process.platform}-${process.arch}.zip`, headers: {'Accept': 'application/octet-stream', 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'}, encoding: null, jar: true });
    fs.writeFileSync(path.join(__dirname, '..', 'electron.zip'), data);

    let main = spawn(path.join(__dirname, '..', RunAsAdmin ? 'TeraToolbox.exe' : 'TeraToolbox_NoAdmin.exe'), [], { detached: true });
    main.unref();
}

module.exports = { RequiredVersion, updateRequired, update };
