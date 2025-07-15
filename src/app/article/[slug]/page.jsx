import { getPost } from "@/lib/serverMethods/blog/postMethods"
import Link from "next/link"
import "./article-styles.css"
import "prism-themes/themes/prism-vsc-dark-plus.css"

export default async function page({ params }) {

  const { slug } = await params; // ← ici, slug = la partie dynamique de l’URL
  const post = await getPost(slug);
  console.log(post);

  return (
    <section className="u-main-container u-padding-content-container">
      <h1 className="text-4xl mb-3">{post.title}</h1>
      <div className="mb-6 flex gap-4">
        {post.tags.map(tag => (
          <Link
          key={tag.slug}
          className="text-sm text-gray-500 underline"
          href={`/categories/tag/${tag.slug}`}
          >
            #{tag.name}
          </Link>
        ))}
      </div>
      <div
      className="article-styles"
      dangerouslySetInnerHTML={{ __html: post.markdownHTMLResult }}
      >
      </div>
    </section>
  )
}

// 🔹 Quand Next.js rend la page /article/[slug], il extrait automatiquement la partie dynamique de l'URL dans l'objet params
//    ex: /article/5-css-tricks → params.slug = "5-css-tricks"
//    On utilise ce slug pour récupérer le bon post dans la base de données
