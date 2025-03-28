export default function parse(element, { document }) {
  const cells = [];

  // Header row with block type
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Modal';
  cells.push(headerRow);

  // Extract the relevant sections

  // Image
  const imageContainer = element.querySelector('.agegate-image img');
  if (imageContainer) {
    const img = document.createElement('img');
    img.src = imageContainer.src;
    img.alt = imageContainer.alt || ''; // Ensure alt text is included
    cells.push([img]);
  }

  // Logo
  const logoContainer = element.querySelector('.agegate-logo svg');
  if (logoContainer) {
    const logo = logoContainer.cloneNode(true);
    cells.push([logo]);
  }

  // Verification
  const verificationContainer = element.querySelector('.verification');
  if (verificationContainer) {
    const heading = verificationContainer.querySelector('h1');
    if (heading) {
      const headerElement = document.createElement('h1');
      headerElement.textContent = heading.textContent;
      cells.push([headerElement]);
    }

    const buttons = verificationContainer.querySelectorAll('.agegate-button');
    if (buttons.length > 0) {
      const buttonsContainer = document.createElement('div');
      buttons.forEach((button) => {
        const btn = document.createElement('a');
        btn.href = button.href;
        btn.textContent = button.textContent;
        buttonsContainer.appendChild(btn);
      });
      cells.push([buttonsContainer]);
    }
  }

  // Rejection Section
  const rejectionContainer = element.querySelector('.rejection');
  if (rejectionContainer) {
    const heading = rejectionContainer.querySelector('h3');
    if (heading) {
      const headerElement = document.createElement('h3');
      headerElement.textContent = heading.textContent;
      cells.push([headerElement]);
    }

    const rejectionText = rejectionContainer.querySelector('div:nth-of-type(2)');
    if (rejectionText) {
      const rejectionElement = document.createElement('p');
      rejectionElement.textContent = rejectionText.textContent;
      cells.push([rejectionElement]);
    }

    const redirectionText = rejectionContainer.querySelector('div:nth-of-type(3)');
    if (redirectionText) {
      const redirectionContent = document.createElement('p');
      const redirectionLink = redirectionText.querySelector('a');
      if (redirectionLink) {
        const link = document.createElement('a');
        link.href = redirectionLink.href;
        link.textContent = redirectionLink.textContent;
        redirectionContent.appendChild(link);
      }
      redirectionContent.appendChild(
        document.createTextNode(
          redirectionText.textContent.replace(redirectionLink.textContent, '').trim()
        )
      );
      cells.push([redirectionContent]);
    }
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}