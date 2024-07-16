import { environment } from "@enviroment";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const useSocket = (userId: string) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const socketInstance = io(environment?.baseUrl); // Replace with your server URL

		socketInstance.on("connect", () => {
			console.log("Connected to server");
			socketInstance.emit("authenticate", userId);
		});

		socketInstance.on("disconnect", () => {
			console.log("Disconnected from server");
		});

		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, [userId]);

	return socket;
};

export default useSocket;
