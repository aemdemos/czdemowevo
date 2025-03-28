export default function parse(element, { document }) {
    // Import the table creation utility
    const { createTable } = WebImporter.DOMUtils;

    // Extract recipes from the HTML structure
    const recipes = Array.from(element.querySelectorAll('.recipe')).filter(recipe => recipe.style.display !== 'none');

    // Build an array of rows for the table
    const rows = recipes.map(recipe => {
        const link = recipe.querySelector('a');
        const image = recipe.querySelector('img');
        const name = link ? link.querySelector('span').textContent.trim() : '';
        const url = link ? link.href : '';
        const imgElement = document.createElement('img');
        imgElement.src = image?.src || '';
        imgElement.alt = name;

        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.textContent = name;

        return [[imgElement, linkElement]]; // Combine image and link
    });

    // Add a header row with the block type
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Modal';
    const headerRow = [headerCell];
    rows.unshift(headerRow);

    // Create the block table
    const blockTable = createTable(rows, document);

    // Replace the original element with the new table
    element.replaceWith(blockTable);
}