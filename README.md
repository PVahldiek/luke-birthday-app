# Luke's Birthday Mission 🐾

Eine kleine, persönliche Angular-Web-App als Geburtstagsüberraschung. Die App führt durch Lukes Nachricht, vier Trick-Prüfungen und einen geheimen Lieferstatus. **Sie verrät nicht, was im Geschenkpaket ist.** Am Ende fordert sie dazu auf, Luke persönlich abzuholen.

## Lokal starten

Voraussetzung: Node.js 20.19+ (oder eine von Angular 20 unterstützte aktuelle Node-Version).

```bash
npm install
npm start
```

Dann `http://localhost:4200` öffnen.

## Für Cloudflare Pages veröffentlichen

1. Dieses Projekt in ein GitHub-Repository hochladen.
2. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** auswählen.
3. Repository verbinden und folgende Build-Einstellungen setzen:
   - Framework preset: **Angular** (falls angeboten), sonst **None**
   - Build command: `npm run build`
   - Build output directory: `dist/luke-birthday-mission/browser`
   - Root directory: `/`
4. Deploy starten. Cloudflare baut die App bei jedem Push neu.

Alternativ lokal bauen mit `npm run build` und den Inhalt von `dist/luke-birthday-mission/browser` als statische Website deployen.

## Luke-Fotos und Videos personalisieren

Die App funktioniert direkt ohne eigene Medien. Für eine persönlichere Version kannst du Fotos und kurze Clips in `src/assets/` ablegen.

Empfohlene Medien:
- `luke-start.jpg` – Luke mit ernstem / lustigem Blick für den Startbildschirm
- `luke-message.mp4` – kurzes Video für die emotionale Nachricht
- `luke-pfoetchen.mp4`, `luke-highfive.mp4`, `luke-sitz.mp4`, `luke-platz.mp4` – je ein kurzer Trick-Clip
- `luke-delivery.mp4` – Luke mit dem Geschenk im Maul oder neben dem Paket

Die Platzhalter-Illustrationen in `src/app/app.component.ts` kannst du durch `<img src="assets/luke-start.jpg">` bzw. `<video controls playsinline src="assets/luke-pfoetchen.mp4"></video>` ersetzen. Bei Videos am besten MP4 (H.264), kurze Clips und möglichst unter 10–15 MB verwenden.

## Texte anpassen

Alle Texte, Aufgaben und Lieferstatus-Meldungen findest du zentral in `src/app/app.component.ts`:
- `tricks`
- `deliverySteps`
- `deliveryMessages`
- `deliveryButtons`

## Hinweis zum Ablauf

Die vier Trick-Aufgaben werden in der App per Tap als erledigt markiert. Der Lieferstatus ist bewusst eine kleine inszenierte Animation per Button – kein echtes Live-Tracking. So kannst du die Schritte passend zum echten Moment mit Luke und dem Geschenk timen.
