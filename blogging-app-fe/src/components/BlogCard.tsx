import { Link } from "react-router-dom";
import type { Blog } from "../types";
import { excerpt, formatDate } from "../utils/format";
import styles from "./BlogCard.module.css";

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link to={`/blog/${blog._id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        {blog.coverImageUrl ? (
          <img src={blog.coverImageUrl} alt="" className={styles.image} loading="lazy" />
        ) : (
          <div className={styles.imagePlaceholder}>{blog.title[0]?.toUpperCase()}</div>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.meta}>{formatDate(blog.createdAt)}</span>
        <h3 className={styles.title}>{blog.title}</h3>
        <p className={styles.excerpt}>{excerpt(blog.content)}</p>
        <span className={styles.author}>{blog.author?.name ?? "Unknown"}</span>
      </div>
    </Link>
  );
}
