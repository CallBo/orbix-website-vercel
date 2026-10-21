// Marque Orbix Labs : anneau orbital + satellite, dessinée en SVG inline
// (plutôt qu'un PNG exporté) pour rester parfaitement nette à toute taille
// et sur tous les écrans, et pour pouvoir changer de teinte selon le fond.
// Entièrement monochrome : pas de bleu — un dégradé anthracite/acier sur
// fond clair, un dégradé blanc/argent sur les bandes sombres.
//
// `variant="mono"` donne la version claire (blanc/argenté), à utiliser sur
// les sections sombres (Hero, bandeau CTA final, footer si jamais il
// repasse en sombre). Par défaut, la version anthracite/acier pour le
// reste du site, désormais clair.
export function OrbixLogo({
  className,
  variant = 'default',
}: {
  className?: string
  variant?: 'default' | 'mono'
}) {
  const ringId = variant === 'mono' ? 'orbix-ring-mono' : 'orbix-ring-ink'
  const sphereId = variant === 'mono' ? 'orbix-sphere-mono' : 'orbix-sphere-ink'

  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Orbix Labs">
      <defs>
        <linearGradient id={ringId} x1="6" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse">
          {variant === 'mono' ? (
            <>
              <stop offset="0%" stopColor="#f5f5f7" />
              <stop offset="100%" stopColor="#8e8e93" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#4f5257" />
              <stop offset="100%" stopColor="#0b0b0c" />
            </>
          )}
        </linearGradient>
        <radialGradient id={sphereId} cx="35%" cy="30%" r="75%">
          {variant === 'mono' ? (
            <>
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#c7c7cc" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#9a9da3" />
              <stop offset="100%" stopColor="#1d1d1f" />
            </>
          )}
        </radialGradient>
      </defs>

      {/* Anneau orbital */}
      <circle cx="21" cy="25" r="13.5" fill="none" stroke={`url(#${ringId})`} strokeWidth="4" />

      {/* Trajectoire du satellite, passant devant l'anneau */}
      <line
        x1="7"
        y1="33"
        x2="38"
        y2="12"
        stroke={`url(#${ringId})`}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Satellite */}
      <circle cx="38.5" cy="11.5" r="5.5" fill={`url(#${sphereId})`} />
    </svg>
  )
}
