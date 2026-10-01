type Props = {
  index: number;
  name: string;
  set: string;
  repetitions: string;
  weight: string;
  interval: string;
  muscleGroup: string;
};

export function CardExercise({
  index,
  name,
  muscleGroup,
  set,
  repetitions,
  weight,
  interval,
}: Props) {
  return (
    <div className="w-full border border-[#252526] bg-card rounded-xl p-3 flex items-center gap-4">
      <div className="w-8 h-8 bg-accent/10 flex justify-center items-center rounded-lg">
        <span className="text-accent">
          {index < 10 ? `0${index + 1}` : index + 1}
        </span>
      </div>

      <div className="flex justify-between items-center w-full text-white">
        <div className="flex flex-col">
          <span>{name}</span>
          <small className="text-muted-foreground">{`${muscleGroup}`}</small>
        </div>
        <div className="flex gap-4 items-center">
          <div className="px-2 py-1 rounded-xl bg-[#1E1E22]">
            <span className="text-muted-foreground">{`${set}X${repetitions}`}</span>
          </div>
          <span className="text-muted-foreground">{weight}</span>
          <span className="text-muted-foreground/50">{`/${interval}`}</span>
        </div>
      </div>
    </div>
  );
}
