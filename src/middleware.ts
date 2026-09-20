import { NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Routes publiques : marketing, auth, mentions légales, API contact.
// Tout le reste (dashboard, admin) exige une session Clerk.
const isPublicRoute = createRouteMatcher([
  '/',
  '/services(.*)',
  '/pricing(.*)',
  '/about(.*)',
  '/contact(.*)',
  '/blog(.*)',
  '/legal(.*)',
  '/auth/login(.*)',
  '/auth/register(.*)',
  '/auth/forgot(.*)',
  '/api/contact',
])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

// Le rôle vit "pour de vrai" dans la table User côté orbix-api, mais
// exiger un appel API à chaque requête de middleware serait lent et
// ajouterait une dépendance réseau critique au chargement de chaque page
// admin. À la place : le rôle est répliqué dans les métadonnées publiques
// Clerk (publicMetadata.role), incluses directement dans le token de
// session — donc lisible ici sans aucun appel réseau.
//
// ⚠️ CONFIGURATION MANUELLE REQUISE (une seule fois, dans le Dashboard Clerk) :
//   Sessions → Customize session token → ajouter :
//   { "metadata": "{{user.public_metadata}}" }
// Puis, pour chaque admin : Users → sélectionner l'utilisateur →
// Public metadata → { "role": "admin" }
// Sans cette configuration, TOUT accès à /admin sera refusé par défaut
// (fail-safe : mieux vaut bloquer un vrai admin par erreur que laisser
// passer un client).
const ADMIN_ROLES = new Set(['admin', 'super_admin'])

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return

  // Clerk 6.x : auth() est maintenant async (suit l'exigence Next.js pour
  // headers()/cookies()), et .protect() vit directement sur `auth`, plus
  // sur la valeur retournée — auth().protect() (5.x) devient
  // await auth.protect() (6.x). Vérifié contre la doc officielle Clerk
  // avant de toucher à cette logique de contrôle d'accès admin.
  const { userId, sessionClaims, redirectToSignIn } = await auth()

  if (!userId) {
    return redirectToSignIn()
  }

  if (isAdminRoute(req)) {
    const role = (sessionClaims?.metadata as { role?: string } | undefined)?.role
    if (!role || !ADMIN_ROLES.has(role)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return
  }

  await auth.protect()
})

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/', '/(api|trpc)(.*)'],
}
