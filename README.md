# orbix-website

Site public + auth + dashboard client + dashboard admin d'Orbix Labs
(`orbixlabs.tech`), conforme à `ORBIX_SPECS_GENERALES.md` et
`ORBIX_LABS_DESIGN_SYSTEM.md`. Thème sombre (violet/noir) — un passage
temporaire à un thème clair a été testé puis annulé, revenu à l'original.

## Installation

```bash
npm install
cp .env.example .env.local
# renseigner les clés Clerk + NEXT_PUBLIC_API_URL dans .env.local
npm run dev
```

**Config Clerk requise pour `/admin`** : le rôle admin est lu depuis
`sessionClaims.metadata.role`, pas depuis un appel réseau à chaque page.
Ça suppose une configuration manuelle unique côté Dashboard Clerk — voir
les commentaires dans `src/middleware.ts` pour les deux étapes exactes
(custom session claim + `publicMetadata.role` sur ton compte). Sans cette
config, même un vrai admin sera bloqué (fail-safe voulu, pas un bug).

## Migration Clerk 5.x → 6.x

Trouvaille de l'associé Academy : `@clerk/nextjs` 5.x est une ligne gelée
(jamais repatchée pour l'exigence async `headers()`/`cookies()` de
Next.js 15). Pas de bug actif ici (`orbix-website` est sur Next.js 14, où
ces fonctions restent synchrones), mais migré quand même par précaution —
low risk confirmé (reste "Core 2", même API `<SignedIn>`/`<SignedOut>`/
`<UserButton>`, pas de réécriture de composants).

Changements : `auth()` est maintenant async partout (middleware compris),
et `.protect()` est passé de `auth().protect()` à `await auth.protect()`
(propriété directe sur `auth`, plus sur sa valeur retournée). Trois
endroits corrigés : `middleware.ts` (logique de contrôle de rôle admin —
revérifiée avec soin, c'est la partie sensible), et deux routes API qui
lisaient le token Clerk (`lib/api.ts`, upload vidéo, PDF facture).

**Note de build** : Clerk 6.x valide maintenant le format de la clé
publique même en mode test — une fausse clé de test doit respecter la
structure `pk_test_<base64(domaine).clerk.accounts.dev$)>`, sinon le build
échoue au pré-rendu (nouveau comportement, absent en 5.x).

## Migration Next.js 14 → 15.5.25

Suite à la vulnérabilité critique trouvée en vérifiant après la migration
Clerk (`next@14.2.35`, déjà le dernier patch 14.x, restait vulnérable à
plusieurs failles dont une RCE non authentifiée). Décision prise avec
Samuel : 15.x plutôt que sauter à 16 (trop de saut, pas nécessaire).
`15.5.25` spécifiquement — un tag `backport` npm plus à jour que le tag
`next-15-3` (`15.3.9`) apparent au premier coup d'œil, qui contient des
correctifs de sécurité supplémentaires (l'audit confirme : la faille
critique `next` a disparu avec cette version précise, contrairement à
`15.3.9` qui restait exposé au même `next@16.3.5` comme seul correctif
proposé).

Vérifié avant de basculer : pas de Server Actions, pas de `rewrites()`,
pas de WebSocket côté nous — plusieurs des CVE listées par `npm audit` ne
concernaient donc pas notre usage réel. Le `cache: 'no-store'` déjà
explicite dans `lib/api.ts` nous protégeait déjà du changement de
comportement de cache par défaut des Route Handlers en v15.

**Changement de code réel** : `params` devient une `Promise` dans toutes
les routes dynamiques (pages et Route Handlers). 15 fichiers concernés,
tous mis à jour et revérifiés (`tsc`/`lint`/`build`) — même changement
partout (`{ params }: { params: Promise<{ id: string }> }` +
`await params`), aucun changement de comportement visible pour
l'utilisateur final, uniquement la façon dont le code récupère l'ID dans
l'URL.

**Reste, hors de mon contrôle** : `npm audit` signale encore `postcss`
(high) — mais c'est une dépendance interne à l'outillage de build de
Next.js lui-même (`node_modules/next/node_modules/postcss`), présente sur
toute la plage de versions Next.js testée par l'avisory, 9.x à 16.x
compris. Pas un risque d'exécution en production, juste un outil de build
— rien à corriger côté nous.

**À faire côté toi avant le déploiement Azure** : héberger sur App Service
**Linux**, pas Windows — élimine une classe de faille RCE entièrement,
sans rapport avec le code.

## Vérifications effectuées avant chaque livraison

`npx tsc --noEmit`, `npx next lint`, `npx next build` — toujours vérifiés
avant de livrer un zip. Note technique : `fonts.googleapis.com` n'est pas
joignable depuis mon environnement de build (sandbox réseau restreint),
donc le build de vérification est fait avec les polices temporairement
neutralisées puis restaurées — le code (`next/font/google`) est l'usage
standard documenté par Next.js, à confirmer avec un `npm run build` chez
toi qui a un accès réseau normal.

## Pages et fonctionnalités

**Public** : Accueil (Hero avec vraie vidéo en fond, overlay violet
automatique via `.duotone-violet`), Services, Tarifs, À propos, Contact
(formulaire relié à l'API), Blog (`/blog`, `/blog/[slug]`), Mentions
légales. Auth Clerk complète (`/auth/login`, `/auth/register`, `/auth/forgot`).

**Dashboard client** (`/dashboard/*`) — branché sur les vrais endpoints
`orbix-api` (plus de données factices) :
- Vue d'ensemble, Mes projets (filtrable par statut)
- Mes factures : téléchargement PDF + paiement en ligne (Stripe carte
  bancaire, FedaPay Mobile Money)
- Messages : fil de discussion par projet, polling léger (8s), pas de
  WebSocket pour l'instant (voir README `orbix-api`)
- Orbix AI : interface de chat complète (Claude API côté serveur)
- Fichiers, Paramètres : encore "Bientôt disponible" — bloqués par
  Azure Blob Storage / pas de besoin identifié pour Paramètres

**Dashboard admin** (`/admin/*`) — également branché sur les vrais
endpoints : Vue d'ensemble (KPIs + graphique revenus calculés depuis les
factures réelles), Clients, Projets, Factures (PDF + statut), Blog
(éditeur complet : créer/modifier/publier).

**Toutes les pages avec données dynamiques** échouent proprement (état
vide ou bandeau d'avertissement) si `orbix-api` n'est pas joignable —
jamais de plantage. Normal tant que la base Azure n'existe pas.

## Paiements — interface prête, connexion finale à faire

Les boutons "Payer par carte" / "Mobile Money" sur `/dashboard/invoices`
appellent déjà `orbix-api` (`POST /v1/payments/stripe/checkout/:id` et
`/v1/payments/fedapay/checkout/:id`) via des routes proxy locales
(`/api/invoices/[id]/checkout/*`) qui attachent le token Clerk côté
serveur, et redirigent vers la page de paiement hébergée. Ce qu'il reste
à faire, côté toi, avant que ça fonctionne pour de vrai :
1. Créer un compte Stripe (et FedaPay) et récupérer les clés
2. Les renseigner dans `.env` d'`orbix-api` (`STRIPE_SECRET_KEY`,
   `FEDAPAY_SECRET_KEY`, voir son `.env.example`)
3. Configurer les webhooks Stripe/FedaPay pour pointer vers
   `orbix-api` une fois déployé (`/v1/webhooks/stripe`, `/v1/webhooks/fedapay`)

Aucun code à changer de mon côté pour ça — le circuit est complet.

## PWA

Manifest natif (`src/app/manifest.ts`), icônes, service worker minimal
(`public/sw.js`) qui ne met en cache QUE les assets statiques publics —
jamais les pages `/dashboard/*`/`/admin/*` ni les réponses API, pour
éviter de servir du contenu périmé ou propre à un autre utilisateur sur
un poste partagé. Actif en production uniquement.

## Bugs réels trouvés et corrigés en route

- **`middleware.ts` au mauvais endroit** : était à la racine du projet ;
  Next.js exige qu'il soit dans `src/` dès que le projet utilise
  `src/app/`. Sans ça, Clerk ne détectait aucun middleware actif et
  `auth()`/`currentUser()` plantaient partout.
- **Conflit CSS `.duotone-violet`** : une règle `position: relative`
  perso entrait en conflit avec la classe Tailwind `absolute` sur le même
  élément (même spécificité, la dernière déclarée dans le CSS compilé
  gagnait) — la vidéo du Hero ne couvrait plus toute la section.
- **`Button` en mode `asChild`** : Radix Slot plantait au rendu statique
  quand un enfant conditionnel (spinner de chargement) s'ajoutait à côté
  du children — séparé en deux chemins de rendu distincts.
- **`UsersService`** prétendait créer le profil utilisateur au premier
  appel mais levait une erreur à la place.

## Academy — interface d'administration du contenu

`/admin/academy` — le point manquant signalé par ton associé : sans ça,
le catalogue Academy restait vide indéfiniment (les endpoints existaient
côté API, mais aucune interface pour créer un cours/module/leçon).

- Liste des cours, brouillon/publié
- Création d'un cours (titre, slug, description, catégorie, niveau, tarif)
- Détail d'un cours : ajouter des modules, ajouter des leçons (vidéo/quiz/
  projet), publier/dépublier
- **Upload direct** (changé après coup — plus de Cloudflare Stream) : créer
  la leçon d'abord, puis cliquer l'icône crayon pour uploader le fichier
  vidéo (MP4/WebM/MOV) directement — il part vers Azure Blob Storage via
  `orbix-api`. Remplacer une vidéo existante supprime automatiquement
  l'ancienne côté stockage (best-effort, n'échoue pas l'upload si le
  nettoyage rate).

  ⚠️ **Limite connue à surveiller en production** : le relais passe par une
  Route Handler Next.js (`/api/admin/academy/lessons/[lessonId]/video`),
  qui sur Vercel a une limite de taille de requête (~4.5 Mo au moment de
  l'écriture). Suffisant pour tester en local, mais une vraie vidéo de
  cours la dépassera une fois déployé. Solution à terme, pas encore
  implémentée : upload direct navigateur → Azure via SAS token généré par
  l'API, sans transiter par ce relais.

Toujours pas de GET dédié pour un cours par ID côté API — la page détail
filtre `GET /v1/academy/courses/admin/all` côté serveur, comme pour le
Blog. À revoir si le catalogue devient volumineux.

## Notifications

Cloche dans la sidebar (desktop) et la barre mobile du dashboard client —
s'appuie sur `GET /v1/notifications/me` (messages non lus), polling 20s.
Cliquer une notification la marque lue et renvoie vers `/dashboard/messages`.
Pas ajoutée côté admin : l'endpoint est scopé aux messages d'un client sur
ses propres projets, donc toujours vide pour un compte staff en l'état
actuel — pas de bandeau utile à afficher pour l'instant.

## État du projet

Je ne vois plus de trou fonctionnel évident qui ne dépende pas d'Azure
(Fichiers) ou de Resend (emails transactionnels). Tout le reste — auth,
pages publiques, dashboard client et admin (avec formulaires de création
projets/factures), blog avec éditeur, messagerie, Orbix AI, paiements
Stripe + FedaPay, PDF, PWA, notifications — est écrit et vérifié
(`tsc`/`lint`/`build`), et attend une vraie base de données pour tourner
en conditions réelles.

## Déploiement — GitHub Actions vers Azure App Service

`.github/workflows/azure-deploy.yml` : build + `tsc` + `next lint` à
chaque push sur `main`, déploiement seulement si tout est vert.

**Trois endroits différents pour les variables — à ne pas confondre :**

1. **Secrets GitHub** pour le build : `AZURE_WEBSITE_PUBLISH_PROFILE`
   (fichier téléchargé depuis App Service → Get publish profile) +
   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`,
   `NEXT_PUBLIC_API_URL` — ces trois derniers sont nécessaires **au
   build** (Next.js les intègre dans le code généré à ce moment-là, pas
   au démarrage du serveur), donc ils doivent être de vraies valeurs de
   production ici, pas les clés de test utilisées pour les vérifications
   locales de ce projet.
2. **Configuration de l'App Service** (portail Azure → Configuration →
   Application settings) : les mêmes variables qu'au point 1, **plus**
   celles qui ne servent qu'au runtime serveur (aucune pour l'instant côté
   site — tout ce qu'il utilise est soit public/build-time, soit relayé
   depuis `orbix-api`).
3. **`.env.local`** reste pour ton développement en local uniquement,
   jamais poussé sur GitHub (déjà dans `.gitignore`).

Si `app-name: orbix-website` dans le workflow ne correspond pas au nom
exact de ton App Service, corrige cette ligne avant de pousser.

## Upload vidéo d'intro du cours — incohérence corrigée

`/admin/academy/[id]` — la vidéo d'intro du formateur n'acceptait au
départ qu'une URL collée à la main, contrairement aux vidéos de leçon qui
s'uploadent directement. Corrigé : même mécanique d'upload direct
(Azure Blob Storage) sur la page de détail du cours, retirée du
formulaire de création (le cours doit exister avant de pouvoir uploader,
même limitation que les vidéos de leçon).

## Édition de projet (admin) — trou comblé

`/admin/projects/[id]` — manquait complètement : on pouvait créer un
projet mais jamais modifier son statut ou son avancement ensuite, alors
que c'est le cœur du suivi. Formulaire avec statut (menu déroulant),
avancement (curseur 0-100%), description. Les cartes projet côté
`/admin/projects` pointent maintenant vers cette page de détail au lieu
de renvoyer vers la liste elle-même.

## Logo en rendu métallique/argenté

Décision : le logo passe en argenté/gris métallique (voulu "ultra
épuré"), le reste du site (violet, fonds sombres, boutons) ne change pas
— option choisie après comparaison avec une planche de marque bleu/violet
envoyée en référence, écartée pour ne pas déstabiliser un système déjà
cohérent et vérifié sur 40+ pages.

Technique : les fichiers logo/icônes existants n'étaient pas de simples
SVG plats mais des images déjà rendues avec ombres et reflets 3D — plutôt
que de redessiner la forme (risque de ne pas matcher l'original), la
teinte violette a été remappée vers une rampe argent/acier
(anthracite → gris acier → blanc froid) en conservant la luminosité
d'origine, donc tout le relief déjà présent. Fichiers concernés :
`logo-mark.png`, `logo-mark-light.png`, `icon.png`, `apple-icon.png`,
`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`.

**Non touché, à faire si voulu plus tard** : `og-image.jpg` (aperçu de
partage réseaux sociaux) a le logo composé directement dans un fond
dégradé violet — recolorer juste le logo dedans demande de refaire la
composition, pas un simple filtre. N'affecte que les aperçus sur
réseaux sociaux, pas le site lui-même.

## Structure

## Structure

## Structure

## Structure

```
src/
  app/
    (marketing)/       → pages publiques (layout avec Navbar + Footer)
    (auth)/auth/        → login, register, forgot (Clerk)
    dashboard/          → espace client (vue d'ensemble, projets, factures, messages, ai...)
    admin/              → espace agence (vue d'ensemble, clients, projets, factures, blog)
    api/                → routes proxy (contact, blog admin, paiements, messages, ai-tutor, pdf)
    manifest.ts         → PWA
    layout.tsx           → layout racine (ClerkProvider, polices, dark mode)
  components/
    ui/                  → Button, Input, Textarea, Badge, Card
    layout/               → Navbar, Footer, Container, OrbixLogo
    marketing/            → sections de la page d'accueil
    dashboard/            → StatCard, ProjectProgressCard, MessageThread, AIChatInterface...
    admin/                 → AdminSidebar, RevenueBarChart
    forms/                  → ContactForm
  lib/                    → utils, constants, api.ts (client API central), clerk-appearance.ts
  middleware.ts             → protection de routes + contrôle de rôle admin
  types/                    → types partagés
```
