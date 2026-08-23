import { Button } from "../components/Button";
import { useNavigate } from "react-router";

import { IconArrowLeft } from "../components/Icons";
export function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="bg-background text-white h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <span className="text-8xl">404</span>
        <p className="text-2xl uppercase">PÁGINA NÃO ENCONTRADA</p>
        <p>Você foi longe demais — essa página não está no ciclo.</p>
        <Button
          className="w-fit"
          variant="secondary"
          onClick={() => navigate("/")}
        >
          <IconArrowLeft color="#C8F135"></IconArrowLeft>
          VOLTAR AO INÍCIO
        </Button>
      </div>
    </main>
  );
}
