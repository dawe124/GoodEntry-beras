import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import io from "socket.io-client";

type SocketMessage = {
  type?: string;
  message?: string;
  username: string;
  date: number;
};

export const Chat = () => {
  const [chatlog, setChatlog] = useState<Array<SocketMessage>>([]);
  const socketRef = useRef<any>(null);
  const [username] = useState("kkak" + (Math.random() * 10000).toFixed(0));

  useEffect(() => {
    // Configure the socket connection
    const URL = "ws://localhost:8000";
    socketRef.current = io(URL);

    // Setup event listeners
    socketRef.current?.on("new message", (data: SocketMessage) => {
      setChatlog(previous => [...previous, data]);
    });

    // Setup event listeners
    socketRef.current?.on("past messages", (data: any) => {
      setChatlog(Object.values(data));
    });

    // Emit an event to add user
    socketRef.current?.emit("add user", username);

    // Clean up the socket connection when the component unmounts
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = (msg: string) => {
    setChatlog([...chatlog, { type: "msg", username: username, message: msg, date: new Date().getTime() }]);
    socketRef.current?.emit("new message", msg);
  };

  return (
    <div className="sm:w-full md:w-96 border border-grey-400">
      <div className="flex flex-col space-y-4 p-3 h-[calc(100vh-200px)] overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {chatlog.map((log, i) => {
          if (log.type == "msg")
            return (
              <Message
                key={i}
                username={log.username}
                message={log.message || ""}
                date={log.date}
                isMe={log.username == username}
              />
            );
        })}
      </div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs fixed "
        maxLength={200}
        onKeyDown={e => {
          if (e.key === "Enter") {
            sendMessage((e.target as HTMLInputElement).value as string);
            (e.target as HTMLInputElement).value = ""; // Clear input after sending
          }
        }}
      />
      <button>hmm</button>
    </div>
  );
};
