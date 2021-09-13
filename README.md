# Obbligo verità bot
## Generale
Obbligo verita game bot è un bot telegram che consente di giocare a obbligo a verità.

link al bot: https://t.me/obbligo_verita_game_bot.

Stato attuale: spento

Versione: versione base (<1.0.0)

## Obbiettivo
Creare un bot telegram che permetta di giocare a obbligo verità con amici.

Il bot deve consentire di:
- fare partite con solo obbligo - verità (versione base)
- fare partite con più giocatori
- far proporre obblighi o verità ai giocatori che saranno poi filtrati e inseriti nel gioco

# Specifiche tecniche
## Generale
Linguaggio utilizzato: Javascript, SQL

Librerie npm utilizzate: dotenv, sqlite3, telegraf

Database: SQLite (relazionale)

## Database
Il database è caratterizzato da 4 tabelle: obblighi, verita, partite, proposte.

- obblighi: (testo: Il testo dell'obbligo, indice: (fac) indice di linguaggio utilizzato) contiene tutti gli obblighi che il gioco manderà
- verita:  (testo: Il testo della verità, indice: (fac) indice di linguaggio utilizzato) contiene tutte le verità che il gioco manderà
- partite: (giocatori: Array con tutti i giocatori di una partita, obblighi: tutti gli obblighi già mandati, verita: tutte le cerità già mandate) contiene tutte le partite attive in un momento
- proposte: (testo: Il testo della proposta, tipo: Il tipo della proposta ('obbligo' - 'verita')) contiene tutte le proposte per futuri obblighi o verità
