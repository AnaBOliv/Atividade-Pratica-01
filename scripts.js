const formulario = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");

let produtos = [];

// Adicionar produto
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const preco = parseFloat(document.getElementById("preco").value);

    // Condicional para validação
    if (nome === "" || isNaN(preco) || preco <= 0) {
        alert("Preencha os dados corretamente.");
        return;
    }

    const produto = {
        id: Date.now(),
        nome: nome,
        preco: preco
    };

    produtos.push(produto);

    atualizarLista();

    formulario.reset();
});

// Remover produto pelo ID
function removerProduto(id) {

    const novaLista = [];

    // Loop para percorrer os produtos
    for (let i = 0; i < produtos.length; i++) {

        if (produtos[i].id !== id) {
            novaLista.push(produtos[i]);
        }

    }

    produtos = novaLista;

    atualizarLista();
}

// Atualiza a DOM
function atualizarLista() {

    listaProdutos.innerHTML = "";

    // Condicional
    if (produtos.length === 0) {
        listaProdutos.innerHTML =
            "<li>Nenhum produto cadastrado.</li>";
        return;
    }

    // Loop para exibir todos os produtos
    for (let i = 0; i < produtos.length; i++) {

        const item = document.createElement("li");
        item.classList.add("produto-item");

        item.innerHTML = `
            <span>
                ${produtos[i].nome} -
                R$ ${produtos[i].preco.toFixed(2)}
            </span>

            <button
                class="remover"
                onclick="removerProduto(${produtos[i].id})">
                Remover
            </button>
        `;

        listaProdutos.appendChild(item);
    }
}

// Inicialização
atualizarLista();
