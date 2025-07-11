import { getPost } from "@/lib/serverMethods/blog/postMethods"

export default async function page({ params }) {

  const { slug } = await params; // ← ici, slug = la partie dynamique de l’URL
  const post = await getPost(slug);
  console.log(post);

  return (
    <section className="u-main-container u-padding-content-container">
      <h1 className="text-4xl mb-3">{post.title}</h1>
      <p>{post.markdownArticle}</p>
    </section>
  )
}

// 🔹 Quand Next.js rend la page /article/[slug], il extrait automatiquement la partie dynamique de l'URL dans l'objet params
//    ex: /article/5-css-tricks → params.slug = "5-css-tricks"
//    On utilise ce slug pour récupérer le bon post dans la base de données

