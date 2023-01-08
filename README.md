# TV-API
API qui permet de récupérer les programmes TV des 2 jours précédents et des 4 jours à venir.

## Version en ligne
>[https://daga123-tv-api.onrender.com/getPrograms](https://daga123-tv-api.onrender.com/getPrograms)
## Format des données
```
{
  "data":
     [
       {  "id" : "TF1.fr",
          "name" : "TF1",
          "icon" : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4u3EMdVyFA2uqIpbnwKBT1GRW9U-mA2jyCz28L2ieGx4vB9bKhpInhHCIqmk&amp;s",
          "programs" : [ 
            { 
              "name" : "Vendredi, tout est permis avec Arthur",
              "start" : 1673048400,
              "end" : 1673054700,
              "channel" : "TF1.fr",
              "icon" : "https://proxymedia.woopic.com/api/v1/images/340%2F/169_COL_9491352.jpg",
              "rating" : "Tout public",
              "cat" : "Divertissement",
              "desc" : "Comme toujours, le \"Vendredi, tout est permis avec Arthur\". Et ce ne sont pas les célèbres invités du maître de céans qui diront le contraire, eux que l'animateur fait danser, chanter, mimer, improviser, et bien plus encore. Mais puisque le show l'exige, tous se prêtent de bonne grâce aux..."
            }, 
            {other program},
            {other program},
            {other program},
            {other program},
          ]
       }
   ],
   [other channel],
   [other channel],
   [other channel],
}
          
```
