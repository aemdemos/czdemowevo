export default function parse(element, { document }) {
    const cells = [];

    // Add the header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Cards';
    const headerRow = [headerCell];
    cells.push(headerRow);

    // Extract buy link content
    const buyLinkContainer = element.querySelector('.buy-link.button-container');
    if (buyLinkContainer) {
        const buyLinkAnchor = buyLinkContainer.querySelector('a');
        const buyLinkImage = buyLinkContainer.querySelector('.buy-link-image');
        const buyLinkContent = [];

        if (buyLinkAnchor) {
            const buyLinkText = document.createElement('p');
            buyLinkText.textContent = buyLinkAnchor.textContent;
            buyLinkContent.push(buyLinkText);
            buyLinkContent.push(buyLinkAnchor.cloneNode(true));
        }
        if (buyLinkImage) {
            buyLinkContent.push(buyLinkImage.cloneNode(true));
        }
        cells.push([buyLinkContent]);
    }

    // Extract product locator link content
    const locatorLinkContainer = element.querySelector('.locator-link.button-container');
    if (locatorLinkContainer) {
        const locatorLinkAnchor = locatorLinkContainer.querySelector('a');
        const locatorLinkImage = locatorLinkContainer.querySelector('.locator-link-image');
        const locatorLinkContent = [];

        if (locatorLinkAnchor) {
            const locatorLinkText = document.createElement('p');
            locatorLinkText.textContent = locatorLinkAnchor.textContent;
            locatorLinkContent.push(locatorLinkText);
            locatorLinkContent.push(locatorLinkAnchor.cloneNode(true));
        }
        if (locatorLinkImage) {
            locatorLinkContent.push(locatorLinkImage.cloneNode(true));
        }
        cells.push([locatorLinkContent]);
    }

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block
    element.replaceWith(block);
}