"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import {
  BanknotesIcon,
  ChatBubbleBottomCenterIcon,
  FaceSmileIcon,
  HomeIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { Header } from "~~/components/Header";
import { PasswordProtection } from "~~/components/beras/PasswordProtection";
import { AuthenticatedChat } from "~~/components/beras/chat/AuthenticatedChat";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const [showChat, setShowChat] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <>
      <PasswordProtection>
        <div className="relative flex flex-col min-h-screen bg-primary">
          <div className="fixed top-0 left-0 right-0 z-[100]">
            <Header />
            <div className="md:hidden h-14 px-1 mb-0 bg-base-100 border-b-[1px] border-secondary">
              <div className=" flex justify-between items-center w-full z-10 bottom-0 left-0 pointer-events-none ">
                <div className="flex flex-row flex-grow justify-evenly pointer-events-auto h-14">
                  <Link
                    href="/"
                    passHref
                    className={`flex flex-col items-center shrink-0 py-2 px-6 ${
                      pathname == "/" && !showChat ? "card glass" : ""
                    }`}
                    onClick={() => {
                      setShowChat(false);
                    }}
                  >
                    <HomeIcon color="secondary" className="text-secondary mb-1" />
                    <span className="text-xs text-secondary font-bold">Home</span>
                  </Link>
                  <Link
                    href="/create"
                    passHref
                    className={`flex flex-col items-center shrink-0  py-2 px-6 ${
                      pathname == "/create" && !showChat ? "card glass" : ""
                    }`}
                    onClick={() => {
                      setShowChat(false);
                    }}
                  >
                    <PlusCircleIcon color="secondary" className="text-secondary mb-1" />
                    <span className="text-xs text-secondary font-bold">Create</span>
                  </Link>
                  <Link href="/" className="flex flex-col items-center shrink-0 py-2 px-6 pointer-event-none">
                    <BanknotesIcon color="secondary" className="text-secondary mb-1" />
                    <span className="text-xs text-secondary font-bold">Gamble</span>
                  </Link>
                  <Link href="/" className="flex flex-col items-center shrink-0 py-2 px-6 pointer-event-none">
                    <FaceSmileIcon color="secondary" className="text-secondary mb-1" />
                    <span className="text-xs text-secondary font-bold">Me</span>
                  </Link>
                  <div
                    onClick={() => {
                      setShowChat(true);
                    }}
                    className={`flex flex-col items-center shrink-0  py-2 px-6 ${showChat ? "card glass" : ""}`}
                  >
                    <ChatBubbleBottomCenterIcon color="secondary" className="text-secondary mb-1" />
                    <span className="text-xs text-secondary font-bold">Chat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <main className="relative flex flex-row flex-1 md:mt-14 mt-28 md:w-[calc(100vw-400px)] md:p-5">
            <div className={`${showChat ? "hidden" : ""} md:block w-full flex flex-col md:p-0 p-2`}>{children}</div>
            <div
              className={`${
                showChat ? "" : "hidden"
              } md:block fixed top-14 bg-base-100 right-0 h-[calc(100vh-56px)] md:w-96 w-full`}
            >
              <AuthenticatedChat />
            </div>
          </main>
        </div>
        <Toaster />
      </PasswordProtection>
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to Las Beras",
});

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <ProgressBar />
          <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
            <RainbowKitProvider
              avatar={BlockieAvatar}
              theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
            >
              <ScaffoldEthApp>{children}</ScaffoldEthApp>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </SessionProvider>
    </WagmiProvider>
  );
};
