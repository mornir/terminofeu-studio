import { translationStatusList } from '../schemas/data/translationStatusList'

export function TranslationBadge(props) {
  const status = translationStatusList.find(
    (s) => s.value === props.published.translationStatus
  )
  return {
    label: status.title,
    title: status.desc,
    color: status.value === 'reviewed' ? 'success' : 'warning',
  }
}
