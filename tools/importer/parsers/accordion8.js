export default function parse(element, {document}) {
  const faqContainer = element.querySelector('#faq-replace-questions-container');
  const items = faqContainer ? faqContainer.querySelectorAll('div') : [];

  // Create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Accordion';
  const headerRow = [headerCell];

  const cells = [headerRow];

  // Extract and organize FAQ items
  items.forEach((item) => {
      const title = document.createElement('div');
      const picture = item.querySelector('picture');
      const img = picture ? picture.querySelector('img') : null;

      if (img) {
          title.appendChild(img.cloneNode(true));
      }

      const questionText = item.firstChild ? document.createTextNode(item.firstChild.textContent.trim()) : null;
      if (questionText) {
          title.appendChild(questionText);
      }

      const content = item.querySelector('div');
      const clonedContent = content ? content.cloneNode(true) : null;

      // Only add rows with valid title and content
      if (title.hasChildNodes() && clonedContent) {
          cells.push([
              title,
              clonedContent
          ]);
      }
  });

  // Create table and replace the original element
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}