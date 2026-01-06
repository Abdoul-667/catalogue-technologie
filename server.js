// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware simple de log
app.use((req, res, next) => {
  const t0 = Date.now();
  res.on("finish", () => {
    const dt = Date.now() - t0;
    console.log(`${res.statusCode} ${req.method} ${req.originalUrl} (${dt}ms)`);
  });
  next();
});

// Pour parser un corps JSON si besoin (ex: POST)
app.use(express.json());

// Fichiers statiques
// IMPORTANT : tous les fichiers HTML, CSS et JS sont dans "public"
app.use(express.static("public"));

// Route racine → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Exemple d'API pour produits (Playstation)
const products = [
  { id: 1, name: "Manette DualSense", category: "Accessoire", price: 70, description: "Manette PS5 sans fil avec retour haptique." },
  { id: 2, name: "Casque Pulse 3D", category: "Accessoire", price: 100, description: "Casque officiel PS5 avec son 3D immersif." },
  { id: 3, name: "Station de charge DualSense", category: "Accessoire", price: 30, description: "Chargez deux manettes simultanément." },
  { id: 4, name: "Caméra HD PS5", category: "Accessoire", price: 60, description: "Caméra HD pour streaming et capture vidéo." },
  { id: 5, name: "Télécommande multimédia", category: "Accessoire", price: 25, description: "Contrôle facile de vos films et séries." }
];

// Route API pour récupérer les produits
app.get("/api/products", (req, res) => {
  res.json(products);
});

// 404 (toutes routes non trouvées)
app.use((req, res) => {
  res.status(404).type("text").send("404 Not Found");
});

// 500 (erreurs serveur)
app.use((err, req, res, next) => {
  console.error("500 Internal Server Error:", err);
  const code = err.status || 500;
  res.status(code).json({ status: code, message: "Internal Server Error" });
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
