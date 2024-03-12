function fetchProductInfo() {
    const barcode = document.getElementById('barcodeInput').value;
    if (!barcode) {
        alert('Veuillez entrer un code-barres.');
        return;
    }

    fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
        .then(response => response.json())
        .then(data => {
            const productInfoDiv = document.getElementById('productInfo');

            if (data.status === 0) {
                productInfoDiv.innerHTML = 'Produit non trouvé.';
                return;
            }

            const product = data.product;
            let htmlContent = `<h2>${product.product_name}</h2>`;

            if (product.image_url) {
                htmlContent += `<img src="${product.image_url}" alt="${product.product_name}" style="max-width: 100%; height: auto;">`;
            }

            if (product.nutriments) {
                htmlContent += `<p>Calories: ${product.nutriments['energy-kcal_100g']} kcal pour 100g</p>`;
                htmlContent += `<p>Protéines: ${product.nutriments.proteins_100g} g pour 100g</p>`;
                htmlContent += `<p>Glucides: ${product.nutriments.carbohydrates_100g} g pour 100g</p>`;
                htmlContent += `<p>Lipides: ${product.nutriments.fat_100g} g pour 100g</p>`;
                // Ajoutez d'autres informations nutritionnelles ici selon vos besoins
            } else {
                htmlContent += 'Informations nutritionnelles non disponibles.';
            }

            productInfoDiv.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error('Erreur :', error);
            document.getElementById('productInfo').innerHTML = 'Erreur lors de la récupération des informations.';
        });
}
