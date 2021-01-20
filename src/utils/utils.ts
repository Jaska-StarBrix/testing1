export const capitalize = (str: string, preserve = false): string => {
  if (!preserve) {
    str = str.toLowerCase()
  }
  return str.charAt(0).toUpperCase() + str.substring(1)
}

export const capitalizeWords = (str: string, preserve = false): string => {
  if (!preserve) {
    str = str.toLowerCase()
  }
  return str.replace(
    /(?!^[0-9])(^|[^a-zA-Z\u00C0-\u017F\u0400-\u04FF'])([a-zA-Z\u00C0-\u017F\u0400-\u04FF])/g,
    function (m) {
      return m.toUpperCase()
    }
  )
}
