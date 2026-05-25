# Handoff — Plate Analyzer (PWA design system + écrans)

> Pack de handoff design → dev pour l'app **Plate Analyzer** (analyse nutritionnelle photo → IA → CIQUAL → scoring).
> Cible : intégration dans la PWA HTML/CSS/JS vanilla existante (front Vercel) + endpoints FastAPI (Render) + Postgres (Neon).

---

## 1 — Ce qui est dans ce dossier

```
design_handoff_plate_analyzer/
├── README.md                      ← ce fichier
├── DESIGN_BRIEF.md                ← brief fonctionnel original (source de vérité produit)
└── prototype/
    ├── Plate Analyzer.html        ← entrée — sélecteur d'écran + iPhone interactif
    ├── styles.css                 ← tokens CSS + chrome de la page de présentation
    ├── ui.jsx                     ← primitives UI (Ring, Spark, Bar, Pill, Stat, Card, Nova, Phone…)
    ├── tweaks-panel.jsx           ← panneau de tweaks (densité, accent, mode pro)
    ├── app.jsx                    ← shell de présentation (rail gauche, scène centrale, spec droite)
    ├── screens-onboarding.jsx     ← 4 écrans onboarding
    ├── screens-today.jsx          ← Aujourd'hui · Capture · Loading
    ├── screens-result.jsx         ← Résultat d'analyse
    ├── screens-stats.jsx          ← Récap semaine · mois · historique
    └── screens-profile.jsx        ← Profil grand public + variante mode pro
```

## 2 — À propos des fichiers de design

**Les fichiers `prototype/*` sont des références de design, pas du code de production.**
Ils sont écrits en **React + JSX** servis via `@babel/standalone` pour itérer vite ; votre PWA finale est **HTML/CSS/JS vanilla, dark mode**. Le travail consiste donc à **recréer ces écrans dans la stack PWA existante** en réutilisant ses patterns (composants, routing, state, fetch JWT), pas à embarquer le React du prototype.

Pour ce faire :
- **Reprenez `styles.css`** (tokens couleurs, typo, ombres) tel quel ou adapté en CSS Custom Properties dans votre PWA.
- **Reprenez la logique de chaque composant JSX** comme spécification d'une vue HTML/JS (chaque composant React = un module vanilla).
- **Importez les polices** Inter + IBM Plex Mono (Google Fonts) — déjà déclaré dans `styles.css`.
- **Adaptez la navigation** au routing de votre PWA (probablement hash-based ou History API).

## 3 — Fidélité

**High-fidelity (hifi)** — pixel-perfect.
Tous les écrans ont :
- couleurs hex définitives (tokens dans `styles.css` et plus bas),
- typographies finales (Inter + IBM Plex Mono),
- spacing, radii, ombres,
- copies françaises définitives,
- micro-interactions (hover sur les rows, focus sur les inputs, animations du loading).

Le mobile cible est **390 × 844** (iPhone 14/15 standard). Tout est mobile-first ; pas de breakpoint au-delà à ce stade.

---

## 4 — Système de design

### 4.1 Tokens couleur (CSS Custom Properties, déjà dans `styles.css`)

```css
:root {
  /* Backgrounds */
  --bg-page:    #07090c;   /* page externe (browser dark) */
  --bg-canvas:  #0b0e13;   /* fond de l'app PWA */
  --bg-surface: #11151c;   /* cartes principales */
  --bg-raised:  #171c25;   /* cartes sur cartes */
  --bg-elev:    #1d242f;   /* éléments hover / actifs */

  /* Lines */
  --line:         rgba(255,255,255,0.06);
  --line-strong:  rgba(255,255,255,0.10);
  --line-bright:  rgba(255,255,255,0.14);

  /* Text */
  --text-1: #e8edf5;   /* primaire */
  --text-2: #97a3b6;   /* secondaire */
  --text-3: #5e6b80;   /* tertiaire / captions */
  --text-4: #3f495a;   /* désactivé / meta très discret */

  /* Accent — lavande (par défaut) + cyan */
  --accent:        #c4b5fd;
  --accent-soft:   rgba(196,181,253,0.14);
  --accent-line:   rgba(196,181,253,0.32);

  --accent-2:      #7dd3fc;
  --accent-2-soft: rgba(125,211,252,0.14);
  --accent-2-line: rgba(125,211,252,0.32);

  /* Status sémantique */
  --ok:    #4ade80;  --ok-soft:    rgba(74,222,128,0.14);
  --warn:  #fbbf24;  --warn-soft:  rgba(251,191,36,0.14);
  --alert: #f87171;  --alert-soft: rgba(248,113,113,0.14);
}
```

**Convention de mapping santé** :
- `--ok` (vert) = dans la cible, "bon", NOVA 1-2
- `--warn` (jaune) = "attention", proche de la limite, NOVA 3
- `--alert` (rouge) = dépassement net, NOVA 4, insuffisance critique
- `--accent` (lavande) = neutre, valeur de marque
- `--accent-2` (cyan) = donnée secondaire ou comparative

⚠️ **Pas de rouge agressif en dehors de `--alert`**, pas de gradient saturé (le brief insiste : non-anxiogène).

### 4.2 Typographie

```css
--sans: 'Inter', -apple-system, system-ui, sans-serif;
--mono: 'IBM Plex Mono', ui-monospace, monospace;
```

Import : `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap`.

**Échelle** (mobile, dans le phone 390 px) :
| Usage              | Famille | Taille | Poids | Tracking |
| ------------------ | ------- | ------ | ----- | -------- |
| Titre écran (H1)   | sans    | 22 px  | 600   | -0.02em  |
| Titre page hero    | sans    | 26 px  | 600   | -0.02em  |
| Titre carte        | sans    | 14-15 | 500-600 | -0.01em |
| Section header     | mono    | 10 px  | 400   | 0.12em (UPPER) |
| Code/meta          | mono    | 9-10 px | 400 | 0.08em (UPPER) |
| Body               | sans    | 12-13 | 400-500 | normal |
| Caption            | sans    | 11 px  | 400   | normal   |
| Big number         | mono    | 22-36 | 500   | -0.02em à -0.04em |
| Medium number      | mono    | 15-18 | 500   | -0.02em  |
| Inline number      | mono    | 10-14 | 500   | normal   |

**Tous les chiffres en `var(--mono)` avec `font-variant-numeric: tabular-nums`**. Toutes les unités (g, kcal, mg, µg) en mono, taille -2 à -3 px par rapport au chiffre, couleur `var(--text-3)`.

**Section header pattern** (utilisé partout) :
```
SECTION TITLE · 12px tracking 0.12em uppercase · text-3
                                                    [action accent]
```

### 4.3 Spacing & radii

- Grille **4 pt** (toutes les valeurs sont multiples de 2/4).
- Padding cartes : **14 px** (12 si compacte, 16 si hero).
- Gap entre cartes d'une même section : **6-8 px**.
- Gap entre sections : **14 px** (`PASection` a `marginBottom: 14`).
- Padding écran (gauche/droite) : **16 px**.

**Radii** :
| Élément | Valeur |
| ------- | ------ |
| Bouton / tag / pill | 4-8 |
| Input / petit champ | 4-6 |
| Carte standard      | 10-12 |
| Carte hero          | 14-16 |
| Phone screen        | 44 (déjà géré par l'OS dans la PWA) |

### 4.4 Ombres

Pas d'ombres en dehors de :
- Bouton CTA principal : aucune.
- Bordure tonale `1px solid var(--line)` partout.
- Hero composite : `radial-gradient` très subtil en coin (8-10% d'opacité).

### 4.5 Iconographie

SVG inline, **stroke 1.5**, `viewBox="0 0 24 24"`, `fill="none" stroke="currentColor"`. Voir `SettingIcon` dans `screens-profile.jsx` pour la grille complète d'icônes utilisées (bell, sun, lock, trash, etc.).

Taille standard : 14-22 px selon contexte.

---

## 5 — Primitives UI à porter

Les composants ci-dessous sont dans `ui.jsx`. À recréer en vanilla JS — soit comme web components, soit comme petites factory functions retournant des HTMLElement, selon votre convention.

| Composant       | Rôle                                                                                   | Notes d'implémentation |
| --------------- | --------------------------------------------------------------------------------------- | ---------------------- |
| `PARing`        | Anneau de progression (SVG). value, target, size, stroke, color, contenu central       | 2 cercles SVC, rotation -90deg |
| `PASpark`       | Sparkline minimaliste avec aire optionnelle + dot final                                | Calcul d en JS, pas de lib |
| `PABar`         | Barre linéaire + tick de cible                                                          | Position absolute pour le tick |
| `PAPill`        | Badge `ok / warn / alert / accent / cyan / muted`, optionnel dot                       | 5 variantes via classes status |
| `PAStat`        | Label mono uppercase + nombre mono + unit + sub                                        | Tailles sm/md/lg/xl |
| `PACard`        | Surface standard                                                                        | bg-surface + line + radius 14 |
| `PANova`        | Barre NOVA 4 segments, score actif coloré                                              | compact mode pour les rows |
| `PASection`     | En-tête de section (title mono + code + action accent)                                 | Wrapper réutilisable |
| `PAStatusBar`   | Status bar OS-style (heure mono + signal/wifi/batterie SVG)                            | Plein écran |
| `PATabBar`      | Bottom nav 4 tabs (capture / today / stats / profile)                                  | active = accent, sinon text-3 |
| `PAPhone`       | Shell de téléphone (dynamic island, status bar, scroll, home indicator)                | **À ne pas porter** — le device chrome est uniquement présent en preview |

Pour la PWA : `PAPhone` n'a pas à exister, c'est juste le viewport. La status bar OS est celle du système (vous gérez seulement le notch via `env(safe-area-inset-top)`).

---

## 6 — Écrans

Identifiants et fichiers source dans le prototype :

| ID prototype  | Nom (fr)          | Source JSX                              | Route suggérée PWA          |
| ------------- | ----------------- | --------------------------------------- | --------------------------- |
| `welcome`     | Bienvenue         | `screens-onboarding.jsx#ScreenWelcome`  | `/onboarding/welcome`       |
| `demographics`| Caractéristiques  | `screens-onboarding.jsx#ScreenDemographics` | `/onboarding/profile`   |
| `goals`       | Objectifs         | `screens-onboarding.jsx#ScreenGoals`    | `/onboarding/goals`         |
| `permissions` | Autorisations     | `screens-onboarding.jsx#ScreenPermissions` | `/onboarding/permissions` |
| `today`       | Aujourd'hui       | `screens-today.jsx#ScreenToday`         | `/`  (tab racine)           |
| `capture`     | Capture (viseur)  | `screens-today.jsx#ScreenCapture`       | `/capture`                  |
| `loading`     | Analyse (pipeline)| `screens-today.jsx#ScreenLoading`       | `/capture/analyzing`        |
| `result`      | Résultat          | `screens-result.jsx#ScreenResult`       | `/analyses/:id`             |
| `weekly`      | Récap semaine     | `screens-stats.jsx#ScreenWeekly`        | `/stats/week`               |
| `monthly`     | Récap mois        | `screens-stats.jsx#ScreenMonthly`       | `/stats/month`              |
| `history`     | Historique        | `screens-stats.jsx#ScreenHistory`       | `/history`                  |
| `profile`     | Profil (public)   | `screens-profile.jsx#ScreenProfile`     | `/profile`                  |
| `pro`         | Liste patients    | `screens-profile.jsx#ScreenProfile` + `proMode=true` | `/patients` (role=pro)      |
| `patient`     | Détail patient    | `screens-pro.jsx#ScreenPatientDetail`   | `/patients/:id`             |
| `compare`     | Comparaison       | `screens-pro.jsx#ScreenPatientCompare`  | `/patients/:id/compare`     |
| `notes`       | Notes cliniques   | `screens-pro.jsx#ScreenClinicalNotes`   | `/patients/:id/notes`       |
| `pdf`         | Compte-rendu PDF  | `screens-pro.jsx#ScreenPDFReport`       | `/patients/:id/report`      |
| `share`       | Partage sécurisé  | `screens-pro.jsx#ScreenSecureShare`     | `/patients/:id/share`       |

### 6.1 Densité dataviz "Sobre" vs "Détail"

Plusieurs écrans (`today`, `result`, `weekly`) prennent une prop `dense: boolean`. Quand `dense = true`, des blocs supplémentaires apparaissent :
- **Today** : 2 indicateurs OMS de plus (Cholestérol, Sodium).
- **Result** : la grille `Vitamines & minéraux` (8 nutriments avec % AJR).
- **Weekly** : 2 sparklines de plus (ω-6/ω-3, sucres).

Implémentation suggérée : un toggle "Affichage détaillé" dans Profil (ou rappelable globalement), persisté en localStorage + appliqué via une classe `body.dense`.

### 6.2 Mode professionnel

Le même écran `/profile` change de contenu si `user.role === 'pro'` :
- en-tête : "Compte praticien" + pill "Mode pro" lavande
- substitution du bloc "Objectifs + démographie" par "Patients suivis" (liste avec mini-sparklines de score) + "Alertes patients" + "Cabinet" (paramètres pro)
- footer identique
- **5 écrans pro supplémentaires** : Détail patient, Comparaison périodes, Notes cliniques, Compte-rendu PDF, Partage sécurisé — voir §7.11–7.15

Variante uniquement contenu, **mêmes primitives, mêmes tokens**.

---

## 7 — Détail des écrans (spec d'implémentation)

> Chaque section ci-dessous décrit la structure, les copies définitives et les comportements. Référez-vous au JSX correspondant pour la pixel-précision (paddings, marges, tailles exactes).

### 7.1 Onboarding (4 écrans, navigation linéaire)

**Chrome commun** (`OBChrome` dans `screens-onboarding.jsx`) :
- Header : barre de progression à dots étirés (largeur 22 px pour l'actif, 6 px pour les autres) + compteur mono `01 / 04`.
- Titre H1 : 26 px / 600 / -0.02em.
- Sous-titre 14 px / text-2 / 1.5 line-height.
- Footer : copie discrète optionnelle + bouton CTA pleine largeur lavande, color `#0a0d12`.

**01 Welcome** :
- Hero mark (84 × 84) gradient lavande/cyan + cercle SVG centré.
- 4 features en cartes : `CIQUAL · ANSES` / `NOVA + Hansel` / `Indicateurs OMS / PNNS` / `Mode professionnel`.
- Copie disclaimer en bas : "Plate Analyzer n'est pas un dispositif médical."

**02 Demographics** :
- 4 champs en grid 2×2 : Âge, Sexe, Taille, Poids.
- Selector activité physique 4 options avec multiplicateur Mifflin-St Jeor (`×1.20`, `×1.37`, `×1.55`, `×1.73`).
- Bloc dérivé (gradient lavande léger) : IMC + statut, MB (kcal), Cible kcal/jour — **calculés en JS** (formules Mifflin-St Jeor dans le brief §12).

**03 Goals** :
- Objectif pondéral : 3 chips Stabiliser / Perdre / Prendre (avec delta kcal).
- Surveillance particulière : multi-select chips (Diabète T2, Cholestérolémie, Hypertension, Sport endurance, Aucune). Cibles ajustées affichées comme status sur la chip active.
- Régime : multi-select (Méditerranéen, Végétarien, Végan, Sans gluten, Sans lactose).
- Note finale dashed : récap des cibles ajustées en français lisible.

**04 Permissions** :
- 3 perm cards : Appareil photo (requis), Photothèque, Rappels.
- Bloc Sources scientifiques en pills mono : `CIQUAL · ANSES`, `NOVA · Monteiro`, `PNNS`, `OMS`, `EFSA`.

**Comportement** :
- Persister chaque écran dès qu'il est rempli (PATCH `/api/users/me/profile`).
- Bouton "Continuer" actif uniquement quand champs requis sont OK.
- Pas de retour arrière sur l'étape 04 (les permissions natives suivent).

### 7.2 Aujourd'hui (`/`)

**Hiérarchie** :
1. **Date nav** : "Aujourd'hui · J−0" + date `Lun. 12 mai` + chevrons précédent/suivant.
2. **Hero composite** : score `78 / 100` (PARing 96 px lavande) à gauche, 3 sub-scores à droite (NOVA, Hansel, Équilibre), avec radial bg subtil.
3. **Hero kcal** : nombre énorme (36 px mono) + PABar avec tick de cible + 3 macros (P/G/L) sous une ligne de séparation.
4. **Indicators grid** (2 colonnes, 4 ou 6 selon densité) : Sel, AGS, Sucres, Fibres (+ Cholestérol, Sodium en mode détail). Chaque tile : label, code mono, valeur colorée par statut, ratio `/ cible`, PABar 2 px, sub explicatif.
5. **Profil ω-6/ω-3** : ratio numérique géant + scale visuelle linéaire (gradient ok→warn→alert avec tick cible + curseur courant) + 3 micro-stats (ALA, EPA+DHA, AL).
6. **Repas du jour** : liste de cartes (thumb 38 px, nom, heure mono, kcal, NOVA compact) + placeholder dashed pour le prochain repas attendu.
7. **Alertes** : cartes avec border-left 2 px de la couleur du statut.
8. **CTA** "Analyser une nouvelle assiette" lavande pleine largeur + icône caméra.

**Data** : `GET /api/stats/today` (à créer côté backend — déjà identifié dans brief §9).

### 7.3 Capture (`/capture`)

Plein écran noir + faux contenu (gradient + cercle "assiette") pour le prototype. En PWA :
- `<video>` ou MediaCapture API + overlay grid 3×3 (1 px lignes blanc 6% d'opacité).
- 4 brackets accent lavande dans les coins de la zone de capture.
- Strip de tip en haut (glass blur) : "Cadrez l'assiette à plat. Lumière naturelle."
- Readout EXPO en haut à droite (peut être omis en MVP).
- Bottom : galerie (44 px square) / shutter (76 px, anneau blanc + disque lavande 62 px avec glow) / flash (44 px square).
- Bouton fermer (haut gauche) revient sur Today.

**Comportement** :
- Tap shutter → photo capturée → `POST /api/analyses` (multipart) → navigation vers `/capture/analyzing`.

### 7.4 Loading (`/capture/analyzing`)

Pipeline scientifique avec 4 étapes verticales :
1. Vision IA · Gemini 2.5 Flash → "Identification aliments · 4.2 s"
2. Matching CIQUAL → "Embeddings · 3 185 candidats · 1.8 s"
3. LLM Chooser → "Sélection finale + portions · est. 2.5 s"
4. Scoring + persist → "NOVA · Hansel · OMS · Postgres"

**Indicateurs** :
- Étape `done` : dot vert avec `✓` + ligne verte vers la suivante.
- Étape `active` : dot accent + halo qui pulse (animation CSS `paPulse 1.6s ease-out infinite`).
- Étape `pending` : dot ligne neutre + numéro mono.

**Preview photo** au-dessus du pipeline (200 px de haut, radial-gradient food + scan line lavande animée verticalement, animation `paScan 2.4s ease-in-out infinite`) + chips de détection en cours qui apparaissent (`quinoa · 87%`, `feta · 92%`).

Footer mono : `~8.5 s / ~12 s` + lien "Annuler".

### 7.5 Résultat (`/analyses/:id`)

1. **Top bar** : bouton retour + heure mono + ellipsis menu.
2. **Hero** : image plat (140 px) avec badges `SCAN · 11.4 s` + `EDIT` aux coins. En dessous : "Plat détecté" (mono) + nom (`Salade quinoa · feta · concombre · pois chiches`) + grid 5 colonnes (Kcal big · P · G · L · Poids).
3. **Aliments détectés** : liste éditable. Chaque row : NOVA compact + nom (+ tag "modifié" si patché) + code CIQUAL + confidence colorée (>85 ok, 70-85 warn, <70 alert) + input portion (input mono numérique, draggable suggéré) + kcal calculé. Banner warn sous la liste si ≥1 aliment a confidence < 75 %.
4. **NOVA agrégé** : score décimal `1.4 / 4`, pill statut, **stacked bar** colorée (76% NOVA1 / 14% N2 / 10% N3 / 0% N4) avec pourcentages inscrits, légende 4 colonnes.
5. **Indicateurs OMS · part repas (30% AJR)** : grid 2 colonnes (Sel, AGS, Sucres, Cholestérol, Fibres, Eau). Fibres affiche `↑ cible` au lieu de `/ X` (puisque c'est une cible à atteindre).
6. **Profil ω-6 / ω-3** : ratio + 4 bars verticales (AL, ALA, EPA, DHA) avec opacité 0.6 pour EPA/DHA (faibles) + légende. Sub-note recommandation.
7. **Règles Hansel** : 3 checks (P/L ≥ 1, G < 20%, NOVA ≤ 3) avec dot vert ou rouge + sub explicatif.
8. **Vitamines & minéraux** *(dense seulement)* : grid 4 colonnes (B9, B12, D, C, Fer, Ca, Mg, K) avec % AJR mono très compact.
9. **Avertissements scientifiques** : bloc dashed text-3 ligne par ligne.

**Edits** : tap sur portion → input keyboard; tap sur le nom → modale "changer le match CIQUAL" (à designer si non couvert) ; bouton supprimer en swipe ou ellipsis row. Toute édition → `PATCH /api/analyses/:id` (réutilise endpoint existant) → recalcul scoring côté serveur.

### 7.6 Récap semaine (`/stats/week`)

1. **Segmented control** : Jour / **Semaine** / Mois / 90j + bouton "+" pour comparaison.
2. **Header** : "Semaine · S19" + "6 — 12 mai" + delta vs S18 (vert ↑ ou rouge ↓).
3. **Bar chart 7 jours** : score quotidien (0-100), color-codé par seuil, jour actuel = accent + valeur affichée au-dessus.
4. **Donut macros + averages** : SegmentDonut 92 px à gauche (P/G/L percentages) + legend lignes à droite avec valeurs absolues.
5. **Tendances · 7 jours** : grid 2 colonnes (4 ou 6 mini-cards) — chaque card = label + valeur + sparkline 140×20 + delta vs S-1.
6. **Top aliments** : liste ranked (numérotée mono) avec fréquence `7 / 7 j` ou `14× cette semaine` + NOVA compact.
7. **Standout** : 2 cartes côte-à-côte. Best (border-left ok) `★ Meilleur · score 92` + 3 attrs mono. Worst (border-left alert) `↓ Pire · score 38`.
8. **Alertes scientifiques** : `!` (alert) `↑` (warn) `✓` (ok) avec icône colorée + titre + sub.

**Data** : `GET /api/stats/week?start=YYYY-MM-DD`.

### 7.7 Récap mois (`/stats/month`)

1. **Segmented** : Jour / Semaine / **Mois** / 90j + bouton **PDF** (`GET /api/stats/month/export.pdf`).
2. **Header** : "Mai 2026 · J−12" + "Bilan mensuel".
3. **Hero composite** : score `74 / 100` (PARing cyan 104 px) + delta vs M−1 (texte vert/rouge) + sparkline 12 points + 3 sub-scores (NOVA, Hansel, OMS).
4. **Heatmap 30 jours** : grid 7 colonnes (L M M J V S D) + 30 cells. Couleur par seuil de score, **opacité = score/100 × 0.85 + 0.18**. Jour actuel : bordure accent 1.5 px. Numéro du jour en mono dans le coin top-left de chaque cell. Legend graduée 0 → 100.
5. **Indicateurs clés · 30 j** : grid 2 colonnes, 4 BigTrend cards (kcal, sel, ω-6/ω-3, fibres). Chaque card = label + valeur grosse + sparkline 148×28 + ligne "M−1: X" + delta coloré.
6. **Objectifs · mai** : `6 / 8` atteints. Liste de checkboxes (carrés colorés ok/alert) + statut détaillé mono.
7. **Recommandations** : 3 sci-alerts `→` (ok ou warn) basées sur patterns détectés. Copie : "Continuer le poisson le mercredi", "Réduire le sel du dîner", "Diversifier les ω-3".

**Data** : `GET /api/stats/month?year=YYYY&month=MM`.

### 7.8 Historique (`/history`)

- Header : "Historique" + "148 analyses" + "depuis le 02 fév. 2026".
- Search bar full-width avec icône loupe + raccourci `⌘K`.
- Filter chips : `Tout`, `NOVA ≤ 2`, `Hansel 3/3`, `Sel ↑`, `7 j` — multi-select.
- Groupées par jour : header mono date + count + total kcal. Rows : heure mono 38 px + nom (ellipsis) + NOVA compact + kcal mono align-right 50 px.

**Data** : `GET /api/analyses?limit=N&offset=M` (existe déjà).

### 7.9 Profil grand public (`/profile`)

- Header : "Compte" + "Profil".
- Identity card : avatar 52 × 52 (initiales + gradient lavande/cyan) + nom + email + bouton "Éditer".
- **Objectifs** : objectif pondéral + cible kcal + 3 macros tiles + tags surveillance/régime.
- **Démographie** : 4 stats inline (Âge, Sexe F, Taille, Poids) + 3 sub-stats (IMC coloré, MB, Activité).
- **Paramètres** : Notifications / Apparence / Unités / Langue (rows avec icon 22 × 22).
- **Données (RGPD)** : Export JSON / Export PDF / Sources scientifiques / Politique / Supprimer compte (rouge).
- Footer mono très discret : version + build + disclaimer.

### 7.10 Profil mode pro (variante)

Le même endpoint `/profile` mais avec `user.role === 'pro'` :
- Header switch : "Compte praticien" + pill `Mode pro`.
- Identity : "Dr. Boris Hansel · Endocrinologue · AP-HP".
- **Patients suivis** : liste de 4+ patient cards. Avatar initiales + nom + tag pathologie + count analyses + sparkline 42 × 20 + score coloré + "il y a 2j".
- **Alertes patients** : rows avec border-left (alert/warn/ok) + name + sub explicatif + `→` chevron.
- **Cabinet** : Cabinet, RPPS, Partage sécurisé, Modèle CR PDF.
- Paramètres + RGPD identiques.

→ Tap sur une carte patient ouvre `/patients/:id` (§7.11).

---

### 7.11 Détail patient (`/patients/:id`) — onglet **Suivi**

1. **Patient strip** (header réutilisé partout dans le pro) : back · avatar · nom + âge · tag pathologies · méta `47 analyses · suivi depuis 02/2025` · actions.
2. **Tabs cliniques** : `Suivi` · `Comparer` (6 mois) · `Notes` (8) · `Partage` (1 actif) — underline accent.
3. **Contexte clinique** : 4 biomarqueurs (HbA1c, LDL-c, IMC, TA) colorés par seuil + tags traitements (Metformine 1000mg ×2, Atorvastatine 20mg, Ramipril 5mg) + bouton "Modifier".
4. **Score 30j · vs M−1** : ring 86 px + delta −4 pts + sparkline + dates.
5. **Signaux cliniques · 14j** : cards border-left coloré (alert/warn/ok) avec valeur, delta seuil, cause détectée ("Plats préparés en hausse...").
6. **Derniers repas** : list pareille à history, indicateur de note (icône lignes accent) si analyse annotée.
7. **Objectifs prescrits** : checks ok/non-ok avec tag pathologie (HTA / DT2 / LDL).
8. **Actions** : Note / PDF / Partager.

**Data** : `GET /api/patients/:id` + `/api/patients/:id/stats/today` + `/api/patients/:id/signals` + `/api/patients/:id/objectives`.

**Notes** :
- Biomarqueurs saisis manuellement par le praticien (sheet d'édition derrière "Modifier").
- Seuils des signaux configurables par pathologie.
- Un repas annoté affiche l'icône note dans la row.

---

### 7.12 Comparaison avant/après (`/patients/:id/compare`)

Outil clé : comparer 2 périodes autour d'une intervention thérapeutique.

1. Patient strip + tabs (Comparer actif).
2. **Period picker** : 2 chips date (`AVANT 01–28 fév.` / `APRÈS 15 avr.–12 mai`) + préset `post-intervention`. Ligne intervention en dessous : `Régime méditerranéen + éducation thérapeutique · 14 mars`.
3. **Score comparison hero** : 2 PARing côte-à-côte (avant 70 px gris · après 88 px accent), au centre `+13 pts · p < 0.05`.
4. **Tableau indicateurs** : grid 4 colonnes (Indicateur / Avant / Après / Δ), 8 lignes (Sel, AGS, Sucres libres, Fibres, NOVA, ω-6/ω-3, Poisson gras, Kcal). Delta coloré.
5. **Évolution superposée** : SVG line chart custom — ligne grise = avant, ligne accent = après, ligne verticale pointillée à la date d'intervention.
6. **Synthèse clinique IA-assistée** : carte gradient lavande, texte généré (`Amélioration significative sur 8/8 indicateurs...`) + 2 boutons : `Inclure au CR PDF` / `Reformuler`.

**Important** :
- La synthèse IA est explicitement marquée **"à valider"** — le médecin reste responsable.
- Test statistique (p < 0.05) seulement si échantillon suffisant.
- Présets : `M−1 vs M`, `Pre vs Post intervention`, `T1 vs T2`.

**Data** : `GET /api/patients/:id/compare?p1_start&p1_end&p2_start&p2_end` → `{ p1, p2, deltas[], synthesis_draft, weekly_scores }`.

---

### 7.13 Notes cliniques (`/patients/:id/notes`)

1. Patient strip (action droite = pill accent `+ Note`).
2. Tabs (Notes actif).
3. **Filter chips** : `Toutes (8)` · `Intervention (2)` · `Observation (4)` · `Éducation (1)` · `Objectif (1)`.
4. **Timeline verticale** : ligne 1 px à gauche, dots 11 px ceinturés couleur du tag. Chaque note = card avec tag pill + date + titre + body + optionnel ligne objectifs (chips mono) + optionnel ligne `Lié` (chip analyse).
5. **Compose stub** dashed en bas : `+ Ajouter une note clinique`.

**Catégories** :
- `Intervention` (lavande) — changement thérapeutique
- `Observation` (cyan) — constat factuel
- `Éducation` (vert) — ETP, atelier patient
- `Objectif` (jaune) — objectif fixé ou révisé

**Data** : `GET /api/patients/:id/notes` → `[{ id, date, category, title, body, objectives[], linked_meal_id? }]`. `POST` pour créer.

---

### 7.14 Compte-rendu PDF (`/patients/:id/report`)

Prévisualisation du PDF généré (modèle AP-HP / Endocrinologie).

1. **Top bar** : back + `Compte-rendu nutritionnel` + sous-titre mono `2 pages · 384 ko · v 1` + `Éditer`.
2. **Page selector** : chips `p. 1` / `p. 2` + label `A4 · zoom 35%`.
3. **Aperçu page A4** : carte blanc cassé `#f7f4ee` sur fond canvas, header (titre mono + nom + NIP + Dr signature), synthèse, 3 cartes score (avant/après/delta), tableau indicateurs zebra, footer paginé.
4. **Sections incluses** : 7 toggles (Identité, Synthèse, Tableau, Graphique, Notes, Détail 39 nutriments, Annexe scientifique). 5/7 actives par défaut.
5. **Actions** : `Télécharger` (ghost) / `Partager` (accent).

**Important** :
- Le PDF réel est généré côté serveur (WeasyPrint ou Playwright headless).
- Toggle section → debounce 300 ms → `GET /api/patients/:id/report/preview?sections=...` rafraîchit.
- Polices PDF : Inter + IBM Plex Mono. PDF/A pour archivage si nécessaire.

**Data** : `GET /api/patients/:id/report/preview?sections=a,b,c&period=...` → `{ pages: [{ url }], filename, size_bytes }`. `POST /api/patients/:id/report` génère et persiste.

---

### 7.15 Partage sécurisé (`/patients/:id/share`)

Génération de liens chiffrés + gestion des partages actifs.

1. Patient strip + tabs (Partage actif).
2. **Lien actif** (carte gradient lavande) : status dot vert + label + expiry mono. Champ lien `plate.app/s/k7m9-x2pq-4nzj` (id en accent) + bouton `Copier`. QR code 76×76 + méta droite (destinataire, contenu, chiffrement `AES-256 · TLS 1.3`, consentement patient + date).
3. **Nouveau lien · config** :
   - Périmètre : 3 chips (Dernier CR / Période / Suivi complet)
   - Expiration : 4 chips (24 h / 7 j / 30 j / Usage unique)
   - Sécurité : 4 toggles (PIN à l'ouverture · Notification à chaque ouverture · Téléchargement autorisé · Consentement patient — verrouillé on, RGPD art. 9)
   - CTA `Générer le lien sécurisé`.
4. **Historique** : liste partages (dot status, email, date, count ouvertures, pill `actif`/`expiré`).

**Crypto** :
- L'id de lien : 12+ chars aléatoires base32 URL-safe (non-devinable).
- Contenu = blob chiffré côté serveur, clé dérivée du PIN (PBKDF2 ou Argon2id).
- Audit log : chaque ouverture pousse un événement (date, IP redactée, user-agent) dans l'historique.
- Consentement patient requis → mail/push de confirmation avant utilisation.

**Conformité RGPD** :
- Hosting blobs sur infra **HDS** (Scaleway, OVH HDS, AWS Paris HDS).
- Rétention : 30 j max après expiration.
- Côté grand public : bouton "Révoquer tous mes partages" dans Profil > Données.

**Data** : `POST /api/patients/:id/shares` → `{ id, url, qr_url, expires_at }`. `GET` liste. `DELETE /:share_id` révoque immédiatement.

---

## 8 — Comportements et états

### 8.1 Navigation

Tab bar (4 onglets) toujours visible sauf sur :
- onboarding (pas de tab bar tant que pas onboardé)
- capture (`/capture`) plein écran
- loading (`/capture/analyzing`) plein écran

Au tap d'un tab : navigation racine de l'onglet (pas de back stack inter-tab).

### 8.2 Loading & erreurs

- **Skeleton** : pour Today / Weekly / Monthly, afficher 3-4 cartes vides à `bg-surface` + line, fade-in à la réception. Évitez les spinners.
- **Erreur** : carte rouge dashed border `var(--alert)` + bouton "Réessayer". Pas de modale globale agressive.
- **Empty state** (premier jour, aucune analyse) : message + CTA caméra accent, identique au CTA standard.

### 8.3 Animations

| Élément              | Durée | Easing            |
| -------------------- | ----- | ----------------- |
| Tab switch           | 200ms | ease-out          |
| Fade-in carte        | 300ms | ease              |
| Sparkline draw       | 400ms | ease-out          |
| Halo `paPulse` (loading) | 1600ms | ease-out infinite |
| Scan line `paScan`   | 2400ms | ease-in-out infinite |
| Progress dot fill    | 250ms | ease-out          |

Tout doit respecter `prefers-reduced-motion`.

### 8.4 Hit targets

Minimum **44 × 44** sur tous les boutons et rows interactives. Les inputs portion dans Result : prévoir tap+keyboard ; alternative drag horizontal pour rapide (suggéré, pas dans le proto).

### 8.5 Persistance

- Onboarding : chaque étape persiste à la transition.
- Tweaks (densité, accent) : `localStorage`, restauré au mount.
- Date courante sur Today : pas de persistance (reset chaque entrée).

---

## 9 — Endpoints à créer côté FastAPI

Déjà identifiés dans le brief §9, je rappelle ce que le design consomme :

| Méthode | Path                                    | Usage écran                     |
| ------- | --------------------------------------- | ------------------------------- |
| `GET`   | `/api/stats/today`                      | Aujourd'hui                     |
| `GET`   | `/api/stats/week?start=YYYY-MM-DD`      | Récap semaine                   |
| `GET`   | `/api/stats/month?year=YYYY&month=MM`   | Récap mois                      |
| `GET`   | `/api/stats/month/export.pdf?…`         | Bouton PDF du Récap mois        |
| `GET`   | `/api/users/me/profile`                 | Profil + Onboarding (lecture)   |
| `PATCH` | `/api/users/me/profile`                 | Édition profil / onboarding     |
| `GET`   | `/api/patients`                          | Liste patients (mode pro)               |
| `GET`   | `/api/patients/:id`                      | Identité + contexte clinique            |
| `PATCH` | `/api/patients/:id`                      | Édition biomarqueurs / traitements      |
| `GET`   | `/api/patients/:id/stats/today`          | Score 30j + sparkline                   |
| `GET`   | `/api/patients/:id/signals`              | Signaux cliniques (seuils dépassés)     |
| `GET`   | `/api/patients/:id/objectives`           | Objectifs prescrits actifs              |
| `POST`  | `/api/patients/:id/objectives`           | Ajouter / réviser objectif              |
| `GET`   | `/api/patients/:id/compare`              | Comparaison 2 périodes + synthèse IA    |
| `GET`   | `/api/patients/:id/notes`                | Timeline notes cliniques                |
| `POST`  | `/api/patients/:id/notes`                | Créer note                              |
| `GET`   | `/api/patients/:id/report/preview`       | Prévisualisation PDF (PNG pages)        |
| `POST`  | `/api/patients/:id/report`               | Générer CR PDF définitif                |
| `GET`   | `/api/patients/:id/shares`               | Liste partages actifs + historique      |
| `POST`  | `/api/patients/:id/shares`               | Générer lien chiffré + QR               |
| `DELETE`| `/api/patients/:id/shares/:share_id`     | Révoquer partage                        |

Endpoints **existants** réutilisés sans modif : `POST /api/analyses`, `GET /api/analyses?limit&offset`, `GET /api/analyses/:id`, `PATCH /api/analyses/:id`.

---

## 10 — État global / data shapes

Le brief §3 décrit déjà les shapes JSON. À ajouter pour les stats agrégées :

```ts
type TodayStats = {
  date: string;            // ISO
  score_global: number;    // 0-100 composite
  scores: { nova: number; hansel: number; equilibre: number };  // sub-scores
  kcal: { value: number; target: number };
  macros: { p: number; g: number; l: number;
            p_target: number; g_target: number; l_target: number };
  indicateurs: { [key: 'sel'|'ags'|'sucres'|'fibres'|'cholesterol'|'sodium']: {
    value: number; target: number; unit: string;
    status: 'ok' | 'warn' | 'alert' | 'insuffisant';
    pct: number;
  }};
  omega: { ratio: number; ala: number; epa_dha: number; al: number;
           status: 'excellent'|'bon'|'attention'|'desequilibre' };
  meals: Array<{ id: string; time: string; name: string; kcal: number;
                 nova_score: number; hansel_score: number; thumb_url: string }>;
  alerts: Array<{ status: 'ok'|'warn'|'alert'|'muted'; title: string; sub: string }>;
};

type WeekStats = {
  week: string;            // ISO week
  start: string; end: string;
  score_avg: number;
  score_delta_vs_prev: number;
  daily: Array<{ date: string; score: number; kcal: number }>;
  macros_avg: { p_pct: number; g_pct: number; l_pct: number;
                p_g: number; g_g: number; l_g: number; kcal_avg: number };
  trends: { [key: 'sel'|'ags'|'fibres'|'nova'|'omega'|'sucres']:
            { value: number; unit: string; trend_label: string;
              status: string; data: number[] }};
  top_aliments: Array<{ name: string; count: number; meta: string; nova_score: number }>;
  standout: { best: …; worst: … };
  sci_alerts: Array<{ tone: 'ok'|'warn'|'alert'; icon: string; title: string; sub: string }>;
};

type MonthStats = {
  month: string;  // YYYY-MM
  score: number;
  delta_vs_prev: number;
  spark: number[];   // 12+ pts
  sub_scores: { nova: number; hansel: number; oms: { ok: number; total: number }};
  heatmap: Array<{ day: number; score: number }>;
  trends: { kcal: …; sel: …; omega: …; fibres: … };
  objectifs: Array<{ label: string; ok: boolean; meta: string }>;
  recommendations: Array<{ tone: string; title: string; sub: string }>;
};
```

---

## 11 — Stratégie d'intégration recommandée

**Phase 1 — Système** (2-3 j) :
1. Importer `styles.css` (ou recopier les tokens) dans la PWA.
2. Importer les fonts Google.
3. Créer les primitives en vanilla JS (Ring, Spark, Bar, Pill, Stat, Nova) comme petits modules. Tests visuels avec un Storybook léger (ou page `/_dev/components`).
4. Mettre en place la grille de routing + la tab bar.

**Phase 2 — Écrans existants refondus** (3-5 j) :
1. Auth flow conservé, mais habillé selon les tokens.
2. Refonte `Result` (écran déjà en prod, mais avec le nouveau scoring viz).
3. Refonte `History`.

**Phase 3 — Nouveaux écrans** (5-8 j) :
1. Onboarding 4 étapes (avec PATCH profile à chaque transition).
2. Today (endpoint `/stats/today` à créer en parallèle).
3. Weekly + Monthly (endpoints à créer).
4. Profile refondu.
5. Capture + Loading.

**Phase 4 — Mode pro** (3-5 j) :
1. Endpoints patients.
2. Variante profile.
3. Listes patients + alertes longitudinales.

**Tests à prévoir** :
- Performance des sparklines à grande échelle (heatmap 30j sur mobile bas de gamme).
- Cache offline des derniers écrans Today / History (cf. brief §9 "fonctionne offline sur écrans historiques").
- Tabular numerals correctement appliqués sur tous les nombres.

---

## 12 — Limites du prototype à compléter en dev

Choses que le proto n'a **pas** :
- Édition d'aliment (changer le match CIQUAL) → bottom sheet à designer si besoin.
- Modale d'ajout manuel d'aliment.
- Notifications push réelles.
- Détail patient complet en mode pro (la liste y est, le détail patient = une réutilisation de Today + Stats avec un sélecteur de patient en haut).
- Export PDF mensuel (le bouton est là, le contenu PDF reste à designer).
- États d'erreur réseau précis.

---

## 13 — Contact & ouverture du proto

Le prototype s'ouvre directement avec un serveur statique :
```bash
cd prototype/
python -m http.server 8000
# puis ouvrez http://localhost:8000/Plate%20Analyzer.html
```

Ou via n'importe quel `npx serve`, Live Server VSCode, etc.

Toutes les questions design → garder le prototype ouvert comme source de vérité visuelle, ce README comme spec d'implémentation.
