# Astro + DaisyUI Template Hardening Plan

## Context
Template saat ini sudah bisa `dev`, tapi masih ada gap arsitektur untuk dipakai sebagai template umum:
- fitur global belum terpasang penuh (search modal tidak dimount)
- theme switching masih punya edge-case runtime
- beberapa script menambah listener berulang saat navigasi client-side
- strict typecheck belum clean
- build OG image masih bergantung jaringan eksternal
- runtime Node belum dipin agar lintas mesin konsisten

## Goals
1. Semua fitur global (search, theme, scroll UX) stabil di initial load dan saat view transition.
2. `pnpm astro check` clean (0 error) atau minimal tanpa blocker runtime.
3. `pnpm build` lebih deterministik dan tidak mudah gagal karena network untuk OG image.
4. Template siap dipakai ulang dengan guardrail versi runtime.

## Phase Breakdown

### Phase 1 — Global UI Wiring & Search Reliability
Scope:
- Mount `SearchModal` di `BaseLayout`.
- Hardening trigger search agar tidak mengandalkan global variable id.

Acceptance:
- Tombol search membuka modal di semua halaman.
- Tidak ada error `search_modal is not defined`.

Commit:
- `fix(ui): wire global search modal and robust trigger`

---

### Phase 2 — Theme Controller Hardening
Scope:
- Perbaiki event handling theme (safe target narrowing).
- Hilangkan pola listener reset berbasis `cloneNode`.
- Buat inisialisasi idempotent untuk navigasi Astro transitions.

Acceptance:
- Theme berubah konsisten saat klik swatch/theme button.
- State active button sinkron setelah navigasi halaman.

Commit:
- `fix(theme): make theme controller navigation-safe and idempotent`

---

### Phase 3 — Client Script Lifecycle Hygiene
Scope:
- Rapikan komponen client (`ScrollToTop`, `ReadingProgress`, `ImageZoom`, `CopyCodeButton`) agar listener tidak duplikat.
- Tambah teardown/guard sesuai kebutuhan.

Acceptance:
- Tidak ada efek dobel event setelah bolak-balik halaman.
- UX tetap sama atau lebih baik.

Commit:
- `fix(client): prevent duplicate listeners across page transitions`

---

### Phase 4 — TypeScript & Runtime Script Correctness
Scope:
- Perbaiki error `astro check` pada `BlogPostLayout`, `Schema`, `Comments`, `og.png.ts` typing.
- Hilangkan syntax TypeScript di browser script biasa.

Acceptance:
- `pnpm astro check` tidak punya error blocker.
- Script browser tidak mengandung syntax invalid.

Commit:
- `fix(types): resolve strict astro check errors and script typing issues`

---

### Phase 5 — Deterministic Build & Runtime Guardrails
Scope:
- Ubah OG image font loading ke lokal (`public/fonts`) agar tidak fetch CDN saat build.
- Tambah pin runtime (`.nvmrc` dan `engines` di `package.json`).

Acceptance:
- Build tidak tergantung fetch font eksternal.
- Developer dapat versi Node yang jelas untuk template.

Commit:
- `build(template): make og generation offline-safe and pin node runtime`

## Validation Strategy
Per phase:
1. Jalankan verifikasi minimal yang relevan.
2. Jika phase menyentuh tipe/build, jalankan `pnpm astro check`.
3. Jalankan `pnpm build` di phase 5 (full check).
4. Commit hanya file phase terkait (hindari include perubahan tak terkait).

## Notes
- Workspace saat ini sudah punya perubahan dependency (`package.json`, `pnpm-lock.yaml`) dari instalasi sebelumnya.
- Commit phase akan selective-staging agar aman terhadap perubahan existing.
