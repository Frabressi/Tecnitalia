// Attendi che il DOM sia completamente caricato prima di cercare i placeholder
document.addEventListener("DOMContentLoaded", () => {
    // 1. CARICAMENTO HEADER E FOOTER CON JS
    Promise.all([
        fetch('./header.html').then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.text();
        }),
        fetch('./footer.html').then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.text();
        })
    ]).then(([headerData, footerData]) => {
        const navPlaceholder = document.getElementById('nav-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        if (navPlaceholder) {
            navPlaceholder.innerHTML = headerData;
        } else {
            console.warn("nav-placeholder non trovato nella pagina.");
        }

        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerData;
        } else {
            console.warn("footer-placeholder non trovato nella pagina.");
        }
        
        // Inizializza la navigazione DOPO averla incollata
        initNavbar();

        // Reset GSAP per ricalcolare le altezze
        setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }, 150);
        
    }).catch(error => {
        console.error("Errore fatale nel fetch dei componenti:", error);
    });
});

function initNavbar() {
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Se la navbar non è stata trovata, interrompi per evitare errori
    if (!nav) {
        console.error("Navbar non trovata nel DOM. Verifica header.html");
        return;
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            if(navLinks && !navLinks.classList.contains('active') && hamburger) hamburger.style.color = "#1d1d1f";
        } else {
            nav.classList.remove('scrolled');
            if(navLinks && !navLinks.classList.contains('active') && hamburger) hamburger.style.color = "white";
        }
    });

    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if(navLinks.classList.contains('active')) {
                hamburger.innerHTML = "×";
                hamburger.style.color = "#1d1d1f"; 
            } else {
                hamburger.innerHTML = "☰";
                hamburger.style.color = (window.scrollY > 50) ? "#1d1d1f" : "white";
            }
        });
    }

    if(navLinks) {
        navLinks.querySelectorAll('a').forEach(l => {
            l.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if(hamburger) {
                    hamburger.innerHTML = "☰";
                    hamburger.style.color = (window.scrollY > 50) ? "#1d1d1f" : "white";
                }
            });
        });
    }
}

// Inizializzazione Lenis (Scroll fluido)
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({ smooth: true, duration: 1.2 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
}

// ARRAY COMPLETO E ORIGINALE
const projectsData = [
    {
        title: "Cascina Merlata", client: "Cascina Merlata S.p.A., Milano", period: "2012-2013", endYear: 2013, val: "ca. 2.000.000 €", type: "Progetto Operativo di Bonifica e Direzione Lavori", cardSubtitle: "Progetto Operativo di Bonifica e Direzione Lavori.", images: ["./assets/img/merlata1.jpg", "./assets/img/merlata2.jpg"], tags: ["bonifica"],
        desc: `<p>Il sito era totalmente dismesso e presentava contaminazioni da idrocarburi e metalli. L’area verrà trasformata in un sistema di viabilità e urbanizzazioni necessarie per il collegamento tra il quartiere di Cascina Merlata e la zona EXPO2015.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redazione del Progetto Operativo di Bonifica</li><li>Direzione Lavori</li></ul>`
    },
    {
        title: "Ex Industrie Chimiche Baslini", client: "Habita S.r.l., Trezzo d’Adda (Bg)", period: "2008-2023 (in corso)", endYear: 2023, val: "ca. 20.000.000 €", type: "Progetto Operativo di Bonifica e Direzione Lavori", cardSubtitle: "Progetto Operativo di Bonifica e Direzione Lavori.", images: ["./assets/img/blaslini1.jpg", "./assets/img/baslini2.jpg"], tags: ["bonifica", "acque", "demolizione"],
        desc: `<p>Il sito è totalmente dismesso e presenta contaminazioni da metalli, idrocarburi, solventi e pesticidi.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Direzione Lavori interventi di bonifica e demolizione</li><li>Direzione Lavori sbarramento idraulico</li><li>Redazione della Variante del Progetto Operativo di Bonifica con Analisi di Rischio</li><li>Implementazione di un modello matematico per la rimodulazione dello sbarramento idraulico</li></ul>`
    },
    {
        title: "Ex Cartiere Binda", client: "Euromilano S.p.A., Milano", period: "2004-2007", endYear: 2007, val: "ca. 2.700.000 €", type: "Progetto Definitivo di Bonifica e Direzione Lavori", cardSubtitle: "Progetto Definitivo di Bonifica e Direzione Lavori.", images: ["./assets/img/binda1.jpg", "./assets/img/binda2.jpg"], tags: ["bonifica", "amianto", "demolizione"],
        desc: `<p>Il sito era totalmente dismesso e presentava contaminazioni da PCB, metalli e idrocarburi. L’area ha cambiato destinazione ed è stata trasformata in un quartiere residenziale.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redazione del Piano di Caratterizzazione</li><li>Realizzazione dell’Indagine Ambientale</li><li>Redazione del Progetto Definitivo di Bonifica</li><li>Direzione Lavori interventi di bonifica, rimozione MCA (materiale contenente amianto) e demolizione</li></ul>`
    },
    {
        title: "Officina del Gas – Bovisa Gasometri", client: "Metropolitana Milanese S.p.A. per il Comune di Milano", period: "2002-2006", endYear: 2006, val: "ca. 45.000.000 €", type: "Progetto Definitivo di Bonifica", cardSubtitle: "Progetto Definitivo di Bonifica Sito Interesse Nazionale.", images: ["./assets/img/gasometri1.jpg", "./assets/img/gasometri2.jpg"], tags: ["bonifica", "acque", "rifiuti"],
        desc: `<p>L’area all’epoca della redazione del progetto era inserita tra i Siti d’Interesse Nazionale previsti dal Decreto Ministeriale 18 settembre 2001, n. 468. Il sito è totalmente dismesso e presenta contaminazioni da idrocarburi e metalli.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di redigere un progetto di bonifica dell’intera area con utilizzo di diverse tecnologie:</strong></p><ul><li>Soil washing</li><li>Soil vapor extraction</li><li>Discarica di servizio</li><li>Sbarramento idraulico</li></ul><p>Per verificare la validità della scelta della tecnologie di bonifica ha anche effettuato delle prove pilota di laboratorio di soil washing.</p>`
    },
    {
        title: "Ex Officine Metallurgiche Broggi", client: "Euromilano S.p.A., Milano", period: "2004-2007", endYear: 2007, val: "ca. 600.000 €", type: "Progetto Definitivo di Bonifica e Direzione Lavori", cardSubtitle: "Progetto Definitivo di Bonifica e Direzione Lavori.", images: ["./assets/img/broggi1.jpg", "./assets/img/broggi2.jpg"], tags: ["bonifica", "acque", "demolizione"],
        desc: `<p>Il sito era totalmente dismesso e presentava contaminazioni da metalli e idrocarburi. L’area è stata trasformata nella nuova sede del Politecnico di Milano.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redazione del Piano di Caratterizzazione</li><li>Realizzazione indagine ambientale</li><li>Redazione del Progetto Definitivo di Bonifica</li><li>Direzione Lavori interventi di bonifica e demolizione</li><li>Direzione Lavori sbarramento idraulico</li></ul>`
    },
    {
        title: "Ex Broggi – Politecnico di Milano", client: "Euromilano S.p.A. e Politecnico di Milano", period: "2008-2013", endYear: 2013, val: "ca. 1.300.000 €", type: "Progetto Operativo di Bonifica con Analisi di Rischio", cardSubtitle: "Analisi di Rischio, Capping e Soil Vapor Extraction.", images: ["./assets/img/broggipoli1.jpg", "./assets/img/broggipoli2.jpg", "./assets/img/broggipoli3.jpg"], tags: ["bonifica", "acque"],
        desc: `<p>Il sito, già sede del Politecnico di Milano, è risultato contaminato in profondità da idrocarburi, IPA e solventi clorurati.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redazione dell’Integrazione del Piano di Caratterizzazione</li><li>Realizzazione indagine ambientale e monitoraggi soil gas</li><li>Redazione del Progetto di Sbarramento Idraulico</li><li>Realizzazione Messa in Sicurezza d’Emergenza/Permanente</li><li>Redazione della Variante Progetto Definitivo di Bonifica con Analisi di Rischio</li><li>Progettazione impianto Soil Vapor Extraction (SVE)</li><li>Direzione Lavori interventi di bonifica e sbarramento idraulico</li></ul>`
    },
    {
        title: "Cascina Basmetto", client: "Uniabita, già Corcab (MI) – CMB, Milano", period: "2009-2013", endYear: 2013, val: "ca. 60.000 €", type: "Piano di caratterizzazione ed indagine ambientale", cardSubtitle: "Piano di caratterizzazione ed indagine ambientale.", images: ["./assets/img/basmetto1.jpg", "./assets/img/basmetto2.jpg"], tags: ["bonifica"],
        desc: `<p>Il sito è stato impiegato originariamente in usi agricoli e successivamente come area di deposito di automezzi da demolire. L’area deve cambiare destinazione d’uso e necessita di una bonifica dei suoli propedeutica alla integrale demolizione della vecchia cascina ed alla nuova urbanizzazione.</p><p>Tecnitalia Ingegneria è stata individuata come partner nel pool di progettazione sia per determinare i costi della futura bonifica sia per svolgere l’attività di caratterizzazione iniziale del sito.</p>`
    },
    {
        title: "Ceramica Ligure", client: "Lasselsberger GmbH, Pöchlarn", period: "2010-2013", endYear: 2013, val: "ca. 500.000 €", type: "Progetto di bonifica con Analisi di Rischio", cardSubtitle: "Progetto di bonifica con Analisi di Rischio.", images: ["./assets/img/ceramica1.jpg", "./assets/img/ceramica2.jpg"], tags: ["bonifica"],
        desc: `<p>L’area è totalmente dismessa e presenta contaminazioni da idrocarburi e metalli, sia all’interno dell’ex stabilimento sia all’esterno.</p><p>Tecnitalia Ingegneria ha ricevuto l’incarico di redigere un progetto di bonifica dell’intera area con Analisi di rischio e di Direzione Lavori della prima fase (Area esterna) di bonifica.</p>`
    },
    {
        title: "CF Gomma – Pirelli Tyres", client: "Euromilano S.p.A.", period: "2009-2013", endYear: 2013, val: "ca. 600.000 €", type: "Caratterizzazione e Bonifica Amianto", cardSubtitle: "Caratterizzazione ambientale e Bonifica MCA e FAV.", images: ["./assets/img/pirelli1.jpg", "./assets/img/pirelli2.jpg"], tags: ["amianto", "bonifica"],
        desc: `<p>L’area deve cambiare destinazione d’uso e sarà totalmente demolita. È stata avviata dalla ex proprietà un’attività di caratterizzazione che è stata ripresa da Tecnitalia Ingegneria per giungere ad una progettazione con analisi di rischio degli interventi di bonifica.</p><p>Poiché l’area presentava un’ingente quantità di MCA, sia in forma friabile sia compatta, è stato necessario dapprima redigere una mappatura ed in seguito procedere alla bonifica anche delle fibre artificiali vetrose (FAV).</p>`
    },
    {
        title: "Ex Teatro Smeraldo", client: "Eataly Real Estate", period: "2012", endYear: 2012, val: "ca. 430.000 €", type: "Bonifica materiali contenenti amianto", cardSubtitle: "Bonifica materiali contenenti amianto (MCA) e FAV.", images: ["./assets/img/smeraldo1.jpg", "./assets/img/smeraldo2.jpg"], tags: ["amianto"],
        desc: `<p>L’area ha cambiato destinazione ed è stata totalmente ristrutturata per essere adibita a negozio/ristorante. Presentava occultamente un’ingente quantità di MCA soprattutto in forma friabile. È stato necessario intervenire con diverse aree confinate.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redigere una mappatura dei MCA e delle FAV propedeutica alla loro bonifica</li><li>Direzione Lavori</li></ul>`
    },
    {
        title: "Ex Exide Technologies", client: "Exide Technologies S.r.l.", period: "2007-2013", endYear: 2013, val: "ca. 1.500.000 €", type: "Progetto Operativo di Bonifica e Direzione Lavori", cardSubtitle: "Progetto Operativo di Bonifica e Direzione Lavori.", images: ["./assets/img/exide1.jpg", "./assets/img/exide2.jpg"], tags: ["bonifica", "acque"],
        desc: `<p>Il sito è totalmente dismesso e presenta contaminazioni da metalli, idrocarburi e pesticidi.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redazione del Progetto Operativo di Bonifica con Analisi di Rischio</li><li>Direzione Lavori interventi di bonifica</li><li>Direzione Lavori sbarramento idraulico e impianto Trattamento Acque di Falda (TAF)</li><li>Implementazione di un modello matematico per la rimodulazione dello sbarramento idraulico</li></ul>`
    },
    {
        title: "Stabilimento Industrie Chimiche Ingegner Bonelli", client: "Industrie chimiche ICIB S.P.A.", period: "2008-2013", endYear: 2013, val: "ca. 250.000 €", type: "Progetto Operativo di Bonifica e Direzione Lavori", cardSubtitle: "Progetto Operativo di Bonifica e Direzione Lavori.", images: ["./assets/img/bonelli1.jpg", "./assets/img/bonelli2.jpg"], tags: ["bonifica", "acque"],
        desc: `<p>Il sito industriale è in attività e presenta contaminazioni da metalli, idrocarburi e fluoruri.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redazione del Piano di Caratterizzazione</li><li>Realizzazione dell’indagine ambientale</li><li>Progettazione e realizzazione della Messa in Sicurezza d’Emergenza (MISE) della falda mediante sbarramento idraulico</li><li>Direzione Lavori sbarramento idraulico</li><li>Redazione del Progetto Operativo di Bonifica con Analisi di Rischio</li></ul>`
    },
    {
        title: "Ex Nivea", client: "Uniabita, già Corcab (MI)", period: "2006-2013", endYear: 2013, val: "ca. 1.000.000 €", type: "Progetto Definitivo di Bonifica e Direzione Lavori", cardSubtitle: "Progetto Definitivo di Bonifica e Direzione Lavori.", images: ["./assets/img/nivea1.jpg", "./assets/img/nivea2.jpg"], tags: ["bonifica", "amianto", "acque", "demolizione"],
        desc: `<p>L’area deve cambiare destinazione d’uso ed è stata totalmente demolita. È stata avviata dalla ex proprietà un’attività di caratterizzazione che è stata ripresa da Tecnitalia Ingegneria per giungere alla progettazione definitiva.</p><p>Poiché l’area presentava un’ingente quantità di MCA, sia in forma friabile sia compatta, è stato necessario dapprima redigere una mappatura ed in seguito procedere alla bonifica.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redazione del Progetto Definitivo di Bonifica</li><li>Direzione Lavori interventi di bonifica e demolizione</li><li>Progettazione di un sistema di aggottamento della falda</li></ul>`
    },
    {
        title: "Ex Zincheria Origoni", client: "Euromilano S.p.A., Milano", period: "2004-2021", endYear: 2021, val: "ca. 500.000 €", type: "Progetto Definitivo di Bonifica con MISE", cardSubtitle: "MISE, Sbarramento Idraulico e Impianto TAF.", images: ["./assets/img/origoni1.jpg", "./assets/img/origoni2.jpg"], tags: ["bonifica", "acque"],
        desc: `<p>Il sito era totalmente dismesso e presentava contaminazioni da metalli e idrocarburi. L’area è stata trasformata nella nuova sede del Politecnico di Milano.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redazione del Progetto Definitivo di Bonifica con Analisi di Rischio e Messa in Sicurezza Permanente (capping)</li><li>Direzione Lavori interventi di bonifica e demolizione</li><li>Progettazione Sbarramento Idraulico e impianto Trattamento Acque di Falda (TAF)</li><li>Direzione Lavori TAF</li></ul>`
    },
    {
        title: "Ex Deposito Carburanti Finalube", client: "Euromilano S.p.A., Milano", period: "1999-2002", endYear: 2002, val: "ca. 6.000.000 €", type: "Discarica di servizio e Direzione Lavori", cardSubtitle: "Progettazione discarica di servizio e Direzione Lavori.", images: ["./assets/img/finalube1.jpg", "./assets/img/finalube2.jpg"], tags: ["bonifica", "acque", "rifiuti"],
        desc: `<p>Il sito era totalmente dismesso e presentava contaminazioni da idrocarburi, IPA, BTEX e metalli. L’area è stata trasformata in un quartiere residenziale con la creazione di un vastissimo parco pubblico.</p><p><strong>Gli interventi di bonifica si sono svolti sotto il controllo di Tecnitalia Ingegneria:</strong></p><ul><li>Demolizione degli edifici e dei serbatoi interrati e fuori terra</li><li>Sbarramento idraulico della falda e sbancamento di terreni contaminati</li><li>Trattamento on-site dei terreni mediante soil venting e biorisanamento (biopile)</li><li>Realizzazione di una discarica di servizio per i terreni non idonei al biorisanamento</li></ul>`
    },
    {
        title: "Fondazione Prada", client: "Prada S.p.A., Milano", period: "2010-2013", endYear: 2013, val: "ca. 4.500.000 €", type: "Progetto Operativo di Bonifica e Direzione Lavori", cardSubtitle: "Progetto Operativo di Bonifica e Direzione Lavori.", images: ["./assets/img/prada1.jpg", "./assets/img/prada2.jpg"], tags: ["bonifica"],
        desc: `<p>Le attività produttive sul sito erano completamente dismesse e l’area veniva utilizzata come deposito di opere d’arte e showroom. L’area presentava contaminazioni da metalli e idrocarburi e sarà sede di un Museo di Arte Contemporanea.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redazione del Piano di Caratterizzazione</li><li>Realizzazione indagine ambientale</li><li>Redazione del Progetto Operativo di Bonifica con Analisi di Rischio</li><li>Direzione Lavori</li></ul>`
    },
    {
        title: "Ex Saffa Fabbriche Fiammiferi e Affini", client: "Red.Im. S.r.l.", period: "2006-2011", endYear: 2011, val: "ca. 110.000 €", type: "Caratterizzazione ambientale", cardSubtitle: "Caratterizzazione ambientale area dismessa.", images: ["./assets/img/saffa1.jpg", "./assets/img/saffa2.jpg"], tags: ["bonifica"],
        desc: `<p>L’area deve cambiare destinazione d’uso e sarà totalmente demolita.</p><p>Tecnitalia Ingegneria è stata individuata come partner nel pool di progettazione sia per determinare i costi della futura bonifica sia per svolgere l’attività di caratterizzazione iniziale del sito.</p>`
    },
    {
        title: "Ex Saponificio Sirio", client: "Euromilano S.p.A., Milano", period: "2003, 2013, 2020-2022", endYear: 2022, val: "ca. 500.000 €", type: "Piano di Caratterizzazione e Bonifica", cardSubtitle: "Progetto Operativo di Bonifica, Analisi Rischio e DL.", images: ["./assets/img/sirio1.jpg", "./assets/img/sirio2.jpg"], tags: ["bonifica", "demolizione"],
        desc: `<p>Il sito era totalmente dismesso e presentava contaminazioni da metalli e idrocarburi.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Direzione Lavori interventi di demolizione</li><li>Redazione del Piano di Caratterizzazione e indagine Ambientale</li><li>Redazione del Progetto Operativo di Bonifica</li><li>Direzione Lavori di bonifica</li></ul>`
    },
    {
        title: "Ex Fratelli Feltrinelli", client: "Euromilano S.p.A., Milano", period: "2009-2013 e 2021-2022", endYear: 2022, val: "ca. 1.000.000 €", type: "Progetto Operativo di Bonifica e Piano Rimozione", cardSubtitle: "Bonifica con Analisi di Rischio e Piano Rimozione Rifiuti.", images: ["./assets/img/feltrinelli1.jpg", "./assets/img/feltrinelli2.jpg"], tags: ["bonifica", "rifiuti"],
        desc: `<p>Il sito era totalmente dismesso e presentava contaminazioni da metalli e idrocarburi oltre a grandi quantità di rifiuti interrati. Nell’area è stata dapprima ubicata la sede temporanea della Triennale di Milano in Bovisa (TBVS) e successivamente uno studentato universitario.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redazione del Piano di Caratterizzazione e indagine Ambientale</li><li>Redazione del Progetto Operativo di Bonifica con Analisi di Rischio</li><li>Redazione del Piano di Rimozione Rifiuti</li><li>Direzione Lavori di rimozione dei rifiuti e di bonifica</li></ul>`
    },
    {
        title: "Ex Termoraggi", client: "Sidis S.p.A., Milano", period: "2005-2011", endYear: 2011, val: "ca. 600.000 €", type: "Progetto Definitivo di Bonifica e Direzione Lavori", cardSubtitle: "Progetto Definitivo di Bonifica e Direzione Lavori.", images: ["./assets/img/termoraggi1.jpg", "./assets/img/termoraggi2.jpg"], tags: ["bonifica", "demolizione"],
        desc: `<p>Il sito, già sede di un deposito di carburanti, deve cambiare destinazione d’uso ed è stato totalmente demolito. L’area era già in fase di caratterizzazione quando è stata coinvolta Tecnitalia Ingegneria per giungere alla progettazione definitiva degli interventi di bonifica.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Redazione dell’integrazione del Progetto Definitivo di Bonifica</li><li>Direzione Lavori interventi di bonifica e demolizione</li></ul>`
    },
    {
        title: "Ex Novaceta", client: "Namira SGRpA, Milano", period: "2021-2025 (in corso)", endYear: 2025, val: "ca. 12.000.000 €", type: "Progetti Operativi di Bonifica e Direzione Lavori", cardSubtitle: "Bonifica da MCA/FAV e Demolizione edifici.", images: ["./assets/img/novaceta1.jpg", "./assets/img/novaceta2.jpg"], tags: ["bonifica", "amianto", "demolizione"],
        desc: `<p>Il sito, già sede della società Novaceta, SNIA e Enercel, è stato caratterizzato, bonificato dall’amianto e dalle FAV e totalmente demolito. Sono stati redatti 3 progetti di bonifica per i diversi lotti (Area Sporting, Area Parking e Area di sviluppo).</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di:</strong></p><ul><li>Due Diligence ambientale in fase di compravendita</li><li>Direzione Lavori di bonifica MCA e FAV e demolizione</li><li>Progettazione degli interventi di bonifica su tre aree separate</li><li>Direzione Lavori interventi di bonifica</li></ul>`
    },
    {
        title: "Oasi Bovisa", client: "A2a Milano", period: "2022-2023 (in corso)", endYear: 2023, val: "ca. 5.000.000 €", type: "Progetto Operativo di Bonifica con Analisi di Rischio", cardSubtitle: "Progetto Operativo di Bonifica con Analisi di Rischio.", images: ["./assets/img/bovisa1.jpg", "./assets/img/bovisa2.jpg"], tags: ["bonifica", "acque"],
        desc: `<p>L’area è oggetto di interventi di riqualificazione per integrarsi con quella adiacente di proprietà del Politecnico di Milano e del Comune di Milano.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di redigere un progetto di bonifica che si integrasse con quello architettonico, mediante:</strong></p><ul><li>Applicazione dell’Analisi di Rischio</li><li>Impiego di tecniche sperimentali di biocapping</li><li>Barrieramento idraulico con sfruttamento delle acque emunte a scopi paesaggistici e ricreativi</li><li>Minimizzazione della rimozione dei terreni contaminati</li></ul>`
    },
    {
        title: "Area Ex Reggiani", client: "Pessina Costruzioni SpA Milano", period: "2023", endYear: 2023, val: "ca. 3.000.000 €", type: "Caratterizzazione e Progetto Operativo di Bonifica", cardSubtitle: "Caratterizzazione e Progetto Operativo di Bonifica.", images: ["./assets/img/reggiani1.jpg", "./assets/img/reggiani2.jpg"], tags: ["bonifica"],
        desc: `<p>L’area è oggetto di interventi di riqualificazione per lo sviluppo di un nuovo polo universitario e altre funzioni.</p><p>Tecnitalia Ingegneria ha ricevuto l’incarico di caratterizzare l’area e redigere il progetto di bonifica. Si è conclusa la fase di caratterizzazione e le attività sono sospese per il fallimento della Committente.</p>`
    },
    {
        title: "Ex Stabilimento Prysmian Group", client: "FIBRE OTTICHE SUD - F.O.S. srl", period: "2024-2025 (in corso)", endYear: 2025, val: "ca. 1.500.000 €", type: "Decommissioning area industriale", cardSubtitle: "Decommissioning area industriale Fibre Ottiche.", images: ["./assets/img/prysmian1.jpg", "./assets/img/prysmian2.jpg"], tags: ["demolizione"],
        desc: `<p>L’area è oggetto di dismissione per compravendita. Poiché molte macchine per la filatura della fibra ottica sono coperte da brevetto è necessario distruggerle e allontanarle dall’area. Altri macchinari verranno smontati e trasportati in altro stabilimento della Prysmian.</p><p><strong>Tecnitalia Ingegneria ha ricevuto l’incarico di redigere un progetto di decommissioning, gestire pratiche amministrative, e ricoprire i ruoli di:</strong></p><ul><li>Responsabile dei Lavori</li><li>Direttore dei Lavori</li><li>Coordinatore della Sicurezza (CSP & CSE)</li></ul>`
    }
];

// Ordinamento cronologico decrescente (dal più recente)
projectsData.sort((a, b) => b.endYear - a.endYear);

function renderProjects(filterTag = 'tutti') {
    const sliderContainer = document.getElementById('projects-slider');
    const gridContainer = document.getElementById('projects-grid-full');
    
    if (sliderContainer) {
        sliderContainer.innerHTML = ''; 
        const recentProjects = projectsData.slice(0, 6); // Solo gli ultimi 6
        
        recentProjects.forEach(p => {
            const originalIndex = projectsData.indexOf(p);
            sliderContainer.innerHTML += `
                <div class="project-card" onclick="openProject(${originalIndex})">
                    <div class="p-img-box">
                        <img src="${p.images[0]}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/400x250?text=Immagine+Non+Disponibile'">
                        <div class="hover-reveal">APRI SCHEDA</div>
                    </div>
                    <div class="p-content">
                        <span style="font-size: 0.8rem; color: #888; font-weight: 600;">Anno: ${p.endYear}</span>
                        <h4 style="color:var(--blue); margin: 5px 0 5px 0;">${p.title}</h4>
                        <p style="margin:0; font-size:0.9rem">${p.cardSubtitle}</p>
                    </div>
                </div>`;
        });
    }

    if (gridContainer) {
        gridContainer.innerHTML = ''; 
        projectsData.forEach((p, index) => {
            if (filterTag === 'tutti' || (p.tags && p.tags.includes(filterTag))) {
                gridContainer.innerHTML += `
                    <div class="project-card" onclick="openProject(${index})">
                        <div class="p-img-box">
                            <img src="${p.images[0]}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/400x250?text=Immagine+Non+Disponibile'">
                            <div class="hover-reveal">APRI SCHEDA</div>
                        </div>
                        <div class="p-content">
                            <span style="font-size: 0.8rem; color: #888; font-weight: 600;">Anno: ${p.endYear}</span>
                            <h4 style="color:var(--blue); margin: 5px 0 5px 0;">${p.title}</h4>
                            <p style="margin:0; font-size:0.9rem">${p.cardSubtitle}</p>
                        </div>
                    </div>`;
            }
        });
    }
}

window.filterProjects = function(tag, btnElement) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    renderProjects(tag);
};

window.scrollSlider = function(direction) {
    const slider = document.getElementById('projects-slider');
    if(slider) slider.scrollBy({ left: direction * 380, behavior: 'smooth' });
};

document.addEventListener("DOMContentLoaded", () => {
    renderProjects('tutti');
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        if(document.getElementById("hero-content")) {
            gsap.from("#hero-content", { y:50, opacity:0, duration:1.5, delay:0.5 });
            gsap.to(".hero-bg", { y: "30%", ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
        }

        document.querySelectorAll('.fade-element').forEach(el => {
            gsap.fromTo(el, { y: 50, opacity: 0 }, { scrollTrigger: { trigger: el, start: "top 85%" }, y: 0, opacity: 1, duration: 1, ease: "power3.out" });
        });

        gsap.utils.toArray(".div-img-wrapper").forEach(wrapper => {
            const img = wrapper.querySelector(".div-img");
            if(img) {
                gsap.to(img, { y: "20%", ease: "none", scrollTrigger: { trigger: wrapper, start: "top bottom", end: "bottom top", scrub: true } });
            }
        });
    }
});

let currentProjectIndex = 0;
let currentImageIndex = 0;

window.openProject = function(index) {
    currentProjectIndex = index;
    currentImageIndex = 0;
    const p = projectsData[index];
    const modal = document.getElementById('projectModal');
    if(!modal) return;
    
    document.getElementById('m-title').innerHTML = p.title;
    document.getElementById('m-client').innerHTML = p.client;
    document.getElementById('m-period').innerHTML = p.period;
    document.getElementById('m-val').innerHTML = p.val;
    document.getElementById('m-type').innerHTML = p.type;
    document.getElementById('m-desc').innerHTML = p.desc;
    
    const wrapper = document.getElementById('m-slides-wrapper');
    wrapper.innerHTML = ''; 
    p.images.forEach((imgSrc, i) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.onerror = function() { this.src = 'https://via.placeholder.com/900x350?text=Immagine+Non+Disponibile' };
        img.className = 'm-slide' + (i === 0 ? ' active' : '');
        wrapper.appendChild(img);
    });

    const showArrows = p.images.length > 1 ? 'block' : 'none';
    const btnPrev = document.getElementById('m-btn-prev');
    const btnNext = document.getElementById('m-btn-next');
    if(btnPrev) btnPrev.style.display = showArrows;
    if(btnNext) btnNext.style.display = showArrows;

    modal.classList.add('active');
    if (typeof lenis !== 'undefined') lenis.stop(); 
};

window.changeModalImg = function(direction) {
    const p = projectsData[currentProjectIndex];
    const slides = document.querySelectorAll('.m-slide');
    if(slides.length === 0) return;
    
    slides[currentImageIndex].classList.remove('active');
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = p.images.length - 1;
    if (currentImageIndex >= p.images.length) currentImageIndex = 0;
    slides[currentImageIndex].classList.add('active');
};

window.closeProject = function() {
    const modal = document.getElementById('projectModal');
    if(modal) modal.classList.remove('active');
    if (typeof lenis !== 'undefined') lenis.start(); 
};

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById('projectModal');
    if (modal) { 
        modal.addEventListener('click', (e) => { 
            if(e.target === modal) closeProject(); 
        }); 
    }
});