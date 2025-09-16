# Arrays

## Förklaring

En array är en samling värden (variabler) av samma typ. Ett enskilt värde i en array kallas element och man refererar till ett element med namnet på arrayen och ett index, där index anger position från arrayens början.

Det första elementet i arrayen har alltid index 0, det andra har index 1, det tredje har index 2 osv. Typen för ett index är ett heltal av typen int.

## Grundläggande Array-syntax

### Deklaration och definition

```java
int[] temp; // deklarera en array av heltal
```

alternativt kan du också skriva:

```java
int temp[]; // deklarera en array av heltal
```

Det är en smaksak vilket deklarationssätt man väljer.

### Skapa array med storlek

Efter det att en referensvariabel deklarerats ska du definiera själva storleken på arrayen.

```java
temp = new int[7];
```

Detta skapar en array med utrymme för 7 värden av typen int som kan refereras till med variabeln temp. Referensen temp anger i själva verket var arrayen lagras i minnet. Det är nyckelordet new som skapar (dvs reserverar minne för) arrayen. int [7] anger storleken på minnesreservationen.

### Kombinerad deklaration och definition

Man kan också slå ihop deklaration och definition på en enda rad:

```java
int[] temp = new int[7];
```

## Array-visualisering

Nedan finns en figur av arrayen:

```
temp    temp[0]  temp[1]  temp[2]  temp[3]  temp[4]  temp[5]  temp[6]
```

## Startvärden

När en array deklareras och definieras enligt ovan får varje element i arrayen ett automatiskt startvärde:

| Datatyp | Startvärde |
|---------|------------|
| Numeriska värden (int, double) | 0 |
| boolean | false |
| char | '\u0000' |
| Objekt (String) | null |

## Åtkomst till element

Man refererar till ett enskilt element i arrayen med hjälp av namnet på arrayen följt av elementets index omslutet av hakparenteser ( [ ] ).

```java
temp[0]; // första elementet i arrayen
temp[6]; // sjunde (sista) elementet i arrayen
```

## Array-initialisering

### Med värden vid skapande

```java
String namn[] = {"Kalle", "Musse", "Joakim", "Pluto"}; 
// Här har skapats minnesplats med fyra element och som redan fått innehåll.
```

### Tilldela värden efter skapande

```java
String namn[] = new String[5]; // fem poster skapas numrerade från 0-4
namn[1] = "Musse"; // här delas innehåll ut till bestämda minnesplatser
namn[2] = "Joakim";
```

## Övningar Arrays

### Övning 1 - Grundläggande array

```react:demo title="Övning 1 - Grundläggande array"
public class Ovning1 {
    public static void main(String argv[]) {
        int[] i = new int[5];
        System.out.println(i[4]); // vad får du för resultat?
    }
}
---
0
```

**Förklaring:** Arrayen skapas med 5 element (index 0-4). Alla element får automatiskt startvärdet 0.

### Övning 2 - Array bounds

```react:demo title="Övning 2 - Array bounds fel"
public class Ovning2 {
    public static void main(String argv[]) {
        int[] i = new int[5];
        System.out.println(i[5]); // Programmet kommer ge felmeddelande! Varför?
    }
}
---
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 5
```

**Förklaring:** Arrayen har bara index 0-4. Index 5 finns inte och ger ArrayIndexOutOfBoundsException.

### Övning 3 - Tilldela och skriv ut värden

Tilldela nu första elementet värdet 12. Gör likadant med det tredje elementet. Värdena i alla elementen ska skrivas ut med hjälp av en loop.

```react:demo title="Övning 3 - Tilldela och skriv ut"
public class Ovning3 {
    public static void main(String argv[]) {
        int[] i = new int[5];
        
        // Tilldela värden
        i[0] = 12; // första elementet
        i[2] = 12; // tredje elementet (index 2)
        
        // Skriv ut alla värden med loop
        for (int j = 0; j < i.length; j++) {
            System.out.println("Element " + j + ": " + i[j]);
        }
    }
}
---
Element 0: 12
Element 1: 0
Element 2: 12
Element 3: 0
Element 4: 0
```

### Övning 4 - Array med värden och omvänd ordning

Tilldela alla element ett värde enligt nedan:
```java
int i[] = {12, 14, 7, 6, 26};
```

Använd en loop för att skriva ut värdena i omvänd ordning.

```react:demo title="Övning 4 - Omvänd ordning"
public class Ovning4 {
    public static void main(String argv[]) {
        int i[] = {12, 14, 7, 6, 26};
        
        // Skriv ut i omvänd ordning
        for (int j = i.length - 1; j >= 0; j--) {
            System.out.println("Element " + j + ": " + i[j]);
        }
        
        // Visa antal element
        System.out.println("Antal element: " + i.length);
    }
}
---
Element 4: 26
Element 3: 6
Element 2: 7
Element 1: 14
Element 0: 12
Antal element: 5
```

**Tips:** Med hjälp av `length` kan man exempelvis förenkla loopen:
```java
for (int j = 0; j < i.length; j++)
```

### Övning 5 - Array med 100 element och summering

Skapa en array med plats för 100 heltal. Fyll fälten med talen 1, 2, 3, ... Använd en loop för detta. Summera talen och skriv ut summan.

```react:demo title="Övning 5 - 100 element och summering"
public class Ovning5 {
    public static void main(String argv[]) {
        int[] tal = new int[100];
        int summa = 0;
        
        // Fyll arrayen med talen 1-100
        for (int i = 0; i < tal.length; i++) {
            tal[i] = i + 1; // 1, 2, 3, ..., 100
        }
        
        // Summera alla tal
        for (int i = 0; i < tal.length; i++) {
            summa += tal[i];
        }
        
        System.out.println("Summan av talen 1-100: " + summa);
        
        // Visa några första och sista element
        System.out.println("Första element: " + tal[0]);
        System.out.println("Sista element: " + tal[99]);
    }
}
---
Summan av talen 1-100: 5050
Första element: 1
Sista element: 100
```

## Slump och sortering

### Slumpgenerering

Hur man slumpar fram värden har du fått pröva på tidigare. För att använda slump i Java behöver du:

```java
import java.util.Random;

Random rand = new Random();
int slumpatTal = rand.nextInt(100); // Slumpar tal 0-99
```

### Övning 6 - Slump och sortering

Skapa ett program innehållande en array för 10 heltal. Skapa även en minnesplats som kan spara ett tal temporärt/tillfälligt samt en minnesplats för att lagra ett slumpat tal.

**Vad programmet ska göra vid exekvering:**

1. **Slumpa tal och placera i arrayen**
2. **Utskrift av arrayens innehåll**
3. **Sortera arrayen med mini-sort**
4. **Utskrift av den sorterade arrayen**

```react:demo title="Övning 6 - Slump och sortering"
import java.util.Random;

public class Ovning6 {
    public static void main(String argv[]) {
        Random rand = new Random();
        int[] K = new int[10];
        int temp; // temporär minnesplats
        int slumpatTal; // minnesplats för slumpat tal
        
        // 1. Slumpa tal och placera i arrayen
        for (int j = 0; j < K.length; j++) {
            K[j] = rand.nextInt(100) + 1; // Slumpar tal 1-100
        }
        
        // 2. Utskrift av ursprungligt innehåll
        System.out.println("Ursprunglig array:");
        for (int j = 0; j < K.length; j++) {
            System.out.print(K[j] + " ");
        }
        System.out.println();
        
        // 3. Sortering med mini-sort (bubble sort)
        for (int i = 0; i < K.length - 1; i++) {
            for (int j = 0; j < K.length - 1 - i; j++) {
                if (K[j] > K[j + 1]) {
                    // Byt plats på elementen
                    temp = K[j];
                    K[j] = K[j + 1];
                    K[j + 1] = temp;
                }
            }
        }
        
        // 4. Utskrift av sorterad array
        System.out.println("Sorterad array:");
        for (int j = 0; j < K.length; j++) {
            System.out.print(K[j] + " ");
        }
        System.out.println();
    }
}
---
Ursprunglig array:
45 23 78 12 67 34 89 56 91 3
Sorterad array:
3 12 23 34 45 56 67 78 89 91
```

### Förklaring av sorteringsalgoritmen

**Mini-sort (Bubble Sort) princip:**

1. Jämför element [0] med [1], [2], [3]... [9]
2. Om element [0] är större än nästa, byt plats
3. Gå vidare till element [1] och jämför med [2], [3]... [9]
4. Fortsätt tills arrayen är sorterad

**Exempel på byte:**
```
Före:  [25, 14, ...]
Efter: [14, 25, ...]

temp = K[0];     // temp = 25
K[0] = K[1];     // K[0] = 14  
K[1] = temp;     // K[1] = 25
```

## Array-metoder och egenskaper

### length-egenskapen

```java
int[] tal = {1, 2, 3, 4, 5};
System.out.println("Arrayens längd: " + tal.length); // Skriver ut: 5
```

### Kopiera arrayer

```java
int[] original = {1, 2, 3, 4, 5};
int[] kopia = new int[original.length];

for (int i = 0; i < original.length; i++) {
    kopia[i] = original[i];
}
```

### Hitta största/minsta värde

```react:demo title="Hitta största och minsta värde"
public class ArrayMinMax {
    public static void main(String[] args) {
        int[] tal = {45, 23, 78, 12, 67, 34, 89, 56, 91, 3};
        
        int min = tal[0];
        int max = tal[0];
        
        for (int i = 1; i < tal.length; i++) {
            if (tal[i] < min) {
                min = tal[i];
            }
            if (tal[i] > max) {
                max = tal[i];
            }
        }
        
        System.out.println("Minsta värde: " + min);
        System.out.println("Största värde: " + max);
    }
}
---
Minsta värde: 3
Största värde: 91
```

## Vanliga misstag med arrays

⚠️ **Viktiga punkter att komma ihåg:**

1. **Array bounds:** Kom ihåg att index börjar på 0 och slutar på `length-1`
2. **Startvärden:** Nya arrays får automatiskt startvärden (0, false, null)
3. **Length vs index:** `array.length` ger antal element, men sista index är `length-1`
4. **Null pointer:** Kontrollera att arrayen inte är null innan användning

```java
// FEL - kommer ge ArrayIndexOutOfBoundsException
int[] arr = new int[5];
System.out.println(arr[5]); // Index 5 finns inte!

// RÄTT
int[] arr = new int[5];
System.out.println(arr[4]); // Sista elementet
```

## Sammanfattning

Arrays är kraftfulla verktyg för att lagra och hantera samlingar av data:

- **Deklaration:** `int[] arr;` eller `int arr[];`
- **Skapande:** `arr = new int[10];` eller `int[] arr = new int[10];`
- **Initialisering:** `int[] arr = {1, 2, 3, 4, 5};`
- **Åtkomst:** `arr[index]` där index börjar på 0
- **Längd:** `arr.length` ger antal element
- **Loopar:** Använd `for`-loopar för att gå igenom arrays
- **Sortering:** Mini-sort (bubble sort) för enkel sortering

**Nästa steg:** Träna på dessa övningar för att behärska arrays i Java!
