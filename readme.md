
<p align="center">
  <img height="150rem" src="../backend/assets/dreams-logo.png"/>
</p>



# Topicos

## Dreams

- [x] dreams-users -> Comunicação entre a api e o microsserviço Users

## Users
- [ ] users-dreams -> Comunicação entre Users e api

# Test

- [ ] Isolar regra de negocio do **Producer** e **Cosumer** para que possa ser usado em toda api e microsserviços, um exemplo seria https://www.sohamkamani.com/nodejs/working-with-kafka/


- [ ] A api tem de receber a requisição e disparar para o microsserviços uma String com o que deseja, exemplo seria: 
  ```ts
    await request.producer.send({
      topic: 'dreams-users',
      messages: [
        { value: 'List All Users'}
      ]
    })
  ````
  E esperar uma resposta, incialmente é apenas para compreender o funcionamento. 

- [ ] Por fim listar no frontend a informação de usuários
 