# Mein Alltag – Essen & Einkauf

Persönliche Handy-App (PWA) nur für das Thema Ernährung: Wochenplan, Rezepte, Einkaufsliste (unbedingt kaufen / wahrscheinlich vorrätig, gleiche Zutaten werden zusammengerechnet) und Einkaufsmodus im Laden.

## Dateien
- `index.html` – Gerüst, `style.css` – Design, `app.js` – Logik, `catalog.js` – Zutatenkatalog und Rezeptvorlagen
- `sw.js`, `manifest.json`, `icons/` – Offline und Installation auf dem Handy

## Gemeinsame Sicht
Mit einem gemeinsamen Zugang (Supabase, Server Frankfurt) sehen mehrere Handys dieselben Daten. Die App gleicht Änderungen pro Eintrag ab, funktioniert offline weiter und holt Änderungen beim Öffnen und alle 30 Sekunden. Einrichtung: `supabase/setup.sql` ausführen, Registrierung abschalten, Benutzer anlegen. Die Schrift Poppins liegt lokal in `fonts/`.

## Daten
Alles liegt nur im Browser des Handys (localStorage), nichts wird gesendet. Unter „Mehr“ gibt es die Datensicherung. Frühere Daten (Aufgaben, Gewohnheiten, Notizen …) bleiben unangetastet gespeichert und sind in der Sicherung enthalten.

## Hinweis
Private Familien-App für Essensplanung. Die Daten liegen nicht in diesem Repository.
