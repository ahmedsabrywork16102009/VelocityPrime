// keyboard.js — Global keyboard shortcuts: Ctrl+Shift+Alt + Arrow / R.

import { applyGlobalSpeed, currentSpeed } from './core.js';


export function initKeyboard() {
    function seekVideos(delta) {
        document.querySelectorAll('video').forEach(v => {
            if (!isNaN(v.duration)) {
                v.currentTime = Math.max(0, Math.min(v.duration, v.currentTime + delta));
            }
        });
    }

    function togglePlayPause() {
        document.querySelectorAll('video').forEach(v => {
            if (v.paused) v.play();
            else v.pause();
        });
    }

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

        // Max Speed: Code 'KeyM' OR specific keys (m, M, ة)
        if (code === 'KeyM' || key === 'm' || key === 'M' || key === 'ة') {
            e.preventDefault();
            applyGlobalSpeed(16.0);
            return;
        }

        // Min Speed: Code 'KeyS' OR specific keys (s, S, س)
        if (code === 'KeyS' || key === 's' || key === 'S' || key === 'س') {
            e.preventDefault();
            applyGlobalSpeed(0.1);
            return;
        }

        // --- Video Controls ---
        
        // Forward (+60s): Code 'Quote' OR specific keys (ط)
        if (code === 'Quote' || key === "'" || key === '"' || key === 'ط') {
            e.preventDefault();
            seekVideos(60);
            return;
        }

        // Forward (+30s): Code 'Semicolon' OR specific keys (ك)
        if (code === 'Semicolon' || key === ';' || key === ':' || key === 'ك') {
            e.preventDefault();
            seekVideos(30);
            return;
        }

        // Forward (+10s): Code 'KeyL' OR specific keys (l, L, م)
        if (code === 'KeyL' || key === 'l' || key === 'L' || key === 'م') {
            e.preventDefault();
            seekVideos(10);
            return;
        }

        // Forward (+5s): Code 'KeyK' OR specific keys (k, K, ن)
        if (code === 'KeyK' || key === 'k' || key === 'K' || key === 'ن') {
            e.preventDefault();
            seekVideos(5);
            return;
        }

        // Play/Pause: Code 'KeyJ' OR specific keys (j, J, ت)
        if (code === 'KeyJ' || key === 'j' || key === 'J' || key === 'ت') {
            e.preventDefault();
            togglePlayPause();
            return;
        }

        // Backward (-5s): Code 'KeyH' OR specific keys (h, H, ا, أ, إ, آ)
        if (code === 'KeyH' || key === 'h' || key === 'H' || key === 'ا' || key === 'أ' || key === 'إ' || key === 'آ') {
            e.preventDefault();
            seekVideos(-5);
            return;
        }

        // Backward (-10s): Code 'KeyG' OR specific keys (g, G, ل)
        if (code === 'KeyG' || key === 'g' || key === 'G' || key === 'ل') {
            e.preventDefault();
            seekVideos(-10);
            return;
        }

        // Backward (-30s): Code 'KeyF' OR specific keys (f, F, ب)
        if (code === 'KeyF' || key === 'f' || key === 'F' || key === 'ب') {
            e.preventDefault();
            seekVideos(-30);
            return;
        }

        // Backward (-60s): Code 'KeyD' OR specific keys (d, D, ي)
        if (code === 'KeyD' || key === 'd' || key === 'D' || key === 'ي') {
            e.preventDefault();
            seekVideos(-60);
            return;
        }

        if (keyLower === 'arrowup'   || keyLower === 'arrowright') { e.preventDefault(); applyGlobalSpeed(parseFloat((currentSpeed + STEP).toFixed(2))); }
        if (keyLower === 'arrowdown' || keyLower === 'arrowleft')  { e.preventDefault(); applyGlobalSpeed(parseFloat((currentSpeed - STEP).toFixed(2))); }
    }, true);
}