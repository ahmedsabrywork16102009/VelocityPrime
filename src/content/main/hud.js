// hud.js — Speed badge clipped inside the video frame (never renders outside it).

import { state } from './state.js';

let hudTimer = null;
let overlayEl = null;   // clipping wrapper — same size as the video

/** Returns the largest connected tracked video. */
function getActiveVideo() {
    let best = null, bestArea = 0;
    for (const v of state.trackedVideos) {
        if (!v.isConnected) continue;
        const r = v.getBoundingClientRect();
        const area = r.width * r.height;
        if (area > bestArea) { bestArea = area; best = v; }
    }
    return best;
}

/** Create (once) the overlay + inner badge. */
function ensureOverlay(container) {
    if (overlayEl && overlayEl.isConnected) return overlayEl;

    // ── Outer overlay: exactly covers the video, clips children ──
    overlayEl = document.createElement('div');
    overlayEl.id = 'vprime-overlay';
    Object.assign(overlayEl.style, {
        position:      'fixed',
        overflow:      'hidden',        // ← مستحيل يطلع برا الإطار
        pointerEvents: 'none',
        zIndex:        '2147483647',
        opacity:       '0',
        transition:    'opacity 0.25s ease',
    });

    // ── Inner badge ──
    const badge = document.createElement('div');
    badge.id = 'velocity-prime-hud';
    Object.assign(badge.style, {
        position:        'absolute',
        top:             '14px',
        right:           '14px',
        backgroundColor: 'rgba(15,23,42,0.92)',
        color:           '#818cf8',
        padding:         '6px 14px',
        borderRadius:    '10px',
        fontFamily:      '"Outfit",sans-serif',
        fontSize:        '18px',
        fontWeight:      '800',
        border:          '1px solid rgba(129,140,248,0.4)',
        boxShadow:       '0 4px 16px rgba(0,0,0,0.45)',
        transform:       'scale(0.85)',
        transition:      'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        display:         'flex',
        alignItems:      'baseline',
        userSelect:      'none',
    });

    const val  = document.createElement('span'); val.id = 'vprime-hud-val';
    const unit = document.createElement('span'); unit.textContent = 'x';
    Object.assign(unit.style, { fontSize: '14px', marginLeft: '2px', opacity: '0.75' });
    badge.append(val, unit);
    overlayEl.appendChild(badge);
    container.appendChild(overlayEl);
    return overlayEl;
}

export function showHUD(speed) {
    // مش بيظهر لو مفيش فيديو متتبع
    if (!state.trackedVideos.size) return;
    const video = getActiveVideo();
    if (!video) return;

    const container = document.body || document.documentElement;
    if (!container) { setTimeout(() => showHUD(speed), 50); return; }

    const ov = ensureOverlay(container);

    // ── طبّق أبعاد الفيديو على الـ overlay ──
    const r = video.getBoundingClientRect();
    Object.assign(ov.style, {
        top:    `${r.top}px`,
        left:   `${r.left}px`,
        width:  `${r.width}px`,
        height: `${r.height}px`,
    });

    // ── تحديث الرقم ──
    const valEl = ov.querySelector('#vprime-hud-val');
    if (valEl) {
        const p = Math.abs(speed * 10 - Math.round(speed * 10)) < 0.001 ? 1 : 2;
        valEl.innerText = speed.toFixed(p);
    }

    // ── إظهار ──
    const badge = ov.querySelector('#velocity-prime-hud');
    clearTimeout(hudTimer);
    ov.style.opacity     = '1';
    if (badge) badge.style.transform = 'scale(1)';

    hudTimer = setTimeout(() => {
        ov.style.opacity = '0';
        if (badge) badge.style.transform = 'scale(0.85)';
    }, 3000);
}

