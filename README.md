# Crypto Watch Tower

Note sur la stabilité des requêtes API

Lors des tests, il est possible que certaines requêtes à l’API échouent de manière intermittente, entraînant l'erreur suivante :
AxiosError: Network Error

Ce comportement est principalement dû aux limitations et contraintes imposées par l’API utilisée.

Les restrictions de débit peuvent provoquer un blocage temporaire lorsqu’un trop grand nombre de requêtes est envoyé sur une courte période.

Enfin, la fiabilité de l’API elle-même peut être en cause. Étant une API publique ou gratuite, elle peut être sujette à des indisponibilités temporaires.

🔹 Recommandations

Si vous rencontrez cette erreur lors des tests, nous vous recommandons d’attendre quelques instants avant de relancer la requête.

Il est également conseillé de vérifier que les paramètres envoyés respectent les contraintes définies par l’API.

Enfin, examiner la console peut permettre d’identifier d’éventuelles réponses d’erreur détaillées.

Ce problème étant lié à des facteurs externes, nous vous remercions de prendre en compte ces contraintes lors de l’évaluation du projet.

---

Market data : `https://api.coingecko.com/api/v3/global`

All market data : `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y`

Coin price chart : `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${duration}${duration > 32 ? "&interval=daily" : ""}`

Coingecko : `https://www.coingecko.com/fr/pi%C3%A8ces/`
