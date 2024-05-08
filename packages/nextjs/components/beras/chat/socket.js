"use client";

import { io } from "socket.io-client";
const URL = "http://chat.lasberas.com:8000";

export const socket = io(URL);