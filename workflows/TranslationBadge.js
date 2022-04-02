import { translationStatusList } from '../schemas/data/translationStatusList'

export function TranslationBadge(props) {
  const status = translationStatusList.find(
    (s) => s.value === props.published.translationStatus
  )

  if (!status) return undefined

  if (!status.desc) return undefined

  return {
    label: status.title,
    title: status.desc,
    color: status.value === 'fr_validated' ? 'success' : 'warning',
  }
}
