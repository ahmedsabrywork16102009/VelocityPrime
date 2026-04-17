// ============================================================
// Velocity Prime v2.0 — Background Service Worker
//
// Responsibilities:
//   • Core service worker for the extension.
//   • (Currently simplified to remove download bridge functionality)
// ============================================================

chrome.runtime.onInstalled.addListener(() => {
    console.log('Velocity Prime: Extension installed/updated.');
});
