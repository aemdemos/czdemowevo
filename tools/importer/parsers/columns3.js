/* global WebImporter */
export default function parse(element, { document }) {
  // The content is in: .pocketguide-wrapper > .pocketguide.block > div > div
  const wrapper = element.querySelector('.pocketguide-wrapper > .pocketguide.block > div > div');
  if (!wrapper) return;
  
  // Get all direct children of the wrapper: typically h2, p, p.button-container, p (image)
  const children = Array.from(wrapper.children);
  
  // The last <p> contains the image (picture), all others are text/button content
  let imgContainer = null;
  let leftContent = [];
  if (children.length > 0) {
    if (children[children.length - 1].querySelector('picture, img')) {
      imgContainer = children[children.length - 1];
      leftContent = children.slice(0, children.length - 1);
    } else {
      // fallback: if no image found, all content is left
      leftContent = children;
    }
  }
  
  // Make columns3 block: header, then two columns (content | image)
  const tableRows = [
    ['Columns (columns3)'],
    [leftContent, imgContainer]
  ];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}
