// main.js — Popup entry point. Imports and boots all modules.

import { initSpeedController }     from './speed/index.js';

function initPopup() {
    initSpeedController();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopup);
} else {
    initPopup();
}
