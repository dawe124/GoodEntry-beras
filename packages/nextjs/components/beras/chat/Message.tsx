import { stringSwapper } from "./stringSwapper";

export const Message = ({
  username,
  message,
  date,
  isMe,
  tickers,
}: {
  username: string;
  message: string;
  date: number;
  isMe: boolean;
  tickers: any;
}) => {
  const stringToHsl = (str: string) => {
    // bright colors
    let hash = 0;
    str.split("").forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    const hue = Math.floor((hash % 341) * 341); // between 0 and 340
    let saturation = 100;
    let lightness = 50;

    // blue color adjustment:
    if (hue > 215 && hue < 265) {
      const gain = 20;
      const blueness = 1 - Math.abs(hue - 240) / 25;
      const change = Math.floor(gain * blueness);
      lightness += change;
      saturation -= change;
    }
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  const color = isMe ? "red" : stringToHsl(username);
  const d = new Date(date);

  return (
    <div className="bg-base-100 hover:bg-base-200 w-full py-1 px-2 rounded-md duration-100 ">
      <span className="text-accent text-xs">
        [{String(d.getHours()).padStart(2, "0")}:{String(d.getMinutes()).padStart(2, "0")}]{" "}
      </span>
      <span style={{ color: color, fontWeight: "bold" }}>{username}</span>{" "}
      <span className="text-neutral">{stringSwapper(message, tickers)}</span>
    </div>
  );
};
