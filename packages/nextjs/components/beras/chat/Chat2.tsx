"use client";

import { useEffect, useState } from "react";
import { Message } from "./Message";
import { socket } from "./socket";

type SocketMessage = {
  type?: string;
  message?: string;
  username: string;
  date: number;
};

export const Chat2 = () => {
  //const [isConnected, setIsConnected] = useState(false);
  //const [transport, setTransport] = useState("N/A");

  const [chatlog, setChatlog] = useState<Array<SocketMessage>>([]);
  const [username] = useState("Bera" + (Math.random() * 10000).toFixed(0));

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      //setIsConnected(true);
      //setTransport(socket.io.engine.transport.name);
      /*
      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });*/
    }

    function onDisconnect() {
      //setIsConnected(false);
      //setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("past messages", (data: any) => {
      setChatlog(Object.values(data));
    });
    socket.emit("add user", username);
    socket.on("new message", (data: SocketMessage) => {
      setChatlog(previous => [...previous, data]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const sendMessage = (msg: string) => {
    setChatlog([...chatlog, { type: "msg", username: username, message: msg, date: new Date().getTime() }]);
    socket.emit("new message", msg);
  };

  return (
    <div className="w-full md:w-96 border border-grey-400">
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
