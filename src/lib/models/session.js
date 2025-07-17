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
🔐 Session vs User

- Session = prouve que l’utilisateur est connecté (temporaire, expire)
- User = infos persistantes du compte (nom, email, rôle…)

📌 Une session contient juste un lien vers un User (via userId)
   → Pas d'infos directement dans la session

🔁 Relation :
- 1 User → peut avoir plusieurs Sessions (ordi, téléphone…)
- 1 Session → appartient à 1 seul User

🚫 On ne met PAS une session dans le userSchema
   → Sinon : 1 seule session possible par user

👮‍♂️ Rôle (ex: isAdmin) :
- Stocké dans le User
- Pour le vérifier, il faut d’abord une session valide :
    if (session && session.user.isAdmin) { ... }

🧭 Ex :
User
 ├─ Session #1 (Chrome - maison)
 ├─ Session #2 (Safari - iPhone)
 └─ Session #3 (Edge - travail)
*/