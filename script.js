let personagens = [];
let idPersonagem = 1;

class ItemMagico {
  constructor(nome, tipo, forca, defesa) {
    this.id = Date.now() + Math.floor(Math.random() * 1000);
    this.nome = nome;
    this.tipo = tipo;
    this.forca = forca;
    this.defesa = defesa;

    this.validar();
  }

  validar() {
    const tiposValidos = ['Arma', 'Armadura', 'Amuleto'];
    if (!tiposValidos.includes(this.tipo)) {
      throw new Error('Tipo de item inválido');
    }

    if (this.forca < 0 || this.defesa < 0 || this.forca > 10 || this.defesa > 10) {
      throw new Error('Força e Defesa devem estar entre 0 e 10');
    }

    if (this.forca === 0 && this.defesa === 0) {
      throw new Error('Item deve ter pelo menos 1 ponto em Força ou Defesa');
    }

    if (this.tipo === 'Arma' && this.defesa !== 0) {
      throw new Error('Armas devem ter Defesa igual a 0');
    }

    if (this.tipo === 'Armadura' && this.forca !== 0) {
      throw new Error('Armaduras devem ter Força igual a 0');
    }
  }
}

class Personagem {
  constructor(nome, nomeAventureiro, classe, forca, defesa) {
    if (forca + defesa > 10) {
      throw new Error('A soma de Força e Defesa não pode passar de 10');
    }

    this.id = idPersonagem++;
    this.nome = nome;
    this.nomeAventureiro = nomeAventureiro;
    this.classe = classe;
    this.forcaBase = forca;
    this.defesaBase = defesa;
    this.itensMagicos = [];
  }

  get forcaTotal() {
    const bonus = this.itensMagicos.reduce((total, item) => total + item.forca, 0);
    return this.forcaBase + bonus;
  }

  get defesaTotal() {
    const bonus = this.itensMagicos.reduce((total, item) => total + item.defesa, 0);
    return this.defesaBase + bonus;
  }
}

function prepararAdicaoItem(personagemId) {
    const personagem = personagens.find(p => p.id === personagemId);
    if (!personagem) return alert("Personagem não encontrado!");
  
    const formularioItem = `
      <div class="itemFormulario">
        <label for="nomeItem">Nome do item:</label>
        <input type="text" id="nomeItem" required>
  
        <label for="tipoItem">Tipo (Arma, Armadura, Amuleto):</label>
        <select id="tipoItem" required>
          <option value="Arma">Arma</option>
          <option value="Armadura">Armadura</option>
          <option value="Amuleto">Amuleto</option>
        </select>
  
        <label for="forcaItem">Pontos de Força:</label>
        <input type="number" id="forcaItem" min="0" max="10" required>
  
        <label for="defesaItem">Pontos de Defesa:</label>
        <input type="number" id="defesaItem" min="0" max="10" required>
  
        <button onclick="adicionarItem(${personagemId})">Adicionar Item</button>
        <button onclick="cancelarAdicaoItem(${personagemId})">Cancelar</button>
      </div>
    `;
  
    const personagemDiv = document.getElementById(`personagem-${personagemId}`);
    personagemDiv.innerHTML += formularioItem;
  }
  
  function adicionarItem(personagemId) {
    const nomeItem = document.getElementById('nomeItem').value;
    const tipoItem = document.getElementById('tipoItem').value;
    const forcaItem = parseInt(document.getElementById('forcaItem').value);
    const defesaItem = parseInt(document.getElementById('defesaItem').value);
  
    const personagem = personagens.find(p => p.id === personagemId);
    if (!personagem) return alert("Personagem não encontrado!");
  
    try {
        if (tipoItem === 'Amuleto') {
            const jaTemAmuleto = personagem.itensMagicos.some(item => item.tipo === 'Amuleto');
        if (jaTemAmuleto) {
            throw new Error(`${personagem.nomeAventureiro} já possui um Amuleto!`);
    }
} 
  
      const item = new ItemMagico(nomeItem, tipoItem, forcaItem, defesaItem);
      personagem.itensMagicos.push(item);
      renderizarPersonagens();
    } catch (erro) {
      alert(erro.message);
    }
  }
  
  function cancelarAdicaoItem(personagemId) {
    const personagemDiv = document.getElementById(`personagem-${personagemId}`);
    const formularioItem = personagemDiv.querySelector('.itemFormulario');
    if (formularioItem) formularioItem.remove();
  }
  
  function renderizarPersonagens() {
    const div = document.getElementById('listaPersonagens');
    div.innerHTML = personagens.map(p => {
      const itensHtml = p.itensMagicos.length
        ? `<ul>${p.itensMagicos.map(item =>
          `<li>${item.nome} (${item.tipo}) - F: ${item.forca} | D: ${item.defesa}
           <button onclick="removerItem(${p.id}, ${item.id})">Remover Item</button>
           </li>`).join('')}</ul>`
        : '<em>Nenhum item mágico</em>';
  
      return `
        <div id="personagem-${p.id}">
          <strong>${p.nomeAventureiro}</strong> (${p.classe})<br>
          Força: ${p.forcaTotal} | Defesa: ${p.defesaTotal}<br>
          ${itensHtml}
          <button onclick="editarPersonagem(${p.id})">Editar</button>
          <button onclick="removerPersonagem(${p.id})">Remover</button>
          <button onclick="prepararAdicaoItem(${p.id})">Adicionar Item</button>
          <hr>
        </div>
      `;
    }).join('');
  }

function removerItem(personagemId, itemId) {
    const personagem = personagens.find(p => p.id === personagemId);
    if (!personagem) return alert("Personagem não encontrado!");
  
    personagem.itensMagicos = personagem.itensMagicos.filter(item => item.id !== itemId);
    renderizarPersonagens();
}

function removerPersonagem(id) {
  personagens = personagens.filter(p => p.id !== id);
  renderizarPersonagens();
}

function editarPersonagem(id) {
  const personagem = personagens.find(p => p.id === id);
  if (!personagem) return;

  document.getElementById('personagemId').value = personagem.id;
  document.getElementById('nome').value = personagem.nome;
  document.getElementById('nomeAventureiro').value = personagem.nomeAventureiro;
  document.getElementById('classe').value = personagem.classe;
  document.getElementById('forca').value = personagem.forcaBase;
  document.getElementById('defesa').value = personagem.defesaBase;
}

document.getElementById('personagemForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const nomeAventureiro = document.getElementById('nomeAventureiro').value;
  const classe = document.getElementById('classe').value;
  const forca = parseInt(document.getElementById('forca').value);
  const defesa = parseInt(document.getElementById('defesa').value);
  const personagemId = document.getElementById('personagemId').value;

  try {
    if (forca + defesa > 10) {
      throw new Error('A soma de Força e Defesa não pode passar de 10');
    }

    if (personagemId) {
      const personagem = personagens.find(p => p.id === parseInt(personagemId));
      personagem.nome = nome;
      personagem.nomeAventureiro = nomeAventureiro;
      personagem.classe = classe;
      personagem.forcaBase = forca;
      personagem.defesaBase = defesa;
    } else {
      const novo = new Personagem(nome, nomeAventureiro, classe, forca, defesa);
      personagens.push(novo);
    }

    renderizarPersonagens();
    e.target.reset();
    document.getElementById('personagemId').value = '';

  } catch (erro) {
    alert(erro.message);
  }
});

const forcaInput = document.getElementById('forca');
const defesaInput = document.getElementById('defesa');

function validarDistribuicao() {
  const forca = parseInt(forcaInput.value) || 0;
  const defesa = parseInt(defesaInput.value) || 0;
  if (forca + defesa > 10) {
    forcaInput.style.borderColor = 'red';
    defesaInput.style.borderColor = 'red';
  } else {
    forcaInput.style.borderColor = '';
    defesaInput.style.borderColor = '';
  }
}

forcaInput.addEventListener('input', validarDistribuicao);
defesaInput.addEventListener('input', validarDistribuicao);