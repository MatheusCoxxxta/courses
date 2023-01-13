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
