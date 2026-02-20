# UI Visual QA Checklist (Astro + DaisyUI)

## Scope
Checklist ini untuk branch `feat/ui-visual-refresh` setelah 3 fase UI refresh:
- foundation visuals + homepage/header
- blog archive/detail/footer polish
- motion + responsive + focus accessibility polish

## Automated Verification Status
- [x] `pnpm astro check` passed (0 error)
- [x] `pnpm run build` passed (static routes + pagefind)
- [x] Theme token usage tetap berbasis DaisyUI semantic classes (`base-*`, `primary/secondary/accent`)

## Manual Visual Checklist

### 1. Home (`/`)
- [ ] Hero card: gradient glow tidak mengganggu readability di semua tema.
- [ ] Featured section: image crop stabil dan tidak stretch.
- [ ] Latest cards: hover lift halus, tidak jitter di mobile.
- [ ] CTA buttons: contrast dan tap target nyaman (>=44px visual area).

### 2. Blog Archive (`/blog`)
- [ ] Archive hero terlihat proporsional desktop/mobile.
- [ ] Grid post card tidak collapse pada 1/2/3 kolom.
- [ ] Pagination card tampil rapi dan state disabled jelas.

### 3. Blog Detail (`/blog/[slug]`)
- [ ] Panel article (glass) tetap terbaca di tema gelap/terang.
- [ ] TOC sticky panel tidak overlap dengan header.
- [ ] Share panel + Topics panel spacing konsisten.
- [ ] Prev/Next card alignment bagus di mobile dan desktop.

### 4. Header + Navigation (semua halaman)
- [ ] Sticky header glass tidak menutupi konten saat scroll.
- [ ] Dropdown categories terbuka penuh, tidak terpotong viewport.
- [ ] Search button + Theme button tetap reachable di mobile.
- [ ] Keyboard navigation: tab order masuk akal.

### 5. Search Modal (`Cmd/Ctrl + K`)
- [ ] Modal membuka/menutup tanpa flicker.
- [ ] Close button mudah diakses keyboard.
- [ ] Empty/dev fallback message tampil jelas.

### 6. Theme Switching
- [ ] Ubah tema dari dropdown dan reload halaman -> tema persist.
- [ ] Active state theme button sinkron setelah navigasi antar halaman.
- [ ] Tidak ada flash warna berlebihan saat transisi halaman.

### 7. Accessibility
- [ ] Focus ring (`:focus-visible`) terlihat di link/button utama.
- [ ] Kontras teks sekunder masih terbaca di tema high-saturation.
- [ ] Motion terasa halus; pada `prefers-reduced-motion` animasi minim.

### 8. Footer
- [ ] 3 kolom stack normal di mobile.
- [ ] Link hover terlihat jelas.
- [ ] Teks deskripsi tidak terlalu panjang di viewport sempit.

## High-Risk Visual Areas to Spot Check First
1. Theme ekstrem: `wireframe`, `synthwave`, `black`, `cupcake`.
2. Viewport: `360x800`, `768x1024`, `1440x900`.
3. Long-title posts di featured + archive card.

## Suggested Quick QA Run Order (10-12 menit)
1. Home in `light` and `dark`.
2. Blog archive in `synthwave` and `wireframe`.
3. One detail page in `black` and `cupcake`.
4. Keyboard-only pass (tab + enter + esc).
5. Mobile width pass (360px).

## Notes
- Build warning `Unknown at rule: @property` berasal dari pipeline CSS dependency (bukan blocker runtime UI).
- Untuk review visual final, gunakan branch ini dan compare dengan `main`.
