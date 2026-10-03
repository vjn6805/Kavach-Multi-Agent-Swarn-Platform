/**
 * Generates a Dehradun Flash Flood Advisory PDF
 * Run: node generate_advisory.js
 * Output: docs/dehradun_flood_advisory_2024.pdf
 */

const fs = require('fs');
const path = require('path');

// ── Advisory text ─────────────────────────────────────────────
// Zones are real Dehradun localities with known coordinates:
//
//  RED zones (high flood risk, low-lying near Rispana/Song rivers):
//    Kandoli        lat=30.3200, lng=78.0600
//    Niranjanpur    lat=30.3050, lng=78.0450
//    Sewla Kalan    lat=30.2900, lng=78.0350
//
//  AMBER zones (moderate risk, mid-elevation):
//    Raipur         lat=30.3400, lng=78.1100
//    Majra          lat=30.3300, lng=77.9900
//
//  SAFE zones (higher ground, evacuation destinations):
//    Manduwala      lat=30.3700, lng=78.0200
//    Clement Town   lat=30.2800, lng=78.0000
//
//  Shelters, hospitals, responders are placed at real coords
//  so ZoneOverlays can anchor each zone bubble correctly.

const ADVISORY_TEXT = `
UTTARAKHAND STATE DISASTER MANAGEMENT AUTHORITY
DISTRICT DISASTER MANAGEMENT AUTHORITY — DEHRADUN
FLASH FLOOD & CLOUDBURST EMERGENCY ADVISORY

Advisory No.: DDMA/DDN/2024/087
Date: 14 August 2024  |  Time: 05:30 IST
Issued By: District Collector, Dehradun
Classification: URGENT — IMMEDIATE ACTION REQUIRED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. DISASTER OVERVIEW

Type: Flash Flood and Cloudburst
Severity: EXTREME
Primary River: Rispana River
Secondary River: Song River
Affected District: Dehradun, Uttarakhand
Issuing Authority: District Disaster Management Authority, Dehradun

Continuous heavy rainfall of 180mm recorded in the past 6 hours over the
Mussoorie hills has caused the Rispana River to breach its banks at multiple
points. The Song River is also running at 94% of its danger level. Cloudbursts
have been reported over the Rajpur Road catchment area. Flash floods are
actively inundating low-lying localities in the eastern and southern parts of
Dehradun city. Landslide risk is HIGH on all hill-facing roads.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

2. ZONE CLASSIFICATION

RED ZONE — IMMEDIATE EVACUATION ORDERED:
The following localities are under active flood inundation or face imminent
inundation within the next 60 minutes. All residents must evacuate immediately.

  - Kandoli (near Rispana River bank, eastern Dehradun)
    Coordinates: 30.3200 N, 78.0600 E
    Status: Active flooding. Water level 1.2m above road level.

  - Niranjanpur (low-lying area, Rispana floodplain)
    Coordinates: 30.3050 N, 78.0450 E
    Status: Roads submerged. Evacuation route via NH-72 only.

  - Sewla Kalan (Song River adjacent, southern Dehradun)
    Coordinates: 30.2900 N, 78.0350 E
    Status: Song River overflow. 3 residential colonies cut off.

AMBER ZONE — HIGH ALERT, PREPARE TO EVACUATE:
The following localities are at elevated risk. Residents should pack essentials
and be ready to move on short notice.

  - Raipur (mid-elevation, Rajpur Road corridor)
    Coordinates: 30.3400 N, 78.1100 E
    Status: Landslide debris on Rajpur Road. Partial road closure.

  - Majra (western Dehradun, near Bindal River tributary)
    Coordinates: 30.3300 N, 77.9900 E
    Status: Waterlogging reported. Bindal tributary rising.

SAFE ZONE — DESIGNATED EVACUATION DESTINATIONS:
The following localities are on higher ground and have been designated as
evacuation assembly points and shelter zones.

  - Manduwala (northern Dehradun, elevated terrain)
    Coordinates: 30.3700 N, 78.0200 E
    Status: Safe. Primary evacuation assembly point.

  - Clement Town (southwestern Dehradun, army cantonment area)
    Coordinates: 30.2800 N, 78.0000 E
    Status: Safe. Secondary evacuation point. Army assistance available.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

3. ROAD STATUS

BLOCKED ROADS (do not use):
  - Rispana Bridge Road (Kandoli to Niranjanpur) — bridge submerged
  - Sewla Kalan Link Road — 0.8m water on road
  - Rajpur Road (Raipur section, km 12 to km 15) — landslide debris

SAFE EVACUATION ROUTES:
  - NH-72 (Haridwar Road) — open, use for southward evacuation
  - Saharanpur Road — open, use for northward evacuation to Manduwala
  - Ring Road (Clement Town bypass) — open

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4. EMERGENCY SHELTERS

Shelter 1: Manduwala Government Inter College
  Location: Manduwala, Dehradun
  Zone: Manduwala (safe zone)
  Coordinates: 30.3720 N, 78.0180 E
  Capacity: 500 persons
  Status: OPEN — 47 persons currently sheltered

Shelter 2: Clement Town Community Hall
  Location: Clement Town, Dehradun
  Zone: Clement Town (safe zone)
  Coordinates: 30.2820 N, 78.0020 E
  Capacity: 350 persons
  Status: OPEN — 23 persons currently sheltered

Shelter 3: Niranjanpur Primary School (temporary)
  Location: Niranjanpur, Dehradun
  Zone: Niranjanpur (red zone — elevated building only)
  Coordinates: 30.3060 N, 78.0460 E
  Capacity: 120 persons
  Status: OPEN — ground floor flooded, use first floor only

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. HOSPITALS AND MEDICAL FACILITIES

Doon Hospital (Government)
  Location: Niranjanpur area, Dehradun
  Zone: Niranjanpur (red zone)
  Coordinates: 30.3040 N, 78.0430 E
  Status: Emergency ward operational. Backup generator active.

Synergy Hospital
  Location: Raipur Road, Dehradun
  Zone: Raipur (amber zone)
  Coordinates: 30.3420 N, 78.1080 E
  Status: Operational. Receiving flood casualties.

Max Super Speciality Hospital
  Location: Manduwala Road, Dehradun
  Zone: Manduwala (safe zone)
  Coordinates: 30.3680 N, 78.0220 E
  Status: Fully operational. Trauma unit on standby.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6. EMERGENCY RESPONDERS DEPLOYED

NDRF Team Alpha
  Type: NDRF
  Location: Kandoli Flood Zone
  Zone: Kandoli (red zone)
  Coordinates: 30.3210 N, 78.0590 E
  Status: Active rescue operations. 2 boats deployed.

NDRF Team Bravo
  Type: NDRF
  Location: Sewla Kalan
  Zone: Sewla Kalan (red zone)
  Coordinates: 30.2910 N, 78.0360 E
  Status: Evacuating cut-off colonies.

Dehradun Police Control Room
  Type: Police
  Location: Manduwala Control Point
  Zone: Manduwala (safe zone)
  Coordinates: 30.3710 N, 78.0190 E
  Status: Coordinating all rescue operations.

SDRF Ambulance Unit
  Type: Ambulance
  Location: Clement Town Base
  Zone: Clement Town (safe zone)
  Coordinates: 30.2810 N, 78.0010 E
  Status: 4 ambulances deployed. 2 on standby.

Fire Brigade Unit
  Type: Fire
  Location: Raipur Station
  Zone: Raipur (amber zone)
  Coordinates: 30.3390 N, 78.1090 E
  Status: Deployed for water pumping and rescue.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7. POPULATION AT RISK

Estimated population in red zones: 28,000 persons
Estimated population in amber zones: 45,000 persons
Vulnerable population (elderly, disabled, pregnant): approx. 3,200 persons
Tourists and pilgrims in affected areas: approx. 800 persons

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

8. IMMEDIATE INSTRUCTIONS TO PUBLIC

1. Residents of Kandoli, Niranjanpur, and Sewla Kalan must evacuate NOW.
2. Do not attempt to cross flooded roads or bridges.
3. Move to the nearest shelter on higher ground.
4. Call 112 for emergency rescue. Call 1077 for SDRF.
5. Do not use Rispana Bridge Road or Sewla Kalan Link Road.
6. Carry essential medicines, documents, and 3 days of food.
7. Help elderly and disabled neighbours to evacuate.
8. Do not spread unverified information on social media.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

9. WEATHER FORECAST

IMD Dehradun forecast: Heavy to very heavy rainfall expected to continue for
the next 12 hours. Red alert issued for Dehradun district. Flood situation
expected to worsen before 14:00 IST. All residents in low-lying areas must
complete evacuation before 08:00 IST.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Signed:
District Collector, Dehradun
District Disaster Management Authority
Uttarakhand State Disaster Management Authority

Emergency Helpline: 112 | SDRF: 1077 | District Control Room: 0135-2653200

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

// ── Build a minimal valid PDF with plain text ─────────────────
// Uses only PDF 1.4 spec — no external libraries needed.
function buildPDF(text) {
  const lines = text.split('\n');
  const pageWidth  = 595;   // A4 points
  const pageHeight = 842;
  const margin     = 50;
  const fontSize   = 9;
  const lineHeight = 13;
  const maxWidth   = pageWidth - margin * 2;
  const maxLines   = Math.floor((pageHeight - margin * 2) / lineHeight);

  // Split into pages
  const pages = [];
  let current = [];
  for (const line of lines) {
    // Word-wrap long lines
    if (line.length > 95) {
      const words = line.split(' ');
      let buf = '';
      for (const w of words) {
        if ((buf + ' ' + w).trim().length > 95) {
          current.push(buf.trim());
          buf = w;
          if (current.length >= maxLines) { pages.push(current); current = []; }
        } else {
          buf = (buf + ' ' + w).trim();
        }
      }
      if (buf) { current.push(buf); if (current.length >= maxLines) { pages.push(current); current = []; } }
    } else {
      current.push(line);
      if (current.length >= maxLines) { pages.push(current); current = []; }
    }
  }
  if (current.length > 0) pages.push(current);

  // PDF object builder
  const objects = [];
  const offsets = [];
  let pos = 0;

  const addObj = (content) => {
    const idx = objects.length + 1;
    objects.push(content);
    return idx;
  };

  // Build content streams per page
  const streamIds = pages.map((pageLines) => {
    const cmds = [`BT`, `/F1 ${fontSize} Tf`, `${margin} ${pageHeight - margin} Td`, `${lineHeight} TL`];
    for (const line of pageLines) {
      // Escape PDF special chars
      const safe = line
        .replace(/\\/g, '\\\\')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/[^\x20-\x7E]/g, ' ');
      cmds.push(`(${safe}) Tj T*`);
    }
    cmds.push('ET');
    const stream = cmds.join('\n');
    return addObj(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  });

  // Page objects
  const pageIds = streamIds.map(sid => {
    return addObj(`<< /Type /Page /Parent 4 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents ${sid} 0 R /Resources << /Font << /F1 3 0 R >> >> >>`);
  });

  // Font (obj 3), Pages (obj 4), Catalog (obj 5) — pre-allocated slots
  // We need to insert them at specific positions. Rebuild with fixed IDs.

  // Simpler approach: build all objects in order with known IDs
  const allObjs = [];

  // obj 1: Catalog
  allObjs.push(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`);

  // obj 2: Pages (kids filled after)
  const pageObjStartId = 4; // pages start at obj 4
  const kidsRef = pages.map((_, i) => `${pageObjStartId + i * 2} 0 R`).join(' ');
  allObjs.push(`2 0 obj\n<< /Type /Pages /Kids [${kidsRef}] /Count ${pages.length} >>\nendobj`);

  // obj 3: Font
  allObjs.push(`3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>\nendobj`);

  // For each page: content stream (even id) + page dict (odd id)
  pages.forEach((pageLines, pi) => {
    const contentId = pageObjStartId + pi * 2;       // 4, 6, 8 ...
    const pageId    = pageObjStartId + pi * 2 + 1;   // 5, 7, 9 ...

    const cmds = [
      'BT',
      `/F1 ${fontSize} Tf`,
      `${margin} ${pageHeight - margin - lineHeight} Td`,
      `${lineHeight} TL`
    ];
    for (const line of pageLines) {
      const safe = line
        .replace(/\\/g, '\\\\')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/[^\x20-\x7E]/g, ' ');
      cmds.push(`(${safe}) Tj T*`);
    }
    cmds.push('ET');
    const stream = cmds.join('\n');

    allObjs.push(`${contentId} 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj`);
    allObjs.push(`${pageId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents ${contentId} 0 R /Resources << /Font << /F1 3 0 R >> >> >>\nendobj`);
  });

  // Build PDF bytes
  const header = '%PDF-1.4\n';
  let body = header;
  const xrefOffsets = [];

  for (const obj of allObjs) {
    xrefOffsets.push(body.length);
    body += obj + '\n';
  }

  const xrefOffset = body.length;
  const totalObjs  = allObjs.length + 1; // +1 for obj 0

  let xref = `xref\n0 ${totalObjs}\n`;
  xref += `0000000000 65535 f \n`;
  for (const off of xrefOffsets) {
    xref += String(off).padStart(10, '0') + ` 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${totalObjs} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return body + xref + trailer;
}

// ── Write file ────────────────────────────────────────────────
const outPath = path.join(__dirname, 'docs', 'dehradun_flood_advisory_2024.pdf');
const pdfContent = buildPDF(ADVISORY_TEXT);
fs.writeFileSync(outPath, pdfContent, 'latin1');
console.log(`✓ Advisory PDF written to: ${outPath}`);
console.log(`  Pages: ${Math.ceil(ADVISORY_TEXT.split('\n').length / 60)}`);
console.log(`  Size:  ${(pdfContent.length / 1024).toFixed(1)} KB`);
