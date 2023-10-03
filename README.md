# [WA.works](https://wa.works/) praksisoppgave
> *Høst semester 2023*

## 📝 Oppgavetekst

### ➡️ Oppgave 1
1. Lag en webside som viser en tabell av informasjon fra et API online.
> 1.5. API-kravspesifikasjon:  
> 1. Støtte for pagination i api'et  
> 2. Støtte for en søk funksjon  
> 3. Bonus om api'et har filter / sortering

2. Må kunne sortere hver tabellheader utifra ascending/descending ved trykk.

3. Lett mulighet for filtrering på tabellen. 
> 3.5. Bonus om man bare henter riktig data fra databasen.

4. Det skal gå an å gå inn på hvert item for å få mer detaljer om daten.
> 4.5. Bonus om ekstradata hentes kun når det trengs / skal vises

5. Legg til støtte for pagination, gjennom å bruke api'et.

### ➡️ Oppgave 2
Sett opp ett .NET REST api prosjekt. Dette må kunne koble seg på en postgresql database. Helst med code first logikk, og bruke migrations for å gjøre endringer på databasen. For å snakke med databasen brukes Entity Framework og LINQ.

Legg til filmer i databasen. Dette kan gjøres på følgende 2 måter:
1. Ved å kjøre en migration og legge til dummy data

2. Gjøre ett api kall til api'et fra oppgave 1, og så lagre det i deres egne databasee.

Erstatt api-kallene i oppgave 1, med deres egne kall. API'et skal ha støtte for pagination og alt annet dere har brukt. Når kan dere også legge til støtte for sortering.

Legg til støtte for å kunne legge til og slette filmer i databasen.

Lag en enkel innloggingsside og autentisering på nettsiden.

> Bonus: Legg gjerne til Swagger i oppgaven, da dette er noe som er veldig vanlig å bruke.

## 🏗️ Teknologier
Ettersom vi skulle bruke React i oppgave 1 så har vi valgt å bruke Vite React med Typescript for dette prosjektet.

I oppgave 2 bruker vi C# med dotNET rammeverket, og har PostgreSQL database i en Docker-container. 

## 🛠️ Hvordan kjøre lokalt

### Frontend
1. [NodeJS](https://nodejs.org/en) må være installert
2. Klon prosjektet og gå inn i frontend-mappen
   ```ts
   git clone https://github.com/SindreKjelsrud/Cinemateket.git
   cd Cinemateket/frontend
   ```
3. Installer nødvendige pakker med: `npm install`
4. For å kjøre prosjektet bruk: `npm run dev`

### Backend
1. Følgende teknologier må være installert:
   - [dotNET](https://dotnet.microsoft.com/en-us/)
   - [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. Klon prosjektet og gå inn i backend-mappen
   ```c#
   git clone https://github.com/SindreKjelsrud/Cinemateket.git
   cd Cinemateket/backend
   ```
3. For å sette opp resten så kan du kjøre: `bash start.sh` 