type Props = React.ComponentProps<"input"> & {
  id?: string;
  name?: string;
};

export function TargetMuscle({ id, name, ...rest }: Props) {
  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        id={id}
        {...rest}
        className="peer w-full absolute appearance-none"
      />
      <label
        htmlFor={id}
        className="border-2 border-[#252526] px-3 py-1.5 rounded-lg bg-card text-muted-foreground peer-checked:bg-accent/10 peer-checked:text-accent peer-checked:border-accent"
      >
        {name}
      </label>
    </div>
  );
}
