## 1️⃣ Change Detection en Angular : le principe de base

Angular doit savoir **quand rafraîchir le HTML**.

👉 Il fait ça via le **Change Detection**
👉 À chaque déclenchement, Angular :

* parcourt le **component tree**
* compare les valeurs
* met à jour le DOM si nécessaire

### 🔁 Question clé

> **Quand Angular décide-t-il de relancer le change detection ?**

➡️ Historiquement : **grâce à Zone.js**

---

## 2️⃣ Zone.js : le fonctionnement classique

### 📌 Qu’est-ce que Zone.js ?

**Zone.js intercepte les opérations asynchrones** :

* `setTimeout`
* `Promise`
* `HTTP`
* `click`
* `keyup`
* `Observable`
* etc.

👉 À la fin de chaque événement async :
➡️ **Angular relance le change detection global**

### Exemple simple

```ts
@Component({
  selector: 'app-zone',
  template: `Count: {{ count }}`
})
export class ZoneComponent {
  count = 0;

  ngOnInit() {
    setTimeout(() => {
      this.count++; // 🔁 Angular le détecte automatiquement
    }, 1000);
  }
}
```

✔️ Ça marche **sans rien faire**
❌ Mais Angular **vérifie TOUS les composants**, même ceux qui n’ont pas changé

---

## 3️⃣ ChangeDetectionStrategy : Default vs OnPush

---

### 🔹 ChangeDetectionStrategy.Default (par défaut)

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.Default
})
```

#### Fonctionnement

* Angular **re-vérifie tout**
* Déclenché par :

  * événements
  * async
  * timers
  * HTTP
  * etc.

#### ❌ Inconvénient

* Moins performant
* Gros impact sur les grandes apps

---

### 🔹 ChangeDetectionStrategy.OnPush

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent {
  @Input() user!: User;
}
```

### Quand Angular met à jour un composant OnPush ?

Angular relance le CD **uniquement si** :

1️⃣ Une **@Input change par référence**

```ts
this.user = { ...this.user, name: 'Ali' }; // ✅
```

2️⃣ Un **event local**

```html
<button (click)="increment()">+</button>
```

3️⃣ Un **Observable / async pipe**

```html
{{ user$ | async }}
```

4️⃣ Appel manuel

```ts
cdr.markForCheck();
```

---

### ❌ Erreur classique

```ts
this.user.name = 'Ali'; // ❌ Pas détecté
```

➡️ La référence ne change pas

---

## 4️⃣ markForCheck vs detectChanges

```ts
constructor(private cdr: ChangeDetectorRef) {}
```

### 🔹 markForCheck()

* Marque le composant pour le prochain cycle
* Respecte OnPush

```ts
this.cdr.markForCheck();
```

### 🔹 detectChanges()

* Force immédiatement
* À utiliser avec parcimonie

```ts
this.cdr.detectChanges();
```

---

## 5️⃣ Le problème de Zone.js

### ❌ Problèmes

* Trop de cycles inutiles
* Peu prévisible
* Difficile à optimiser finement
* Coût perf sur mobile

➡️ Angular moderne veut **reprendre le contrôle**

---

## 6️⃣ Zoneless Angular (sans Zone.js)

### 📌 Qu’est-ce que le mode zoneless ?

👉 Angular **n’écoute plus automatiquement l’async**
👉 Le développeur **déclare explicitement** ce qui déclenche un rendu

Angular s’appuie sur :

* **Signals**
* **Events**
* **AsyncPipe**
* **markForCheck**

---

## 7️⃣ Signals = le moteur du zoneless

```ts
import { signal } from '@angular/core';

@Component({
  template: `Count: {{ count() }}`
})
export class SignalComponent {
  count = signal(0);

  increment() {
    this.count.update(v => v + 1);
  }
}
```

✔️ Angular sait **exactement quoi rafraîchir**
✔️ Aucun scan global
✔️ Ultra performant

---

## 8️⃣ Exemple Zoneless + OnPush

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button (click)="inc()">+</button>
    <p>{{ counter() }}</p>
  `
})
export class ZonelessComponent {
  counter = signal(0);

  inc() {
    this.counter.update(v => v + 1);
  }
}
```

👉 Angular ne met à jour **que ce composant**
👉 Pas de zone
👉 Pas de CD global

---

## 9️⃣ Comment activer le mode zoneless

```ts
bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection()
  ]
});
```

⚠️ Experimental (Angular 17/18)
Mais déjà très stable

---

## 🔟 Zone.js vs Zoneless : comparatif clair

| Critère        | Zone.js   | Zoneless     |
| -------------- | --------- | ------------ |
| Détection auto | ✅         | ❌            |
| Performance    | ❌ moyenne | ✅ excellente |
| Prévisibilité  | ❌         | ✅            |
| Contrôle dev   | ❌         | ✅            |
| Facilité       | ✅         | ❌            |
| Futur Angular  | ❌         | ✅            |

---

## 1️⃣1️⃣ Bonnes pratiques recommandées aujourd’hui

✅ Components en **OnPush**
✅ Utiliser **Signals**
✅ `async` pipe
❌ Éviter mutation d’objets
❌ Éviter `detectChanges()`

---

## 1️⃣2️⃣ Quand utiliser quoi ?

### Petite app / legacy

👉 Zone.js + Default

### App moderne / scalable

👉 OnPush + Signals + Zoneless

---

## 🎯 Résumé ultra simple

> **Zone.js** : Angular devine quand rafraîchir
> **OnPush** : Angular rafraîchit seulement si on lui donne une raison
> **Zoneless + Signals** : Angular sait exactement quoi rafraîchir
