# MEAT-API V2
Essa é uma pequena api utilizando Typescript.

#### Esse é um projeto com base em estudos de TypeScript e MongoDB.


## Instruções

- Ativar o compilador do TypeScript.
`npm run type`

Nesse comando executamos um builder que transforma o código de TypeScript para JavaScript, esse conteúdo é movido para a pasta `dist` e além dessa função o comando faz com que o compilador escute qualquer alteração no código.

- Ativar server.
`npm run start`

Nesse comando executamos o servidor em si, ele roda os arquivos JavaScript que estão na pasta `dist` e monitora qualquer modificação existente.

## Rotas da Api

- Usuarios (http://localhost:8081/users)
  - GET, POST, PUT, PATCH E DELETE. 

#

- Restaurantes (http://localhost:8081/restaurants)
  - GET e POST. 


#

- Review (http://localhost:8081/reviews)
  - GET, POST e DELETE. 


## Logger

>FATAL: Used to represent a catastrophic situation — your application cannot recover. Logging at this level usually signifies the end of the program.

>ERROR: Represents an error condition in the system that happens to halt a specific operation, but not the overall system. You can log at this level when a third-party API is returning errors.

>WARN: Indicates runtime conditions that are undesirable or unusual, but not necessarily errors. An example could be using a backup data source when the primary source is unavailable.

>INFO: Info messages are purely informative. Events that are user-driven or application-specific may be logged at this level. A common use of this level is to log interesting runtime events, such as the startup or shutdown of a service.

>DEBUG: Used to represent diagnostic information that may be needed for troubleshooting.

>TRACE: Captures every possible detail about an application's behavior during development.