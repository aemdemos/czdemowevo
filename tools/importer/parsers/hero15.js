/* global WebImporter */
 export default function parse(element, { document }) {
    const headerRow = ['Hero (hero15)'];

    const backgroundImageColumn = element.querySelector('.background-image-column');
    const backgroundImage = backgroundImageColumn.querySelector('img');

    const title = backgroundImageColumn.querySelector('h2');
    const subheading = backgroundImageColumn.querySelector('p:not(.button-container)');
    const ctaContainer = backgroundImageColumn.querySelector('.button-container');
    const cta = ctaContainer ? ctaContainer.querySelector('a') : null;

    const content = document.createElement('div');
    if (backgroundImage) content.append(backgroundImage);
    if (title) content.append(title);
    if (subheading) content.append(subheading);
    if (cta) content.append(cta);

    const cells = [
        headerRow,
        [content],
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(block);
}