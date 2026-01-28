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

## Uruchomienie

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

## Funkcje
### Tworzenie gry
- Wybierz czas gry (minuty)
- Wybierz stronę: White, Black, lub Random
- Kliknij Create Game → otrzymasz ID meczu

### Dołączanie do gry
- Wpisz ID meczu w polu Game ID
- Kliknij Join Game

### Rozgrywka
- Plansza obraca się automatycznie: gracz białymi widzi białe u dołu, czarnymi – czarne u dołu
- Walidacja ruchów odbywa się po stronie serwera
- Zegar odlicza czas każdego gracza na żywo
- Wyświetla się, czyj jest ruch oraz Twój kolor

### Screenshoty

Initial state (przed utworzeniem gry)
<img width="1920" height="1080" alt="initialState" src="https://github.com/user-attachments/assets/a2a9ae82-548e-4e3c-824c-6a1560318a36" />

Gra – białe
<img width="1920" height="1080" alt="whiteGame" src="https://github.com/user-attachments/assets/1b259b64-26aa-478e-a147-9c878a031a7a" />

Gra – czarne
<img width="1920" height="1080" alt="blackGame" src="https://github.com/user-attachments/assets/ae6d3fd9-9e9d-46eb-a1a5-f2ab6d43abdc" />

Kod meczu / dołączanie
<img width="1920" height="1080" alt="gameCode" src="https://github.com/user-attachments/assets/a0e49cb2-f141-4ab4-95d8-dbd421e57a56" />

## Licencja
MIT License – możesz używać, modyfikować i rozpowszechniać projekt.
