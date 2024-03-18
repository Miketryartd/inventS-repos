const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', function(){
    const colorfulElements = document.querySelectorAll('[data-value="colorful"]');
    colorfulElements.forEach(function(element) {
        const dataValue = element.getAttribute('data-color');
        if (dataValue === 'light') {
            element.style.backgroundColor = lightenColor(colorPicker.value, 0.3);
        } else if (dataValue === 'dark') {
            element.style.backgroundColor = darkenColor(colorPicker.value, 0.3);
        } else {
            element.style.backgroundColor = colorPicker.value;
        }
    });
});

function lightenColor(color, amount) {
    // Convert color to HSL
    let hsl = rgbToHsl(hexToRgb(color));
    // Lighten the color
    hsl[2] = Math.min(1, hsl[2] + amount);
    // Convert back to RGB
    let rgb = hslToRgb(hsl);
    // Convert RGB to hex
    return rgbToHex(rgb);
}

function darkenColor(color, amount) {
    // Convert color to HSL
    let hsl = rgbToHsl(hexToRgb(color));
    // Darken the color
    hsl[2] = Math.max(0, hsl[2] - amount);
    // Convert back to RGB
    let rgb = hslToRgb(hsl);
    // Convert RGB to hex
    return rgbToHex(rgb);
}

function hexToRgb(hex) {
    // Convert hex color to RGB components
    let bigint = parseInt(hex.slice(1), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r, g, b];
}

function rgbToHsl(rgb) {
    // Convert RGB to HSL
    let [r, g, b] = rgb.map(c => c / 255);
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

function hslToRgb(hsl) {
    // Convert HSL to RGB
    let [h, s, l] = hsl;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        let hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [r * 255, g * 255, b * 255].map(Math.round);
}

function rgbToHex(rgb) {
    // Convert RGB components to hex color
    return '#' + rgb.map(c => c.toString(16).padStart(2, '0')).join('');
}

const textColor = document.getElementById('textColor');
textColor.addEventListener('input', function(){
    const textColorElements = document.querySelectorAll('[data-id="text"]');
    textColorElements.forEach(function(eElement){
        eElement.style.color = textColor.value;
    });
})