---
title: "Como FINALMENTE começar com TDD de forma NÃO forçada"
description: "Descubra, sem fórmulas mágicas, como adotar TDD de forma natural e produtiva no seu dia a dia de desenvolvimento. Experiências reais, dicas e reflexões para quem quer testar de verdade."
date: 2025-05-23
tags: [tdd, testes, produtividade, carreira, clean code]
layout: ../post.njk
image: https://blog.erikfigueiredo.com.br/assets/posts/como-finalmente-comecar-com-tdd-de-forma-nao-forcada.png
---

<div class="cover-image">
  <img src="/assets/posts/como-finalmente-comecar-com-tdd-de-forma-nao-forcada.png" alt="Capa do artigo: Como finalmente começar com TDD de forma não forçada" width="1200" height="400" loading="lazy" />
</div>

>Este artigo NÃO É UM TUTORIAL - vou compartilhar as minhas experiências com TDD com a intenção de te mostrar um caminho mais óbvio para trabalhar com testes

Sabe porque eu demorei TANTO tempo para usar TDD depois que aprendi? Porque eu sabia o que era e como fazia, mas não sabia pra que servia "de verdade".

Estranho, né?

> TDD é bom, confia! - Ciano do Among US

### O que é TDD

Para nivelarmos a conversa vou explicar o que é TDD, se você já sabe, parabéns e pule este tópico.

TDD é o acrónimo de Test Driven Development ou, como chamamos aqui em terras tupiniquins, Desenvolvimento Orientado a Testes.

Na prática, apenas escrevemos o código com base em um teste pré-estabelecido, isso quer dizer que criamos uma classe de teste que "usa" a classe que você está desenvolvendo e tentamos cobrir TODAS as possibilidades enquanto isolamos completamente o que queremos testar para evitar efeitos colaterais*.

> \* Para isolar a classe precisamos criar cópias com métodos e retornos controlados das OUTRAS classes que precisamos para a principal funcionar, isso se chama mock.

TDD tem 3 estágios.

 - Red: O teste é criado e falha, já que o código testado ainda não existe
 - Green: O teste passa, normalmente da forma mais simples possível.
 - Refactor: Aqui revemos o código e alteramos com possíveis melhorias ou até mesmo para implantar outras features/cenários, este último passo pode se repetir quantas vezes forem necessárias.

Um ponto importante que devemos ressaltar é que TDD é uma prática para teste automatizado e não teste unitário, pode existir TDD sem teste unitário (teste comportamental, por exemplo).

### Como se faz TDD

Para expandir este  artigo e evitar ser repetitivo (acho que já fui no tópico anterior), leia este artigo do [Eduardo Figueiredo](https://dev.to/eduardofg87) - "nice lastname, Edu":

[TDD: Iniciando com TDD no PHP](https://dev.to/phpbrasil/tdd-iniciando-com-tdd-no-php-47nb)

### Pra que serve TDD

O tópico principal!!!

TDD serve para que o desenvolvimento possa ser mantido em um ritmo saudável enquanto garantimos que as features anteriores estão funcionando da forma esperada.

Pode parecer muito, mas MUITO besta pra você, mas minha mente limitada só conseguiu entender como usar o TDD de forma produtiva quando refletiu sobre o "para que serve o TDD"*.

> \* Por isso resolvi escrever este artigo.

O método de desenvolver testando no nevagador é MUITO prático e largamente utilizado, mas tem um problema que cresce com o tamanho do projeto (linhas de código). Em algum momento vamos precisar voltar e testar partes do projeto que já "estavam prontos" e isso escala em complexidade e quantidade de testes.

Uma alteração em um evento ou middleware (se quiser saber mais sobre as [camadas de um projeto PHP leia este artigo](https://blog.erikfigueiredo.com.br/serie-php-sem-frameworks/) que escrevi pode fazer com que várias partes de um projeto sejam afetadas, os testes garantem que estas mesmas partes possam ser testadas novamente e dar um feedback de sucesso ou falha em pouco tempo, de forma automatizada.

Isso garante que algum lugar que você nem imaginou (ou lembrou) vá apresentar algum bug por conta destas alterações (isso também deixa claro o motivo de testes unitários não serem suficientes).

### Exemplos práticos

Eu tenho dois exemplos em que o TDD ajudou muito em tarefas que seriam complicadas de mais.

#### Refatoração ENORME de um projeto "mais enorme" ainda

Eu tenho um projeto em andamento desenvolvido em Laravel e modularizado, já estávamos em 21 módulos e mais de 1500 classes escritas e aconteceu de precisarmos reduzir estes módulos para apenas 10 (de 21 para 10).

Embora esteja tudo MUITO organizado em módulos e excelentes boas práticas, realizar as alterações de namespace e dependências do Composer demandaria MUITO teste da minha parte, o que iria inviabilizar a tarefa e provavelmente esta melhoria NUNCA seria realizada.

A tarefa foi realizada e entregue em um prazo de menos de 10 dias, contando os testes do QA (que eram manuais), e vale ressaltar que eu não fiz qualquer hora extra.

A cada módulo que eu refatorava executava um total de 850 testes em aproximadamente 10 minutos, o que garantiu que a tarefa chegasse sem erros na fase de testes.

#### Desenvolvimento de um SDK para Facebook Bot API

Esse aqui foi um SDK (um pacote para acessar uma API - "tradução" do termo MUITO resumida) para acessar a API de BOT do Facebook.

A verdade é que eu não teria uma página servida na internet, pensei em criar um arquivo PHP para executar os testes de desenvolvimento e saber se estava correto, mas descartei essa possibilidade em segundos.

Instalei o PHPUnit e integrei na IDE*, eu escrevia o teste e a classe e teclava um atalho (F5, eu acho) e os testes eram TODOS executados, não dava pra ser mais prático.

> \* Na época eu usava o PHPStorm, mas acho que pode ser feito em qualquer IDE, VSCode eu tenho certeza que rola.

Se eu fosse fazer o mesmo no navegador ia ficar reescrevendo o arquivo PHP e talvez teria que usar `ctrl+z` para voltar aos testes anteriores, o que é BEM menos eficiente.

Eu escrevo um teste para uma situação e ela está pronta, é só partir pra outro.

Terminei o SDK bem rápido e duas vezes eu encontrei erros que seriam pegos somente no teste final (por outra pessoa - talvez o cliente) e depois precisei fazer uma refatoração na classe que fazia a requisição no Facebook e quebrei outros 8 cenários de teste, eu estava com pressa (o que já é um erro) e provavelmente não teria visto os erros.

### Conclusão

E você tem algum caso real em que TDD te salvou?