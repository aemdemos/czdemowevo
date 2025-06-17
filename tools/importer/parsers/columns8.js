/* global WebImporter */
export default function parse(element, { document }) {
  // Find the core columns block structure
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;

  // In the .columns.block, the immediate child divs are the columns
  const columnDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (!columnDivs.length) return;

  // For the sample HTML, column 1 is the image, column 2 is the heading + paragraph
  // To maintain generality and resilience, handle both cases
  const contentRow = columnDivs.map((col) => {
    // If this column contains a .columns-img-col, use its picture/img only
    const imgCol = col.querySelector('.columns-img-col');
    if (imgCol) {
      // Find the picture element (prefer) or img
      const picture = imgCol.querySelector('picture');
      if (picture) return picture;
      const img = imgCol.querySelector('img');
      if (img) return img;
      // fallback, if nothing found just return the container
      return imgCol;
    }
    // For the text column, preserve all of its direct children (headings, paragraphs, etc.)
    return Array.from(col.children);
  });

  // Table header row must match exactly
  const headerRow = ['Columns (columns8)'];

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original section with the table
  element.replaceWith(table);
}
