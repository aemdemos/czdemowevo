/* global WebImporter */
export default function parse(element, { document }) {
  // The provided element is a header/navigation and not a Cards (cards2) block.
  // Per requirements, we should SKIP processing and NOT replace or alter the element.
  // Do not produce a table. Do not return anything.
  // Simply leave the element unchanged.
}