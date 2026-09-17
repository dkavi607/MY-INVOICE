import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { toPng } from 'html-to-image';

export async function generateInvoicePDF(
  elementId: string,
  filename: string = 'invoice.pdf',
  onProgress?: (status: string) => void
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Invoice container element not found. Please ensure the preview is visible.');
  }

  onProgress?.('Preparing invoice layout...');

  // Ensure all embedded images (logos, QR codes) inside the invoice element are loaded
  const images = Array.from(element.querySelectorAll('img'));
  await Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    })
  );

  // Store original styles to restore later
  const originalWidth = element.style.width;
  const originalTransform = element.style.transform;
  const originalTransformOrigin = element.style.transformOrigin;
  const originalBoxShadow = element.style.boxShadow;

  try {
    onProgress?.('Rendering high-resolution vector canvas...');

    // Temporarily standardize width for crisp A4 output
    element.style.transform = 'none';
    element.style.width = '794px';
    element.style.boxShadow = 'none';

    let imgDataUrl: string;
    let imgWidthPx: number;
    let imgHeightPx: number;

    try {
      const canvas = await html2canvas(element, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
        onclone: (clonedDoc) => {
          const clonedEl = clonedDoc.getElementById(elementId);
          if (clonedEl) {
            clonedEl.style.boxShadow = 'none';
            clonedEl.style.borderRadius = '0px';
            clonedEl.style.transform = 'none';
            clonedEl.style.margin = '0 auto';
            clonedEl.style.width = '794px';
          }
        },
      });
      imgDataUrl = canvas.toDataURL('image/jpeg', 0.98);
      imgWidthPx = canvas.width;
      imgHeightPx = canvas.height;
    } catch (primaryErr) {
      console.warn('html2canvas-pro fallback trigger:', primaryErr);
      onProgress?.('Applying high-fidelity image converter...');
      imgDataUrl = await toPng(element, {
        quality: 0.98,
        pixelRatio: 2.5,
        backgroundColor: '#ffffff',
      });
      imgWidthPx = element.offsetWidth * 2.5;
      imgHeightPx = element.offsetHeight * 2.5;
    }

    onProgress?.('Generating PDF document...');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const imgWidth = pdfWidth;
    const imgHeight = (imgHeightPx * pdfWidth) / imgWidthPx;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgDataUrl, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Add subsequent pages if content overflows A4 height
    while (heightLeft > 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgDataUrl, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    onProgress?.('Saving file...');
    const cleanFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(cleanFilename);
  } catch (err: any) {
    console.error('PDF generation error:', err);
    throw err;
  } finally {
    // Restore styling
    element.style.width = originalWidth;
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;
    element.style.boxShadow = originalBoxShadow;
  }
}
