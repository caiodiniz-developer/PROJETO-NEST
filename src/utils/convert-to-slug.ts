export function convertToSlug(text: string): string {
  return text
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[̀-ͯ]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/_/g, '-')
    .replace(/--+/g, '-')
    .replace(/-$/g, '')
}
