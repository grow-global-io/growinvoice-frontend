import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const useSocket = (userId: string) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const socketInstance = io("https://growinvoice-backend-16f908d94aed.herokuapp.com"); // Replace with your server URL

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
