<div class="info-section">

# If-satser

If-satser används när du utifrån flera alternativ vill att programmet du skapar ska välja ett. Kombineras alltid med `else if` eller `else`.

## Grundläggande Syntax

```java
if ( villkor )		//if på svenska = om
{
    Kod som ska utföras om villkoret stämmer.
    // if kan bara användas en gång men måste ske i kombination med else if eller else
}
else if ( villkor )	//else if på svenska = annars om
{
    Kod som ska utföras om detta villkor stämmer.  
    // else if kan förekomma så många gånger det behövs
}
else		//else på svenska = annars
{
    Kod som ska utföras om detta alternativ är det enda alternativ som återstår. 
    // Kan användas en gång i kombinationen.
}
```

## Grundläggande Exempel

```react:demo title="If-sats exempel"
public class IfExempel {
    public static void main(String[] args) {
        int A = 74;

        if ( A == 72 ) {
            System.out.println("Detta skrivs ut om minnesplats A innehåller 72");
        }
        else if ( A == 74 ) {
            System.out.println("Detta skrivs ut om minnesplats A innehåller 74");
        }
        else {
            System.out.println("Detta skrivs ut om inget alternativ återstår");
        }
    }
}
---
Detta skrivs ut om minnesplats A innehåller 74
```

## Relationsoperatorer

### Med heltal (int)

| Operator | Förklaring | Exempel |
|----------|------------|---------|
| `<` | mindre än | `A < 5` - om innehållet i minnesplats A är mindre än talet |
| `<=` | mindre än eller lika med | `B <= 5` - om innehållet i minnesplats B är mindre än eller lika med talet |
| `>` | större än | `C > 5` - om innehållet i minnesplats C är större än talet |
| `!=` | inte lika med | `D != 5` - om innehållet i minnesplats D inte är lika med talet |
| `==` | lika med | `E == 5` - om innehållet i minnesplats E är lika med talet |

### Med ord (String)

| Exempel | Förklaring |
|---------|------------|
| `A.equals("java")` | om innehållet i minnesplats A är ordet java |
| `!A.equals("java")` | om innehållet i minnesplats A inte är ordet java |

⚠️ **Viktigt:** För String-jämförelser använd alltid `.equals()` - inte `==`!

### Med tecken (char)

| Exempel | Förklaring |
|---------|------------|
| `A == 'J'` | om innehållet i minnesplats A är tecknet J |
| `B != 'J'` | om innehållet i minnesplats B inte är tecknet J |

## Villkor i kombinationer

```react:demo title="Logiska operatorer"
public class LogiskaOperatorer {
    public static void main(String[] args) {
        int A = 5;
        int B = 5;
        
        // && (och) - båda villkoren måste stämma
        if (A == B && B <= 10) {
            System.out.println("A är lika med B OCH B är mindre än eller lika med 10");
        }
        
        // || (eller) - minst ett villkor måste stämma
        if (A == B || A == 3) {
            System.out.println("Antingen är A lika med B ELLER så är A lika med 3");
        }
    }
}
---
A är lika med B OCH B är mindre än eller lika med 10
Antingen är A lika med B ELLER så är A lika med 3
```

### Logiska operatorer

| Operator | Symbol | Förklaring |
|----------|--------|------------|
| OCH | `&&` | Båda villkoren måste vara sanna |
| ELLER | `\|\|` | Minst ett villkor måste vara sant |

**Tip:** Eller-symbol `||` får du genom tangentkombination: Alt GR + < >-knapp ...två gånger

## Viktigt att komma ihåg

⚠️ **Observera skillnaden:**

- `A == 12` - **Kontroll** om innehållet i minnesplats A är lika med 12 (jämförelse)
- `A = 12` - **Lagra** talet 12 i minnesplats A (tilldelning)

## Sammanfattning

1. **If-satser** låter programmet välja mellan olika alternativ
2. **Relationsoperatorer** (`==`, `!=`, `<`, `>`, `<=`, `>=`) jämför värden
3. **Logiska operatorer** (`&&`, `||`) kombinerar villkor
4. **String-jämförelser** använder `.equals()` - inte `==`
5. **If-else if-else** kedjar flera villkor efter varandra

**Nästa steg:** Lär dig mer om **loopar** för att repetera kod!

</div>
<div class="section-separator"></div>

<div class="uppgifter-section">

## 📝 Uppgifter

### Uppgift 1: Ålderskontroll

Skapa ett program som kontrollerar om en person är myndig (18 år eller äldre).

1. Fråga användaren efter deras ålder.
2. Om åldern är 18 eller mer, skriv ut "Du är myndig!".
3. Annars, skriv ut "Du är inte myndig än.".

```react:demo title="Ålderskontroll"
import java.util.Scanner;

public class Alderskontroll {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        System.out.print("Hur gammal är du? ");
        int alder = scan.nextInt();
        
        if (alder >= 18) {
            System.out.println("Du är myndig!");
        } else {
            System.out.println("Du är inte myndig än.");
        }
    }
}
---
Hur gammal är du? 17
Du är inte myndig än.
```

### Uppgift 2: Betygsättaren

Skapa ett program som översätter poäng till betyg.

- A: 90-100 poäng
- B: 80-89 poäng
- C: 70-79 poäng
- D: 60-69 poäng
- E: 50-59 poäng
- F: 0-49 poäng

```react:demo title="Betygsättaren"
import java.util.Scanner;

public class Betyg {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        System.out.print("Ange dina poäng (0-100): ");
        int poang = scan.nextInt();
        
        if (poang >= 90) {
            System.out.println("Betyg: A");
        } else if (poang >= 80) {
            System.out.println("Betyg: B");
        } else if (poang >= 70) {
            System.out.println("Betyg: C");
        } else if (poang >= 60) {
            System.out.println("Betyg: D");
        } else if (poang >= 50) {
            System.out.println("Betyg: E");
        } else {
            System.out.println("Betyg: F");
        }
    }
}
---
Ange dina poäng (0-100): 75
Betyg: C
```

### Uppgift 3: Enkel Inloggning

Skapa ett program som simulerar en inloggning.

1. Spara ett "hemligt" lösenord i en variabel (t.ex. "java123").
2. Be användaren skriva in ett lösenord.
3. Jämför det inmatade lösenordet med det sparade.
4. Skriv ut "Välkommen!" om det är rätt, annars "Fel lösenord!".

**Kom ihåg:** Använd `.equals()` för att jämföra text!

```react:demo title="Enkel Inloggning"
import java.util.Scanner;

public class Login {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        String hemligtLosen = "java123";
        
        System.out.print("Ange lösenord: ");
        String input = scan.nextLine();
        
        if (input.equals(hemligtLosen)) {
            System.out.println("Välkommen! Du är inloggad.");
        } else {
            System.out.println("Fel lösenord! Åtkomst nekad.");
        }
    }
}
---
Ange lösenord: java123
Välkommen! Du är inloggad.
```

### Uppgift 4: Klädval efter väder

Skapa ett program som föreslår kläder baserat på temperatur.

1. Fråga efter temperaturen ute.
2. Om det är under 0 grader: "Ta på vinterjacka och mössa!"
3. Om det är mellan 0 och 10 grader: "Ta på en tjock tröja och jacka."
4. Om det är mellan 11 och 20 grader: "En luvtröja passar bra."
5. Om det är över 20 grader: "T-shirt väder!"

Försök lösa detta själv innan du tittar på lösningen!

</div>
