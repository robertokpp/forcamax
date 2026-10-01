import { twMerge } from "tailwind-merge";
import { Tags } from "./Tags";
import { InputDifficulty, Select } from "./Input";
import { IconClock, IconFlame, IconLayers } from "./Icons";
type Props = React.ComponentProps<"button"> & {
  tag: "push" | "pull" | "legs" | "full" | "core" | "hit";
  difficulty: "beginner" | "intermediary" | "advanced";
  title: string;
  interval?: string;
  exercises: number;
};

export function Card({
  interval,
  tag,
  difficulty,
  title,
  exercises,
  className,
  ...rest
}: Props) {
  return (
    <button
      className={twMerge(
        `flex flex-col gap-4 bg-card border border-[#252526]  p-4 text-white rounded-xl cursor-pointer`,
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
        <p className="font-bold text-[18px] font-heading uppercase tracking-[1px]">{title}</p>
      </div>



      <div className="flex gap-4 text-muted-foreground">
        <div className="flex gap-2 items-center">
          <IconClock color="#6B6B78"></IconClock>
          <p>{`${exercises * 6} min.`}</p>
        </div>
        <div className="flex gap-2 items-center">
          <IconLayers color="#6B6B78"></IconLayers>
          <p>{`${exercises} ex.`}</p>
        </div>
        <div className="flex gap-2 items-center">
          <IconFlame color="#6B6B78"></IconFlame>
          <p>{`${exercises * 60}`}</p>
        </div>
      </div>
    </button>
  );
}
