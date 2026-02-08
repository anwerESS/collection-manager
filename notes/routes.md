## 1️⃣ `inject()` : c’est quoi exactement ?

```ts
private readonly route = inject(ActivatedRoute);
private readonly router = inject(Router);
```

👉 `inject()` est **l’API moderne Angular (v14+)** pour récupérer un service **sans passer par le constructor**.

### Ancienne façon (toujours valide)

```ts
constructor(
  private route: ActivatedRoute,
  private router: Router
) {}
```

### Nouvelle façon (celle que tu utilises)

```ts
private readonly route = inject(ActivatedRoute);
private readonly router = inject(Router);
```

✔️ Plus concise
✔️ Compatible avec les **standalone components**
✔️ Fonctionne très bien avec **signals & zoneless**

---

## 2️⃣ `ActivatedRoute` : à quoi ça sert ?

### 📌 Rôle

`ActivatedRoute` représente **la route actuellement active**.

Il permet d’accéder à :

* paramètres d’URL (`/item/12`)
* query params (`?page=2`)
* données de résolution (`resolve`)
* fragments (`#section`)

---

### 🔍 Dans ton code précis

```ts
this.route.params.subscribe(params => {
  const selectedId = params['id'] ? parseInt(params['id']) : null;
  this.itemId.set(selectedId);
});
```

#### Ce qui se passe :

URL :

```
/item/5
```

Angular crée :

```ts
params = { id: '5' }
```

👉 Tu récupères `id`
👉 Tu le convertis en `number`
👉 Tu mets à jour ton **signal `itemId`**

---

### Exemple concret

```ts
/item/1  → itemId = 1
/item/2  → itemId = 2
```

Même composant, **URL différente**, valeur différente
➡️ Pas besoin de recréer le composant

---

## 3️⃣ Pourquoi un `subscribe()` ici ?

Angular **ne recrée pas le composant** quand seul le paramètre change.

👉 Il met à jour la route
👉 `ActivatedRoute.params` émet une nouvelle valeur

Donc :

```ts
/item/1 → /item/2
```

➡️ le `subscribe()` est indispensable pour capter le changement

---

## 4️⃣ `Router` : à quoi ça sert ?

### 📌 Rôle

`Router` permet de **naviguer programmatiquement**.

👉 Changer d’URL depuis le code

---

### Dans ce code

```ts
next() {
  const nextId = (this.itemId() || 0) + 1;
  this.router.navigate(['item', nextId]);
}
```

#### Ce que fait Angular :

1️⃣ Construit l’URL `/item/6`
2️⃣ Met à jour l’URL dans le navigateur
3️⃣ Active la nouvelle route
4️⃣ Déclenche `ActivatedRoute.params`

➡️ **Boucle complète navigation → param → signal**

---

### Autres exemples de `Router`

```ts
this.router.navigate(['/home']);
```

```ts
this.router.navigate(
  ['item', 10],
  { queryParams: { edit: true } }
);
```

URL :

```
/item/10?edit=true
```

---

## 5️⃣ Pourquoi `private readonly` ?

```ts
private readonly route
private readonly router
```

### `private`

* Utilisable **uniquement dans le composant**
* Pas exposé au template

### `readonly`

* Tu ne peux pas réassigner :

```ts
this.router = null; // ❌ interdit
```

👉 Bonne pratique Angular / TypeScript

---

## 6️⃣ Lien avec Signals & Change Detection

Ce code est **très propre et moderne** 👍

### Ce qui est bien fait :

* `ActivatedRoute` → Observable
* Observable → Signal (`itemId`)
* Template consomme un **signal**
* Compatible **OnPush / zoneless**

👉 Angular ne mettra à jour le HTML **que quand `itemId` change**

---

## 7️⃣ Version encore plus moderne (sans subscribe)

👉 Tu peux éviter le `Subscription` + `OnDestroy`

```ts
import { toSignal } from '@angular/core/rxjs-interop';

itemId = toSignal(
  this.route.params.pipe(
    map(params => params['id'] ? +params['id'] : null)
  )
);
```

✔️ Pas de `ngOnInit`
✔️ Pas de `ngOnDestroy`
✔️ Auto-cleanup
✔️ Full signals

---

## 8️⃣ Résumé ultra clair

| Ligne                    | Sert à quoi                           |
| ------------------------ | ------------------------------------- |
| `inject(ActivatedRoute)` | Lire les infos de l’URL actuelle      |
| `inject(Router)`         | Changer l’URL / naviguer              |
| `route.params`           | Écouter les changements de paramètres |
| `router.navigate()`      | Déclencher une navigation             |
| `signal()`               | Stocker l’état réactif                |
| `subscribe()`            | Réagir aux changements de route       |

---

### 🎯 En une phrase

> **`ActivatedRoute` lit l’URL, `Router` la modifie**.

---

# approche encore plus moderne
## 🔹 `withComponentInputBinding()` — l’idée générale

`withComponentInputBinding()` est une **option du Router Angular** qui dit :

> 👉 *“Quand le Router instancie un composant, il peut lui fournir des valeurs comme s’il avait un parent qui lui passait des `@Input`.”*

Autrement dit :
👉 **le Router joue le rôle d’un composant parent**.

---

## 📌 Pourquoi cette fonctionnalité existe ?

Historiquement :

* Le Router **créait** les composants
* Mais **ne se comportait pas comme un parent Angular**
* Donc il **ne pouvait pas passer des `@Input`**

➡️ Résultat :

* `ActivatedRoute`
* `params`, `data`, `queryParams`
* beaucoup de code impératif

`withComponentInputBinding()` **corrige cette anomalie historique**.

---

# 🧠 Le principe fondamental

### Sans `withComponentInputBinding()`

```
Router ──▶ crée le composant
          ❌ ne lui passe rien
```

### Avec `withComponentInputBinding()`

```
Router ──▶ crée le composant
          ✅ lui passe des valeurs via @Input / input()
```

👉 Le Router devient un **fournisseur de données déclaratif**.

---

# 🔌 Quelles données le Router peut lier ?

De façon générale, Angular peut lier :

1. **Route params**
2. **Query params**
3. **Route data**
4. **Resolve data**

Tout ça **comme des inputs**.

---

## Exemple conceptuel (sans code)

Imagine un composant avec ces entrées :

```
@Input() id
@Input() page
@Input() user
```

Avec `withComponentInputBinding()` :

* `id` peut venir de l’URL
* `page` des query params
* `user` d’un resolver

👉 **Le composant ne sait pas d’où ça vient**
👉 Il reçoit juste des valeurs

---

# 🧬 Le Router comme “parent invisible”

Dans Angular :

* Un parent passe des données à un enfant via `@Input`
* Avec `withComponentInputBinding()`, le Router **imite exactement ce mécanisme**

```
<router-outlet>
   ⬇️
   Router = parent invisible
   ⬇️
   Composant = enfant
```

➡️ Même sémantique que :

```html
<app-child [id]="42"></app-child>
```

---

# 🧠 Pourquoi c’est IMPORTANT architecturalement ?

Parce que ça :

* découple le composant du Router
* rend le composant plus pur
* améliore la testabilité
* réduit la connaissance du contexte

👉 **Le composant ne “sait pas” qu’il vient d’une route.**

---

# 🧪 Testabilité (concept)

Un composant qui dépend de :

* `ActivatedRoute`
* `Router`

➡️ est **couplé au routing**

Un composant qui dépend de :

* `@Input`

➡️ est **universel**

* utilisable ailleurs
* testable sans router

---

# ⚡ Performance & Change Detection

`withComponentInputBinding()` fonctionne très bien avec :

* `OnPush`
* `Signals`
* `Zoneless`

Pourquoi ?

* Le changement passe par **Input binding**
* Angular sait précisément **quoi rafraîchir**

---

# 🧩 Quand le binding se déclenche ?

Conceptuellement :

* À la création du composant
* À chaque changement d’URL correspondant
* Sans recréer le composant

👉 Comme un parent qui met à jour un input

---

# 🧠 Ce que `withComponentInputBinding()` NE FAIT PAS

❌ Il ne remplace pas le Router
❌ Il ne gère pas la navigation
❌ Il ne supprime pas les routes
❌ Il ne supprime pas `router-outlet`

👉 Il **change seulement la façon de transmettre les données**.

---

# 🧭 Pourquoi Angular l’a introduit maintenant ?

Parce que Angular évolue vers :

* composants plus purs
* moins d’effets de bord
* plus de déclaratif
* signals
* zoneless

👉 `withComponentInputBinding()` est **la brique manquante** pour aligner le Router avec cette vision.

---

# 🎯 Résumé mental

> **`withComponentInputBinding()` permet au Router de se comporter comme un composant parent qui fournit des `@Input` au composant routé.**

---