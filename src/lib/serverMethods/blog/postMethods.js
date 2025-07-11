// 🔹 Méthode serveur (pas une server action, donc pas besoin de "use server")
// ↳ Sert à récupérer un article depuis la base en fonction de son slug

import { connectToDB } from "@/lib/utils/db/connectToDB"
import { Post } from "@/lib/models/post";

export const getPost = async(slug) => {
  try {
    await connectToDB();   // Connexion (ou réutilisation) à la DB

    const post = await Post.findOne({slug});  // Récupère l'article correspondant au slug
    return post;

  } catch (error) {
    console.error("Error while fetching a post", error);
    throw new Error("failed to fetch post");
  }
}


// ✅ Toujours appeler connectToDB() dans chaque fonction serveur avant d’accéder à la DB.
// ↳ car chaque appel serveur est indépendant.
