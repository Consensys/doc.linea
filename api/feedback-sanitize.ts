const MAX_REASON_LENGTH = 1000;

function stripHtmlTags(text: string): string {
  let result = "";
  let cursor = 0;

  while (cursor < text.length) {
    const tagStart = text.indexOf("<", cursor);
    if (tagStart === -1) {
      return result + text.slice(cursor);
    }

    const tagEnd = text.indexOf(">", tagStart + 1);
    if (tagEnd === -1) {
      return result + text.slice(cursor);
    }

    result += text.slice(cursor, tagStart);
    cursor = tagEnd + 1;
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
