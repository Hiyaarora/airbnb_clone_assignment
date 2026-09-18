// Captures screenshots + rendered-DOM measurement dumps of the local build for visual QA.
// Usage: node tests/visual/measure.mjs [--url http://localhost:3000] [--state default|tour|lightbox|amenities] [--index N] [--viewports 1280x576,1440x900,...]
import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith("--")) acc.push([a.slice(2), arr[i + 1] && !arr[i + 1].startsWith("--") ? arr[i + 1] : "true"]);
    return acc;
  }, []),
);
const url = args.url ?? "http://localhost:3000";
const state = args.state ?? "default";
const index = Number(args.index ?? 0);
const viewports = (args.viewports ?? "1280x576,1440x900,1536x864,1920x1080").split(",").map((v) => v.split("x").map(Number));
const outDir = join(dirname(fileURLToPath(import.meta.url)), "out");
mkdirSync(outDir, { recursive: true });

// Same dump format as docs/reference-measurements/rendered-dom-1280x576.txt
const DUMP = `(() => {
  const keep=['position','display','flexDirection','justifyContent','alignItems','gap','gridTemplateColumns','gridTemplateRows','gridColumn','gridRow','padding','margin','fontSize','fontWeight','lineHeight','color','backgroundColor','border','borderTop','borderBottom','borderRadius','boxShadow','opacity','transform','transition','overflow','objectFit','textDecoration','letterSpacing','zIndex','top','left','right','bottom','width','height','maxWidth','minWidth','aspectRatio','textOverflow','whiteSpace','textAlign','visibility','pointerEvents','flex','textTransform','backgroundImage','outline','outlineOffset','textUnderlineOffset'];
  const skip=new Set(['none','normal','auto','0px','static','rgba(0, 0, 0, 0)','0px 0px 0px 0px','visible','0s','all 0s ease 0s','all','fill','block','flex-start','stretch','row','nowrap','clip','400','inline','pointer','0px none rgb(34, 34, 34)','1','start','baseline','0 1 auto','0','rgb(34, 34, 34)','rgb(255, 255, 255)','rgb(34, 34, 34) none 0px']);
  const out=[];
  const go=(el,d)=>{
    const cs=getComputedStyle(el); if(cs.display==='none') return;
    const b=el.getBoundingClientRect(); if(!b.width&&!b.height && el.tagName!=='BODY') return;
    if(['PATH','G','RECT','CIRCLE','LINE','POLYLINE','POLYGON','DEFS','CLIPPATH','USE','ELLIPSE','SCRIPT','STYLE','NEXT-ROUTE-ANNOUNCER'].includes(el.tagName)) return;
    const txt=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).filter(Boolean).join(' ').slice(0,160);
    const props={};
    for(const k of keep){const v=cs[k]; if(v && !skip.has(v)) props[k]=v;}
    if(props.backgroundImage) props.backgroundImage=props.backgroundImage.slice(0,120);
    const attrs=[]; for(const a of ['aria-label','role','href','src','alt','type','tabindex','aria-hidden','aria-modal','aria-expanded','aria-pressed','aria-labelledby','aria-current','aria-disabled','disabled','target','loading','id','data-idx']) if(el.hasAttribute(a)) attrs.push(a+'='+el.getAttribute(a).slice(0,160));
    if(el.tagName==='IMG') attrs.push('natural='+el.naturalWidth+'x'+el.naturalHeight);
    out.push('  '.repeat(d)+el.tagName.toLowerCase()+' ['+[b.left,b.top+scrollY,b.width,b.height].map(v=>Math.round(v*10)/10).join(',')+']'+(txt?' "'+txt+'"':'')+(attrs.length?' {'+attrs.join(' | ')+'}':'')+' '+JSON.stringify(props));
    for(const c of el.children) go(c,d+1);
  };
  go(document.body,0); return out.join('\\n');
})()`;

const browser = await chromium.launch();
for (const [width, height] of viewports) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  if (state === "tour") {
    await page.getByRole("button", { name: "Show all photos" }).first().click();
  } else if (state === "lightbox") {
    await page.getByRole("button", { name: "Show all photos" }).first().click();
    await page.locator(`[data-idx="${index}"]`).click();
  } else if (state === "amenities") {
    await page.getByRole("button", { name: /Show all \d+ amenities/ }).click();
  }
  await page.waitForTimeout(600);
  const base = join(outDir, `${state}-${width}x${height}`);
  await page.screenshot({ path: `${base}.png`, fullPage: state === "default" });
  writeFileSync(`${base}.txt`, await page.evaluate(DUMP));
  console.log("wrote", base + ".{png,txt}");
  await page.close();
}
await browser.close();
