/* global WebImporter */
export default function parse(element, { document }) {
  // This header/nav element is NOT a cards2 block. Per requirement, we must output a proper Cards (cards2) block ONLY if cards content exists.
  // The correct structure is: if no card/image/text pairs are found, do NOT attempt to output a table or transform the element. Just remove it or leave it.
  // However, if you must always produce a table for the Cards (cards2) block (even for an empty or mismatched block type),
  // you could output an empty Cards (cards2) table, but the correct requirement is to output nothing for non-card content.
  //
  // So for this element, do NOT output a Cards (cards2) table. Remove the element to prevent the wrong block type from being output.
  element.replaceWith();
}