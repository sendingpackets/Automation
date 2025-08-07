# 🖼️ Custom Image Examples

This file contains examples of how to use converted images in the WPlace Bot, as well as methods to create your own images.

## 🎨 Methods to Create Images

### 1. 🆕 Automatic Web Converter (Recommended)

* Open `image-converter.html` in your browser
* Drag or select your image (PNG, JPG, GIF)
* Set maximum size and color mode
* Preview the result in real time
* Generate the ready-to-use script
* Copy and paste it into the wplace.live console

### 2. 📁 Direct Upload in the Panel

* Use the "📁 Load Image" button on the bot panel
* Select your image
* It will be automatically resized and loaded

### 3. Manual Method (For Simple Pixel Art)

```javascript
// Example: 5x5 Cross
const cross = [
    '#FFFFFF', '#FFFFFF', '#FF0000', '#FFFFFF', '#FFFFFF',
    '#FFFFFF', '#FFFFFF', '#FF0000', '#FFFFFF', '#FFFFFF', 
    '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000',
    '#FFFFFF', '#FFFFFF', '#FF0000', '#FFFFFF', '#FFFFFF',
    '#FFFFFF', '#FFFFFF', '#FF0000', '#FFFFFF', '#FFFFFF'
];

wplaceBot.loadSimpleImage(cross, 5, 5);
```

### 2. Emoji Method (Visual)

```javascript
// Example: Square with X
const design = [
    '🟥', '⬜', '⬜', '⬜', '🟥',
    '⬜', '🟥', '⬜', '🟥', '⬜',
    '⬜', '⬜', '🟥', '⬜', '⬜',
    '⬜', '🟥', '⬜', '🟥', '⬜',
    '🟥', '⬜', '⬜', '⬜', '🟥'
];

const colorMap = {
    '🟥': '#FF0000',
    '⬜': '#FFFFFF'
};

const imageData = design.map(emoji => colorMap[emoji]);
wplaceBot.loadSimpleImage(imageData, 5, 5);
```

### 3. Multiline String Method

```javascript
// Example: Up Arrow
const arrow = `
⬜⬜🟦⬜⬜
⬜🟦🟦🟦⬜
🟦🟦🟦🟦🟦
⬜⬜🟦⬜⬜
⬜⬜🟦⬜⬜
`.trim().split('\n').join('');

const colors = {
    '🟦': '#0000FF',
    '⬜': '#FFFFFF'
};

const pixels = Array.from(arrow).map(char => colors[char] || '#FFFFFF');
wplaceBot.loadSimpleImage(pixels, 5, 5);
```

## 🔧 Helper Tools

### Function to Create Rectangle

```javascript
function createRectangle(width, height, color, borderColor = null) {
    const pixels = [];
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // If borderColor is set and pixel is on border
            if (borderColor && (x === 0 || x === width-1 || y === 0 || y === height-1)) {
                pixels.push(borderColor);
            } else {
                pixels.push(color);
            }
        }
    }
    
    return pixels;
}

// Usage:
const rect = createRectangle(8, 6, '#FF0000', '#000000');
wplaceBot.loadSimpleImage(rect, 8, 6);
```

### Function to Create Circle

```javascript
function createCircle(radius, fillColor, bgColor = '#FFFFFF') {
    const size = radius * 2 + 1;
    const pixels = [];
    const center = radius;
    
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const distance = Math.sqrt((x - center) ** 2 + (y - center) ** 2);
            pixels.push(distance <= radius ? fillColor : bgColor);
        }
    }
    
    return pixels;
}

// Usage:
const circle = createCircle(4, '#00FF00');
wplaceBot.loadSimpleImage(circle, 9, 9);
```

### Function for Simple Text

```javascript
function createText(text, color = '#000000', bgColor = '#FFFFFF') {
    // Simple 3x5 font
    const font = {
        'A': [
            '⬜🟦⬜',
            '🟦⬜🟦',
            '🟦🟦🟦',
            '🟦⬜🟦',
            '🟦⬜🟦'
        ],
        'B': [
            '🟦🟦⬜',
            '🟦⬜🟦',
            '🟦🟦⬜',
            '🟦⬜🟦',
            '🟦🟦⬜'
        ],
        'C': [
            '⬜🟦🟦',
            '🟦⬜⬜',
            '🟦⬜⬜',
            '🟦⬜⬜',
            '⬜🟦🟦'
        ]
        // Add more letters as needed
    };
    
    const letters = text.toUpperCase().split('');
    const pixels = [];
    
    for (let row = 0; row < 5; row++) {
        for (let letter of letters) {
            if (font[letter]) {
                const line = font[letter][row];
                for (let char of line) {
                    pixels.push(char === '🟦' ? color : bgColor);
                }
            }
            // Space between letters
            pixels.push(bgColor);
        }
    }
    
    const width = letters.length * 4 - 1; // 3 + 1 space, minus last space
    return { pixels, width, height: 5 };
}

// Usage:
const textData = createText('ABC', '#FF0000');
wplaceBot.loadSimpleImage(textData.pixels, textData.width, textData.height);
```

## 🎯 Ready Examples

### Pokéball (8x8)

```javascript
const pokeball = [
    '⬜', '⬜', '🟥', '🟥', '🟥', '🟥', '⬜', '⬜',
    '⬜', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '⬜',
    '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥',
    '🟥', '🟥', '🟥', '⚫', '⚫', '🟥', '🟥', '🟥',
    '⬜', '⬜', '⬜', '⚫', '⚫', '⬜', '⬜', '⬜',
    '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜',
    '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜',
    '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜'
];

const pokeColors = {
    '🟥': '#FF0000',
    '⬜': '#FFFFFF', 
    '⚫': '#000000'
};

const pokeData = pokeball.map(emoji => pokeColors[emoji]);
wplaceBot.loadSimpleImage(pokeData, 8, 8);
```

### Brazil Flag (9x6)

```javascript
const brasilFlag = [
    '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩',
    '🟩', '🟩', '🟨', '🟨', '🟨', '🟨', '🟨', '🟩', '🟩',
    '🟩', '🟨', '🟨', '🔵', '🔵', '🔵', '🟨', '🟨', '🟩',
    '🟩', '🟨', '🟨', '🔵', '🔵', '🔵', '🟨', '🟨', '🟩',
    '🟩', '🟩', '🟨', '🟨', '🟨', '🟨', '🟨', '🟩', '🟩',
    '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩', '🟩'
];

const brasilColors = {
    '🟩': '#009B3A',
    '🟨': '#FFDF00',
    '🔵': '#002776'
};

const brasilData = brasilFlag.map(emoji => brasilColors[emoji]);
wplaceBot.loadSimpleImage(brasilData, 9, 6);
```

### Pac-Man (7x7)

```javascript
const pacman = [
    '⬜', '🟨', '🟨', '🟨', '🟨', '🟨', '⬜',
    '🟨', '🟨', '🟨', '🟨', '🟨', '⬜', '⬜',
    '🟨', '🟨', '🟨', '🟨', '⬜', '⬜', '⬜',
    '🟨', '🟨', '🟨', '⬜', '⬜', '⬜', '⬜',
    '🟨', '🟨', '🟨', '🟨', '⬜', '⬜', '⬜',
    '🟨', '🟨', '🟨', '🟨', '🟨', '⬜', '⬜',
    '⬜', '🟨', '🟨', '🟨', '🟨', '🟨', '⬜'
];

const pacColors = {
    '🟨': '#FFFF00',
    '⬜': '#FFFFFF'
};

const pacData = pacman.map(emoji => pacColors[emoji]);
wplaceBot.loadSimpleImage(pacData, 7, 7);
```

## 🛠️ Advanced Tips

### 1. Convert Real Image to Pixel Art

```javascript
// Use this function to convert an image to a color array
// (need to load the image on a canvas first)
function imageToPixelArray(canvas, width, height) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = [];
    
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        
        const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        pixels.push(hex);
    }
    
    return pixels;
}
```

### 2. Common Color Palette

```javascript
const commonColors = {
    'black': '#000000',
    'white': '#FFFFFF',
    'red': '#FF0000',
    'green': '#00FF00',
    'blue': '#0000FF',
    'yellow': '#FFFF00',
    'magenta': '#FF00FF',
    'cyan': '#00FFFF',
    'orange': '#FFA500',
    'purple': '#800080',
    'pink': '#FFC0CB',
    'gray': '#808080',
    'brown': '#8B4513',
    'lime': '#32CD32',
    'navy': '#000080'
};
```

### 3. Validate Image Before Using

```javascript
function validateImage(pixels, width, height) {
    if (pixels.length !== width * height) {
        console.error(`❌ Error: expected ${width * height} pixels, found ${pixels.length}`);
        return false;
    }
    
    // Check if all colors are valid
    const invalidColors = pixels.filter(color => !/^#[0-9A-F]{6}$/i.test(color));
    if (invalidColors.length > 0) {
        console.error(`❌ Invalid colors found:`, invalidColors);
        return false;
    }
    
    console.log(`✅ Valid image: ${width}x${height}`);
    return true;
}

// Usage:
if (validateImage(myPixels, 8, 8)) {
    wplaceBot.loadSimpleImage(myPixels, 8, 8);
}
```

## 📝 Base Template

```javascript
// Template to create your own images
function createCustomImage() {
    // 1. Define your design (use emojis for better visualization)
    const design = [
        '⬜', '⬜', '⬜',
        '⬜', '🟦', '⬜',
        '⬜', '⬜', '⬜'
    ];
    
    // 2. Map the colors
    const colorMap = {
        '⬜': '#FFFFFF',
        '🟦': '#0000FF'
    };
    
    // 3. Convert to color array
    const pixels = design.map(emoji => colorMap[emoji] || '#FFFFFF');
    
    // 4. Define dimensions
    const width = 3;
    const height = 3;
    
    // 5. Validate and load
    if (validateImage(pixels, width, height)) {
        wplaceBot.loadSimpleImage(pixels, width, height);
        return true;
    }
    
    return false;
}

// Use the function
createCustomImage();
```
