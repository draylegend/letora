# letora

## Development

```bash
bun run dev   # runs `nx serve app` (Angular dev server, HMR) + `electrobun dev` together
```

The desktop shell (Bun main process, window/menu/tray code) lives in `apps/desktop/src`, separate from the Angular UI in `apps/app` — they're different runtimes with different tsconfigs. Edit `apps/desktop/src/index.ts` and restart `electrobun dev` manually to see changes — do not use `electrobun dev --watch` on Windows, see below.

### Known issues

- **Killing `electrobun dev` leaves orphaned processes on Windows** ([electrobun#168](https://github.com/blackboardsh/electrobun/issues/168)): killing the app only kills the top-level `launcher.exe`; the actual `bun.exe` process and its WebView2 tree survive. Two symptoms:
  - With `--watch`, the next rebuild fails with `EACCES: permission denied, rm build\dev-win-x64` (the orphaned process still has those files open). Workaround: fully close the app window before the next edit, or just skip `--watch` and restart `electrobun dev` manually — UI iteration already gets HMR from the Angular dev server above, so `--watch` is rarely needed.
  - Without `--watch`, if a session gets killed from the terminal (not the window's close button), the orphaned `bun.exe`/WebView2 tree keeps holding the WebView2 user-data folder. The next `electrobun dev` then fails immediately with `ERROR: Failed to create WebView2 controller, HRESULT: 0x800700AA` (`ERROR_BUSY`). Fix: find and kill the leftover `bun.exe`/`launcher.exe`/`msedgewebview2.exe` processes under `build\dev-win-x64`, then retry.
