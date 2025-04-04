const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const sharp = require("sharp");

const docsPath = path.join(__dirname, "../docs");
const imgPath = path.join(__dirname, "../static/img/socialCards");

if (!fs.existsSync(imgPath)) {
  fs.mkdirSync(imgPath, { recursive: true });
}

function sanitizeSlug(slug) {
  return slug
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9Ѐ-ӿ-]+/g, "-")
    .replace(/[-]+/g, "-")
    .replace(/^[-]+|[-]+$/g, "");
}

function splitTitleIntoLines(title, maxCharsPerLine, maxLines) {
  let lines = [];
  let currentLine = title;

  while (currentLine.length > maxCharsPerLine && lines.length < maxLines) {
    let lastSpaceIndex = currentLine.lastIndexOf(" ", maxCharsPerLine);
    if (lastSpaceIndex === -1) {
      break;
    }
    lines.push(currentLine.substring(0, lastSpaceIndex));
    currentLine = currentLine.substring(lastSpaceIndex + 1);
  }

  if (lines.length < maxLines) {
    lines.push(currentLine);
  }
  return lines;
}

async function generateSocialCard(title, outputPath) {
  const templatePath = path.join(
    __dirname,
    "../static/img/Linea_social_card_template.png"
  );
  if (!fs.existsSync(templatePath)) {
    console.error(`Template file not found: ${templatePath}`);
    return;
  }

  const textXPosition = "50%";
  const textYPositionStart = 440;
  const maxCharsPerLine = 42;
  const maxLines = 3;
  const defaultFontSize = 46;
  const largeFontSize = 56;
  const extraLargeFontSize = 85;
  const lineHeight = 60;

  let fontSize;
  if (title.length <= 22) {
    fontSize = extraLargeFontSize;
  } else if (title.length < 35) {
    fontSize = largeFontSize;
  } else {
    fontSize = defaultFontSize;
  }

  const lines = splitTitleIntoLines(title, maxCharsPerLine, maxLines);
  let svgText = `<svg width="1200" height="630">
        <style>
        text { font: ${fontSize}px sans-serif; fill: #190066; font-weight: 600; }
        </style>`;

  lines.forEach((line, index) => {
    let yPosition = textYPositionStart + index * lineHeight;
    svgText += `<text x="${textXPosition}" y="${yPosition}" dominant-baseline="middle" text-anchor="middle">${line}</text>`;
  });

  svgText += `</svg>`;

  try {
    await sharp(templatePath)
      .composite([{ input: Buffer.from(svgText), top: 0, left: 0 }])
      .resize(1200, 630)
      .toFile(outputPath);
    console.log("Social card generated:", outputPath);
  } catch (error) {
    console.error("Error generating social card:", error);
  }
}

async function processMdxFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const cardText = data.title || data.description;
    if (!cardText) {
      console.log(`Skipping ${filePath} due to missing title/description.`);
      return;
    }

    const sanitizedSlug = sanitizeSlug(cardText);
    const outputPath = path.join(imgPath, `${sanitizedSlug}.jpg`);
    await generateSocialCard(cardText, outputPath);
    const updatedFrontMatter = { ...data, image: `/img/socialCards/${sanitizedSlug}.jpg` };
    const updatedContent = matter.stringify(content, updatedFrontMatter);
    const oldContent = fs.readFileSync(filePath, "utf8");

    if (oldContent !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent);
      console.log(`Updated ${filePath} with social card image.`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

function processDirectory(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if ([".mdx", ".md"].includes(path.extname(fullPath))) {
      processMdxFile(fullPath);
    }
  });
}

processDirectory(docsPath);
