# Electron: modal parent keeps the child's cursor (Linux)

Minimal reproduction for [electron/electron#54833](https://github.com/electron/electron/issues/54833), an Electron bug on Linux: while a modal child window is open, its disabled parent keeps showing whatever cursor the child set last (a crosshair, a text I-beam, or a resize cursor from a frameless child's edge) instead of its own cursor.

## Run

```bash
npm install
npm start
```

## Steps

1. Click **Open modal child**, move the pointer over the child's `cursor: crosshair` area, then move it over the parent and around it.
2. Close it and click **Open non-modal child (control)**, then repeat.
3. Click **Open frameless, resizable modal child**, hover its right edge until the resize cursor shows, then move over the parent.
4. Close it and click **Open frameless, resizable non-modal child (control)**, then repeat.

**Expected:** the parent shows its normal arrow in all four cases.

**Actual:** with a modal child (steps 1 and 3) the parent keeps the child's last cursor until the child closes. The non-modal controls (steps 2 and 4) behave correctly.

## Screencast

Ubuntu 22.04.5, GNOME Shell 42.9, X11, Electron 43.7.3:

SCREENCAST_PLACEHOLDER

## Versions

Reproduced on Electron 44.7.0, 43.7.6, 43.7.3, 30.5.1, 20.3.12, 10.4.7, 4.2.12 and 3.1.13, on GNOME (X11) and on Xvfb with no window manager.
