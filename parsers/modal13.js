export default function parse(element, { document }) {
  // Extract product data dynamically
  const productData = Array.from(
    element.querySelectorAll('div#mikmak_embed__expandable-variants li')
  ).map(product => {
    const image = product.querySelector('img');
    const label = product.querySelector('label');

    if (image && label) {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;

      const textElement = label.textContent.trim(); // Direct text content instead of wrapping in <div>

      return [imgElement, textElement];
    }
    return null;
  }).filter(product => product !== null);

  // Create the header row matching the example precisely
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Product Details';
  const headerRow = [headerCell];

  // Prepare table data
  const tableData = [
    headerRow,
    ...productData
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}