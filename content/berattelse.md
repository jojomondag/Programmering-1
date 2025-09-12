# Inlämningsuppgift 3: Berättelse

*Skapa en personlig berättelse baserad på användarens svar*

## 🎯 Inlämningsuppgift 3: Berättelse
### Uppgift: Skapa en personlig berättelse

**🎯 Mål:** Användaren ska svara på frågor om sig själv eller sina intressen, och programmet ska sedan skapa en berättelse baserad på dessa svar.

I denna uppgift vill jag att ni skall skapa en berättelse åt mig. Jag skall som användare få svara på några frågor om mig själv eller om saker som intresserar mig. Därefter är det er uppgift att bygga en berättelse till mig som innehåller de element som jag tidigare har fått ange.

För att klara av uppgiften måste ni använda er av Scanner samt variabler. Jag vill att ni använder er av kommentarer i er kod, för att beskriva olika delar av koden för er själva men även för mig.

## 💡 Hints

- **Scanner** - för att läsa användarinput
- **Variabler** - för att lagra användarens svar
- **Utskrift** - för att presentera den färdiga berättelsen
- **Kommentarer** - för att förklara vad koden gör

## 📋 Vad du behöver göra

### 🔧 Tekniska krav:
- Använd Scanner för att läsa användarinput
- Använd olika typer av variabler (String, int, etc.)
- Ställ minst 5 frågor till användaren
- Skapa en sammanhängande berättelse från svaren
- Kommentera din kod tydligt

### 📝 Innehållskrav:
- Frågorna ska vara personliga eller om användarens intressen
- Berättelsen ska vara minst 3-4 meningar lång
- Inkludera alla användarens svar i berättelsen
- Gör berättelsen intressant och läsvärd

## 🚀 Kom igång - Skapa ditt projekt

Innan du börjar koda behöver du skapa ett nytt Java-projekt. Följ stegen nedan:

### 1. Skapa ett nytt projekt
![Nytt projekt](Images/New Project.png)
*Skapa ett nytt Java-projekt i din utvecklingsmiljö*

### 2. Bygg och testa projektet
![Bygg projekt](Images/Build Project.png)
*Se till att projektet kompilerar utan fel*

### 3. Öppna och börja koda
![Öppnat projekt](Images/Opened Project.png)
*Nu är du redo att börja skriva din berättelsekod!*

## 🏗️ Förslag på struktur

### 1. Välkomstmeddelande
Hälsa användaren välkommen och förklara vad programmet gör

### 2. Ställ frågor
Ställ 5-8 frågor och spara svaren i variabler

### 3. Skapa berättelsen
Kombinera svaren till en sammanhängande berättelse

### 4. Presentera resultatet
Skriv ut den färdiga berättelsen på ett snyggt sätt

## 💭 Exempel på frågor du kan ställa

### Personliga uppgifter
- Vad heter du?
- Hur gammal är du?
- Var bor du?

### Intressen & hobbies
- Vad har du för favoritfärg?
- Vilken sport gillar du mest?
- Vad är din favoritmat?
- Vilket är ditt favoritdjur?

### Framtid & drömmar
- Vad vill du jobba med i framtiden?
- Vilket land skulle du vilja besöka?
- Vad är din största dröm?

## 👨‍💻 Kodexempel

### Grundläggande setup

```java
import java.util.Scanner;

public class Berattelse {
    public static void main(String[] args) {
        // Skapa Scanner-objekt för att läsa input
        Scanner input = new Scanner(System.in);
        
        // Variabler för att lagra användarens svar
        String namn;
        int alder;
        String favoritfarg;
        
        // Välkomstmeddelande
        System.out.println("Välkommen till berättelsegenertorn!");
        System.out.println("Svara på frågorna så skapar jag en berättelse om dig.\n");
        
        // Resten av koden kommer här...
    }
}
```

### Så här ställer du frågor

```java
// Fråga om namn
System.out.print("Vad heter du? ");
namn = input.nextLine();

// Fråga om ålder
System.out.print("Hur gammal är du? ");
alder = input.nextInt();
input.nextLine(); // Konsumera kvarvarande newline

// Fråga om favoritfärg
System.out.print("Vad är din favoritfärg? ");
favoritfarg = input.nextLine();
```

### Skapa berättelsen

```java
// Skapa berättelsen
System.out.println("\n=== Din berättelse ===");
System.out.println("Det var en gång en person som hette " + namn + ".");
System.out.println("Den här personen var " + alder + " år gammal och älskade färgen " + favoritfarg + ".");
System.out.println(namn + " levde lyckligt i alla sina dagar!");
System.out.println("\nSlut på berättelsen!");
```

## 🔍 Komplett exempel

Här är ett komplett exempel som du kan använda som utgångspunkt:

```java
import java.util.Scanner;

public class Berattelse {
    public static void main(String[] args) {
        // Skapa Scanner-objekt för input
        Scanner input = new Scanner(System.in);
        
        // Variabler för att lagra svar
        String namn, favoritfarg, favoritdjur, dromyrke, dromland;
        int alder;
        
        // Välkomstmeddelande
        System.out.println("🌟 Välkommen till den magiska berättelsegeneratorn! 🌟");
        System.out.println("Svara på frågorna så skapar jag en personlig berättelse om dig.\n");
        
        // Ställ frågor och spara svar
        System.out.print("Vad heter du? ");
        namn = input.nextLine();
        
        System.out.print("Hur gammal är du? ");
        alder = input.nextInt();
        input.nextLine(); // Konsumera newline
        
        System.out.print("Vad är din favoritfärg? ");
        favoritfarg = input.nextLine();
        
        System.out.print("Vilket är ditt favoritdjur? ");
        favoritdjur = input.nextLine();
        
        System.out.print("Vad vill du jobba med i framtiden? ");
        dromyrke = input.nextLine();
        
        System.out.print("Vilket land skulle du vilja besöka? ");
        dromland = input.nextLine();
        
        // Skapa och presentera berättelsen
        System.out.println("\n" + "=".repeat(50));
        System.out.println("📖 DIN PERSONLIGA BERÄTTELSE 📖");
        System.out.println("=".repeat(50));
        
        System.out.println("\nDet var en gång en fantastisk person som hette " + namn + ".");
        System.out.println(namn + " var " + alder + " år gammal och hade en passion för färgen " + favoritfarg + ".");
        System.out.println("\nVarje dag drömde " + namn + " om att få träffa en " + favoritdjur + " i det vackra landet " + dromland + ".");
        System.out.println("När " + namn + " växte upp, bestämde hen sig för att bli " + dromyrke + " för att följa sina drömmar.");
        System.out.println("\nOch så levde " + namn + " lyckligt i alla sina dagar, omgiven av " + favoritfarg + " färger och vänliga " + favoritdjur + "!");
        
        System.out.println("\n🌟 SLUT PÅ BERÄTTELSEN 🌟");
        System.out.println("Tack för att du delade din historia med mig, " + namn + "!");
        
        // Stäng Scanner
        input.close();
    }
}
```

## 🎯 Tips för att lyckas

### 💻 Programmeringstips
- Kom ihåg `input.nextLine()` efter `nextInt()` för att undvika problem
- Använd beskrivande variabelnamn som `favoritfarg` istället för `f`
- Kommentera varje del av din kod så att andra förstår vad den gör

### 🎨 Kreativitetstips
- Gör frågorna personliga och intressanta
- Skapa en berättelse som känns sammanhängande
- Använd emojis eller specialtecken för att göra utskriften snyggare

### ⚠️ Vanliga misstag att undvika
- Glöm inte importera Scanner: `import java.util.Scanner;`
- Kom ihåg att stänga Scanner med `input.close();`
- Använd rätt datatyp för varje variabel
- Kontrollera att alla variabler används i berättelsen

## 📤 Inlämning

### 📋 Krav för inlämning:
- Komplett Java-fil med namnet `Berattelse.java`
- Koden ska vara kommenterad och lätt att förstå
- Programmet ska köra utan fel
- Berättelsen ska vara kreativ och använda alla insamlade svar

**Lämna in senast:** [Datum från läraren]

**Inlämningsmetod:** Ladda upp filen i Google Classroom under **Inlämning Uppgift 3: Berättelse**

### 📊 Bedömningskriterier:
- Teknisk korrekthet (Scanner, variabler, syntax)
- Kodkvalitet (kommentarer, struktur, namngivning)
- Kreativitet (intressanta frågor och berättelse)
- Fullständighet (alla delar implementerade)