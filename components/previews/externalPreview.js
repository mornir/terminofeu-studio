import { assemblePageUrl } from './assemblePageUrl'
export default function resolveProductionUrl(document) {
  return assemblePageUrl(document, { addPreviewParam: true })
}
