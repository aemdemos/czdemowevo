export default function parse(element, {document}) {
  const cells = [];

  // Correcting Header Row without nesting
  const headerRow = ["Modal"]; // Ensure header text matches example exactly as a single cell
  cells.push(headerRow);

  // Extracting Product Information
  const productElements = element.querySelectorAll('#mikmak_embed__variant-shelf img');
  productElements.forEach((img) => {
    const label = img.nextElementSibling?.textContent || "Unknown Product";
    const productName = document.createElement('p');
    productName.textContent = label;

    const productImage = document.createElement('img');
    productImage.src = img.src;
    productImage.alt = img.alt || "Image not available"; // Fallback for missing alt attribute

    cells.push([productName, productImage]);
  });

  // Creating Block Table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}