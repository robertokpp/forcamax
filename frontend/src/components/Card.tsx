import { twMerge } from "tailwind-merge";
import { Tags } from "./Tags";
import { InputDifficulty, Select } from "./Input";
type Props = React.ComponentProps<"button"> & {
  tag: "push" | "pull" | "legs" | "full" | "core" | "hit";
  difficulty: "beginner" | "intermediary" | "advanced";
  title: string;
  interval?: string;
};

export function Card({
  interval,
  tag,
  difficulty,
  title,
  className,
  ...rest
}: Props) {
  return (
    <button
      className={twMerge(
        `flex flex-col bg-card border border-[#252526]  p-4 text-white rounded-xl cursor-pointer`,
        className,
      )}
      {...rest}
    >
      <div className="flex gap-2 items-center">
        <div>
          <Tags
            variant={tag}
            label={tag}
            checked={true}
            className="py-0 border-0"
          ></Tags>
        </div>
        <div>
          <InputDifficulty
            id={difficulty}
            variant={difficulty}
            className="py-0 border-0"
            checked={true}
          >
            {difficulty === "beginner" && "Iniciante"}
            {difficulty === "intermediary" && "Intermediário"}
            {difficulty === "advanced" && "avançado"}
          </InputDifficulty>
        </div>
      </div>
      <div className="flex">
        <p className="font-bold uppercase">{title}</p>
      </div>
      <div className="flex gap-4 text-muted-foreground">
        <small>{interval}</small>
        <small>8 ex.</small>
        <small>460</small>
      </div>
    </button>
  );
}
