const fs = require('fs');
const net = require('net');
const path = require('path');

const cliTools = require('@react-native-community/cli-tools');
const execa = require('execa');

const startPackagerScriptContent = `#!/bin/bash
cd ${process.cwd()}
yarn start
`;
const startPackagerBatScriptContent = `@echo off
title Start packager in workspace
cd ${process.cwd()}
yarn start
pause
exit
`;

const METRO_PORT_ALREADY_IN_USE_MESSAGE = 'Metro port already used, skipping packager launch';

async function isMetroPortInUse() {
  return new Promise((resolve, reject) => {
    const METRO_PORT = 8081;
    const server = net.createServer();
  
    server.once('error', function(err) {
      if (err.code === 'EADDRINUSE') {
        reject(METRO_PORT_ALREADY_IN_USE_MESSAGE);
        server.close();
      }
    });
    server.once('listening', function() {
      resolve();
      server.close();
    });
    server.listen(METRO_PORT);
  });
}

/**
 * Based on @react-native-community/cli startServerInWindow
 * 
 * https://github.com/react-native-community/cli/blob/d351048dd6c6b2324eab3fff74ddbe48ca41d4d7/packages/cli-platform-android/src/commands/buildAndroid/startServerInNewWindow.ts
 * 
 * but it runs the command inside workspace (with correct path to metro config)
 */
async function runPackagerInWorkspace() {
  try {
    await isMetroPortInUse();
  } catch (error) {
    console.warn(error);
    return;
  }

  const terminal = cliTools.getDefaultUserTerminal();
  const isWindows = /^win/.test(process.platform);
  const startPackagerScriptPath = path.join(__dirname, isWindows ? 'startCommand.bat' : 'startCommand.command');

  if (fs.existsSync(startPackagerScriptPath)) {
    fs.rmSync(startPackagerScriptPath);
  }

  fs.writeFileSync(
    startPackagerScriptPath,
    isWindows ? startPackagerBatScriptContent : startPackagerScriptContent,
    {
      encoding: 'utf-8',
      flag: 'w',
      mode: '777',
    },
  );

  if (process.platform === 'darwin') {
    try {
      return execa.sync('open', [ '-a', 'Terminal', startPackagerScriptPath ], { cwd: process.cwd() });
    } catch (error) {
      return execa.sync('open', [ startPackagerScriptPath ], { cwd: process.cwd() });
    }
  }

  if (process.platform === 'linux') {
    try {
      return execa.spawnSync(terminal, [ '-e', `sh ${startPackagerScriptPath}` ], { cwd: process.cwd(), detached: true });
    } catch (error) {
      return execa.spawnSync('sh', [ startPackagerScriptPath ], { cwd: process.cwd() });
    }
  }

  if (isWindows) {
    return execa('cmd.exe', [ '/C', startPackagerScriptPath ], { cwd: process.cwd(), detached: true, stdio: 'ignore' });
  }

  throw new Error('Cannot run packager for unsupported platform');
}

runPackagerInWorkspace();
