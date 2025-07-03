const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

// paths to docs/JSON files
const DOCS_PATH = path.join(__dirname, "../docs");
const FEATURED_JSON = path.join(
  __dirname,
  "../src/theme/FeaturedArticles.json",
);

// load JSON files
const loadJson = (filePath) => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }
  return {};
};

// save JSON files
const saveJson = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
};

// defining category names/corresponding JSON files
const CATEGORIES = {
  featured: FEATURED_JSON,
};

// recurse docs
const getMarkdownFiles = (dir) => {
  const files = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (file.endsWith(".md") || file.endsWith(".mdx")) {
      files.push(fullPath);
    }
  });
  return files;
};

// main script
const updateCategories = () => {
  const categoryData = {
    featured: {},
  };

  // parse front matter
  const markdownFiles = getMarkdownFiles(DOCS_PATH);
  markdownFiles.forEach((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);
    const relativePath = path.relative(DOCS_PATH, filePath); // get path relative to docs folder
    const docId = relativePath.replace(/\\/g, "/").replace(/\.mdx?$/, ""); // use relative path

    // check for `category` front matter
    if (data.category && CATEGORIES[data.category]) {
      categoryData[data.category][docId] = true;
    }
  });

  // update JSON files
  Object.entries(CATEGORIES).forEach(([category, jsonPath]) => {
    const currentData = loadJson(jsonPath);
    const updatedData = categoryData[category];

    // remove keys not present in updatedData
    Object.keys(currentData).forEach((key) => {
      if (!updatedData[key]) {
        delete currentData[key];
      }
    });

    // add/update keys in currentData
    Object.keys(updatedData).forEach((key) => {
      currentData[key] = true;
    });

    // save JSON file
    saveJson(jsonPath, currentData);
  });

  console.log("Featured articles JSON file updated successfully");
};

// run
updateCategories();
