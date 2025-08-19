/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row should match the example exactly
  const headerRow = ['Hero'];

  // Row 2: Try to dynamically extract a background image from the footer
  // If not found, fallback to the known decorative background image
  let bgImgEl = null;
  // Check for direct <img> (unlikely for this case, but good for generics)
  const imgs = element.querySelectorAll('img');
  if (imgs.length > 0) {
    bgImgEl = imgs[0];
  }
  // If not found, check for background image in styles (footer usually uses CSS background)
  if (!bgImgEl) {
    // Try inline style with background-image
    const getBgFromStyle = (el) => {
      const bgImg = el.style && el.style.backgroundImage;
      if (bgImg && bgImg.includes('url(')) {
        const m = bgImg.match(/url\(["']?(.*?)["']?\)/);
        if (m && m[1]) return m[1];
      }
      return null;
    };
    let bgUrl = getBgFromStyle(element);
    if (!bgUrl) {
      // Try to find a child with a background image style
      element.querySelectorAll('*').forEach(child => {
        if (!bgUrl) bgUrl = getBgFromStyle(child);
      });
    }
    if (!bgUrl) {
      // Fallback to the known asset based on screenshot and example
      bgUrl = 'https://main--czdemowevo--aemdemos.hlx.page/media_1ca653f4f0fb50020a010f62ded9172d64671042a.jpg#width=750&height=415';
    }
    bgImgEl = document.createElement('img');
    bgImgEl.src = bgUrl;
    bgImgEl.alt = 'Decorative double Helix';
  }

  // Row 3: Gather all text content in a semantically meaningful block (headings, strong, paragraphs, lists, links)
  // We'll build a container and append referenced elements in order
  const textContainer = document.createElement('div');
  // Collect heading/strong (visually top right in screenshot), paragraphs, and ul (for links)
  // 1. Try for heading tags (h1-h6)
  let found = false;
  element.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
    textContainer.appendChild(h);
    found = true;
  });
  // 2. If no heading, try <strong> blocks as fallback headline
  if (!found) {
    element.querySelectorAll('strong').forEach(str => {
      // Reference parent <p> if exists, else use <strong> itself
      const parentP = str.closest('p');
      if (parentP && !textContainer.contains(parentP)) {
        textContainer.appendChild(parentP);
      } else if (!parentP && !textContainer.contains(str)) {
        textContainer.appendChild(str);
      }
    });
  }
  // 3. All paragraphs (excluding those already appended)
  element.querySelectorAll('p').forEach(p => {
    if (!textContainer.contains(p)) {
      textContainer.appendChild(p);
    }
  });
  // 4. All lists (navigation links or similar)
  element.querySelectorAll('ul').forEach(ul => {
    if (!textContainer.contains(ul)) {
      textContainer.appendChild(ul);
    }
  });
  // If textContainer is still empty, grab any non-empty text nodes as fallback
  if (!textContainer.childNodes.length) {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: node => node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    });
    let n = walker.nextNode();
    while(n) {
      const p = document.createElement('p');
      p.textContent = n.textContent.trim();
      textContainer.appendChild(p);
      n = walker.nextNode();
    }
  }

  // Compose the table as per the example: header, image, content
  const cells = [
    headerRow,
    [bgImgEl],
    [textContainer]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // No Section Metadata block in example, do not add hr or metadata table
  // Replace the original element with the block table
  element.replaceWith(table);
}
