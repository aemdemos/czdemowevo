export default function parse(element, { document }) {
  const productDataString = element.querySelector('#mikmak_embed__view-data')?.innerHTML;
  const productData = productDataString ? JSON.parse(productDataString) : {};

  // Ensure the header row matches example specifications
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Product Details';

  const productDetails = [];

  if (productData.products) {
    // Dynamically extract data for each product
    productData.products.forEach(product => {
      const rowData = [];

      if (product.asset) {
        const imgElement = document.createElement('img');
        imgElement.src = product.asset;
        rowData.push(imgElement);
      }

      if (product.name) {
        const nameElement = document.createElement('p');
        nameElement.textContent = product.name;
        rowData.push(nameElement);
      }

      productDetails.push(rowData);
    });
  } else {
    // Handle cases where products are missing
    const errorElement = document.createElement('p');
    errorElement.textContent = 'No product details available';
    productDetails.push([errorElement]);
  }

  // Ensure the table structure adheres to the example format
  const cells = [headerRow, ...productDetails];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}