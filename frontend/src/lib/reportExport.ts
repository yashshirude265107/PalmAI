import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Renders a DOM node to a PNG and triggers a browser download.
 */
export async function downloadElementAsImage(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#0b0713", useCORS: true });
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/**
 * Renders a DOM node (typically the full report) to a multi-page A4 PDF.
 */
export async function downloadElementAsPDF(element: HTMLElement, filename: string) {
  const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#0b0713", useCORS: true });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${filename}.pdf`);
}

/**
 * Uses the Web Share API when available (mobile-friendly), falling back to
 * copying a shareable link to the clipboard.
 */
export async function shareReport(url: string, title: string) {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, url });
      return "shared";
    } catch {
      // user cancelled share sheet — no-op
      return "cancelled";
    }
  }

  await navigator.clipboard.writeText(url);
  return "copied";
}
