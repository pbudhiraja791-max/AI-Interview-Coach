import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const nodeCmd = process.execPath;

console.log('🚀 Starting AI Interview Coach Full Stack Application...');
console.log('📡 Backend: http://127.0.0.1:5050');
console.log('💻 Frontend: http://localhost:5173\n');

// 1. Spawn Backend Express Server
const serverProcess = spawn(nodeCmd, ['server/server.js'], {
  cwd: rootDir,
  stdio: 'inherit',
  env: { ...process.env, PORT: '5050' }
});

// 2. Spawn Frontend Vite Dev Server
const clientProcess = spawn(npmCmd, ['--prefix', 'client', 'run', 'dev'], {
  cwd: rootDir,
  stdio: 'inherit',
  env: process.env
});

function cleanup() {
  console.log('\n🛑 Shutting down AI Interview Coach servers...');
  try {
    if (serverProcess && !serverProcess.killed) {
      if (isWindows) {
        spawn('taskkill', ['/pid', serverProcess.pid.toString(), '/f', '/t']);
      } else {
        serverProcess.kill('SIGINT');
      }
    }
  } catch (e) {}

  try {
    if (clientProcess && !clientProcess.killed) {
      if (isWindows) {
        spawn('taskkill', ['/pid', clientProcess.pid.toString(), '/f', '/t']);
      } else {
        clientProcess.kill('SIGINT');
      }
    }
  } catch (e) {}

  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
