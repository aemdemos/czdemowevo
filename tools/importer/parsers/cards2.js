/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified
  const headerRow = ['Cards (cards2)'];

  // Find the nav block elements
  const navWrapper = element.querySelector('.nav-wrapper');
  if (!navWrapper) return;
  const nav = navWrapper.querySelector('nav');
  if (!nav) return;

  // Left: logo/branding
  const navBrand = nav.querySelector('.nav-brand');
  // Right: menu + socials
  let menu = null;
  let socials = null;

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    menu = navSections.querySelector('ul');
    socials = navSections.querySelector('.header-social');
  }

  // Compose the card row as two columns: left side is navBrand, right side is nav menu + socials
  const cardRow = [navBrand, [menu, socials].filter(Boolean)];
  const rows = [headerRow, cardRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
