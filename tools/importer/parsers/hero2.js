/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block in the given section
  const heroBlock = element.querySelector('.block.hero');

  // Get the image (from the .right > picture/img)
  let imageEl = null;
  if (heroBlock) {
    const right = heroBlock.querySelector('.right');
    if (right) {
      const pic = right.querySelector('picture');
      if (pic) {
        imageEl = pic;
      } else {
        const img = right.querySelector('img');
        if (img) imageEl = img;
      }
    }
  }

  // Get all left content (heading, subheading, CTA)
  let leftContent = [];
  if (heroBlock) {
    const left = heroBlock.querySelector('.left');
    if (left) {
      leftContent = Array.from(left.children);
    }
  }

  // Get footer content if present (eg. h3, paragraph)
  let footerContent = [];
  const footer = element.querySelector('.hero-footer');
  if (footer) {
    footerContent = Array.from(footer.children);
  }

  // Compose the content block for the third row,
  // including all left content, then all footer content
  const thirdRowContent = [];
  if (leftContent.length) thirdRowContent.push(...leftContent);
  if (footerContent.length) thirdRowContent.push(...footerContent);

  // The block table has the following rows:
  // - [Hero]
  // - [image] (if present, else empty string)
  // - [content] (headings, subheading, CTA, and below image text if present)
  const rows = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [thirdRowContent.length ? thirdRowContent : ''],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
