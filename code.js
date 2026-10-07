const pessoas = []; //cria a lista com todas as pessoas

function main() {
   submitForm();
};

function submitForm() {
   const formulario = document.querySelector('form');

   formulario.addEventListener('submit', function(e) {
      e.preventDefault();

      const inputNome = document.getElementById("nome");
      const inputAltura = document.getElementById("altura");
      const inputMassa = document.getElementById("massa");

      const nome = inputNome.value;
      const altura = parseFloat(inputAltura.value);
      const massa = parseFloat(inputMassa.value);

      if (!nome || isNaN(altura) || isNaN(massa) || altura <= 0 || altura >= 2.7 || massa <= 0 || massa >= 300) {
         alert("Digite apenas dados válidos em todos os campos!");
         return;
      };

      const imc = calculateImc(massa, altura);
      const status = classificarIMC(imc);

         const novaPessoa = {
         nome: nome,
         altura: altura,
         massa: massa,
         imc: imc,
         status: status
      };

      pessoas.push(novaPessoa);

      renderizarTabela();

      formulario.reset();
      inputNome.focus();
   });
};

function renderizarTabela() {
   const tabelaBody = document.querySelector('.tabela table tbody');
   
   tabelaBody.innerHTML = '';

   pessoas.forEach(function(pessoa, index) {
      const novaLinha = document.createElement('tr');

      novaLinha.innerHTML = `
         <td>${pessoa.nome}</td>
         <td>${pessoa.altura.toFixed(2)}m</td>
         <td>${pessoa.massa.toFixed(2)}kg</td>
         <td>${pessoa.imc}</td>
         <td>${pessoa.status}</td>
         <td>
            <button type="button" onclick="alterarPesoPorIndice(${index}, 0.25)">+0.25kg</button>
            <button type="button" onclick="alterarPesoPorIndice(${index}, -0.25)">-0.25kg</button>
            <button type="button" onclick="removerPorIndice(${index})">Excluir</button>
         </td>
      `;

      tabelaBody.appendChild(novaLinha);
   });
};


function removerPorIndice(index) {
   pessoas.splice(index, 1);
   
   renderizarTabela();
};

function alterarPesoPorIndice(index, valor) {
   const pessoa = pessoas[index];

   if (pessoa.massa + valor <= 0) {
      alert("A massa não pode ser menor ou igual a zero!");
      return;
   };

   pessoa.massa += valor;
   pessoa.imc = calculateImc(pessoa.massa, pessoa.altura);
   pessoa.status = classificarIMC(pessoa.imc);

   renderizarTabela();
};

function classificarIMC(imc) {
   if (imc < 18.5) return "Abaixo do Peso.";
   if (imc < 25) return "Peso Normal.";
   if (imc < 30) return "Sobrepeso.";
   return "Obesidade.";
};

let ordenacaoAtual = {
   coluna: null,    // Guardará a propriedade (ex: 'nome', 'imc', 'massa')
   direcao: 'asc'   // 'asc' (crescente) ou 'desc' (decrescente)
};

function calculateImc(massa, altura){
   return parseFloat((massa / (altura * altura)).toFixed(2));
};

main();