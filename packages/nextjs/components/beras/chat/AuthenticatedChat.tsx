"use client";

import { useEffect, useState } from "react";
import { ChatInput } from "./ChatInput";
import { Help } from "./Help";
import { Message } from "./Message";
import { socket } from "./socket";
import { useSession } from "next-auth/react";

type SocketMessage = {
  type?: string;
  message?: string;
  username?: string;
  date?: number;
};

export const AuthenticatedChat = () => {
  const { data: session } = useSession(); // get the client session

  const [chatlog, setChatlog] = useState<Array<SocketMessage>>([]);
  const [username, setUsername] = useState(session?.user?.name);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      socket.emit("history");
    }

    function onDisconnect() {
      //setIsConnected(false);
      //setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("history", (data: any) => {
      setChatlog(Object.values(data));
    });
    socket.on("new message", (data: SocketMessage) => {
      setChatlog(previous => [...previous, data]);
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  // when username changes bc auth, need to register with server and add new listeners
  useEffect(() => {
    setUsername(session?.user?.name);
    console.log("effect chg username", username);
    socket.on("setname", (data: string) => {
      console.log("setname", data);
      if (data) setUsername(data);
    });
    // @ts-ignore
    socket.emit("register", session?.user?.name, session?.user?.credentials);
  }, [session?.user?.name]);

  const displayHelp = () => {
    setChatlog([...chatlog, { type: "help" }]);
  };

  // handle slash chat commands
  const handleCommands = (msg: string) => {
    if (msg.length == 0 || msg.substring(0, 1) != "/") return false;
    const cmd = msg?.split(" ");

    if (cmd[0] == "/help") displayHelp();
    else if (cmd[0] == "/setname") {
      if (cmd.length < 2) displayHelp();
      else socket.emit("setname", cmd[1]);
    }
    return true;
  };

  const sendMessage = (msg: string) => {
    if (!handleCommands(msg)) {
      setChatlog([...chatlog, { type: "msg", username: username || "", message: msg, date: new Date().getTime() }]);
      socket.emit("new message", msg);
    }
  };

  return (
    <div className="w-full md:w-96 border border-grey-400">
      <div className="flex flex-col space-y-4 p-3 h-[calc(100vh-200px)] overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
        {chatlog.map((log, i) => {
          if (log.type == "msg")
            return (
              <Message
                key={i}
                username={log.username || ""}
                message={log.message || ""}
                date={log.date || 0}
                isMe={log.username == username}
              />
            );
          else if (log.type == "help") return <Help key={i} />;
        })}
      </div>
      <ChatInput sendMessage={sendMessage} isDisabled={!session || !session.user} />
    </div>
  );
};
