## Návrh výukového serveru pro teoretickou informatiku

V rámci diplomových a bakalářských prací vzniká **výukový server pro předměty teoretické informatiky**. Server se skládá ze sady **dynamických webových stránek**, které studentům pomáhají pochopit různé typy úloh a problémů. Na rozdíl od běžných výukových textů s omezeným počtem ukázkových příkladů dokáží tyto stránky generovat **libovolný počet ukázek** na základě **vstupů od uživatele**.

Cílem této bakalářské práce (**Komponenta výukového serveru TI – Amortizovaná složitost 1**) je vytvořit komponentu pro pochopení **počítání složitosti algoritmů**, zejména s využitím **amortizované analýzy**. Důraz je kladen na názorné vysvětlení chování algoritmů v celé sekvenci operací (nejen v jednom kroku) a na vizualizaci změn **potenciálu Φ** (případně interpretace jako „naspořené mince/kredity“).

---

## Funkce webových stránek

Dynamické webové stránky budou umožňovat uživateli následující funkce:

### 1) Simulace běhu algoritmů
Zobrazit simulaci běhu alespoň **tří různých algoritmů**, u kterých je vhodné složitost analyzovat pomocí amortizované složitosti.

V této aplikaci jsou implementovány tyto algoritmy:
- **Multipop na zásobníku (Multipop on Stack)**
- **Fronta pomocí dvou zásobníků (Queue using Two Stacks)**
- **Splay strom (Splay Tree)**

---

### 2) Možnosti zadávání vstupů pro algoritmy
Každý algoritmus podporuje několik režimů zadávání:

- **Ručně (Manual)**  
  Uživatel zadá vstup uživatelsky přívětivým způsobem (např. hodnoty struktury nebo parametry operace).

- **Náhodný generátor (Random)**  
  Vstup lze generovat náhodně na základě nastavených parametrů (min, max, počet hodnot).

- **Ukázkové vstupy (Best / Worst case)**  
  Možnost spustit připravené scénáře (např. nejlepší nebo nejhorší případ), které názorně ukazují typické chování algoritmu.

- **Syntaxe (Syntax mode)**  
  Uživatel zadá celou sekvenci příkazů (např. `push(1,2,3) pop() multipop(2)`), která se vykonává krok po kroku.

---

### 3) Zobrazení informací při simulaci algoritmů
Během simulace se zobrazuje:

- **Aktuální stav výpočtu**  
  Obsah datových struktur (např. zásobník, dvě zásobníkové reprezentace fronty, struktura stromu) a jejich změny v čase.

- **Počet provedených kroků (Step Count)**  
  Počet elementárních operací provedených během simulace (např. vložení/odebrání prvku, přesun prvku mezi strukturami, porovnání, rotace).

- **Aktuální hodnota potenciálu / naspořených mincí**  
  Zobrazení **potenciálové metody** (Φ), případně ekvivalentní interpretace jako uložené kredity.
  - Multipop: typicky **Φ = |S|**
  - Fronta pomocí dvou zásobníků: typicky **Φ = |S_in|**
  - Splay strom: standardně **Φ(T) = Σ log₂(size(subtree(v)))**

---

### 4) Odvození složitosti
Ke každému algoritmu bude přímo na stránce dostupná **statická část s odvozením amortizované složitosti** (např. vysvětlení a výpočet pomocí potenciálové metody, případně účetní interpretace).

---

## Spolupráce mezi studenty

Studenti řešící toto zadání s rozdílným číslem v názvu mohou (ale nemusí) spolupracovat tak, aby výsledek obsahoval **společné uživatelské rozhraní**. Každý student však implementuje **odlišné tři algoritmy** a jejich simulace.
