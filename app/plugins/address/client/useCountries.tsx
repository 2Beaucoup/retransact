import { useMemo } from 'react'
import countryList from 'react-select-country-list'

export const useCountries = () => {
  const countriesTop = ['US', 'GB', 'FR', 'CA', 'AU']

  const countries = countryList().getData()

  const countriesSorted = useMemo(() => {
    return [
      ...countriesTop.map(code =>
        countries.find(country => country.value === code),
      ),
      ...countries.filter(country => !countriesTop.includes(country.value)),
    ]
  }, [countries])

  return { countries: countriesSorted ?? [] }
}

export const useUsStates = () => {
  const states = [
    {
      label: 'Alabama',
      code: 'AL',
      shortcut: 'Ala.',
    },
    {
      label: 'Alaska',
      code: 'AK',
      shortcut: 'Alaska',
    },
    {
      label: 'Arizona',
      code: 'AZ',
      shortcut: 'Ariz.',
    },
    {
      label: 'Arkansas',
      code: 'AR',
      shortcut: 'Ark.',
    },
    {
      label: 'California',
      code: 'CA',
      shortcut: 'Calif.',
    },
    {
      label: 'Colorado',
      code: 'CO',
      shortcut: 'Color.',
    },
    {
      label: 'Connecticut',
      code: 'CT',
      shortcut: 'Conn.',
    },
    {
      label: 'Delaware',
      code: 'DE',
      shortcut: 'Del.',
    },
    {
      label: 'Florida',
      code: 'FL',
      shortcut: 'Fla.',
    },
    {
      label: 'Georgia',
      code: 'GA',
      shortcut: 'Ga.',
    },
    {
      label: 'Hawaii',
      code: 'HI',
      shortcut: 'Hawaii',
    },
    {
      label: 'Idaho',
      code: 'ID',
      shortcut: 'Idaho',
    },
    {
      label: 'Illinois',
      code: 'IL',
      shortcut: 'Ill.',
    },
    {
      label: 'Indiana',
      code: 'IN',
      shortcut: 'Ind.',
    },
    {
      label: 'Iowa',
      code: 'IA',
      shortcut: 'Iowa',
    },
    {
      label: 'Kansas',
      code: 'KS',
      shortcut: 'Kan.',
    },
    {
      label: 'Kentucky',
      code: 'KY',
      shortcut: 'Ky.',
    },
    {
      label: 'Louisiana',
      code: 'LA',
      shortcut: 'La.',
    },
    {
      label: 'Maine',
      code: 'ME',
      shortcut: 'Maine',
    },
    {
      label: 'Maryland',
      code: 'MD',
      shortcut: 'Md.',
    },
    {
      label: 'Massachusetts',
      code: 'MA',
      shortcut: 'Mass.',
    },
    {
      label: 'Michigan',
      code: 'MI',
      shortcut: 'Mich.',
    },
    {
      label: 'Minnesota',
      code: 'MN',
      shortcut: 'Minn.',
    },
    {
      label: 'Mississippi',
      code: 'MS',
      shortcut: 'Miss.',
    },
    {
      label: 'Missouri',
      code: 'MO',
      shortcut: 'Mo.',
    },
    {
      label: 'Montana',
      code: 'MT',
      shortcut: 'Mont.',
    },
    {
      label: 'Nebraska',
      code: 'NE',
      shortcut: 'Neb.',
    },
    {
      label: 'Nevada',
      code: 'NV',
      shortcut: 'Nev.',
    },
    {
      label: 'New Hampshire',
      code: 'NH',
      shortcut: 'N.H.',
    },
    {
      label: 'New Jersey',
      code: 'NJ',
      shortcut: 'N.J.',
    },
    {
      label: 'New Mexico',
      code: 'NM',
      shortcut: 'N.M.',
    },
    {
      label: 'New York',
      code: 'NY',
      shortcut: 'N.Y.',
    },
    {
      label: 'North Carolina',
      code: 'NC',
      shortcut: 'N.C.',
    },
    {
      label: 'North Dakota',
      code: 'ND',
      shortcut: 'N.D.',
    },
    {
      label: 'Ohio',
      code: 'OH',
      shortcut: 'Ohio',
    },
    {
      label: 'Oklahoma',
      code: 'OK',
      shortcut: 'Okla.',
    },
    {
      label: 'Oregon',
      code: 'OR',
      shortcut: 'Ore.',
    },
    {
      label: 'Pennsylvania',
      code: 'PA',
      shortcut: 'Pa.',
    },
    {
      label: 'Rhode Island',
      code: 'RI',
      shortcut: 'R.I.',
    },
    {
      label: 'South Carolina',
      code: 'SC',
      shortcut: 'S.C.',
    },
    {
      label: 'South Dakota',
      code: 'SD',
      shortcut: 'S.Dak.',
    },
    {
      label: 'Tennessee',
      code: 'TN',
      shortcut: 'Tenn.',
    },
    {
      label: 'Texas',
      code: 'TX',
      shortcut: 'Tex.',
    },
    {
      label: 'Utah',
      code: 'UT',
      shortcut: 'Utah',
    },
    {
      label: 'Vermont',
      code: 'VT',
      shortcut: 'V.T.',
    },
    {
      label: 'Virginia',
      code: 'VA',
      shortcut: 'Va.',
    },
    {
      label: 'Washington',
      code: 'WA',
      shortcut: 'Wash.',
    },
    {
      label: 'West Virginia',
      code: 'WV',
      shortcut: 'W.Va.',
    },
    {
      label: 'Wisconsin',
      code: 'WI',
      shortcut: 'Wis.',
    },
    {
      label: 'Wyoming',
      code: 'WY',
      shortcut: 'Wyo.',
    },
  ]

  const getLabel = (code: string) => {
    return states.find(state => state.code === code)?.label ?? code
  }

  return { states, getLabel }
}
