// HTML partial loader
document.addEventListener('DOMContentLoaded', async () => {
  const slots = document.querySelectorAll('[data-include]');
  await Promise.all([...slots].map(async slot => {
    const url = slot.getAttribute('data-include');
    const res = await fetch(url);
    const html = await res.text();
    slot.outerHTML = html; // replace the placeholder with fetched HTML
  }));
});
