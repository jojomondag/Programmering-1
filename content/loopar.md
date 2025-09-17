# Loopar - for och while satser

## Förklaring

Loopar används när kod ska upprepas. Det finns tre olika metoder för hur kod kan upprepas och styrs.

## Loop-typer

### Metod 1: for-loop

```java
for ( int i = 1; i < 10; i++ )
{
    // Kod som ska upprepas här
}
```

Används bäst när vi i förväg vet hur många upprepningar som ska utföras.

| Del | Förklaring |
|-----|------------|
| **Startvärde** | Denna loop startar på ett |
| **Villkor** | Och kör så länge innehållet i minnesplats i är mindre än tio |
| **Steg** | I slutet av loopen ökas värdet i minnesplatsen med ett |

```react:demo title="For-loop exempel"
public class ForLoopExempel {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println("Nummer: " + i);
        }
    }
}
---
Nummer: 1
Nummer: 2
Nummer: 3
Nummer: 4
Nummer: 5
```

Kod som ska upprepas placeras inom `{ }` direkt efter koden för for.

Innebär att när loopen går in i sitt andra varv så är startvärdet `i = 2` osv.

### Metod 2: while-loop
Används när det i förväg inte är känt hur många upprepningar som ska ske.

Till detta alternativ av loop behövs inget startvärde utan villkor styr hur länge iteration ska pågå.

```java
while ( villkor )
{
    //Kod som ska upprepas här
}
```

```react:demo title="While-loop exempel"
public class WhileLoopExempel {
    public static void main(String[] args) {
        int count = 0;
        while (count < 5) {
            System.out.println("Count är: " + count);
            count++;
        }
        System.out.println("Loopen avslutad");
    }
}
---
Count är: 0
Count är: 1
Count är: 2
Count är: 3
Count är: 4
Loopen avslutad
```

Så länge villkor uppfylls i `while ( )` upprepas instruktionerna inom loopen. När villkor inte längre uppfylls slutar loopen att gälla och eventuell kodning efter loopen exekveras/körs.

### Metod 3: do-while
Används som metod 2 när det i förväg inte är känt hur många upprepningar som ska ske. Dock kontrolleras villkoret i slutet av iterationen.

```java
do
{
    //Kod som ska upprepas här
}
while ( villkor ) ;
```

```react:demo title="Do-while exempel"
public class DoWhileExempel {
    public static void main(String[] args) {
        int count = 0;
        do {
            System.out.println("Count är: " + count);
            count++;
        }
        while (count != 5);
    }
}
---
Count är: 0
Count är: 1
Count är: 2
Count är: 3
Count är: 4
```

## Nästlade loopar (Nested loops)

Loopar kan placeras inuti andra loopar för att skapa komplexa mönster:

```react:demo title="Nästlade loopar - Stjärnmönster"
public class NästladeLoopor {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}
---
*
**
***
****
*****
```

## Formatering med System.out.format()

För att få snygg utskrift av tabeller och mönster:

| Format | Förklaring | Exempel |
|--------|------------|---------|
| `%4d` | Heltal med 4 tecken bredd | `   5` |
| `%04d` | Heltal med 4 tecken, fyll med nollor | `0005` |
| `%.2f` | Decimaltal med 2 decimaler | `3.14` |
| `%s` | Sträng | `"Hej"` |

```react:demo title="Formaterad tabell"
public class FormateradTabell {
    public static void main(String[] args) {
        System.out.println("Nr  Kvadrat");
        for (int i = 1; i <= 5; i++) {
            System.out.format("%2d     %3d%n", i, i*i);
        }
    }
}
---
Nr  Kvadrat
 1       1
 2       4
 3       9
 4      16
 5      25
```

## Praktiska tillämpningar

Loopar används för att:
- Skapa mönster och tabeller
- Bearbeta stora mängder data
- Upprepa användarinteraktion
- Bygga spel och menysystem

Se [övningarna](#vningar-och-uppgifter) nedan för praktiska exempel!

## Sammanfattning

Loopar är kraftfulla verktyg för att upprepa kod:

- **for-loop**: Använd när du vet antal upprepningar
- **while-loop**: Använd när villkoret styr upprepningarna  
- **do-while**: Kör minst en gång, kontrollerar villkor i slutet
- **Nästlade loopar**: Loopar inuti loopar för komplexa mönster
- **Formatering**: Använd `System.out.format()` för snygg utskrift

**Nästa steg:** Lär dig om **arrays** för att lagra och bearbeta samlingar av data!

<div class="section-separator"></div>

<div class="uppgifter-section">

## 📝 Uppgifter

### Uppgift 1 - for-loop

Detta programmet kör en loop och skriver ut tal för vart varv från 0 till 10 – Skriv av koden och testa

```java
public class Main //projektet sparas som Uppgift2_1
{
    public static void main ( String args[ ] )
    {
        for ( int e = 0; e <=10; e++ ) //Start ; villkor; öka värde med antal
        {
            System.out.println(e);
        }
    }
}
```

**Del 2 av Uppgift 1:**

I for satsen ovan skrivs `e++`. Detta ökar värdet med ett. Du ska nu göra en förändring i koden så att programmet loopar 20 gånger och som samtidigt ökar värdet på `int e` med tre. Gör detta genom att ersätta `e++` med `e = e+3`.

**Reflektera över resultatet.**

### Uppgift 2

Ändra i koden ovan så att den skriver ut från 20 till 1.

```java
public class Main //projektet sparas som Uppgift2_2
{
    public static void main ( String args[ ] )
    {
        for ( int e = 20; e >= 1; e-- )
        {
            System.out.println(e);
        }
    }
}
```

### Uppgift 3 - Nested loops (Nästlade loopar)

Skriv följande kod och tänk igenom vad som kommer att ske innan du kör koden (rita upp på papper). Ändra sedan så att effekten blir omvänd.

```java
public class Main //projektet sparas som Uppgift2_3
{
    public static void main ( String args[ ] )
    {
        for ( int i = 0; i < 40; i ++ )
        {
            for ( int j = 0; j <= i; j ++ )
            {
                System.out.print("*");
            }
            System.out.println( );
        }
    }
}
```

**Resultat:**
```
*
**
***
****
*****
...
```

För att vända effekten, ändra den inre loopen:

```java
for ( int j = i; j < 40; j ++ )
{
    System.out.print("*");
}
```

### Uppgift 4 - while-loop

`while` är ett alternativ till `for` och skrivs med `while (villkor)`

**Exempel:** `while ( 1<2 )` översatt: så länge 1 är mindre än 2 ska loopen köras och eftersom villkoret i detta exempel alltid är korrekt kommer denna loop köras i evighet eller till dess att man bryter loopen på annat vis.

Skapa ett nytt program att göra där följande ska ingå:

```java
public class Main //projektet sparas som Uppgift2_4
{
    public static void main ( String args[ ] )
    {
        int count = 0 ;
        while ( count < 5 )
        {
            System.out.println("Count är: " + count);
            count++;
        }
        System.out.println("Loopen avslutad");
    }
}
```

**Innan exekvering:** fundera på vad som kommer skrivas ut på skärmen.

**Resultat:**
```
Count är: 0
Count är: 1
Count är: 2
Count är: 3
Count är: 4
Loopen avslutad
```

### Uppgift 5 - do-while

`do while` - 3:e alternativet för att hantera en loop/iteration. Denna kontrollerar för var ny loop om villkoret är det skrivna. Är villkoret uppnått bryts loopen.

Skapa programmet enligt följande:

```java
public class Main //projektet sparas som Uppgift2_5
{
    public static void main ( String args[ ] )
    {
        int count = 0 ;
        do
        {
            System.out.println("Count är: " + count);
            count ++;
        }
        while ( count != 5 );
    }
}
```

### Uppgift 6 - do-while med användarinput

Ett tydligare exempel på hur do while kan användas.

I koden ovan lägg till längst upp på sidan av din kod `import java.util.Scanner;`

```java
import java.util.Scanner;

public class Main //projektet sparas som Uppgift2_5b
{
    public static void main ( String args[ ] )
    {
        String svar ;
        Scanner scan = new Scanner (System.in);
        
        do
        {
            System.out.println("Vill du spela igen? J/N");
            svar = scan.nextLine( );
        }
        while ( svar.equals("j") ); //villkor = så länge du svarar j kommer du köra loopen.
        
        scan.close();
    }
}
```

### Uppgift 7 - Multiplikationstabell (för högre betyg)

Skriv ut en multiplikationstabell som visar ettans till och med tolvans tabell. Bestäm själv vilken typ av loop/looper du vill använda.

```java
public class Main //projektet sparas som Uppgift2_6
{
    public static void main ( String args[ ] )
    {
        // Rubrik
        System.out.print("   ");
        for ( int col = 1; col <= 12; col++ )
        {
            System.out.format("%4d", col);
        }
        System.out.println();
        
        // Multiplikationstabellen
        for ( int rad = 1; rad <= 12; rad++ )
        {
            System.out.format("%2d:", rad);
            for ( int col = 1; col <= 12; col++ )
            {
                System.out.format("%4d", rad * col);
            }
            System.out.println();
        }
    }
}
```

**Förväntad utskrift:**
```
      1   2   3   4   5   6   7   8   9  10  11  12
 1:   1   2   3   4   5   6   7   8   9  10  11  12
 2:   2   4   6   8  10  12  14  16  18  20  22  24
 3:   3   6   9  12  15  18  21  24  27  30  33  36
...
```

Fundera och testa först själv hur du ska skapa programmet. Blir det för svårt kan du be om lösningsförslag.

### Uppgift 8 - Formatering

Som du ser i bilden ovan så får du kanske inte några snygga kolumner i ditt resultat. Det kan du ändra på genom att i de rader som på skärmen skriver ut dina siffror ändra i koden.

Skriv istället för `System.out.print( )` → `System.out.format( "%4d" , dinVariabel )`

Du ska efter detta få en betydligt snyggare utskrift.

</div>