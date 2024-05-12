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
    <div className="relative w-full h-vh-90 md:w-96 mb-12 md:shadow-lg">
      <div className="flex flex-col bg-base-200 md:border-secondary md:border md:border-b-0 border-none rounded-md space-y-4 md:p-2 px-1 h-[calc(100vh-120px)] md:pb-14 pb-6 overflow-y-auto chat-scrollbar scrolling-touch">
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
      <div className="md:absolute fixed bg-base-100 h-12 bottom-2 left-2 right-2 flex flex-row items-center rounded-md overflow-hidden">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered border rounded-l-md border-base-200 focus:border-l-base-300 focus:border-t-base-300 focus:border-b-base-300 w-full text-neutral "
          maxLength={200}
          onKeyDown={e => {
            if (e.key === "Enter") {
              sendMessage((e.target as HTMLInputElement).value as string);
              (e.target as HTMLInputElement).value = ""; // Clear input after sending
            }
          }}
        />
        <button className="bg-secondary w-[60px] h-full rounded-r-md text-neutral text-xs font-bold swap-on-hover">
          S<span className="swap-n">E</span>
          <span className="swap-e">N</span>D
        </button>
      </div>
    </div>
  );
};
