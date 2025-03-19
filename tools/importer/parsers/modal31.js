export default function parse(element, {document}) {
    const featuredRecipes = element.querySelectorAll('.featured-recipe');

    const cells = [];

    // Header row, defining the type of block
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Featured Recipes';
    cells.push(headerRow);

    featuredRecipes.forEach((recipe) => {
        const link = recipe.querySelector('a');
        const picture = recipe.querySelector('picture');
        const image = picture.querySelector('img');
        const title = link.querySelector('span');

        // Validate presence of required elements
        if (!link || !picture || !image || !title) {
            return; // Skip if any required element is missing
        }

        const recipeLink = document.createElement('a');
        recipeLink.href = link.href;
        recipeLink.textContent = title.textContent;

        const recipeImage = document.createElement('img');
        recipeImage.src = image.src;
        recipeImage.alt = image.alt || 'Image'; // Default alt text if missing

        cells.push([recipeImage, recipeLink]);
    });

    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(block);
}