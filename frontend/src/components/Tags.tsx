type Props = React.ComponentProps<"input"> & {
  id: string;
  name: string;
  label: string;
  variant: keyof typeof variants;
};

const variants = {
  push: "peer-checked:border-[#C8F135] peer-checked:bg-[#C8F135]/10 peer-checked:text-[#C8F135]",
  pull: "peer-checked:border-[#38BDF8] peer-checked:bg-[#38BDF8]/10 peer-checked:text-[#38BDF8]",
  legs: "peer-checked:border-[#FB923C] peer-checked:bg-[#FB923C]/10 peer-checked:text-[#FB923C]",
  full: "peer-checked:border-[#A78BFA] peer-checked:bg-[#A78BFA]/10 peer-checked:text-[#A78BFA]",
  core: "peer-checked:border-[#34D399] peer-checked:bg-[#34D399]/10 peer-checked:text-[#34D399]",
  hit: "peer-checked:border-[#F43F5E] peer-checked:bg-[#F43F5E]/10 peer-checked:text-[#F43F5E]",
};

export function Tags({ id, name, label, variant, ...rest }: Props) {
  const variantColor = variants[variant];
  return (
    <li className="flex-1">
      <input
        className="peer sr-only"
        {...rest}
        type="radio"
        id={id}
        name={name}
      />
      <label
        className={`block w-full px-2.5 py-1 bg-card border border-[#252526] rounded-xl text-muted-foreground uppercase text-center ${variantColor}`}
        htmlFor={id}
      >
        {label}
      </label>
    </li>
  );
}
