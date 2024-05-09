"use client";

import { io } from "socket.io-client";
const URL = "wss://chat.lasberas.com";

export const socket = io(URL);