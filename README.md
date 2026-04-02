# QR Fingerprint Attendance

Ung dung Node.js don gian de diem danh:

- Trang quan tri bam nut tao ma QR.
- Ma QR chua link check-in co token.
- Nguoi dung quet QR de mo trang check-in.
- Trang check-in thu thap browser fingerprint + thong tin thiet bi.
- Trang check-in thu thap them audio fingerprint bang OfflineAudioContext.
- Trang check-in ghi nhan them IP cua thiet bi thong qua server.
- Trang check-in co thu thap them GPS (neu nguoi dung cap quyen vi tri).
- Trang check-in thu thap WebGL info (vendor, renderer, version).
- Trang check-in thu thap Canvas fingerprint bang cach ve tren canvas va lay hash.
- Du lieu gui ve server va hien thi JSON theo thoi gian thuc.

## Chay du an

```bash
npm install
npm start
```

Mo trinh duyet:

- http://localhost:3000

## Luu y

- Du lieu dang luu in-memory, khoi dong lai server se mat.
- Ban nen thong bao ro cho nguoi dung ve viec thu thap thong tin thiet bi truoc khi diem danh.
- IP duoc lay tu request gui len server, nen se phu thuoc vao mang va proxy dang dung.
- Geolocation tren dien thoai thuong can secure context (HTTPS). `localhost` van duoc phep, nhung URL LAN bang HTTP co the bi trinh duyet chan lay GPS.
