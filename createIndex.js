"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var processDirectory = function (directoryPath) {
    console.log("Processing directory: ".concat(directoryPath));
    var categoryFile = path.join(directoryPath, '_category_.json');
    var indexFile = path.join(directoryPath, 'index.mdx');
    var sidebarFile = path.join(__dirname, 'sidebars.js');
    if (fs.existsSync(categoryFile) && fs.existsSync(indexFile)) {
        var categoryLabel = void 0;
        try {
            var categoryData = JSON.parse(fs.readFileSync(categoryFile, 'utf8'));
            categoryLabel = categoryData.label;
            console.log("Category label: ".concat(categoryLabel));
        }
        catch (error) {
            console.error("Error parsing JSON in file: ".concat(categoryFile));
            return;
        }
        // Update or add to sidebar.js
        var sidebarContent = fs.readFileSync(sidebarFile, 'utf8');
        if (!sidebarContent.includes(categoryLabel)) {
            var sidebarEntry = "\n        {\n          type: \"category\",\n          label: \"".concat(categoryLabel, "\",\n          link: {\n            type: \"doc\",\n            id: \"").concat(path.relative(__dirname, indexFile).replace(/\\/g, '/').replace('.mdx', ''), "\"\n          },\n          items: [\n            ").concat(fs.readdirSync(directoryPath)
                .filter(function (file) { return file.endsWith('.mdx') && file !== 'index.mdx'; })
                .map(function (file) { return "\"".concat(path.relative(__dirname, path.join(directoryPath, file)).replace(/\\/g, '/').replace('.mdx', ''), "\""); })
                .join(',\n'), "\n          ],\n        },\n      ");
            fs.appendFileSync(sidebarFile, sidebarEntry);
            console.log("Added category to sidebar.js for: ".concat(categoryLabel));
        }
        else {
            console.log("Category already exists in sidebar.js: ".concat(categoryLabel));
        }
        // Create or update index.mdx
        if (!fs.existsSync(indexFile)) {
            var indexContent = "---\ntitle: `".concat(categoryLabel, "`\n---\n\nimport DocCardList from '@theme/DocCardList';\n\n<DocCardList />\n");
            fs.writeFileSync(indexFile, indexContent);
            console.log("Created index.mdx for: ".concat(categoryLabel));
        }
        else {
            console.log("index.mdx already exists for: ".concat(categoryLabel));
        }
        var subdirectories = fs.readdirSync(directoryPath, { withFileTypes: true })
            .filter(function (dirent) { return dirent.isDirectory(); })
            .map(function (dirent) { return path.join(directoryPath, dirent.name); });
        console.log("Subdirectories: ".concat(subdirectories.join(', ')));
        subdirectories.forEach(function (subdirectory) { return processDirectory(subdirectory); });
    }
};
// Start processing from the root docs directory
var rootDirectory = path.join(__dirname, 'docs');
processDirectory(rootDirectory);
