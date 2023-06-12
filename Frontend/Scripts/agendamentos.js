var acao = "";

document.addEventListener("DOMContentLoaded", function () {
    exibirInteresse();
    const botaoBuscar = document.getElementById("btn-buscar");
    botaoBuscar.onclick = () => {
        executa("buscar");
    };

    const botaoExcluir = document.getElementById("btn-excluir");
    botaoExcluir.onclick = () => {
        executa("excluir");
    };

    const botaoEditar = document.getElementById("btn-alterar");
    botaoEditar.onclick = () => {
        executa("alterar");
    };
});
function executa(pAcao) {
    acao = pAcao;
    const cpf = document.getElementById("buscaCpf").value;

    if (acao === "buscar") {
        const buscaCpf = document.getElementById("buscaCpf").value;
        const buscaNome = document.getElementById("buscaNome").value;
        if (buscaCpf === "" && buscaNome != "") {
            exibirPorNome(buscaNome);
        }
        else if (buscaCpf != "" && buscaNome === "") {
            exibirPorCpf(buscaCpf);
        }
        else if (buscaCpf === "" && buscaNome === "") {
            exibirInteresse();
        }
        else {
            window.alert("Por favor, escolha somente um filtro de busca.");
        }
        limparFormulario();
    }

    else if (acao === "excluir") {

        if (cpf === "") {
            window.alert("Para remover um interessado é necessário que o CPF seja informado!");
        } else {
            const resposta = confirm("Confirmar a remoção do interessado de CPF " + cpf + "?");
            if (resposta)
                excluirInteresse(cpf);
            else {
                limparFormulario();
            }
        }
        limparFormulario();
    }

    else if (acao === "alterar") {
        const botaoConfirmar = document.getElementById("btn-confirmar");
        if (cpf === "") {
            window.alert("Para alterar um interessado é necessário que o CPF seja informado!");
        } else {
            exibirPorCpf(cpf);
            botaoConfirmar.hidden = false;
            botaoConfirmar.onclick = () => {
                confirmarEdicao(cpf);
            };
        }
        limparFormulario();
    }
}
async function confirmarEdicao(novoCpf) {
    const cpf = novoCpf;
    fetch('http://localhost:4003/interessado/' + cpf, {
        method: "GET"
    })
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Interessado não encontrado.");
            }
        })
        .then((dados) => {
            if (Array.isArray(dados) && dados.length > 0) {
                alterarInteresse(cpf);
            } else {
                window.alert("CPF não encontrado.");
            }
        })
        .catch((erro) => {
            console.error(erro);
            window.alert("Erro ao buscar o interessado: " + erro.message);
        });
}
async function alterarInteresse(novoCpf) {
    const cpf = novoCpf;
    const linha = document.getElementById("linha-" + cpf);

    if (linha) {
        const rg = linha.cells[1].textContent;
        const nome = linha.cells[2].textContent;
        const dataNasc = linha.cells[3].textContent;
        const interesse = linha.cells[4].querySelector('select').value;

        const confirmar = confirm("Confirmar a alteração do interessado de CPF " + cpf + "?");

        if (confirmar) {
            const dados = {
                cpf: cpf,
                rg: rg,
                nome: nome,
                dataNasc: dataNasc,
                interesse: interesse
            };
            console.log(dados);
            fetch('http://localhost:4003/interessado', {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            })
                .then((resposta) => {
                    if (resposta.ok) {
                        window.alert("Interessado alterado com sucesso!");
                        limparFormulario();
                        exibirInteresse(); // Atualiza a tabela exibida
                    } else {
                        throw new Error("Erro ao alterar o interessado.");
                    }
                })
                .catch((erro) => {
                    console.error(erro);
                    window.alert("Erro ao alterar o interessado: " + erro.message);
                });
        }
    } else {
        window.alert("CPF não encontrado.");
    }
}
function excluirInteresse(novoCpf) {
    const cpf = novoCpf;
    fetch('http://localhost:4003/interessado/' + cpf, {
        method: "GET"
    })
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Interessado não encontrado.");
            }
        })
        .then((dados) => {
            if (Array.isArray(dados) && dados.length > 0) {
                fetch('http://localhost:4003/interessado/' + cpf, {
                    method: "DELETE"
                })
                    .then((resposta) => {
                        if (resposta.ok) {
                            window.alert("Interessado excluído com sucesso!");
                            exibirInteresse();
                        } else {
                            throw new Error("Erro ao excluir o interessado.");
                        }
                    })
                    .catch((erro) => {
                        console.error(erro);
                        window.alert("Erro ao excluir o interessado: " + erro.message);
                    });
            } else {
                window.alert("CPF não encontrado.");
            }
        })
        .catch((erro) => {
            console.error(erro);
            window.alert("Erro ao buscar o interessado: " + erro.message);
        });
}
function limparFormulario() {
    const buscaNome = document.getElementById("buscaNome").value = "";
    const buscaCpf = document.getElementById("buscaCpf").value = "";
}
function exibirInteresse() {
    let espacoTabela = document.getElementById("espacoTabela");
    espacoTabela.innerHTML = ""; // Limpa o conteúdo anterior da tabela

    fetch('http://localhost:4003/interessado', {
        method: "GET"
    }).then((resposta) => {
        return resposta.json();
    })
        .then((dados) => {
            if (Array.isArray(dados) && dados.length > 0) {
                let tabela = document.createElement('table');
                tabela.className = "table table-striped table-hover";
                let cabecalho = document.createElement('thead');
                cabecalho.innerHTML = `<tr>
                                <th>CPF: </th>
                                <th>RG: </th>
                                <th>Nome: </th>
                                <th>Data de nascimento: </th>
                                <th>Interesse: </th>
                              </tr>`;
                tabela.appendChild(cabecalho);
                let corpo = document.createElement('tbody');
                for (const interessado of dados) {

                    const linha = document.createElement('tr');
                    linha.innerHTML = `<td>${interessado.cpf}</td>
                                <td>${interessado.rg}</td>
                                <td>${interessado.nome}</td>
                                <td>${interessado.dataNasc}</td>
                                <td>${interessado.interesse}</td>`;

                    corpo.appendChild(linha);
                }
                tabela.appendChild(corpo);
                espacoTabela.appendChild(tabela);
            } else {
                espacoTabela.innerHTML = "<h1>Você não possui nenhum interesse cadastrado.</h1>";
            }
        }).catch((erro) => {
            espacoTabela.innerHTML = "Erro ao obter interessados: " + erro.message;
        });
}
function exibirPorCpf(cpf) {
    let espacoTabela = document.getElementById("espacoTabela");
    fetch('http://localhost:4003/interessado/' + cpf, {
        method: "GET"
    })
        .then((resposta) => {
            return resposta.json();
        })
        .then((dados) => {
            if (Array.isArray(dados) && dados.length > 0) {
                let tabela = document.createElement('table');
                tabela.className = "table table-striped table-hover";
                let cabecalho = document.createElement('thead');
                cabecalho.innerHTML = `<tr>
                                <th>CPF: </th>
                                <th>RG: </th>
                                <th>Nome: </th>
                                <th>Data de nascimento: </th>
                                <th>Interesse: </th>
                              </tr>`;
                tabela.appendChild(cabecalho);
                let corpo = document.createElement('tbody');
                for (const interessado of dados) {
                    const linha = document.createElement('tr');
                    linha.innerHTML = `<td>${interessado.cpf}</td>
                                <td>${interessado.rg}</td>
                                <td>${interessado.nome}</td>
                                <td>${interessado.dataNasc}</td>
                                <td>${interessado.interesse}</td>`;

                    // Verifica se a ação é "editar" e torna os campos editáveis
                    if (acao === "alterar") {
                        linha.innerHTML = `<td>${interessado.cpf}</td>
                                <td style="border: 1px solid red;" contenteditable="true">${interessado.rg}</td>
                                <td style="border: 1px solid red;" contenteditable="true">${interessado.nome}</td>
                                <td style="border: 1px solid red;" contenteditable="true">${interessado.dataNasc}</td>
                                <td style="border: 1px solid red;" contenteditable="true">
                                <select value="${interessado.interesse}">
                                    <option value="">${interessado.interesse}</option>
                                    <option value="ALUGAR">ALUGAR</option>
                                    <option value="COMPRAR">COMPRAR</option>
                                </select>
                              </td>`;
                    }

                    linha.id = `linha-${interessado.cpf}`; // Adiciona o ID para identificar a linha

                    corpo.appendChild(linha);
                }
                tabela.appendChild(corpo);
                espacoTabela.innerHTML = "";
                espacoTabela.appendChild(tabela);
            } else {
                espacoTabela.innerHTML = "<h1>Você não possui nenhum interessado cadastrado com este CPF.</h1>";
            }
        })
        .catch((erro) => {
            espacoTabela.innerHTML = "Erro ao obter interessados: " + erro.message;
        });
}
function exibirPorNome(nome) {
    let espacoTabela = document.getElementById("espacoTabela");
    fetch('http://localhost:4003/interessado/' + nome, {
        method: "GET"
    }).then((resposta) => {
        return resposta.json();
    }).then((dados) => {
        if (Array.isArray(dados) && dados.length > 0) {
            let tabela = document.createElement('table');
            tabela.className = "table table-striped table-hover";
            let cabecalho = document.createElement('thead');
            cabecalho.innerHTML = `<tr>
            <th>CPF: </th>
            <th>RG: </th>
            <th>Nome: </th>
            <th>Data de nascimento: </th>
            <th>Interesse: </th>
          </tr>`;
            tabela.appendChild(cabecalho);
            let corpo = document.createElement('tbody');
            for (const interessado of dados) {
                const linha = document.createElement('tr');
                linha.innerHTML = `<td>${interessado.cpf}</td>
                <td>${interessado.rg}</td>
                <td>${interessado.nome}</td>
                <td>${interessado.dataNasc}</td>
                <td>${interessado.interesse}</td>`;
                corpo.appendChild(linha);
            }
            tabela.appendChild(corpo);
            espacoTabela.innerHTML = "";
            espacoTabela.appendChild(tabela);
        } else {
            espacoTabela.innerHTML = "<h1>Você não possui nenhum interessado cadastrado com este nome.</h1>";
        }
    }).catch((erro) => {
        espacoTabela.innerHTML = "Erro ao obter interessados: " + erro.message;
    });
} 
