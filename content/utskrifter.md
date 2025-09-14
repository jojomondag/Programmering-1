# Utskrifter i Java

## Grund-syntaxen för utskrifter

Grund-syntaxen som används för att "skriva ut data på skärmen" från ett program som exekveras är:

```java
System.out.println(); // Skriver du denna syntax kommer du få en radbrytning
System.out.println("Använd citationstecken vid utskrift av text");
System.out.println(Tal1); // Skriver ut vad som finns i minnesplats med namnet Tal1
System.out.println(3.14); // Skriver ut decimalvärdet / talet
```

## Skapa ett nytt projekt i IntelliJ

För att komma igång med Java-programmering behöver du först skapa ett nytt projekt i IntelliJ IDEA.

![Skapa nytt projekt](Images/New%20Project.png)

### Steg-för-steg instruktioner:

1. **Skapa nytt projekt**: File → New Project
2. **Ge projektet namnet**: `Uppgift_1`
3. **Se till att "Add sample code" är markerat**
4. **Klicka på "Create"**

![Öppnat projekt](Images/Opened%20Project.png)

I fönstret som öppnas klickar du fram och markerar `Main.java` i projektstrukturen.

## Grundläggande Utskrifter

### println vs print

```react:demo title="Skillnaden mellan println och print"
System.out.println("Första raden");
System.out.println("Andra raden");
System.out.print("Ingen radbrytning");
System.out.print(" - fortsätter på samma rad");
System.out.println();
System.out.println("Nu kommer en ny rad");
---
Första raden
Andra raden
Ingen radbrytning - fortsätter på samma rad
Nu kommer en ny rad
```

### Skriva ut variabler

Du kan enkelt skriva ut variabler genom att lägga till dem i utskriften:

```react:demo title="Skriva ut variabler"
String namn = "Anna";
int ålder = 25;
double längd = 1.68;

System.out.println("Namn: " + namn);
System.out.println("Ålder: " + ålder + " år");
System.out.println("Längd: " + längd + " meter");
---
Namn: Anna
Ålder: 25 år
Längd: 1.68 meter
```

## Uppgift_1 - Dina första utskrifter

Nu är det dags att göra ändringar i koden! Följ dessa steg:

### Steg 1: Kopiera utskriftsrader
- Markera och kopiera raden: `System.out.println("Hello world!");`
- Klistra in koden under den första raden så att du har minst tre rader av denna kod
- Kompilera och exekvera programmet! Granska resultatet.

### Steg 2: Ändra texten
- Ändra nu texten "Hello World!" till en frivillig trevlig text.
- Kompilera och exekvera programmet!

### Steg 3: Testa print istället för println
- `System.out.println` kan ändras till `System.out.print` – Gör detta för alla dina rader av kod.
- Kompilera och exekvera programmet! Reflektera över resultatet.
- Från nu och framåt bestämmer du själv om du vill använda `print` eller `println`

### Steg 4: Citattecken i utskrift

**Fråga**: Hur gör du om du vill att utskriften ska se ut såhär: `"Hello world!"`?

**Förklaring**: 
- Syntaxen `System.out.println("Hello world!");` ger utskrift: `Hello world!`
- Men du vill ha: `"Hello world!"` (med citattecken synliga)

**Svar**: Lägg till `\` (backslash) före citattecknen:

```java
System.out.print("\"Hello world!\"");
```

**Testa själv** med syntaxen ovan!

### Steg 5: Andra escape-sekvenser
- **`\n`**: Testa med detta mellan två ord i en text. Vad blir resultatet?
- **`\t`**: Om igen... vad blir resultatet?

## Specialtecken och Escape-sekvenser

Java använder speciella tecken för att formatera text:

| Escape-sekvens | Beskrivning | Exempel |
|----------------|-------------|---------|
| `\n` | Ny rad | `"Rad 1\nRad 2"` |
| `\t` | Tabulering | `"Kolumn 1\tKolumn 2"` |
| `\"` | Citattecken | `"Han sa \"Hej\""` |
| `\\` | Backslash | `"C:\\Program Files\\"` |

```react:demo title="Escape-sekvenser i praktiken"
System.out.println("Första raden\nAndra raden");
System.out.println("Kolumn 1\tKolumn 2\tKolumn 3");
System.out.println("Han sa \"Hej världen!\"");
System.out.println("Sökväg: C:\\Users\\Anna\\Dokument\\");
---
Första raden
Andra raden
Kolumn 1	Kolumn 2	Kolumn 3
Han sa "Hej världen!"
Sökväg: C:\Users\Anna\Dokument\
```

## Unicode-tecken och Teckenuppsättning

Specialtecken går inte alltid att hitta direkt från tangentbordet. Utan de behöver skrivas med "formel för char". char är lika med tecken.

> **💡 Läs mer**: [Infoga latinska symboler och tecken med ASCII eller Unicode](https://support.microsoft.com/sv-se/office/infoga-latinska-symboler-och-tecken-med-ascii-eller-unicode-d13f58d3-7bcb-44a7-a4d5-972ee12e50e0) - Microsofts guide för att använda Teckenuppsättning och Unicode-koder

### Hitta Unicode-koder med Teckenuppsättning

För att hitta formeln för ett visst tecken. Gör enligt följande:

1. Sök i datorn efter: "Teckenuppsättning"
2. Markera ett tecken och se sedan "koden för tecknet"

> **💡 Läs mer**: [Unicode-koder förklaras på svenska](https://sv.wikipedia.org/wiki/Unicode) - Lär dig mer om Unicode och hur det fungerar

![Teckenuppsättning](Images/Teckenuppsättning.png)

### Exempel: Från Teckenuppsättning till Java-kod

I exemplet ovan är koden **`U+0026`** för `&`-tecknet.

**I Java-programmet skrivs:**
```java
System.out.println('\u0026');
```

### ⚠️ Viktiga ändringar när du skriver i Java:

1. **Citattecken**: `" "` → `' '` (enkla citattecken istället för dubbla)
2. **Plus-tecken**: Ta bort `+` från Unicode-koden
   - Teckenuppsättning visar: `U+0026`
   - Java-kod skriver: `\u0026` (utan `+`)

### Sammanfattning av ändringar:
| Teckenuppsättning | Java-kod |
|-------------------|----------|
| `U+0026` | `\u0026` |
| `" "` | `' '` |

### Uppgift: Skriv ut specialtecken
Skriv ut i ditt program följande tecken:
- € (euro)
- © 
- Ω 
- En efter eget frivilligt val

```react:demo title="Unicode-tecken exempel"
System.out.println("Euro: \u20AC");
System.out.println("Copyright: \u00A9");
System.out.println("Omega: \u03A9");
System.out.println("Hjärta: \u2665");
System.out.println("Stjärna: \u2605");
---
Euro: €
Copyright: ©
Omega: Ω
Hjärta: ♥
Stjärna: ★
```

## Formaterad utskrift med printf

För mer avancerad formatering kan du använda `System.out.printf()`:

```react:demo title="Printf formatering"
String namn = "Erik";
int ålder = 22;
double betyg = 4.75;

System.out.printf("Namn: %s%n", namn);
System.out.printf("Ålder: %d år%n", ålder);
System.out.printf("Betyg: %.2f%n", betyg);
System.out.printf("Hej %s, du är %d år och har betyget %.1f%n", 
                  namn, ålder, betyg);
---
Namn: Erik
Ålder: 22 år
Betyg: 4.75
Hej Erik, du är 22 år och har betyget 4.8
```

## JOptionPane - GUI-dialoger

För grafiska program kan du använda `JOptionPane`:

```react:demo title="JOptionPane exempel"
import javax.swing.JOptionPane;

public class GUIDemo {
    public static void main(String[] args) {
        String namn = JOptionPane.showInputDialog("Vad heter du?");
        
        JOptionPane.showMessageDialog(null, 
            "Hej " + namn + "!\nVälkommen till vårt program!");
        
        int svar = JOptionPane.showConfirmDialog(null, 
            "Vill du fortsätta?", 
            "Bekräftelse", 
            JOptionPane.YES_NO_OPTION);
        
        if (svar == JOptionPane.YES_OPTION) {
            JOptionPane.showMessageDialog(null, "Bra! Vi fortsätter.");
        }
    }
}
---
[Shows GUI dialogs - user input and message boxes]
```

## Praktisk Uppgift

Skapa ett program som:
1. Frågar användaren efter deras namn och ålder
2. Beräknar när de fyller 100 år
3. Skriver ut informationen med formatering och specialtecken

```react:demo title="Komplett formaterat program"
import java.util.Scanner;

public class FormateradUtskrift {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Ange ditt namn: ");
        String namn = scanner.nextLine();
        
        System.out.print("Ange din ålder: ");
        int ålder = scanner.nextInt();
        
        int årTill100 = 100 - ålder;
        int år100 = 2024 + årTill100;
        
        System.out.println("\n" + "=".repeat(40));
        System.out.println("\t\u2605 PERSONLIG RAPPORT \u2605");
        System.out.println("=".repeat(40));
        System.out.printf("Namn:\t\t%s\n", namn);
        System.out.printf("Ålder:\t\t%d år\n", ålder);
        System.out.printf("100 år:\t\tÅr %d (om %d år)\n", år100, årTill100);
        System.out.println("=".repeat(40));
        System.out.println("Hej " + namn + "! \u263A");
        
        scanner.close();
    }
}
---
Ange ditt namn: Lisa
Ange din ålder: 20

========================================
	★ PERSONLIG RAPPORT ★
========================================
Namn:		Lisa
Ålder:		20 år
100 år:		År 2104 (om 80 år)
========================================
Hej Lisa! ☺
```

## Färgad text i terminalen

Följande kod fungerar inte med alla kompilatorer men det ska fungera i IntelliJ:

```java
System.out.println("\033[1;92m");
// och så behöver du ytterligare en utskrift med frivillig text
```

### Vad händer?

Granska resultatet. Det vi skapar här är mest för skoj och inte vanligt förekommande inom programmering. Men som du sett blir det ett annorlunda resultat som kommer på alla rader efter.

### Återställa till normal färg

Vill du återställa till "default" använder du:
```java
System.out.println("\033[0m");
```
varpå alla efterföljande utskrifter påverkas.

### Läs mer om färgkoder

Vill du experimentera mer med detta kan du se: [Stack Overflow - Färgkoder i konsolen](https://stackoverflow.com/questions/5762491/how-to-print-color-in-console-using-system-out-println)

```react:demo title="ANSI färgkoder"
public class FärgadText {
    public static void main(String[] args) {
        // ANSI färgkoder
        String röd = "\u001B[31m";
        String grön = "\u001B[32m";
        String gul = "\u001B[33m";
        String blå = "\u001B[34m";
        String magenta = "\u001B[35m";
        String cyan = "\u001B[36m";
        String reset = "\u001B[0m";
        
        System.out.println(röd + "Röd text" + reset);
        System.out.println(grön + "Grön text" + reset);
        System.out.println(blå + "Blå text" + reset);
        System.out.println(gul + "Gul bakgrund" + reset);
    }
}
---
Röd text
Grön text
Blå text
Gul bakgrund
```

## Skriva ut siffror

För att skriva ut siffror används samma syntax som tidigare men utan `" "`-tecken.

### Uppgift: Testa siffror
- Skriv och testa: `System.out.println(3.14);`
- Testa nu följande: `System.out.println(3 + 14);`
- Vad blir resultatet? (Du får gärna testa med övriga räknesätt med)

### Kombinera siffror med text
Om du vill att resultatet på skärmen ska se ut som `3 14` behöver du kombinera din syntax med text: 
```java
System.out.println(3 + " & " + 14); // Du skriver tal + text + tal
```

### Utmaning
Skapa en syntax som skriver ut på skärmen: `Agent 007 - James Bond.` (minst en siffra ska vara utskrivet som ett tal)

## Hämta data från minne / variabler

Ett program har inte alltid full koll på data som ska användas. Så därför behövs det möjlighet för att lagra data i en minnesplats och vid behov hämta och använda data som är lagrad.

Längre fram i kursen arbetar vi mycket med detta men här kommer ett första exempel:

### Uppgift: Variabler och utskrift
Skapa följande rader med kod:
```java
String namn = "NTI Gymnasiet";
int year = 2025;
System.out.println(namn + year);
```

Kompilera och exekvera programmet! Granska resultatet och se om du kan snygga till utskriften.

## Att spara och skicka in fil för redovisning

Ta reda på var i datorn ditt projekt sparats.
Gå till mappen och klicka dig fram till din fil med namn `Main.java`
Ex. på sökväg: `Programmering > Uppgift_1 > src > Main.java`

Filen `Main.java` vill jag nu att du ska redovisa genom att ladda upp den i ClassRoom för programmering.

## Uppgift_2 - Berättelse

Skapa ett nytt projekt enligt tidigare sätt. Namnge det till `Uppgift_2`

Du ska nu med de kunskaper du fått i tidigare uppgifter ta dig an följande utmaning:

Skriv en kort berättelse med följande innehåll och utseende:
```
Det var en gång en kalv.
Så var sagan halv.
Så gick kalven ut...
Och så var sagan slut!
© JN 2025
```

**Svårigheten i denna uppgift**: Du får bara göra en `System.out.println();` 😉

Lycka till!

Färdig uppgift sparas och skickas in för redovisning i classRoom: `Uppgift_2`

## Uppgift_3 - GUI med JOptionPane

Skapa ett nytt projekt enligt tidigare sätt. Namnge det till `Uppgift_3`

Skriv nu till helt i början av din programkod (allra längst upp i arbetsytan):
```java
import javax.swing.JOptionPane;
```

Ersätt `System.out.println` raden med:
```java
JOptionPane.showMessageDialog(null, "Hello World!");
System.exit(0);
```

Kompilera och exekvera programmet. Vad händer?

## Kompilera och exekvera

För att se resultat av koden du skapar klickar du på den gröna pilen i menyn.

![Kompilera projekt](Images/Build%20Project.png)

Du kompilerar (rättar) då koden och om koden är utan fel exekveras (körs) koden och visar resultatet av din kodning. 

**OBS!** Var gång du gör ändring eller tillägg i koden måste du köra denna process!

Alla ändringar eller tillägg i koden måste ske mellan de två mittersta `{ }`

## Sammanfattning

1. **println()** skriver ut text med radbrytning
2. **print()** skriver ut text utan radbrytning  
3. **Escape-sekvenser** (\n, \t, \", \\) för specialtecken
4. **Unicode** (\uXXXX) för symboler och specialtecken
5. **printf()** för formaterad utskrift
6. **JOptionPane** för grafiska dialoger
7. **Variabler** för att lagra och använda data

Nästa steg är att kombinera detta med **variabler** för att skapa interaktiva program!