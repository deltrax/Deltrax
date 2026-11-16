#!/usr/bin/env node
/*
 * Exporta o banner e o logo do Deltrax para GIF, MP4 e PNG.
 *
 * Requisitos: Node + Playwright (Chromium) e ffmpeg no PATH.
 * Uso:   node render.js [pasta-de-saida]        (padrão: a pasta acima de src/)
 *
 * Cada quadro é desenhado por deltrax-anim.html (window.renderFrame) e o
 * ffmpeg monta o GIF com paleta própria (cores chapadas, sem dithering).
 */
const { chromium } = require('playwright');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const FPS = 25;
const SRC = path.join(__dirname, 'deltrax-anim.html');
const OUT = path.resolve(process.argv[2] || path.join(__dirname, '..'));
const SCENES = { banner: 8, logo: 7 }; // duração do loop em segundos
const LITE = { banner: 1000, logo: 256 };  // largura das versões "leves" (arquivo menor)

const ffmpeg = args => execFileSync('ffmpeg', ['-y', '-v', 'error', ...args], { stdio: 'inherit' });

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + SRC + '?export=1');
  await page.evaluate(() => window.ready);

  for (const [name, T] of Object.entries(SCENES)) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), `deltrax-${name}-`));
    const n = Math.round(T * FPS);
    for (let i = 0; i < n; i++) {
      const url = await page.evaluate(([s, t]) => window.renderFrame(s, t), [name, i / FPS]);
      fs.writeFileSync(path.join(dir, `f_${String(i).padStart(4, '0')}.png`), Buffer.from(url.split(',')[1], 'base64'));
    }
    const frames = path.join(dir, 'f_%04d.png');
    fs.copyFileSync(path.join(dir, 'f_0000.png'), path.join(OUT, `${name}.png`));
    ffmpeg(['-framerate', String(FPS), '-i', frames, '-filter_complex',
      '[0:v]split[a][b];[a]palettegen=max_colors=128:stats_mode=full[p];[b][p]paletteuse=dither=none:diff_mode=rectangle',
      '-loop', '0', path.join(OUT, `${name}.gif`)]);
    ffmpeg(['-framerate', String(FPS), '-i', frames, '-filter_complex',
      `[0:v]scale=${LITE[name]}:-2:flags=area,split[a][b];[a]palettegen=max_colors=96:stats_mode=full[p];[b][p]paletteuse=dither=none:diff_mode=rectangle`,
      '-loop', '0', path.join(OUT, `${name}-leve.gif`)]);
    ffmpeg(['-framerate', String(FPS), '-i', frames, '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18',
      '-preset', 'slow', '-movflags', '+faststart', path.join(OUT, `${name}.mp4`)]);
    ffmpeg(['-framerate', String(FPS), '-i', frames, '-vf', `scale=${LITE[name]}:-2:flags=area`, '-c:v', 'libx264',
      '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'slow', '-movflags', '+faststart', path.join(OUT, `${name}-leve.mp4`)]);
    fs.rmSync(dir, { recursive: true, force: true });
    const kb = f => (fs.statSync(path.join(OUT, f)).size / 1024).toFixed(0) + ' KB';
    console.log(`${name}: ${n} quadros → ${name}.gif (${kb(name + '.gif')}), ${name}-leve.gif (${kb(name + '-leve.gif')}), ${name}.mp4 (${kb(name + '.mp4')}), ${name}.png`);
  }
  await browser.close();
})();
