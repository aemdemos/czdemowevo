export default function parse(element, { document }) {
    // Create the header row with proper block name, ensuring no nested <strong> tags
    const headerRow = ['Fragment'];

    // Extract the link for the fragment content dynamically
    const navLink = element.querySelector('.nav-brand p a'); // Adjusted to select the correct link

    let fragmentURL = '';
    if (navLink && navLink.href) {
        fragmentURL = navLink.href; // Dynamically extracted based on provided HTML
    }

    // Handle edge case where URL might be missing
    if (!fragmentURL) {
        console.warn('Fragment URL not found.');
        fragmentURL = 'URL Not Found'; // Placeholder text for missing URL
    }

    // Create the content row with the extracted URL
    const contentRow = [document.createElement('a')];
    contentRow[0].href = fragmentURL;
    contentRow[0].textContent = fragmentURL;

    // Create the table structure
    const tableData = [headerRow, contentRow];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}