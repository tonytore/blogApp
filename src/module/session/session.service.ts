import { db } from "@/config/db";


interface sessionProps {
    id: string,
    user_id : string,
    ip_address: string,
    user_agent: string,
    payload: string,
    last_activity: number
}

export const SessionService = {

  createSession: async (data: sessionProps) => {
    return await db.sessions.create({ data });
  },

  findSession: async (id: string) => {
    return await db.sessions.findUnique({ where: { id } });
  },

  findUserSessions: async (user_id: string) => {
    return await db.sessions.findMany({
      where: { user_id },
      orderBy: { last_activity: "desc" }
    });
  },

  deleteSession: async (id: string) => {
    return await db.sessions.delete({ where: { id } });
  },

  deleteUserSessions: async (user_id: string) => {
    return await db.sessions.deleteMany({
      where: { user_id }
    });
  },

  updateLastActivity: async (id: string) => {
    return await db.sessions.update({
      where: { id },
      data: { last_activity: Math.floor(Date.now() / 1000) }
    });
  }
};
