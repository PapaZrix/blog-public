export function validPost(title, thumbnail) {
  if (title.length === 0 || thumbnail.length === 0) return false;
  return true;
}
