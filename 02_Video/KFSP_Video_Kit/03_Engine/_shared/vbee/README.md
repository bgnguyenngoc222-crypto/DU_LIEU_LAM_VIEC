# Vbee TTS — Tài liệu & Cấu hình

## Cấu trúc thư mục

```
vbee/
├── README.md              ← File này
├── vbee.env               ← API credentials + voice đang dùng
└── voices_vi.md           ← Danh sách 24 giọng Việt Nam (đầy đủ)
```

## Thông tin API

- **API Docs:** https://documenter.getpostman.com/view/12951168/Uz5FHbSd
- **App ID:** xem `vbee.env`
- **Token:** xem `vbee.env`

## Voice đang sử dụng

| Biến | Voice code | Tên |
|------|-----------|-----|
| `VBEE_VOICE` | `hn_female_ngochuyen_full_48k-fhg` | HN - Ngọc Huyền (nữ, Bắc) |

## Cách đổi voice

Sửa `VBEE_VOICE` trong `vbee.env`:
```
VBEE_VOICE=n_hanam_male_kfspthanh20260411135755079_education_vc
```

Xem danh sách đầy đủ: `voices_vi.md`

## Lưu ý bảo mật

- File `vbee.env` chứa token API — KHÔNG commit lên git public
- Token có thể hết hạn — liên hệ Vbee để gia hạn
