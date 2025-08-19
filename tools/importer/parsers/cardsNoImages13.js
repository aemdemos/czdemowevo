/* global WebImporter */
export default function parse(element, { document }) {
  // Cards header row
  const rows = [['Cards']];

  // Get all immediate children that represent steps/cards
  // Steps are in: <div class="steps block"> <div> ... </div> </div>
  // Each card is inside: <div> <div><div class="step"><span>n</span></div> <p>Title</p> <p>Description</p> </div> </div>

  // Find all direct card wrappers (each representing one card)
  const stepBlock = element.querySelector('.steps.block');
  if (!stepBlock) {
    // If there is no block, don't do anything
    return;
  }
  const cardWrappers = stepBlock.querySelectorAll(':scope > div');

  cardWrappers.forEach((cardWrapper) => {
    // The card content is the first (and only) child of this div
    // which contains: <div><div class="step"><span>n</span></div> <p>Title</p> <p>Description</p> </div>
    const inner = cardWrapper.firstElementChild;
    if (!inner) return;
    // Get all <p> tags inside inner
    const paragraphs = inner.querySelectorAll('p');

    // Title is first <p>, description is second <p>
    const cardCellContent = [];
    if (paragraphs.length > 0) {
      // Make title bold - use <strong>, but reference the original element
      const strong = document.createElement('strong');
      strong.innerHTML = paragraphs[0].innerHTML;
      cardCellContent.push(strong);
    }
    if (paragraphs.length > 1) {
      cardCellContent.push(document.createElement('br'));
      cardCellContent.push(paragraphs[1]); // reference the original element
    }
    rows.push([cardCellContent]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
