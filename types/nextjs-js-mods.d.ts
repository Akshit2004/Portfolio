// Helper declarations for Next.js generated JS imports from the `app` directory
// This prevents "Cannot find module '../../app/page.js'" TypeScript errors
declare module "*app/*.js" {
  const mod: any
  export = mod
}

// Explicit common import patterns used in Next.js generated type checks
declare module "*app/page.js" {
  const mod: any
  export = mod
}

declare module "*app/layout.js" {
  const mod: any
  export = mod
}

// Relative paths that may appear in generated validator files
declare module "../../app/page.js" {
  const mod: any
  export = mod
}

declare module "../../app/layout.js" {
  const mod: any
  export = mod
}
