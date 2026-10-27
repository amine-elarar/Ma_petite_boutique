# Ma petite boutique

## 1. Conception
- Rédiger 5 user stories
- Dessiner le diagramme de cas d'utilisation
- Dessiner le diagramme de classes
- Dessiner le schéma relationnel
- Créer les tickets Jira
- Rédiger un premier README

## 2. Setup
- Installer express, mongoose, dotenv, nodemon
- Scripts `dev` et `start`
- `.env.example` et `.gitignore`
- Connexion à MongoDB
- `GET /api/health`

## 3. Produits
- Modèle Product
- Lister les produits
- Consulter un produit par son id
- Créer un produit
- Modifier un produit (prix et disponibilité)
- Gestion des erreurs

## 4. Authentification
- Modèle User
- Inscription (register)
- Connexion (login) avec JWT
- Middleware d'authentification
- Middleware d'autorisation (rôles)
- Seed du vendeur
- Protection des routes produits

## 5. Commandes
- Fonction de calcul du total
- Modèle Order
- Passer une commande
- Lister mes commandes
- Lister toutes les commandes (vendeur)
- Consulter une commande
- Passer le statut à `processed`

## 6. SQL
- `schema.sql`
- `seed.sql`
- `queries.sql`
- Script Node.js avec requête paramétrée

## 7. Tests
- 8 tests avec Jest et Supertest
- Seed de démonstration
- Collection Postman

## 8. Documentation et Docker
- Swagger sur `/api/docs`
- `Dockerfile` et `docker-compose.yml`
- README final

---

## Endpoints

| Méthode | Route | Accès |
|---|---|---|
| GET | `/api/health` | public |
| POST | `/api/auth/register` | public |
| POST | `/api/auth/login` | public |
| GET | `/api/products` | public |
| GET | `/api/products/:id` | public |
| POST | `/api/products` | vendeur |
| PATCH | `/api/products/:id` | vendeur |
| POST | `/api/orders` | client |
| GET | `/api/orders/me` | client |
| GET | `/api/orders` | vendeur |
| GET | `/api/orders/:id` | propriétaire ou vendeur |
| PATCH | `/api/orders/:id/status` | vendeur |