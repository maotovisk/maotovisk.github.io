//Constantes
const descSignos = {
    aries: {
        nome: "Áries",
        desc: "Impulsivo, o ariano não pensa muito sobre seus atos. É aquele que primeiro age, depois reflete. Agitado, precisa de muita atividade para gastar a energia, senão pode ficar agressivo e explosivo."
    },
    touro: {
        nome: "Touro",
        desc: "Teimoso, o taurino é determinado e protetor. Precisa de segurança e estabilidade para ser feliz, e conquista isso com muito trabalho e concentração. Carinhoso, o taurino pode ser ciumento com quem ama."
    },
    gemeos: {
        nome: "Gêmeos",
        desc: "Espontâneo e um pouco instável, o geminiano é uma verdadeira caixinha de surpresas. Como é volátil, muitas vezes nem mesmo o geminiano se entende, mas o importante é que ele está sempre de bom humor e em busca de aventuras."
    },
    cancer: {
        nome: "Câncer",
        desc: "Família é a palavra-chave para o canceriano. Tranquilo e emotivo, gosta de ficar em casa, fazer programas com quem ama e curtir momentos com os parentes. Curioso, faz amizade com facilidade, mas pode ser um pouco sensível."
    },
    leao: {
        nome: "Leão",
        desc: "Este é signo que veio para brilhar. O leonino gosta de chamar a atenção e ser o centro do mundo, mas também é muito amável e leal. Simpático e comunicativo, o nativo de leão pode ser um pouco ciumento e inseguro."
    },
    virgem: {
        nome: "Virgem",
        desc: "Perspicaz e inteligente, o virginiano está acostumado com o sucesso, por isso se cobra muito, assim como aos demais. Por isso, pode ser um pouco rígido e magoar quem ama. Tímido, prefere programas tranquilos a grandes eventos."
    },
    libra: {
        nome: "Libra",
        desc: "O libriano gosta do que é belo e harmonioso. Não gosta de conflitos e por isso tenta ser imparcial em debates e brigas. Indeciso, pode demorar muito para escolher coisas simples, como o que comer ou vestir. Bom gosto define este signo."
    },
    escorpiao: {
        nome: "Escorpião",
        desc: "Determinado, o escorpiano vai até o fim para conquistar os seus objetivos. Sensual e romântico, gosta de estar em relacionamentos, mas pode ser desconfiado enquanto não se sentir seguro com a pessoa."
    },
    sagitario: {
        nome: "Sagitário",
        desc: "Um signo de bem com a vida, que está sempre em busca de ação e que vive rodeado de amigos. Este é o signo de sagitário, que é sonhador e adora conhecer pessoas e lugares novos."
    },
    capricornio: {
        nome: "Capricórnio",
        desc: "Trabalhador, tímido e educado, o capricórnio pode passar uma imagem de fechado e até mesmo antipático, mas é que ele eprecisa confiar em quem está ao seu lado para se abrir totalmente. Com paciência, ele se mostra um amigo leal e um companheiro fiel."
    },
    aquario: {
        nome: "Aquário",
        desc: "Independente, o aquariano preza muito por sua liberdade. Gosta de viajar, sair e conhecer pessoas novas. Tem uma mente aberta e gosta de tudo o que é inovador e moderno, desde roupas e tecnologia, até mesmo atitudes comportamentais."
    },
    peixes: {
        nome: "Peixes",
        desc: "Este é o signo mais romântico do zodíaco. Sonhador e carinhoso, ele está sempre preocupado com o bem estar dos outros. Sensível e carinhoso, acredita em contos de fadas e acha que todos merecem um final feliz."
    },
}
// JS puro

//FUNÇÃO PARA CALCULAR A IDADE
function calculaIdade(data1, data2) {
    var diams = 1000 * 60 * 60 * 24;

    var tempoms1 = data1.getTime();
    var tempoms2 = data2.getTime();
    var tempoms = tempoms2 - tempoms1;

    var dias = tempoms / diams;

    return dias / 365;
}

// FUNÇÃO PARA RETORNAR UM SIGNO
function getSigno(dia, mes) {
    if ((dia >= 21) && (mes == 3) || (dia <= 19) && (mes == 4)) {
        return "aries";
    } else {
        if ((dia >= 20) && (mes == 4) || (dia <= 20) && (mes == 5)) {
            return "touro";
        } else {
            if ((dia >= 21) && (mes == 5) || (dia <= 21) && (mes == 6)) {
                return "gemeos";
            } else {
                if ((dia >= 22) && (mes == 6) || (dia <= 22) && (mes == 7)) {
                    return "cancer";
                } else {
                    if ((dia >= 23) && (mes == 7) || (dia <= 22) && (mes == 8)) {
                        return "leao";
                    } else {
                        if ((dia >= 23) && (mes == 8) || (dia <= 22) && (mes == 9)) {
                            return "virgem";
                        } else {
                            if ((dia >= 23) && (mes == 9) || (dia <= 22) && (mes == 10)) {
                                return "libra";
                            } else {
                                if ((dia >= 23) && (mes == 10) || (dia <= 21) && (mes == 11)) {
                                    return "escorpião";
                                } else {
                                    if ((dia >= 22) && (mes == 11) || (dia <= 21) && (mes == 12)) {
                                        return "sagitario";
                                    } else {
                                        if ((dia >= 22) && (mes == 12) || (dia <= 19) && (mes == 1)) {
                                            return "capricornio";
                                        } else {
                                            if ((dia >= 20) && (mes == 1) || (dia <= 18) && (mes == 2)) {
                                                return "aquario";
                                            } else {
                                                if ((dia >= 19) && (mes == 2) || (dia <= 20) && (mes == 3)) {
                                                    return "peixes";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

}
// Aqui fica, os scripts com JQuery (a maioria do JS)


//
// script para fazer o scroll suave dos botões
//
$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

    //FUNÇÃO ENVIAR
    $('#enviaisso').on('click', function (event) {
        var nome = $("#nome").val();
        var datanascimento = new Date($("#dtnasc").val())
        if (nome.length > 0) {
            if (datanascimento > new Date()) {
                $("#erro").text("Digite uma data de nascimento válida");
            } else {
                if (datanascimento != "Invalid Date") {
                    $(".resultados").css("height", "100vh");
                    $(".resultados").css("opacity", "1");
                    $(".resultados").css("padding", "50");
                    $('html, body').animate({
                        scrollTop: $("#resultado").offset().top
                    }, 800, function () {
                        window.location.hash = "#resultado";
                    });
                    primeironome = nome.split(" ")[0];
                    var dia = datanascimento.getDate() + 1;
                    var mes = datanascimento.getMonth() + 1;
                    var idade = Math.floor(calculaIdade(datanascimento, new Date()));
                    if (idade == 1) {
                        $("#idade").text(idade.toString() + " ano");
                    } else {
                        $("#idade").text(idade.toString() + " anos");
                    }
                    $("#primeironome").text(primeironome);
                    $("#nomedapessoa").text(nome);
                    var signo = getSigno(dia, mes);
                    $("#signopessoa").text(descSignos[signo].nome);
                    $("#descsigno").text(descSignos[signo].desc);
                } else {
                    $("#erro").text("Digite uma data de nascimento válida");
                }
            }
        } else {
            $("#erro").text("Digite um nome válido");
        }
    });

    //FUNÇÃO VOLTAR 
    $("#voltartopo").on('click', function () {
        $(".resultados").css("height", "0");
        $(".resultados").css("opacity", "0");
        $(".resultados").css("padding", "-100");
        $("#nome").val("");
        $("#dtnasc").val("");
    });

});
