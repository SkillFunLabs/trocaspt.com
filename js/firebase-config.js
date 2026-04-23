// =============================================================
//  js/firebase-config.js · Trocas PT
//  SDK: Firebase v10.8.0 em modo "compat" (sintaxe v8 clássica)
//  NOTA: Os scripts compat devem ser carregados no index.html
//        ANTES deste ficheiro, nesta ordem:
//          1. firebase-app-compat.js
//          2. firebase-auth-compat.js
//          3. firebase-database-compat.js
//          4. firebase-firestore-compat.js
//          5. js/firebase-config.js   ← este ficheiro
//          6. js/main.js
// =============================================================

const firebaseConfig = {
    apiKey:            "AIzaSyDuuLuAkOrHSGGTn0M2F_HpmF9kd-TpwBg",
    authDomain:        "trocaspt.firebaseapp.com",
    projectId:         "trocaspt",
    storageBucket:     "trocaspt.firebasestorage.app",
    messagingSenderId: "802322082007",
    appId:             "1:802322082007:web:5359f38babfa5daa9ba892",
    databaseURL:       "https://trocaspt-default-rtdb.europe-west1.firebasedatabase.app"
};

// ── Inicialização ─────────────────────────────────────────────
firebase.initializeApp(firebaseConfig);

// ── Referências globais ───────────────────────────────────────
const auth   = firebase.auth();
const dbRT   = firebase.database();           // Realtime Database  → chat
const dbFS   = firebase.firestore();          // Firestore          → anúncios, users

// ── Coleções Firestore ────────────────────────────────────────
const adsCol   = dbFS.collection('trocas_ads');     // anúncios
const usersCol = dbFS.collection('trocas_users');   // perfis de utilizador
const repCol   = dbFS.collection('trocas_reports'); // denúncias

// =============================================================
//  Estrutura de um documento em trocas_ads
//  (referência — não é código executável)
//
//  {
//    title       : String,     — título do anúncio (obrigatório)
//    description : String,     — descrição livre
//    want        : String,     — o que procura em troca (obrigatório)
//    category    : String,     — categoria selecionada (obrigatório)
//    district    : String,     — distrito (obrigatório)
//    county      : String,     — concelho
//    images      : Array,      — URLs/base64, máx. 3 imagens
//    userId      : String,     — UID Firebase Auth
//    userName    : String,     — displayName do utilizador
//    price       : Number,     — valor estimado em € (0 = não indicado)
//    createdAt   : Timestamp,  — serverTimestamp() — data de publicação
//    views       : Number,     — contador de visualizações (começa em 0)
//    likes       : Number,     — contador de gostos (começa em 0)
//    isFeatured  : Boolean,    — anúncio em destaque (false por defeito)
//    userIsPremium: Boolean,   — utilizador tem conta premium
//    lastBump    : Timestamp|null — última promoção manual (null = nunca)
//  }
// =============================================================
