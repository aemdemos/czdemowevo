/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches the example exactly
  const headerRow = ['Columns block'];

  // Extract sections dynamically
  const ingredientsSection = element.querySelector('#ingredients');
  const ingredientsList = ingredientsSection ? ingredientsSection.nextElementSibling : null;

  const directionsSection = element.querySelector('#directions');
  const directionsList = directionsSection ? directionsSection.nextElementSibling : null;

  const creatorSection = element.querySelector('.creator');
  const creatorInfo = creatorSection ? creatorSection.querySelector('.creator-info') : null;
  const creatorImage = creatorSection ? creatorSection.querySelector('img') : null;

  // Prepare rows for the table
  const secondRow = [ingredientsSection, ingredientsList];
  const thirdRow = [directionsSection, directionsList];
  const fourthRow = [creatorInfo, creatorImage];

  // Final table structure
  const cells = [headerRow, secondRow, thirdRow, fourthRow];

  // Create and replace the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}