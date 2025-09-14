# Inlämningsuppgift 3: Berättelse

## Uppgiftsbeskrivning

Din uppgift är att skapa ett interaktivt Java-program som bygger en personlig berättelse baserat på användarens inmatningar. Programmet ska kombinera [code]Scanner[/code] för att läsa input och [code]String[/code]-variabler för att lagra och manipulera data.

## Krav på programmet

### Grundkrav (för godkänt)

1. **Använd Scanner** för att läsa minst 5 olika inputs från användaren
2. **Skapa variabler** av olika typer (String, int)
3. **Bygg en berättelse** som använder alla inmatade värden
4. **Formatera output** med tydlig struktur och läsbarhet

### Förslag på inputs

Du kan fråga efter:
- Namn på en huvudperson
- En plats eller stad
- Ett djur
- En färg
- Ett tal (ålder, antal, etc.)
- Ett föremål
- En känsla eller adjektiv
- En aktivitet eller hobby

## Exempelprogram

```react:demo title="Berättelseprogram - Mall"
import java.util.Scanner;

public class Berättelse {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Samla information från användaren
        System.out.println("Välkommen till berättelsegeneratorn!");
        System.out.println("Svara på frågorna för att skapa din personliga berättelse.\n");
        
        System.out.print("Vad heter huvudpersonen? ");
        String namn = scanner.nextLine();
        
        System.out.print("Vilken stad utspelar sig berättelsen i? ");
        String stad = scanner.nextLine();
        
        System.out.print("Vilket djur ska vara med? ");
        String djur = scanner.nextLine();
        
        System.out.print("Välj en färg: ");
        String färg = scanner.nextLine();
        
        System.out.print("Ange huvudpersonens ålder: ");
        int ålder = scanner.nextInt();
        scanner.nextLine(); // Äter upp radbrytningen
        
        System.out.print("Vilket föremål ska vara viktigt i berättelsen? ");
        String föremål = scanner.nextLine();
        
        // Skapa och presentera berättelsen
        System.out.println("\n" + "=".repeat(50));
        System.out.println("           DIN PERSONLIGA BERÄTTELSE");
        System.out.println("=".repeat(50));
        
        System.out.println("Det var en gång en " + ålder + " år gammal person som hette " + namn + ".");
        System.out.println("Hen bodde i den vackra staden " + stad + " tillsammans med sin");
        System.out.println("bästa vän, en " + färg + " " + djur + ".");
        System.out.println();
        System.out.println("En dag hittade " + namn + " ett mystiskt " + föremål + " i parken.");
        System.out.println("När hen rörde vid " + föremål + "et började det lysa i " + färg + " ljus!");
        System.out.println();
        System.out.println("Plötsligt kunde " + djur + "et prata! \"" + namn + ",\" sa " + djur + "et,");
        System.out.println("\"detta " + föremål + " kommer att förändra allt i " + stad + "!\"");
        System.out.println();
        System.out.println("Och så började " + namn + "s fantastiska äventyr...");
        
        System.out.println("=".repeat(50));
        System.out.println("Tack för att du skapade en berättelse!");
        
        scanner.close();
    }
}
---
Välkommen till berättelsegeneratorn!
Svara på frågorna för att skapa din personliga berättelse.

Vad heter huvudpersonen? Alex
Vilken stad utspelar sig berättelsen i? Stockholm
Vilket djur ska vara med? katt
Välj en färg: lila
Ange huvudpersonens ålder: 16
Vilket föremål ska vara viktigt i berättelsen? spegel

==================================================
           DIN PERSONLIGA BERÄTTELSE
==================================================
Det var en gång en 16 år gammal person som hette Alex.
Hen bodde i den vackra staden Stockholm tillsammans med sin
bästa vän, en lila katt.

En dag hittade Alex ett mystiskt spegel i parken.
När hen rörde vid spegelet började det lysa i lila ljus!

Plötsligt kunde katten prata! "Alex," sa katten,
"detta spegel kommer att förändra allt i Stockholm!"

Och så började Alexs fantastiska äventyr...
==================================================
Tack för att du skapade en berättelse!
```

## Kreativa utmaningar (för högre betyg)

### Utmaning 1: Villkorad berättelse
Använd [code]if[/code]-satser för att skapa olika varianter baserat på input:

```react:freeflow title="Villkorad berättelse"
if (ålder < 18) {
    System.out.println(namn + " gick till skolan som vanligt när...");
} else {
    System.out.println(namn + " var på väg till jobbet när...");
}

if (djur.equals("hund")) {
    System.out.println("Hunden skällde varningande!");
} else if (djur.equals("katt")) {
    System.out.println("Katten spann mystiskt!");
} else {
    System.out.println(djur + "et såg förvånat ut!");
}
```

### Utmaning 2: Formaterad presentation
Använd Unicode-tecken och formatering för snyggare output:

```react:freeflow title="Formaterad berättelse"
System.out.println("\n\u2728 " + "★".repeat(20) + " \u2728");
System.out.println("    \uD83D\uDCDA " + namn.toUpperCase() + "S ÄVENTYR \uD83D\uDCDA");
System.out.println("\u2728 " + "★".repeat(20) + " \u2728\n");

System.out.printf("📍 Plats: %s\n", stad);
System.out.printf("👤 Huvudperson: %s (%d år)\n", namn, ålder);
System.out.printf("🐾 Kompis: %s %s\n", färg, djur);
System.out.printf("✨ Magiskt föremål: %s\n\n", föremål);
```

### Utmaning 3: Slumpmässiga element
Lägg till slumpmässighet för variation:

```react:freeflow title="Slumpmässiga element"
import java.util.Random;

Random random = new Random();
String[] väder = {"soligt", "regnigt", "snöigt", "dimmigt"};
String[] tider = {"morgon", "eftermiddag", "kväll", "natt"};

String valdVäder = väder[random.nextInt(väder.length)];
String valdTid = tider[random.nextInt(tider.length)];

System.out.println("Det var en " + valdVäder + " " + valdTid + " när " + namn + "...");
```

## Bedömningskriterier

### Godkänt (E)
- ✅ Programmet kompilerar och körs utan fel
- ✅ Använder Scanner för att läsa minst 5 inputs
- ✅ Skapar en sammanhängande berättelse
- ✅ Använder både String- och int-variabler
- ✅ Tydlig och läsbar kod med kommentarer

### Väl godkänt (C)
- ✅ Alla krav för godkänt uppfylls
- ✅ Kreativ och engagerande berättelse
- ✅ Använder villkor eller formatering för variation
- ✅ Bra struktur och läsbarhet i koden

### Mycket väl godkänt (A)
- ✅ Alla krav för väl godkänt uppfylls
- ✅ Avancerad formatering och presentation
- ✅ Implementerar flera kreativa funktioner
- ✅ Exceptionell kodkvalitet och kreativitet

## Tips för utveckling

1. **Planera först** - Skissa din berättelse på papper innan du kodar
2. **Testa ofta** - Kör programmet efter varje tillägg
3. **Var kreativ** - Låt fantasin flöda, berättelsen ska vara rolig!
4. **Använd kommentarer** - Förklara vad olika delar av koden gör
5. **Formatera snyggt** - Använd indentering och blankrader

## Inlämning

- **Format:** En .java-fil med ditt program
- **Namngivning:** `Berättelse_DittNamn.java`
- **Deadline:** Se Classroom för datum
- **Dokumentation:** Inkludera kommentarer som förklarar din kod

Lycka till med att skapa din berättelse! 📖✨