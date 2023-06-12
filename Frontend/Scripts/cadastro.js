window.addEventListener("DOMContentLoaded", function() {
    $(document).ready(function () {
        $('#cpf').mask('000.000.000-00');
        $('#rg').mask('00.000.000-00');
    });
  });
function cadastrarInteressado() {
    const indexForm = document.getElementById("index-form");
    if (indexForm.checkValidity()) {
        const cpf = document.getElementById("cpf").value;
        const rg = document.getElementById("rg").value;
        const nome = document.getElementById("nome").value;
        const dataNasc = document.getElementById("data-nascimento").value;
        const interesse = document.getElementById("interesse").value;
        //enviando para o backend
        fetch('http://localhost:4003/interessado', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "cpf": cpf,
                "rg": rg,
                "nome": nome,
                "dataNasc": dataNasc,
                "interesse": interesse
            })
        }).then((resposta) => {
            return resposta.json();
        }).then((dados) => {
            if (dados.status) {
                window.alert(dados.mensagem + " Cpf: " + dados.cpf);
            } else {
                window.alert(dados.mensagem);
            }
        }).catch((erro) => {
            window.alert("Não foi possível realizar a operação: " + erro.message);
        });

        indexForm.classList.remove('was-validated');
    } else {
        indexForm.classList.add('was-validated');
    }
}