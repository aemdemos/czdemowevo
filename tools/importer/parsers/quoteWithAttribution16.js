/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to build attribution (author/source, optionally with image)
  function extractAttribution(aphorist) {
    if (!aphorist) return '';
    // get the <picture> element, if any
    const pic = aphorist.querySelector('picture');
    // get the attribution text from ul > li
    const lis = aphorist.querySelectorAll('ul li');
    const text = Array.from(lis).map(li => li.textContent.trim()).filter(Boolean).join(', ');
    // Compose: [picture(if present), text(if present)]
    if (pic && text) {
      // picture and text (separated by single space)
      const frag = document.createDocumentFragment();
      frag.append(pic);
      frag.append(' ' + text);
      return frag;
    } else if (pic) {
      return pic;
    } else {
      return text;
    }
  }

  // Find the active quotecard (should always be present)
  const card = element.querySelector('.quotecard.active, .quotecard[aria-selected="true"]');
  if (!card) return;

  // Get the quote paragraph (required)
  const quote = card.querySelector('p');

  // Get the attribution, if available
  const aphorist = card.querySelector('.aphorist');
  const attribution = extractAttribution(aphorist);

  // Construct the block table as per guidance
  const headerRow = ['Quote (quoteWithAttribution16)'];
  const quoteRow = [quote];
  const attributionRow = [attribution];
  const cells = [headerRow, quoteRow, attributionRow];

  // Generate the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
