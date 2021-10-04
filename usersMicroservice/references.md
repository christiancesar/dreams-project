# Microservice Users

## References
* Mensagem chega neste padrão, desta forma não seria necessario criar topicos para todos os tipos de ações do consumir e nem responder a API;

```ts
//Consumer
message: [ 
  {
    action: ["create", "delete", "update", "list", "find", "rollback"],
    to: "dreams",
    from: "microservice-users",
    timestamp:"1633306277",
    data: [
      {
        id: "c5f5e991-8314-4a20-b4ea-b1f286259231",
        firstName: "Christian",
        lastName: "Cesar",
        age: 23,
        birthday: "1997-11-01",
        email: "christian.cesar@copyrights.tech"
      }
    ]
  }
]
```
```ts
//Producer
message: [ 
  {
    action: ["created", "deleted", "updated", "listed", "found","failed", "rollback:sucess", "rollback:failed"],
    data: [
      {
        firstName: "Christian",
        lastName: "Cesar",
        age: 23,
        birthday: "1997-11-01",
        email: "christian.cesar@copyrights.tech"
      }
    ]
  }
]
```

* Qual arquitetura de pasta usar? 
    + O Consumer e Producer seria nosso Controller
    + As ações seriam nossos Services
    + As configurações base do kafka seria nosso Provider

     