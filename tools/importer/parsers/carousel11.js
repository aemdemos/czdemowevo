/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract the <img> from a <picture>
  function getImgFromPicture(picture) {
    if (!picture) return null;
    const img = picture.querySelector('img');
    return img || null;
  }

  // Find the carousel root block (works even if structure changes slightly)
  const carousel = element.querySelector('.quote-carousel');
  if (!carousel) return;
  const cards = Array.from(carousel.querySelectorAll('.quotecard'));

  // Prepare header row
  const cells = [['Carousel']];

  cards.forEach((card) => {
    // Get author/profile image
    let img = null;
    const aphoristDiv = card.querySelector('.aphorist');
    if (aphoristDiv) {
      const picture = aphoristDiv.querySelector('picture');
      img = getImgFromPicture(picture);
    }

    // Compose text cell
    const textCell = document.createElement('div');

    // Get the quote (always a <p>)
    const p = card.querySelector('p');
    if (p) {
      textCell.appendChild(p);
    }

    // Add author name (first <li>) and title (second <li>)
    if (aphoristDiv) {
      const ul = aphoristDiv.querySelector('ul');
      if (ul) {
        const lis = ul.querySelectorAll('li');
        if (lis.length > 0) {
          // Author name in bold
          const strong = document.createElement('strong');
          strong.textContent = lis[0].textContent;
          textCell.appendChild(document.createElement('br'));
          textCell.appendChild(strong);
        }
        if (lis.length > 1) {
          textCell.appendChild(document.createElement('br'));
          const span = document.createElement('span');
          span.textContent = lis[1].textContent;
          textCell.appendChild(span);
        }
      }
    }

    // Push the row: image cell and text cell
    cells.push([
      img,
      textCell
    ]);
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
