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

Sett opp ett .NET REST API prosjekt. Dette må kunne koble seg på en PostgreSQL database. Helst med code first logikk, og bruke migrations for å gjøre endringer på databasen. For å snakke med databasen brukes Entity Framework og LINQ.

Legg til filmer i databasen. Dette kan gjøres på følgende 2 måter:
1. Ved å kjøre en migration og legge til dummy data

2. Gjøre ett API kall til API'et fra oppgave 1, og så lagre det i deres egne databasee.

Erstatt API-kallene i oppgave 1, med deres egne kall. API'et skal ha støtte for pagination og alt annet dere har brukt. Nå kan dere også legge til støtte for sortering.

Legg til støtte for å kunne legge til og slette filmer i databasen.

> Bonus: Legg gjerne til Swagger i oppgaven, da dette er noe som er veldig vanlig å bruke.

## 🏗️ Teknologier

Ettersom vi skulle bruke React i oppgave 1 så har vi valgt å bruke Vite React med Typescript for dette prosjektet.

I oppgave 2 bruker vi C# med dotNET rammeverket, og har PostgreSQL database i en Docker-container. 

## 🛠️ Hvordan kjøre lokalt

1. Følgende teknologier må være installert:
   - [dotNET](https://dotnet.microsoft.com/en-us/)
   - [Docker](https://www.docker.com/) eller [Docker Desktop](https://www.docker.com/products/docker-desktop/)
  
2. Klon prosjektet: `git clone https://github.com/SindreKjelsrud/Cinemateket.git`
 
3. For å sette opp resten så kan du kjøre: `bash start.sh`

> Dette setter opp både frontenden og backenden for deg.

## 📸 Figma sketch

![Figma sketch](https://github.com/SindreKjelsrud/Cinemateket/assets/93219711/9dbfa147-5c75-4413-bad9-54f8af0a141d)


## 🎥 Demo

https://github.com/SindreKjelsrud/Cinemateket/assets/93219711/622486c6-4c1b-468c-97c2-49e19ff22905
