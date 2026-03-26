const crypto = require("crypto");
const path = require("path");

const express = require("express");
const QRCode = require("qrcode");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "1mb" }));
app.use(
  "/vendor/fingerprintjs",
  express.static(path.join(__dirname, "node_modules", "@fingerprintjs", "fingerprintjs", "dist"))
);
app.use(express.static(path.join(__dirname, "public")));

// In-memory store for demo use. Replace with a database for production.
const sessions = new Map();

app.get("/health", (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.post("/api/generate", async (req, res) => {
  try {
    const token = crypto.randomUUID();
    const checkinUrl = `${req.protocol}://${req.get("host")}/checkin/${token}`;
    const qrDataUrl = await QRCode.toDataURL(checkinUrl, {
      width: 320,
      margin: 2,
      errorCorrectionLevel: "M"
    });

    sessions.set(token, {
      token,
      createdAt: new Date().toISOString(),
      records: []
    });

    res.json({ token, checkinUrl, qrDataUrl });
  } catch (error) {
    res.status(500).json({ error: "Khong tao duoc ma QR", detail: error.message });
  }
});

app.get("/checkin/:token", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "checkin.html"));
});

app.post("/api/checkin/:token", (req, res) => {
  const { token } = req.params;
  const session = sessions.get(token);

  if (!session) {
    return res.status(404).json({ error: "Ma diem danh khong hop le hoac da het han." });
  }

  const record = {
    submittedAt: new Date().toISOString(),
    ip: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    userAgent: req.get("user-agent") || "unknown",
    payload: req.body || {}
  };

  session.records.push(record);

  return res.json({
    status: "ok",
    token,
    record
  });
});

app.get("/api/records/:token", (req, res) => {
  const { token } = req.params;
  const session = sessions.get(token);

  if (!session) {
    return res.status(404).json({ error: "Khong tim thay phien diem danh." });
  }

  return res.json(session);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
