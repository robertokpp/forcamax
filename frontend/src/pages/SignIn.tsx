import iconZap from "../assets/icon-zap.svg";
import iconArrowRight from "../assets/icon-arrowRight.svg";
import { Input } from "../components/Input";

export function SignIn() {
  return (
    <main className="bg-background w-full h-screen flex flex-col justify-center items-center px-6">
      <header className="flex items-center gap-2.5 mb-10">
        <div className="w-8 h-8 bg-accent rounded-lg flex justify-center items-center">
          <img src={iconZap} alt="Icon de logo" />
        </div>
        <span className="text-foreground text-[18px] font-bold ">FORÇAMAX</span>
      </header>

      <div className="w-full mb-8">
        <p className="font-bold text-[30px] text-foreground">
          BEM-VINDO DE VOLTA
        </p>
        <p className="text-[14px] text-muted-foreground">
          Entre na sua conta para continuar treinando.
        </p>
      </div>

      <form action="" className="w-full">
        <Input id="email" label="e-mail"></Input>
        
        <Input id="password" label="senha" type="password"></Input>
        <button>
          <img src={iconArrowRight} alt="" />
          ENTRAR
        </button>
      </form>
    </main>
  );
}
