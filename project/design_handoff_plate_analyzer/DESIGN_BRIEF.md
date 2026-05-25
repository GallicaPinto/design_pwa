# Plate Analyzer — Synthèse fonctionnelle pour brief design

> Document de référence pour créer un prompt de design d'application complète
> incluant le quotidien, les récaps semaine/mois et la gestion patient.

---

## 1. Vision produit

**Plate Analyzer** est une application d'analyse nutritionnelle qui transforme une simple photo d'assiette en :
- Identification des aliments via IA visuelle (Gemini)
- Calcul nutritionnel précis (39 nutriments via base CIQUAL/ANSES)
- Scoring scientifique multidimensionnel (NOVA, Hansel, AG essentiels, syndrome métabolique)
- Suivi longitudinal de l'alimentation et indicateurs santé

**Positionnement** : alternative scalable et scientifique à YAZIO/MyFitnessPal, avec rigueur médicale (inspiré du Pr Boris Hansel, AP-HP).

**Pipeline technique** : Photo → Vision IA → Matching CIQUAL (embeddings) → LLM Chooser → Scoring → Stockage Postgres → Visualisation.

**Latence** : ~10-12s par analyse en production.

---

## 2. Fonctionnalités actuelles (MVP en production)

### Authentification
- Inscription email + mot de passe (bcrypt)
- Login + JWT 30 jours
- Suppression de compte (RGPD)

### Capture et analyse
- Prise de photo via caméra mobile native
- Sélection depuis galerie
- Upload (max 10 Mo)
- Analyse asynchrone (10-12s)

### Résultat d'analyse
- En-tête : plat global + kcal total + 4 macros (P/G/L/poids)
- Liste éditable des aliments détectés
  - Nom détecté + match CIQUAL
  - Portion modifiable (input g)
  - Boutons : changer match / supprimer
- Score NOVA agrégé (barre 1/2/3/4 + verdict)
- Indicateurs santé (vs OMS/PNNS) : sel, AG saturés, sucres, cholestérol, fibres
- Profil ω-6/ω-3 (ratio + EPA+DHA + ALA + AL)
- Avertissements scientifiques (incertitudes IA)
- Ajout manuel d'aliment

### Historique
- Liste paginée des analyses passées
- Tri par date décroissante
- Tap → détail complet réutilisant l'écran résultat

---

## 3. Données disponibles dans chaque analyse

### Identification (Gemini Vision)
- `plat_global` (description textuelle)
- `aliments[]` (liste de 1 à 15 aliments typiquement)
  - `nom_detecte`, `nom_ciqual`, `code_ciqual`, `groupe`
  - `quantite_g`, `score_matching`, `confiance_detection`

### Nutrition par aliment et au total (CIQUAL)
- **Macros** : kcal, protéines, glucides, lipides, fibres, sel, eau
- **Glucides détaillés** : sucres, amidon
- **Lipides détaillés** : AG saturés, mono/poly-insaturés, cholestérol
- **AG essentiels** : acide linoléique (ω-6), ALA (ω-3 végétal), EPA, DHA
- **13 vitamines** : A, β-carotène, D, E, K1, C, B1, B2, B3, B5, B6, B9, B12
- **9 minéraux** : Ca, Fe, Mg, P, K, Na, Zn, I, Se

### Scoring santé
- **NOVA par aliment** : 1 (brut) à 4 (ultra-transformé) + raison
- **NOVA agrégé** : % par catégorie + score global ("bon", "moyen", "à améliorer")
- **Règles Hansel par aliment** :
  - Ratio P/L ≥ 1 (oui/non)
  - Glucides < 20% du poids (oui/non)
  - NOVA ≤ 3 (oui/non)
  - Score Hansel 0-3
- **Indicateurs métaboliques** (vs seuils OMS/PNNS adaptés par repas = 30% AJR) :
  - Sel (max 1.5g/repas), AG saturés (7g), sucres (15g), cholestérol (100mg)
  - Fibres (cible 8g)
  - Statut par indicateur : "ok", "attention", "dépassement", "insuffisant"
- **Profil AG essentiels** :
  - Ratio ω-6/ω-3 (cible ≤ 5:1 ANSES)
  - Statut : "excellent", "bon", "attention", "déséquilibré"
  - Apports absolus ALA et EPA+DHA vs cibles journalières

### Metadata
- Temps de traitement (vision + chooser)
- Modèles IA utilisés
- Date d'analyse
- Cache hit/miss

---

## 4. Stack technique

```
┌──────────────────────────────────────┐
│ Frontend PWA (Vercel, HTTPS)         │
│ HTML/CSS/JS vanilla, dark mode       │
│ Installable iOS/Android              │
└──────────────┬───────────────────────┘
               │ REST API + JWT
               ▼
┌──────────────────────────────────────┐
│ Backend FastAPI (Render)             │
│ Pipeline Python + Gemini 2.5 Flash   │
│ Auth JWT, CRUD analyses              │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│ Postgres Neon (gratuit permanent)    │
│ Tables : users, analyses             │
└──────────────────────────────────────┘
```

---

## 5. Évolutions souhaitées (à designer)

### A. Tableau de bord quotidien

**Objectif** : voir d'un coup d'œil ce qu'on a mangé aujourd'hui et l'état de ses indicateurs cumulés.

**Contenu suggéré** :
- Date du jour + navigation jour précédent/suivant
- Vignettes des repas pris (photo + kcal + heure)
- Boutons d'ajout rapide : petit-déj, déjeuner, dîner, collation
- **Indicateurs cumulés du jour** vs objectifs journaliers :
  - Kcal totaux / objectif
  - Macros (P, G, L) en grammes et %
  - Sel, AG saturés, sucres, fibres
  - Ratio ω-6/ω-3 du jour
  - Score NOVA moyen du jour
- Alertes contextuelles ("Plus que 15g de sel autorisés aujourd'hui")
- Bouton "Analyser nouvelle assiette" (CTA principal)

**Indicateurs à choisir** : un MVP affiche 4-6 indicateurs visibles, les autres en détail au tap.

### B. Récap hebdomadaire

**Objectif** : prendre du recul sur ses tendances et identifier les patterns.

**Contenu suggéré** :
- Vue calendrier de la semaine avec mini-graphes par jour (kcal, score)
- **Moyennes hebdomadaires** :
  - Kcal/jour
  - Répartition macros (camembert P/G/L)
  - Score NOVA moyen
  - Ratio ω-6/ω-3 moyen
- **Tendances vs semaine précédente** (+/-)
- **Top aliments consommés** (les 5 plus fréquents)
- **Repas standout** :
  - Meilleur repas de la semaine (selon score Hansel)
  - Pire repas (à améliorer)
- **Alertes scientifiques** :
  - "Tu as dépassé 5g de sel/jour à 4 reprises cette semaine"
  - "Aucun poisson gras (EPA/DHA insuffisant)"
  - "Bonne diversité : 23 aliments distincts cette semaine"

### C. Récap mensuelle

**Objectif** : vision long terme pour identifier les évolutions de fond.

**Contenu suggéré** :
- Graphes 30 jours pour les indicateurs clés (kcal, NOVA, ω-6/ω-3, sel...)
- **Comparaison mois M vs M-1**
- **Objectifs atteints** (gamification douce, sans pression)
- **Score nutritionnel global** du mois (composite NOVA + Hansel + équilibre)
- Recommandations personnalisées basées sur les patterns observés
- Export PDF possible (pour partage avec un pro de santé)

### D. Gestion patient (selon profil utilisateur)

**Si utilisateur grand public** :
- "Patient" = soi-même
- Profil unique avec ses caractéristiques (âge, sexe, poids, taille, objectifs)
- Ajuste les seuils selon le profil (besoins kcal, ratio P/L cible...)

**Si professionnel de santé** :
- Liste de patients sous suivi
- Pour chaque patient : profil, historique d'analyses, récaps, notes pro
- Vue comparative (évolution depuis le début du suivi)
- Export PDF / partage sécurisé du dossier

---

## 6. Profil utilisateur à collecter (configuration initiale)

Pour personnaliser les seuils et recommandations :

**Démographie** :
- Âge, sexe à la naissance
- Poids, taille → calcul IMC automatique
- Niveau d'activité physique (sédentaire / modéré / actif)

**Objectifs** :
- Stabiliser, perdre, prendre du poids
- Surveillance particulière (diabète, cholestérol, hypertension, sport...)
- Cible kcal/jour (calcul auto MIfflin-St Jeor + ajustement activité, ou manuel)

**Contraintes alimentaires** :
- Régimes : végétarien, végan, méditerranéen, sans gluten, etc.
- Allergies / aversions

**Cibles personnalisées** :
- Si pas de saisie → utilise les valeurs OMS/PNNS standard
- Si saisie → adapte (ex: diabétique → cible glucides plus stricte)

---

## 7. Principes de design (cohérence avec l'existant)

### Identité visuelle
- **Dark mode minimaliste premium** (Apple Health/Strava-like)
- Palette : noir profond `#0d1117`, accents bleu `#58a6ff`
- Statuts colorés : vert OK, jaune attention, rouge alerte
- Typographie : SF Pro / Inter / system-ui

### UX principles
- **Photo en 1 clic** : le geste central doit être immédiat
- **Édition non bloquante** : possibilité de corriger sans repasser par l'IA
- **Pédagogie discrète** : expliquer ce que veut dire "NOVA 4" sans alourdir
- **Pas anxiogène** : pas de rouge agressif, pas de gamification toxique
- **Mobile-first** : tout doit être utilisable au pouce sur iPhone

### Ton produit
- Scientifique mais accessible
- Honnête sur les incertitudes (avertissements visibles)
- Disclaimer médical présent mais discret
- Pas de promesses thérapeutiques

---

## 8. Sources scientifiques à mentionner dans l'app

- **CIQUAL** (Centre d'Information sur la Qualité des Aliments) — ANSES
- **NOVA Classification** — Carlos Monteiro et coll., adoptée par l'OMS/FAO
- **Recommandations PNNS** (France) et OMS (sel, sucres, AGS)
- **EFSA** (European Food Safety Authority) pour les apports de référence
- **ANSES** (acides gras essentiels, fibres)
- **Inspiré des positions publiques du Pr Boris Hansel** (endocrinologue, AP-HP)

---

## 9. Contraintes techniques pour le design

### Côté affichage
- L'app doit fonctionner offline sur les écrans historiques (déjà chargés en cache)
- Les analyses nécessitent la connexion (appel API)
- Latence d'analyse : 10-12s en production
- Données : utilise les structures JSON existantes (cf. section 3)

### Côté backend
- L'API REST existe déjà :
  - `GET /api/analyses?limit=N&offset=M` → liste analyses
  - `GET /api/analyses/{id}` → détail
  - `POST /api/analyses` → nouvelle analyse (multipart photo)
  - `PATCH /api/analyses/{id}` → édition
- Pas d'endpoint agrégé (récap semaine/mois) → à créer pour les nouvelles vues

### À créer côté backend pour les nouvelles features
- `GET /api/stats/today` → indicateurs cumulés du jour
- `GET /api/stats/week?start=YYYY-MM-DD` → récap semaine
- `GET /api/stats/month?year=YYYY&month=MM` → récap mois
- `GET/PATCH /api/users/me/profile` → profil utilisateur (démographie, objectifs)
- Si mode pro : `GET /api/patients`, `GET /api/patients/{id}/stats/*`

---

## 10. Limitations et éléments à ne PAS designer

### Limitations à conserver visibles
- L'IA peut se tromper (l'utilisateur doit toujours pouvoir éditer)
- Les portions sont des estimations visuelles (±15-30% d'erreur)
- Certains aliments CIQUAL n'ont pas tous les nutriments renseignés (58% pour les AG essentiels)
- L'app n'est PAS un dispositif médical (disclaimer)

### À ne pas designer pour l'instant
- Reconnaissance d'aliments hors photos (saisie manuelle complète, code-barre)
- Recettes ou meal planning prospectif
- Social / partage public d'analyses
- Coaching IA personnalisé / chat
- Notifications push avancées (juste rappels simples au début)
- Apple Health / Google Fit intégration (Phase 2)

---

## 11. Hiérarchie de navigation suggérée

```
Bottom tab bar (4 onglets) :
├── 📷 Analyser (CTA principal, ouvre direct la caméra)
├── 📅 Aujourd'hui (dashboard quotidien)
├── 📊 Stats (semaine/mois/évolutions)
└── 👤 Profil (paramètres, données, déconnexion)

Stack navigation par onglet :
- Aujourd'hui → Détail d'un repas → Édition aliment
- Stats → Détail semaine → Détail jour → Détail repas
- Profil → Objectifs → Édition cible kcal
- (Mode pro) Profil → Liste patients → Patient → Stats patient
```

---

## 12. Données démographiques pour cibles personnalisées

Formules à intégrer dans le backend pour ajuster les recommandations :

**Métabolisme de base (Mifflin-St Jeor)** :
- Homme : `10 × poids(kg) + 6.25 × taille(cm) − 5 × âge(an) + 5`
- Femme : `10 × poids + 6.25 × taille − 5 × âge − 161`

**Besoins énergétiques journaliers** :
- Sédentaire : MB × 1.2
- Activité légère : MB × 1.375
- Activité modérée : MB × 1.55
- Activité intense : MB × 1.725

**Macros recommandés (% kcal totaux)** :
- Protéines : 15-25% (1.2-2g/kg de poids)
- Lipides : 30-35%
- Glucides : 40-55%

**Cibles ajustées si pathologie** :
- Diabète T2 : glucides ≤ 40% kcal
- Hypertension : sel ≤ 5g/jour strict
- Cholestérolémie : AGS ≤ 7% kcal (au lieu de 10%)

---

## 13. Brief prompt suggéré pour l'outil de design

> Design une application mobile (PWA installable) de suivi nutritionnel premium
> appelée Plate Analyzer. L'app analyse des photos d'assiettes via IA et fournit
> un scoring scientifique multidimensionnel (NOVA, indicateurs OMS/PNNS,
> ratio oméga-6/oméga-3). Style dark mode minimaliste premium type Apple Health.
>
> Crée les écrans suivants :
> 1. Onboarding (3 écrans) : présentation produit + saisie profil
>    (démographie, objectifs, contraintes alimentaires)
> 2. Dashboard quotidien : indicateurs cumulés du jour vs objectifs,
>    vignettes des repas pris, CTA "analyser nouvelle assiette"
> 3. Capture photo : viseur caméra plein écran avec conseils
> 4. Loading analyse : animation pendant les 10s de traitement IA
> 5. Résultat d'analyse : aliments détectés éditables, scoring NOVA visuel,
>    indicateurs santé barres, profil ω-6/ω-3
> 6. Récap hebdo : calendrier mini-graphes, moyennes, top aliments,
>    standout repas, alertes scientifiques
> 7. Récap mensuelle : graphes 30j des indicateurs clés, comparaison M-1,
>    score nutritionnel composite, export PDF
> 8. Profil utilisateur : objectifs, données démographiques, RGPD
>
> Contraintes :
> - Mobile-first 375px minimum
> - Tactile : zones touch ≥ 44px
> - Couleurs : noir #0d1117, accent bleu #58a6ff,
>   statuts vert/jaune/rouge subtils
> - Typographie système (SF Pro / Inter)
> - Pédagogique mais pas anxiogène
> - Disclaimer médical présent
>
> Inspiration : Apple Health, Strava, MyFitnessPal moderne, YAZIO.
> NE PAS s'inspirer de : applis crypto, néobanques tape-à-l'œil.

---

## 14. Glossaire pour les designers

- **NOVA** : classification du degré de transformation des aliments (1-4)
- **PNNS** : Programme National Nutrition Santé (France)
- **OMS** : Organisation Mondiale de la Santé
- **CIQUAL** : table de composition nutritionnelle française (ANSES)
- **EPA/DHA** : acides gras oméga-3 marins (poissons gras)
- **ALA** : acide alpha-linolénique (oméga-3 végétal)
- **Acide linoléique (AL)** : principal oméga-6 alimentaire
- **AGS** : acides gras saturés
- **Ratio ω-6/ω-3** : indicateur d'inflammation chronique
- **IMC** : indice de masse corporelle (poids / taille²)
- **MB** : métabolisme de base

---

*Document de brief design v1, à compléter selon le profil utilisateur choisi
(grand public, pro de santé, ou les deux).*
