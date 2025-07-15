type Link = {
  name: string;
  url: string;
  icon: string;
};

const links: Link[] = [
  { name: 'GitHub', url: 'https://github.com', icon: 'GH' },
  { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'AI' },
  { name: 'Lua', url: 'https://www.lua.org/manual/5.4/', icon: 'LA' },
  { name: 'LLS Wiki', url: 'https://luals.github.io/wiki/', icon: 'LS' },
  { name: 'Twitch', url: 'https://www.twitch.tv/', icon: 'TW' },
  { name: 'YouTube', url: 'https://youtube.com', icon: 'YT' },
  { name: 'Reddit', url: 'https://reddit.com', icon: 'RD' },
  { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: 'SO' },
  { name: 'DevDocs', url: 'https://devdocs.io', icon: 'DD' },
  { name: 'MDN', url: 'https://developer.mozilla.org', icon: 'MD' },
  { name: 'CodePen', url: 'https://codepen.io', icon: 'CP' },
  { name: 'Gmail', url: 'https://mail.google.com', icon: 'GM' },
  { name: 'Drive', url: 'https://drive.google.com', icon: 'DR' },
  { name: 'Figma', url: 'https://figma.com', icon: 'FG' },
  { name: 'Notion', url: 'https://notion.com', icon: 'NT' },
];

function updateTime(): void {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateStr = now.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');

  if (timeEl) timeEl.textContent = timeStr;
  if (dateEl) dateEl.textContent = dateStr;
}

const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
if (searchInput) {
  searchInput.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      const query = encodeURIComponent(searchInput.value.trim());
      window.location.href = `https://duckduckgo.com/?q=${query}`;
    }
  });
}

function createQuickLinks(): void {
  const container = document.getElementById('quickLinks');
  if (!container) return;

  links.forEach((link) => {
    const linkEl = document.createElement('a');
    linkEl.href = link.url;
    linkEl.className = 'link-card';
    linkEl.innerHTML = `
      <div class="link-icon">${link.icon}</div>
      ${link.name}
    `;
    container.appendChild(linkEl);
  });
}

updateTime();
setInterval(updateTime, 3000);
createQuickLinks();
