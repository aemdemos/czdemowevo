export default function parse(element, { document }) {
  // Helper to extract quote cards
  const extractQuoteCard = (quoteCard) => {
    const quoteText = quoteCard.querySelector('p')?.textContent.trim();
    const aphorist = quoteCard.querySelector('.aphorist ul li:first-child')?.textContent.trim();
    const title = quoteCard.querySelector('.aphorist ul li:last-child')?.textContent.trim();
    const image = quoteCard.querySelector('.aphorist picture img');

    const imageElement = image ? (() => {
      const img = document.createElement('img');
      img.src = image.src;
      img.alt = image.alt || '';
      return img;
    })() : null;

    const blockContent = [];
    if (quoteText) blockContent.push(document.createTextNode(quoteText));
    if (aphorist || title) {
      const authorInfo = document.createElement('div');
      if (aphorist) {
        const author = document.createElement('strong');
        author.textContent = aphorist;
        authorInfo.appendChild(author);
      }
      if (title) {
        const titleNode = document.createElement('span');
        titleNode.textContent = ` - ${title}`;
        authorInfo.appendChild(titleNode);
      }
      blockContent.push(authorInfo);
    }
    if (imageElement) blockContent.push(imageElement);

    return blockContent;
  };

  const quoteCards = element.querySelectorAll('.quotecard');

  const rows = Array.from(quoteCards).map((card) => [extractQuoteCard(card)]);

  const table = WebImporter.DOMUtils.createTable([
    ['Quote Carousel'],
    ...rows
  ], document);

  element.replaceWith(table);
}