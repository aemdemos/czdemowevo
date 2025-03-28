export default function parse(element, { document }) {
  // Extract the "Featured Drinks" section header dynamically
  const sectionHeader = element.querySelector('h2#featured-drinks');
  const headerRow = [document.createElement('strong')];
  if (sectionHeader) {
    headerRow[0].textContent = sectionHeader.textContent.trim();
  } else {
    headerRow[0].textContent = 'Featured Drinks'; // Default header text in case header is missing
  }

  // Extract all recipes from the "Featured Drinks" section
  const recipes = Array.from(element.querySelectorAll('.featured-recipe')).map((recipe) => {
    const link = recipe.querySelector('a');
    const image = recipe.querySelector('img');
    const title = recipe.querySelector('span');

    if (!link || !image || !title) {
      return null; // Skip recipes with missing data
    }

    // Create new anchor element for the link
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.href;

    // Combine image and title into a single cell
    const imgElement = document.createElement('img');
    imgElement.src = image.src;
    imgElement.alt = image.alt;

    const spanElement = document.createElement('span');
    spanElement.textContent = title.textContent.trim();

    return [imgElement, spanElement, anchor];
  }).filter(Boolean); // Remove any null recipes

  // Construct the table rows for the "Featured Drinks" block
  const tableData = [headerRow, ...recipes.map(([image, title, anchor]) => [image, title, anchor])];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}