# Portas para implementações de baixo nível

Bom, os últimos dois tópicos do nosso conteúdo foram super densos e robustos, com muitas regras de negócio. Nesse tópico vamos para algo um pouco mais prático.
Criamos as portas necessárias no tutorial anterior, irei repassar aqui, trablharemos uma implementação de baixo nível para algumas de nossas portas e fica como **DESAFIO**: **implementar camada de baixo nível para cada porta com as técnologia que você anda estudando!**

### Minhas escolhas para a aula de hoje

Para começar a implementar funcionalidades em baixo nível, decidi utilizar o **Node.js**, **JsonWebToken** e o **BCrypt**. Todas muito utilizadas na atualidade. Como já dito sobre o desafio, banco de dados ou qualquer forma de **persistência de dados ficam por sua conta**!

### Portas que definimos na última *lesson*:

use-cases/ports/ITokenManager.ts
```typescrpit
export default interface ITokenManager {
  generate (id: string): string;
}
```


use-cases/ports/IUserRepository.ts
```typescrpit
export default interface IUserRepository {
  findByEmail (email: string): Promise<IUser>;
  save(user: ICreateUserDto): Promise<IUser>
}
```


use-cases/ports/IEncryptManager.ts
```typescrpit
export default interface IEncryptManager {
  encrypt (raw: string): Promise<string>;
  compare(raw: string, hashed: string): Promise<boolean>;
}
```

As portas são definições de classes e métodos que precisamos, e com isso podemos usar uma ferramenta poderosa da Orientação a Objetos, o **polimorfismo**.

### Implementações de baixo nível

Irei implementar um exemplo para os métodos mais "incomuns"(`hash` de senha e geração de `jwt`), a implementação dos métodos de banco de dados UserRepository.`findByEmail` e UserRepository.`save` são os desafios dessa _lesson_.

infra/Managers/TokenManager/implementations/JwtManager.ts

```typescrpit
import { sign } from 'jsonwebtoken'

export default class JwtManager implements ITokenManager {
  generate (id: string): string {
    const token = sign({}, process.env.JWT_HASH_SECRET, {
      expiresIn: '1d',
      subject: id,
    });

    return token
  }
}
```

infra/Managers/EncryptManager/implementations/BCryptManager.ts

```typescrpit
import bcrypt from 'bcryptjs'

export default class BCryptManager implements IEncryptManager {
  encrypt (raw: string): Promise<string> {
    return bcrypt.hash(raw, 10);
  }

  compare(raw: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed);
  }
}
```

### Polimorfismo e Injeção de Dependência

Um exemplo de como podemos usar o polimorfismo no nosso caso, é implementando a seguinte injeção de dependência

main.ts
```typescript
import SignUpUseCase from "./auth/use-cases/SignUpUseCase";
import UserRepository from "./infra/Database/repositories/UserRepository";
import BCryptManager from "./infra/Managers/EncryptManager/implementations/BCryptManager";
import JwtManager from "./infra/Managers/TokenManager/implementations/JwtManager";

async function main() {
  const userRepository = new UserRepository();
  const tokenManager = new JwtManager();
  const encryptManager = new BCryptManager();
  const signUpUseCase = new SignUpUseCase(
    userRepository,
    tokenManager,
    encryptManager
  );

  const jwt = await signUpUseCase.execute({
    name: "Developer Dev",
    email: "dev@example.com",
    password: "developer",
  });

  console.log(jwt);
}

main();

```



### Desafio

Recapitulando, o desafio é implementar os métodos do UserRepository com a técnologia que estiver estudando, seja um ORM, como Prisma e TypeORM, ou seja utilizando Drivers do bancos de dados diretamente, como o MySQL, PostgreSQL.
A base para criação do UserRepository:

infra/Database/repositories/UserRepository.ts
```typescrpit
import IUserRepository from "../../../auth/use-cases/ports/IUserRepository";
import ICreateUserDto from "../../../auth/dtos/ICreateUserDto";

export default class UserRepository implements IUserRepository {
  findByEmail (email: string): Promise<IUser> {

  }

  save(user: ICreateUserDto): Promise<IUser> {

  }
}
```

**Bons estudos!**


Como já é de costume, abri alguns temas sem me aprofundar muito (polimorfismo e injeção de dependência, implementações de baixo nível) para abrir espaço pra você buscar conhecimento da forma que mais lhe favorecer.

Até a próxima, muito obrigado por ler até aqui!