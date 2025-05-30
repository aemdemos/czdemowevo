/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards19)'];

  // Extract recipe elements
  const recipes = Array.from(element.querySelectorAll(':scope > div.recipe')).filter(
    (recipe) => recipe.style.display !== 'none'
  );

  // Map recipes to table rows
  const rows = recipes.map((recipe) => {
    const image = recipe.querySelector('picture');
    const title = recipe.querySelector('span');

    return [image, title];
  });

  // Create the table block
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the block
  element.replaceWith(block);
}