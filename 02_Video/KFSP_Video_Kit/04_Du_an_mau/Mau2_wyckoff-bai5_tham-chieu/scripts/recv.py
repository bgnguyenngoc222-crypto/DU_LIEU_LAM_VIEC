#!/usr/bin/env python3
# recv.py — nhận PNG plugin Figma POST tới, ghi thẳng vào remotion/public/
import http.server, os, urllib.parse
OUT = os.path.expanduser("~/Desktop/VIDEO KFSP/20260730-cktt-wyckoff-bai5/remotion/public")

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
        print(f"OK {name}: {len(data)} bytes", flush=True)
        self.send_response(200); self._cors(); self.end_headers(); self.wfile.write(b"ok")
    def log_message(self, *a): pass

http.server.HTTPServer(("127.0.0.1", 8777), H).serve_forever()
