# PicPay Simplificado

## Descrição

O **PicPay Simplificado** é uma plataforma de pagamentos projetada para facilitar depósitos e transferências de dinheiro entre usuários. A plataforma suporta dois tipos de usuários: **usuários comuns** e **lojistas**. Ambos os tipos possuem carteiras digitais que permitem a realização de transações financeiras.

## Funcionalidades Principais

- Cadastro de usuários com validações únicas para CPF/CNPJ e e-mails.
- Transferências de dinheiro entre usuários comuns e de usuários comuns para lojistas.
- Validação de saldo disponível antes de efetuar transferências.
- Consultas a um serviço externo de autorização para validar transferências.
- Operações de transferência realizadas como transações atômicas, garantindo reversão em caso de inconsistências.
- Notificações automáticas de recebimento enviadas via serviços de terceiros.

## Requisitos Técnicos

- O serviço deve ser RESTful.

## Regras de Negócio

### Cadastro de Usuários

- Para ambos os tipos de usuários, as informações obrigatórias são:
  - Nome completo
  - CPF ou CNPJ (único no sistema)
  - E-mail (único no sistema)
  - Senha

### Transferências

- **Usuários comuns**:
  - Podem enviar e receber transferências.
- **Lojistas**:
  - Apenas recebem transferências; não podem enviar dinheiro.

### Validações Necessárias

1. Verificação de saldo disponível antes da transferência.
2. Consulta ao serviço autorizador externo utilizando o seguinte endpoint:
   - **URL**: [https://util.devi.tools/api/v2/authorize](https://util.devi.tools/api/v2/authorize)
   - **Método**: `GET`

### Notificações

- Após o recebimento de um pagamento, o usuário ou lojista deve ser notificado.
- Utilize o seguinte serviço para envio de notificações:
  - **URL**: [https://util.devi.tools/api/v1/notify](https://util.devi.tools/api/v1/notify)
  - **Método**: `POST`
- Considere que o serviço de notificação pode apresentar instabilidade ou indisponibilidade.

### Operações de Transferência

- A operação deve ser realizada de forma transacional.
- Em caso de falha, o dinheiro deve ser revertido para a carteira do usuário que iniciou a transferência.

## Contrato do Endpoint de Transferência

O fluxo de transferência entre dois usuários deve seguir o contrato abaixo:

```http
POST /transfer
Content-Type: application/json

{
  "value": 100.0,
  "payer": 4,
  "payee": 15
}
```
