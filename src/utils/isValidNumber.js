export default function isValidNumber(value) {
  return value !== undefined && !isNaN(value) && String(value).trim() !== "";
}