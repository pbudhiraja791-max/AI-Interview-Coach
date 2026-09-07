import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

export async function extractTextFromFile(fileBuffer, mimetype, originalname) {
  try {
    const filename = (originalname || "").toLowerCase();

    if (mimetype === 'application/pdf' || filename.endsWith('.pdf')) {
      const data = await pdfParse(fileBuffer);
      return data.text ? data.text.trim() : "";
    }

    if (
      mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      filename.endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      return result.value ? result.value.trim() : "";
    }

    // Default to text decoding
    return fileBuffer.toString('utf-8').trim();
  } catch (error) {
    console.error("File text extraction error:", error);
    // Fallback: decode as UTF-8 string
    return fileBuffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ').trim();
  }
}
