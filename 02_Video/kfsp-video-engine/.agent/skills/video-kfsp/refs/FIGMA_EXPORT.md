# Lấy ảnh từ Figma về video — đường PLUGIN (chuẩn, chốt 17/07/2026)

> Dùng khi cần asset Figma cho video: schematic tách lớp, panel mẫu hình, hero chart, hình CTA.
> **Đường đúng = plugin export rồi POST thẳng vào server local.** Ảnh đi Figma → localhost → `remotion/public/`, KHÔNG qua context AI (không tốn token), KHÔNG cần token REST.
> Verify thật ở video "Hộp chữ nhật Bài 1" 17/07 (4 file: full frame + 3 panel tách từ `167:2991`).

---

## 🔴 Ba cách lấy ảnh — chọn đúng cách

| Cách | Khi nào | Vấn đề |
|---|---|---|
| **① Plugin → POST localhost** ✅ | **MẶC ĐỊNH.** Mọi lần cần asset Figma | Không có. Cần thêm cổng vào manifest 1 lần (mục 2) |
| ② Plugin → base64 → decode | Chỉ khi không dựng được server | Base64 ảnh 2x ≈ **hàng trăm nghìn token**. Tránh |
| ③ REST API (`figma_get_file_data` ảnh) | — | Cần `FIGMA_ACCESS_TOKEN`, **hay hết hạn** (403 Token expired 17/07). Đừng phụ thuộc |

> 🔴 **Token REST hết hạn KHÔNG chặn việc lấy ảnh.** WebSocket bridge độc lập với REST: REST chết vẫn `figma_execute` + export bình thường. Đừng đi xin token khi chỉ cần ảnh.

---

## 1. Server nhận ảnh

```python
#!/usr/bin/env python3
# recv.py — nhận PNG plugin POST tới, ghi thẳng vào remotion/public/
import http.server, os, urllib.parse
OUT = os.path.expanduser("~/Desktop/VIDEO KFSP/<project>/remotion/public")

class H(http.server.BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")
    def do_OPTIONS(self):
        self.send_response(200); self._cors(); self.end_headers()
    def do_POST(self):
        name = os.path.basename(urllib.parse.urlparse(self.path).path.strip("/") or "out.png")
        data = self.rfile.read(int(self.headers.get("Content-Length", 0)))
        open(os.path.join(OUT, name), "wb").write(data)
        print(f"✅ {name}: {len(data)} bytes", flush=True)
        self.send_response(200); self._cors(); self.end_headers(); self.wfile.write(b"ok")
    def log_message(self, *a): pass

http.server.HTTPServer(("127.0.0.1", 8777), H).serve_forever()
```

Chạy nền: `nohup python3 recv.py > recv.log 2>&1 &` → test: `curl -s -X POST --data-binary "x" http://127.0.0.1:8777/_t.txt`

## 2. Manifest phải cho phép cổng (một lần duy nhất)

🔴 **`"http://localhost"` trong `allowedDomains` chỉ khớp cổng 80** — không khớp `:8777` → plugin báo **`Failed to fetch`**.

Thêm vào `~/figma-console-mcp/figma-desktop-bridge/manifest.json`, **cả 2 mảng** `allowedDomains` **và** `devAllowedDomains`:
```json
"http://localhost:8777",
```
→ Thanh: Figma Desktop → `Plugins → Development → Import plugin from manifest…` → chọn manifest trên → mở lại plugin **Figma Desktop Bridge**.
(Manifest chỉ đọc lúc nạp plugin → sửa xong bắt buộc re-import, không có cách nóng.)

Kiểm tra thông đường trước khi export:
```js
const res = await fetch("http://localhost:8777/_ping.txt", { method: "POST", body: "ping" });
return { status: res.status };   // 200 = thông
```

## 3. Export cả frame

```js
const frame = await figma.getNodeByIdAsync("167:2991");
const bytes = await frame.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: 2 } });
const status = (await fetch("http://localhost:8777/ten-file.png", { method: "POST", body: bytes })).status;
return { kb: Math.round(bytes.length / 1024), status };
```

## 4. Cắt vùng (tách panel) — KHÔNG đụng file gốc

Figma **không có** export theo vùng. Cách an toàn: clone ra **page tạm** → dịch con lên → thu khung → export → `page.remove()`.

```js
const frame = await figma.getNodeByIdAsync("167:2991");
const post = async (n, b) => (await fetch("http://localhost:8777/" + n, { method: "POST", body: b })).status;
const REGIONS = [{ name: "panel1.png", y: 285, h: 235 }, { name: "panel2.png", y: 512, h: 278 }];

const page = figma.createPage(); page.name = "__tmp_export__";
const out = [];
try {
  for (const r of REGIONS) {
    const clone = frame.clone();
    page.appendChild(clone);
    clone.x = 0; clone.y = 0;
    clone.clipsContent = true;                          // bắt buộc, không thì không cắt
    for (const ch of clone.children) { ch.y = ch.y - r.y; }   // đẩy vùng cần cắt lên đầu khung
    clone.resize(1080, r.h);
    const b = await clone.exportAsync({ format: "PNG", constraint: { type: "SCALE", value: 2 } });
    out.push({ name: r.name, kb: Math.round(b.length / 1024), status: await post(r.name, b) });
    clone.remove();
  }
} finally { page.remove(); }    // 🔴 finally — lỗi giữa chừng vẫn dọn sạch
return { out };
```

🔴 **`try/finally` bắt buộc** — export lỗi giữa chừng mà không dọn thì page rác `__tmp_export__` nằm lại trong file Thanh.

## 5. Luôn soi ảnh sau export

`Read` file PNG vừa về, kiểm: cắt đủ nội dung không (đường giá/nhãn có bị cụt ở cạnh không), có dính nhãn panel bên cạnh không.
Vấp thật 17/07: panel 2 cắt `y:535,h:250` → **cụt đuôi đường giá phá lên** → nới `y:512,h:278` mới trọn. Vùng crop luôn phải rộng hơn bounding box của Vector, không bám sát mép.

---

## 🐞 Sự cố hay gặp

| Triệu chứng | Nguyên nhân THẬT | Xử lý |
|---|---|---|
| `Failed to fetch` trong `figma_execute` | Cổng chưa có trong `allowedDomains` (`http://localhost` ≠ `:8777`) | Mục 2 + re-import plugin |
| `403 Token expired` ở `figma_get_file_data` | Token REST hết hạn | **Kệ nó** — dùng đường plugin (mục 3-4). Chỉ REST mới cần token |
| `no plugin connected`, server nhảy cổng **9224** | Tiến trình `figma-console-mcp` cũ mồ côi chiếm 9223 | `pgrep -fl figma-console-mcp` → `kill` các PID cũ (giữ PID mới nhất) → `figma_reconnect` |
| Plugin vẫn không nối sau khi dọn cổng | Plugin cũ chỉ quét 9223, không quét dải 9223-9232 | Re-import manifest (mục 2 làm luôn một thể) |
| Page rác `__tmp_export__` còn trong file | Export lỗi giữa chừng, thiếu `finally` | Xoá tay + thêm `try/finally` |

## Changelog
- 2026-07-17: Tạo file. Đúc từ "Hộp chữ nhật Bài 1": token REST hết hạn nhưng vẫn export đủ 4 asset qua plugin → **POST localhost là đường chuẩn, REST là đường phụ**. Ghi luôn bẫy `allowedDomains` không khớp cổng, cách cắt vùng bằng page tạm + `finally`, và bẫy crop sát mép làm cụt hình.
