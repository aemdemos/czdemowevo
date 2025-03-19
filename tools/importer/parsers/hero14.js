export default function parse(element, {document}) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  const quoteCards = element.querySelectorAll('.quotecard');

  const contentRows = Array.from(quoteCards).map(card => {
    const quoteText = card.querySelector('p')?.textContent || '';
    const authorImage = card.querySelector('picture img')?.src || '';
    const authorName = card.querySelector('ul li:nth-child(1)')?.textContent || '';
    const authorTitle = card.querySelector('ul li:nth-child(2)')?.textContent || '';

    const quoteParagraph = document.createElement('p');
    quoteParagraph.textContent = quoteText;

    const imageElement = document.createElement('img');
    imageElement.src = authorImage;
    imageElement.alt = '';

    const authorNameElement = document.createElement('p');
    authorNameElement.textContent = authorName;
    authorNameElement.style.fontWeight = 'bold';

    const authorTitleElement = document.createElement('p');
    authorTitleElement.textContent = authorTitle;

    const contentCell = [quoteParagraph, imageElement, authorNameElement, authorTitleElement];
    return [contentCell];
  });

  const cells = [headerRow, ...contentRows];
  const generatedTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(generatedTable);
}