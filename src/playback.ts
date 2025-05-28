const videoEl = document.getElementById('video-background') as HTMLVideoElement | null;

const clipDuration = 15; // seconds
const fadeDuration = 1000; // ms

if (!videoEl) throw new Error('Could not get video element!');

function fade(opacity: number): Promise<void> {
  return new Promise((resolve) => {
    videoEl!.style.transition = `opacity ${fadeDuration}ms ease-in-out`;
    videoEl!.style.opacity = opacity.toString();
    setTimeout(resolve, fadeDuration);
  });
}

async function playRandomClip() {
  const duration = videoEl!.duration;
  if (!duration || isNaN(duration) || duration <= 0) {
    console.warn('Invalid duration, playing full video');
    videoEl!.loop = true;
    try {
      await videoEl!.play();
    } catch {}
    return;
  }

  console.log('new clip');
  const clipLen = Math.min(clipDuration, duration);
  const start = Math.random() * (duration - clipLen);

  await fade(0);
  videoEl!.currentTime = start;

  try {
    await videoEl!.play();
  } catch {}
  await fade(1);

  setTimeout(() => playRandomClip(), clipLen * 1000);
}

videoEl.addEventListener('loadedmetadata', () => {
  playRandomClip();
});

videoEl.addEventListener('ended', () => {
  console.log('ended !');
  playRandomClip();
});
