/* global WebImporter */
export default function parse(element, { document }) {
  // Get the columns-wrapper (should always exist in the structure)
  const columnsWrapper = element.querySelector('.columns-wrapper');
  if (!columnsWrapper) return;

  // Get the .columns.block container
  const columnsBlock = columnsWrapper.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get columns inside the block (should be two: left image, right text)
  const columns = columnsBlock.querySelectorAll(':scope > div');
  if (columns.length < 2) return;
  const leftCol = columns[0];
  const rightCol = columns[1];

  // Extract the main image (picture preferred, otherwise img)
  let mainImage = leftCol.querySelector('picture');
  if (!mainImage) {
    mainImage = leftCol.querySelector('img');
  }

  // Extract heading (mandatory)
  let heading = rightCol.querySelector('h1, h2, h3, h4, h5, h6');

  // Extract subheading (first <p> after the heading)
  let subheading = null;
  if (heading) {
    let node = heading.nextElementSibling;
    while (node && node.tagName !== 'P') node = node.nextElementSibling;
    if (node && node.tagName === 'P') subheading = node;
  }

  // Extract CTA (button or prominent link)
  let cta = null;
  const buttonP = rightCol.querySelector('p.button-container');
  if (buttonP) {
    const a = buttonP.querySelector('a');
    if (a) cta = a;
  }

  // Compose content cell: image, heading, subheading, CTA (in this order, only if present)
  const content = [];
  if (mainImage) content.push(mainImage);
  if (heading) content.push(heading);
  if (subheading) content.push(subheading);
  if (cta) content.push(cta);

  // Build the block table as per the specification
  const table = WebImporter.DOMUtils.createTable([
    ['Hero (hero16)'],
    [content],
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
