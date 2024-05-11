"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from "@rainbow-me/rainbowkit-siwe-next-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { ChatBubbleBottomCenterIcon, HomeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Header } from "~~/components/Header";
import { PasswordProtection } from "~~/components/beras/PasswordProtection";
import { AuthenticatedChat } from "~~/components/beras/chat/AuthenticatedChat";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      <PasswordProtection>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="sticky top-0 px-1 mb-11 mb-0 md:invisible">
            <div className=" flex justify-between items-center w-full z-10 px-4 bottom-0 left-0 pointer-events-none ">
              <div className="flex flex-row flex-grow justify-evenly pointer-events-auto h-12">
                <Link
                  href="/"
                  passHref
                  className="lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
                  onClick={() => {
                    setShowChat(false);
                  }}
                >
                  <HomeIcon className="pt-2 h-3/4" />
                </Link>
                <Link
                  href="/create"
                  passHref
                  className="lg:flex items-center gap-2 ml-4 mr-6 shrink-0"
                  onClick={() => {
                    setShowChat(false);
                  }}
                >
                  <PlusCircleIcon className="pt-2 h-3/4" />
                </Link>
                <div
                  onClick={() => {
                    setShowChat(true);
                  }}
                >
                  <ChatBubbleBottomCenterIcon className="pt-2 h-3/4" />
                </div>
              </div>
            </div>
          </div>
          <main className="relative flex flex-row flex-1">
            <div className={`${showChat ? "hidden" : ""} md:block md:w-9/12 w-full flex flex-col flex-1`}>
              {children}
            </div>
            <div className={`${showChat ? "" : "hidden"} md:block`}>
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
