import { writeFile } from "node:fs/promises";
const client = process.env.VITE_ADSENSE_CLIENT || "";
const slot = process.env.VITE_ADS_DISPLAY_HORIZONTAL_FOOTER || "";
const match = client.match(/^ca-pub-([0-9]{10,})$/);
const valid = Boolean(match && !/^0+$/.test(match[1]) && /^[0-9]+$/.test(slot) && !/^0+$/.test(slot));
await writeFile("adsense-config.js", `window.__ADSENSE__=${JSON.stringify(valid ? { client, slot } : {})};\n`);
