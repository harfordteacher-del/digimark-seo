/* Optional. Install once through the site's approved script/consent setup.
 * This file does not load GA4, send messages, or record customer details.
 * Set window.dfpAnalyticsConsent = true only after the applicable consent.
 */
(() => {
  if (window.__dfpClickTrackingInstalled) return;
  window.__dfpClickTrackingInstalled = true;
  document.addEventListener('click', event => {
    const anchor = event.target.closest?.('.dfp-home a[href]');
    if (!anchor || window.dfpAnalyticsConsent !== true) return;
    const url = new URL(anchor.href, location.href);
    if (url.hostname !== 'wa.me') return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_click',
      button_text: anchor.textContent.trim(),
      page_path: location.pathname,
      placement: anchor.closest('#layanan') ? 'services' : anchor.closest('#konsultasi') ? 'contact' : anchor.closest('#tentang') ? 'about' : 'hero',
    });
  });
})();
