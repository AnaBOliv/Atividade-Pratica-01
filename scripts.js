const formulario = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");

let produtos = [];

// Adicionar produto
formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nomeInput = document.getElementById("nome");
    const precoInput = document.getElementById("preco");

    const nome = nomeInput.value.trim();
    const preco = Number(precoInput.value);

    // Validação
    if (!nome) {
        alert("Digite o nome do produto.");
        return;
    }

    if (isNaN(preco) || preco <= 0) {
        alert("Digite um preço válido.");
        return;
    }

    produtos.push({
        id: Date.now(),
        nome,
        preco
    });

    atualizarLista();

    formulario.reset();
});

// Remover produto
function removerProduto(id) {
    produtos = produtos.filter(produto => produto.id !== id);
    atualizarLista();
}

// Atualizar lista na tela
function atualizarLista() {

    listaProdutos.innerHTML = "";

    if (produtos.length === 0) {
        listaProdutos.innerHTML = `
            <li class="produto-vazio">
                Nenhum produto cadastrado.
            </li>
        `;
        return;
    }

    produtos.forEach(produto => {

        const item = document.createElement("li");
        item.classList.add("produto-item");

        const valorFormatado = produto.preco.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

        item.innerHTML = `
            <div>
                <strong>${produto.nome}</strong><br>
                ${valorFormatado}
            </div>
            <button class="remover">
                Remover
            </button>
        `;

        item
            .querySelector(".remover")
            .addEventListener("click", () => {
                removerProduto(produto.id);
            });

        listaProdutos.appendChild(item);
    });
}

// Exibir mensagem inicial
atualizarLista();
