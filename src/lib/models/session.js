import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: { // Cette session appartient à un user (C’est la session qui dépend du user)
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        required: true
    },
})

export const Session = mongoose.models?.Session || mongoose.model("Session", sessionSchema);


/*
🔐 Session = prouve qu’un user est connecté.

- Contient juste un lien vers l’utilisateur (userId).
- Ex : voir qui est connecté, sécuriser une page.

🧠 Ne stocke pas les infos du user directement.

User = les infos du compte
Session = l’état "connecté"
*/

