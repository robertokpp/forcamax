import { twMerge } from "tailwind-merge";
type Props = React.ComponentProps<"button"> & {
  tag?: string;
  difficulty: string;
  title: string;
};

export function Card({ tag, difficulty, title, className, ...rest }: Props) {
  return (
    <button
      className={twMerge(
        `flex flex-col bg-card border border-[#252526] p-4 text-white rounded-xl cursor-pointer`,
        className,
      )}
      {...rest}
    >
      <div className="flex gap-2">
        <div className="bg-accent/10 text-accent rounded-sm px-2">
          <small>PUSH</small>
        </div>
        <div>
          <small>{difficulty}</small>
        </div>
      </div>
      <div className="flex">
        <p className="font-bold uppercase">{title}</p>
      </div>
      <div className="flex gap-4 text-muted-foreground">
        <small>55 min</small>
        <small>8 ex.</small>
        <small>460</small>
      </div>
    </button>
  );
}
