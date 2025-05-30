/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards8)'];
  const rows = [];

  const recipeElements = element.querySelectorAll(':scope .featured-recipe');

  recipeElements.forEach((recipe) => {
    const image = recipe.querySelector('picture img');
    const title = recipe.querySelector('span');
    const link = recipe.querySelector('a');

    const imageElement = image.cloneNode(true);

    const titleElement = title ? document.createElement('strong') : null;
    if (titleElement) {
      titleElement.textContent = title.textContent;
    }

    const linkElement = link ? document.createElement('a') : null;
    if (linkElement) {
      linkElement.href = link.href;
      linkElement.textContent = 'View More';
    }

    const secondCellContent = [titleElement, linkElement].filter(Boolean);

    rows.push([
      imageElement,
      secondCellContent.length ? secondCellContent : 'No content available',
    ]);
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}