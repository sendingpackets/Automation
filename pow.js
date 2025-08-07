/**
 * Bot to automate drawing on wplace.live
 * Instructions:
 * 1. Open the website wplace.live in your browser
 * 2. Open Developer Console (F12 > Console)
 * 3. Paste this script and press Enter
 * 4. Configure your image and starting position
 * 5. Run the bot
 */

class WPlaceBot {
    constructor() {
        this.startX = 0;
        this.startY = 0;
        this.delay = 10;
        this.imageData = [];
        this.colorPalette = [];
        this.running = false;
        this.timer = null;
        this.canvas = document.querySelector("canvas");
        if (!this.canvas) {
            console.error("❌ Canvas not found. Make sure you're on wplace.live");
            return;
        }
        this.ctx = this.canvas.getContext("2d");
        createControlPanel();
        this.extractColorPalette();
        console.log("🎨 WPlace Bot initialized!");
    }

    createControlPanel() {
        const panel = document.createElement("div");
        panel.style.position = "fixed";
        panel.style.top = "10px";
        panel.style.right = "10px";
        panel.style.padding = "10px";
        panel.style.backgroundColor = "white";
        panel.style.border = "1px solid black";
        panel.style.zIndex = 9999;
        panel.innerHTML = `
            <h3>🎨 WPlace Bot</h3>
            <label>Position X: <input type="number" id="startX" value="0"></label><br>
            <label>Position Y: <input type="number" id="startY" value="0"></label><br>
            <label>Delay (ms): <input type="number" id="delay" value="10"></label><br>
            <button id="loadHeart">❤️ Heart</button>
            <button id="loadSmiley">😊 Smiley</button>
            <button id="loadImage">📁 Load Image</button>
            <button id="openConverter">🔧 Converter</button>
            <button id="openEditor">🎨 Editor</button>
            <button id="startBot">▶️ Start</button>
            <button id="stopBot">⏹️ Stop</button>
            <div id="botStatus">Status: Ready</div>
        `;
        document.body.appendChild(panel);

        document.getElementById("loadHeart").onclick = () => this.loadHeartImage();
        document.getElementById("loadSmiley").onclick = () => this.loadSmileyImage();
        document.getElementById("loadImage").onclick = () => this.loadImageFromLocal();
        document.getElementById("openConverter").onclick = () => window.open("image-converter.html", "_blank");
        document.getElementById("openEditor").onclick = () => window.open("editor.html", "_blank");
        document.getElementById("startBot").onclick = () => this.start();
        document.getElementById("stopBot").onclick = () => this.stop();
    }

    extractColorPalette() {
        const colorElements = document.querySelectorAll(".color");
        this.colorPalette = Array.from(colorElements).map(el => el.style.backgroundColor);
        console.log(`✅ Found ${this.colorPalette.length} colors in the palette`);
    }

    getClosestColor(r, g, b) {
        let closestIndex = 0;
        let closestDistance = Infinity;
        this.colorPalette.forEach((color, index) => {
            const [cr, cg, cb] = color.match(/\d+/g).map(Number);
            const distance = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });
        return closestIndex;
    }

    drawPixel(x, y, colorIndex) {
        const palette = document.querySelectorAll(".color");
        if (palette[colorIndex]) {
            palette[colorIndex].click();
        }

        const mouseEvent = new MouseEvent("mousedown", {
            clientX: x * 10,
            clientY: y * 10,
            bubbles: true,
            cancelable: true,
            view: window,
        });

        this.canvas.dispatchEvent(mouseEvent);
    }

    async start() {
        if (this.running) {
            console.warn("⚠️ Bot is already running");
            return;
        }
        this.running = true;
        this.updateStatus("Running...");

        const startX = parseInt(document.getElementById("startX").value);
        const startY = parseInt(document.getElementById("startY").value);
        const delay = parseInt(document.getElementById("delay").value);

        for (let y = 0; y < this.imageData.length; y++) {
            for (let x = 0; x < this.imageData[y].length; x++) {
                if (!this.running) return;
                const [r, g, b, a] = this.imageData[y][x];
                if (a === 0) continue;

                const currentColor = this.ctx.getImageData(startX + x, startY + y, 1, 1).data;
                if (currentColor[0] === r && currentColor[1] === g && currentColor[2] === b) continue;

                const colorIndex = this.getClosestColor(r, g, b);
                this.drawPixel(startX + x, startY + y, colorIndex);
                await this.sleep(delay);
            }
        }

        this.updateStatus("Stopped");
        this.running = false;
        console.log("✅ Bot finished");
    }

    stop() {
        this.running = false;
        this.updateStatus("Stopped");
        console.log("⏹️ Bot stopped");
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    setStartPosition(x, y) {
        this.startX = x;
        this.startY = y;
        document.getElementById("startX").value = x;
        document.getElementById("startY").value = y;
        console.log(`📍 Start position set to (${x}, ${y})`);
    }

    setDelay(ms) {
        this.delay = ms;
        document.getElementById("delay").value = ms;
        console.log(`⏱️ Delay set to ${ms}ms`);
    }

    loadHeartImage() {
        const heart = [
            [[255,0,0,255], [255,0,0,255], [255,0,0,255]],
            [[255,0,0,255], [255,255,255,0], [255,0,0,255]],
            [[255,0,0,255], [255,0,0,255], [255,0,0,255]]
        ];
        this.imageData = heart;
        console.log("❤️ Heart loaded");
    }

    loadSmileyImage() {
        const smiley = [
            [[255,255,0,255], [255,255,0,255], [255,255,0,255]],
            [[255,255,0,255], [0,0,0,255], [255,255,0,255]],
            [[255,255,0,255], [255,255,0,255], [255,255,0,255]]
        ];
        this.imageData = smiley;
        console.log("😊 Smiley loaded");
    }

    loadImageFromData(pixelData, name = "Unnamed") {
        this.imageData = pixelData;
        console.log(`🖼️ Image '${name}' loaded`);
    }

    async loadImageFromUrl(url, maxWidth = 50, maxHeight = 50) {
        try {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = url;
            await img.decode();

            const tempCanvas = document.createElement("canvas");
            const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
            tempCanvas.width = img.width * scale;
            tempCanvas.height = img.height * scale;
            const tempCtx = tempCanvas.getContext("2d");
            tempCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);
            const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;

            const pixelData = [];
            for (let y = 0; y < tempCanvas.height; y++) {
                const row = [];
                for (let x = 0; x < tempCanvas.width; x++) {
                    const i = (y * tempCanvas.width + x) * 4;
                    row.push([imageData[i], imageData[i + 1], imageData[i + 2], imageData[i + 3]]);
                }
                pixelData.push(row);
            }

            this.imageData = pixelData;
            console.log("🖼️ Image from URL loaded");
        } catch (error) {
            console.error("❌ Error loading image:", error);
        }
    }

    loadImageFromLocal() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/png, image/jpeg";
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (event) => {
                await this.loadImageFromUrl(event.target.result);
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    updateStatus(text) {
        document.getElementById("botStatus").innerText = `Status: ${text}`;
    }
}

const wplaceBot = new WPlaceBot();

console.log(`
🎨 WPlace Bot Loaded! 

Available commands:
- wplaceBot.setStartPosition(x, y) - Set initial position
- wplaceBot.setDelay(ms) - Set delay between clicks
- wplaceBot.loadHeartImage() - Load heart image
- wplaceBot.loadSmileyImage() - Load smiley image
- wplaceBot.loadImageFromData(pixelData, name) - Load image from data
- wplaceBot.loadImageFromUrl(url, maxWidth, maxHeight) - Load image from URL
- wplaceBot.start() - Start the bot
- wplaceBot.stop() - Stop the bot

🔧 Image Converter:
Use the control panel or open image-converter.html to convert your own images!

Or use the control panel in the top-right corner!
`);

