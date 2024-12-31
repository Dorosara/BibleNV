export interface PdfMetadata {
  title: string;
  pageCount: number;
}

export interface ParsedPdfContent {
  text: string;
  pageNumber: number;
  metadata: PdfMetadata;
}