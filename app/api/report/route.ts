import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function POST(req: Request) {
  try {
    const { answers, verdict } = await req.json();

    const pdf = await PDFDocument.create();
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

    let page = pdf.addPage();
    const { width, height } = page.getSize();

    const margin = 50;
    let y = height - margin;
    const lineHeight = 16;

    // ---- SIMPLE SAFE WRAPPER ----
    const wrap = (text: string, maxChars = 90) => {
      const words = text.split(' ');
      const lines: string[] = [];
      let current = '';

      words.forEach(word => {
        if ((current + word).length > maxChars) {
          lines.push(current);
          current = word + ' ';
        } else {
          current += word + ' ';
        }
      });

      if (current) lines.push(current);
      return lines;
    };

    const draw = (
      text: string,
      size = 12,
      bold = false,
      color = rgb(0, 0, 0)
    ) => {
      const lines = wrap(text);

      lines.forEach(line => {
        if (y < margin + 40) {
          page = pdf.addPage();
          y = height - margin;
        }

        page.drawText(line.trim(), {
          x: margin,
          y,
          size,
          font: bold ? boldFont : font,
          color,
        });

        y -= lineHeight;
      });

      y -= 4;
    };

    const divider = () => {
      y -= 10;
      page.drawLine({
        start: { x: margin, y },
        end: { x: width - margin, y },
        thickness: 1,
        color: rgb(0.7, 0.7, 0.7),
      });
      y -= 20;
    };

    // ======================
    // TITLE
    // ======================

    draw('Blockchain Suitability Assessment', 20, true);
    draw(`Date: ${new Date().toLocaleDateString()}`, 11);
    divider();

    // ======================
    // EXECUTIVE SUMMARY
    // ======================

    draw('Executive Summary', 14, true);
    draw(verdict, 13, true, rgb(0.1, 0.1, 0.6));
    divider();

    // ======================
    // KEY RATIONALE (YOUR EXACT WORDING)
    // ======================

    draw('Key Rationale', 14, true);

    if (verdict.includes('Public Permissionless')) {
      draw(
        'Public permissionless Blockchain serves as better choice for your use case since it satisfies your following requirements:'
      );

      draw(
        '• Intense Decentralization: With no single entity controlling the network, this feature permits unhindered access to all the participants to the network.'
      );

      draw(
        '• Censorship resistance: The functional ability of almost all participants in the network are equitable.'
      );
    }

    else if (verdict.includes('Private Permissioned')) {
      draw(
        'Private Permissioned Blockchain serves as better choice for your use case since it serves the following requirements:'
      );

      draw(
        '• Superior Privacy: This aims restricted access for only authorized participants. With controlled visibility and data masking, private data remains confined to verified identities.'
      );

      draw(
        '• Regulatory compliance: Being a closed system, the blockchain architecture adheres to the industry and government specific regulatory guidelines.'
      );

      draw(
        '• Reduced risk environment: With participants vetted there exist reduced risk of network attack by malicious actors.'
      );
    }

    else {
      draw(
        'We would suggest you to look for alternative hybrid models as blockchain alone may not suffice your requirements.'
      );
    }

    divider();

    // ======================
    // USER RESPONSES
    // ======================

    draw('User Responses', 14, true);

    const formatKey = (key: string) =>
      key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    Object.entries(answers).forEach(([key, value]) => {
      draw(`${formatKey(key)}: ${String(value).toUpperCase()}`);
    });

    divider();
    draw(
      'This report was generated using the Blockchain Suitability Assessment Framework.',
      9
    );

    const pdfBytes = await pdf.save();

    return new Response(new Blob([pdfBytes], { type: 'application/pdf' }), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':
          'attachment; filename="Blockchain_Assessment_Report.pdf"',
      },
    });

  } catch (error) {
    console.error(error);
    return new Response('Error generating PDF', { status: 500 });
  }
}
