// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {Readability} from '@mozilla/readability';
import {ParsedDocument} from '../Common/parsedDocument';

export default function parseDocumentArticle(
  doc: Document
): ParsedDocument | null {
  const documentClone = doc.cloneNode(true); // Clone to avoid changing DOM
  return new Readability(documentClone).parse();
}
