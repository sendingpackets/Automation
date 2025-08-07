# WPlace Bot - Drawing Automation

Bot to automate creating drawings on the site wplace.live.

Partially translated by ChatGPT, not fully done

Original: https://github.com/gcampos04/wplace-automation

## 🚀 How to Use (Step-by-Step)

### **Step 1: Preparation**

1. **Open** [wplace.live](https://wplace.live) in your browser
2. **Press** `F12` to open the Console (or Ctrl+Shift+I)
3. **Click** the "Console" tab

### **Step 2: Load the Bot** ⚠️ **REQUIRED**

**Paste this code into the console and press Enter:**

```javascript
fetch('https://raw.githubusercontent.com/gcampos04/wplace-automation/main/wplace-bot.js').then(r=>r.text()).then(eval)
```

**Wait to see:**

* ✅ Message "🎨 WPlace Bot Loaded!"
* ✅ Control panel at the top-right corner

### **Step 3: Choose Your Method**

#### **🖼️ Option A: Direct Upload (Easiest)**

1. Click **"📁 Load Image"** on the panel
2. Select your image
3. Set position (X, Y)
4. Click **"▶️ Start"**

#### **🔧 Option B: Advanced Converter**

1. Click **"🔧 Converter"** on the panel
2. Drag your image in
3. Configure options
4. Generate and copy the script
5. Paste it into the console

#### **🎨 Option C: Pixel Art Editor**

1. Click **"🎨 Editor"** on the panel
2. Draw directly on the canvas
3. Copy the generated script
4. Paste it into the console

#### **❤️ Option D: Quick Test**

```javascript
wplaceBot.loadHeartImage();
wplaceBot.setStartPosition(100, 100);
wplaceBot.start();
```

### **Basic Controls**

```javascript
wplaceBot.start();                  // Start drawing  
wplaceBot.stop();                   // Stop drawing  
wplaceBot.setStartPosition(x, y);  // Set starting position  
wplaceBot.setDelay(1000);           // Set delay (speed)  
```

## 🎮 How to Use the Bot

### Control Panel

The bot creates a control panel in the top-right corner with:

* **Position X/Y**: Defines where drawing will start
* **Delay**: Time between each pixel (in milliseconds)
* **Image Buttons**: Load predefined images (Heart, Smiley)
* **Load Image**: Upload your own images (PNG, JPG, etc.)
* **Converter**: Opens the advanced image conversion tool
* **Start/Stop**: Controls bot execution

### 🖼️ Importing Your Own Images

#### Method 1: Direct Upload on Panel

1. Click "📁 Load Image" on the control panel
2. Select your image (PNG, JPG, GIF)
3. The image will auto-resize and load

#### Method 2: Advanced Converter

1. Click "🔧 Converter" on the panel or open `image-converter.html`
2. Drag or select your image
3. Configure options:

   * **Max size**: Width and height in pixels
   * **Color mode**: Limited palette, full colors, or grayscale
   * **Start position**: Where to start drawing
   * **Delay**: Time between pixels
4. Click "🔄 Convert Image" to preview
5. Click "📝 Generate Script" to get code
6. Copy and paste the script into wplace.live console

#### 🆕 Method 3: Pixel Art Editor

1. Click "🎨 Editor" on the panel or open `pixel-editor.html`
2. **Draw directly** using:

   * **🖌️ Brush**: Draw pixels
   * **🧽 Eraser**: Erase pixels
   * **🪣 Bucket**: Fill areas
   * **🎯 Eyedropper**: Pick existing colors
   * **📏 Line**: Draw straight lines
   * **⬜ Rectangle**: Create rectangular shapes
3. **Configure canvas**: size, colors, zoom
4. **Real-time preview**: grid, stats, preview
5. **Automatically generate script** as you draw
6. **Export** in multiple formats or save as PNG

### Console Commands

```javascript
// Set initial position (x, y)
wplaceBot.setStartPosition(100, 100);

// Set delay between clicks (ms)
wplaceBot.setDelay(2000);

// Load predefined images
wplaceBot.loadHeartImage();    // 7x7 Heart  
wplaceBot.loadSmileyImage();   // 7x7 Smiley  

// Load custom pixel data image
const myPixels = [
    { x: 0, y: 0, color: '#FF0000' },
    { x: 1, y: 0, color: '#00FF00' },
    // ... more pixels
];
wplaceBot.loadImageFromData(myPixels, 'My Image');

// Load image from URL (data URL or external)
wplaceBot.loadImageFromUrl('data:image/png;base64,...', 50, 50);

// Control the bot
wplaceBot.start();  // Start  
wplaceBot.stop();   // Stop  
```

## 🎨 Available Images

### Predefined Images

* **❤️ Heart**: 7x7 red pixels
* **😊 Smiley**: 7x7 yellow with smiling face

### 🆕 Your Own Images

You can now import any image! The bot supports:

* **Formats**: PNG, JPG, JPEG, GIF
* **Auto-resizing**: Images resized to ideal size
* **Color optimization**: Converts to wplace.live available colors
* **Three color modes**:

  * **Limited Palette**: Uses common wplace colors only
  * **Full Colors**: Keeps original colors (may not match exactly)
  * **Grayscale**: Converts to black and white

### How to Convert Your Images

1. **Open Converter**: Use `image-converter.html` or click "🔧 Converter"
2. **Import your Image**: Drag or select file
3. **Configure options**:

   * Max size (recommended 50x50 for small images)
   * Color mode (recommended: Limited Palette)
   * Initial canvas position
   * Delay between pixels
4. **Preview result**: See pixelated image
5. **Generate script**: Get ready-to-use code
6. **Use on WPlace**: Paste script in wplace.live console

### ⚠️ Important Tips

* **Size**: Very large images take long to draw
* **Delay**: Use at least 1000ms delay to avoid overload
* **Colors**: "Limited Palette" mode ensures best compatibility
* **Position**: Make sure enough space exists on canvas before starting

### Heart (7x7)

```
⬜🟥🟥⬜🟥🟥⬜
🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥
🟥🟥🟥🟥🟥🟥🟥
⬜🟥🟥🟥🟥🟥⬜
⬜⬜🟥🟥🟥⬜⬜
⬜⬜⬜🟥⬜⬜⬜
```

### Smiley (7x7)

```
⬜⬜🟨🟨🟨⬜⬜
⬜🟨🟨🟨🟨🟨⬜
🟨🟨⬛🟨⬛🟨🟨
🟨🟨🟨🟨🟨🟨🟨
🟨⬛🟨🟨🟨⬛🟨
⬜🟨⬛⬛⬛🟨⬜
⬜⬜🟨🟨🟨⬜⬜
```

## 🔧 Creating Your Own Images

### Simple Method

```javascript
// Create color array (7x7 example)
const myImage = [
    '#FF0000', '#FF0000', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FF0000', '#FF0000',
    '#FF0000', '#FFFFFF', '#FF0000', '#FFFFFF', '#FF0000', '#FFFFFF', '#FF0000',
    // ... continue for 49 pixels (7x7)
];

// Load image
wplaceBot.loadSimpleImage(myImage, 7, 7);
```

### Emoji Method

```javascript
const design = [
    '🟦', '🟦', '🟦',
    '🟦', '🟨', '🟦',
    '🟦', '🟦', '🟦'
];

const colorMap = {
    '🟦': '#0000FF',
    '🟨': '#FFFF00'
};

const imageData = design.map(emoji => colorMap[emoji]);
wplaceBot.loadSimpleImage(imageData, 3, 3);
```

## ⚠️ Important Warnings

1. **Use responsibly**: Respect the wplace.live community
2. **Proper delays**: Use at least 1000ms delay to avoid server overload
3. **Image size**: Start with small images (max 10x10)
4. **Coordinates**: Make sure coordinates stay inside the canvas limits

## 🛠️ Bot Features

* ✅ Integrated graphical interface
* ✅ Auto-detect canvas
* ✅ Auto-detect color palette
* ✅ Automatic nearest color selection
* ✅ Speed control (delay)
* ✅ Predefined images
* ✅ Emergency stop system
* ✅ Detailed action log

## 🐛 Troubleshooting

### "Canvas not found"

* Make sure you are on wplace.live
* Wait for the site to fully load
* Reload the page and try again

### "Colors not selected"

* The site may have changed the color palette structure
* Try selecting colors manually first

### Bot doesn't work

* Check for script blockers
* Try reloading the script
* Check the console for errors

## 📝 License

This script is provided "as is" for educational purposes. Use at your own risk.

## 📁 Project Files

* `wplace-bot.js` - Main bot script with all features
* `wplace-bot-minified.js` - Minified version of the bot
* `image-converter.html` - **🔧 Web image converter** (full interface)
* `pixel-editor.html` - **🆕 Pixel Art Editor** (draw directly on canvas!)
* `demo-converter.html` - Demo page and instructions
* `custom-images.md` - Examples and guide for custom images
* `README.md` - This file with all instructions

## 🆕 New - Pixel Art Editor

### 🎨 Complete Pixel Art Editor

The file `pixel-editor.html` is a full editor where you can **draw directly**:

#### **🛠️ Available Tools**:

* **🖌️ Brush**: Draw pixel by pixel
* **🧽 Eraser**: Erase specific pixels
* **🪣 Bucket**: Fill areas with a color
* **🎯 Eyedropper**: Select existing colors in the drawing
* **📏 Line**: Draw perfect straight lines
* **⬜ Rectangle**: Create rectangular shapes

#### **🎨 Color System**:

* **30-color palette** optimized for wplace.live
* **Custom color picker** for specific colors
* **Real-time preview** of all colors

#### **📐 Canvas Controls**:

* **Configurable size**: from 5x5 up to 100x100 pixels
* **Adjustable zoom**: 1x to 5x for precision
* **Optional grid**: For better visualization
* **Full history**: Unlimited undo/redo

#### **📊 Advanced Features**:

* **Image import**: Drag existing images in
* **PNG export**: Save your work in high resolution
* **Real-time stats**: Pixels, colors, estimated time
* **Multiple script formats**: Full script, function, or raw data

#### **⚡ Automatic Generation**:

* **Script generated in real time** as you draw
* **Three output formats**:

  * Complete ready-to-use script
  * Custom function
  * Raw image data
* **One-click copy** to clipboard

---

**🎉 Now you have 3 different ways to create art for wplace.live:**

### 1. 📁 **Direct Upload** - *Fast and Simple*

* Click "📁 Load Image" on the panel
* Select any image
* Ready to use!

### 2. 🔧 **Advanced Converter** - *Maximum Control*

* Import any image format
* Configure size, colors, and optimizations
* Full preview before generating
* Multiple output formats

### 3. 🎨 **Pixel Art Editor** - *Original Creation*

* Draw directly on the canvas
* Professional tools (brush, bucket, line, etc.)
* Real-time script generation
* Complete color and zoom system

**✨ All methods generate scripts ready to paste into the wplace.live console!**
