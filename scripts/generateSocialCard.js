const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const sharp = require("sharp");

const docsPath = path.join(__dirname, "../docs");
const imgPath = path.join(__dirname, "../static/img/socialCards");

// Ensure the output directory exists
if (!fs.existsSync(imgPath)) {
  fs.mkdirSync(imgPath, { recursive: true });
}

// Function to sanitize a string for use in URLs/filenames
function sanitizeSlug(slug) {
  return slug
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[?,:']/g, "")
    .replace(/[-]+/g, "-")
    .replace(/[&]/g, "-and-")
    .replace(/[^a-z0-9-]/g, "");
}

// Helper function to split title into lines
function splitTitleIntoLines(title, maxCharsPerLine, maxLines) {
  let lines = [];
  let currentLine = title;

  while (currentLine.length > maxCharsPerLine) {
    let lastSpaceIndex = currentLine.lastIndexOf(" ", maxCharsPerLine);
    if (lastSpaceIndex === -1 || lines.length === maxLines - 1) {
      // Truncate and add "..." if it's the last line and still overflowing
      if (
        lines.length === maxLines - 1 &&
        currentLine.length > maxCharsPerLine
      ) {
        currentLine = currentLine.substring(0, maxCharsPerLine - 3) + "...";
      }
      lines.push(currentLine);
      return lines; // Stop processing if we can't split further or it's the last line
    }
    lines.push(currentLine.substring(0, lastSpaceIndex));
    currentLine = currentLine.substring(lastSpaceIndex + 1);
  }

  // Add the last part of the title if it didn't exceed the line limit
  lines.push(currentLine);
  return lines;
}

// Function to generate a social card
async function generateSocialCard(title, outputPath) {
  const templatePath = path.join(
    __dirname,
    "../static/img/Linea_social_card_template.png",
  );

  // Variables for easy adjustment of text position
  const textXPosition = "50%"; // X position (as a percentage to center the text horizontally)
  const textYPositionStart = 440; // Starting Y position for the first line of text

  const maxCharsPerLine = 42; // Maximum characters per line
  const maxLines = 3; // Maximum number of lines
  const defaultFontSize = 46; // Default font size for the text
  const largeFontSize = 56; // Larger font size for titles less than 35 characters
  const extraLargeFontSize = 85; // Even larger font size for titles 24 characters or less
  const lineHeight = 60; // Line height

  // Determine font size based on title length
  let fontSize;
  if (title.length <= 22) {
    fontSize = extraLargeFontSize;
  } else if (title.length < 35) {
    fontSize = largeFontSize;
  } else {
    fontSize = defaultFontSize;
  }

  // Function to split the title into lines based on maxCharsPerLine
  const lines = splitTitleIntoLines(title, maxCharsPerLine, maxLines);

  // Construct the SVG with text elements for each line
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

// Function to process a single .mdx/.md file
async function processMdxFile(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  // Determine card text: Use 'title' if available; otherwise, fallback to 'description'
  const cardText = data.title || data.description;

  // Skip file if neither found
  if (!cardText) {
    console.log(
      `Skipping ${filePath} as it lacks both 'title' and 'description'.`,
    );
    return;
  }

  const sanitizedSlug = sanitizeSlug(cardText);
  const outputPath = path.join(imgPath, `${sanitizedSlug}.jpg`);

  // Generate social card using the selected text.
  await generateSocialCard(cardText, outputPath);

  // Update the file's front matter to include the generated image path
  const updatedFrontMatter = {
    ...data,
    image: `/img/socialCards/${sanitizedSlug}.jpg`,
  };
  const updatedContent = matter.stringify(content, updatedFrontMatter);

  fs.writeFileSync(filePath, updatedContent);
  console.log(`Updated ${filePath} with social card image.`);
}

// Recursive function to find and process all MDX files
function processDirectory(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (
      path.extname(fullPath) === ".mdx" ||
      path.extname(fullPath) === ".md"
    ) {
      processMdxFile(fullPath);
    }
  });
}

processDirectory(docsPath);
