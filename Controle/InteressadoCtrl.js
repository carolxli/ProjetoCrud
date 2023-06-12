import Interessado from "../Modelo/Interessado.js";
export default class InteressadoCtrl {
    gravar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "POST" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const rg = dados.rg;
            const nome = dados.nome;
            const dataNasc = dados.dataNasc;
            const interesse = dados.interesse;

            if (cpf != "" && rg != "" && nome != "" && dataNasc != "" && interesse) {
                const inter = new Interessado(cpf, rg, nome, dataNasc, interesse);
                inter.gravar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        cpf: inter.cpf,
                        mensagem: "Gravado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Não foi possível gravar." + erro.message
                    });
                });
            } else {
                resposta.status("400").json({
                    status: false,
                    mensagem: "Informe todos os dados necessários!"
                });
            }
        } else {
            resposta.status("400").json({
                status: false,
                mensagem: "Método não permitido para incluir interesse."
            });
        }
    }
    atualizar(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "PATCH" && requisicao.is("application/json")) {
            const dados = requisicao.body;
            const cpf = dados.cpf;
            const rg = dados.rg;
            const nome = dados.nome;
            const dataNasc = dados.dataNasc;
            const interesse = dados.interesse;

            if (cpf != "" && rg != "" && nome != "" && dataNasc != "" && interesse != "") {
                const inter = new Interessado(cpf, rg, nome, dataNasc, interesse);
                inter.atualizar().then(() => {
                    resposta.status(200).json({
                        status: true,
                        cpf: inter.cpf,
                        mensagem: "Alterado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Não foi possível alterar." + erro.message
                    });
                });
            } else {
                resposta.status("400").json({
                    status: false,
                    mensagem: "Informe todos os dados necessários!"
                });
            }
        } else {
            resposta.status("400").json({
                status: false,
                mensagem: "Método não permitido para incluir interesse."
            });
        }
    }
    excluir(requisicao, resposta) {
        resposta.type("application/json");
        if (requisicao.method === "DELETE") {
            const cpf = requisicao.params.cpf;
            if (cpf) {
                const inter = new Interessado(cpf);
                inter.excluir().then(() => {
                    resposta.status(200).json({
                        status: true,
                        mensagem: "Excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: false,
                        mensagem: "Não foi possível excluir: " + erro.message
                    });
                });
            } else {
                resposta.status("400").json({
                    status: false,
                    mensagem: "Informe o cpf para excluir!"
                })
            }
        } else {
            resposta.status(400).json({
                status: false,
                mensagem: "Método não permitido!"
            });
        }
    }
    consultar(requisicao, resposta) {
        if (requisicao.method === "GET") {
            const inter = new Interessado();
            let nomeConsulta = requisicao.params.novoNome;
            if (isNaN(parseInt(nomeConsulta))) {
                if (nomeConsulta === undefined) {
                    nomeConsulta = "";
                }

                inter.consultarNome(nomeConsulta).then((listaInter) => {
                    resposta.status(200).json(listaInter);
                }).catch((erro) => {
                    resposta.status(500).json({
                        status: "false",
                        mensagem: "Não foi possível processar a consulta"
                    });
                });
            }
            else {
                inter.consultarCpf(nomeConsulta).then((listaInter) => {
                    resposta.status(200).json(listaInter);
                }).catch((error) => {
                    resposta.status(500).json({
                        status: "false",
                        mensagem: "Não foi possível processar a consulta"
                    });
                });
            }
        }
        else {
            resposta.status("400").json({
                status: false,
                mensagem: "Método não permitido para consultar um interessado, verifique a documentação da API"
            });
        }
    }
}
