# Mystic Realms — Plan Dezvoltare

## Stadiu Actual

### Completat ✅
- **FAZA 1-10**: Balansare structuri, upgrade-uri, gardieni, ascensiune, recompense zilnice, boss-uri, gem sinks, puzzle rewards
- **Teste**: 325/327 trecute, 2 warnings (mana payback by design)
- **Rebalansare Puzzle**: Scoring per grup, combo linear, scaling progresiv
- **PWA**: manifest.json, sw.js, meta tags iOS/Android, service worker registration, offline support
- **Achievements**: 30 achievement-uri pe 5 categorii (Progres, Puzzle, Colecție, Timp, Speciale) cu UI de filtrare
- **Mobile-friendly**: Footer, header, grids, toate secțiunile responsive pe telefon
- **Daily Rewards + Streak**: 7 zile, recompense crescătoare, calendar UI, streak counter

### Jocul acum
- Core idle loop funcțional (energie, mană, cristale)
- Puzzle match-3 cu dificultate progresivă
- 7 structuri (5 energy, 2 mana) + 5 volcano structuri
- 13 gardieni (8 forest, 5 volcano) cu bonus multiplicativ
- 6 upgrade-uri cu max levels
- 5 boss-uri cu puzzle-uri custom
- Sistem de ascendenta (prestige)
- Auto-puzzle, hint-uri, extra moves
- Offline progression (60%, max 12h)

---

## Plan Dezvoltare — Viitor

### Faza 1: Fundație (Săptămâna 1-2)

#### 1.1 PWA (Progressive Web App)
**Scop**: Jocul se instalează pe telefon din browser, rulează ca aplicație nativă.
- [x] Creare `manifest.json` cu iconițe, name, theme_color
- [x] Creare `sw.js` (service worker) pentru cache și offline
- [x] Înregistrare service worker în `index.html`
- [x] Adăugare meta tags pentru iOS/Android (apple-mobile-web-app, viewport)
- [x] Testare: instalare pe telefon, funcționare offline

**Resurse necesare**: Fișiere icon (192x192, 512x512) — placeholder-uri create, de înlocuit cu iconițe reale
**Dependențe**: Niciuna

#### 1.2 Firebase — Autentificare + Save Cloud
**Scop**: Conturi utilizatori, save în cloud, sincronizare dispozitive.
- [ ] Creare proiect Firebase (free tier)
- [ ] Integrare Firebase SDK (versiune modulară, din CDN)
- [ ] Autentificare: Google Sign-In + Anonymous
- [ ] Structură Firestore: `users/{uid}/gameState`
- [ ] Migrare `saveGame()` / `loadGame()` → Firestore
- [ ] Sync la login, periodic la fiecare 5 min
- [ ] Fallback: localStorage când offline

**Structură date Firestore**:
```
users/
  {uid}/
    gameState: { ...tot state-ul jocului... }
    stats: { totalPlaytime, puzzlesCompleted, ... }
    settings: { sound, music, ... }
```

**Dependențe**: PWA (1.1)

#### 1.3 Achievement-uri
**Scop**: Motivație pe termen lung, milestone-uri vizibile.
- [x] Definire 25-30 achievement-uri în `achievementData` (30 implementate)
- [x] Categorii: Progres, Puzzle, Colecție, Timp, Speciale
- [x] Sistem de tracking (eventuri în game.js)
- [x] UI: modal achievement-uri, notificare la deblocare, filtrare pe categorii
- [x] Recompense: gems, crystals

**Dependențe**: Firebase (1.2) pentru persistență

---

### Faza 2: Retenție (Săptămâna 3-4)

#### 2.1 Quest-uri Zilnice/Săptămânale
**Scop**: Motive zilnice să te întorci în joc.
- [ ] 3 quest-uri zilnice (se reînoiesc la 00:00)
- [ ] 1 quest săptămânal (recompensă mare)
- [ ] Quest-uri generate din pool-uri de sarcini
- [ ] Progress tracking în UI
- [ ] Claim rewards cu animație

**Tipuri de quest-uri**:
```
- "Colectează X energie" (auto-collect sau manual)
- "Câștigă X puzzle-uri"
- "Folosește X combo-uri"
- "Cumpără X structuri"
- "Invincă un boss"
- "Folosește X mutări extra"
```

**Dependențe**: Firebase (1.2)

#### 2.2 Streak-uri + Calendar Login
**Scop**: Recompensă pentru logare consecutivă.
- [x] Streak counter (zile consecutive)
- [x] Recompense crescătoare (ziua 7 = epic guardian)
- [x] Dacă pierzi o zi, streak-ul se resetează parțial
- [x] UI: calendar cu preview recompense

**Dependențe**: Quest-uri (2.1)

#### 2.3 Event-uri Simple
**Scop**: Conținut proaspăt fără update mare.
- [ ] Weekend Double Gems (vin-dum, 2x puzzle gems)
- [ ] Puzzle Challenge (target scoring crescut, recompense duble)
- [ ] Boss Rush (3 boss-uri consecutiv, reward bonus)
- [ ] Time-limited guardian (apare doar în weekend)

**Dependențe**: Firebase (1.2) pentru config server-side

---

### Faza 3: Social + Monetizare (Luna 2)

#### 3.1 Leaderboard Global + Prieteni
**Scop**: Competiție socială.
- [ ] Leaderboard global: lifetime energy, puzzles completed, boss kills
- [ ] Leaderboard prieteni (Firebase friends system)
- [ ] Weekly ranking cu recompense top 10/50/100
- [ ] UI: tab-leaderboard în footer/header

**Dependențe**: Firebase (1.2)

#### 3.2 Monetizare — Ads (Recompensate)
**Scop**: Venit fără a enerva jucătorul.
- [ ] Integrare Google AdMob (sau alternativă web: AdSense)
- [ ] DOAR rewarded ads (nu popup-uri enervante):
  - "Vezi ad → 2x productie 30 min"
  - "Vezi ad → +10 gems gratis"
  - "Vezi ad → extra move gratuit"
- [ ] Max 5 ads/zi (limită pentru experiență bună)
- [ ] Opțiune "Remove Ads" — IAP $2.99

**Dependențe**: PWA (1.1)

#### 3.3 Monetizare — IAP (In-App Purchases)
**Scop**: Venit de la jucătorii dedicați.
- [ ] **Starter Pack**: $1.99 — 500 gems + legendary guardian + 10K energy (one-time)
- [ ] **Gems Pack**: $0.99 — 200 gems, $2.99 — 1000 gems, $4.99 — 5000 gems
- [ ] **Cosmetics**: skin-uri gardieni ($0.99 fiecare, fără gameplay bonus)
- [ ] **Season Pass**: $4.99/sezon (30 zile) — track cu recompense premium
- [ ] **Remove Ads**: $2.99

**Principii**:
- ❌ NU pay-to-win (nu poți cumpăra upgrade-uri de producție)
- ✅ DOAR cosmetic + conveniență + boost temporar
- ✅ Tot eachievabil free-to-play, doar mai încet

**Dependențe**: Ads (3.2)

---

### Faza 4: Scalare (Luna 3+)

#### 4.1 Al 2-lea Dimension de Prestige — "Volcano Crystals" au un prestige al lor
- [ ] Sistem de "Volcano Ascension" — reseteză volcano structuri + cristale
- [ ] Recompense: "Magma Cores" (noua valută de prestigiu)
- [ ] Magma Coes deblochează upgrade-uri permanente puternice
- [ ] Fiecare volcano ascendenta crește dificultatea boss-urilor volcano

#### 4.2 Season Pass Gratuit (Free Track)
**Scop**: Progres pe termen lung fără cost.
- [ ] Track de 30 niveluri (recompense la fiecare nivel)
- [ ] XP câștigat din: puzzle-uri, quest-uri, boss-uri
- [ ] Free track: gems, energy, crystals
- [ ] Premium track ($4.99): exclusive skins, guardians, cosmetics

#### 4.3 Puzzle Generation Procedurală
**Scop**: Provocări infinite, fără monotonie.
- [ ] Puzzle-uri speciale cu reguli noi:
  - "Frozen tiles" (deblochează prin match-uri adiacente)
  - "Bomb tiles" (distrug 3x3 la match)
  - "Color shift" (culorile se schimbă la fiecare 3 move-uri)
- [ ] Daily puzzle challenge (aceelași pentru toți jucătorii)
- [ ] Weekly puzzle tournament (scor competitiv)

#### 4.4 Conținut Nou
- [ ] **Structuri noi**: 3-4 structuri energy, 2-3 mana
- [ ] **Gardieni noi**: 5-10 gardieni cu abilități unice
- [ ] **Boss noi**: 3-5 boss-uri cu mecanici noi
- [ ] **Story mode**: 10-15 capitole cu narrative scurt
- [ ] **Achievement-uri noi**: 15-20 achievement-uri suplimentare

---

## Ordine de Prioritate

| # | Feature | Impact | Efort | Prioritate | Status |
|---|---------|--------|-------|------------|--------|
| 1 | PWA | Ridicat | Mic | 🔴 HIGH | ✅ COMPLET |
| 2 | Firebase Auth + Save | Ridicat | Mediu | 🔴 HIGH | ⬜ TODO |
| 3 | Achievement-uri | Mediu | Mic | 🟡 MEDIUM | ✅ COMPLET |
| 4 | Quest-uri | Mediu | Mediu | 🟡 MEDIUM | ⬜ TODO |
| 5 | Leaderboard | Mediu | Mic | 🟡 MEDIUM | ⬜ TODO |
| 6 | Ads (Recompensate) | Ridicat | Mediu | 🟡 MEDIUM | ⬜ TODO |
| 7 | IAP | Ridicat | Mare | 🟢 LOW (după validare) | ⬜ TODO |
| 8 | Streak-uri | Mic | Mic | 🟢 LOW | ✅ COMPLET |
| 9 | Event-uri | Mediu | Mediu | 🟢 LOW | ⬜ TODO |
| 10 | Prestige layer 2 | Ridicat | Mare | 🟢 LOW (luna 3) | ⬜ TODO |

---

## Decizii Tehnice

### Platformă
- **Web first** (browser) — distribuție instantă, fără app store
- **PWA** — instalabil pe telefon, offline support
- **Firebase** — backend free tier (auth, firestore, hosting)

### Stack
- **Frontend**: Vanilla JS (existent), CSS, HTML
- **Backend**: Firebase (auth, firestore, functions dacă e nevoie)
- **Hosting**: Firebase Hosting (free tier) sau GitHub Pages
- **Analytics**: Firebase Analytics (free)

### Monetizare
- **Google AdMob** (web) sau **AdSense** pentru rewarded ads
- **Stripe** sau **Paddle** pentru IAP web-based
- **RevenueCat** dacă facem și mobil nativ

---

## Metrici de Succes

| Metrică | Target Luna 1 | Target Luna 3 | Target Luna 6 |
|---------|---------------|---------------|---------------|
| DAU (Daily Active Users) | 50 | 500 | 2000 |
| Retenție D1 | 40% | 45% | 50% |
| Retenție D7 | 15% | 20% | 25% |
| Retenție D30 | 5% | 10% | 15% |
| Session length | 5 min | 8 min | 12 min |
| Sessions/day | 2 | 3 | 4 |
| Ad ARPU | - | $0.01 | $0.02 |
| IAP conversion | - | 1% | 2% |

---

## Sugestii Noi (neincluse în plan)

### S1. Crafting System
**Scop**: Conversie resurse în obiecte speciale, sink pentru resurse surplus.
- Cristale + Gems → **Enchantments** (boost temporar 1h: +50% productie)
- Energie + Mana → **Elixirs** (revendicabile oricând, efect instant)
- **Recipes** deblocate prin achievements sau level
- Ar adăuga o dimensiune strategică: "folosesc cristalele acum sau le păstrez pentru crafting?"

### S2. Guild/Clan System (fără Firebase)
**Scop**: Comunitate chiar și fără backend.
- **Guild locală**: jucătorul creează un "clan" cu nume + emblemă
- **Guild goals**: "Colectează 1M energie în 7 zile" → recompense pentru toți membrii
- **Friendly leaderboard**: compară scoruri cu prietenii prin share link (URL cu date codificate)
- Ar crește retenția fără complexitatea unui backend real

### S3. Prestige Shop
**Scop**: Mai multe motive să faci ascendenta.
- **Ascension Points** (există deja în state) → pot fi cheltuiți într-un shop special
- Upgrade-uri exclusive: +10% productie per point, deblocare structuri speciale
- Ar face prestige-ul mai atrăgător decât simplul reset

### S4. Time Warp (Speed Up)
**Scop**: Recompensă pentru jucătorii activi.
- După X puzzle-uri completate într-o sesiune, deblochează **2x Speed** timp de 5 min
- Vizual: animation加速 pe structuri, energy flow mai rapid
- Ar încuraja sesiuni mai lungi

### S5. Puzzle Themes / Skins
**Scop**: Personalizare vizuală, sink pentru gems.
- **Board skins**: fundaluri diferite (ice, fire, cosmic) — cumpărate cu gems
- **Gem colors**: culori noi pentru match-uri (deblocate prin achievements)
- Fără impact gameplay, doar estetic — jucătorii iubesc personalizarea

### S6. Mini-Events Random
**Scop**: Surpriză și varietate.
- **Golden Tile**: o tile aurie apare random pe puzzle → match = 10x scor
- **Lucky Spin**: o dată pe zi, rotește o roată cu recompense
- **Mystery Box**: apar la fiecare 10 puzzle-uri completate
- Nu necesită Firebase, totul client-side

### S7. Export/Import + Sharing
**Scop**: Backup și social sharing.
- **Share build**: generează un link cu build-ul curent (structuri, gardieni, level)
- **Leaderboard informal**: prietenii pot importa build-ul tău și compara progresul
- Ar putea genera trafic organic

---

## Note Importante

1. **Jocul e hybrid (idle + puzzle)** — asta e nișa noastră. Piața nu e suprasaturată de hybrid-uri.
2. **Nu face pay-to-win** — jucătorii free-to-play trebuie să poată progresa normal.
3. **Puzzle-ul trebuie să provoace** — nu trebuie să fie trivial. Dificultatea progresivă e cheia.
4. **Social = retenție** — leaderboardul și quest-urile aduc jucătorii înapoi.
5. **Testează tot** — rulează `node tests/balance-audit.js` după fiecare schimbare majoră.
