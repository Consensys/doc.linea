const MAX_REASON_LENGTH = 1000;

function stripHtmlTags(text: string): string {
  let result = "";
  let insideTag = false;

  for (const char of text) {
    if (char === "<") {
      insideTag = true;
      continue;
    }

    if (char === ">") {
      insideTag = false;
      continue;
    }

    if (!insideTag) {
      result += char;
    }
  }

  return result;
}

export function sanitizeFeedbackText(text: string): string {
  const cappedText = text.slice(0, MAX_REASON_LENGTH);

  return stripHtmlTags(cappedText)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // strip markdown images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // strip markdown links
    .replace(/@/g, "@\u200B") // break GitHub @mentions
    .replace(/#(\d)/g, "#\u200B$1") // break GitHub #issue references
    .slice(0, MAX_REASON_LENGTH)
    .trim();
}
