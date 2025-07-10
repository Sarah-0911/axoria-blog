import mongoose from "mongoose";

export async function connectToDB () {
  if (mongoose.connection.readyState) {
    console.log("Using existing connection:", mongoose.connection.name);
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to database", mongoose.connection.name);
  } catch (err) {
    throw new Error("Failed to connect to the Database")
  }
}


/*
🧠 MONGOOSE MEMO — ODM pour MongoDB

🔹 ODM = Object Document Mapper
   ↳ Fait le lien entre MongoDB (base NoSQL orientée documents)
     et les objets JS dans notre code.

🔹 Permet :
  ✅ Définir un schéma strict (types, required, defaults…)
  ✅ Valider les données avant enregistrement
  ✅ Créer des méthodes et hooks personnalisés
  ✅ Simplifier les requêtes MongoDB

🔹 Exemple :
   const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
     age: Number
   });

   const User = mongoose.model("User", userSchema);

   const user = new User({ name: "Alice", age: 25 });
   await user.save();
*/


/*
🧠 Server Component vs Server Action (Next.js)

🔹 Server Component (par défaut) :
   - Exécuté côté serveur (ex: async function Home())
   - Peut appeler des fonctions serveur (ex: connectToDB())
   - ✅ Pas besoin de "use server"

🔹 Server Action :
   - Fonction appelée depuis le **client** (ex: via form action)
   - Utilisée pour traiter des données (formulaires, requêtes)
   - ✅ DOIT avoir "use server" au début

🔸 Règle :
   → Si le client appelle la fonction ⇒ "use server" requis
   → Si tout reste côté serveur ⇒ pas besoin
*/

