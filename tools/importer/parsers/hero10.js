/* global WebImporter */
export default function parse(element, { document }) {
  // According to the example and screenshots, the Hero block should have:
  // Row 1: ['Hero'] (header)
  // Row 2: [img] (background image)
  // Row 3: [''] (empty)

  // Create the background image element (the image is not in the HTML footer, but required by the example)
  const img = document.createElement('img');
  img.src = 'https://main--czdemowevo--aemdemos.hlx.page/media_1ca653f4f0fb50020a010f62ded9172d64671042a.jpg?width=750&height=415';
  img.alt = 'Decorative double Helix';

  // Construct the table as per the example
  const cells = [
    ['Hero'],
    [img],
    [''],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
