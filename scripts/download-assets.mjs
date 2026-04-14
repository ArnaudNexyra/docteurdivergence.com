// Download all assets from reflect.app/home
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const BASE = 'https://reflect.app';

const ASSETS = [
  // Images
  { url: '/home/build/q-7110c4a0.png', dest: 'public/images/logo.png' },
  { url: '/home/build/q-cb311d1c.png', dest: 'public/images/hero-preview.png' },
  { url: '/home/build/q-171a9a33.png', dest: 'public/images/q-171a9a33.png' },
  { url: '/home/build/q-4c8a7e22.png', dest: 'public/images/q-4c8a7e22.png' },
  { url: '/home/build/q-ffb847cc.png', dest: 'public/images/q-ffb847cc.png' },
  { url: '/home/build/q-0fbeed8c.png', dest: 'public/images/q-0fbeed8c.png' },
  { url: '/home/build/q-a1682529.png', dest: 'public/images/q-a1682529.png' },
  { url: '/home/build/q-0f9e332b.png', dest: 'public/images/q-0f9e332b.png' },
  { url: '/home/build/q-5be748c5.png', dest: 'public/images/q-5be748c5.png' },
  { url: '/home/build/q-10b15ad6.png', dest: 'public/images/q-10b15ad6.png' },
  { url: '/home/build/q-af2f6277.png', dest: 'public/images/q-af2f6277.png' },
  { url: '/home/build/q-7dbf83f1.png', dest: 'public/images/q-7dbf83f1.png' },
  { url: '/home/build/q-ec285d0d.png', dest: 'public/images/q-ec285d0d.png' },
  { url: '/home/build/q-5ab01df5.png', dest: 'public/images/q-5ab01df5.png' },
  { url: '/home/build/q-6c12dbae.png', dest: 'public/images/q-6c12dbae.png' },
  { url: '/home/build/q-44e26a19.png', dest: 'public/images/q-44e26a19.png' },
  { url: '/home/build/q-c92fad10.png', dest: 'public/images/q-c92fad10.png' },
  { url: '/home/build/q-f6418f24.png', dest: 'public/images/q-f6418f24.png' },
  { url: '/home/build/q-871c3758.png', dest: 'public/images/q-871c3758.png' },
  { url: '/home/build/q-62492b69.png', dest: 'public/images/q-62492b69.png' },
  { url: '/home/build/q-76ac7eee.png', dest: 'public/images/q-76ac7eee.png' },
  { url: '/home/build/q-92fb8db8.png', dest: 'public/images/q-92fb8db8.png' },
  { url: '/home/build/q-7bea4872.png', dest: 'public/images/q-7bea4872.png' },
  { url: '/home/build/q-e30fe909.png', dest: 'public/images/q-e30fe909.png' },
  { url: '/home/build/q-b1d52962.png', dest: 'public/images/q-b1d52962.png' },
  { url: '/home/build/q-c4fdcb46.png', dest: 'public/images/q-c4fdcb46.png' },
  { url: '/home/build/q-f7af3bb2.png', dest: 'public/images/q-f7af3bb2.png' },
  { url: '/home/build/q-f23fe959.png', dest: 'public/images/q-f23fe959.png' },
  { url: '/home/build/q-87026e2e.png', dest: 'public/images/q-87026e2e.png' },
  { url: '/home/build/q-97c536f9.png', dest: 'public/images/q-97c536f9.png' },
  { url: '/home/build/q-13ad8cef.png', dest: 'public/images/q-13ad8cef.png' },
  { url: '/home/build/q-f9bd42b4.png', dest: 'public/images/q-f9bd42b4.png' },
  { url: '/home/build/q-5b9ee7a6.png', dest: 'public/images/q-5b9ee7a6.png' },
  { url: '/home/build/q-6a31352e.png', dest: 'public/images/q-6a31352e.png' },
  // Videos
  { url: '/home/build/q-b0877a06.mp4', dest: 'public/videos/q-b0877a06.mp4' },
  { url: '/home/build/q-eb15609f.mp4', dest: 'public/videos/q-eb15609f.mp4' },
  // Fonts
  { url: '/home/fonts/AeonikPro/medium.woff2', dest: 'public/fonts/AeonikPro/medium.woff2' },
  { url: '/home/fonts/InterV/regular.woff2', dest: 'public/fonts/InterV/regular.woff2' },
  { url: '/home/fonts/InterV/medium.woff2', dest: 'public/fonts/InterV/medium.woff2' },
];

async function downloadBatch(items) {
  return Promise.all(items.map(async ({ url, dest }) => {
    const fullUrl = BASE + url;
    const destPath = join(ROOT, dest);
    mkdirSync(dirname(destPath), { recursive: true });
    try {
      const res = await fetch(fullUrl);
      if (!res.ok) { console.warn(`SKIP ${url} (${res.status})`); return; }
      const buf = await res.arrayBuffer();
      writeFileSync(destPath, Buffer.from(buf));
      console.log(`✓ ${dest}`);
    } catch (e) {
      console.warn(`ERR ${url}: ${e.message}`);
    }
  }));
}

// Batch in groups of 4
for (let i = 0; i < ASSETS.length; i += 4) {
  await downloadBatch(ASSETS.slice(i, i + 4));
}
console.log('Done!');
