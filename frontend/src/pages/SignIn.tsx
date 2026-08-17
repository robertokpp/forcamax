import iconZap from "../assets/icon-zap.svg";
import iconArrowRight from "../assets/icon-arrowRight.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { useNavigate } from "react-router";
import { useState } from "react";
import { z, ZodError } from "zod";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import { toast, Toaster } from "sonner";
import { AxiosError } from "axios";

const bodySchema = z.object({
  email: z.email(),
  password: z.string(),
});

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const data = bodySchema.parse({
        email,
        password,
      });

      const response = await api.post("/session", data);

      auth.save(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(`${error.response?.data.message}`);
      }

      if(error instanceof ZodError ){
        toast.error(`${error.message}`);
      }

      console.error("Erro ao inicializar a sessão:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const navigate = useNavigate();
  return (
    <main className="bg-background w-full h-screen flex flex-col justify-center items-center px-6 py-12">
      <Toaster/>
      <header className="flex items-center gap-2.5 mb-10">
        <div className="w-8 h-8 bg-accent rounded-lg flex justify-center items-center">
          <img src={iconZap} alt="Icon de logo" />
        </div>
        <span className="text-foreground text-[18px] font-bold">FORÇAMAX</span>
      </header>

      <div className="w-full mb-8">
        <p className="font-bold text-[30px] text-foreground">
          BEM-VINDO DE VOLTA
        </p>
        <p className="text-[14px] text-muted-foreground">
          Entre na sua conta para continuar treinando.
        </p>
      </div>

      <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
        <Input
          id="email"
          label="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>

        <Input
          id="password"
          label="senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <Button className="p-0 font-normal w-fit" variant="secondary">
            Esqueceu?
          </Button>
        </Input>

        <Button isLoading={isLoading} type="submit">
          <img src={iconArrowRight} alt="" />
          ENTRAR
        </Button>
      </form>

      <div className="flex w-full items-center justify-center mt-8">
        <p className="text-muted-foreground">Ainda não tem conta?</p>
        <Button
          onClick={() => navigate("/cadastrar")}
          variant="secondary"
          className="w-fit p-0"
        >
          Criar conta
        </Button>
      </div>
    </main>
  );
}
