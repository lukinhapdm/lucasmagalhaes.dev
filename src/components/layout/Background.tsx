/** Fundo fixo: grid sutil com fade radial + brilho em gradiente no topo. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0" />
      <div
        className="absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background: 'linear-gradient(100deg, var(--accent-from), var(--accent-to))',
          opacity: 'calc(var(--glow-opacity) * 0.45)',
        }}
      />
    </div>
  )
}
