export default function parse(element, { document }) {
    const cells = [];

    // Title row
    const title = element.querySelector('h1');
    const titleRow = [document.createElement('strong')];
    titleRow[0].textContent = title ? title.textContent : 'Unknown Title';
    cells.push(titleRow);

    // Ingredients Section
    const ingredientsHeader = [document.createElement('strong')];
    ingredientsHeader[0].textContent = 'Ingredients';
    cells.push(ingredientsHeader);

    const ingredientsList = element.querySelectorAll('h2#ingredients + ul li');
    ingredientsList.forEach((item) => {
        cells.push([item.textContent]);
    });

    // Directions Section
    const directionsHeader = [document.createElement('strong')];
    directionsHeader[0].textContent = 'Directions';
    cells.push(directionsHeader);

    const directionsList = element.querySelectorAll('h2#directions + ul li');
    directionsList.forEach((item) => {
        cells.push([item.textContent]);
    });

    // Spiced Sangria Ingredients Section
    const spicedSangriaIngredientsHeader = [document.createElement('strong')];
    spicedSangriaIngredientsHeader[0].textContent = 'Spiced Sangria Ingredients';
    cells.push(spicedSangriaIngredientsHeader);

    const spicedSangriaIngredientsParagraph = Array.from(element.querySelectorAll('p'));
    const spicedSangriaIngredientsParagraphElement = spicedSangriaIngredientsParagraph.find(
        (p) => p.textContent.includes('Spiced Sangria Ingredients')
    );
    const spicedSangriaIngredientsList = spicedSangriaIngredientsParagraphElement
        ? spicedSangriaIngredientsParagraphElement.nextElementSibling.querySelectorAll('li')
        : [];
    spicedSangriaIngredientsList.forEach((item) => {
        cells.push([item.textContent]);
    });

    // Spiced Sangria Directions Section
    const spicedSangriaDirectionsHeader = [document.createElement('strong')];
    spicedSangriaDirectionsHeader[0].textContent = 'Spiced Sangria Directions';
    cells.push(spicedSangriaDirectionsHeader);

    const spicedSangriaDirectionsParagraph = spicedSangriaIngredientsParagraph.find(
        (p) => p.textContent.includes('Spiced Sangria Directions')
    );
    const spicedSangriaDirectionsList = spicedSangriaDirectionsParagraph
        ? spicedSangriaDirectionsParagraph.nextElementSibling.querySelectorAll('li')
        : [];
    spicedSangriaDirectionsList.forEach((item) => {
        cells.push([item.textContent]);
    });

    // Created By Section
    const createdByHeader = [document.createElement('strong')];
    createdByHeader[0].textContent = 'Created By';
    cells.push(createdByHeader);

    const creatorInfo = element.querySelector('.creator-info');
    if (creatorInfo) {
        const creatorRows = [];
        creatorInfo.querySelectorAll('li').forEach((item) => {
            creatorRows.push(item.textContent);
        });
        cells.push(creatorRows);
    }

    // Image Section
    const imageRow = [];
    const imageElement = element.querySelector('img');
    if (imageElement) {
        const image = document.createElement('img');
        image.src = imageElement.src;
        image.alt = imageElement.alt;
        imageRow.push(image);
    }
    cells.push(imageRow);

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new structured block
    element.replaceWith(block);
}