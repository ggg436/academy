import { cn } from "@/lib/utils";

import { Card } from "./card";

type ChallengeOption = {
  id: string;
  text: string;
  correct: boolean;
  imageSrc?: string | null;
  audioSrc?: string | null;
};

type Props = {
  options: ChallengeOption[];
  onSelect: (id: string) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: string | null;
  disabled?: boolean;
  type: "ASSIST" | "SELECT";
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
}: Props) => {
  return (
    <div className={cn(
      "grid gap-2",
      type === "ASSIST" && "grid-cols-1",
      type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
    )}>
      {options.map((option, i) => (
        <Card
          key={option.id}
          id={i}
          text={option.text}
          imageSrc={option.imageSrc ?? null}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          audioSrc={option.audioSrc ?? null}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  );
};
