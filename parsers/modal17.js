export default function parse(element, { document }) {
  // Extract modal content
  const modalContainer = element.querySelector('.ageverification-wrapper');

  // Extract the image
  const imageContainer = modalContainer.querySelector('.agegate-image img');
  const image = document.createElement('img');
  image.src = imageContainer ? imageContainer.src : '';
  image.alt = imageContainer ? imageContainer.alt : '';

  // Extract the title
  const titleContainer = modalContainer.querySelector('#are-you-over-21');
  const title = document.createElement('h1');
  title.textContent = titleContainer ? titleContainer.textContent : '';

  // Extract the buttons
  const buttonContainer = modalContainer.querySelector('.agegate-button-wrap');
  const buttons = buttonContainer
    ? Array.from(buttonContainer.querySelectorAll('a')).map((btn) => {
        const button = document.createElement('a');
        button.href = btn.href;
        button.textContent = btn.textContent;
        return button;
      })
    : [];

  // Extract rejection content
  const rejectionContainer = modalContainer.querySelector('.rejection.hidden');

  const rejectionTitleContainer = rejectionContainer?.querySelector('h3');
  const rejectionTitle = document.createElement('h3');
  rejectionTitle.textContent = rejectionTitleContainer ? rejectionTitleContainer.textContent : '';

  const rejectionContentContainer = rejectionContainer?.querySelector('div:nth-of-type(2)');
  const rejectionContent = document.createElement('div');
  rejectionContent.textContent = rejectionContentContainer ? rejectionContentContainer.textContent : '';

  const rejectionRedirectContainer = rejectionContainer?.querySelector('div:nth-of-type(3)');
  const rejectionRedirect = document.createElement('div');
  rejectionRedirect.innerHTML = rejectionRedirectContainer ? rejectionRedirectContainer.innerHTML : '';

  // Create the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Modal';
  const headerRow = [headerCell];

  const cells = [
    headerRow,
    [image],
    [title],
    buttons,
    [document.createElement('hr')],
    [rejectionTitle],
    [rejectionContent],
    [rejectionRedirect]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}