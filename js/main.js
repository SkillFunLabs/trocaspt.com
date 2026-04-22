// =====================================================
// main.js - Trocas PT (Base Estável + Novas Funcionalidades)
// =====================================================

(function verificarIdade() {
    if (localStorage.getItem('ageVerified')) return;
    const overlay = document.createElement('div');
    overlay.id = 'ageVerificationOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:99999;display:flex;justify-content:center;align-items:center;';
    overlay.innerHTML = `
        <div style="background:#2c3e50;padding:2rem;border-radius:20px;max-width:400px;text-align:center;color:white;box-shadow:0 10px 30px rgba(0,0,0,0.5)">
            <h2 style="color:#f0ad4e;margin-bottom:1rem"><i class="fas fa-exclamation-triangle"></i> Acesso Restrito</h2>
            <p style="margin-bottom:1.5rem">Esta plataforma é exclusiva para maiores de 18 anos.</p>
            <button id="confirmAgeBtn" style="background:#f0ad4e;border:none;padding:0.8rem 2rem;border-radius:40px;font-weight:bold;cursor:pointer;font-size:1rem;width:auto">Sim, tenho 18+ anos</button>
            <button id="denyAgeBtn" style="background:transparent;border:1px solid #d94f4f;color:#d94f4f;padding:0.5rem;margin-top:1rem;cursor:pointer;font-size:0.8rem;width:auto;display:block;margin-left:auto;margin-right:auto">Não, sair</button>
        </div>`;
    document.body.appendChild(overlay);
    document.getElementById('confirmAgeBtn').onclick = () => {
        localStorage.setItem('ageVerified', 'true');
        overlay.remove();
    };
    document.getElementById('denyAgeBtn').onclick = () => {
        window.location.href = 'https://www.google.com';
    };
})();

// =====================================================
// 1. CONFIGURAÇÕES E DADOS GLOBAIS
// =====================================================

const distritosConcelhos = {
    "Aveiro": ["Águeda","Albergaria-a-Velha","Anadia","Arouca","Aveiro","Castelo de Paiva","Espinho","Estarreja","Ílhavo","Mealhada","Murtosa","Oliveira de Azeméis","Oliveira do Bairro","Ovar","Santa Maria da Feira","São João da Madeira","Sever do Vouga","Vagos","Vale de Cambra"],
    "Beja": ["Aljustrel","Almodôvar","Alvito","Barrancos","Beja","Castro Verde","Cuba","Ferreira do Alentejo","Mértola","Moura","Odemira","Ourique","Serpa","Vidigueira"],
    "Braga": ["Amares","Barcelos","Braga","Cabeceiras de Basto","Celorico de Basto","Esposende","Fafe","Guimarães","Póvoa de Lanhoso","Terras de Bouro","Vieira do Minho","Vila Nova de Famalicão","Vila Verde","Vizela"],
    "Bragança": ["Alfândega da Fé","Bragança","Carrazeda de Ansiães","Freixo de Espada à Cinta","Macedo de Cavaleiros","Miranda do Douro","Mirandela","Mogadouro","Torre de Moncorvo","Vila Flor","Vimioso","Vinhais"],
    "Castelo Branco": ["Belmonte","Castelo Branco","Covilhã","Fundão","Idanha-a-Nova","Oleiros","Penamacor","Proença-a-Nova","Sertã","Vila de Rei","Vila Velha de Ródão"],
    "Coimbra": ["Arganil","Cantanhede","Coimbra","Condeixa-a-Nova","Figueira da Foz","Góis","Lousã","Mira","Miranda do Corvo","Montemor-o-Velho","Oliveira do Hospital","Pampilhosa da Serra","Penacova","Penela","Soure","Tábua","Vila Nova de Poiares"],
    "Évora": ["Alandroal","Arraiolos","Borba","Estremoz","Évora","Montemor-o-Novo","Mora","Mourão","Portel","Redondo","Reguengos de Monsaraz","Vendas Novas","Viana do Alentejo","Vila Viçosa"],
    "Faro": ["Albufeira","Alcoutim","Aljezur","Castro Marim","Faro","Lagoa","Lagos","Loulé","Monchique","Olhão","Portimão","São Brás de Alportel","Silves","Tavira","Vila do Bispo","Vila Real de Santo António"],
    "Guarda": ["Aguiar da Beira","Almeida","Celorico da Beira","Figueira de Castelo Rodrigo","Fornos de Algodres","Gouveia","Guarda","Manteigas","Mêda","Pinhel","Sabugal","Seia","Trancoso","Vila Nova de Foz Côa"],
    "Leiria": ["Alcobaça","Alvaiázere","Ansião","Batalha","Bombarral","Caldas da Rainha","Castanheira de Pêra","Figueiró dos Vinhos","Leiria","Marinha Grande","Nazaré","Óbidos","Pedrógão Grande","Peniche","Pombal","Porto de Mós"],
    "Lisboa": ["Alenquer","Amadora","Arruda dos Vinhos","Azambuja","Cadaval","Cascais","Lisboa","Loures","Lourinhã","Mafra","Odivelas","Oeiras","Sintra","Sobral de Monte Agraço","Torres Vedras","Vila Franca de Xira"],
    "Portalegre": ["Alter do Chão","Arronches","Avis","Campo Maior","Castelo de Vide","Crato","Elvas","Fronteira","Gavião","Marvão","Monforte","Nisa","Ponte de Sor","Portalegre","Sousel"],
    "Porto": ["Amarante","Baião","Felgueiras","Gondomar","Lousada","Maia","Marco de Canaveses","Matosinhos","Paços de Ferreira","Paredes","Penafiel","Porto","Póvoa de Varzim","Santo Tirso","Trofa","Valongo","Vila do Conde","Vila Nova de Gaia"],
    "Santarém": ["Abrantes","Alcanena","Almeirim","Alpiarça","Benavente","Cartaxo","Chamusca","Constância","Coruche","Entroncamento","Ferreira do Zêzere","Golegã","Mação","Ourém","Rio Maior","Salvaterra de Magos","Santarém","Sardoal","Tomar","Torres Novas","Vila Nova da Barquinha"],
    "Setúbal": ["Alcácer do Sal","Alcochete","Almada","Barreiro","Grândola","Moita","Montijo","Palmela","Santiago do Cacém","Seixal","Sesimbra","Setúbal","Sines"],
    "Viana do Castelo": ["Arcos de Valdevez","Caminha","Melgaço","Monção","Paredes de Coura","Ponte da Barca","Ponte de Lima","Valença","Viana do Castelo","Vila Nova de Cerveira"],
    "Vila Real": ["Alijó","Boticas","Chaves","Mesão Frio","Mondim de Basto","Montalegre","Murça","Peso da Régua","Ribeira de Pena","Sabrosa","Santa Marta de Penaguião","Valpaços","Vila Pouca de Aguiar","Vila Real"],
    "Viseu": ["Armamar","Carregal do Sal","Castro Daire","Cinfães","Lamego","Mangualde","Moimenta da Beira","Mortágua","Nelas","Oliveira de Frades","Penalva do Castelo","Penedono","Resende","Santa Comba Dão","São João da Pesqueira","São Pedro do Sul","Sátão","Sernancelhe","Tabuaço","Tarouca","Tondela","Vila Nova de Paiva","Viseu","Vouzela"]
};

const distritos = Object.keys(distritosConcelhos).sort();
const cats = ['Tecnologia', 'Mobilidade / Veículos', 'Casa / Exterior', 'Mobiliário', 'Vestuário', 'Outros'];

function escapeHtml(s) {
    return String(s || '').replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'})[m]);
}

function formatDate(dateInput) {
    if (!dateInput) return 'Data desconhecida';
    let date;
    if (dateInput.toDate && typeof dateInput.toDate === 'function') {
        date = dateInput.toDate();
    } else if (typeof dateInput === 'string') {
        date = new Date(dateInput);
    } else {
        date = new Date(dateInput);
    }
    return isNaN(date) ? 'Data inválida' : date.toLocaleDateString('pt-PT');
}

let currentUser = null;
let currentFilter = { text: '', district: '', county: '', category: '' };
let currentEditId = null;
let tempImgs = [], editImgs = [];
let lightboxImgs = [], lightboxIdx = 0;

const userArea = document.getElementById('userArea');
const togglePub = document.getElementById('togglePublishBtn');
const pubForm = document.getElementById('publishForm');
const cancelPub = document.getElementById('cancelPublishBtn');
const adsCont = document.getElementById('adsContainer');
const searchInp = document.getElementById('searchInput');
const fDist = document.getElementById('filterDistrict');
const fCounty = document.getElementById('filterCounty');
const fCat = document.getElementById('filterCategory');
const searchBtn = document.getElementById('searchBtn');
const toggleSearchBtn = document.getElementById('toggleSearchBtn');
const searchArea = document.getElementById('searchArea');
if (toggleSearchBtn && searchArea) {
    toggleSearchBtn.addEventListener('click', () => {
        searchArea.classList.toggle('open');
        const icon = toggleSearchBtn.querySelector('i');
        if (searchArea.classList.contains('open')) {
            icon.className = 'fas fa-times';
            toggleSearchBtn.innerHTML = '<i class="fas fa-times"></i> Fechar';
        } else {
            icon.className = 'fas fa-sliders-h';
            toggleSearchBtn.innerHTML = '<i class="fas fa-sliders-h"></i> Filtrar';
        }
    });
}
// =====================================================
// 2. GESTÃO DE UTILIZADOR E AUTENTICAÇÃO
// =====================================================

auth.onAuthStateChanged(async u => {
    currentUser = u;
    if (u) {
        let name = u.displayName || u.email.split('@')[0];
        if (!u.displayName) {
            const n = prompt('Escolha um nome de utilizador:');
            if (n) {
                await u.updateProfile({ displayName: n });
                name = n;
            }
        }
        await usersCol.doc(u.uid).set({ displayName: name, email: u.email }, { merge: true });
        const userDoc = await usersCol.doc(u.uid).get();
        const userIsPremium = userDoc.exists ? userDoc.data().userIsPremium || false : false;

        let userHTML = userIsPremium 
            ? `<span style="color:var(--gold); font-weight:600;">${name}</span> <i class="fas fa-crown" style="color:var(--gold); margin-left:6px; font-size:1.15em;" title="User Premium"></i>`
            : name;

        userArea.innerHTML = `
            <div class="user-info">
                <button id="inboxBtn" class="inbox-btn"><i class="fas fa-inbox"></i> Mensagens</button>
                <span id="userNameSpan" style="cursor:pointer;text-decoration:underline dotted">${userHTML}</span>
            </div>`;

        document.getElementById('inboxBtn').onclick = () => { loadInbox(); inboxModal.style.display = 'flex'; };
        document.getElementById('userNameSpan').onclick = openAccountModal;
    } else {
        userArea.innerHTML = '<a href="login.html" class="auth-btn">Entrar</a><a href="registar.html" class="auth-btn primary">Registar</a>';
    }
    loadAds();
});

async function deleteAccount() {
    if (!currentUser || !confirm('Apagar conta e todos os dados?')) return;
    const uid = currentUser.uid;
    const batch = dbFS.batch();
    (await adsCol.where('userId', '==', uid).get()).forEach(d => batch.delete(d.ref));
    batch.delete(usersCol.doc(uid));
    await batch.commit();
    await dbRT.ref(`userChats/${uid}`).remove();
    await currentUser.delete();
    alert('Conta eliminada.');
    location.reload();
}

const accountModal = document.getElementById('accountModal');

function openAccountModal() {
    if (!currentUser) return;
    document.getElementById('accountEmail').textContent = currentUser.email;
    document.getElementById('accountDisplayName').textContent = currentUser.displayName || currentUser.email.split('@')[0];
    accountModal.style.display = 'flex';
}

document.getElementById('closeAccountModalBtn').onclick = () => accountModal.style.display = 'none';

document.getElementById('updateDisplayNameBtn').onclick = async () => {
    const newName = document.getElementById('newDisplayNameInput').value.trim();
    if (!newName) return alert('Introduza um nome.');
    try {
        await currentUser.updateProfile({ displayName: newName });
        await usersCol.doc(currentUser.uid).set({ displayName: newName }, { merge: true });
        document.getElementById('accountDisplayName').textContent = newName;
        alert('Nome atualizado!');
        location.reload();
    } catch (e) { alert('Erro: ' + e.message); }
};

document.getElementById('updateEmailBtn').onclick = async () => {
    const newEmail = document.getElementById('newEmailInput').value.trim();
    const password = document.getElementById('currentPasswordForEmail').value;
    if (!newEmail || !password) return alert('Preencha email e senha atual.');
    try {
        const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, password);
        await currentUser.reauthenticateWithCredential(credential);
        await currentUser.verifyBeforeUpdateEmail(newEmail);
        alert('Email de verificação enviado.');
        accountModal.style.display = 'none';
    } catch (e) { alert('Erro: ' + e.message); }
};

document.getElementById('resetPasswordBtn').onclick = async () => {
    try {
        await auth.sendPasswordResetEmail(currentUser.email);
        alert('Email de recuperação enviado.');
    } catch (e) { alert('Erro: ' + e.message); }
};

document.getElementById('logoutFromAccountBtn').onclick = () => auth.signOut().then(() => location.reload());
document.getElementById('deleteAccountFromModalBtn').onclick = () => { accountModal.style.display = 'none'; deleteAccount(); };

// Botão de upgrade para Premium
(function addPremiumUpgradeButton() {
    if (document.getElementById('upgradeToPremiumBtn')) return;
    const upgradeBtn = document.createElement('button');
    upgradeBtn.id = 'upgradeToPremiumBtn';
    upgradeBtn.style.cssText = 'background:var(--gold);color:#000;margin-top:1rem;width:100%;padding:0.75rem;border-radius:10px;font-weight:700;cursor:pointer;border:none;';
    upgradeBtn.innerHTML = '<i class="fas fa-crown"></i> Ativar Conta Premium (10€)';
    upgradeBtn.onclick = () => {
        accountModal.style.display = 'none';
        openPremiumRequestModal(null, 'Minha Conta', 'account');
    };
    const deleteBtn = document.getElementById('deleteAccountFromModalBtn');
    if (deleteBtn) {
        deleteBtn.parentNode.insertBefore(upgradeBtn, deleteBtn);
    } else {
        accountModal.querySelector('.modal-content').appendChild(upgradeBtn);
    }
})();

// =====================================================
// 3. PUBLICAÇÃO E GESTÃO DE ANÚNCIOS
// =====================================================

togglePub.onclick = () => {
    if (!currentUser) return alert('Login necessário');
    pubForm.classList.toggle('open');
    togglePub.style.display = pubForm.classList.contains('open') ? 'none' : 'flex';
};

cancelPub.onclick = () => {
    pubForm.classList.remove('open');
    togglePub.style.display = 'flex';
};

function popDist(sel, selVal = '') {
    sel.innerHTML = '<option value="">Selecione...</option>';
    distritos.forEach(d => sel.add(new Option(d, d)));
    if (selVal) sel.value = selVal;
}

function popCounty(distSel, countySel, selVal = '') {
    const d = distSel.value;
    countySel.innerHTML = '<option value="">Selecione...</option>';
    if (d && distritosConcelhos[d]) {
        distritosConcelhos[d].forEach(c => countySel.add(new Option(c, c)));
    }
    if (selVal) countySel.value = selVal;
}

function popCats() {
    [document.getElementById('category'), document.getElementById('editCategory'), fCat].forEach((s, i) => {
        if (i === 2) s.innerHTML = '<option value="">Categorias (todas)</option>';
        else s.innerHTML = '';
        cats.forEach(c => s.add(new Option(c, c)));
    });
}

const distSel = document.getElementById('district');
const countySel = document.getElementById('county');
const editDist = document.getElementById('editDistrict');
const editCounty = document.getElementById('editCounty');

popDist(distSel);
popDist(editDist);
popDist(fDist);
fDist.innerHTML = '<option value="">Distritos (todos)</option>' + fDist.innerHTML;

fDist.onchange = () => {
    const d = fDist.value;
    fCounty.innerHTML = '<option value="">Concelhos (todos)</option>';
    if (d && distritosConcelhos[d]) {
        distritosConcelhos[d].forEach(c => fCounty.add(new Option(c, c)));
    }
};

popCats();
distSel.onchange = () => popCounty(distSel, countySel);
editDist.onchange = () => popCounty(editDist, editCounty);

function renderImgs(cont, arr, onAdd, onRem) {
    cont.innerHTML = '';
    arr.forEach((src, i) => {
        const d = document.createElement('div');
        d.className = 'image-upload-item';
        d.innerHTML = `<img src="${src}"><span class="remove-img"><i class="fas fa-times"></i></span>`;
        d.querySelector('.remove-img').onclick = e => { e.stopPropagation(); onRem(i); };
        cont.appendChild(d);
    });
    if (arr.length < 3) {
        const a = document.createElement('div');
        a.className = 'image-upload-item';
        a.innerHTML = '<div class="add-icon"><i class="fas fa-plus"></i></div>';
        a.onclick = onAdd;
        cont.appendChild(a);
    }
}

function addImg(arr, setter) {
    if (arr.length >= 3) return alert('Máximo de 3 imagens permitido');
    const i = document.createElement('input');
    i.type = 'file';
    i.accept = 'image/*';
    i.onchange = e => {
        const f = e.target.files[0];
        if (f) {
            const r = new FileReader();
            r.onload = ev => {
                arr.push(ev.target.result);
                setter([...arr]);
            };
            r.readAsDataURL(f);
        }
    };
    i.click();
}

function updateImgs() {
    renderImgs(document.getElementById('imagesContainer'), tempImgs,
        () => addImg(tempImgs, v => { tempImgs = v; updateImgs(); }),
        i => { tempImgs.splice(i, 1); updateImgs(); }
    );
}

function updateEditImgs() {
    renderImgs(document.getElementById('editImagesContainer'), editImgs,
        () => addImg(editImgs, v => { editImgs = v; updateEditImgs(); }),
        i => { editImgs.splice(i, 1); updateEditImgs(); }
    );
}
updateImgs();

function loadAds() {
    adsCol.orderBy('date', 'desc').onSnapshot(s => {
        const a = [];
        s.forEach(d => a.push({ id: d.id, ...d.data() }));
        a.sort((ad1, ad2) => {
            if (ad1.isPremium && !ad2.isPremium) return -1;
            if (!ad1.isPremium && ad2.isPremium) return 1;
            return new Date(ad2.date) - new Date(ad1.date);
        });
        renderAds(a);
    }, () => {
        adsCont.innerHTML = '<div class="empty-message">Erro ao carregar anúncios.</div>';
    });
}

function renderAds(ads) {
    const term = currentFilter.text.toLowerCase();
    const filt = ads.filter(ad => !(
        (term && ![ad.title, ad.description, ad.want].some(v => v?.toLowerCase().includes(term))) ||
        (currentFilter.district && ad.district !== currentFilter.district) ||
        (currentFilter.county && ad.county !== currentFilter.county) ||
        (currentFilter.category && ad.category !== currentFilter.category)
    ));

    if (!filt.length) {
        adsCont.innerHTML = '<div class="empty-message">📭 Nenhum anúncio encontrado</div>';
        return;
    }

    adsCont.innerHTML = '';
    filt.forEach(ad => {
        const c = document.createElement('div');
        c.className = `ad-card ${ad.isPremium ? 'premium' : ''}`;

        const img = ad.images?.[0] ? `<img src="${ad.images[0]}">` : '<i class="fas fa-camera"></i>';
        const multi = ad.images?.length > 1 ? `<div class="multi-badge"><i class="far fa-images"></i> ${ad.images.length}</div>` : '';
        const premiumBadge = ad.isPremium ? '<div class="premium-badge">🔥 Destaque</div>' : '';

        const userName = ad.userName || 'Anónimo';
        const userPremiumIcon = ad.userIsPremium ? ' <i class="fas fa-crown premium-icon" title="User Premium"></i>' : '';
        const userNameDisplay = ad.userIsPremium 
            ? `<span class="premium-name">${escapeHtml(userName)}</span>` 
            : escapeHtml(userName);

        const isOwn = currentUser && ad.userId === currentUser.uid;
        const hasLiked = ad.likedBy && currentUser ? ad.likedBy.includes(currentUser.uid) : false;
        const likeCount = ad.likes || 0;
        const viewCount = ad.views || 0;

        c.innerHTML = `
            <div class="ad-img" style="position:relative">${img}${multi}${premiumBadge}</div>
            <div class="ad-content">
                <div class="ad-title">${escapeHtml(ad.title)}</div>
                <div class="ad-desc">${escapeHtml(ad.description || '')}</div>
                <div class="ad-want"><i class="fas fa-exchange-alt"></i> ${escapeHtml(ad.want)}</div>
                <div class="ad-meta">
                    👁️ ${viewCount} visualizações · 👍 ${likeCount} gostos
                </div>
                <div class="ad-meta">
                    📅 ${formatDate(ad.createdAt || ad.date)} · 👤 ${userNameDisplay}${userPremiumIcon} · 📍 ${ad.district || '?'}
                </div>
                <div class="ad-actions-row" style="display:flex; gap:0.5rem; margin-top:0.5rem;">
                    ${!isOwn && currentUser ? `<button class="ad-like-btn" data-id="${ad.id}" ${hasLiked ? 'disabled' : ''}><i class="far fa-thumbs-up"></i> ${hasLiked ? 'Já gostou' : 'Gostar'}</button>` : ''}
                    ${!isOwn && currentUser ? `<button class="ad-chat-btn"><i class="fas fa-comment-dots"></i> Chat</button>` : ''}
                    ${isOwn ? `<button class="edit-btn"><i class="fas fa-edit"></i> Editar</button>` : ''}
                    ${isOwn ? `<button class="premium-btn"><i class="fas fa-crown"></i> Destacar</button>` : ''}
                </div>
            </div>`;

        c.querySelector('.edit-btn')?.addEventListener('click', e => { e.stopPropagation(); openEdit(ad.id, ad); });
        c.querySelector('.ad-chat-btn')?.addEventListener('click', e => { e.stopPropagation(); openChat(ad.userId, ad.userName, ad.title, ad.id); });
        c.querySelector('.premium-btn')?.addEventListener('click', e => { e.stopPropagation(); openPremiumRequestModal(ad.id, ad.title, 'ad'); });
        c.querySelector('.ad-like-btn')?.addEventListener('click', async (e) => {
            e.stopPropagation();
            const btn = e.currentTarget;
            if (!currentUser) return alert('Inicie sessão para gostar.');
            btn.disabled = true;
            const adRef = adsCol.doc(ad.id);
            try {
                await dbFS.runTransaction(async (transaction) => {
                    const doc = await transaction.get(adRef);
                    if (!doc.exists) throw new Error('Anúncio não encontrado.');
                    const data = doc.data();
                    const likedBy = data.likedBy || [];
                    if (likedBy.includes(currentUser.uid)) throw new Error('already_liked');
                    transaction.update(adRef, {
                        likes: (data.likes || 0) + 1,
                        likedBy: [...likedBy, currentUser.uid]
                    });
                });
                btn.innerHTML = '<i class="fas fa-thumbs-up"></i> Já gostou';
            } catch (err) {
                btn.disabled = false;
                if (err.message === 'already_liked') {
                    btn.innerHTML = '<i class="fas fa-thumbs-up"></i> Já gostou';
                    btn.disabled = true;
                } else {
                    alert('Erro: ' + err.message);
                }
            }
        });

        c.addEventListener('click', e => { if (!e.target.closest('button')) openDetail(ad); });
        adsCont.appendChild(c);
    });
}

document.getElementById('publishBtn').onclick = async () => {
    if (!currentUser) return;
    const t = document.getElementById('title').value.trim();
    const w = document.getElementById('want').value.trim();
    const cat = document.getElementById('category').value;
    const dist = document.getElementById('district').value;
    if (!t || !w || !dist) return alert('Preencha os campos obrigatórios');
    if (!tempImgs.length) return alert('Adicione pelo menos uma imagem');

    const userDoc = await usersCol.doc(currentUser.uid).get();
    const userIsPremium = userDoc.exists ? userDoc.data().userIsPremium || false : false;

    await adsCol.add({
        title: t,
        description: document.getElementById('description').value.trim(),
        want: w,
        category: cat,
        district: dist,
        county: document.getElementById('county').value,
        userId: currentUser.uid,
        userName: currentUser.displayName || currentUser.email.split('@')[0],
        userIsPremium,
        images: tempImgs,
        date: new Date().toISOString(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        views: 0,
        likes: 0,
        likedBy: [],
        isPremium: false
    });

    alert('Anúncio publicado com sucesso!');
    pubForm.classList.remove('open');
    togglePub.style.display = 'flex';
    tempImgs = [];
    updateImgs();
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('want').value = '';
    distSel.value = '';
    countySel.innerHTML = '<option value="">Selecione...</option>';
};

async function openEdit(id, ad) {
    currentEditId = id;
    document.getElementById('editTitle').value = ad.title || '';
    document.getElementById('editDescription').value = ad.description || '';
    document.getElementById('editWant').value = ad.want || '';
    document.getElementById('editCategory').value = ad.category || 'Outros';
    popDist(editDist, ad.district);
    popCounty(editDist, editCounty, ad.county);
    editImgs = ad.images ? [...ad.images] : [];
    updateEditImgs();

    const modal = document.getElementById('editModal');
    modal.style.display = 'flex';

    const modalContent = document.querySelector('#editModal .modal-content');
    if (!modalContent) return;

    const saveBtn = document.getElementById('saveEditBtn');
    if (!saveBtn) return;

    const oldDeleteBtn = document.getElementById('deleteFromEditBtn');
    if (oldDeleteBtn) oldDeleteBtn.remove();

    let btnContainer = document.getElementById('editModalBtnContainer');
    if (!btnContainer) {
        btnContainer = document.createElement('div');
        btnContainer.id = 'editModalBtnContainer';
        btnContainer.style.cssText = 'display: flex; gap: 0.8rem; margin-top: 1.5rem;';
        saveBtn.parentNode.insertBefore(btnContainer, saveBtn);
    }

    btnContainer.appendChild(saveBtn);
    saveBtn.style.flex = '2';
    saveBtn.style.padding = '0.8rem 1.2rem';
    saveBtn.style.fontSize = '0.95rem';

    const deleteBtn = document.createElement('button');
    deleteBtn.id = 'deleteFromEditBtn';
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Apagar';
    deleteBtn.style.cssText = `
        flex: 1;
        background: var(--danger, #d94f4f);
        color: white;
        border: none;
        padding: 0.6rem 0.8rem;
        border-radius: 10px;
        font-weight: 600;
        font-size: 0.85rem;
        cursor: pointer;
        transition: background 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    `;
    deleteBtn.onmouseover = () => deleteBtn.style.background = '#c13e3e';
    deleteBtn.onmouseout = () => deleteBtn.style.background = 'var(--danger, #d94f4f)';
    deleteBtn.onclick = () => {
        if (confirm('Apagar este anúncio permanentemente?')) {
            adsCol.doc(currentEditId).delete().then(() => {
                modal.style.display = 'none';
                currentEditId = null;
            }).catch(err => alert('Erro ao apagar: ' + err.message));
        }
    };
    btnContainer.insertBefore(deleteBtn, saveBtn);
}

document.getElementById('saveEditBtn').onclick = async () => {
    if (!currentEditId) return;
    const t = document.getElementById('editTitle').value.trim();
    const w = document.getElementById('editWant').value.trim();
    const cat = document.getElementById('editCategory').value;
    const dist = document.getElementById('editDistrict').value;
    if (!t || !w || !dist) return alert('Preencha os campos obrigatórios');
    await adsCol.doc(currentEditId).update({
        title: t,
        description: document.getElementById('editDescription').value.trim(),
        want: w,
        category: cat,
        district: dist,
        county: document.getElementById('editCounty').value,
        images: editImgs
    });
    document.getElementById('editModal').style.display = 'none';
    currentEditId = null;
};

document.getElementById('closeEditModal').onclick = () => document.getElementById('editModal').style.display = 'none';

searchBtn.onclick = () => {
    currentFilter = {
        text: searchInp.value.trim(),
        district: fDist.value,
        county: fCounty.value,
        category: fCat.value
    };
    loadAds();
};

searchInp.addEventListener('keyup', e => { if (e.key === 'Enter') searchBtn.click(); });

function openPremiumRequestModal(adId, adTitle, contextType = 'ad') {
    const modal = document.getElementById('premiumRequestModal');
    if (!modal) return;
    document.getElementById('premiumAdTitle').textContent = adTitle || 'Todos os anúncios';
    document.getElementById('premiumAdId').value = adId || '';
    document.getElementById('premiumUserIdDisplay').textContent = currentUser ? currentUser.uid : '---';

    const titleSpan = document.getElementById('premiumModalTitle');
    const adOptionsDiv = document.getElementById('premiumAdOptions');
    const accountOptionDiv = document.getElementById('premiumAccountOption');
    const userIdLine = document.getElementById('premiumUserIdLine');

    if (contextType === 'account') {
        if (titleSpan) titleSpan.textContent = 'Conta Premium';
        if (adOptionsDiv) adOptionsDiv.style.display = 'none';
        if (accountOptionDiv) accountOptionDiv.style.display = 'block';
        if (userIdLine) userIdLine.style.display = 'block';
        document.getElementById('premiumAdTitle').textContent = 'Minha Conta (todos os anúncios)';
        document.getElementById('premiumAdId').value = currentUser ? currentUser.uid : '';
    } else {
        if (titleSpan) titleSpan.textContent = 'Destacar Anúncio';
        if (adOptionsDiv) adOptionsDiv.style.display = 'block';
        if (accountOptionDiv) accountOptionDiv.style.display = 'block';
        if (userIdLine) userIdLine.style.display = 'none';
    }
    modal.style.display = 'flex';
}

document.getElementById('closePremiumRequestBtn').onclick = () => document.getElementById('premiumRequestModal').style.display = 'none';

document.getElementById('premiumFromPublishBtn').onclick = () => {
    if (!currentUser) return alert('Faça login primeiro.');
    const title = document.getElementById('title').value.trim();
    if (!title) return alert('Defina um título primeiro.');
    openPremiumRequestModal('Publica primeiro o anúncio', title, 'ad');
};

// =====================================================
// 4. VISUALIZAÇÃO DE DETALHES E LIGHTBOX
// =====================================================

function openDetail(ad) {
    if (currentUser && ad.userId !== currentUser.uid) {
        adsCol.doc(ad.id).update({ views: firebase.firestore.FieldValue.increment(1) });
        ad.views = (ad.views || 0) + 1;
    }
    const hasLiked = ad.likedBy && currentUser ? ad.likedBy.includes(currentUser.uid) : false;

    document.getElementById('adDetailBackTitle').textContent = ad.title;
    document.getElementById('adDetailTitle').textContent = ad.title;
    document.getElementById('adDetailMeta').innerHTML = `
        📅 ${formatDate(ad.createdAt || ad.date)} · 👤 ${escapeHtml(ad.userName || 'Anónimo')} · 📍 ${ad.district || '?'} · 👍 ${ad.likes || 0} gostos · 👁️ ${ad.views || 0} visualizações
    `;
    document.getElementById('adDetailDesc').textContent = ad.description || '';
    document.getElementById('adDetailWant').textContent = ad.want;

    const gal = document.getElementById('adDetailGalleryWrap');
    const th = document.getElementById('adDetailThumbsWrap');
    gal.innerHTML = th.innerHTML = '';
    lightboxImgs = ad.images || [];

    if (lightboxImgs.length) {
        const m = document.createElement('img');
        m.className = 'ad-detail-gallery-main';
        m.src = lightboxImgs[0];
        m.onclick = () => openLightbox(0);
        gal.appendChild(m);
        if (lightboxImgs.length > 1) {
            lightboxImgs.forEach((s, i) => {
                const t = document.createElement('img');
                t.className = 'ad-detail-thumb';
                t.src = s;
                t.onclick = () => { m.src = s; openLightbox(i); };
                th.appendChild(t);
            });
        }
    } else {
        gal.innerHTML = '<div class="ad-detail-no-img"><i class="fas fa-camera"></i></div>';
    }

    const detailBody = document.querySelector('.ad-detail-body');
    detailBody.querySelectorAll('.ad-detail-chat-btn, .report-modal-btn, .ad-detail-like-btn').forEach(el => el.remove());

    const chatBtn = document.createElement('button');
    chatBtn.className = 'ad-detail-chat-btn';
    chatBtn.id = 'adDetailChatBtn';
    chatBtn.innerHTML = '<i class="fas fa-comment-dots"></i> Chat';
    chatBtn.style.display = (currentUser && ad.userId !== currentUser.uid) ? 'flex' : 'none';
    chatBtn.onclick = () => {
        document.getElementById('adDetailModal').style.display = 'none';
        openChat(ad.userId, ad.userName, ad.title, ad.id);
    };
    detailBody.appendChild(chatBtn);

    if (currentUser && ad.userId !== currentUser.uid) {
        const likeBtn = document.createElement('button');
        likeBtn.className = 'ad-detail-like-btn';
        likeBtn.innerHTML = `<i class="far fa-thumbs-up"></i> ${hasLiked ? 'Já gostou' : 'Gostar'} (${ad.likes || 0})`;
        likeBtn.disabled = hasLiked;
        likeBtn.onclick = async (e) => {
            e.stopPropagation();
            if (!currentUser || hasLiked) return;
            likeBtn.disabled = true;
            const adRef = adsCol.doc(ad.id);
            try {
                await dbFS.runTransaction(async (transaction) => {
                    const doc = await transaction.get(adRef);
                    if (!doc.exists) throw new Error('Anúncio não encontrado.');
                    const data = doc.data();
                    const likedBy = data.likedBy || [];
                    if (likedBy.includes(currentUser.uid)) throw new Error('already_liked');
                    transaction.update(adRef, { likes: (data.likes || 0) + 1, likedBy: [...likedBy, currentUser.uid] });
                });
                ad.likes = (ad.likes || 0) + 1;
                likeBtn.innerHTML = `<i class="fas fa-thumbs-up"></i> Já gostou (${ad.likes})`;
                document.getElementById('adDetailMeta').innerHTML = document.getElementById('adDetailMeta').innerHTML.replace(/👍 \d+/, `👍 ${ad.likes}`);
            } catch (err) {
                likeBtn.disabled = false;
                if (err.message === 'already_liked') {
                    likeBtn.innerHTML = `<i class="fas fa-thumbs-up"></i> Já gostou (${ad.likes || 0})`;
                    likeBtn.disabled = true;
                } else {
                    alert('Erro: ' + err.message);
                }
            }
        };
        detailBody.appendChild(likeBtn);

        const reportBtn = document.createElement('button');
        reportBtn.className = 'report-modal-btn';
        reportBtn.innerHTML = '<i class="fas fa-flag"></i> Denunciar anúncio';
        reportBtn.onclick = (e) => {
            e.stopPropagation();
            const reason = prompt('Motivo da denúncia:');
            if (reason && reason.trim() !== '') {
                repCol.add({
                    adId: ad.id,
                    adTitle: ad.title,
                    reportedUserId: ad.userId,
                    reporterId: currentUser.uid,
                    reason: reason.trim(),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    alert('Denúncia enviada com sucesso.');
                    document.getElementById('adDetailModal').style.display = 'none';
                });
            }
        };
        detailBody.appendChild(reportBtn);
    }

    document.getElementById('adDetailModal').style.display = 'flex';
}

document.getElementById('closeAdDetail').onclick = () => document.getElementById('adDetailModal').style.display = 'none';

function openLightbox(i) {
    lightboxIdx = i;
    updateLightbox();
    document.getElementById('lightbox').style.display = 'flex';
}

function updateLightbox() {
    document.getElementById('lightboxImg').src = lightboxImgs[lightboxIdx];
    document.getElementById('lightboxCounter').textContent = lightboxImgs.length ? `${lightboxIdx + 1}/${lightboxImgs.length}` : '';
}

document.getElementById('lightboxBack').onclick = () => document.getElementById('lightbox').style.display = 'none';
document.getElementById('lightboxPrev').onclick = () => {
    if (lightboxImgs.length) {
        lightboxIdx = (lightboxIdx - 1 + lightboxImgs.length) % lightboxImgs.length;
        updateLightbox();
    }
};
document.getElementById('lightboxNext').onclick = () => {
    if (lightboxImgs.length) {
        lightboxIdx = (lightboxIdx + 1) % lightboxImgs.length;
        updateLightbox();
    }
};

// =====================================================
// 5. SISTEMA DE CHAT E MENSAGENS
// =====================================================

const chatModal = document.getElementById('chatModal');
const chatMsgs = document.getElementById('chatMessages');
const chatInp = document.getElementById('chatInput');
const sendMsg = document.getElementById('sendMsgBtn');
const closeChatBtn = document.getElementById('closeChat');
const closeInboxBtn = document.getElementById('closeInbox');

let activeChat = { partnerId: null, adId: null, chatId: null };
let chatUnsub = null;

function fecharInbox() {
    inboxModal.style.display = 'none';
}

function fecharChat() {
    chatModal.style.display = 'none';
    if (chatUnsub) {
        chatUnsub.ref.off('child_added', chatUnsub.cb);
        chatUnsub = null;
    }
    chatMsgs.innerHTML = '';
    activeChat = { partnerId: null, adId: null, chatId: null };
}

async function openChat(pid, pname, title, aid) {
    if (!currentUser) return;
    if (chatModal.style.display === 'flex') fecharChat();

    activeChat.partnerId = pid;
    activeChat.adId = aid;
    document.getElementById('chatTitle').innerHTML = `Chat: ${escapeHtml(title)} (com ${escapeHtml(pname)})`;
    chatModal.style.display = 'flex';

    const partes = [currentUser.uid, pid].sort();
    const cid = `${aid}_${partes[0]}_${partes[1]}`;
    activeChat.chatId = cid;

    const refChat = dbRT.ref(`chats/${cid}`);
    const snap = await refChat.once('value');
    if (!snap.exists()) {
        await refChat.set({
            adId: aid,
            participants: { [currentUser.uid]: true, [pid]: true },
            createdAt: Date.now()
        });
        await dbRT.ref(`userChats/${currentUser.uid}/${cid}`).set(true);
        await dbRT.ref(`userChats/${pid}/${cid}`).set(true);
    }

    const refMensagens = dbRT.ref(`chats/${cid}/messages`).orderByChild('timestamp');

    const cb = snapshot => {
        const msg = snapshot.val();
        const div = document.createElement('div');
        div.className = `msg-bubble ${msg.senderId === currentUser.uid ? 'mine' : 'theirs'}`;
        const remetente = escapeHtml(msg.senderId === currentUser.uid ? 'Você' : (msg.senderName || 'Utilizador'));
        div.innerHTML = `
            <div class="msg-sender">${remetente}</div>
            ${escapeHtml(msg.text)}
            <div class="msg-time">${new Date(msg.timestamp).toLocaleTimeString()}</div>
        `;
        chatMsgs.appendChild(div);
        chatMsgs.scrollTop = chatMsgs.scrollHeight;
    };

    refMensagens.on('child_added', cb);
    chatUnsub = { ref: refMensagens, cb };
}

sendMsg.onclick = async () => {
    const texto = chatInp.value.trim();
    if (!texto || !activeChat.partnerId || !activeChat.adId) return;
    const partes = [currentUser.uid, activeChat.partnerId].sort();
    const cid = `${activeChat.adId}_${partes[0]}_${partes[1]}`;
    await dbRT.ref(`chats/${cid}/messages`).push({
        senderId: currentUser.uid,
        senderName: currentUser.displayName || currentUser.email.split('@')[0],
        text: texto,
        timestamp: Date.now()
    });
    chatInp.value = '';
};

closeChatBtn.onclick = fecharChat;
if (closeInboxBtn) closeInboxBtn.onclick = fecharInbox;

window.addEventListener('click', (e) => {
    if (e.target === chatModal) fecharChat();
    if (e.target === inboxModal) fecharInbox();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (chatModal.style.display === 'flex') fecharChat();
        if (inboxModal.style.display === 'flex') fecharInbox();
    }
});

async function loadInbox() {
    if (!currentUser) return;
    inboxList.innerHTML = '<div class="empty-message">Carregando...</div>';
    const s = await dbRT.ref(`userChats/${currentUser.uid}`).once('value');
    const chats = s.val() || {};
    const items = [];

    for (let cid in chats) {
        const cs = await dbRT.ref(`chats/${cid}`).once('value');
        const c = cs.val();
        if (!c) continue;

        const ad = await adsCol.doc(c.adId).get();
        if (!ad.exists) continue;
        const adTitle = ad.data().title;

        const pid = Object.keys(c.participants).find(id => id !== currentUser.uid);
        if (!pid) continue;

        const ms = await dbRT.ref(`chats/${cid}/messages`)
            .orderByChild('timestamp').limitToLast(1).once('value');

        let lastText = '';
        let lastSenderId = null;
        let lastSenderName = null;
        ms.forEach(m => {
            lastText = m.val().text;
            lastSenderId = m.val().senderId;
            lastSenderName = m.val().senderName || null;
        });

        let otherName = null;
        if (lastSenderId && lastSenderId !== currentUser.uid && lastSenderName) {
            otherName = lastSenderName;
        }
        if (!otherName) {
            try {
                const userDoc = await usersCol.doc(pid).get();
                if (userDoc.exists) {
                    const d = userDoc.data();
                    otherName = d.displayName || d.email?.split('@')[0] || null;
                }
            } catch(e) {}
        }
        otherName = otherName || 'Utilizador';

        const preview = lastText
            ? (lastSenderId === currentUser.uid ? `Você: ${lastText}` : lastText)
            : 'Nova conversa';

        items.push({ cid, pid, otherName, adTitle, preview });
    }

    if (!items.length) {
        inboxList.innerHTML = '<div class="empty-message">📭 Nenhuma conversa</div>';
        return;
    }

    inboxList.innerHTML = items.map(i => `
        <div class="inbox-item" data-pid="${i.pid}" data-aid="${i.cid.split('_')[0]}" data-title="${escapeHtml(i.adTitle)}" data-name="${escapeHtml(i.otherName)}">
            <div class="inbox-item-avatar"><i class="fas fa-user-circle"></i></div>
            <div class="inbox-item-content">
                <div class="inbox-item-header">
                    <span class="inbox-item-sender">${escapeHtml(i.otherName)}</span>
                    <span class="inbox-item-ad">${escapeHtml(i.adTitle)}</span>
                </div>
                <div class="inbox-item-preview">${escapeHtml(i.preview)}</div>
            </div>
        </div>
    `).join('');

    inboxList.querySelectorAll('.inbox-item').forEach(el => {
        el.onclick = () => {
            fecharInbox();
            openChat(el.dataset.pid, el.dataset.name, el.dataset.title, el.dataset.aid);
        };
    });
}

// =====================================================
// INICIALIZAÇÃO FINAL
// =====================================================

loadAds();
