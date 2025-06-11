/* global WebImporter */
export default function parse(element, { document }) {
  // This function assumes the navigation menu matches a tabs (tabs4) block with only tab labels and no tab content.
  // If you want to produce a valid tabs (tabs4) block per the markdown example, you must extract both tab labels and tab content.
  // However, for a navigation bar (as in the given HTML), only tab labels exist, so the correct structure is:
  // - Header row: ['Tabs (tabs4)']
  // - Second row: [tab label 1, tab label 2, ...]
  // - Third row: [empty, empty, ...] (not very meaningful)
  // For true content tabs, you'd extract actual content for each tab.

  // Defensive: get the navigation wrapper
  const navWrapper = element.querySelector('.nav-wrapper');
  if (!navWrapper) return;
  const nav = navWrapper.querySelector('nav');
  if (!nav) return;
  // Find the nav-sections for tabs
  const navSections = nav.querySelector('.nav-sections');
  if (!navSections) return;
  const ul = navSections.querySelector('ul');
  if (!ul) return;
  const tabLinks = Array.from(ul.querySelectorAll(':scope > li > a'));
  if (tabLinks.length === 0) return;

  // Try to find tab content for each tab (look for next sibling or a known pattern)
  // In the provided HTML, there is NO tab content; it's only links. So we just output the label row.
  // But per prompt, if no content exists, don't add an empty content row.
  // The correct structure for a navigation bar, as tabs4, is just header row, then tab label row.
  const cells = [
    ['Tabs (tabs4)'],
    tabLinks.map(link => link.textContent.trim())
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
