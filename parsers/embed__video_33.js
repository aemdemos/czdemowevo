export default function parse(element, { document }) {
  // Extract the video link (e.g., Vimeo or YouTube URL)
  const videoLink = element.querySelector('a[href*="vimeo.com"], a[href*="youtube.com"]');
  if (!videoLink) {
    console.warn('No video link found in the provided element.');
    return;
  }

  // Extract the image (if any) to serve as the poster for the video
  const posterImage = element.querySelector('img');

  // Prepare the header row for the block table (without unnecessary <strong>)
  const headerRow = ['Embed'];

  // Prepare the content row with optional poster image + video URL as plain text
  const contentRow = [];
  if (posterImage) {
    contentRow.push(posterImage.cloneNode(true));
  }
  contentRow.push(videoLink.href); // Use the URL as plain text

  // Create the table using WebImporter.DOMUtils.createTable
  const tableData = [
    headerRow,
    [contentRow]
  ];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}