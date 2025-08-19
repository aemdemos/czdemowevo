/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate button containers (Buy Online, Product Locator)
  const containers = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Skip if fewer than expected columns
  if (containers.length < 2) return;

  // Each column in the block is a button-container (with button and icon/image)
  // Use the entire container as the column cell, preserving icon/img

  // Table header as specified in example
  const headerRow = ['Columns (columns6)'];
  const contentRow = containers;

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
