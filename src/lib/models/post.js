import mongoose from "mongoose";
import slugify from "slugify"; // 📦 Génère un slug (chaîne lisible et URL-friendly) à partir d’un texte

// 🔹 Définition du schéma de Post (structure des données dans MongoDB)
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  markdownArticle: {
    type: String,
    required: true
  },
  markdownHTMLResult: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true   // chaque slug doit être unique pour éviter les conflits d'URL
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag"  // dit à Mongoose de faire le lien avec le modèle Tag
  }]
}, {timestamps: true})   // ajoute automatiquement createdAt et updatedAt


// 🔹 Middleware exécuté avant l'enregistrement d'un document (pre-save)
postSchema.pre("save", async function(next) {
  if(!this.slug) {
    // Génère un slug initial à partir du titre, en minuscule et sans caractères spéciaux
    let baseSlug  = slugify(this.title, { lower: true, strict: true })
    let slugCandidate = baseSlug;

    // Vérifie si un autre document a déjà ce slug
    let slugExists = await mongoose.models.Post.findOne({slug: slugCandidate});

    let counter = 1;
    while(slugExists) {
      // Si le slug existe déjà, ajoute un suffixe numérique (ex: "-1", "-2", etc.)
      slugCandidate = `${baseSlug}-${counter}`;
      slugExists = await mongoose.models.Post.findOne({slug: slugCandidate});
      counter++;
    }
    // Assigne le slug final au document
    this.slug = slugCandidate;
    console.log("Final slug:", slugCandidate)
  }
  next(); // passe à l'étape suivante (enregistrement dans la base)
})

// 🔹 Création (ou récupération) du modèle mongoose à partir du schéma
// ✅ Si le modèle existe déjà (ex. après un hot reload), on le réutilise
// ❗ Sinon on le crée (Mongoose interdit de recréer un modèle du même nom)
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
