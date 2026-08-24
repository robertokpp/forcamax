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
        <span className="text-accent">{index + 1}</span>
      </div>

      <div className="flex justify-between items-center w-full text-white">
        <div className="flex flex-col">
          <span>{name}</span>
          <small>{`${muscleGroup}`}</small>
        </div>
        <div className="flex gap-4">
          <div>
            <span>{`${set}X${repetitions}`}</span>
          </div>
          <span>{weight}</span>
          <span>{`/${interval}`}</span>
        </div>
      </div>
    </div>
  );
}
