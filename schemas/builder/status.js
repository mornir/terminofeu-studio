const generateStatus = (type = 'begriff') => {
  const mainTitle = 'Haupt' + type
  return [
    { title: mainTitle, value: 'main' },
    { title: 'Alternativ', value: 'variant' },
    { title: 'Abgelehnt', value: 'rejected' },
  ]
}

export { generateStatus }
