export function slugify(input: string): string {
  const withoutAccents = input
    .normalize("NFD")
    .split("")
    .filter((ch) => {
      const code = ch.charCodeAt(0);
      return !(code >= 0x0300 && code <= 0x036f); // combining diacritical marks
    })
    .join("");

  return withoutAccents.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
