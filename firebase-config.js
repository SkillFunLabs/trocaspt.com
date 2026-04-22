/* ===== ESTILO COMPACTO MAS COMPLETO (COM PREMIUM E FUNDO CLARO NOS CARDS) ===== */
:root{
    --bg:#f5e6d3;
    --bg2:#e8d5b5;
    --header:#2c3e50;
    --header2:#34495e;
    --accent:#f0ad4e;
    --accent-dk:#e09b30;
    --gold:#f5c060;
    --white:#fff;
    --text:#1e2a3a;
    --muted:#7a8699;
    --border:rgba(0,0,0,0.07);
    --card:#fff;
    --success:#2a9e6c;
    --danger:#d94f4f;
    --radius:14px;
    --shadow:0 2px 16px rgba(0,0,0,0.07);
    --shadow-lg:0 8px 40px rgba(0,0,0,0.13)
}
*{
    margin:0;
    padding:0;
    box-sizing:border-box
}
body{
    font-family:'Sora',sans-serif;
    background:var(--bg);
    color:var(--text);
    min-height:100vh;
    padding:1.5rem 1.5rem 2rem
}
.container{
    max-width:1400px;
    margin:0 auto
}
.header{
    background:var(--header);
    border-radius:16px;
    padding:0.8rem 1.5rem;
    margin-bottom:1.5rem;
    display:flex;
    align-items:center;
    flex-wrap:wrap;
    box-shadow:0 2px 20px rgba(0,0,0,0.2);
    position:relative
}
.btn-voltar{
    background:rgba(255,255,255,0.1);
    border:1px solid rgba(255,255,255,0.2);
    padding:0.35rem 0.9rem;
    border-radius:30px;
    color:#fff;
    text-decoration:none;
    font-size:0.8rem;
    font-weight:500;
    display:flex;
    align-items:center;
    gap:0.3rem;
    white-space:nowrap
}
.btn-voltar:hover{
    background:rgba(255,255,255,0.18)
}
.music-header-control{
    display:flex;
    align-items:center;
    gap:0.3rem;
    background:rgba(255,255,255,0.1);
    border:1px solid rgba(255,255,255,0.2);
    border-radius:30px;
    padding:0.35rem 0.9rem
}
.music-header-control button{
    background:none;
    border:none;
    color:#fff;
    font-size:0.9rem;
    cursor:pointer;
    padding:0;
    width:auto;
    height:auto
}
.music-header-control button:hover{
    color:var(--accent)
}
.music-header-control input{
    width:60px;
    height:4px;
    background:rgba(255,255,255,0.3);
    border-radius:2px;
    accent-color:var(--accent);
    margin:0 0.2rem
}
.music-header-control span{
    font-size:0.65rem;
    color:rgba(255,255,255,0.7);
    min-width:30px
}
h1{
    font-size:1.3rem;
    font-weight:800;
    color:#fff;
    display:flex;
    align-items:center;
    gap:0.5rem;
    position:absolute;
    left:50%;
    transform:translateX(-50%);
    white-space:nowrap
}
h1 i{
    color:var(--accent)
}
.user-area{
    display:flex;
    align-items:center;
    gap:0.6rem;
    margin-left:auto
}
.auth-btn{
    background:transparent;
    border:1px solid rgba(255,255,255,0.4);
    color:#fff;
    padding:0.3rem 0.9rem;
    border-radius:30px;
    font-size:0.78rem;
    font-weight:600;
    cursor:pointer;
    text-decoration:none
}
.auth-btn.primary{
    background:var(--accent);
    border-color:var(--accent)
}
.auth-btn.primary:hover{
    background:var(--accent-dk)
}
.auth-btn:hover{
    background:rgba(255,255,255,0.1)
}
.user-info{
    display:flex;
    align-items:center;
    gap:1rem;
    color:#fff;
    font-size:0.8rem
}
.inbox-btn{
    background:var(--accent);
    color:#fff;
    border:none;
    padding:0.3rem 0.85rem;
    border-radius:30px;
    font-size:0.78rem;
    font-weight:600;
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:5px
}
.inbox-btn:hover{
    background:var(--accent-dk)
}
.logout-btn,.delete-account-btn{
    background:transparent;
    border:1px solid rgba(255,255,255,0.25);
    color:rgba(255,255,255,0.65);
    padding:0.3rem 0.75rem;
    border-radius:30px;
    font-size:0.75rem;
    cursor:pointer;
    white-space:nowrap
}
.delete-account-btn{
    color:#ffb3b3;
    border-color:rgba(255,100,100,0.3);
    font-size:0.65rem !important;
    padding:0.15rem 0.5rem !important
}
.delete-account-btn:hover{
    color:#ff8080;
    border-color:#ff8080
}
.logout-btn:hover{
    color:#fff;
    border-color:rgba(255,255,255,0.5)
}
.banner-top,.banner-bottom{
    background:rgba(255,255,255,0.7);
    backdrop-filter:blur(4px);
    border:1px dashed #c0a080;
    border-radius:20px;
    text-align:center;
    padding:0.8rem;
    margin-bottom:1.5rem;
    color:#4a3b2c;
    font-size:0.8rem
}
.banner-bottom{
    margin-top:1.5rem;
    margin-bottom:0
}
.two-columns{
    display:grid;
    grid-template-columns:330px 1fr;
    gap:1.5rem;
    align-items:start
}
.form-card{
    background:var(--header);
    border-radius:var(--radius);
    padding:1.25rem;
    box-shadow:var(--shadow);
    position:sticky;
    top:20px
}
.publish-toggle-btn{
    background:linear-gradient(135deg,var(--accent),var(--accent-dk));
    color:#fff;
    border:none;
    padding:1rem 1.5rem;
    border-radius:14px;
    font-weight:700;
    font-size:1rem;
    cursor:pointer;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:8px;
    box-shadow:0 4px 16px rgba(240,173,78,0.35)
}
.publish-form{
    max-height:0;
    overflow:hidden;
    transition:max-height 0.4s
}
.publish-form.open{
    max-height:1100px;
    overflow-y:auto
}
.form-group{
    margin-bottom:0.85rem
}
label{
    display:block;
    font-size:0.75rem;
    font-weight:600;
    color:rgba(255,255,255,0.7);
    margin-bottom:0.3rem
}
input,textarea,select{
    width:100%;
    padding:0.65rem 0.9rem;
    border:1px solid rgba(255,255,255,0.12);
    border-radius:10px;
    background:rgba(255,255,255,0.08);
    color:#fff;
    font-size:0.85rem
}
input:focus,textarea:focus,select:focus{
    outline:none;
    border-color:var(--accent);
    background:rgba(255,255,255,0.12)
}
select option{
    background:#1e2d3d;
    color:#fff
}
textarea{
    resize:vertical;
    min-height:60px
}
.images-upload-area{
    display:flex;
    flex-wrap:wrap;
    gap:8px;
    margin-top:6px
}
.image-upload-item{
    position:relative;
    width:80px;
    height:80px;
    background:rgba(255,255,255,0.06);
    border-radius:10px;
    border:1.5px dashed rgba(255,255,255,0.25);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    overflow:hidden
}
.image-upload-item:hover{
    border-color:var(--accent)
}
.image-upload-item img{
    width:100%;
    height:100%;
    object-fit:cover
}
.image-upload-item .add-icon{
    font-size:1.5rem;
    color:rgba(255,255,255,0.4)
}
.image-upload-item .remove-img{
    position:absolute;
    top:3px;
    right:3px;
    background:rgba(0,0,0,0.7);
    color:#fff;
    border-radius:50%;
    width:18px;
    height:18px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:10px;
    cursor:pointer;
    z-index:1
}
button{
    background:var(--accent);
    color:#fff;
    border:none;
    padding:0.75rem;
    border-radius:10px;
    font-weight:700;
    font-size:0.9rem;
    cursor:pointer;
    width:100%
}
button:hover{
    background:var(--accent-dk)
}
.cancel-btn{
    background:transparent;
    border:1px solid rgba(255,255,255,0.2);
    color:rgba(255,255,255,0.5);
    margin-top:0.4rem;
    padding:0.6rem
}
.list-card{
    background:transparent;
    padding:0;
    box-shadow:none
}
.list-card h2{
    font-size:1.2rem;
    margin-bottom:1rem;
    color:var(--text);
    font-weight:700
}
.search-card{
    background:var(--card);
    border-radius:var(--radius);
    padding:1.1rem;
    border:1px solid var(--border);
    box-shadow:var(--shadow);
    margin-bottom:1.2rem
}
.search-bar{
    display:flex;
    gap:0.6rem;
    margin-bottom:0.75rem;
    flex-wrap:wrap
}
.search-bar input{
    flex:2 1 200px;
    padding:0.75rem 1rem;
    border:1.5px solid var(--border);
    border-radius:12px;
    font-size:1rem;
    color:var(--text);
    background:var(--bg)
}
.search-bar input:focus{
    outline:none;
    border-color:var(--accent)
}
.search-bar button{
    background:var(--accent);
    color:#fff;
    padding:0.65rem 1.5rem;
    border-radius:10px;
    width:auto
}
.filter-row{
    display:flex;
    gap:0.6rem;
    flex-wrap:wrap
}
.filter-row select{
    flex:1 1 150px;
    padding:0.65rem 0.9rem;
    border:1.5px solid var(--border);
    border-radius:10px;
    font-size:0.85rem;
    color:var(--text);
    background:var(--bg)
}
.ads-grid{
    display:grid;
    grid-template-columns:repeat(auto-fill,minmax(270px,1fr));
    gap:1.1rem
}
.ad-card{
    background:#f5e6d3;
    border-radius:var(--radius);
    overflow:hidden;
    box-shadow:var(--shadow);
    border:1px solid #d4c4a8;
    transition:transform 0.2s,box-shadow 0.2s;
    cursor:pointer;
    position:relative
}
.ad-card.premium{
    border:2px solid var(--gold);
    box-shadow:0 0 12px rgba(245,192,96,0.5)
}
.ad-card:hover{
    transform:translateY(-3px);
    box-shadow:0 8px 32px rgba(0,0,0,0.12)
}
.ad-img{
    position:relative;
    height:160px;
    background:#d4c4a8;
    overflow:hidden
}
.ad-img img{
    width:100%;
    height:100%;
    object-fit:cover;
    transition:0.3s
}
.ad-card:hover .ad-img img{
    transform:scale(1.04)
}
.premium-badge{
    position:absolute;
    top:10px;
    right:10px;
    background:var(--gold);
    color:#000;
    font-size:0.7rem;
    padding:3px 8px;
    border-radius:12px;
    font-weight:700;
    z-index:5
}
.multi-badge{
    position:absolute;
    bottom:8px;
    right:8px;
    background:rgba(0,0,0,0.45);
    color:rgba(255,255,255,0.85);
    padding:2px 7px;
    border-radius:12px;
    font-size:0.62rem
}
.ad-content{
    padding:0.9rem 0.95rem 1rem
}
.ad-title{
    font-weight:700;
    font-size:0.95rem;
    margin-bottom:0.4rem;
    color:#1e2a3a
}
.ad-desc{
    font-size:0.78rem;
    color:#3a4a5a;
    margin-bottom:0.4rem
}
.ad-want{
    background:#d9e6f2;
    color:#1a6a80;
    border-radius:8px;
    padding:0.4rem 0.8rem;
    font-size:0.9rem;
    font-weight:700;
    display:flex;
    align-items:center;
    gap:0.4rem;
    margin-bottom:0.6rem;
    line-height:1.3
}
.ad-want i{
    font-size:0.85rem;
    color:#1a6a80
}
.ad-meta{
    font-size:0.65rem;
    color:#4a5a6a;
    display:flex;
    gap:0.4rem;
    flex-wrap:wrap;
    align-items:center
}
.premium-icon{
    color:var(--gold);
    font-size:0.8rem;
    margin-left:3px
}
.premium-name{
    color:var(--gold);
    font-weight:600
}
.ad-chat-btn{
    background:var(--accent);
    color:#fff;
    padding:0.5rem;
    border-radius:8px;
    font-weight:600;
    font-size:0.78rem;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:0.3rem;
    margin-top:0.7rem;
    width:100%
}
.ad-actions{
    display:flex;
    gap:0.5rem;
    margin-top:0.5rem;
    padding-top:0.5rem;
    border-top:1px solid #c0b098
}
.edit-btn,.delete-btn,.premium-btn{
    background:transparent;
    border:1px solid #b0a088;
    padding:0.5rem 0.7rem;
    border-radius:8px;
    font-size:0.75rem;
    display:flex;
    align-items:center;
    gap:0.3rem;
    cursor:pointer
}
.edit-btn{
    color:#2a6a9e
}
.delete-btn{
    color:#c04040
}
.premium-btn{
    color:#b08020;
    border-color:var(--gold)
}
.premium-btn:hover{
    background:rgba(245,192,96,0.1)
}
.empty-message{
    grid-column:1/-1;
    text-align:center;
    padding:3rem;
    color:var(--muted);
    font-size:0.9rem
}
/* ===== MODAL DETALHE (FUNDO BEGE) ===== */
.ad-detail-modal{
    display:none;
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.55);
    z-index:2000;
    justify-content:center;
    align-items:center;
    padding:1rem
}
.ad-detail-content{
    background:var(--bg);
    border-radius:22px;
    width:100%;
    max-width:680px;
    max-height:92vh;
    overflow-y:auto;
    box-shadow:var(--shadow-lg);
    animation:popIn 0.22s
}
@keyframes popIn{
    from{transform:scale(0.93);opacity:0}
    to{transform:scale(1);opacity:1}
}
.ad-detail-back{
    position:sticky;
    top:0;
    background:var(--bg);
    padding:0.7rem 1rem;
    display:flex;
    align-items:center;
    gap:0.5rem;
    border-bottom:1px solid var(--border);
    border-radius:22px 22px 0 0;
    z-index:5
}
.ad-detail-back button{
    background:var(--accent);
    border:none;
    color:#fff;
    font-size:0.85rem;
    padding:0.4rem 1rem;
    border-radius:30px;
    display:flex;
    align-items:center;
    gap:0.3rem;
    font-weight:600;
    width:auto
}
.ad-detail-back button:hover{
    background:var(--accent-dk)
}
.ad-detail-back-title{
    font-weight:600;
    font-size:0.9rem;
    color:var(--text);
    flex:1;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis
}
.ad-detail-gallery-main{
    width:100%;
    max-height:320px;
    object-fit:cover;
    display:block;
    cursor:zoom-in
}
.ad-detail-thumbs{
    display:flex;
    gap:0.5rem;
    padding:0.75rem 1.2rem 0;
    overflow-x:auto;
    background:var(--bg)
}
.ad-detail-thumb{
    width:65px;
    height:65px;
    object-fit:cover;
    border-radius:8px;
    cursor:pointer;
    flex-shrink:0;
    border:2px solid transparent;
    transition:border-color 0.2s
}
.ad-detail-thumb:hover,.ad-detail-thumb.active{
    border-color:var(--accent)
}
.ad-detail-no-img{
    height:180px;
    background:var(--bg2);
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:3rem;
    color:rgba(0,0,0,0.12)
}
.ad-detail-body{
    padding:1.2rem 1.4rem 1.5rem;
    background:var(--bg);
    color:var(--text)
}
.ad-detail-title{
    font-size:1.5rem;
    font-weight:800;
    margin-bottom:0.4rem;
    color:var(--text)
}
.ad-detail-meta{
    font-size:0.75rem;
    color:var(--muted);
    margin-bottom:1rem;
    display:flex;
    gap:0.6rem;
    flex-wrap:wrap
}
.ad-detail-desc{
    font-size:0.9rem;
    color:var(--text);
    line-height:1.6;
    margin-bottom:1rem;
    background:rgba(255,255,255,0.5);
    padding:0.9rem 1rem;
    border-radius:10px
}
.ad-detail-want{
    background:#eef9ff;
    border-left:4px solid #4d90d9;
    border-radius:0 10px 10px 0;
    padding:0.75rem 1rem;
    margin-bottom:1.25rem
}
.ad-detail-want strong{
    display:block;
    font-size:0.7rem;
    text-transform:uppercase;
    letter-spacing:0.5px;
    color:#7abbe0;
    margin-bottom:0.2rem
}
.ad-detail-want span{
    font-size:1.2rem;
    font-weight:700;
    color:var(--text);
    line-height:1.3;
    word-break:break-word
}
.ad-detail-chat-btn{
    background:var(--accent);
    color:#fff;
    border:none;
    padding:0.85rem 1.5rem;
    border-radius:12px;
    font-weight:700;
    font-size:0.95rem;
    cursor:pointer;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    gap:0.5rem
}
/* ===== CHAT ===== */
.chat-modal{
    display:none;
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.55);
    z-index:3000;
    justify-content:center;
    align-items:center;
    padding:1rem
}
.chat-modal-content{
    background:#fff;
    border-radius:22px;
    width:100%;
    max-width:500px;
    height:80vh;
    display:flex;
    flex-direction:column;
    box-shadow:var(--shadow-lg)
}
.chat-header{
    padding:1rem 1.2rem;
    border-bottom:1px solid var(--border);
    display:flex;
    align-items:center;
    gap:0.75rem;
    background:var(--header);
    border-radius:22px 22px 0 0
}
.chat-header .chat-title{
    flex:1;
    font-weight:700;
    font-size:0.95rem;
    color:#fff
}
.chat-close-btn{
    background:rgba(255,255,255,0.15);
    border:none;
    border-radius:50%;
    width:32px;
    height:32px;
    cursor:pointer;
    color:#fff;
    display:flex;
    align-items:center;
    justify-content:center
}
.chat-messages{
    flex:1;
    overflow-y:auto;
    padding:1rem;
    display:flex;
    flex-direction:column;
    gap:0.8rem;
    background:#f8fafc
}
.msg-bubble{
    max-width:78%;
    padding:0.7rem 1rem;
    border-radius:18px;
    font-size:0.9rem;
    line-height:1.4;
    word-break:break-word;
    box-shadow:0 1px 2px rgba(0,0,0,0.05);
    background:#2c3e50;
    color:#fff
}
.msg-bubble.mine{
    align-self:flex-end;
    border-bottom-right-radius:6px;
    background:#1e2a3a
}
.msg-bubble.theirs{
    align-self:flex-start;
    border-bottom-left-radius:6px;
    background:#2c3e50
}
.msg-sender{
    font-size:0.7rem;
    font-weight:600;
    margin-bottom:0.25rem;
    opacity:0.9
}
.msg-bubble.mine .msg-sender{
    color:var(--gold)
}
.msg-bubble.theirs .msg-sender{
    color:var(--accent)
}
.msg-time{
    font-size:0.6rem;
    opacity:0.7;
    margin-top:0.3rem;
    text-align:right
}
.chat-input-row{
    padding:0.75rem 1rem;
    border-top:1px solid var(--border);
    display:flex;
    gap:0.6rem;
    align-items:center;
    background:#fff
}
.chat-text-input{
    flex:1;
    padding:0.7rem 1rem;
    border:1.5px solid #d1d5db;
    border-radius:30px;
    font-size:0.9rem;
    color:var(--text);
    background:#fff
}
.btn-send{
    background:var(--accent);
    color:#fff;
    width:42px;
    height:42px;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    border:none;
    font-size:1rem
}
/* ===== INBOX ===== */
.inbox-modal{
    display:none;
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.55);
    z-index:3000;
    justify-content:center;
    align-items:center;
    padding:1rem
}
.inbox-modal-content{
    background:var(--header);
    border-radius:22px;
    width:100%;
    max-width:460px;
    max-height:80vh;
    display:flex;
    flex-direction:column;
    box-shadow:var(--shadow-lg)
}
.inbox-header{
    padding:1rem 1.2rem;
    border-bottom:1px solid rgba(255,255,255,0.1);
    display:flex;
    justify-content:space-between;
    align-items:center
}
.inbox-header h3{
    font-size:1.1rem;
    font-weight:700;
    color:#fff
}
.inbox-list{
    flex:1;
    overflow-y:auto
}
.inbox-item{
    padding:0.9rem 1.2rem;
    border-bottom:1px solid rgba(255,255,255,0.05);
    cursor:pointer
}
.inbox-item:hover{
    background:rgba(255,255,255,0.05)
}
.inbox-item-title{
    font-weight:700;
    font-size:0.9rem;
    color:#fff
}
.inbox-item-preview{
    font-size:0.8rem;
    color:rgba(255,255,255,0.7);
    margin-top:0.2rem;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis
}
/* ===== MODAL GENÉRICO ===== */
.modal{
    display:none;
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.55);
    z-index:3000;
    justify-content:center;
    align-items:center;
    padding:1rem
}
.modal-content{
    background:var(--header);
    border-radius:22px;
    width:100%;
    max-width:500px;
    padding:1.5rem;
    box-shadow:var(--shadow-lg);
    color:#fff
}
/* ===== LIGHTBOX ===== */
.lightbox{
    display:none;
    position:fixed;
    inset:0;
    background:rgba(0,0,0,0.95);
    z-index:9999;
    flex-direction:column;
    justify-content:center;
    align-items:center
}
.lightbox-back{
    position:absolute;
    top:18px;
    left:18px;
    background:rgba(255,255,255,0.12);
    border:1px solid rgba(255,255,255,0.3);
    color:#fff;
    border-radius:30px;
    padding:0.4rem 1rem;
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:0.4rem;
    z-index:10;
    width:auto
}
.lightbox-img{
    max-width:96vw;
    max-height:88vh;
    border-radius:12px;
    object-fit:contain
}
.lightbox-nav{
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    background:rgba(255,255,255,0.12);
    border:none;
    color:#fff;
    width:50px;
    height:50px;
    border-radius:50%;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.2rem
}
.lightbox-prev{left:16px}
.lightbox-next{right:16px}
footer{
    text-align:center;
    font-size:0.7rem;
    color:var(--muted);
    padding:2rem 1rem 1rem
}
footer a{
    color:var(--muted);
    text-decoration:none
}
@media(max-width:900px){
    .two-columns{grid-template-columns:1fr}
    .form-card{position:static}
    .header{flex-direction:column}
    h1{position:static;transform:none}
}
@media(max-width:600px){
    .ads-grid{grid-template-columns:1fr}
    .lightbox-nav{display:none}
}