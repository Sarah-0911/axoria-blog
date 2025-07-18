import { Session } from "@/lib/models/session";
import { User } from "@/lib/models/user";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import { cookies } from "next/headers";

export const sessionInfo = async() => {
    const cookieStore = await cookies();

    // Récupère l’ID de session depuis le cookie
    const sessionId = cookieStore.get("sessionId")?.value;
    if (!sessionId) return { success: false };

    await connectToDB();

    // Recherche la session correspondante en base de données
    const session = await Session.findById(sessionId);

    // Vérifie si la session existe et qu’elle n’est pas expirée
    if (!session || session.expiresAt < Date.now()) return { success: false };

    // Vérifie que l’utilisateur lié à la session existe toujours
    const user = await User.findById(session.userId);
    if (!user) return { success: false };

    // Session valide, on renvoie l’ID utilisateur
    return { success: true, userId: user._id.toString() };
}