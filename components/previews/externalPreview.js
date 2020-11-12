import { assemblePageUrl } from './frontendUtils'
export default function resolveProductionUrl(document) {
  return assemblePageUrl(document, { addPreviewParam: true })
}
