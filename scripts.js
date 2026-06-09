const formulario = document.getElementById("produtoForm");
const listaProdutos = document.getElementById("listaProdutos");
const temaBtn = document.getElementById("temaBtn");

let produtos = [];

// Alternar tema

temaBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        temaBtn.textContent = "☀️";
    }else{
        temaBtn.textContent = "🌙";
    }

});

// Adicionar produto

formulario.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const preco = parseFloat(document.getElementById("preco").value);
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if(nome === "" || preco <= 0 || quantidade <= 0){
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const produto = {
        nome,
        preco,
        quantidade
    };

    produtos.push(produto);

    atualizarLista();

    formulario.reset();
});

// Atualizar lista

function atualizarLista(){

    listaProdutos.innerHTML = "";

    for(let i = 0; i < produtos.length; i++){

        const produto = produtos[i];

        const item = document.createElement("li");
        item.classList.add("produto");

        item.innerHTML = `
            <div class="info-produto">
                <strong>${produto.nome}</strong>
                <span>Preço: R$ ${produto.preco.toFixed(2)}</span>
                <span>Quantidade: ${produto.quantidade}</span>
                <span>Total: R$ ${(produto.preco * produto.quantidade).toFixed(2)}</span>
            </div>

            <button class="remover" onclick="removerProduto(${i})">
                Remover
            </button>
        `;

        listaProdutos.appendChild(item);
    }

}

// Remover produto

function removerProduto(indice){

    if(indice >= 0 && indice < produtos.length){

        produtos.splice(indice, 1);

        atualizarLista();
    }

}
