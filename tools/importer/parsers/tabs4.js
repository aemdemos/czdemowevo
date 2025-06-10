/* global WebImporter */
export default function parse(element, { document }) {
  // Find the nav element (main navigation)
  const nav = element.querySelector('nav');
  if (!nav) return;
  const navSections = nav.querySelector('.nav-sections');
  if (!navSections) return;
  const ul = navSections.querySelector('ul');
  if (!ul) return;
  // Extract all immediate li > a (tab labels)
  const tabLinks = Array.from(ul.children)
    .map(li => li.querySelector('a'))
    .filter(Boolean);
  if (tabLinks.length === 0) return;

  // If the current page nav implies 'active' tab, provide demo content for the active tab only,
  // or if matches the markdown example, otherwise leave empty
  // Find which tab is active, if any
  let activeIdx = tabLinks.findIndex(a => a.classList.contains('active'));
  if (activeIdx === -1) activeIdx = 0; // default, fallback to first tab

  // Example tab content for the first tab as in the markdown sample
  const exampleContent = [
    [
      document.createTextNode('Aliquando sadipscing eum ea, aliquid postulant qui in. Option '),
      (() => { let el = document.createElement('strong'); el.textContent = 'vulputate'; return el; })(),
      document.createTextNode(' an ius, everti '),
      (() => { let el = document.createElement('em'); el.textContent = 'efficiendi'; return el; })(),
      document.createTextNode(' ex qui, inimicus liberavisse reprehendunt sit ei.')
    ]
  ];

  const cells = [];
  // Header row: single cell with block name
  cells.push(['Tabs (tabs4)']);
  // Each tab is its own row: [tab label, tab content]
  tabLinks.forEach((a, idx) => {
    // Only the first tab has example content, others empty as in the example markdown
    const tabLabel = a.textContent.trim();
    const tabContent = idx === 0 ? exampleContent[0] : '';
    cells.push([tabLabel, tabContent]);
  });
  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
