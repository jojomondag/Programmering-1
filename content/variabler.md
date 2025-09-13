# Variabler och Minnesplatser i Java

## Introduktion

Variabler är som **etiketterade lådor** i datorns minne där vi kan lagra information. I Java måste vi alltid berätta vilken typ av data vi vill lagra.

Efter [code]public static void main(String[] args)[/code] ska du skapa tre minnesplatser av typen String. Ge minnesplatserna namnen: kyl, frys och skafferi.

## Grundläggande Datatyper

### Heltal (int)

För att lagra heltal använder vi datatypen [code]int[/code]. 

```react:freeflow title="Skapa en int-variabel" lineNumbers=true
int antal = 5;
int poäng = 100;
int temperatur = -10;
```

### Text (String)

Textvariabler skapas med datatypen [code]String[/code]. Observera att texten måste vara inom citattecken.

```react:demo title="String variabler"
String namn = "Anna";
String stad = "Stockholm";
String meddelande = "Hej " + namn + "!";

System.out.println(meddelande);
System.out.println("Du bor i " + stad);
---
Hej Anna!
Du bor i Stockholm
```

### Decimaltal (double)

För decimaltal använder vi [code]double[/code]:

```react:freeflow title="Double variabler"
double pris = 29.90;
double vikt = 1.5;
double procent = 85.7;
```

## Scanner - Läsa Input från Användaren

För att läsa data från användaren använder vi Scanner-klassen. Först måste vi importera den:

```react:freeflow title="Import och skapa Scanner"
import java.util.Scanner;

public class MinKlass {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Ange ditt namn: ");
        String namn = scanner.nextLine();
        
        System.out.print("Ange din ålder: ");
        int ålder = scanner.nextInt();
        
        System.out.println("Hej " + namn + ", du är " + ålder + " år gammal!");
    }
}
```

## Praktisk Uppgift

Skapa ett program som frågar användaren efter tre olika saker och sedan skriver ut dem:

```react:demo title="Komplett program med Scanner"
import java.util.Scanner;

public class VariabelDemo {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Skapa tre String-variabler
        String kyl, frys, skafferi;
        
        System.out.print("Vad har du i kylen? ");
        kyl = scanner.nextLine();
        
        System.out.print("Vad har du i frysen? ");
        frys = scanner.nextLine();
        
        System.out.print("Vad har du i skafferiet? ");
        skafferi = scanner.nextLine();
        
        System.out.println("\nDin matinventering:");
        System.out.println("Kyl: " + kyl);
        System.out.println("Frys: " + frys);
        System.out.println("Skafferi: " + skafferi);
    }
}
---
Vad har du i kylen? Mjölk
Vad har du i frysen? Glass
Vad har du i skafferiet? Pasta

Din matinventering:
Kyl: Mjölk
Frys: Glass
Skafferi: Pasta
```

## Viktiga Scanner-metoder

| Metod | Beskrivning | Exempel |
|-------|-------------|---------|
| `nextLine()` | Läser en hel rad text | `String text = scanner.nextLine();` |
| `nextInt()` | Läser ett heltal | `int nummer = scanner.nextInt();` |
| `nextDouble()` | Läser ett decimaltal | `double värde = scanner.nextDouble();` |

## Vanliga Misstag

⚠️ **Varning:** När du använder [code]nextInt()[/code] följt av [code]nextLine()[/code] kan du få problem med radbrytningar. Använd en extra [code]scanner.nextLine()[/code] för att "äta upp" radbrytningen.

```react:freeflow title="Lösning för Scanner-problem"
Scanner scanner = new Scanner(System.in);

System.out.print("Ange ett nummer: ");
int nummer = scanner.nextInt();
scanner.nextLine(); // Äter upp radbrytningen

System.out.print("Ange ditt namn: ");
String namn = scanner.nextLine();
```

## Sammanfattning

1. **Variabler** lagrar data i datorns minne
2. **int** för heltal, **String** för text, **double** för decimaltal
3. **Scanner** låter oss läsa input från användaren
4. Använd [code]nextLine()[/code] för text och [code]nextInt()[/code] för heltal

Nästa steg är att lära sig om **utskrifter** och hur vi kan formatera vår output på olika sätt!