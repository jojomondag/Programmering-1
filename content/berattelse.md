# Inlämningsuppgift 3: Berättelse

## Uppgiftsbeskrivning

Din uppgift är att skapa ett interaktivt Java-program som bygger en personlig berättelse baserat på användarens inmatningar. Programmet ska kombinera `Scanner` för att läsa input och `String`-variabler för att lagra och manipulera data.

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
Använd `if`-satser för att skapa olika varianter baserat på input:

```react:demo title="Villkorad berättelse"
String namn = "Alex";
int ålder = 16;
String djur = "katt";

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
---
Alex gick till skolan som vanligt när...
Katten spann mystiskt!
```

### Utmaning 2: Formaterad presentation
Använd Unicode-tecken och formatering för snyggare output:

```react:demo title="Formaterad berättelse"
String namn = "Alex";
String stad = "Stockholm";
int ålder = 16;
String färg = "lila";
String djur = "katt";
String föremål = "spegel";

System.out.println("\n\u2728 " + "★".repeat(20) + " \u2728");
System.out.println("    \uD83D\uDCDA " + namn.toUpperCase() + "S ÄVENTYR \uD83D\uDCDA");
System.out.println("\u2728 " + "★".repeat(20) + " \u2728\n");

System.out.printf("📍 Plats: %s\n", stad);
System.out.printf("👤 Huvudperson: %s (%d år)\n", namn, ålder);
System.out.printf("🐾 Kompis: %s %s\n", färg, djur);
System.out.printf("✨ Magiskt föremål: %s\n\n", föremål);
---
✨ ★★★★★★★★★★★★★★★★★★★★ ✨
    📚 ALEXS ÄVENTYR 📚
✨ ★★★★★★★★★★★★★★★★★★★★ ✨

📍 Plats: Stockholm
👤 Huvudperson: Alex (16 år)
🐾 Kompis: lila katt
✨ Magiskt föremål: spegel
```

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

Lycka till med att skapa din berättelse!