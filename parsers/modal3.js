export default function parse(element, { document }) {
  // Helper to create a table row with a single header cell
  const createHeaderRow = (headerText) => {
    const headerCell = document.createElement('strong');
    headerCell.textContent = headerText;
    return [headerCell];
  };

  // Helper to create a list item row
  const createListItemRow = (listItems) => {
    const ul = document.createElement('ul');
    listItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ul.appendChild(li);
    });
    return [ul];
  };

  // Extract the title
  const title = element.querySelector('.default-content-wrapper h1')?.textContent.trim();

  // Extract the image
  const imgElement = element.querySelector('.columns-img-col img');
  const img = imgElement ? imgElement.cloneNode(true) : null;

  // Extract ingredients
  const ingredientsHeader = element.querySelector('h2#ingredients')?.textContent.trim();
  const ingredientsList = Array.from(element.querySelectorAll('h2#ingredients + ul li'))
    .map(li => li.textContent.trim());

  // Extract directions
  const directionsHeader = element.querySelector('h2#directions')?.textContent.trim();
  const directionsList = Array.from(element.querySelectorAll('h2#directions + ul li'))
    .map(li => li.textContent.trim());

  // Extract syrup ingredients
  const syrupIngredientsHeader = Array.from(element.querySelectorAll('p'))
    .find(p => p.textContent.trim() === "Blackberry Mint Syrup Ingredients")?.textContent.trim();
  const syrupIngredientsList = syrupIngredientsHeader ? Array.from(element.querySelectorAll('p + ul li'))
    .slice(0, 4) // Extract only the first 4 items for syrup ingredients
    .map(li => li.textContent.trim()) : [];

  // Extract syrup directions
  const syrupDirectionsHeader = Array.from(element.querySelectorAll('p'))
    .find(p => p.textContent.trim() === "Blackberry Mint Syrup Directions")?.textContent.trim();
  const syrupDirectionsList = syrupDirectionsHeader ? Array.from(element.querySelectorAll('p + ul li'))
    .slice(4) // Extract remaining items for syrup directions
    .map(li => li.textContent.trim()) : [];

  // Build the table rows
  const rows = [];

  // Title row
  if (title) {
    rows.push(createHeaderRow(title));
  }

  // Image row
  if (img) {
    rows.push([img]);
  }

  // Ingredients block
  if (ingredientsHeader) {
    rows.push(createHeaderRow(ingredientsHeader));
    rows.push(createListItemRow(ingredientsList));
  }

  // Directions block
  if (directionsHeader) {
    rows.push(createHeaderRow(directionsHeader));
    rows.push(createListItemRow(directionsList));
  }

  // Syrup ingredients block
  if (syrupIngredientsHeader) {
    rows.push(createHeaderRow(syrupIngredientsHeader));
    rows.push(createListItemRow(syrupIngredientsList));
  }

  // Syrup directions block
  if (syrupDirectionsHeader) {
    rows.push(createHeaderRow(syrupDirectionsHeader));
    rows.push(createListItemRow(syrupDirectionsList));
  }

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}