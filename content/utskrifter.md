# Utskrifter i Java

## Introduktion

I Java använder vi olika metoder för att visa information till användaren. Den mest grundläggande metoden är `System.out.println()` som skriver ut text på en ny rad.

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

## Unicode-tecken

Java stöder Unicode-tecken som låter dig skriva ut specialsymboler:

```react:demo title="Unicode-tecken"
System.out.println("Hjärta: \u2665");
System.out.println("Stjärna: \u2605");
System.out.println("Musiknot: \u266B");
System.out.println("Smiley: \u263A");
System.out.println("Pil: \u2192");
---
Hjärta: ♥
Stjärna: ★
Musiknot: ♫
Smiley: ☺
Pil: →
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

För att göra output mer visuellt tilltalande kan du använda ANSI-färgkoder:

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

## Sammanfattning

1. **println()** skriver ut text med radbrytning
2. **print()** skriver ut text utan radbrytning  
3. **Escape-sekvenser** (\n, \t, \", \\) för specialtecken
4. **Unicode** (\uXXXX) för symboler och specialtecken
5. **printf()** för formaterad utskrift
6. **JOptionPane** för grafiska dialoger

Nästa steg är att kombinera detta med **variabler** för att skapa interaktiva program!