/* global WebImporter */
export default function parse(element, { document }) {
  // For the Hero block: the example expects a single column table with first row 'Hero' (header),
  // a second row for image (blank in this case), and a third row for text/cta.
  // Our input contains just a CTA button; there is no image or heading text.
  // Reference the button directly in the last row.

  const cta = element.querySelector('a');
  // Ensure we only add the CTA if present
  const ctaCell = cta ? [cta] : [''];

  const cells = [
    ['Hero'],
    [''],
    ctaCell,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
