// Render 1 still tại onset+25f của MỌI beat (skill: QA TỪNG CÂU). Ra qa_beats/<beat>_f<frame>.png
import { execSync } from "node:child_process";
import { mkdirSync, readFileSync } from "node:fs";

const src = readFileSync(new URL("./src/timing.ts", import.meta.url), "utf8");
const beats = [...src.matchAll(/^\s{2}(\w+):\s*\{\s*on:\s*(\d+)\s*\}/gm)].map(m => [m[1], +m[2]]);
mkdirSync("qa_beats", { recursive: true });
const only = process.argv[2] ? process.argv[2].split(",") : null;
let n = 0;
for (const [id, on] of beats) {
  if (only && !only.includes(id)) continue;
  const f = on + 25;
  const out = `qa_beats/${id}_f${f}.png`;
  execSync(`npx remotion still Main ${out} --frame=${f} --log=error`, { stdio: "inherit" });
  n++;
  console.log(`  ${id} @ ${f}  ->  ${out}`);
}
console.log(`\nDone: ${n} still`);
