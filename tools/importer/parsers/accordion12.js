/* global WebImporter */
export default function parse(element, { document }) {
  // The block is made up of two main columns of accordion items.
  // Each column is a <div> containing multiple FAQ items, each FAQ item is a <div> containing [question, answer].
  const mainDiv = element.querySelector(':scope > div'); // the block content container
  const cols = Array.from(mainDiv.children).filter(e => e.tagName === 'DIV'); // two columns
  const rows = [];
  rows.push(['Accordion']); // Header row, matches the block name in the example
  // Loop through each column and FAQ item
  cols.forEach((col) => {
    Array.from(col.children).forEach((faqItem) => {
      // Each FAQ item is a <div> with two children: question <div> and answer <div>
      const children = Array.from(faqItem.children).filter(e => e.tagName === 'DIV');
      if (children.length === 2) {
        // Reference the real elements, do not clone
        rows.push([children[0], children[1]]);
      }
    });
  });
  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
