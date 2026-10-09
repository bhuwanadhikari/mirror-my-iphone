// Copy buttons on code blocks (prompts and comments are left out of the copied text)
document.querySelectorAll('.code pre').forEach((pre) => {
  const button = document.createElement('button');
  button.className = 'copy';
  button.type = 'button';
  button.textContent = 'Copy';
  button.addEventListener('click', async () => {
    const copy = pre.cloneNode(true);
    copy.querySelectorAll('.p, .c').forEach((el) => el.remove());
    const text = copy.textContent.split('\n').map((line) => line.trimEnd()).filter(Boolean).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Select and copy';
    }
    setTimeout(() => { button.textContent = 'Copy'; }, 1600);
  });
  pre.parentElement.appendChild(button);
});

// No autoplaying video for people who asked for less motion
if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('video[autoplay]').forEach((video) => {
    video.removeAttribute('autoplay');
    video.pause();
    video.controls = true;
  });
}
