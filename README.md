# NFC Writer & Reader App

Aplikasi berbasis Next.js (React 19) untuk membaca dan menulis data ke tag NFC (Near Field Communication) menggunakan Web NFC API [Lanjut baca >](https://developer.mozilla.org/en-US/docs/Web/API/NDEFReader).



----
## Fitur Utama
-  **Write NFC Tag**  
    Menulis data ke tag NFC dengan berbagai tipe record:
    - Text
    - URL / Absolute URL
    - MIME (application/json)
- **Read NFC Tag**  
    Membaca dan menampilkan data dari tag NFC yang ditempelkan ke perangkat.
- **Dynamic Record Options**  
    Opsi media type dan record type disesuaikan otomatis berdasarkan pilihan pengguna.
- **Auto JSON Format**  
    Menulis data dalam format JSON saat `recordType = mime` dan `mediaType = application/json`.

---
## Teknologi yang Digunakan

| Teknologi       | Deskripsi                             |
| --------------- | ------------------------------------- |
| **Next.js 15**  | Framework React modern untuk web apps |
| **Web NFC API** | API native browser untuk NFC          |
| **TailwindCSS** | Styling responsif dan modern          |

---
## Instalasi

1. **Clone repositori ini**
    `git clone https://github.com/Faishal21ahmad/nfc-card-r-w.git`
2. **Install dependencies**
    `npm install`
3. **Jalankan di mode pengembangan**
    `npm run dev`
4. **Buka di browser:**
    👉 [http://localhost:3000](http://localhost:3000)
5.  **Buka di SmartPhone**
    gunakan ngrok karena membutuhkan https://
	`ngrok http http://localhost:3000`