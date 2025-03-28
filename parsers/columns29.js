export default function parse(element, { document }) {
  const WebImporter = {
    DOMUtils: {
      createTable: (data, { document }) => {
        const table = document.createElement('table');
        let maxColumns = 0;
        data.forEach((row, index) => {
          const tr = document.createElement('tr');

          maxColumns = Math.max(maxColumns, row.length);
          row.forEach((cell) => {
            const t = document.createElement(index === 0 ? 'th' : 'td');
            if (typeof cell === 'string') {
              t.innerHTML = cell;
            } else if (Array.isArray(cell)) {
              t.append(...cell);
            } else {
              t.append(cell);
            }
            tr.appendChild(t);
          });
          table.appendChild(tr);
        });

        return table;
      },
    },
  };

  // Extract the image
  const img = element.querySelector('.agegate-image img');
  const imageElement = document.createElement('img');
  imageElement.src = img?.src || '';

  // Extract the header
  const header = element.querySelector('.verification h1');
  const headerText = header?.textContent || '';

  // Extract buttons
  const buttonYes = element.querySelector('.agegate-button-wrap a.agegate-button[href="/"]');
  const buttonNo = element.querySelector('.agegate-button-wrap a.agegate-button[href="https://www.responsibility.org/"]');
  
  const buttonsContainer = document.createElement('div');
  const buttonYesElement = document.createElement('a');
  buttonYesElement.href = buttonYes?.href || '#';
  buttonYesElement.textContent = buttonYes?.textContent || 'Yes';
  const buttonNoElement = document.createElement('a');
  buttonNoElement.href = buttonNo?.href || '#';
  buttonNoElement.textContent = buttonNo?.textContent || 'No';
  buttonsContainer.appendChild(buttonYesElement);
  buttonsContainer.appendChild(buttonNoElement);

  // Combine image, header text, and buttons into one cell
  const combinedContent = document.createElement('div');
  const headerElement = document.createElement('p');
  headerElement.textContent = headerText;
  combinedContent.appendChild(imageElement);
  combinedContent.appendChild(headerElement);
  combinedContent.appendChild(buttonsContainer);

  // Correct header row creation
  const headerRow = ['Columns'];

  const cells = [
    headerRow,
    [combinedContent],
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, { document });

  // Replace the original element with the new table
  element.replaceWith(table);
}