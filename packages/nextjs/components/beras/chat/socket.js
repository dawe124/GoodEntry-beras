"use client";

import { io } from "socket.io-client";
const URL = "wss://chat.goodentry.io";
// const URL = "http://localhost:8000";

export const socket = io(URL);