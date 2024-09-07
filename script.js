let tarefas = [];
let idAtual = 1;

document.getElementById('btnNovaTarefa').addEventListener('click', novaTarefa);
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', filtrarTarefas);
});
document.getElementById('btnGetTarefaById').addEventListener('click', getTarefaById);

function getProximoId() {
    return idAtual++;
}

function novaTarefa() {
    const inputTarefa = document.getElementById('inputTarefa').value;

    if (inputTarefa.trim() === '') 
        return;

    const novaTarefa = {
        id: getProximoId(),
        titulo: inputTarefa,
        concluida: false
    };

    tarefas.push(novaTarefa);
    mostraTarefa();
    document.getElementById('inputTarefa').value = '';
}

function mostraTarefa(filtro = 'todas', idTarefa = null) {
    const listaTarefa = document.getElementById('listaTarefa');
    listaTarefa.innerHTML = '';

    tarefas.filter(tarefa => {
        if (idTarefa !== null) 
            return tarefa.id === idTarefa;
        if (filtro === 'ativas') 
            return !tarefa.concluida;
        if (filtro === 'concluidas') 
            return tarefa.concluida;
        return true;
    }).forEach(tarefa => {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center ${tarefa.concluida ? 'list-group-item-secondary' : ''}`;

        li.innerHTML = `
            <div>
                <input type="checkbox" ${tarefa.concluida ? 'checked' : ''} onchange="completarTarefa(${tarefa.id})">
                <small class="ms-2 text-muted">ID: ${tarefa.id}</small>
                <span class="titulo ms-2">${tarefa.titulo}</span>
            </div>
            <div>
                <button class="btn btn-sm btn-warning edit-btn" onclick="editarTarefa(${tarefa.id})">Editar</button>
                <button class="btn btn-sm btn-danger delete-btn" onclick="deletarTarefa(${tarefa.id})">Excluir</button>
            </div>
        `;
        listaTarefa.appendChild(li);
    });
}

function completarTarefa(idTarefa) {
    const tarefaSelecionada = tarefas.find(tarefa => tarefa.id === idTarefa);
    tarefaSelecionada.concluida = !tarefaSelecionada.concluida;
    mostraTarefa();
}

function editarTarefa(idTarefa) {
    const tarefaSelecionada = tarefas.find(tarefa => tarefa.id === idTarefa);
    const novoTexto = prompt('Edite a tarefa:', tarefaSelecionada.titulo);
    if (novoTexto !== null && novoTexto.trim() !== '') {
        tarefaSelecionada.titulo = novoTexto;
        mostraTarefa();
    }
}

function deletarTarefa(idTarefa) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== idTarefa);
    mostraTarefa();
}

function filtrarTarefas(event) {
    const filtro = event.target.getAttribute('data-filter');
    mostraTarefa(filtro);
}

function getTarefaById() {
    const idTarefa = parseInt(document.getElementById('inputIdTarefa').value);
    const mensagemResultado = document.getElementById('mensagemResultado');

    if (!isNaN(idTarefa)) {
        const tarefaSelecionada = tarefas.find(tarefa => tarefa.id === idTarefa);
        mensagemResultado.textContent = ""
        if (tarefaSelecionada) {
            mostraTarefa(null, idTarefa);
        } else {
            mensagemResultado.textContent = 'Tarefa não encontrada';
            mostraTarefa();
        }
    } else {
        mensagemResultado.textContent = ""
        mostraTarefa();
    }
}
