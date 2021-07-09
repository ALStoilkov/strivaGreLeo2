import { ActiveUser } from "./server";

interface Shared {
    onlineUsers: ActiveUser[]
}

const shared: Shared = {
    onlineUsers: []
}

export default shared