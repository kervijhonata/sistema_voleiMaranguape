async function gerarPDF(e) {

    e.preventDefault()

    const html = document.querySelector("#pdfContainer")
    var htmlSize = html.style.width

    // Espandir tamanho do HTML
    html.style.width = '1400px'

    await html2canvas(html, {useCORS: true, allowTaint: true}).then( (canvas) => {
        var imgData = canvas.toDataURL('image/png')
        var doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4'
        })

        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();

        console.log("width: "+width)
        console.log("height: "+height)

        doc.addImage(imgData, 'PNG', 10, 6, width-20, height);
        doc.save("pdfTeste.pdf")

        // Voltar para o tamanho original
        html.style.width = htmlSize
    })

}

const btn = document.querySelector("#btn-gerador-pdf")
btn.addEventListener('click', gerarPDF)

// function gerarPDF(e) {
//     console.log(e)
// }

// function gerarPDF() {

//     const template = `
//     <div class="mb-4" id="teste"> <!--pdfContainer-->
//             <div class="row">

//                 <div class="col-3">
//                     <div class="row mb-2" style="display: flex; justify-content: center;">
//                         <img src="https://via.placeholder.com/120/f0c000/000.png?text=Imagem+da+federacao" alt="imagem da federação" style="width: 80%;">
//                     </div>
//                     <div class="row">
//                         <div>
//                             <label for="numero-registro">Registro N°</label>
//                             <input type="text" name="numero-registro" class="form-control mb-2">
//                         </div>
//                         <div>
//                             <label for="numero-transferencia">Transferência N°</label>
//                             <input type="text" name="numero-transferencia" class="form-control" placeholder="apenas entre federações">
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-7" style="display: grid; align-content: space-between;">
//                     <div class="">
//                         <h2 class="text-center">Certificado de Atleta</h2>
//                     </div>
//                     <div class="">
//                         <div>
//                             <input type="checkbox" name="registro" id="checkbox-registro">
//                             <label for="checkbox-registro">Registro</label>
//                         </div>
//                         <div>
//                             <input type="checkbox" name="inscricao" id="checkbox-inscricao">
//                             <label for="checkbox-inscricao">Inscrição</label>
//                         </div>
//                         <div>
//                             <input type="checkbox" name="renovacao" id="checkbox-renovacao">
//                             <label for="checkbox-renovacao">Renovação</label>
//                         </div>
//                         <div>
//                             <input type="checkbox" name="transferencia-clube-igual" id="checkbox-transferencia-clube-igual">
//                             <label for="checkbox-transferencia-clube-igual">Transfência entre clubes de mesma federação</label>
//                         </div>
//                         <div>
//                             <input type="checkbox" name="transferencia-clube-diferente" id="checkbox-transferencia-clube-diferente">
//                             <label for="checkbox-transferencia-clube-diferente">Transfência entre clubes de federação diferente</label>
//                         </div>
//                         <div>
//                             <input type="checkbox" name="cessao-temporaria-clube-igual" id="checkbox-cessao-temporaria-clube-igual">
//                             <label for="checkbox-cessao-temporaria-clube-igual">Cessão temporária entre clubes de mesma federação</label>
//                         </div>
//                         <div>
//                             <input type="checkbox" name="cessao-temporaria-clube-diferente" id="checkbox-cessao-temporaria-clube-diferente">
//                             <label for="checkbox-cessao-temporaria-clube-diferente">Cessão temporária entre clubes de federação diferente</label>
//                         </div>
//                         <div>
//                             <input type="checkbox" name="cancelamento-cessao-temporaria" id="checkbox-cancelamento-cessao-temporaria">
//                             <label for="checkbox-cancelamento-cessao-temporaria">Cancelamento de cessão temporária</label>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="col-2" style="display: grid; align-content: center; justify-content: center;">
//                     <img src="https://via.placeholder.com/200/f0c000/000.png?text=Imagem+do+aluno" alt="imagem do aluno" class="text-center">
//                 </div>
//             </div>
//         </div>

//         <hr>

//         <div class="row mt-2">
//             <div class="col">
//                 <input type="text" name="nome" id="" placeholder="Nome" class="form-control" value="Nome: {{dadosFicha.nome}}">
//             </div>
//         </div>

//         <div class="row mt-2">
//             <div class="col">
//                 <input type="text" name="endereco" id="" placeholder="endereco" class="form-control" value="Endereço: {{dadosFicha.endereco}}">
//             </div>
//             <div class="col">
//                 <input type="text" name="bairro" id="" placeholder="bairro" class="form-control" value="Bairro: {{dadosFicha.bairro}}">
//             </div>
//         </div>

//         <div class="row mt-2">
//             <div class="col-4">
//                 <input type="text" name="cidade" id="" placeholder="cidade" class="form-control" value="Cidade: {{dadosFicha.cidade}}">
//             </div>
//             <div class="col-3">
//                 <input type="text" name="estado" id="" placeholder="estado" class="form-control" value="Estado: {{dadosFicha.estado}}">
//             </div>
//             <div class="col-2">
//                 <input type="text" name="cep" id="" placeholder="cep" class="form-control" value="CEP: {{dadosFicha.cep}}">
//             </div>
//             <div class="col-3">
//                 <input type="text" name="telefone" id="" placeholder="telefone" class="form-control" value="Telefone: {{dadosFicha.telefone}}">
//             </div>
//         </div>

//         <div class="row mt-2">
//             <div class="col">
//                 <input type="text" name="email" id="" placeholder="email" class="form-control" value="Email: {{dadosFicha.email}}">
//             </div>
//             <div class="col">
//                 <input type="text" name="contato_extra" id="" placeholder="contato_extra" class="form-control" value="Outras formas de contato: {{dadosFicha.contato_extra}} ({{dadosFicha.tipo_contato_extra}})">
//             </div>
//         </div>

//         <hr>

//         <div class="row mt-2">
//             <div class="col">
//                 <input type="text" name="pai" id="" placeholder="pai" class="form-control" value="Nome do Pai: {{dadosFicha.pai}}">
//             </div>
//             <div class="col">
//                 <input type="text" name="mae" id="" placeholder="mae" class="form-control" value="Nome da Mãe: {{dadosFicha.mae}}">
//             </div>
//         </div>

//         <div class="row mt-2">
//             <div class="col">
//                 <input type="text" name="genero" id="" placeholder="genero" class="form-control" value="Gênero: {{dadosFicha.genero}}">
//             </div>
//             <div class="col">
//                 <input type="text" name="data_nascimento" id="" placeholder="data_nascimento" class="form-control" value="Data de Nascimento: {{dadosFicha.data_nascimento}}">
//             </div>
//         </div>

//         <div class="row mt-2">
//             <div class="col">
//                 <input type="text" name="naturalidade" id="" placeholder="naturalidade" class="form-control" value="Naturalidade: {{dadosFicha.naturalidade}}">
//             </div>
//             <div class="col">
//                 <input type="text" name="nacionalidade" id="" placeholder="nacionalidade" class="form-control" value="Nacionalidade: {{dadosFicha.nacionalidade}}">
//             </div>
//         </div>

//         <div class="row mt-2">
            
//             <div class="col">
//                 <input type="text" name="identidade" id="" placeholder="identidade" class="form-control" value="Identidade: {{dadosFicha.identidade}}">
//             </div>
//             <div class="col">
//                 <input type="text" name="expedidor_identidade" id="" placeholder="expedidor_identidade" class="form-control" value="Orgão expedidor: {{dadosFicha.expedidor_identidade}}">
//             </div>
//             <div class="col">
//                 <input type="text" name="emissao_identidade" id="" placeholder="emissao_identidade" class="form-control" value="Data de Emissão: {{dadosFicha.emissao_identidade}}">
//             </div>
//         </div>

//         <div class="row mt-2">
//             <div class="col">
//                 <input type="text" name="cpf" id="" placeholder="cpf" class="form-control" value="CPF: {{dadosFicha.cpf}}">
//             </div>
//             <div class="col">
//                 <input type="text" name="reservista" id="" placeholder="reservista" class="form-control" value="Reservista: {{dadosFicha.reservista}}">
//             </div>
//             <div class="col">
//                 <input type="text" name="expedidor_reservista" id="" placeholder="expedidor_reservista" class="form-control" value="Orgão expedidor: {{dadosFicha.expedidor_reservista}}">
//             </div>
//         </div>

//         <div class="row mt-2">
//             <div class="col">
//                 <input type="text" name="grau_ensino" id="" placeholder="grau_ensino" class="form-control" value="Grau de Ensino: {{dadosFicha.grau_ensino}}">
//             </div>
//             <div class="col">
//                 <input type="text" name="instituicao_ensino" id="" placeholder="instituicao_ensino" class="form-control" value="Instituição: {{dadosFicha.instituicao_ensino}}">
//             </div>
//         </div>

//         <hr>

//         <div class="row mt-2">

//             <div class="col card">
//                 <div class="card-body">
//                     <div class="row">
//                         <span style="background: blue; color: white; width: 20px; height: 26px; margin-right: 20px;">1</span>
//                         Associação de Origem
//                     </div>
//                     <div class="row mt-2">
//                         <input type="text" name="" id="" value="Nome: " class="form-control">
//                     </div>
//                     <div class="row mt-2">
//                         <input type="text" name="" id="" value="Assinatura do Presidente: " class="form-control">
//                     </div>
//                 </div>
//             </div>

//             <div class="col card">
//                 <div class="card-body">
//                     <div class="row">
//                         <span style="background: blue; color: white; width: 20px; height: 26px; margin-right: 20px;">2</span>
//                         Federação de Origem
//                     </div>
//                     <div class="row mt-2">
//                         <input type="text" name="" id="" value="Nome: " class="form-control">
//                     </div>
//                     <div class="row mt-2">
//                         <input type="text" name="" id="" value="Assinatura do Presidente: " class="form-control">
//                     </div>
//                 </div>
//             </div>

//         </div>

//         <div class="row mt-2">

//             <div class="col card">
//                 <div class="card-body">
//                     <div class="row">
//                         <span style="background: blue; color: white; width: 20px; height: 26px; margin-right: 20px;">3</span>
//                         Associação de Destino
//                     </div>
//                     <div class="row mt-2">
//                         <input type="text" name="" id="" value="Nome: " class="form-control">
//                     </div>
//                     <div class="row mt-2">
//                         <input type="text" name="" id="" value="Assinatura do Presidente: " class="form-control">
//                     </div>
//                 </div>
//             </div>

//             <div class="col card">
//                 <div class="card-body">
//                     <div class="row">
//                         <span style="background: blue; color: white; width: 20px; height: 26px; margin-right: 20px;">4</span>
//                         Federação de Destino
//                     </div>
//                     <div class="row mt-2">
//                         <input type="text" name="" id="" value="Nome: " class="form-control">
//                     </div>
//                     <div class="row mt-2">
//                         <input type="text" name="" id="" value="Assinatura do Presidente: " class="form-control">
//                     </div>
//                 </div>
//             </div>

//         </div>
        
//         <div class="row mt-2">
//             <p style="margin-bottom: 6px;"><strong>Registro, Inscrição ou Renovação</strong>: Assinar campos 1 e 2 </p>
//             <p style="margin-bottom: 6px;"><strong>Transferência entre clubes da mesma federação</strong>: Assinar campos 1, 2 e 3</p>
//             <p style="margin-bottom: 6px;"><strong>Transferência entre clubes de federações diferentes</strong>: Assinar campos 1, 2, 3 e 4</p>
//             <p style="margin-bottom: 6px;"><strong>Cessão temporária entre clubes da mesma Federação</strong>: Assinar campos 1, 2 e 3</p>
//             <p style="margin-bottom: 6px;"><strong>Cessão temporária entre clubes de federações diferentes</strong>: Assinar campos 1, 2, 3 e 4</p>
//             <p style="margin-bottom: 6px;"><strong>Cancelamento de cessão temporária em uma federação</strong>: Assinar o campo 3</p>
//             <p style="margin-bottom: 6px;"><strong>Cancelamento de cessão temporária em uma federação diferente</strong>: Assinar campos 3 e 4</p>
//         </div>

//         <div class="row">
//             <div class="card">
//                 <div class="card-body">
//                     <p>Tempo de duração de <span class="blank_space" style="margin-left: 200px;"></span> De <span class="blank_space" style="margin-left: 200px;"></span> Até</p>
//                 </div>
//             </div>
//         </div>

//         <div class="row mt-2">
//             <div class="card">
//                 <div class="card-body">
//                     <div class="row">
//                         <p><strong>Autorização do responsável legal para menores de 18 anos:</strong> Esta autorização deve ser assinada pelo pai ou mãe, ou responsável legal</p>
//                         <p>Autorizo a inscrição acima solicitada.</p>
//                     </div>
//                     <div class="row">
//                         <div class="col">
//                             Nome: <hr>
//                         </div>
//                         <div class="col">
//                             Assinatura: <hr>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div class="row mt-2">
//             <div class="card">
//                 <div class="card-body">
//                     <div class="row">
//                         <div class="col-4">
//                             Data: <hr>
//                         </div>
//                         <div class="col-8">
//                             Assinatura do Atleta: <hr>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `
//     const html = `
//     <!DOCTYPE html>
// <html lang="pt-BR">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <meta name="author" content="Kervi Jhonata">
//     <link rel="shortcut icon" type="image/png" sizes="32x32" href="/img/logo.jpg">
//     <title>{{headTitle}} Associação Esportiva de Maranguape | Vôlei para Todos</title>
//     {{!-- CSS --}}
//     <link rel="stylesheet" href="/css/bootstrap.css">
//     <link rel="stylesheet" href="/css/style.css">

//     {{!-- Slick --}}
//     <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
//     <link rel="stylesheet" type="text/css" href="/slick/slick.css"/>
// </head>
// <body>
    
//     ${template}

//     <script src="/js/bootstrap.min.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
//     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
//     <script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
//     <script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>

//     <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    
//     <script src="/js/gerarPDF.js"></script>

//     <script type="text/javascript" src="/slick/slick.min.js"></script>
//     <script type="text/javascript" src="/js/carousel.js"></script>
// </body>
// </html>
//     `
//     doc = new jsPDF()
//     doc.fromHTML(html)
//     doc.save("pdfTeste.pdf")

    
// }