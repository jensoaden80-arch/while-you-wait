const fs = require('fs');
const path = require('path');

const jsonPath = 'migrated_prompt_history/prompt_2026-02-04T11:27:47.565Z.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

data.forEach((entry, entryIndex) => {
    if (entry.payload && entry.payload.files) {
        entry.payload.files.forEach((fileStr, fileIndex) => {
            try {
                const fileObj = JSON.parse(fileStr);
                console.log(`Found file: ${fileObj.name}, type: ${fileObj.type}`);
                const base64Data = fileObj.data;
                const buffer = Buffer.from(base64Data, 'base64');
                const fileName = fileObj.name || `file_${entryIndex}_${fileIndex}`;
                fs.writeFileSync(fileName, buffer);
                console.log(`Saved ${fileName}`);
            } catch (e) {
                // Not a JSON string or other error
                // console.error(`Error parsing file at entry ${entryIndex}, file ${fileIndex}:`, e.message);
            }
        });
    }
});
