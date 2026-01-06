// Exemple de données
const products = [
  { name: "Manette DualSense", category: "Manette", price: 70, description: "La manette officielle PS5." },
  { name: "Casque Pulse 3D", category: "Casque", price: 100, description: "Casque sans fil optimisé pour l’audio 3D de la PS5." },
  { name: "Station de recharge", category: "Accessoire", price: 30, description: "Permet de recharger deux manettes DualSense simultanément." },
  { name: "Caméra HD", category: "Accessoire", price: 50, description: "Caméra haute définition pour streaming sur PS5." },
  { name: "Télécommande multimédia", category: "Accessoire", price: 25, description: "Contrôlez facilement vos films et applis de divertissement." }
];

// Références aux éléments HTML
const container = document.getElementById("productsContainer");
const detail = document.getElementById("productDetail");
const detailContent = document.getElementById("detailContent");
const closeDetail = document.getElementById("closeDetail");

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const maxPriceFilter = document.getElementById("maxPriceFilter");
const resetBtn = document.getElementById("resetBtn");

// Fonction pour afficher les produits
function displayProducts(list) {
  container.innerHTML = "";
  if (list.length === 0) {
    container.innerHTML = "<p>Aucun produit trouvé.</p>";
    return;
  }

  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `<h3>${p.name}</h3><p>${p.category}</p><p>${p.price} €</p>`;
    div.addEventListener("click", () => showDetail(p));
    container.appendChild(div);
  });
}

// Fonction vue détaillée
function showDetail(product) {
  detailContent.innerHTML = `
    <h2>${product.name}</h2>
    <p><strong>Catégorie :</strong> ${product.category}</p>
    <p><strong>Prix :</strong> ${product.price} €</p>
    <p>${product.description}</p>
  `;
  detail.classList.remove("hidden");
}

// Fermer la vue détaillée
closeDetail.addEventListener("click", () => {
  detail.classList.add("hidden");
});

// Fonction de filtrage
function applyFilters() {
  let filtered = products;

  const searchText = searchInput.value.toLowerCase();
  if (searchText) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchText));
  }

  const category = categoryFilter.value;
  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  const maxPrice = parseFloat(maxPriceFilter.value);
  if (!isNaN(maxPrice)) {
    filtered = filtered.filter(p => p.price <= maxPrice);
  }

  displayProducts(filtered);
}

// Événements sur les filtres
searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
maxPriceFilter.addEventListener("input", applyFilters);

// Bouton réinitialiser
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categoryFilter.value = "all";
  maxPriceFilter.value = "";
  displayProducts(products);
});

// Affichage initial
displayProducts(products);

