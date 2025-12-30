export function injectReferences(content, references) {
  let ref = "\n\n## References\n";
  references.forEach((r, i) => {
    ref += `${i + 1}. [${r.title}](${r.url})\n`;
  });
  return content + ref;
}
