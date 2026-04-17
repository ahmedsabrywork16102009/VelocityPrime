// keyboard.js — Global keyboard shortcuts: Ctrl+Shift+Alt + Arrow / R.

import { applyGlobalSpeed, currentSpeed } from './core.js';


export function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        const tag = e.target.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
        if (!e.ctrlKey || !e.shiftKey || !e.altKey) return;

        const key      = e.key;
        const keyLower = key.toLowerCase();
        const code     = e.code;
        const STEP = 0.05;

        // Reset: Code 'KeyR' (layout-independent) OR specific keys (r, R, ق)
        if (code === 'KeyR' || key === 'r' || key === 'R' || key === 'ق') {
            e.preventDefault();
            applyGlobalSpeed(1.0);
            return;
        }
        if (keyLower === 'arrowup'   || keyLower === 'arrowright') { e.preventDefault(); applyGlobalSpeed(parseFloat((currentSpeed + STEP).toFixed(2))); }
        if (keyLower === 'arrowdown' || keyLower === 'arrowleft')  { e.preventDefault(); applyGlobalSpeed(parseFloat((currentSpeed - STEP).toFixed(2))); }
    }, true);
}
