"use server"
import { Post } from "@/lib/models/post";
import { connectToDB } from "@/lib/utils/db/connectToDB";

export async function addPost (formData) {
  // 🔹 On extrait les champs du formulaire (title, markdownArticle)
  const {title, markdownArticle } = Object.fromEntries(formData);

  try {
    // 🔹 On se connecte à la base de données (ou on réutilise une connexion existante)
    await connectToDB();

    // 🔹 On crée une nouvelle instance de Post avec les données du formulaire
    const newPost = new Post({
      title,
      markdownArticle
    });

     // 🔹 On sauvegarde le post dans la base (l'ODM transforme l'objet JS → document MongoDB)
    const savedPost = await newPost.save();
    console.log("Post saved with success");

    return {
      success: true,  // → permet de gérer un message de confirmation côté client
      slug: savedPost.slug  // → permet de rediriger l'utilisateur vers le nouvel article
    }

  } catch (error) {
    console.error("Error while creating the post:", error);
    throw new Error(error.message || "An error occurred while creating the post")
  }
}
