export function formatJSON(entries) {
  const formattedJSON = entries
    .flatMap((entry) => {
      let frDesignation = entry.content.fr?.terms?.[0]?.designation
      let frAbbreviation = entry.content.fr?.terms?.[0]?.abbreviation

      let deDesignation = entry.content.de?.terms?.[0]?.designation

      if (!deDesignation) {
        return null
      }

      if (!frDesignation) {
        return null
      }

      if (!frAbbreviation) {
        frAbbreviation = frDesignation
      }

      return entry.content.de.terms.flatMap((term) => {
        const abbreviation = term.abbreviation

        if (!abbreviation) {
          return { termDE: term.designation, termFR: frDesignation }
        }
        return [
          { termDE: term.designation, termFR: frDesignation },
          { termDE: term.abbreviation, termFR: frAbbreviation },
        ]
      })
    })
    .filter(Boolean)

  return formattedJSON
}
