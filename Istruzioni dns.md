## Architettura di Risoluzione dei Nomi: Il Sistema DNS

Il DNS (Domain Name System, sistema dei nomi di dominio) funziona come un registro decentralizzato che traduce un nome di dominio testuale, o FQDN (Fully Qualified Domain Name, nome di dominio completamente qualificato), in un indirizzo IP (Internet Protocol, protocollo internet) numerico binario, necessario per l'instradamento dei pacchetti di dati nella rete globale.

Quando un utente digita `tecnitaliagroup.it`, il browser non conosce l'indirizzo della destinazione per inviare la richiesta HTTP (Hypertext Transfer Protocol, protocollo di trasferimento ipertestuale). Interroga quindi una catena di server DNS (Risolutore Locale, Root Nameserver, TLD [Top-Level Domain, dominio di primo livello] Nameserver e infine il Nameserver Autorevole di OVHcloud) per ottenere l'IP del server di destinazione.

---

## Mappatura e Configurazione dei Record nella Zona DNS di OVH

La Zona DNS è il file di configurazione ospitato su OVHcloud che contiene i puntamenti specifici del dominio. Per far funzionare il sito web sull'infrastruttura di GitHub Pages associata all'utente **Frabressi**, si utilizzano due tipi di record fondamentali:

### 1. Record A (Address)
Il record A associa direttamente un nome di dominio a un indirizzo IPv4 (Internet Protocol version 4) statico a 32 bit. 
Per la radice del dominio (`tecnitaliagroup.it`), si configurano **quattro record A distanti** puntati sui server di ricezione di GitHub.

| Tipo Record | Host / Sottodominio | Destinazione / Target | Funzione Tecnica |
| :--- | :--- | :--- | :--- |
| **A** | *Vuoto* (o `@`) | `185.199.108.153` | Instradamento primario e bilanciamento del carico |
| **A** | *Vuoto* (o `@`) | `185.199.109.153` | Tolleranza ai guasti (Failover) 1 |
| **A** | *Vuoto* (o `@`) | `185.199.110.153` | Tolleranza ai guasti (Failover) 2 |
| **A** | *Vuoto* (o `@`) | `185.199.111.153` | Tolleranza ai guasti (Failover) 3 |

### 2. Record CNAME (Canonical Name)
Il record CNAME crea un alias, associando un nome di sottodominio a un altro nome di dominio. Si applica per instradare correttamente il traffico del terzo livello (`www.tecnitaliagroup.it`) verso l'infrastruttura dell'utente **Frabressi**.

```text
Sottodominio: www
Tipo: CNAME
Target: frabressi.github.io.
```

> **Nota di Rigore Tecnico:** All'interno del pannello OVHcloud, quando si inserisce il target del CNAME esterno, è necessario inserire il punto finale (`.`) dopo `.io`. Questo indica al server DNS che si tratta di un nome di dominio assoluto, impedendo al sistema di concatenare il dominio nativo (che genererebbe l'errore di risoluzione `frabressi.github.io.tecnitaliagroup.it`).

---

## Meccanismo di Propagazione e Parametro TTL

Ogni modifica eseguita sulla tabella DNS non è istantanea a livello mondiale. Questo fenomeno è regolato dal **TTL (Time To Live, tempo di vita)**, un valore espresso in secondi che indica per quanto tempo i server DNS intermedi dei vari fornitori di rete memorizzano in cache i vecchi dati prima di interrogare nuovamente i server di OVHcloud.

* Se il TTL è impostato sul valore predefinito (es. 86400 secondi), i provider mondiali aggiorneranno il puntamento del sito solo dopo 24 ore.
* **Approccio di ottimizzazione:** Prima di modificare i record A e CNAME, è consigliabile verificare il TTL della zona DNS. Una volta inseriti i record di GitHub con l'indirizzo `frabressi.github.io.`, i server DNS globali impiegheranno dalle 2 alle 4 ore per completare la propagazione standard.

---

## Flusso Operativo di Gestione (Interazione OVHcloud - GitHub Pages)

L'architettura Jamstack (JavaScript, APIs, and Markup) scelta per la repository **`tecnitalia-web`** scinde la gestione logica da quella infrastrutturale:

```
[Utente] ---> Digita URL ---> [DNS OVH] (Risolve IP) ---> [Server Cloud GitHub] (Invia file di tecnitalia-web)
```

1.  **Richiesta iniziale:** L'utente richiede la pagina web digitando `www.tecnitaliagroup.it`.
2.  **Risoluzione:** I DNS di OVHcloud rispondono comunicando l'alias `frabressi.github.io.`.
3.  **Negoziazione TLS/SSL:** GitHub Pages intercetta la richiesta diretta alla repository **`tecnitalia-web`**, verifica la corrispondenza del dominio nelle impostazioni del progetto, genera automaticamente un certificato crittografico SSL (Secure Sockets Layer) / TLS (Transport Layer Security) tramite l'ente *Let's Encrypt* e avvia la sessione sicura HTTPS (Hypertext Transfer Protocol Secure).
4.  **Consegna asset:** I file statici (HTML, CSS, JSON) vengono distribuiti istantaneamente tramite la rete di distribuzione dei contenuti (CDN, Content Delivery Network) di GitHub.

---

## Strumenti di Diagnostica e Verifica della Configurazione

Per convalidare l'infrastruttura senza l'interferenza della cache locale, si devono utilizzare strumenti di analisi di rete via CLI (Command Line Interface, interfaccia della riga di comando):

### Test dei record A tramite comando 'dig' (Sistemi Unix/macOS)
```bash
dig tecnitaliagroup.it +short
```
*Risultato atteso: l'output deve restituire esattamente i 4 indirizzi IP di GitHub (185.199.108.153, ecc).*

### Test del record CNAME tramite comando 'nslookup' (Sistemi Windows)
```cmd
nslookup www.tecnitaliagroup.it
```
*Risultato atteso: il terminale deve mostrare come alias di riferimento la stringa frabressi.github.io.*

### Strumenti Web di Ottimizzazione e SEO (Search Engine Optimization)
* **WhatsMyDNS.net:** Permette di monitorare la propagazione globale dei record A e CNAME su scala internazionale in tempo reale.
* **Pannello di Controllo GitHub:** All'interno della repository **`tecnitalia-web`**, accedendo a *Settings > Pages*, l'inserimento del dominio nel campo "Custom domain" avvierà il processo automatico "Check DNS" per l'attivazione dell'HTTPS obbligatorio.

---
*Le informazioni fornite e i flussi di configurazione DNS descritti sono validati e conformi alle specifiche degli standard Internet RFC 1034 / RFC 1035 (Domain Names) e alla documentazione tecnica ufficiale di OVHcloud e GitHub Enterprise.*