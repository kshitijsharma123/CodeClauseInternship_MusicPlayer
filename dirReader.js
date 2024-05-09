import { readdir, writeFile } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dirPath = `${__dirname}/songs`;

let audioFileArray = [];

readdir(dirPath, (err, files) => {
  if (err) {
    console.log("Error while reading the directory:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = `${dirPath}/${file}`;

    audioFileArray.push({
      url: `/songs/${file}`,
      name: file,
    });
  });

  writeFile(
    `${__dirname}/audio.json`,
    JSON.stringify(audioFileArray, null, 2),
    (writeErr) => {
      if (writeErr) {
        console.log("Error while writing to file:", writeErr);
      } else {
        console.log("Audio file created successfully");
      }
    }
  );
});
