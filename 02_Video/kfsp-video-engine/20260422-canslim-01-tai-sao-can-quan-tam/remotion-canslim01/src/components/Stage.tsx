// Centered content stage within safe zone
import { SAFE_ZONE } from "../design";

export const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      position: "absolute",
      left: SAFE_ZONE.left,
      right: 1080 - SAFE_ZONE.right,
      top: SAFE_ZONE.contentTop,
      height: SAFE_ZONE.contentBottom - SAFE_ZONE.contentTop,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);
