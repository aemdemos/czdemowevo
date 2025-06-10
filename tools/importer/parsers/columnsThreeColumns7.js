/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all content from the element
  const span = element.querySelector('span');
  const imgs = Array.from(element.querySelectorAll('img'));

  // Compose a badge for the column(s): Powered by + all logos
  const badge = document.createElement('div');
  if (span) badge.appendChild(span.cloneNode(true));
  imgs.forEach(img => badge.appendChild(img.cloneNode(true)));

  // Since there is not enough unique content to fill 3 columns,
  // we distribute the badge in the first column and leave the other columns empty.
  // This preserves the columns block structure with 3 columns, matching the requirement
  const cells = [
    ['Columns (columnsThreeColumns7)'],
    [badge, '', '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
