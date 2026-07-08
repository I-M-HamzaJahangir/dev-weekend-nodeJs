import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteBlog, getBlog } from "../api/blogs";
import { useAuth } from "../context/AuthContext";
import type { Blog } from "../types";
import { formatDate, readingTime } from "../utils/format";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";
import styles from "./BlogDetail.module.css";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    getBlog(id)
      .then((res) => {
        if (!res.data) {
          setError("This post doesn't exist, or may have been removed.");
          return;
        }
        setBlog(res.data);
      })
      .catch(() => setError("Couldn't load this post."))
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await deleteBlog(id);
      navigate("/");
    } catch {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) return <Spinner fullPage />;

  if (error || !blog) {
    return <EmptyState title="Post not found" description={error || "This post doesn't exist."} />;
  }

  const isOwner = user?._id === blog.author?._id;

  return (
    <article className={styles.article}>
      {blog.coverImageUrl && (
        <img src={blog.coverImageUrl} alt="" className={styles.cover} />
      )}

      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Back to all posts
        </Link>
        <h1 className={styles.title}>{blog.title}</h1>

        <div className={styles.metaRow}>
          <div className={styles.authorInfo}>
            <span className={styles.avatar}>
              {blog.author?.name?.[0]?.toUpperCase() ?? "?"}
            </span>
            <div>
              <div className={styles.authorName}>{blog.author?.name ?? "Unknown"}</div>
              <div className={styles.dateLine}>
                {formatDate(blog.createdAt)} · {readingTime(blog.content)} min read
              </div>
            </div>
          </div>

          {isOwner && (
            <div className={styles.actions}>
              <Button variant="secondary" size="sm" onClick={() => navigate(`/blog/${blog._id}/edit`)}>
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => setShowDeleteConfirm(true)}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </header>

      <div className={styles.body}>{blog.content}</div>

      {showDeleteConfirm && (
        <ConfirmDialog
          title="Delete this post?"
          description="This can't be undone. The post and its cover image will be permanently removed."
          confirmLabel="Delete"
          isBusy={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </article>
  );
}
