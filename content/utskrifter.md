# Utskrifter i Java

*Grund-syntaxen som används för att "skriva ut data på skärmen" från ett program som exekveras*

## Grundläggande Utskrifts-syntax

### System.out.println() - Med radbrytning
Skriver ut text och avslutar med en radbrytning## Hämta data från minne / variabler

Ett program har inte alltid full koll på data som ska användas. Så därför behövs det möjlighet för att lagra data i en minnesplats och vid behov hämta och använda data som är lagrad.

*Längre fram i kursen arbetar vi mycket med detta men här kommer ett första exempel:*

```java
public class Main {
    public static void main(String[] args) {
        String namn = "NTI Gymnasiet";
        int year = 2022;
        
        System.out.println(namn + year);
        // Resultat: NTI Gymnasiet2022
        
        // Snygga till utskriften:
        System.out.println(namn + " " + year);
        // Resultat: NTI Gymnasiet 2022
        
        System.out.println("Skola: " + namn + ", År: " + year);
        // Resultat: Skola: NTI Gymnasiet, År: 2022
    }
}
```

**Kompilera och exekvera programmet!** Granska resultatet och se om du kan snygga till utskriften.

### Grundläggande syntax-exempel

```java
System.out.println();                                    // Skriver en tom rad
System.out.println("Använd citationstecken vid utskrift av text");
System.out.println(Tal1);                               // Skriver ut innehåll från minnesplats Tal1
System.out.println(3.14);                               // Skriver ut decimalvärdet/talet
```

### System.out.print() - Utan radbrytning
Skriver ut text utan radbrytning, nästa utskrift fortsätter på samma rad

```java
System.out.print("Denna text ");
System.out.print("skrivs på samma rad");
// Resultat: Denna text skrivs på samma rad
```

## Uppgift 1 - Skapa ditt första projekt

### Steg 1: Skapa nytt projekt i IntelliJ
File → New → Project. Ge det nya projektet namnet: **Uppgift_1**. Se till att **Add sample code** är markerat

![Skapa nytt projekt i IntelliJ](Images/New Project.png)

### Steg 2: Öppna Main-filen
I fönstret som öppnas klickar du fram och markerar Main

![Öppnat projekt i IntelliJ](Images/Opened Project.png)

### Steg 3: Ändra koden
Ändra gärna i koden så det ser ut som i exemplet

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}
```

### Steg 4: Kompilera och kör programmet
För att se resultat av koden klickar du på den gröna pilen i menyn.

![Kompilera och kör projekt](Images/Build Project.png)

> **OBS!** Varje gång du gör ändring eller tillägg i koden måste du köra denna process! Alla ändringar eller tillägg i koden måste ske mellan de två mittersta { }

### Steg 5: Experimentera med koden

#### Steg A: Kopiera raden
Markera och kopiera raden: `System.out.println("Hello world!");` Klistra in koden under den första raden så att du har minst tre rader av denna kod

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        System.out.println("Hello world!");
        System.out.println("Hello world!");
    }
}
```

#### Steg B: Ändra texten
Ändra nu texten "Hello World!" till en frivillig trevlig text.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hej och välkommen!");
        System.out.println("Detta är mitt första Java-program");
        System.out.println("Programmering är kul!");
    }
}
```

#### Steg C: Testa print istället för println
System.out.println kan ändras till System.out.print – Gör detta för alla dina rader av kod. 

```java
public class Main {
    public static void main(String[] args) {
        System.out.print("Hej och välkommen!");
        System.out.print("Detta är mitt första Java-program");
        System.out.print("Programmering är kul!");
    }
}
```

**Reflektera:** Vad händer med utskriften när du använder print istället för println?

## 🎯 Uppgift 2 - Berättelse-utmaning

Skapa ett nytt projekt enligt tidigare sätt. Namnge det till **Uppgift_2**

**Utmaning:** Du ska skriva en kort berättelse med följande innehåll och utseende:

```
Det var en gång en kalv.
Så var sagan halv.
Så gick kalven ut…
Och så var sagan slut!
© ER 2022
```

😉 **Svårigheten i denna uppgift:** Du får bara göra **EN** `System.out.println();`

**Inlämning:** Färdig uppgift sparas och skickas in för redovisning i ClassRoom: **Uppgift_2**

## 🎯 Uppgift 3 - GUI med JOptionPane

Skapa ett nytt projekt enligt tidigare sätt. Namnge det till **Uppgift_3**

### Steg 1: Importera JOptionPane
Skriv till helt i början av din programkod (allra längst upp i arbetsytan): `import javax.swing.JOptionPane;`

### Steg 2: Ersätt System.out.println
Ersätt System.out.println raden med: 

```java
JOptionPane.showMessageDialog(null, "Hello World!");
System.exit(0);
```

**Komplett exempel:**

```java
import javax.swing.JOptionPane;

public class Main {
    public static void main(String[] args) {
        JOptionPane.showMessageDialog(null, "Hello World!");
        System.exit(0);
    }
}
```

🤔 **Vad händer?** Kompilera och exekvera programmet. Istället för att texten skrivs ut i konsolen kommer den att visas i en grafisk dialogruta! Detta är ditt första steg mot att skapa program med grafiskt användargränssnitt (GUI).

## Specialtecken och Escape-sekvenser

### Citationstecken i utskrift
Hur gör du om du vill att utskriften ska se ut såhär: "Hello world!" Svaret: Lägg till \\ (backslash)

```java
System.out.print("\"Hello world!\"");
// Resultat: "Hello world!"
```

### Andra användbara escape-sekvenser

```java
// \n = ny rad (radbrytning)
System.out.println("Första raden\nAndra raden");

// \t = tab (indrag)
System.out.println("Före tab\tEfter tab");

// \\ = backslash
System.out.println("En backslash: \\");

// \' = enkelt citationstecken
System.out.println("Enkelt citationstecken: \'");

// \" = dubbelt citationstecken  
System.out.println("Dubbelt citationstecken: \"");
```

### Unicode-tecken
Specialtecken går inte alltid att hitta direkt från tangentbordet. De behöver skrivas med "formel för char".

![Teckenuppsättning för att hitta Unicode-koder](Images/Teckenuppsättning.png)

**Instruktioner:**
1. Sök i datorn efter: "Teckenuppsättning"
2. Markera ett tecken och se sedan "koden för tecknet"
3. I exemplet är koden U+0026
4. I programmet skrivs: `System.out.println('\u0026');`

> **OBS!** ändringarna i koden! (" " har ersatts med ' ' och när koden för tecknet skrivs används inte +)

```java
// Skriv ut specialtecken med Unicode
System.out.println('\u20AC');  // € (euro)
System.out.println('\u00A9');  // © (copyright)
System.out.println('\u03A9');  // Ω (omega)
System.out.println('\u0026');  // & (ampersand)

// Exempel med text
System.out.println("Pris: 100" + '\u20AC');  // Pris: 100€
```

## Skriva ut siffror och beräkningar

### Grundläggande sifferutskrift
För att skriva ut siffror används samma syntax som tidigare men utan " " -tecken.

```java
System.out.println(3.14);     // Skriver ut: 3.14
System.out.println(42);        // Skriver ut: 42
System.out.println(-17);       // Skriver ut: -17
```

### Matematiska beräkningar

```java
System.out.println(3 + 14);   // Skriver ut: 17 (addition)
System.out.println(14 - 3);    // Skriver ut: 11 (subtraktion)
System.out.println(3 * 14);    // Skriver ut: 42 (multiplikation)
System.out.println(14 / 3);    // Skriver ut: 4 (heltalsdivision)
System.out.println(14.0 / 3);  // Skriver ut: 4.666... (decimaldivision)
```

**Testa:** Vad blir resultatet av `System.out.println(3 + 14);`?

### Kombinera tal och text
Om du vill att resultatet på skärmen ska se ut som "3 & 14" behöver du kombinera din syntax med text:

```java
System.out.println(3 + " & " + 14);        // Skriver ut: 3 & 14
System.out.println("Summa: " + (3 + 14));   // Skriver ut: Summa: 17
System.out.println(3 + " + " + 14 + " = " + (3 + 14)); // Skriver ut: 3 + 14 = 17
```

Du skriver: tal + text + tal

### 🏆 Utmaning
Skapa en syntax som skriver ut på skärmen: **Agent 007 - James Bond** (minst en siffra ska vara utskrivet som ett tal)

**Lösningsförslag:**
```java
System.out.println("Agent " + 007 + " - James Bond");
// eller
System.out.println("Agent " + 7 + " - James Bond");
```

## Hämta data från minne / variabler

Ett program har inte alltid full koll på data som ska användas. Så därför behövs det möjlighet för att lagra data i en minnesplats och vid behov hämta och använda data som är lagrad.

*Längre fram i kursen arbetar vi mycket med detta men här kommer ett första exempel:*

## 💾 Att spara och skicka in fil för redovisning

1. Ta reda på var i datorn ditt projekt sparats
2. Gå till mappen och klicka dig fram till din fil med namn `Main.java`
3. Exempel på sökväg: `Programmering > Uppgift_1 > src > Main.java`

📤 **Inlämning:** Filen Main.java ska redovisas genom att ladda upp den i ClassRoom för programmering