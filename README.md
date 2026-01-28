# Online Chess

**Online Chess** to gra szachowa online napisana w **React**, z wykorzystaniem **TailwindCSS** do stylowania, **Socket.IO** do komunikacji w czasie rzeczywistym i **chess.js / chessboardjsx** do logiki i wyświetlania planszy.  

Projekt umożliwia:  

- Tworzenie i dołączanie do meczów online  
- Wybór strony (White, Black lub losowo)  
- Ustalanie czasu gry przed rozpoczęciem  
- Walidację ruchów po stronie serwera  
- Wyświetlanie, czyj jest ruch  
- Live zegary dla obu graczy  
- Obracanie planszy zgodnie z kolorem gracza  

---

## Spis treści

- [Technologie](#technologie)  
- [Instalacja](#instalacja)  
- [Uruchomienie](#uruchomienie)  
- [Funkcje](#funkcje)  
- [Screenshoty](#screenshoty)  
- [Struktura projektu](#struktura-projektu)  
- [Kontrybucja](#kontrybucja)  

---

## Technologie

- **Frontend:** React, TailwindCSS, chessboardjsx  
- **Backend:** Node.js, Express, Socket.IO, chess.js  
- **Komunikacja w czasie rzeczywistym:** WebSocket (Socket.IO)  

---

## Instalacja

1. Sklonuj repozytorium:

```bash
git clone <URL_REPOZYTORIUM>
cd online_chess
```
2. Zainstaluj zależności backendu:
```bash
cd server
npm install
```
3. Zainstaluj zależności frontendu:
```bash
cd ../client
npm install
```
Uwaga: front-end został stworzony przy użyciu Create React App.

### Uruchomienie

1. Uruchom backend:
```bash
cd server
node index.js
```
Serwer będzie dostępny na http://localhost:3001.

2. Uruchom frontend:
```bash
cd client
npm start
```
Frontend uruchomi się na http://localhost:3000.

Funkcje
Tworzenie gry
Wybierz czas gry (minuty)

Wybierz stronę: White, Black, lub Random

Kliknij Create Game → otrzymasz ID meczu

Dołączanie do gry
Wpisz ID meczu w polu Game ID

Kliknij Join Game

Rozgrywka
Plansza obraca się automatycznie: gracz białymi widzi białe u dołu, czarnymi – czarne u dołu

Walidacja ruchów odbywa się po stronie serwera

Zegar odlicza czas każdego gracza na żywo

Wyświetla się, czyj jest ruch oraz Twój kolor

Screenshoty
Initial state (przed utworzeniem gry)

Tworzenie gry – białe

Tworzenie gry – czarne

Kod meczu / dołączanie

Struktura projektu
online_chess/
├─ client/               # Frontend React
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ index.js
│  │  └─ index.css
│  ├─ assets/            # screenshoty: initialState.png, whiteGame.png, blackGame.png, gameCode.png
│  ├─ package.json
│  └─ tailwind.config.js
└─ server/               # Backend Node.js
   ├─ index.js
   └─ package.json
Kontrybucja
Sklonuj repozytorium i utwórz nową gałąź:

git checkout -b feature/my-feature
Wprowadź zmiany, commituj i wypchnij:

git add .
git commit -m "Opis zmian"
git push origin feature/my-feature
Utwórz Pull Request na GitHub.

Licencja
MIT License – możesz używać, modyfikować i rozpowszechniać projekt.
