// Réalisations Orbix Labs — source unique pour /realisations,
// /realisations/[slug] et la mise en avant de la page d'accueil.
// Pour ajouter un projet : ajouter une entrée ici + ses visuels dans
// public/realisations/<slug>/.
//
// Contenu repris du kit portfolio du projet (README) ; chiffres et statut
// à garder strictement fidèles à ce que le client a validé.

export interface Realisation {
  slug: string
  title: string
  client: string
  place: string
  sector: string
  year: string
  tagline: string
  summary: string
  status: { label: string; text: string; remaining?: string }
  cover: string
  thumbnail: string
  // Couleur de fond des visuels produit du projet : reprise pour les
  // sections qui les entourent, pour que l'image se fonde dans la page.
  tint: string
  hero: { src: string; width: number; height: number; alt: string }
  video?: { src: string; poster: string }
  problem: { intro: string; stats: { value: string; label: string }[]; text: string }
  steps: { title: string; text: string }[]
  gallery: { src: string; width: number; height: number; caption: string }[]
  // Une phrase sur la sécurité, volontairement sans détail des contrôles :
  // le site est public, inutile d'expliquer à de potentiels fraudeurs
  // comment fonctionnent les parades d'un système de l'État.
  security: { title: string; text: string }
  stack: string[]
  figures: { value: string; label: string }[]
  disclaimer: string
}

const base = '/realisations/vaccination-voyageurs'

export const realisations: Realisation[] = [
  {
    slug: 'vaccination-voyageurs',
    title: 'Vaccination des voyageurs',
    client: 'Direction départementale de la Santé du Littoral',
    place: 'Cotonou, Bénin',
    sector: 'Santé publique',
    year: '2026',
    tagline: 'Du lot de vaccins au carnet signé. Vérifiable partout.',
    summary:
      'Une application web qui remplace le registre papier du centre de vaccination internationale : chaque dose est suivie du lot reçu jusqu’au carnet signé, chaque franc encaissé a son reçu, et chaque carnet peut être vérifié partout dans le monde par un simple QR code.',
    status: {
      label: 'Prototype prêt pour un pilote',
      text: 'Prototype complet et testé, prêt pour un pilote de deux à trois mois dans un centre de Cotonou.',
      remaining:
        'Restent à brancher les services qui dépendent de partenaires : paiement mobile (MTN MoMo, Moov Money, Celtiis Cash via FedaPay), serveur de courriel et passerelle SMS, hébergement au datacenter national.',
    },
    cover: `${base}/couverture.webp`,
    tint: '#eef3ef',
    thumbnail: `${base}/vignette.webp`,
    hero: {
      src: `${base}/espace-voyageur-ordinateur-et-mobile.webp`,
      width: 1800,
      height: 1080,
      alt: 'Espace voyageur de la plateforme, sur ordinateur et sur téléphone',
    },
    video: { src: `${base}/teaser.mp4`, poster: `${base}/teaser-poster.jpg` },
    problem: {
      intro:
        'Le centre de vaccination internationale de Cotonou tenait un registre papier. Pour préparer le projet, le registre de juillet à septembre 2026 a été entièrement recopié dans Excel.',
      stats: [
        { value: '1 365', label: 'voyageurs inscrits à la main en dix semaines' },
        { value: '84', label: 'pages de registre papier' },
        { value: '567', label: 'cases illisibles, incomplètes ou à vérifier' },
      ],
      text: 'Sans numéro de carnet ni de lot, impossible de vérifier un carnet à la frontière, de savoir où sont passées les doses ou de rapprocher la caisse des vaccinations. Chaque rapport demandait un dépouillement manuel.',
    },
    steps: [
      { title: 'Accueil', text: 'Le voyageur est retrouvé par son téléphone ou son passeport, sinon inscrit avec sa photo.' },
      { title: 'Santé et destination', text: 'Les vaccins exigés par le pays s’affichent ; grossesse, allergie ou fièvre imposent l’avis écrit d’un médecin.' },
      { title: 'Vaccin et lot', text: 'La plateforme propose le lot qui périme le plus tôt ; un vaccin de pharmacie exige la photo du reçu et du flacon.' },
      { title: 'Paiement', text: 'Le reçu est numéroté par la plateforme et imprimé avec un QR code.' },
      { title: 'Carnet', text: 'Un seul carnet par voyageur, mis à jour à chaque visite, avec un code de contrôle secret.' },
      { title: 'Signature', text: 'Le Médecin Coordonnateur de zone signe les carnets ; sa signature s’imprime sur le certificat.' },
      { title: 'Remise', text: 'L’agent vérifie la pièce d’identité avant de remettre le carnet.' },
    ],
    gallery: [
      { src: `${base}/tableau-de-bord.webp`, width: 1800, height: 1263, caption: 'Tableau de bord du directeur : doses, caisse et alertes en temps réel' },
      { src: `${base}/certificat-et-recu.webp`, width: 1800, height: 1260, caption: 'Certificat international et reçu, vérifiables par QR code' },
    ],
    security: {
      title: 'Chaque dose, chaque franc, chaque carnet. Traçables.',
      text: 'La plateforme a été conçue pour rendre les détournements difficiles à cacher : toute modification est enregistrée et détectée.',
    },
    stack: ['NestJS', 'TypeScript', 'PostgreSQL', 'TypeORM', 'JWT', 'Ed25519', 'HMAC-SHA256', 'TOTP', 'Jest', 'Playwright'],
    figures: [
      { value: '6', label: 'profils utilisateurs, chacun avec ses droits' },
      { value: '73', label: 'tests automatisés' },
      { value: '98', label: 'scénarios de recette' },
      { value: '4 431', label: 'lignes du registre historique reprises' },
    ],
    disclaimer: 'Captures réalisées sur une base de démonstration : données fictives, noms masqués.',
  },
]

export function getRealisation(slug: string) {
  return realisations.find((r) => r.slug === slug)
}
