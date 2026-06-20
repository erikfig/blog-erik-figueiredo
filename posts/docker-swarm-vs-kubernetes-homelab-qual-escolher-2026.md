---
title: "Docker Swarm vs Kubernetes no homelab: qual escolher em 2026"
description: "Docker Swarm ou Kubernetes pra rodar tua stack em casa em 2026? Comparativo prático de complexidade, recursos e manutenção pra homelabber escolher sem se arrepender."
date: 2026-06-19
tags: [docker swarm, kubernetes, homelab, devops, self-hosted]
layout: ../post.njk
image: https://blog.erikfigueiredo.com.br/assets/posts/docker-swarm-vs-kubernetes-homelab-qual-escolher-2026.png
---

Um projeto que tenho trabalhado com muito afinco nos últimos tempos é na construção do meu homelab, ainda sonho com um setup elaborado, capaz de rodar uma llm forte e ter acesso e muito espaço em disco e uma GPU poderosa pra todo o tipo de processamento, mas o que tenho hoje já é bem interessante pra mim, mas claro, estou devagando.

O grande ponto aqui é porque eu tomei a INSANA decisão de escolher o Swarm ao Kubernetes.

## O que é o Docker Swarm

O Docker Swarm é uma ferramenta nativa do Docker focada em orquestração de containeres, agrupando multiplos servidores (físicos ou virtuais) em um cluster distribuído.

Na prática, ele gerencia os seus containeres, replica em um ou vários servidores e mantém um serviço no ar mesmo se o serviço crashar e cair, subindo de novo.

A maior vantagem dele é ja vir junto do Docker nativamente (dispensando instalações externas) e você poder usar seu próprio docker-compose.yml para configurá-lo, já que as configs adicionais do yaml apenas são ignoradas pelo  Docker Compose.

A desvantagem óbvia é que ele é demasiadamente simples perto do poder do K8S e isso somando ao fato do investimento que a própria Docker faz no Kubernetes ao invés de apostar na ferramenta nativa o torna o irmão menor que ninguém quer brincar.

Mas não subestimem o Swarm, ele tem seu valor.

## O que é Kubernetes

O Kubernetes (ou K8s - o 8 são as 8 letras entre K e s *ubernete*) é o CARA! Assim como o Swarm, ele gerencia multiplos servidores, orquestra os containeres para melhor aproveitamento dos recursos do servidor, e mantendo os pods (seus serviços em containeres) saúdaveis (disponíveis).

Na prática, ele é claramente superior ao Swarm, tem autoscaling real, extensibilidade maior, storage avançado, rede e segurança MUITO superiores, observabilidade e scheduling... tudo é superior! Não tem o que discutir. Além de ser open-source e ter uma comunidade MUITO maior. Fato! É superior e PRONTO!

Claro que tudo isso tem um preço e a desvantagem óbvia é que ele é mais pesado, mais complexo de usar e... desnecessário!

Não num contexto geral, desnecessário no meu contexto... Eu usaria ele simplesmente para o que já uso o Swarm, manter meus containeres UP e distribuidos entre os diferentes nós (cada servidor é um nó).

## O Docker Swarm está morrendo?

Pra começar, vale relembrar do Docker Swarm original, que realmente foi descontinuado lá em meados de 2015. Esse cara morreu mesmo, ele era uma ferramenta a parte do Docker. Em seu lugar surgiu o Swarm mode que usamos hoje, parte do Docker principal.

Quando te disserem que o Swarm morreu, bem... não estão inteiramente errados ou mentindo, esse "Docker standalone" realmente morreu!

Em 2017 a Mirantis comprou a Docker Enterprise e anuncinou que o Kubernetes seria o orquestrador principal daqui pra frente, eu não lembro bem se existiu um anúncio real ou se foi "hype da comunidade", mas a conversa que rolava na internet é que o Swarm morreria em 2 anos e o K8s era o caminho, muita gente "abondonou o barco" e foi pro K8s definitivamente, inclusive este que vos escreve!

O que eu lembro bem foi que em 2020 a Mirantis anunciou que o suporte ao Swarm continuaria e que, em levantamento deles, existiam MUITOS servidores rodando o Swarm, que novos recursos chegariam com o tempo, além de manutenção e correção de segurança.

Muita gente usava o Swarm e o Kubernetes em conjunto, o primeiro em clusters pequenos e simples (já que, como bem sabemos, ser pequeno é MUITO diferente de ser simples, minha esposa que o diga).

A Mirantis anunciou em 2025 que o suporte ao Swarm vai se estender por mais 5 anos (2030) e garantiu que a orquestração simplificada dele tenha um novo respiro.

Além disso, ele recebeu suporte a CSI (Container Storage Interface), constraints de recursos e outros itens de roadmap, tirando o Swarm do limbo de "só manutenção".

O ponto mais forte de todos é que a própria comunidade em volta dos orquestradores de containeres vem discutindo a real vantagem do K8s, que a única features real que ele tem sobre o Swarm é o autoscaling e que o resto só é mais parrudo e isso ainda cobra o preço em cima da performance (não necessariamente concordo com tudo, tá...).

Minha opinião real é que eu acho que o K8s é mais poderoso que o Swarm sim e tudo bem, não faz o Swarm menos necessário no contexto geral, ele é uma forma SIMPLES de orquestrar containeres... as vezes é só o que precisamos.

Eu trabalho com PHP desde 2 mil e não quero falar quanto... e desde o primeiro dia dizem que ele vai morrer, de verdade, não acredito nisso de que é fácil de matar uma tecnologia. Vida longa ao Swarm!

## Porque escolhi o Swarm no meu cluster?

Se fosse pra resumir tudo em uma palavra? Eu diria SIMPLICIDADE!

O Docker Swarm é simples de usar, tem uma curva de aprendizado menor, menos problemas pra lidar e já estava disponível.

Eu tomei a decisão conciente de montar um cluster de Raspberry PIs 5 8gb (Raspberrie PIs, Raspberrys PIs... como é o plural disso?), queria baixo custo de energia e lidar com ARM, mas dai é assunto pra outro dia... o fato é que eles não são lá muito fortes e eu só tenho 2 (depois que comprie o preço disparou).

Somando esse cenário eu comecei a escrever os arquivos de configuração para o K3s...

Pera... K3s? Daonde isso apareceu?

É... além do K8s (Kubernetes) temos o K3s, ele é o irmão do meio e uma opção sólida ao Kubernetes.

O K3s é o Kubernetes da Rancher/SUSE e uma excelente opção ao Swarm, tem bom suporte a ARM, é só componentes e runtime do K8s, bem leve mesmo.

> Inclusive o nome K8s é uma brincadeira com ele ser metade do K8s (5 lestras a menos).

Ele ocupa o mesmo lugar do Swarm (eu considero um concorrente real, o K8s não concorre com o Swarm, são para fins distintos), mesmo que o Swarm ainda consuma MUITOS menos que o K3s (convenhamos, o Swam sai de graça rodando em cima do Docker, não da pra competir).

Então eu pensei muito, e se meu homelab crescer? Talvez um servidor parrudo de verdade... migrar do Swarm pro Kubernetes é uma coisa extremamente chata de fazer ("Claude, migra meus serviços do swarm pro k8s e não cometa erros"), o K3s tem a mesma API, e isso quer dizer ZERO reescrita de arquivos de configuração. É um ponto válido!

No fim eu fui pela simplicidade do Swarm, menos coisas pra escrever, mais simples de gerar um template pra IA alterar depois e ainda tem a realidade da minha vida

 - Meu trabalho
 - Subir serviços rápidamente no homelab (ainda vou recomendar alguns serviços self-hosted aqui)
 - Criar meus projetinhos do zero
 - Família
 
Quanto menos eu tiver que escrever ou me preocupar MELHOR, o Kubernetes é bem verboso, o Swarm tem meia duzia de opções a mais (e opcionais) no Docker Compose e ainda tem o gancho: Swarm já está lá, ele vem com o Docker.

Com esse pensamento o Swarm ficou obvio, eu já vou escrever o docker-compose.yml pra testar tudo antes do deploy, então porque não aproveitar isso num primeiro momento e depois eu migro.

Nada como uma promessa de melhoria futura ou uma gambiarra temporária... não que o Swarm seja gambiarra, não foi o que eu quis dizer.

No fim eu fiquei com o Swarm mesmo, tenho um cluster com (atualmente) pouco mais de 50 services rodando com MUITA coisa que eu preciso.

Para o futuro, não sei se escapo, o Swarm caminha de vagar, meio-morto e meio-vivo (um vampiro praticamente), o K3s vai vir em algum tempo, provavelmente, mas não vou matar a tecnologia ANTES da hora.

## A estrada até aqui

"Carry on, my wayward son
There'll be peace when you are done
Lay your weary head to rest
Don't you cry no more"

A verdade é que eu sou zero desapego com "modinha", tanto que nem sei se o que é modinha atualmente, mas com foco REAL no que eu preciso:

 - Preciso distribuir meus serviços entre 2 PI5
 - Não preciso gastar alguns megas a mais pra fazer isso
 - Não preciso da complexidade das configurações o Kubernetes
 - Não preciso dos recursos adicionais do Kubernetes

Pra que usar algo que traz recursos que eu NÃO PRECISO e me cobra por isso em desempenho? Não faz sentido, mesmo que ele morra em 5 anos... nem sei se os Raspberrys duram tanto... não sei nem se eu duro.

Se o foco fosse currículo, certeza que eu ia de K3s.

E isso fecha minha análise sobre porque eu decidi pelo Swarm ao K8S... vamos de um tutorialzinho pra colocar um serviço UP em ambos os orquestradores?

## Como subir um serviço no Swarm e no Kubernetes

Chega de papo, bora pôr a mão na massa. A ideia aqui é a mais simples possível: subir um "Olá, mundo!" nos dois orquestradores e sentir na prática a diferença de cerimônia entre eles.

Não vou abordar instalação, primeiro que eu confio na sua capacidade, segundo que o Swarm ja deve estar instalado ai, né?

Primeiro a gente cria um app bem bobo só pra ter o que subir:

```js
// app.js
require("http").createServer((_, res) => res.end("Olá, mundo!")).listen(3000);
```

Um servidor HTTP que responde na porta 3000 e olhe lá. Agora o Dockerfile pra empacotar isso numa imagem:

```dockerfile
# Dockerfile
FROM node:alpine
COPY app.js .
CMD ["node", "app.js"]
```

E construímos a imagem. Esse passo é comum aos dois orquestradores, então faz uma vez só:

```bash
docker build -t hello-node .
```

Pronto, agora temos uma imagem `hello-node` na engine do Docker. É a partir daqui que os caminhos se separam.

## Subindo no Swarm

O arquivo de configuração do Swarm eu vou chamar de `stack.yml`, por convenção:

```yaml
version: "3.8"
services:
  hello:
    image: hello-node
    ports:
      - "3000:3000"
```

Se isso te parece um `docker-compose.yml`, é porque é EXATAMENTE isso. É o mesmo arquivo que você já escreveria pra testar localmente, e esse é o pulo do gato do Swarm que eu tanto falei lá em cima.

Pra subir são dois comandos:

```bash
docker swarm init                      # só na 1ª vez, ativa o modo swarm
docker stack deploy -c stack.yml hello
```

O `docker swarm init` você roda uma vez só, é o que liga o modo swarm na máquina. O `stack deploy` é o que de fato sobe o serviço.

Isso quer dizer que agora pra subir outros serviços, o swarm init não é mais necessário.

E... acabou. Acessa em `http://localhost:3000` e tá lá o "Olá, mundo!". Dois comandos úteis pra acompanhar:

```bash
docker stack services hello   # ver o status dos serviços
docker stack rm hello         # derrubar tudo
```

Repara num detalhe: a imagem `hello-node` "simplesmente estava lá". Construí com o Docker, subi com o Docker, mesma engine. Guarda essa observação, porque já já ela faz diferença.

## Subindo no Kubernetes (k3s)

Aqui o arquivo eu vou chamar de `hello.yaml`. E olha só o tamanho da diferença:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello
spec:
  selector:
    matchLabels:
      app: hello
  template:
    metadata:
      labels:
        app: hello
    spec:
      containers:
        - name: hello
          image: hello-node
---
apiVersion: v1
kind: Service
metadata:
  name: hello
spec:
  type: NodePort
  selector:
    app: hello
  ports:
    - port: 3000
      targetPort: 3000
```

Onde no Swarm eram 6 linhas, aqui são umas 30. É a mesma intenção — uma imagem, uma porta exposta — mas o Kubernetes te faz declarar separadamente um Deployment (quem gerencia os pods) e um Service (quem expõe a rede). Mais verboso, mais explícito, mais cerimônia.

Pra subir:

```bash
sudo k3s ctr images import <(docker save hello-node)   # leva a imagem local pro containerd do k3s
kubectl apply -f hello.yaml
```

E é aqui que aparece aquela fricção que eu comentei lá atrás. Olha a primeira linha: por que diabos eu preciso "importar" a imagem?

Porque o k3s não usa a engine do Docker, ele usa o containerd dele. Então aquela imagem `hello-node` que eu construí com o `docker build` não "existe" pro cluster — ela tá na engine do Docker, não no containerd do k3s. Se eu pular esse passo, o pod fica eternamente em `ErrImagePull`, tentando baixar uma imagem que tá ali do lado mas que ele não enxerga.

No Swarm isso não acontece porque é a mesma engine que constrói e que orquestra. No k3s eu tenho um passo a mais só pra transportar a imagem de um runtime pro outro. (Em produção "de verdade" você resolve isso subindo um registry, mas aí já é mais uma camada de coisa pra cuidar.)

Pra acessar e acompanhar:

```bash
kubectl get svc hello          # mostra a porta NodePort sorteada, algo como 3000:31xxx
kubectl get pods               # status dos pods
kubectl delete -f hello.yaml   # derrubar
```

O `get svc` te mostra a porta que o NodePort sorteou (um número alto, tipo `31xxx`), e é nela que você acessa: `http://localhost:31xxx`. Nem a porta vem redondinha como no Swarm.

## O veredito da preguiça

Põe os dois lado a lado e o contraste fica gritante:

- **Swarm:** escreve um compose de 6 linhas, `build`, `deploy`. A imagem local simplesmente está lá. Acaba.
- **k3s:** escreve um manifesto de 30 linhas dividido em Deployment + Service, `build`, importa a imagem entre runtimes, `apply`, e ainda descobre qual porta foi sorteada.

Mesmíssimo "Olá, mundo!". Mesmíssimo resultado. E o k8s custou mais arquivo pra escrever, mais um runtime pra entender e mais uma etapa de cerimônia.

Pra um cluster de dois Raspberry Pi rodando os serviços da minha casa? A escolha se escreve sozinha. E é por isso, no fim das contas, que eu fiquei com o Swarm.

Não é preguiça e não é o K3s, K8s, Kubernetes (ou como você queira chamar) que é pior ou melhor, é o caminho que você quer trilhar, quer chegar onde? Por qual motivo?

Vai crescer? Quer aprender K8s? Precisa de uma feature que o Swarm não tem? -> Kubernetes.

Que simplificidade? Ta entrando agora no mundo da orquestração de containeres? -> Vai de Swarm.

E boa sorte no seu caminho.
