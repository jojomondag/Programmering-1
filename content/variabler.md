# Variabler / Minnesplatser

## Introduktion

Variabler används för att lagra data. Beroende på form av data skapas minnesplatser med anpassning för tänkt datainnehåll.

## Variabeltyper

| Variabeltyp | Exempel | Förklaring |
|-------------|---------|------------|
| `int` | `int a = 2;` | Heltal - positiva & negativa heltal |
| `float` | `float b = 2.5f;` | Decimaltal - positiva & negativa decimaltal |
| `double` | `double c = 2.75;` | Decimaltal - positiva & negativa decimaltal |
| `char` | `char d = 's';` | Tecken - tecken som finns på tangentbord |
| `String` | `String e = "Java";` | Textsträng - ord eller text |
| `boolean` | `boolean f = true;` | Sant eller falskt - kan endast vara true eller false |

## Grundläggande Exempel

```react:demo title="Skapa olika variabeltyper"
public class VariabelExempel {
    public static void main(String[] args) {
        // Heltal
        int a = 2;
        
        // Decimaltal
        float b = 2.5f;
        double c = 2.75;
        
        // Tecken
        char d = 's';
        
        // Text
        String e = "Java";
        
        // Boolean
        boolean f = true;
        
        // Skriv ut alla värden
        System.out.println("Heltal: " + a);
        System.out.println("Float: " + b);
        System.out.println("Double: " + c);
        System.out.println("Tecken: " + d);
        System.out.println("Text: " + e);
        System.out.println("Boolean: " + f);
    }
}
---
Heltal: 2
Float: 2.5
Double: 2.75
Tecken: s
Text: Java
Boolean: true
```

## Tips för Variabelnamn

**Skapa gärna alla minnesplatser precis efter `public static void main(String[] args) {`**

Använd minnesplatsnamn som gör att du förstår vilken form av innehåll som lagras i minnesplatsen.

```react:demo title="Bra variabelnamn"
public class BraNamn {
    public static void main(String[] args) {
        int tal1 = 0;
        String firstName = "Albert";
        double pris = 29.90;
        boolean ärKlar = false;
        
        System.out.println("Tal: " + tal1);
        System.out.println("Namn: " + firstName);
        System.out.println("Pris: " + pris + " kr");
        System.out.println("Klar: " + ärKlar);
    }
}
---
Tal: 0
Namn: Albert
Pris: 29.9 kr
Klar: false
```

⚠️ **Viktigt:** Det får i programmet inte finnas två minnesplatser med samma namn!

## Uppgift 3 - Skapa minnesplatser av variabeltypen: String

### Exempel:
```react:demo title="String variabler - Grundläggande"
public class StringExempel {
    public static void main(String[] args) {
        String namn; // minnesplatsen skapas
        namn = "Kalle Anka"; // data ges till minnesplatsen
        System.out.println(namn); // skriver ut vad som finns i minnesplatsen
    }
}
---
Kalle Anka
```

### Uppgift 3 - Steg för steg:

1. **Skapa ett nytt projekt** med namnet `Uppgift_3`
2. **Efter `public static void main(String[] args) {`** ska du skapa tre minnesplatser av typen String
3. **Ge minnesplatserna namnen:** `kyl`, `frys` och `skafferi`
4. **Tänk dig att du handlar följande varor:** bullar, mjölk och glass (dessa är din data)
5. **Placera rätt vara (data) till rätt minnesplats** enligt exempel ovan
6. **Skriv ut vad du har i dina tre minnesplatser** genom att använda dina minnesplatsnamn

```react:demo title="Uppgift 3 - Lösning"
public class Uppgift3 {
    public static void main(String[] args) {
        // Skapa tre String-variabler
        String kyl, frys, skafferi;
        
        // Placera varor i rätt minnesplats
        kyl = "mjölk";
        frys = "glass";
        skafferi = "bullar";
        
        // Skriv ut innehållet
        System.out.println("I kylen har jag: " + kyl);
        System.out.println("I frysen har jag: " + frys);
        System.out.println("I skafferiet har jag: " + skafferi);
    }
}
---
I kylen har jag: mjölk
I frysen har jag: glass
I skafferiet har jag: bullar
```

## Uppgift 4 - Scanner för användarinput

Det är egentligen väldigt sällan att du i förväg vet vilken data ditt program ska arbeta med. Du ska därför nu skapa ett program som hämtar data när det startar från användaren.

### Steg för steg:

1. **Skapa ett nytt projekt** med namnet `Uppgift_4`
2. **Redan på rad 1** innan `public class Main` ska du skriva: `import java.util.Scanner;`
3. **Skriv efter `public static void main(String[] args) {`** `Scanner scan = new Scanner(System.in);`
4. **Skapa en variabel/minnesplats** för lagring av text
5. **Skriv ut instruktioner** så att det på skärmen syns texten: "Skriv ditt namn: "
6. **Ta emot data från användare:** Använd följande syntax: `namnet_på_din_minnesplats = scan.nextLine();`
7. **Skriv ut** så att det syns vad som skrevs in i programmet

```react:demo title="Uppgift 4 - Grundläggande Scanner"
import java.util.Scanner;

public class Uppgift4 {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        // Skapa variabel för namn
        String namn;
        
        // Fråga användaren
        System.out.print("Skriv ditt namn: ");
        namn = scan.nextLine();
        
        // Skriv ut resultatet
        System.out.println("Hej " + namn);
    }
}
---
Skriv ditt namn: Kalle
Hej Kalle
```

### Utökad version - Förnamn och efternamn:

```react:demo title="Uppgift 4 - Förnamn och efternamn"
import java.util.Scanner;

public class Uppgift4Utökad {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        // Skapa variabler
        String efternamn, förnamn;
        
        // Fråga efter efternamn
        System.out.print("Skriv ditt efternamn: ");
        efternamn = scan.nextLine();
        
        // Fråga efter förnamn
        System.out.print("Skriv ditt förnamn: ");
        förnamn = scan.nextLine();
        
        // Skriv ut resultatet
        System.out.println("Hello Mr " + efternamn + ", " + förnamn + " " + efternamn);
    }
}
---
Skriv ditt efternamn: Bond
Skriv ditt förnamn: James
Hello Mr Bond, James Bond
```

## Uppgift 5 - Skapa minnesplatser av variabeltypen: int

### Exempel:
```react:demo title="int variabler - Grundläggande"
public class IntExempel {
    public static void main(String[] args) {
        int tal2; // minnesplatsen skapas
        tal2 = 14; // data ges till minnesplatsen OBS! int kan endast hantera heltal!
        
        // Det går också att skapa minnesplatser med data samtidigt:
        int tal3 = 17;
        
        System.out.println("Tal2: " + tal2);
        System.out.println("Tal3: " + tal3);
    }
}
---
Tal2: 14
Tal3: 17
```

⚠️ **Obs!** Vi använder inte `" "` vid tal.
- `("17")` ses som text och kan inte användas vid uträkning
- `(17)` ses som tal och kan användas vid uträkning

### Uppgift 5 - Steg för steg:

1. **Skapa nytt projekt** med namnet: `Uppgift_5`
2. **Skapa 3 minnesplatser** av variabeltypen `int` - ge dem namnen: `Tal1`, `Tal2` och `Summa`
3. **Ge minnesplatserna `Tal1` och `Tal2`** valfritt heltal. `Summa` ska ha värdet 0
4. **Gör en matematisk uträkning:** `Summa = Tal1 + Tal2;`
5. **Skriv ut minnesplatsen `Summa`** och granska resultatet vid exekvering
6. **Fortsätt på koden ovan:** Skriv `Summa = Tal1 - Tal2;` och skriv ut resultatet
7. **Gör samma även för multiplikation (`*`) och division (`/`)**

```react:demo title="Uppgift 5 - Matematiska operationer"
public class Uppgift5 {
    public static void main(String[] args) {
        // Skapa variabler
        int Tal1 = 10;
        int Tal2 = 5;
        int Summa = 0;
        
        // Addition
        Summa = Tal1 + Tal2;
        System.out.println("Addition: " + Tal1 + " + " + Tal2 + " = " + Summa);
        
        // Subtraktion
        Summa = Tal1 - Tal2;
        System.out.println("Subtraktion: " + Tal1 + " - " + Tal2 + " = " + Summa);
        
        // Multiplikation
        Summa = Tal1 * Tal2;
        System.out.println("Multiplikation: " + Tal1 + " * " + Tal2 + " = " + Summa);
        
        // Division
        Summa = Tal1 / Tal2;
        System.out.println("Division: " + Tal1 + " / " + Tal2 + " = " + Summa);
    }
}
---
Addition: 10 + 5 = 15
Subtraktion: 10 - 5 = 5
Multiplikation: 10 * 5 = 20
Division: 10 / 5 = 2
```

### Fortsättning - Operatorprioritet:

8. **Skapa ytterligare en minnesplats** med namnet `Tal3`
9. **Ändra så alla minnesplatser utom `Summa`** har värdet 2
10. **Skriv denna rad:** `Summa = Tal1 + Tal2 * Tal3;`

```react:demo title="Operatorprioritet"
public class OperatorPrioritet {
    public static void main(String[] args) {
        // Alla variabler har värdet 2
        int Tal1 = 2;
        int Tal2 = 2;
        int Tal3 = 2;
        int Summa = 0;
        
        // Vad blir resultatet?
        Summa = Tal1 + Tal2 * Tal3;
        System.out.println("Resultat: " + Tal1 + " + " + Tal2 + " * " + Tal3 + " = " + Summa);
        System.out.println("Förklaring: Multiplikation utförs först: 2 + (2 * 2) = 2 + 4 = 6");
    }
}
---
Resultat: 2 + 2 * 2 = 6
Förklaring: Multiplikation utförs först: 2 + (2 * 2) = 2 + 4 = 6
```

## Uppgift 6 - Skapa minnesplatser av variabeltypen: double

### Exempel:
```react:demo title="double variabler"
public class DoubleExempel {
    public static void main(String[] args) {
        double tal4; // minnesplatsen skapas
        tal4 = 3.14; // data ges till minnesplatsen
        
        System.out.println("Decimaltal: " + tal4);
    }
}
---
Decimaltal: 3.14
```

### Uppgift 6 - Steg för steg:

1. **Skapa nytt projekt** med namnet: `Uppgift_6`
2. **Skapa en minnesplats** av variabeltyp `double` och en av typen `int`
3. **Ge båda minnesplatserna** värdet 7
4. **Skriv ut minnesplatserna** efter varandra och jämför resultatet

```react:demo title="Uppgift 6 - int vs double"
public class Uppgift6 {
    public static void main(String[] args) {
        // Skapa variabler med samma värde
        int heltal = 7;
        double decimaltal = 7;
        
        // Skriv ut och jämför
        System.out.println("Heltal: " + heltal);
        System.out.println("Decimaltal: " + decimaltal);
        System.out.println("Båda har samma värde men olika datatyper!");
    }
}
---
Heltal: 7
Decimaltal: 7.0
Båda har samma värde men olika datatyper!
```

### Miniräknare med användarinput:

```react:demo title="Miniräknare med Scanner"
import java.util.Scanner;

public class Miniräknare {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        // Skapa tre double-variabler
        double Tal1 = 0;
        double Tal2 = 0;
        double Summa = 0;
        
        // Läs första talet
        System.out.print("Skriv ett värde: ");
        Tal1 = scan.nextDouble();
        
        // Läs andra talet
        System.out.print("Skriv ett värde: ");
        Tal2 = scan.nextDouble();
        
        // Beräkna och skriv ut alla räknesätt
        Summa = Tal1 + Tal2;
        System.out.println("Addition: " + Tal1 + " + " + Tal2 + " = " + Summa);
        
        Summa = Tal1 - Tal2;
        System.out.println("Subtraktion: " + Tal1 + " - " + Tal2 + " = " + Summa);
        
        Summa = Tal1 * Tal2;
        System.out.println("Multiplikation: " + Tal1 + " * " + Tal2 + " = " + Summa);
        
        Summa = Tal1 / Tal2;
        System.out.println("Division: " + Tal1 + " / " + Tal2 + " = " + Summa);
    }
}
---
Skriv ett värde: 10.5
Skriv ett värde: 2.5
Addition: 10.5 + 2.5 = 13.0
Subtraktion: 10.5 - 2.5 = 8.0
Multiplikation: 10.5 * 2.5 = 26.25
Division: 10.5 / 2.5 = 4.2
```

## Inlämningsuppgift: Temperaturomvandlare

**Skapa nytt projekt med namnet:** `Uppgift_7`

I detta program ska du ge en användare möjligheten att omvandla en temperatur i Fahrenheit till Celsius.

### Så här ska programmet arbeta:

1. **Skriv ut** så att användaren förstår att en temperatur ska skrivas i Fahrenheit
2. **När personen gjort detta** använder du formeln `C = (F - 32) / 1.8;` för att omvandla till Celsius (C och F är namn på minnesplatser)
3. **Skriv ut resultatet** i minnesplats C och försök att göra det så det blir tydligt för användaren

```react:demo title="Temperaturomvandlare - Mall"
import java.util.Scanner;

public class Uppgift7 {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        // Skapa variabler
        double F, C;
        
        // Fråga användaren
        System.out.print("Ange temperatur i Fahrenheit: ");
        F = scan.nextDouble();
        
        // Omvandla till Celsius
        C = (F - 32) / 1.8;
        
        // Skriv ut resultatet
        System.out.println("Temperatur i Fahrenheit: " + F + "°F");
        System.out.println("Temperatur i Celsius: " + C + "°C");
    }
}
---
Ange temperatur i Fahrenheit: 68
Temperatur i Fahrenheit: 68.0°F
Temperatur i Celsius: 20.0°C
```

## Viktiga Scanner-metoder

| Metod | Beskrivning | Exempel |
|-------|-------------|---------|
| `nextLine()` | Läser en hel rad text | `String text = scanner.nextLine();` |
| `nextInt()` | Läser ett heltal | `int nummer = scanner.nextInt();` |
| `nextDouble()` | Läser ett decimaltal | `double värde = scanner.nextDouble();` |

## Vanliga Misstag

⚠️ **Varning:** När du använder `nextInt()` följt av `nextLine()` kan du få problem med radbrytningar. Använd en extra `scanner.nextLine()` för att "äta upp" radbrytningen.

```react:demo title="Lösning för Scanner-problem"
import java.util.Scanner;

public class ScannerProblem {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Ange ett nummer: ");
        int nummer = scanner.nextInt();
        scanner.nextLine(); // Äter upp radbrytningen
        
        System.out.print("Ange ditt namn: ");
        String namn = scanner.nextLine();
        
        System.out.println("Nummer: " + nummer);
        System.out.println("Namn: " + namn);
    }
}
---
Ange ett nummer: 42
Ange ditt namn: Anna
Nummer: 42
Namn: Anna
```

## Sammanfattning

1. **Variabler** lagrar data i datorns minne
2. **int** för heltal, **String** för text, **double** för decimaltal
3. **Scanner** låter oss läsa input från användaren
4. **Matematiska operationer** fungerar med numeriska variabler
5. **Operatorprioritet** - multiplikation och division utförs före addition och subtraktion

**Nästa steg:** Lär dig mer om **utskrifter** och hur vi kan formatera vår output på olika sätt!