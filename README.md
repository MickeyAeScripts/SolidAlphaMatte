# SolidAlphaMatte 🎭

A tiny After Effects script that gives your selected layers a ready-to-use **alpha matte solid** in one click.

## What it does

Select one or more layers, run the script, and:

- **1 layer selected** — a white solid named `<layer> MATTE` is created directly above it, trimmed to the layer's in/out points, and set as the layer's **Alpha track matte**. The solid's video switch is turned off.
- **2+ layers selected** — **one shared** white solid is created above the topmost selected layer, trimmed to span the earliest in-point to the latest out-point, and **every** selected layer is alpha-matted to that same solid. The matte is left selected so you can mask or animate it right away.

It all happens inside a single undo step.

A full white solid changes nothing on its own — draw a mask on it or animate it, and it reveals/hides everything matted to it.

## Installation

### As a Regular Script
- Place `SolidAlphaMatte.jsx` in your **Scripts** folder and run via **File → Scripts → SolidAlphaMatte.jsx**:
  ```
  Windows: C:\Program Files\Adobe\Adobe After Effects [version]\Support Files\Scripts\
  macOS:   /Applications/Adobe After Effects [version]/Scripts/
  ```

### As a Hotkey (recommended)
- Keep the `.jsx` anywhere and trigger it from your hotkey tool of choice, e.g. AutoHotkey:
  ```ahk
  run, "<path-to-AfterFX.exe>" -r "C:\path\to\SolidAlphaMatte.jsx"
  ```

## Usage

1. **Open a composition.**
2. **Select 1 or more layers.**
3. **Run the script.**
4. **Done!** Mask or animate the new `MATTE` solid to shape the reveal.

## Example

```
✅ Select Layer A
✅ Select Layer B
✅ Select Layer C
🔘 Run SolidAlphaMatte
```

**Result:** one `MATTE` solid sits above the topmost of the three, and A, B and C all use it as their alpha matte.

## Requirements

- Adobe After Effects
- **Shared matte (2+ layers) needs After Effects 23.0 or newer** — it relies on `setTrackMatte`, which lets one layer feed many mattes.
- Single-layer mode also works on older versions (falls back to the legacy "matte directly above" behaviour).

## Notes

- The solid is comp-sized and white, named after the (topmost) selected layer + ` MATTE`.
- Nothing happens if no composition is active or no layers are selected.

## License

MIT
