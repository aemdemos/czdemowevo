export default function parse(element, {document}) {
    const rows = [];

    // Create the header row, which identifies the block type
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Table (striped, bordered)';
    const headerRow = [headerCell];
    rows.push(headerRow);

    // Process the table rows from the input element
    const productRows = element.querySelectorAll('tr');
    productRows.forEach((tr, index) => {
        const cells = [];
        tr.querySelectorAll('td, th').forEach((cell) => {
            const cellContent = cell.textContent.trim();
            if (index === 0 && cell.tagName === 'TH') {
                cells.push(document.createTextNode(cellContent));
            } else {
                const span = document.createElement('span');
                span.textContent = cellContent;
                cells.push(span);
            }
        });
        rows.push(cells);
    });

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}