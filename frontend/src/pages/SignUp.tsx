import iconZap from "../assets/icon-zap.svg";
import iconArrowRight from "../assets/icon-arrowRight.svg";
import iconCheck from "../assets/icon-check.svg";
import { api } from "../services/api";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { z } from "zod";

const bodySchema = z
  .object({
    name: z.string().min(3, "O nome deve conter ao menos 3 caracteres."),
    email: z.email("Informe um e-mail valido.").toLowerCase(),
    password: z.string().min(6, "A senha deve conter ao menos 6 caracteres."),
    confirm: z.string(),
  })
  .refine(({ password, confirm }) => password === confirm, {
    message: "As senha não confere",
    path: ["confirm"],
  })
  .transform(({ confirm, ...data }) => data);

export function SignUp() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const data = bodySchema.parse({
        name,
        email,
        password,
        confirm,
      });

      await api.post("/user", data);

      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
      setIsChecked(false);

      toast.success("Conta criada com sucesso");
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="bg-background w-full h-screen flex flex-col justify-center items-center px-6 py-12">
      <Toaster
        toastOptions={{
          style: {
            background: "#C8F135",
          },
        }}
      />
      <header className="flex items-center gap-2.5 mb-10">
        <div className="w-8 h-8 bg-accent rounded-lg flex justify-center items-center">
          <img src={iconZap} alt="Icon de logo" />
        </div>
        <span className="text-foreground text-[18px] font-bold ">FORÇAMAX</span>
      </header>

      <div className="w-full mb-8">
        <p className="font-bold text-[30px] text-foreground">CRIE SUA CONTA</p>
        <p className="text-[14px] text-muted-foreground">
          Comece sua jornada hoje. É grátis.
        </p>
      </div>

      <form className="w-full flex flex-col gap-4" onSubmit={onSubmit}>
        <Input
          required
          id="name"
          label="Nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>

        <Input
          required
          id="email"
          type="email"
          label="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>

        <div className="flex gap-3">
          <Input
            required
            id="password"
            label="senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Input
            required
            id="confirmar"
            label="confirmar"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          ></Input>
        </div>
        <div className="flex gap-1 items-center">
          <div
            className={`relative w-5 h-5 flex items-center justify-center rounded-md border-2  hover:border-2 hover:border-accent ${isChecked ? "bg-accent border-accent" : "bg-secondary border-[#2E2E32]"}`}
          >
            <input
              required
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-full h-full absolute appearance-none"
            />
            {isChecked && <img src={iconCheck} />}
          </div>

          <small className="text-muted-foreground text-[12px]">
            Concordo com os <span className="text-accent">Termos de Uso</span> e
            a <span className="text-accent">Política de Privacidade.</span>{" "}
          </small>
        </div>

        <Button type="submit" isLoading={!isChecked || isLoading}>
          <img src={iconZap} />
          CRIAR CONTA GRÁTIS
        </Button>
      </form>

      <div className="flex w-full items-center justify-center mt-8 gap-0.5">
        <p className="text-muted-foreground">Já tem conta?</p>
        <Button
          onClick={() => navigate("/")}
          variant="secondary"
          className="w-fit p-0"
        >
          Entrar
        </Button>
      </div>
    </main>
  );
}
