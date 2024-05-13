import { emojis } from "./emojis";

export const Message = ({
  username,
  message,
  date,
  isMe,
}: {
  username: string;
  message: string;
  date: number;
  isMe: boolean;
}) => {
  const stringToColour = (str: string) => {
    let hash = 0;
    str.split("").forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += value.toString(16).padStart(2, "0");
    }
    return colour;
  };

  const d = new Date(date);
  const color = isMe ? "red" : stringToColour(username);

  return (
    <div className="bg-base-100 hover:bg-base-200 w-full p-1 rounded-md duration-100 ">
      <span className="text-accent">
        [{String(d.getHours()).padStart(2, "0")}:{String(d.getMinutes()).padStart(2, "0")}]{" "}
      </span>
      <span style={{ color: color, fontWeight: "bold" }}>{username}</span>{" "}
      <span className="text-neutral">{emojis.filter(message)}</span>
    </div>
  );
};
