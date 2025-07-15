const videoEl = document.getElementById('video-background') as HTMLVideoElement;

const clipDuration = 15; // seconds
const fadeDuration = 1000; // ms

if (!videoEl) throw new Error('Could not get video element!');

function fade(opacity: number): Promise<void> {
  return new Promise((resolve) => {
    videoEl.style.opacity = opacity.toString();
    setTimeout(resolve, fadeDuration);
  });
}

async function playRandomClip() {
  const duration = videoEl.duration;
  if (!duration || isNaN(duration) || duration <= 0) {
    console.warn('Invalid duration, playing full video');
    try {
      await videoEl.play();
    } catch {}
    return;
  }

  const clipLen = Math.min(clipDuration, duration);
  const start = Math.floor(Math.random() * (duration - clipLen));

  await fade(0);
  videoEl.currentTime = start;

  setTimeout(() => playRandomClip(), clipLen * 1000);
}

videoEl.addEventListener('loadedmetadata', () => {
  playRandomClip();
});

videoEl.addEventListener('ended', () => {
  console.log('ended !');
  playRandomClip();
});

videoEl.addEventListener("canplay", async (e) => {
  try {
    await (e.target as HTMLVideoElement).play()
    await fade(1);
  } catch{}
})

// videoEl.addEventListener('timeupdate', (e) => {
//   const v = e.target as HTMLVideoElement;
//   console.log(v.currentTime);
// });
