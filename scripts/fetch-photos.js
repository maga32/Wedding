// cloudflare 배포용 구성파일
import fs from 'fs/promises';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import { createWriteStream, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const origUrl = 'https://wedding.sung-a.duckdns.org/photo/'
const imageUrls = [
  'first.jpg',
  'second.jpg',
  'icon.jpg',
  'groom.jpg',
  'bride.jpg'
];

// 추가 이미지 찾기
const findMoreImages = async () => {
  const maxNumber = 99;
  const formats = ['png', 'jpg', 'jpeg'];

  let i = 1;
  while(i <= maxNumber) {
    let found = false;

    for (const ext of formats) {
      const filePath = (i+'').padStart(2, '0') + '.' + ext;

      try {
        const response = await fetch(origUrl+filePath, { method: 'HEAD' });

        if (response.ok) {
          imageUrls.push(filePath);
          found = true;
          break;
        }
      } catch (error) {
        console.error(`❌ error when find file: ${filePath}:`, error);
      }
    }

    // 연속된 번호가 끊기면 반복 종료
    if (!found) {
      console.log("not exist from No. " + i + " image.");
      break;
    }
    i++;
  }
};

const outputDir = path.join(__dirname, '../public/photo');

const clearDirectory = async (dirPath) => {
  try {
    await fs.rm(dirPath, { recursive: true, force: true });
    console.log(`🧹 Cleared: ${dirPath}`);
  } catch (err) {
    console.warn(`⚠️ Failed to clear directory: ${dirPath}`, err.message);
  }
};

const downloadImage = async (url, outputPath) => {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(outputPath);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
          return;
        }
        response.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', (err) => {
        fs.unlink(outputPath);
        reject(err);
      });
  });
}

const main = async () => {
  await clearDirectory(outputDir);
  await fs.mkdir(outputDir, { recursive: true });
  await findMoreImages();

  for (const url of imageUrls) {
    const fullUrl = origUrl + url;
    const filename = path.basename(fullUrl);
    const filePath = path.join(outputDir, filename);
    console.log(`⬇️  Downloading ${fullUrl}...`);
    try {
      await downloadImage(fullUrl, filePath);
      console.log(`✅ Saved to ${filePath}`);
    } catch (err) {
      console.error(`❌ Failed to download ${fullUrl}:`, err.message);
    }
  }
}

main();