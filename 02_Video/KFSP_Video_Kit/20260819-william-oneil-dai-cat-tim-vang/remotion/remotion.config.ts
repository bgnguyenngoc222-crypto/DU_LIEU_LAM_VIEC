import { Config } from "@remotion/cli/config";

// Bắt buộc khi có cảnh 3D (@remotion/three) — không có dòng này thì render báo lỗi
// "You might need to set the OpenGL renderer to angle".
Config.setChromiumOpenGlRenderer("angle");
