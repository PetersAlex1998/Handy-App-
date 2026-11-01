# Mein Alltag – Essen & Einkauf

Persönliche Handy-App (PWA) nur für das Thema Ernährung: Wochenplan, Rezepte, Einkaufsliste (unbedingt kaufen / wahrscheinlich vorrätig, gleiche Zutaten werden zusammengerechnet) und Einkaufsmodus im Laden.

## Dateien
- `index.html` – Gerüst, `style.css` – Design, `app.js` – Logik, `catalog.js` – Zutatenkatalog und Rezeptvorlagen
- `sw.js`, `manifest.json`, `icons/` – Offline und Installation auf dem Handy

## Daten
Alles liegt nur im Browser des Handys (localStorage), nichts wird gesendet. Unter „Mehr“ gibt es die Datensicherung. Frühere Daten (Aufgaben, Gewohnheiten, Notizen …) bleiben unangetastet gespeichert und sind in der Sicherung enthalten.
