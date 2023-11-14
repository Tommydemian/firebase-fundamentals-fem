import snarkdown from 'snarkdown';

// Usamos un tipo genérico T para representar cualquier tipo de función
export function debounce<T extends (...args: any[]) => any>(
  func: T, 
  wait: number, 
  immediate: boolean
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function(this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout as NodeJS.Timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// snarkdownEnhanced ya está correctamente tipado
export function snarkdownEnhanced(markdown: string): string {
  return markdown
    .split(/(?:\r?\n){2,}/)
    .map((l) =>
      [" ", "\t", "#", "-", "*", ">"].some((char) => l.startsWith(char))
        ? snarkdown(l)
        : `<p>${snarkdown(l)}</p>`
    )
    .join("\n");
}
