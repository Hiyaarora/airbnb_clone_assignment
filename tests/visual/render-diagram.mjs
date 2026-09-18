// Renders docs/architecture-diagram.html to docs/architecture-diagram.png (2×) and .pdf.
import { chromium } from "@playwright/test";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const src = pathToFileURL(resolve("docs/architecture-diagram.html")).href;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1800, height: 1420 }, deviceScaleFactor: 2 });
await p.goto(src);
await p.waitForTimeout(300);
await p.screenshot({ path: "docs/architecture-diagram.png", fullPage: true });
await p.pdf({ path: "docs/architecture-diagram.pdf", width: "1800px", height: "1420px", printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
console.log("rendered docs/architecture-diagram.png + .pdf");
await b.close();
