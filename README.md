# NERAKA Portal - React Refactor

Website ini telah direfactor menjadi aplikasi React modern menggunakan Vite.

## Struktur Project

```
src/
 ├─ components/     # Komponen UI (Header, Sidebar, dll)
 ├─ pages/          # Halaman utama (Home)
 ├─ styles/         # CSS Global (main.css)
 ├─ App.jsx         # Root Component
 └─ main.jsx        # Entry Point
```

## Cara Menjalankan (PENTING)

Project ini menggunakan Vite dan React module, sehingga **TIDAK BISA** dijalankan hanya dengan double-click `index.html`. Anda harus menggunakan local server.

### 1. Install Dependencies
Pastikan Node.js sudah terinstall, lalu jalankan perintah ini di terminal dalam folder project:

```bash
npm install
```

### 2. Jalankan Server Development
Untuk melihat website:

```bash
npm run dev
```

Terminal akan menampilkan link lokal (biasanya `http://localhost:5173`). Buka link tersebut di browser.

## Fitur & Perubahan
- **React + Vite:** Performa cepat dan hot reload.
- **Komponen Modular:** UI dipecah menjadi Header, Banner, Sidebar, dll.
- **State Management:** Logic menu mobile, slideshow, dan admin chat menggunakan React Hooks (`useState`, `useEffect`).
- **Cyberpunk Design:** Mempertahankan warna neon, gradient, dan layout responsif.
- **Clean Code:** Struktur folder rapi dan mudah dikembangkan.

## Catatan
- Semua data (member, sponsor) saat ini masih berupa data dummy di dalam komponen.
- Kontak WhatsApp akan mengarah ke `wa.me` sesuai nomor admin yang dipilih.
