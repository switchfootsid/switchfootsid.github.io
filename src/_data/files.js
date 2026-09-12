import fs from "node:fs";

// Drop these files into src/assets/ and they appear on the site automatically.
export default {
  photo: fs.existsSync("src/assets/photo.jpg") ? "/assets/photo.jpg" : null,
  resume: fs.existsSync("src/assets/resume.pdf") ? "/assets/resume.pdf" : null,
};
