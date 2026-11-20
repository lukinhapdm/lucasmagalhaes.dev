/** Junta classes CSS ignorando valores falsos (alternativa leve ao clsx). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
