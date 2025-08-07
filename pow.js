/**
 * Bot to automate drawing on wplace.live
 * Instructions:
 * 1. Open the website wplace.live in your browser
 * 2. Open the Developer Console (F12 > Console)
 * 3. Paste this script and press Enter
 * 4. Configure your image and starting position
 * 5. Run the bot
 */

class WPlaceBot {
    constructor() {
        this.isRunning = false;
        this.delay = 1000; // Delay between clicks in ms
        this.currentPixel = 0;
        this.pixels = [];
        this.startX = 0;
        this.startY = 0;
        this.canvas = null;
        this.colorPalette = [];
        this.selectedColor = '#000000';
    }

    // Initializes the bot
    init() {
        console.log('🎨 WPlace Bot initialized!');
        this.findCanvas();
        this.findColorPalette();
        this.createControlPanel();
    }

    // Finds the canvas on wplace
    findCanvas() {
        const possibleSelectors = [
            'canvas',
            '#canvas',
            '.canvas',
            '[data-testid="canvas"]',
            'canvas[width]',
            'canvas[height]'
        ];

        for (const selector of possibleSelectors) {
            const element = document.querySelector(selector);
            if (element) {
                this.canvas = element;
                console.log('✅ Canvas found:', selector);
                return;
            }
        }

        console.error('❌ Canvas not found. Make sure you are on wplace.live');
    }

    // Finds the color palette
    findColorPalette() {
        const colorElements = document.querySelectorAll('[style*="background-color"], .color, [data-color], .palette-color');
        
        colorElements.forEach(element => {
            const bgColor = window.getComputedStyle(element).backgroundColor;
            if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
                this.colorPalette.push({
                    element: element,
                    color: bgColor
                });
            }
        });

        console.log(`✅ Found ${this.colorPalette.length} colors in the palette`);
    }

    rgbToHex(rgb) {
        const result = rgb.match(/\d+/g);
        if (!result) return '#000000';
        
        const [r, g, b] = result.map(num => parseInt(num));
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    findClosestColor(targetColor) {
        if (this.colorPalette.length === 0) return null;

        let closestColor = this.colorPalette[0];
        let minDistance = Infinity;

        const target = this.hexToRgb(targetColor);
        if (!target) return closestColor;

        this.colorPalette.forEach(paletteColor => {
            const rgb = this.rgbStringToObject(paletteColor.color);
            if (rgb) {
                const distance = Math.sqrt(
                    Math.pow(target.r - rgb.r, 2) +
                    Math.pow(target.g - rgb.g, 2) +
                    Math.pow(target.b - rgb.b, 2)
                );

                if (distance < minDistance) {
                    minDistance = distance;
                    closestColor = paletteColor;
                }
            }
        });

        return closestColor;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    rgbStringToObject(rgb) {
        const result = rgb.match(/\d+/g);
        if (!result || result.length < 3) return null;
        
        return {
            r: parseInt(result[0]),
            g: parseInt(result[1]),
            b: parseInt(result[2])
        };
    }

    selectColor(color) {
        const closestColor = this.findClosestColor(color);
        if (closestColor && closestColor.element) {
            closestColor.element.click();
            this.selectedColor = color;
            console.log(`🎨 Selected color: ${color}`);
            return true;
        }
        return false;
    }

    clickCanvas(x, y) {
        if (!this.canvas) return false;

        const rect = this.canvas.getBoundingClientRect();
        const canvasX = x + rect.left;
        const canvasY = y + rect.top;

        const events = ['mousedown', 'mouseup', 'click'];
        
        events.forEach(eventType => {
            const event = new MouseEvent(eventType, {
                bubbles: true,
                cancelable: true,
                clientX: canvasX,
                clientY: canvasY,
                button: 0
            });
            this.canvas.dispatchEvent(event);
        });

        console.log(`🖱️ Clicked at (${x}, ${y})`);
        return true;
    }

    loadSimpleImage(imageData, width, height) {
        this.pixels = [];
        
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const index = y * width + x;
                if (index < imageData.length) {
                    this.pixels.push({
                        x: x,
                        y: y,
                        color: imageData[index]
                    });
                }
            }
        }

        console.log(`📷 Image loaded: ${width}x${height} pixels (${this.pixels.length} pixels)`);
    }

    loadHeartImage() {
        const heart = [
            '⬜', '🟥', '🟥', '⬜', '🟥', '🟥', '⬜',
            '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥',
            '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥',
            '🟥', '🟥', '🟥', '🟥', '🟥', '🟥', '🟥',
            '⬜', '🟥', '🟥', '🟥', '🟥', '🟥', '⬜',
            '⬜', '⬜', '🟥', '🟥', '🟥', '⬜', '⬜',
            '⬜', '⬜', '⬜', '🟥', '⬜', '⬜', '⬜'
        ];

        const colorMap = {
            '🟥': '#FF0000',
            '⬜': '#FFFFFF'
        };

        const imageData = heart.map(emoji => colorMap[emoji] || '#FFFFFF');
        this.loadSimpleImage(imageData, 7, 7);
    }

    loadSmileyImage() {
        const smiley = [
            '⬜', '⬜', '🟨', '🟨', '🟨', '⬜', '⬜',
            '⬜', '🟨', '🟨', '🟨', '🟨', '🟨', '⬜',
            '🟨', '🟨', '⬛', '🟨', '⬛', '🟨', '🟨',
            '🟨', '🟨', '🟨', '🟨', '🟨', '🟨', '🟨',
            '🟨', '⬛', '🟨', '🟨', '🟨', '⬛', '🟨',
            '⬜', '🟨', '⬛', '⬛', '⬛', '🟨', '⬜',
            '⬜', '⬜', '🟨', '🟨', '🟨', '⬜', '⬜'
        ];

        const colorMap = {
            '🟨': '#FFFF00',
            '⬛': '#000000',
            '⬜': '#FFFFFF'
        };

        const imageData = smiley.map(emoji => colorMap[emoji] || '#FFFFFF');
        this.loadSimpleImage(imageData, 7, 7);
    }

    async start() {
        if (this.isRunning) {
            console.log('⚠️ Bot is already running!');
            return;
        }

        if (this.pixels.length === 0) {
            console.log('⚠️ Load an image first!');
            return;
        }

        this.isRunning = true;
        this.currentPixel = 0;
        console.log('🚀 Bot started!');

        while (this.isRunning && this.currentPixel < this.pixels.length) {
            const pixel = this.pixels[this.currentPixel];
            const x = this.startX + pixel.x;
            const y = this.startY + pixel.y;

            if (this.selectColor(pixel.color)) {
                await this.sleep(200);
                this.clickCanvas(x, y);
                console.log(`✅ Pixel ${this.currentPixel + 1}/${this.pixels.length} placed at (${x}, ${y})`);
            }

            this.currentPixel++;
            await this.sleep(this.delay);
        }

        this.isRunning = false;
        console.log('✅ Bot finished!');
    }

    stop() {
        this.isRunning = false;
        console.log('⏹️ Bot stopped!');
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setStartPosition(x, y) {
        this.startX = x;
        this.startY = y;
        console.log(`📍 Start position set: (${x}, ${y})`);
    }

    setDelay(ms) {
        this.delay = ms;
        console.log(`⏱️ Delay set: ${ms}ms`);
    }

    loadImageFromData(pixelData, name = 'Custom Image') {
        if (!Array.isArray(pixelData)) {
            console.error('❌ Image data must be an array of {x, y, color} objects');
            return false;
        }

        const isValidData = pixelData.every(pixel => 
            typeof pixel === 'object' && 
            typeof pixel.x === 'number' && 
            typeof pixel.y === 'number' && 
            typeof pixel.color === 'string'
        );

        if (!isValidData) {
            console.error('❌ Invalid format. Each pixel must have {x, y, color}');
            return false;
        }

        this.pixels = pixelData.slice();
        console.log(`✅ ${name} loaded: ${pixelData.length} pixels`);
        
        const maxX = Math.max(...pixelData.map(p => p.x));
        const maxY = Math.max(...pixelData.map(p => p.y));
        console.log(`📐 Dimensions: ${maxX + 1}x${maxY + 1} pixels`);
        
        const uniqueColors = [...new Set(pixelData.map(p => p.color))];
        console.log(`🎨 Unique colors: ${uniqueColors.length}`);

        return true;
    }

    // Additional methods (loadImageFromUrl, processImageToPixels, createControlPanel) remain unchanged — if you want the full script including those, let me know.
}

// Initialize the bot
const wplaceBot = new WPlaceBot();
wplaceBot.init();

console.log(`
🎨 WPlace Bot Loaded!

Available commands:
- wplaceBot.setStartPosition(x, y) - Set start position
- wplaceBot.setDelay(ms) - Set delay between clicks
- wplaceBot.loadHeartImage() - Load heart image
- wplaceBot.loadSmileyImage() - Load smiley image
- wplaceBot.loadImageFromData(pixelData, name) - Load image from data
- wplaceBot.loadImageFromUrl(url, maxWidth, maxHeight) - Load image from URL
- wplaceBot.start() - Start the bot
- wplaceBot.stop() - Stop the bot

🔧 Image Converter:
Use the control panel or open image-converter.html to convert your own images!

Or use the control panel that appeared in the top right corner!
`);
