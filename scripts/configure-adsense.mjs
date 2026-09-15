import { writeFile } from "node:fs/promises";
const client = process.env.VITE_ADSENSE_CLIENT || "";
const slot = process.env.VITE_ADSENSE_SLOT || "";
const match = client.match(/^ca-pub-([0-9]{10,})$/);
const valid = Boolean(match && !/^0+$/.test(match[1]) && /^[0-9]+$/.test(slot) && !/^0+$/.test(slot));
await writeFile("adsense-config.js", `window.__ADSENSE__=${JSON.stringify(valid ? { client, slot } : {})};\n`);
if (valid) await writeFile("ads.txt", `google.com, pub-${match[1]}, DIRECT, f08c47fec0942fa0\n`);
console.log(valid ? "AdSense config and ads.txt generated" : "AdSense skipped: set real environment values");
