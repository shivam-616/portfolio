from pathlib import Path

stream = b"BT /F1 18 Tf 72 720 Td (Your Name) Tj /F1 11 Tf 0 -28 Td (Replace public/resume.pdf with your own resume.) Tj ET"
objects = [
    b"1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n",
    b"2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n",
    b"3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n",
    b"4 0 obj << /Length %d >> stream\n%s\nendstream endobj\n" % (len(stream), stream),
    b"5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\n",
]

header = b"%PDF-1.4\n"
body = b"".join(objects)
offsets = [0]
pos = len(header)
for obj in objects:
    offsets.append(pos)
    pos += len(obj)

xref = [b"xref\n0 6\n0000000000 65535 f \n"]
for off in offsets[1:]:
    xref.append(b"%010d 00000 n \n" % off)

trailer = b"trailer << /Size 6 /Root 1 0 R >>\nstartxref\n%d\n%%%%EOF\n" % (len(header) + len(body))
pdf = header + body + b"".join(xref) + trailer

out = Path(__file__).resolve().parent.parent / "public" / "resume.pdf"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_bytes(pdf)
print(f"wrote {out} ({len(pdf)} bytes)")
