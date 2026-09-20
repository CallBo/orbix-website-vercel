import Image from 'next/image'

// Marque extraite depuis le logo officiel, recolorée en argenté/gris
// métallisé (demande explicite : logo en rendu métallique, le reste du
// site garde ses couleurs violettes) — la luminosité d'origine (donc tous
// les reflets et ombres du rendu 3D) est conservée, seule la teinte a
// changé. Fichier source : public/logo-mark.png.
export function OrbixLogo({ className }: { className?: string }) {
  return <Image src="/logo-mark.png" alt="Orbix Labs" width={131} height={100} priority className={className} />
}
