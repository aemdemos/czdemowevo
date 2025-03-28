export default function parse(element, { document }) {
  // Create the header row for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  // Extract the content of the quote
  const quoteText = document.createElement('p');
  quoteText.innerHTML = 'Aliquando sadipscing eum ea, aliquid postulant qui in. Option <strong>vulputate</strong> an ius, everti <em>efficiendi</em> ex qui, inimicus liberavisse reprehendunt sit ei.';

  // Extract the attribution
  const attributionText = document.createElement('p');
  attributionText.innerHTML = '<em>Attribution, <span style="font-style:italic;">Source</span></em>';

  // Create the rows for the block table
  const rows = [
    headerRow,
    [quoteText],
    [attributionText],
  ];

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}