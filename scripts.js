const formulario = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");
const temaBtn = document.getElementById("temaBtn");

let produtos = [];

// ======================
// TEMA CLARO / ESCURO
// ======================

temaBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        temaBtn.textContent = "☀️";
    } else {
        temaBtn.textContent = "🌙";
    }

});

// ======================
// ADICIONAR PRODUTO
// ======================

formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const preco = Number(
        document.getElementById("preco").value
    );

    const quantidade = parseInt(
        document.getElementById("quantidade").value
    );

    if (
        nome === "" ||
        isNaN(preco) ||
        preco <= 0 ||
        isNaN(quantidade) ||
        quantidade <= 0
    ) {
        alert("Preencha os campos corretamente.");
        return;
    }

    produtos.push({
        nome: nome,
        preco: preco,
        quantidade: quantidade
    });

    atualizarLista();

    formulario.reset();
});

// ======================
// LISTAR PRODUTOS
// ======================

function atualizarLista() {

    listaProdutos.innerHTML = "";

    for (let i = 0; i < produtos.length; i++) {

        const produto = produtos[i];

        const li = document.createElement("li");

        li.className = "produto";

        li.innerHTML = `
            <div class="info-produto">
                <strong>${produto.nome}</strong>

                <span>
                    Preço: R$ ${produto.preco.toFixed(2)}
                </span>

                <span>
                    Quantidade: ${produto.quantidade}
                </span>

                <span>
                    Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}
                </span>
            </div>

            <button
                class="remover"
                data-indice="${i}">
                Remover
            </button>
        `;

        listaProdutos.appendChild(li);
    }

    adicionarEventosRemover();
}

// ======================
// REMOVER PRODUTO
// ======================

function adicionarEventosRemover() {

    const botoes = document.querySelectorAll(".remover");

    for (let i = 0; i < botoes.length; i++) {

        botoes[i].addEventListener("click", function () {

            const indice = this.dataset.indice;

            produtos.splice(indice, 1);

            atualizarLista();

        });
    }
}
