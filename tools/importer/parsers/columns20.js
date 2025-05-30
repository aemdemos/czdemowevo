/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns (columns20)'];

    // Extract Buy Online button/link and logo
    const buyOnlineContainer = element.querySelector('.buy-link');
    const buyOnlineLink = buyOnlineContainer?.querySelector('a');
    const buyOnlineLogo = buyOnlineContainer?.querySelector('.buy-link-image span.icon');

    // Extract Product Locator button/link and image
    const productLocatorContainer = element.querySelector('.locator-link');
    const productLocatorLink = productLocatorContainer?.querySelector('a');
    const productLocatorImage = productLocatorContainer?.querySelector('.locator-link-image picture');

    // Ensure all extracted content is properly handled
    const cells = [
        headerRow,

        // Second row with extracted content
        [
            [buyOnlineLink, buyOnlineLogo],
            [productLocatorLink, productLocatorImage],
        ],
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(table);
}