# Variabler / Minnesplatser

*Används för att lagra data. Beroende på form av data skapas minnesplatser med anpassning för tänkt datainnehåll.*

## Variabeltyper

| Variabeltyp | Exempel | Förklaring |
|-------------|---------|------------|
| int = heltal | `int a = 2;` | positiva & negativa heltal |
| float = decimaltal | `float b = 2.5f;` | positiva & negativa decimaltal |
| double = decimaltal | `double c = 2.75;` | positiva & negativa decimaltal |
| char = tecken | `char d = 's';` | tecken som finns på tangentbord |
| String = textsträng | `String e = "Java";` | ord eller text |
| boolean = sant eller falskt | `boolean f = true;` | kan endast vara true eller false |

## 💡 Tips

- Skapa gärna alla minnesplatser precis efter `public static void main(String args[])`
- Använd minnesplatsnamn som gör att du förstår vilken form av innehåll som lagras i minnesplatsen.
- Ex. `int tal1 = 0;`
- `String FirstName = "Albert";`

> ⚠️ **Obs!** Det får i programmet inte finnas två Minnesplatser Variabler med samma namn!

## Uppgift 3 - Skapa minnesplatser av variabeltypen: String

*Lär dig skapa och använda String-variabler för att lagra text.*

### Steg 1: Skapa ett nytt projekt med namnet Uppgift_3
Efter `public static void main(String[] args)` ska du skapa tre minnesplatser av typen String. Ge minnesplatserna namnen: **kyl**, **frys** och **skafferi**

### Steg 2: Placera varor
Tänk dig att du handlar följande varor: **bullar**, **mjölk** och **glass** (dessa är din data). Placera rätt vara (data) till rätt minnesplats enligt exempel ovan

### Steg 3: Skriv ut innehåll
Skriv ut vad du har i dina tre minnesplatser genom att använda dina minnesplatsnamn.

## Uppgift 4 - Hämta data från användaren

*Det är egentligen väldigt sällan att du i förväg vet vilken data ditt program ska arbeta med. Du ska därför nu skapa ett program som hämtar data när det startar från användaren.*

### Steg 1: Skapa ett nytt projekt med namnet Uppgift_4

### Steg 2: Importera Scanner
Redan på rad 1 innan `public class Main` ska du skriva: `import java.util.Scanner;`

### Steg 3: Skapa Scanner-objekt
Skriv efter `public static void main(String[] args)`: `Scanner scan = new Scanner(System.in);`

### Utökning - James Bond exempel
Bygg på programmet så att följande information syns på skärmen:

```
Skriv ditt efternamn
_ (användaren skriver som exempel Bond)
Skriv ditt förnamn
_ (användaren skriver som exempel James)
Hello Mr Bond, James Bond (Programmet skriver ut)
```

## Uppgift 5 - Skapa minnesplatser av variabeltypen: int

*Lär dig arbeta med heltal och matematiska operationer.*

> **Obs!** vi använder inte " " vid tal. Exempel: ("17") ses som text och kan inte användas vid uträkning. (17) ses som tal och kan användas vid uträkning

## Uppgift 6 - Skapa minnesplatser av variabeltypen: double

*Lär dig arbeta med decimaltal och skapa en enkel miniräknare.*

## 🎯 Inlämningsuppgift - Uppgift 7
### Temperaturomvandlare: Fahrenheit till Celsius

*I detta program ska du ge en användare möjligheten att omvandla en temperatur i Fahrenheit till Celsius. Använd kunskaper från tidigare uppgifter här.*

**Krav:**
- Skriv ut så att användaren förstår att en temperatur ska skrivas i Fahrenheit
- När personen gjort detta använder du formeln `C = (F - 32) / 1.8` för att omvandla till Celsius
- Skriv ut resultatet i minnesplats C och försök att göra det så det blir tydligt för användaren

**Formel:** `C = (F - 32) / 1.8`

**Inlämning:** Färdigt program lämnas in via Google ClassRoom: **Inlämning Uppgift_7**