export default function parse(element, { document }) {
  // Helper function to extract data from each recipe
  function extractRecipeData(recipeElement) {
    const link = recipeElement.querySelector('a');
    const href = link?.href;
    const name = link?.querySelector('span')?.textContent?.trim();
    const image = link?.querySelector('img');

    const imgElement = document.createElement('img');
    imgElement.src = image?.src;
    imgElement.alt = image?.alt || '';

    const linkElement = document.createElement('a');
    linkElement.href = href;
    linkElement.textContent = name;

    return [imgElement, linkElement];
  }

  // Extract all recipes
  const recipeElements = element.querySelectorAll('.recipe');
  const rows = [];

  recipeElements.forEach((recipeElement) => {
    const style = recipeElement.style;

    // Skip hidden recipes (display: none)
    if (style && style.display === 'none') {
      return;
    }

    const recipeData = extractRecipeData(recipeElement);

    // Combine image and link in a single cell
    const cellContent = document.createElement('div');
    recipeData.forEach((item) => cellContent.appendChild(item));

    rows.push([cellContent]);
  });

  // Create the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Recipes'; // Corrected header text
  const headerRow = [headerCell];

  const cells = [
    headerRow, // Header row
    ...rows,   // Recipe rows
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}