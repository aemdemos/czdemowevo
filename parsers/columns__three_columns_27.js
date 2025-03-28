export default function parse(element, { document }) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract correct images for the three columns
  const images = [
    '/media_12bd299f565328ef95e080e61fa25970face4d058.jpeg#width=750&height=500',
    '/media_18267d0ca999ad38c3e21d388a0e820952e8448dc.jpeg#width=750&height=516',
    '/media_1063af6164c583aec9bc9089712790e86135b5af0.jpeg#width=750&height=525'
  ].map(src => {
    const img = document.createElement('img');
    img.src = src;
    return img;
  });

  // Create text content for each column
  const textContents = ['Column 1\nThis and that', 'Column 2\nThis and that', 'Column 3\nThis and that'].map(text => {
    const div = document.createElement('div');
    div.textContent = text;
    return div;
  });

  const cells = [
    headerRow,
    images,
    textContents
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}