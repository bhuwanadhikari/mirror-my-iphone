# Mirror my iPhone

**iPhone Mirroring for your Mac, even in the EU, and for your AI agents.** See your iPhone on your Mac at a smooth 60 FPS and use it with your mouse and trackpad. Or let Claude and other AI agents use it for you: they see the screen, tap, swipe and type through an MCP server, a CLI or a local HTTP API, with no computer use needed. Free and open source.

**[Website](https://bhuwanadhikari.com.np/mirror-my-iphone/)** · [Install](#install) · [For AI agents](#let-claude-and-other-ai-agents-use-your-iphone) · [FAQ](#faq)

<img src="assets/screenshots/mirror-my-iphone-on-mac.png" width="600" alt="Mirror my iPhone on a Mac, showing an iPhone 15 home screen at 59 FPS over USB, with the Doctor sidebar reporting that mirroring and touch control are ready">

<img src="assets/screenshots/demo.webp" width="800" alt="Demo: an iPhone next to its live mirror on a Mac, with the mirrored screen following every tap">

## Install

You need a Mac with macOS 13 or later, an iPhone with a USB data cable, Xcode (or just `xcode-select --install`) and Python 3.10+ (`brew install python@3.12`).

```bash
git clone https://github.com/bhuwanadhikari/Mirror-my-iPhone.git
cd Mirror-my-iPhone
packaging/build_app.sh
cp -R "dist/Mirror my iPhone.app" /Applications/
open "/Applications/Mirror my iPhone.app"
```

The first launch takes about a minute to set itself up. Plug in your iPhone, tap **Trust**, and allow camera access when macOS asks (that's how the iPhone's screen reaches your Mac). The built-in Doctor walks you through the rest.

Or install it with Homebrew (this adds the repo as a tap; Homebrew 7 asks you to trust third-party taps):

```bash
brew tap bhuwanadhikari/mirror-my-iphone https://github.com/bhuwanadhikari/mirror-my-iphone
brew trust bhuwanadhikari/mirror-my-iphone
brew install --cask mirror-my-iphone
```

## Let Claude and other AI agents use your iPhone

Give Claude Code your iPhone with one command (the app must be open, with touch control ready):

```bash
claude mcp add --scope user mirror-my-iphone -- "/Applications/Mirror my iPhone.app/Contents/Resources/bin/mirror-my-iphone" mcp
```

Then ask something like *"Open Settings on my iPhone and turn on Dark Mode"*. Claude takes screenshots, reads what's on screen, and taps, swipes and types its way there, and you watch every touch on the mirrored screen as a blue dot. Claude Desktop, Cursor, VS Code, Codex CLI, Gemini CLI and other MCP clients run the same command ([setup for each](https://bhuwanadhikari.com.np/mirror-my-iphone/iphone-mcp-server/)). Agents without MCP can use the CLI (`mirror-my-iphone tap 196 400`) or the [HTTP API](#agent-api).

**No computer use needed.** Agents don't screenshot your Mac, look for the mirror window or move your mouse. They call tools that act on the iPhone itself: `describe_ui` gives them the exact point to tap for every button and field, each gesture comes back with a screenshot of the result, and you can keep using your Mac while they work. Apple's iPhone Mirroring has no API, so with it an agent could only use computer use.

## "iPhone Mirroring is not available in your country or region"?

<img src="assets/screenshots/iphone-mirroring-not-available-in-your-country-or-region.png" width="299" alt="macOS dialog: Unable to Connect to iPhone. iPhone Mirroring is not available in your country or region.">

That's what Apple's iPhone Mirroring shows across the EU, where Apple has switched it off, citing the Digital Markets Act (DMA). Mirror my iPhone doesn't rely on it: it reads the screen over USB like QuickTime does and taps through Apple's own developer tools, so it works in Germany, France, Italy, Spain, the Netherlands and everywhere else.

## Why Mirror my iPhone

- **Smooth 60 FPS:** scrolling, animations and videos look natural
- **Full control:** click to tap, drag to swipe, scroll with the trackpad, click and hold for a long press
- **Buttons and sound:** Home, Lock and volume from the toolbar or keyboard; iPhone audio plays on your Mac
- **Built for AI agents:** Claude and other agents can see the screen, tap, swipe, type and open apps directly through an MCP server, CLI or HTTP API, without computer use
- **Guided setup:** the Doctor checks your iPhone and Mac and shows how to fix anything missing, often with one click
- **Private and free:** everything stays on your Mac and the USB cable; no account, no telemetry, MIT licensed

| | Mirror my iPhone | Apple iPhone Mirroring |
|---|---|---|
| Works in the EU | ✅ | ❌ |
| Mac | macOS 13 Ventura or later | macOS 15 Sequoia or later |
| Control with mouse and trackpad | ✅ | ✅ |
| Type with the Mac keyboard | Not yet | ✅ |
| API for AI agents | ✅ MCP, CLI, HTTP | ❌ |
| Connection | USB | Wireless |
| Price | Free, open source | Built in |

More: [all iPhone Mirroring alternatives compared](https://bhuwanadhikari.com.np/mirror-my-iphone/iphone-mirroring-alternatives/).

## FAQ

**Is there an iPhone Mirroring alternative that works in the EU?**
Yes: Mirror my iPhone mirrors and controls your iPhone from a Mac in any country. It also runs on macOS 13 Ventura and 14 Sonoma, which Apple's iPhone Mirroring doesn't support.

**Do I need a paid Apple Developer account or a jailbreak?**
No. Touch control works with a free Apple ID in Xcode and Developer Mode on the iPhone. Mirroring alone needs neither.

**Does it work wirelessly?**
No, it needs a USB cable that carries data.

**Which Macs and iPhones does it work with?**
Macs with macOS 13 Ventura or later (Apple silicon and Intel). Tested with an iPhone 15 on iOS 26 and macOS 26 Tahoe; any iPhone that QuickTime Player can show over USB should work.

**Can Claude or another AI agent control my iPhone?**
Yes. Mirror my iPhone includes an MCP server for Claude Code, Claude Desktop, Cursor and other MCP clients, plus a CLI and a local HTTP API. Agents get screenshots, a list of the elements on screen, and taps, swipes, typing, buttons and app launching. It's your phone, so the agent is told to ask before anything hard to undo, like sending messages or buying.

**Does the agent need computer use?**
No. The tools act on the iPhone directly, so the agent never takes over your Mac's mouse or keyboard.

**Can I type with my Mac keyboard?**
Not yet, and double tap isn't supported either: a double click arrives as two separate taps.

---

## Technical details

### Setup checklist (the Doctor)

The Doctor opens on first launch; run it again from Help › Run Doctor. Mirroring needs only the first two rows.

| Check | Needed for | How |
|---|---|---|
| iPhone connected via USB, Mac trusted | Mirroring | A data cable; tap **Trust** on the iPhone |
| Camera access for Mirror my iPhone | Mirroring | macOS treats the iPhone's screen stream like a camera and asks once |
| Developer Mode on the iPhone | Touch control | Settings › Privacy & Security › Developer Mode (the Doctor can reveal the option) |
| Xcode and an Apple ID in Xcode | Touch control | App Store; Xcode › Settings › Accounts (a free Apple ID works) |
| WebDriverAgent | Touch control | The Doctor downloads it; the app builds it, installs it on the iPhone and starts it |
| Developer trusted, UI Automation on | Touch control | Settings › General › VPN & Device Management › Trust; Settings › Developer › Enable UI Automation |
| Developer tunnel (`tunneld`) | Optional: screenshot fallback on iOS 17+ | The Doctor starts it (asks for your password) |

### Controls

| Mac | iPhone |
|---|---|
| Click | Tap |
| Click and hold, or right-click | Long press |
| Drag | Swipe along the same path |
| Scroll wheel / two-finger scroll | Swipe in the scroll direction |
| ⇧⌘H / ⌘L | Home / Lock |
| ⌘0 / ⌘+ / ⌘− | Actual size / larger / smaller window |
| ⌃⌘S | Show or hide the sidebar (Doctor, Settings, Logs) |

### Agent API

The app serves an HTTP API on `127.0.0.1` while it runs. The MCP server (`mirror-my-iphone mcp`) and the CLI's device commands are clients of it. Coordinates are iPhone points (393 × 852 on an iPhone 15), which are also the pixels of a default screenshot, with (0, 0) at the top left.

| MCP tool | CLI | HTTP |
|---|---|---|
| `screenshot` | `screenshot [FILE] [--scale 3]` | `GET /v1/screenshot?scale=&format=png\|jpeg` |
| `describe_ui` | `ui [--json]` | `GET /v1/ui`: elements with label, value and the point to tap |
| `tap`, `double_tap` | `tap X Y`, `double-tap X Y` | `POST /v1/tap`, `/v1/double_tap` `{"x", "y"}` |
| `long_press` | `long-press X Y [--duration S]` | `POST /v1/long_press` `{"x", "y", "duration"}` |
| `swipe` | `swipe X1 Y1 X2 Y2 [--duration S]` | `POST /v1/swipe` `{"x1", "y1", "x2", "y2", "duration"}` |
| `type_text` | `type TEXT` | `POST /v1/type` `{"text"}`, into the focused field; `\n` presses Return |
| `press_button` | `button home\|lock\|volume-up\|volume-down` | `POST /v1/button` `{"name"}` |
| `open_app`, `list_apps` | `open-app BUNDLE_ID`, `apps` | `POST /v1/open_app` `{"bundle_id"}`, `GET /v1/apps` |
| `device_info` | `info` | `GET /v1/info` |

Gestures return once the iPhone has performed them, and the next screenshot waits for the animation to settle. Every request needs the token from `~/Library/Application Support/Mirror my iPhone/api.json`, which only your user account can read. The API refuses requests from web pages.

```bash
API="$HOME/Library/Application Support/Mirror my iPhone/api.json"
URL=$(plutil -extract url raw -o - "$API") TOKEN=$(plutil -extract token raw -o - "$API")
curl -H "Authorization: Bearer $TOKEN" "$URL/v1/screenshot" -o screen.png
curl -H "Authorization: Bearer $TOKEN" -d '{"x": 196, "y": 400}' "$URL/v1/tap"
```

For Claude Desktop, add the server to `claude_desktop_config.json`:

```json
{"mcpServers": {"mirror-my-iphone": {
  "command": "/Applications/Mirror my iPhone.app/Contents/Resources/bin/mirror-my-iphone", "args": ["mcp"]}}}
```

### Limitations

- The iPhone's screen has to be on; the picture pauses while it sleeps (agents are told when a screenshot is stale). Raise Settings › Display & Brightness › Auto-Lock to keep it awake.
- A swipe plays on the iPhone when you release the mouse: WebDriverAgent only accepts whole gestures.
- With a free Apple ID, the WebDriverAgent signing profile lasts 7 days; the app signs it again automatically.

### How it works

- **Screen:** an AVFoundation USB video stream at up to 60 FPS, the same one QuickTime Player records. While it runs, iOS shows a clean status bar (09:41, full battery) and may route its audio to the Mac. Fallback: the DVT Screenshot Service over pymobiledevice3 (~20 FPS; needs the developer tunnel on iOS 17+).
- **Touch:** mouse positions are converted to iPhone points and sent as W3C actions to [WebDriverAgent](https://github.com/appium/WebDriverAgent) (port 8100), which the app builds and runs with `xcodebuild`, signed with the first Apple ID in Xcode.
- **Agents:** the agent API runs inside the app on 127.0.0.1:8101 (or a free port, written to `api.json`). Agent gestures share WebDriverAgent's queue with your mouse; screenshots come from the same video stream you see.
- **USB:** pymobiledevice3 (usbmux and lockdown). **UI:** PyQt6, run in the app's own process by a small native launcher.

### Troubleshooting

Start with the Doctor. The Logs tab and `~/Library/Logs/Mirror my iPhone` show what the app, pymobiledevice3 and xcodebuild are doing.

- **Frozen picture or 0 FPS:** the iPhone's display is off. Wake and unlock it.
- **Low FPS, capture mode `screenshots`:** the USB stream isn't available. Allow camera access in System Settings › Privacy & Security › Camera.
- **Touch doesn't work:** the banner above the phone says why. The first WebDriverAgent build takes a few minutes; afterwards trust the developer on the iPhone (Settings › General › VPN & Device Management).

### Update, uninstall and the command line

```bash
# Update
git pull && packaging/build_app.sh
rm -rf "/Applications/Mirror my iPhone.app" && cp -R "dist/Mirror my iPhone.app" /Applications/

# Uninstall (then delete WebDriverAgentRunner from the iPhone)
rm -rf "/Applications/Mirror my iPhone.app" "$HOME/Library/Application Support/Mirror my iPhone" "$HOME/Library/Logs/Mirror my iPhone"

# Optional: the mirror-my-iphone command (doctor, logs, and device control for scripts and agents)
sudo mkdir -p /usr/local/bin
sudo ln -sf "/Applications/Mirror my iPhone.app/Contents/Resources/bin/mirror-my-iphone" /usr/local/bin/mirror-my-iphone
```

### Development

Run from source without building the app (macOS then asks for camera access for your terminal):

```bash
bash setup.sh                 # creates .venv and installs the dependencies
.venv/bin/python3 main.py     # the app
.venv/bin/python3 cli.py doctor
claude mcp add mirror-my-iphone -- "$PWD/.venv/bin/python3" "$PWD/cli.py" mcp
```

`packaging/build_app.sh` builds `dist/Mirror my iPhone.app` and its zip. The app's Python environment lives outside the bundle: in the Caskroom for Homebrew installs, otherwise in `~/Library/Application Support/Mirror my iPhone/venv`. To release, bump `__version__` in `version.py`, commit, and run `packaging/release.sh`; it builds the zip, updates `Casks/mirror-my-iphone.rb`, pushes and creates the GitHub release. This repository is its own Homebrew tap.

## Credits

This project started from [iPhoneMirroring](https://github.com/Dennisjoch/iPhoneMirroring), an open-source alternative to Apple's iPhone Mirroring.
