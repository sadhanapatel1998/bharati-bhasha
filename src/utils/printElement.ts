/**
 * Prints one element on its own.
 *
 * Hiding the rest of the page with `visibility: hidden` is not enough: hidden
 * elements still occupy their space, so the document stays several pages tall
 * and the printer emits blank sheets. Instead we clone the element into an
 * off-screen iframe that contains nothing else, copy the page's stylesheets so
 * it still looks right, and print that.
 */
export async function printElement(elementId: string, documentTitle?: string) {
  const source = document.getElementById(elementId);
  if (!source) {
    window.print();
    return;
  }

  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  const win = iframe.contentWindow;
  if (!doc || !win) {
    document.body.removeChild(iframe);
    window.print();
    return;
  }

  // carry over every stylesheet and inline style block from the real page
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((node) => node.outerHTML)
    .join('\n');

  doc.open();
  doc.write(`<!DOCTYPE html>
<html lang="${document.documentElement.lang || 'hi'}">
  <head>
    <meta charset="utf-8" />
    <title>${documentTitle || document.title}</title>
    ${styles}
    <style>
      @page { size: A4 portrait; margin: 12mm; }
      html, body {
        margin: 0;
        padding: 0;
        background: #fff;
        height: auto;
      }
      /* the sheet is the only thing in this document, so nothing to hide */
      #print-sheet {
        position: static !important;
        width: 100% !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        background: #fff !important;
        backdrop-filter: none !important;
      }
      #print-sheet .blur-2xl,
      #print-sheet .print\\:hidden { display: none !important; }
      #print-sheet .hidden.print\\:block { display: block !important; }
      #print-sheet * {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        animation: none !important;
        transition: none !important;
      }
      #print-sheet > * { break-inside: avoid; page-break-inside: avoid; }
    </style>
  </head>
  <body><div id="print-sheet"></div></body>
</html>`);
  doc.close();

  const clone = source.cloneNode(true) as HTMLElement;
  clone.removeAttribute('id');
  doc.getElementById('print-sheet')?.appendChild(clone);

  // let the copied stylesheets and webfonts settle before printing
  await new Promise<void>((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    const fonts = (doc as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts?.ready) fonts.ready.then(finish).catch(finish);
    setTimeout(finish, 600);
  });

  win.focus();
  win.print();

  // Safari fires afterprint late; a timeout keeps the DOM clean either way
  const cleanup = () => iframe.parentNode && document.body.removeChild(iframe);
  win.addEventListener('afterprint', () => setTimeout(cleanup, 300));
  setTimeout(cleanup, 60000);
}
