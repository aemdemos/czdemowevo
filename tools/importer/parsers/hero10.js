/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: "Hero"
  const headerRow = ['Hero'];

  // 2. Background image row
  const img = document.createElement('img');
  img.src = 'https://main--czdemowevo--aemdemos.hlx.page/media_1ca653f4f0fb50020a010f62ded9172d64671042a.jpg?width=750&height=415';
  img.alt = 'Decorative double Helix';
  const imageRow = [img];

  // 3. Content row: heading in block
  const heading = document.createElement('h1');
  heading.textContent = 'Heading in Block';
  const contentRow = [heading];

  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
