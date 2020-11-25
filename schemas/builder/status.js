const generateStatus = (type = 'begriff') => {
  const mainTitle = 'Haupt' + type
  return [
    { title: mainTitle, value: mainTitle },
    { title: 'Alternativ', value: 'Alternativ' },
    { title: 'Abgelehnt', value: 'Abgelehnt' },
  ]
}

export { generateStatus }
