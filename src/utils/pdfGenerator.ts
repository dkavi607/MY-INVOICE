import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function generateInvoicePDF(
  elementId: string,
  filename: string = 'invoice.pdf',
  onProgress?: (status: string) => void
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Invoice container element not found');
  }

  onProgress?.('Preparing invoice layout...');

  // Store original styles to restore later
  const originalWidth = element.style.width;
  const originalTransform = element.style.transform;
  const originalTransformOrigin = element.style.transformOrigin;

  try {
    onProgress?.('Rendering high-resolution canvas...');

    // Temporarily reset zoom/scale if any
    element.style.transform = 'none';
    element.style.width = '794px'; // standard A4 pixel width at 96 DPI

    const canvas = await html2canvas(element, {
      scale: 2.5, // Crisp 2.5x scale for retina print quality
      useCORS: true,
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
        }
      },
    });

    onProgress?.('Generating PDF document...');

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Add subsequent pages if content overflows A4 height
    while (heightLeft > 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    onProgress?.('Saving file...');
    pdf.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`);
  } finally {
    // Restore styling
    element.style.width = originalWidth;
    element.style.transform = originalTransform;
    element.style.transformOrigin = originalTransformOrigin;
  }
}
