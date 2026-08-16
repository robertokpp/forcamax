import iconZap from "../assets/icon-zap.svg";

export function HeaderLogo() {
  return (
    <header className="flex items-center gap-2.5">
      <div className="w-8 h-8 bg-accent rounded-lg flex justify-center items-center">
        <img src={iconZap} alt="Icon de logo" />
      </div>
      <span className="text-foreground text-[18px] font-bold ">FORÇAMAX</span>
    </header>
  );
}
