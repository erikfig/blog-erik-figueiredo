---
title: "Você está usando Node.js errado? Descubra o poder do Factory Method e mude sua vida!"
description: "Aprenda como aplicar o padrão Factory Method em Node.js para organizar seu código, evitar classes gigantes e facilitar a manutenção dos seus gateways de pagamento. Veja exemplos práticos e refatoração passo a passo."
date: 2025-05-23
tags: [nodejs, javascript, factory method, arquitetura, clean code]
layout: ../post.njk
image: https://blog.erikfigueiredo.com.br/assets/posts/voce-esta-usand-node-js-errado-descubra-o-poder-do-factory-method-e mude-sua-vida.png
---

<div class="cover-image">
  <img src="/assets/posts/voce-esta-usand-node-js-errado-descubra-o-poder-do-factory-method-e mude-sua-vida.png" alt="Capa do artigo: Como finalmente começar com TDD de forma não forçada" width="1200" height="400" loading="lazy" />
</div>

Já se sentiu como um malabarista tentando equilibrar vários métodos diferentes da sua classe no seu projeto Node.js? Cada método com suas próprias peculiaridades, APIs e integrações... Uma bagunça, né? 😵‍💫

Acredite, você não está sozinho! A maioria dos desenvolvedores começa do jeito "fácil": um monte de métodos, classes gigantescas e um código que mais parece um monstro de Frankenstein. Mas eu te pergunto: até quando você vai suportar essa ZONA? 😤

E se eu te dissesse que existe um jeito de transformar essa bagunça em um código limpo, organizado e... elegante? Sim, meus amigos, eu estou falando do poderoso Factory Method! ✨

Prepare-se para uma transformação épica! Neste artigo, vou pegar um código cheio de gambiarras e mostrar como o Factory Method pode te salvar dessa loucura. Você nunca mais vai olhar para seus gateways de pagamento da mesma forma! 😎

**Spoiler alert:** sua vida de dev nunca mais será a mesma! 🚀

### A classe problemática

Imagine que você tem a classe a seguir:

``` typescript
class Payment {
  async pagSeguro() {
    // Simulação de chamada assíncrona para PagSeguro
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'PagSeguro', status: 'success' });
      }, 500); // Simula um atraso de 500ms
    });
  }

  async paypal() {
    // Simulação de chamada assíncrona para PayPal
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'PayPal', status: 'pending' });
      }, 300); // Simula um atraso de 300ms
    });
  }

  async stripe() {
    // Simulação de chamada assíncrona para Stripe
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'Stripe', status: 'error' });
      }, 700); // Simula um atraso de 700ms
    });
  }

  async mercadoPago() {
    // Simulação de chamada assíncrona para Mercado Pago
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'Mercado Pago', status: 'success' });
      }, 400); // Simula um atraso de 400ms
    });
  }
}

// Exemplo de uso
const payment = new Payment();

payment.pagSeguro().then((data) => console.log(data));
payment.paypal().then((data) => console.log(data));
payment.stripe().then((data) => console.log(data));
payment.mercadoPago().then((data) => console.log(data));
```

Num primeiro momento, pode ser que você não veja problemas na implementação, mas os olhares mais experientes já notaram que a implementação real da classe pode ser um problema.

Imagine que cada método terá sua própria implementação de conexão com o gateway, com as suas próprias importações de classes, tipos e afins, essa classe facilmente terá algumas centenas, talvez milhares de linhas, aumentando muito cada novo gateway implementado.

Além desse problema óbvio de responsabilidade única, estamos quebrando o princípio de Open/Closed do SOLID.

Princípio Open/Closed diz que classes, módulos, funções e outras entidades de *software* devem ser abertas para expansão, mas fechadas para modificação.

### O que é Factory method


Factory method é um padrão de projeto criacional que usa define uma interface para criar objetos em uma superclasse, mas permitindo que as subclasses definam o objeto a ser criado.

Em termos não tão técnicos, teremos subclasses que seguem uma *interface*, a superclasse instancia a subclasse, que irá executar a sua implementação e retornar o resultado disso.

Refatorando o exemplo acima para o factory method, teríamos:


``` typescript
// Interface ou classe abstrata para gateways de pagamento
interface PaymentProvider {
  processPayment(): Promise<any>;
}

// Classes concretas para cada gateway de pagamento (as subclasses)
// Note que TODAS DEVEM implementar a interface PaymentProvider
class PagSeguroPayment implements PaymentProvider {
  async processPayment(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'PagSeguro', status: 'success' });
      }, 500);
    });
  }
}

class PaypalPayment implements PaymentProvider {
  async processPayment(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'PayPal', status: 'pending' });
      }, 300);
    });
  }
}

class StripePayment implements PaymentProvider {
  async processPayment(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'Stripe', status: 'error' });
      }, 700);
    });
  }
}

class MercadoPagoPayment implements PaymentProvider {
  async processPayment(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'Mercado Pago', status: 'success' });
      }, 400);
    });
  }
}

// Classe Factory Method (a superclasse)
class PaymentFactory {
  createPayment(gateway: string): PaymentProvider {
    switch (provider) {
      case 'pagSeguro':
        return new PagSeguroPayment();
      case 'paypal':
        return new PaypalPayment();
      case 'stripe':
        return new StripePayment();
      case 'mercadoPago':
        return new MercadoPagoPayment();
      default:
        throw new Error('Provedor de pagamento inválido.');
    }
  }
}

// Exemplo de uso
const paymentFactory = new PaymentFactory();

paymentFactory.createPayment('pagSeguro').processPayment().then((data) => console.log(data));
paymentFactory.createPayment('paypal').processPayment().then((data) => console.log(data));
paymentFactory.createPayment('stripe').processPayment().then((data) => console.log(data));
paymentFactory.createPayment('mercadoPago').processPayment().then((data) => console.log(data));
```

Com isso já temos classes diferentes para cada gateway de pagamento e isso já resolve o problema principal, agora cada gateway tem a sua classe e pode ficar num arquivo separado e mais fácil de manter, já que a interface define até o que deve ser retornado.

Eu ainda melhoria um pouco alterando o tipo do retorno da interface:

``` typescript
interface PaymentResult {
  provider: string;
  status: 'success' | 'pending' | 'error';
}

interface PaymentProvider {
  processPayment(): Promise<PaymentResult>;
}

// Classes concretas para cada gateway de pagamento (as subclasses)
// Note que TODAS DEVEM implementar a interface PaymentProvider
class PagSeguroPayment implements PaymentProvider {
  async processPayment(): Promise<PaymentResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'PagSeguro', status: 'success' });
      }, 500);
    });
  }
}

class PaypalPayment implements PaymentProvider {
  async processPayment(): Promise<PaymentResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'PayPal', status: 'pending' });
      }, 300);
    });
  }
}

class StripePayment implements PaymentProvider {
  async processPayment(): Promise<PaymentResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'Stripe', status: 'error' });
      }, 700);
    });
  }
}

class MercadoPagoPayment implements PaymentProvider {
  async processPayment(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'Mercado Pago', status: 'success' });
      }, 400);
    });
  }
}

// Classe Factory Method (a superclasse)
class PaymentFactory {
  createPayment(gateway: string): PaymentProvider {
    switch (provider) {
      case 'pagSeguro':
        return new PagSeguroPayment();
      case 'paypal':
        return new PaypalPayment();
      case 'stripe':
        return new StripePayment();
      case 'mercadoPago':
        return new MercadoPagoPayment();
      default:
        throw new Error('Provedor de pagamento inválido.');
    }
  }
}

// Exemplo de uso
const paymentFactory = new PaymentFactory();

paymentFactory.createPayment('pagSeguro').processPayment().then((data: PaymentResult) => console.log(data));
paymentFactory.createPayment('paypal').processPayment().then((data: PaymentResult) => console.log(data));
paymentFactory.createPayment('stripe').processPayment().then((data: PaymentResult) => console.log(data));
paymentFactory.createPayment('mercadoPago').processPayment().then((data: PaymentResult) => console.log(data));
``````

E essa injeção de dependências? Não existe?

Em alguns padrões de projeto vemos este tipo de abordagem em que as classes são instanciadas dentro da superclasse, sem injeção externa da dependência, não há uma resposta única que determine que não injetar as classes seja sempre um "erro". Ambas as abordagens têm as suas vantagens e desvantagens, vale falar mais sobre isso em outro momento ou nos comentários.

Mas se você se incomodou, QUE ÓTIMO, sempre da para melhorar.

No contexto do factory method, uma injeção de dependências mais atrapalharia do que ajudaria, adicionando uma camada extra de complexidade com a qual não precisamos lidar, mas eu ficaria muito mais confortável se a minha factory seguisse a ideia que já apresentei do Open/Closed Principle, por isso criei um objeto de registro das classes, que eu posso atualizar "de fora" da factory e nunca precisar abrir ela para expandir as suas funcionalidades.

``` typescript

// Aqui eu registro minhas classes
export const classMap = {
  pagSeguro: PagSeguroPayment,
  paypal: PaypalPayment,
  stripe: StripePayment,
  mercadoPago: MercadoPagoPayment,
}

// Classe Factory Method mais dinâmica
class PaymentFactory {
  createPayment(provider: keyof typeof classMap): PaymentProvider {
	return new classMap[provider]()
  }
}

```

Agora eu posso fazer todo o processo de incluir um novo gateway de pagamento sem alterar qualquer classe existente, pra isso eu preciso:

1. Criar a classe implementando a *interface* PaymentProvider
2. Registrar no classMap utilizando o padrão `stringParaOParametroProviderDoMetodoCreatePayment`:  MinhaClasse

Código final:

``` typescript
interface PaymentResult {
  provider: string;
  status: 'success' | 'pending' | 'error';
}

interface PaymentProvider {
  processPayment(): Promise<PaymentResult>;
}

// Classes concretas para cada gateway de pagamento (as subclasses)
// Note que TODAS DEVEM implementar a interface PaymentProvider
class PagSeguroPayment implements PaymentProvider {
  async processPayment(): Promise<PaymentResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'PagSeguro', status: 'success' });
      }, 500);
    });
  }
}

class PaypalPayment implements PaymentProvider {
  async processPayment(): Promise<PaymentResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'PayPal', status: 'pending' });
      }, 300);
    });
  }
}

class StripePayment implements PaymentProvider {
  async processPayment(): Promise<PaymentResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'Stripe', status: 'error' });
      }, 700);
    });
  }
}

class MercadoPagoPayment implements PaymentProvider {
  async processPayment(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ provider: 'Mercado Pago', status: 'success' });
      }, 400);
    });
  }
}

// Aqui eu registro minhas classes
export const classMap = {
  pagSeguro: PagSeguroPayment,
  paypal: PaypalPayment,
  stripe: StripePayment,
  mercadoPago: MercadoPagoPayment,
}


// Classe Factory Method mais dinâmica
class PaymentFactory {
  createPayment(provider: keyof typeof classMap): PaymentProvider {
	return new classMap[provider]()
  }
}

// Exemplo de uso
const paymentFactory = new PaymentFactory();

paymentFactory.createPayment('pagSeguro').processPayment().then((data: PaymentResult) => console.log(data));
paymentFactory.createPayment('paypal').processPayment().then((data: PaymentResult) => console.log(data));
paymentFactory.createPayment('stripe').processPayment().then((data: PaymentResult) => console.log(data));
paymentFactory.createPayment('mercadoPago').processPayment().then((data: PaymentResult) => console.log(data));
```

O resultado é tão interessante que você pode manter como exemplo acima (assíncrono) ou rodar de forma síncrona: 

``` typescript
const init = async () => {
  const paymentFactory = new PaymentFactory();

  let data1 = await paymentFactory.createPayment('pagSeguro').processPayment();
  console.log(data1);

  let data2 = await paymentFactory.createPayment('paypal').processPayment();
  console.log(data2);

  let data3 = await paymentFactory.createPayment('stripe').processPayment();
  console.log(data3);

  let data4 = await paymentFactory.createPayment('mercadoPago').processPayment();
  console.log(data4);

}

init();
```

E os resultados podem ser vistos acompanhando a ordem em que os logs disparam:

``` bash
➜  factory-method node_modules/.bin/ts-node teste.ts
{ provider: 'PayPal', status: 'pending' }
{ provider: 'Mercado Pago', status: 'success' }
{ provider: 'PagSeguro', status: 'success' }
{ provider: 'Stripe', status: 'error' }
➜  factory-method node_modules/.bin/ts-node teste.ts
{ provider: 'PagSeguro', status: 'success' }
{ provider: 'PayPal', status: 'pending' }
{ provider: 'Stripe', status: 'error' }
{ provider: 'Mercado Pago', status: 'success' }
➜  factory-method 
```

Na primeira execução utilizamos o exemplo assíncrono e o segundo de forma síncrona.

A diferença é que de forma assíncrona todos são executados ao mesmo tempo, e a ordem de retorno do *log* é por "quem é mais rápido", por isso o PayPal é o primeiro a retornar.

No resultado síncrono, os métodos são executados um após o outro, aguardando o anterior finalizar antes de seguir para o próximo, por isso a ordem é a de execução, por isso o PagSeguro é o primeiro e retornar.

### Ainda da para melhorar mais

Sim! Se você aliar o Factory Method a um Proxy, vamos conseguir voltar ao formato de execução inicial, fazendo com que cada subclasse seja utilizada como um método da classe Factory, assim:

``` typescript
const payment = new Payment();

payment.pagSeguro().then((data) => console.log(data));
payment.paypal().then((data) => console.log(data));
payment.stripe().then((data) => console.log(data));
payment.mercadoPago().then((data) => console.log(data));
```

Na utilização parece ser uma única classe, mas por baixo dos panos estamos chamando as subclasses em vez de métodos, "is magic".

Mas isso é só um gostinho do que vamos falar no próximo artigo, dependendo do desempenho desse.