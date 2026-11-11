/**
 * Formats a property price consistently across the application.
 *
 * Handles:
 * - Raw numbers (e.g., 3250000 -> "$3,250,000")
 * - Numeric strings (e.g., "3250000" -> "$3,250,000")
 * - Pre-formatted strings with symbols and commas (e.g., "$3,250,000" -> "$3,250,000")
 * - Invalid/empty values (null, undefined, '', '   ', NaN, Infinity, negative values) -> fallback text
 *
 * @param {number|string|null|undefined} price - The price value to format.
 * @param {Object} [options] - Optional configuration options.
 * @param {string} [options.fallback='Price upon request'] - Fallback text when price is invalid or unavailable.
 * @param {string} [options.currency='$'] - Currency symbol prefix.
 * @param {boolean} [options.allowZero=false] - Whether 0 should be formatted or treated as unavailable.
 * @returns {string} The formatted price string or fallback text.
 */
export const formatPrice = (price, options = {}) => {
  const {
    fallback = 'Price upon request',
    currency = '$',
    allowZero = false,
  } = options

  if (price === null || price === undefined) {
    return fallback
  }

  // Handle numbers directly
  if (typeof price === 'number') {
    if (!Number.isFinite(price) || price < 0 || (price === 0 && !allowZero)) {
      return fallback
    }
    return `${currency}${price.toLocaleString()}`
  }

  // Handle strings (e.g., "$3,250,000", "3250000", "   ")
  if (typeof price === 'string') {
    const trimmed = price.trim()
    if (trimmed === '') {
      return fallback
    }

    // Strip existing currency symbol, commas, and whitespace
    const cleanString = trimmed.replace(/[$,\s]/g, '')
    const numericPrice = Number(cleanString)

    if (
      Number.isNaN(numericPrice) ||
      !Number.isFinite(numericPrice) ||
      numericPrice < 0 ||
      (numericPrice === 0 && !allowZero)
    ) {
      return fallback
    }

    return `${currency}${numericPrice.toLocaleString()}`
  }

  return fallback
}

export default formatPrice
