import { Navigate, useParams } from "react-router-dom";
import { MarkdownBody } from "../components/MarkdownBody";
import { formatPostDate, posts } from "../data/site";

export function PostPage() {
  const { slug } = useParams();
  const post = posts.find((item) => item.slug === slug);

  if (!post) return <Navigate to="/" replace />;

  return (
    <main>
      <article className="hero">
        <p className="post-meta">
          {formatPostDate(post.date).toUpperCase()} · {post.minutes} MIN READ
        </p>
        <h1>{post.title}</h1>
        <p className="bio italic">{post.excerpt}</p>
        <MarkdownBody source={post.body} />
      </article>
    </main>
  );
}
