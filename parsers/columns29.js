export default function parse(element, { document }) {
  // Helper function to extract text content safely
  const extractText = (el) => el?.textContent?.trim() || '';

  // Extract Image
  const imageContainer = element.querySelector('.agegate-image picture');
  const imageElement = imageContainer?.querySelector('img');

  // Extract Logo
  const logoElement = element.querySelector('.agegate-logo .icon-logo-agegate');

  // Extract Main Question Heading
  const mainHeading = element.querySelector('.verification h1');

  // Extract Buttons
  const buttonContainer = element.querySelector('.agegate-button-wrap');
  const buttons = buttonContainer ? Array.from(buttonContainer.querySelectorAll('a')) : [];

  // Extract Rejection Message
  const rejectionMessageHeading = element.querySelector('.rejection h3');
  const rejectionMessageDetails = element.querySelector('.rejection > div:nth-child(2) > div');
  const redirectionMessage = element.querySelector('.rejection > div:nth-child(3) > div');

  // Prepare Table Rows
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const contentRow1 = [];
  if (imageElement) {
    contentRow1.push(imageContainer);
  }
  if (mainHeading || buttons.length) {
    const columnContent = [];
    if (mainHeading) {
      const headingClone = mainHeading.cloneNode(true);
      columnContent.push(headingClone);
    }
    buttons.forEach((button) => {
      const buttonClone = button.cloneNode(true);
      columnContent.push(buttonClone);
    });
    contentRow1.push(columnContent);
  }

  const contentRow2 = [];
  if (logoElement) {
    contentRow2.push(logoElement.cloneNode(true));
  }
  if (rejectionMessageHeading || rejectionMessageDetails || redirectionMessage) {
    const rejectionColumnContent = [];
    if (rejectionMessageHeading) {
      const headingClone = rejectionMessageHeading.cloneNode(true);
      rejectionColumnContent.push(headingClone);
    }
    if (rejectionMessageDetails) {
      const detailsClone = rejectionMessageDetails.cloneNode(true);
      rejectionColumnContent.push(detailsClone);
    }
    if (redirectionMessage) {
      const redirectionClone = redirectionMessage.cloneNode(true);
      rejectionColumnContent.push(redirectionClone);
    }
    contentRow2.push(rejectionColumnContent);
  }

  const cells = [headerRow, contentRow1, contentRow2];

  // Create Block Table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace Original Element
  element.replaceWith(blockTable);
}