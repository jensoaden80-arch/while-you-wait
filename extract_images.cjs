const fs = require('fs');
const path = require('path');

const historyFile = './migrated_prompt_history/prompt_2026-02-04T11:27:47.565Z.json';
const content = fs.readFileSync(historyFile, 'utf8');

// The files are inside a JSON string which is itself inside a JSON.
// Let's look for the pattern {"name":"screenshot_X.png", ... "data":"..."}
const regex = /\{"name":"screenshot_(\d+)\.png","type":"image\/png","size":\d+,"lastModified":\d+,"data":"([^"]+)"\}/g;

let match;
while ((match = regex.exec(content)) !== null) {
    const index = match[1];
    const base64Data = match[2];
    const filename = `screenshot_${index}.png`;
    console.log(`Extracting ${filename}...`);
    fs.writeFileSync(filename, Buffer.from(base64Data, 'base64'));
}
