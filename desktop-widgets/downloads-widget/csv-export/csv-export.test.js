const CsvExport = require('./csv-export')

const mockData = require('./mockData')

test('converts data to expected JSON format', () => {
  const expectedObjectsArray = [
    {
      termDE: 'Rauchschutz-Druckanlage',
      termFR: 'système de mise en surpression',
    },
    {
      termDE: 'RDA',
      termFR: 'SMS',
    },
    {
      termDE: 'Raumabschluss',
      termFR: 'étanchéité au feu',
    },
    {
      termDE: 'Sauerstoff-Reduzierungsanlage',
      termFR: 'système d’appauvrissement en oxygène',
    },
    {
      termDE: 'Sauerstoffreduzierungsanlage',
      termFR: 'système d’appauvrissement en oxygène',
    },
    {
      termDE: 'Sauerstoffreduktionsanlage',
      termFR: 'système d’appauvrissement en oxygène',
    },
  ]
  expect(CsvExport(mockData)).toStrictEqual(expectedObjectsArray)
})
