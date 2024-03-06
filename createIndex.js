const fs = require('fs');
const path = require('path');

function processDirectory(directoryPath) {
  const categoryFile = path.join(directoryPath, '_category_.json');
  const indexFile = path.join(directoryPath, 'index.mdx');
  const sidebarFile = path.join(__dirname, 'sidebars.js');

  if (fs.existsSync(categoryFile) && fs.existsSync(indexFile)) {
    let categoryLabel;

    try {
      const categoryData = JSON.parse(fs.readFileSync(categoryFile, 'utf8'));
      categoryLabel = categoryData.label;
    } catch (error) {
      console.error(`Error parsing JSON in file: ${categoryFile}`);
      return;
    }

    // Update or add to sidebar.js
    const sidebarContent = fs.readFileSync(sidebarFile, 'utf8');
    if (!sidebarContent.includes(categoryLabel)) {
      const sidebarEntry = `
        {
          type: "category",
          label: "${categoryLabel}",
          link: {
            type: "doc",
            id: "${path.relative(__dirname, indexFile).replace(/\\/g, '/').replace('.mdx', '')}"
          },
          items: [
            ${fs.readdirSync(directoryPath)
              .filter(file => file.endsWith('.mdx') && file !== 'index.mdx')
              .map(file => `"${path.relative(__dirname, path.join(directoryPath, file)).replace(/\\/g, '/').replace('.mdx', '')}"`)
              .join(',\n')}
          ],
        },
      `;

      fs.appendFileSync(sidebarFile, sidebarEntry);
    }

    // Create or update index.mdx
    if (!fs.existsSync(indexFile)) {
      const indexContent = `---
title: \`${categoryLabel}\`
---

import DocCardList from '@theme/DocCardList';

<DocCardList />
`;

      fs.writeFileSync(indexFile, indexContent);
    }
  }

  // Process subdirectories
  const subdirectories = fs.readdirSync(directoryPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => path.join(directoryPath, dirent.name));

  subdirectories.forEach(subdirectory => processDirectory(subdirectory));
}

// Start processing from the root docs directory
const rootDirectory = path.join(__dirname, 'docs');
processDirectory(rootDirectory);