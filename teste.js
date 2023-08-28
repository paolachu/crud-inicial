const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#nome');
const sSobrenome = document.querySelector('#sobrenome');
const sUsuario = document.querySelector('#usuario');
const sEmail = document.querySelector('#email');
const Salvar = document.querySelector('#salvar');
const confirmationModal = document.getElementById('confirmationModal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');

let itens = [];
let id;

function openModal(edit = false, index = 0) {
    modal.classList.add('active')
  
    modal.onclick = e => {
      if (e.target.className.indexOf('modal-container') !== -1) {
        modal.classList.remove('active')
      }
    }
  
    if (edit) {
      sNome.value = itens[index].nome
      sSobrenome.value = itens[index].sobrenome
      sUsuario.value = itens[index].usuario
      sEmail.value = itens[index].email
      id = index
    } else {
      sNome.value = ''
      sSobrenome.value = ''
      sUsuario.value = ''
      sEmail.value = ''
    }
    
  }

function editItem(index) {

    openModal(true, index)
}

function deleteItem(index) {
    confirmationModal.style.display = 'block'
  
    confirmDelete.addEventListener('click', () => {
      itens.splice(index, 1)
      setItensBD()
      confirmationModal.style.display = 'none'
      loadItens()
    })
  
    cancelDelete.addEventListener('click', () => {
      confirmationModal.style.display = 'none'
    })
}

function insertItem(item, index) {
    let tr = document.createElement('tr')
  
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td>${item.sobrenome}</td>
      <td>${item.usuario}</td>
      <td>${item.email}</td>
      <td class="acao">
        <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      </td>
      <td class="acao">
        <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
      </td>
    `
    tbody.appendChild(tr)
}

Salvar.onclick = e => {
  
    if (sNome.value == '' || sSobrenome.value == '' || sUsuario.value == '' || sEmail.value == '') {
      return
    }
  
    e.preventDefault();
  
    if (id !== undefined) {
      itens[id].nome = sNome.value
      itens[id].sobrenome = sSobrenome.value
      itens[id].usuario = sUsuario.value
      itens[id].email = sEmail.value
    } else {
      itens.push({'nome': sNome.value, 'sobrenome': sSobrenome.value, 'usuario': sUsuario.value, 'email': sEmail.value})
    }
  
    setItensBD()
  
    modal.classList.remove('active')
    loadItens()
    id = undefined
}

function loadItens() {
    itens = getItensBD();
    tbody.innerHTML = '';
    itens.forEach((item, index) => {
      insertItem(item, index);
    });
  }
  
  function getItensBD() {
    const data = localStorage.getItem('itens');
    return JSON.parse(data) || [];
  }
  
  function setItensBD(itens) {
    localStorage.setItem('itens', JSON.stringify(itens));
  }
  
  // Carregar os itens iniciais
  loadItens();