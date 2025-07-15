"use server"
import { Post } from "@/lib/models/post";
import { Tag } from "@/lib/models/tag";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import slugify from "slugify";
import { marked } from "marked";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";
import Prism from "prismjs";
import { markedHighlight } from "marked-highlight";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";


const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

export async function addPost (formData) {
  // 🔹 Extraction des données du formulaire
  const { title, markdownArticle, tags } = Object.fromEntries(formData);

  try {
    // 🔹 Connexion à la base (ou réutilisation si déjà ouverte)
    await connectToDB();

    // 🔹 Gestion des tags
    const tagNameArray = JSON.parse(tags); // convertit la string JSON '["css","react"]' en tableau JS ["css", "react"]

    // Promise.all + map + async : attend que tous les tags soient trouvés ou créés.
    const tagIds = await Promise.all(tagNameArray.map(async (tagName) => {
      const normalizedTagName = tagName.trim().toLowerCase(); // normalise le nom
      let tag = await Tag.findOne({name: normalizedTagName})  // regarde si ce tag existe déjà

      // on en créé un si il n'existait pas de base
      if (!tag) {
        tag = await Tag.create({
          name: normalizedTagName,
          slug: slugify(normalizedTagName, { strict: true })
        });
      }

      return tag._id; // retourne l’ID MongoDB du tag (pour lier au post)
    }))

    // 🔹 Gestion du marked highlight
    marked.use(markedHighlight({
      highlight(code, lang) {
        const validLanguage = Prism.languages[lang] ? lang : "plaintext";
        return Prism.highlight(code, Prism.languages[validLanguage], validLanguage);
      }
    }));

    // 🔹 Générer le HTML à partir du markdown et le nettoyer de potentiels scripts malicieux
    let markdownHTMLResult = marked(markdownArticle);
    markdownHTMLResult = DOMPurify.sanitize(markdownHTMLResult);

    // 🔹 Création du nouveau Post avec ses tags associés (via leurs IDs)
    const newPost = new Post({
      title,
      markdownArticle,
      markdownHTMLResult,
      tags: tagIds // utilisé une fois que le tableau de Promise.all est terminé
    });

    // 🔹 On sauvegarde le post dans la base (l'ODM transforme l'objet JS → doc MongoDB + déclenche les middlewares)
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
