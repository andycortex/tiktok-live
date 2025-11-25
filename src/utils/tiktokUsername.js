/**
 * Extrae y limpia un username de TikTok desde cualquier formato
 * @param {string} input - URL completa, @username, username sucio, etc.
 * @returns {string|null} - Username limpio o null si es inválido
 */
export function extractTikTokUsername(input) {
  if (!input || typeof input !== "string") return null;

  let cleaned = input.trim();

  // Quitar @ inicial
  if (cleaned.startsWith("@")) cleaned = cleaned.slice(1);

  // Caso 1: URL completa tipo https://tiktok.com/@usuario
  const urlMatch = cleaned.match(/tiktok\.com\/@([^/?\s]+)/i);
  if (urlMatch) return urlMatch[1].toLowerCase();

  // Caso 2: URL sin @ pero con usuario (ej: tiktok.com/usuario123)
  const fallbackMatch = cleaned.match(/(?:tiktok\.com[^a-zA-Z0-9]*)([a-zA-Z0-9._]+)/i);
  if (fallbackMatch) return fallbackMatch[1].toLowerCase();

  // Caso 3: Ya es un username directo (con o sin @)
  const direct = cleaned.replace(/[^a-zA-Z0-9._]/g, "");
  if (direct && direct.length <= 50 && direct.length >= 1) {
    return direct.toLowerCase();
  }

  return null; // inválido
}