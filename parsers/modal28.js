export default function parse(element, { document }) {
  const recipes = Array.from(element.querySelectorAll('.featured-recipe:not(.button-container)'));

  const recipeRows = recipes.map((recipe) => {
    const link = recipe.querySelector('a');
    const image = recipe.querySelector('img');
    const title = recipe.querySelector('span');

    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = title.textContent.trim();

    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = title.textContent.trim();

    return [imageElement, linkElement];
  });

  const buttonContainer = element.querySelector('.button-container');
  const buttonLink = buttonContainer.querySelector('a');
  const buttonImage = buttonContainer.querySelector('img');

  const buttonLinkElement = document.createElement('a');
  buttonLinkElement.href = buttonLink.href;
  buttonLinkElement.textContent = buttonLink.textContent.trim();

  const buttonImageElement = document.createElement('img');
  buttonImageElement.src = buttonImage.src;
  buttonImageElement.alt = buttonLink.textContent.trim();

  recipeRows.push([buttonImageElement, buttonLinkElement]);

  const table = WebImporter.DOMUtils.createTable([
    ['Featured Recipes'],
    ...recipeRows,
  ], document);

  element.replaceWith(table);
}