export default function slugifyurl(name) {
  return name
    .trim()
    .replace(/[^\w\s-]/g, '')         // remove special chars
    .replace(/\s+/g, '-')             // spaces to dashes
    .replace(/--+/g, '-')             // collapse dashes
}
