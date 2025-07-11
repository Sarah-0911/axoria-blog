// 🔹 Méthode serveur (pas une server action, donc pas besoin de "use server")
// ↳ getPost: récupère un article depuis la base en fonction de son slug.
// ↳ getPosts: récupére tous les articles depuis la base.

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

export const getPosts = async() => {
  try {
    await connectToDB();

    const rawPosts = await Post.find({}).lean();

    // 🔧 Convertir les ObjectId et dates pour qu'ils soient "prop-safe"
    const posts = rawPosts.map(post => ({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt?.toString(),
      updatedAt: post.updatedAt?.toString(),
    }));

    return posts;

  } catch (error) {
    console.error("Error while fetching the posts", error);
    throw new Error("failed to fetch posts");
  }
}


// ✅ Toujours appeler connectToDB() dans chaque fonction serveur avant d’accéder à la DB.
// ↳ car chaque appel serveur est indépendant.
