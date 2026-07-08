import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBlog, getBlog, updateBlog } from "../api/blogs";
import { useAuth } from "../context/AuthContext";
import { ApiError } from "../types";
import Button from "../components/Button";
import Field from "../components/Field";
import Spinner from "../components/Spinner";
import styles from "./BlogEditor.module.css";

export default function BlogEditor() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [existingCoverUrl, setExistingCoverUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(isEditing);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;
    getBlog(id)
      .then((res) => {
        const blog = res.data;
        if (user && blog.author?._id !== user._id) {
          navigate(`/blog/${id}`, { replace: true });
          return;
        }
        setTitle(blog.title);
        setContent(blog.content);
        setExistingCoverUrl(blog.coverImageUrl);
      })
      .catch(() => setFormError("Couldn't load this post."))
      .finally(() => setIsLoading(false));
  }, [id, user, navigate]);

  const previewUrl = useMemo(
    () => (coverImage ? URL.createObjectURL(coverImage) : existingCoverUrl),
    [coverImage, existingCoverUrl]
  );

  useEffect(() => {
    return () => {
      if (coverImage && previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [coverImage, previewUrl]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFieldErrors({});
    setIsSubmitting(true);
    try {
      if (isEditing && id) {
        const res = await updateBlog(id, { title, content, coverImage });
        navigate(`/blog/${res.data._id}`);
      } else {
        const res = await createBlog({ title, content, coverImage });
        navigate(`/blog/${res.blog._id}`);
      }
    } catch (err) {
      if (err instanceof ApiError && err.fieldErrors.length) {
        const map: Record<string, string> = {};
        err.fieldErrors.forEach((f) => {
          map[f.field] = f.message ?? f.msg ?? "Invalid value";
        });
        setFieldErrors(map);
      } else {
        setFormError(err instanceof ApiError ? err.message : "Something went wrong");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <Spinner fullPage />;

  return (
    <div className={styles.wrap}>
      <p className={styles.eyebrow}>{isEditing ? "Editing post" : "New post"}</p>
      <h1 className={styles.title}>{isEditing ? "Edit your post" : "Write something"}</h1>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {formError && <div className={styles.formError}>{formError}</div>}

        <Field
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={fieldErrors.title}
          placeholder="Give it a title"
          required
        />

        <div>
          <label className={styles.dropzoneLabel}>Cover image</label>
          <div className={styles.dropzone}>
            {previewUrl && <img src={previewUrl} alt="" className={styles.preview} />}
            {previewUrl ? "Click to replace cover image" : "Click to upload a cover image (optional)"}
            <input
              type="file"
              accept="image/*"
              className={styles.dropzoneInput}
              onChange={(e) => setCoverImage(e.target.files?.[0] ?? null)}
            />
          </div>
        </div>

        <Field
          as="textarea"
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          error={fieldErrors.content}
          placeholder="Write your story…"
          rows={14}
          required
        />

        <div className={styles.actionsRow}>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publishing…" : isEditing ? "Save changes" : "Publish"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
