import { BrowserWindow, Updater } from 'electrobun/bun';

const DEV_SERVER_PORT = 4200;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

// ponytail: fixed 10s/300ms wait, bump DEV_SERVER_WAIT_MS if cold Angular
// builds ever take longer than that to start listening.
const DEV_SERVER_WAIT_MS = 10_000;
const DEV_SERVER_POLL_MS = 300;
const DEV_SERVER_MAX_ATTEMPTS = Math.ceil(
  DEV_SERVER_WAIT_MS / DEV_SERVER_POLL_MS,
);

async function waitForDevServer(): Promise<boolean> {
  for (let attempt = 0; attempt < DEV_SERVER_MAX_ATTEMPTS; attempt++) {
    try {
      await fetch(DEV_SERVER_URL, { method: 'HEAD' });
      return true;
    } catch {
      await new Promise(resolve => setTimeout(resolve, DEV_SERVER_POLL_MS));
    }
  }
  return false;
}

async function getMainViewUrl(): Promise<string> {
  const channel = await Updater.localInfo.channel();
  if (channel === 'dev') {
    if (await waitForDevServer()) {
      console.log(`HMR enabled: Using Angular dev server at ${DEV_SERVER_URL}`);
      return DEV_SERVER_URL;
    }
    console.log(
      "Angular dev server not running. Run 'bun run dev' for HMR support.",
    );
  }
  return 'views://mainview/index.html';
}

const url = await getMainViewUrl();

const mainWindow = new BrowserWindow({
  title: 'letora',
  url,
});

console.log(`letora started! (window #${mainWindow.id}, url: ${url})`);
