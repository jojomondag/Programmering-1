# If-satser

## Introduktion

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

## Praktiska Tillämpningar

If-satser är särskilt användbara för:
- Spel (som högt-lågt-spel)
- Validering av användarinput
- Menysystem och navigation
- Beräkningar med villkor

Se [övningarna](#📝-övningar-och-uppgifter) nedan för praktiska exempel på dessa tillämpningar.

## Sammanfattning

1. **If-satser** låter programmet välja mellan olika alternativ
2. **Relationsoperatorer** (`==`, `!=`, `<`, `>`, `<=`, `>=`) jämför värden
3. **Logiska operatorer** (`&&`, `||`) kombinerar villkor
4. **String-jämförelser** använder `.equals()` - inte `==`
5. **If-else if-else** kedjar flera villkor efter varandra

**Nästa steg:** Lär dig mer om **loopar** för att repetera kod!

<div class="section-separator"></div>

<div class="uppgifter-section">

## 📝 Uppgifter

### Uppgift 1: Högt-Lågt-Spel

Du ska skapa ett högt-lågt-spel. Datorn ska först slumpa fram ett tal mellan 0 och 100. Sedan gissar spelaren vilket tal det är, varefter datorn svarar med "för högt" eller "för lågt". Programmet fortsätter tills spelaren har gissat rätt.

#### Förberedelser

```java
import java.util.Scanner;

// Skapa följande kod:
int slump = 0;
slump = ((int)(Math.random() * 100 + 1));  //slumpar tal upp till 100, +1 undviker siffran 0
```

#### Instruktioner

1. Använd if-sats för att avgöra om man ska gissa på ett lägre tal eller ett högre
2. Om ditt tal är högre än det slumpade – skriv ut på skärmen "Mindre"
3. Om ditt tal är lägre än det slumpade – skriv ut på skärmen "Högre"
4. Om talet är samma som slumpade – skriv ut på skärmen "Rätt gissat!"
5. Räkna även hur många gissningar som behövdes och skriv ut: "Du behövde ... gissningar"

```react:demo title="Högt-Lågt-Spel exempel"
import java.util.Scanner;

public class HögtLågtSpel {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        // Slumpa ett tal mellan 1-100
        int slump = ((int)(Math.random() * 100 + 1));
        int gissning = 0;
        int antalGissningar = 0;
        
        System.out.println("Välkommen till Högt-Lågt-spelet!");
        System.out.println("Gissa ett tal mellan 1 och 100");
        
        // Spela tills rätt gissning
        while (gissning != slump) {
            System.out.print("Din gissning: ");
            gissning = scan.nextInt();
            antalGissningar++;
            
            if (gissning > slump) {
                System.out.println("Mindre");
            }
            else if (gissning < slump) {
                System.out.println("Högre");
            }
            else {
                System.out.println("Rätt gissat!");
                System.out.println("Du behövde " + antalGissningar + " gissningar");
            }
        }
    }
}
---
Välkommen till Högt-Lågt-spelet!
Gissa ett tal mellan 1 och 100
Din gissning: 50
Högre
Din gissning: 75
Mindre
Din gissning: 62
Högre
Din gissning: 68
Rätt gissat!
Du behövde 4 gissningar
```

### Uppgift 2: Fortsätta-funktion

Lägg till följande steg i Uppgift 1:

1. Skapa en egen minnesplats för text med namnet: `svar`
2. Skapa ytterligare en Scanner: `Scanner scan2 = new Scanner(System.in);`
3. Skriv en fråga som uppmuntrar användaren till att svara genom att skriva ja eller nej
4. Använd `svar = scan2.nextLine()` för att ta emot svaret i minnesplatsen med namnet svar
5. Skapa en if-sats enligt ex. `if (svar.equals("ja")) { }`
6. Inom `{ }` skriver du ut en bekräftelse av vad användaren svarat. Ex. "Ditt svar var: ja."
7. Skapa en if-sats med information om att svaret var nej
8. Omge större delen av din kod med en do/while – loop som körs medan svaret är "ja"

```react:demo title="Fortsätta-funktion exempel"
import java.util.Scanner;

public class FortättaFunktion {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        String svar;
        
        do {
            System.out.println("Detta är ett enkelt program");
            System.out.println("Programmet är klart!");
            
            System.out.print("Vill du köra programmet igen? (ja/nej): ");
            svar = scan.nextLine();
            
            if (svar.equals("ja")) {
                System.out.println("Ditt svar var: ja. Startar om...");
            }
            else {
                System.out.println("Ditt svar var: nej. Avslutar programmet.");
            }
            
        } while (svar.equals("ja"));
        
        System.out.println("Tack för att du använde programmet!");
    }
}
---
Detta är ett enkelt program
Programmet är klart!
Vill du köra programmet igen? (ja/nej): ja
Ditt svar var: ja. Startar om...
Detta är ett enkelt program
Programmet är klart!
Vill du köra programmet igen? (ja/nej): nej
Ditt svar var: nej. Avslutar programmet.
Tack för att du använde programmet!
```

### Uppgift 3: 21-spel (Black Jack) 

*(Görs om du siktar på högre betyg)*

Skriv ett 21-spel (Black Jack). För att göra det lite enklare så räcker det att slumpa ett tal mellan 1 och 13. 

#### Regler:
- Datorn spelar bank och måste "ta kort" så länge den har under 17 poäng
- När datorn har mer än eller lika med 17 poäng måste den sluta "ta kort"
- Innan/efter datorn får kort skall en spelare få kort
- Spelaren styrs av den som spelar spelet (tillfrågas om fler kort önskas)
- Låt spelaren svara med J eller N
- Programmet skall avgöra vem som har vunnit efter att båda tagit kort
- Får både spelare och bank över 21 poäng vinner ingen

```react:demo title="21-spel exempel"
import java.util.Scanner;

public class TjugoettSpel {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        // Starta spelet
        int spelarPoäng = 0;
        int bankPoäng = 0;
        String svar;
        
        System.out.println("Välkommen till 21-spel!");
        
        // Spelarens tur
        do {
            int kort = (int)(Math.random() * 13 + 1);
            spelarPoäng += kort;
            System.out.println("Du fick kort: " + kort);
            System.out.println("Dina poäng: " + spelarPoäng);
            
            if (spelarPoäng < 21) {
                System.out.print("Vill du ha ett till kort? (J/N): ");
                svar = scan.nextLine();
            } else {
                break;
            }
        } while (svar.equals("J"));
        
        // Bankens tur
        System.out.println("\nBankens tur:");
        while (bankPoäng < 17) {
            int kort = (int)(Math.random() * 13 + 1);
            bankPoäng += kort;
            System.out.println("Banken fick kort: " + kort);
            System.out.println("Bankens poäng: " + bankPoäng);
        }
        
        // Avgör vinnare
        System.out.println("\n--- RESULTAT ---");
        System.out.println("Dina poäng: " + spelarPoäng);
        System.out.println("Bankens poäng: " + bankPoäng);
        
        if (spelarPoäng > 21 && bankPoäng > 21) {
            System.out.println("Båda fick över 21 - ingen vinner!");
        }
        else if (spelarPoäng > 21) {
            System.out.println("Du fick över 21 - banken vinner!");
        }
        else if (bankPoäng > 21) {
            System.out.println("Banken fick över 21 - du vinner!");
        }
        else if (spelarPoäng > bankPoäng) {
            System.out.println("Du vinner!");
        }
        else if (bankPoäng > spelarPoäng) {
            System.out.println("Banken vinner!");
        }
        else {
            System.out.println("Oavgjort!");
        }
    }
}
---
Välkommen till 21-spel!
Du fick kort: 7
Dina poäng: 7
Vill du ha ett till kort? (J/N): J
Du fick kort: 10
Dina poäng: 17
Vill du ha ett till kort? (J/N): N

Bankens tur:
Banken fick kort: 8
Bankens poäng: 8
Banken fick kort: 9
Bankens poäng: 17

--- RESULTAT ---
Dina poäng: 17
Bankens poäng: 17
Oavgjort!
```

### Uppgift 4: Flera omgångar

Bygg vidare på uppgiften ovan så att man kan spela fler omgångar om man vill utan att starta om programmet helt på nytt.

```react:demo title="Flera omgångar exempel"
import java.util.Scanner;

public class FlereraOmgångar {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        String spelaIgen;
        
        do {
            System.out.println("=== NY OMGÅNG ===");
            // Här skulle hela spelet från övning 3 vara
            System.out.println("Spelet är klart!");
            
            System.out.print("Vill du spela igen? (ja/nej): ");
            spelaIgen = scan.nextLine();
            
        } while (spelaIgen.equals("ja"));
        
        System.out.println("Tack för att du spelade!");
    }
}
---
=== NY OMGÅNG ===
Spelet är klart!
Vill du spela igen? (ja/nej): ja
=== NY OMGÅNG ===
Spelet är klart!
Vill du spela igen? (ja/nej): nej
Tack för att du spelade!
```

### Uppgift 5: Bankomat

*(Görs om du siktar på högre betyg)*

Tänk dig att du ska bygga en bankomat där en person som har 1000:- på banken kan få lov att ta ut pengar. 

#### Vad sker från det att kunden sätter in sitt bankomatkort tills dess att uttaget är färdigt och kortet returnerats?

Denna övning ska utföras i tre delar:

**1. Flödesschema**
Skapa/rita ett flödesschema som visar de olika momenten i processen att ta ut pengar

**2. Kod analys**
Fundera vilken form av kod du ska använda när utifrån ditt flödesschema

**3. Bygg programmet**
Programmera!

#### Kom-i-håg att:
- Man inte kan ta ut mer pengar än vad som finns på kontot!
- Lösenordskontroll...
- Visa saldo efter uttag
- Kunna ta ut mer pengar direkt om så önskas
- Välja på att ta ut pengar eller se saldo
- Endast ta ut jämna summor
- Tydliga instruktioner

```react:demo title="Bankomat exempel"
import java.util.Scanner;

public class Bankomat {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        
        int saldo = 1000;
        int lösenord = 1234;
        int inmatat;
        String val;
        
        System.out.println("=== VÄLKOMMEN TILL BANKOMATEN ===");
        System.out.print("Ange ditt lösenord: ");
        inmatat = scan.nextInt();
        scan.nextLine(); // Rensa scanner
        
        if (inmatat == lösenord) {
            System.out.println("Rätt lösenord!");
            
            do {
                System.out.println("\n=== HUVUDMENY ===");
                System.out.println("1. Ta ut pengar");
                System.out.println("2. Se saldo");
                System.out.print("Välj (1/2): ");
                val = scan.nextLine();
                
                if (val.equals("1")) {
                    System.out.print("Hur mycket vill du ta ut? ");
                    int uttag = scan.nextInt();
                    scan.nextLine();
                    
                    if (uttag % 100 != 0) {
                        System.out.println("Du kan endast ta ut jämna hundratal!");
                    }
                    else if (uttag > saldo) {
                        System.out.println("Otillräckligt saldo!");
                    }
                    else {
                        saldo = saldo - uttag;
                        System.out.println("Uttag genomfört: " + uttag + " kr");
                        System.out.println("Kvarvarande saldo: " + saldo + " kr");
                    }
                }
                else if (val.equals("2")) {
                    System.out.println("Ditt saldo: " + saldo + " kr");
                }
                
                System.out.print("Vill du göra något mer? (ja/nej): ");
                val = scan.nextLine();
                
            } while (val.equals("ja"));
            
            System.out.println("Tack för ditt besök!");
        }
        else {
            System.out.println("Fel lösenord! Kortet spärras.");
        }
    }
}
---
=== VÄLKOMMEN TILL BANKOMATEN ===
Ange ditt lösenord: 1234
Rätt lösenord!

=== HUVUDMENY ===
1. Ta ut pengar
2. Se saldo
Välj (1/2): 1
Hur mycket vill du ta ut? 200
Uttag genomfört: 200 kr
Kvarvarande saldo: 800 kr
Vill du göra något mer? (ja/nej): ja

=== HUVUDMENY ===
1. Ta ut pengar
2. Se saldo
Välj (1/2): 2
Ditt saldo: 800 kr
Vill du göra något mer? (ja/nej): nej
Tack för ditt besök!
</div>
