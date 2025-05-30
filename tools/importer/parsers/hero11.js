/* global WebImporter */
export default function parse(element, { document }) {
  // Extract elements dynamically from the element
  const title = element.querySelector(':scope .hero h1') || document.createTextNode('');
  const subtitle = element.querySelector(':scope .hero h2') || document.createTextNode('');
  const cta = element.querySelector(':scope .hero a.button') || document.createTextNode('');
  const image = element.querySelector(':scope .hero img') || document.createTextNode('');
  const footerText = element.querySelector(':scope .hero-footer h3') || document.createTextNode('');

  // Create the table structure dynamically
  const headerRow = ['Hero (hero11)'];

  const contentRow = [
    [
      title,
      subtitle,
      cta,
      image,
      footerText
    ].filter(el => el.textContent.trim() !== '' || el.tagName)
  ];

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}