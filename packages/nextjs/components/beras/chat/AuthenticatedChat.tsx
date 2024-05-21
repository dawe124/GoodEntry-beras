"use client";

import { useEffect, useRef, useState } from "react";
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
  const [tickers, setTickers] = useState({});
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchTickers = async () => {
      const response = await fetch("https://api.lasberas.com/berachain_testnet/tokens.json", {
        cache: "no-store",
        // next: { revalidate: 900 } // 15m
      });

      const results = await response.json();

      const tickersList: any = {};

      for (const key in results) {
        tickersList[`$${results[key].symbol}`] = {
          symbol: `${results[key].symbol}`,
          address: `${results[key].address}`,
        };
      }

      setTickers(tickersList);
    };
    fetchTickers();
  }, []);

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
    socket.on("setname", (data: string) => {
      console.log("setname", data);
      if (data) setUsername(data);
    });
    // @ts-ignore
    socket.emit("register", session?.user?.name, session?.user?.credentials);
  }, [session?.user?.name]);

  useEffect(() => {
    // Scroll to the bottom of the chat container on load and when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatlog]);

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
    <div className="relative h-full w-full p-1 md:shadow-lg bg-primary ">
      <div
        ref={chatContainerRef}
        className="flex flex-col md:border-secondary md:border md:border-b-0 border-none rounded-md space-y-2 h-[calc(100vh-68px)] md:pb-14 pb-14 md:pt-0 pt-14 px-1 overflow-y-auto chat-scrollbar scrolling-touch"
      >
        {chatlog.map((log, i) => {
          if (log.type == "msg")
            return (
              <Message
                key={i}
                username={log.username || ""}
                message={log.message || ""}
                date={log.date || 0}
                isMe={log.username == username}
                tickers={tickers}
              />
            );
          else if (log.type == "help") return <Help key={i} />;
        })}
      </div>
      <ChatInput sendMessage={sendMessage} isDisabled={!session || !session.user} />
    </div>
  );
};
