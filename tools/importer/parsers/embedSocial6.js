/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Extract all relevant child elements from the 'element'
  const children = Array.from(element.querySelectorAll(':scope > *'));

  // Process elements with 'src' attributes (except images)
  const processedContent = children.map(child => {
    if (child.tagName === 'IMG') {
      return child; // Keep images as they are
    }
    if (child.hasAttribute('src') && child.tagName !== 'IMG') {
      const src = child.getAttribute('src');
      const link = document.createElement('a');
      link.href = src;
      link.textContent = src; // Use the src as the link text
      return link;
    }
    return child; // Keep other elements as they are
  });

  const simplifiedContent = processedContent.filter(item => item.tagName === 'IMG' || item.tagName === 'A');

  const contentRow = [simplifiedContent.length ? simplifiedContent : 'No content available'];

  // Create the header row
  const headerRow = ['Embed (embedSocial6)'];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}