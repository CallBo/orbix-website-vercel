// Fondateurs d'Orbix Labs — source unique pour la page À propos et la
// section de l'accueil. Ordre d'affichage = ordre du tableau (le PDG en
// premier).
//
// Photos : déposer un portrait (format vertical, idéalement 1200 × 1500)
// dans public/equipe/ et renseigner `photo`. Sans photo, un monogramme
// (initiales) s'affiche à la place.

export interface Founder {
  name: string
  role: string
  initials: string
  photo?: string
}

export const founders: Founder[] = [
  {
    name: 'Manoel Elegbede',
    role: 'Cofondateur · Président-directeur général',
    initials: 'ME',
  },
  {
    name: 'Prophetie Zantchedji',
    role: 'Membre fondateur',
    initials: 'PZ',
  },
  {
    name: 'Samuel Tite N’sou Zinsoudje',
    role: 'Membre fondateur',
    initials: 'SZ',
  },
]
