import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { listMyBlogs } from "../api/blogs";
import type { Blog, Pagination as PaginationType } from "../types";
import BlogCard from "../components/BlogCard";
import PaginationNav from "../components/Pagination";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import styles from "./MyBlogs.module.css";

export default function MyBlogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError("");

    listMyBlogs({ page })
      .then((res) => {
        if (cancelled) return;
        setBlogs(res.data);
        setPagination(res.pagination);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load your posts.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Your work</p>
          <h1 className={styles.title}>My blogs</h1>
        </div>
        <Button onClick={() => navigate("/write")}>Write new post</Button>
      </div>

      {isLoading && <Spinner />}

      {!isLoading && error && <EmptyState title="Something went wrong" description={error} />}

      {!isLoading && !error && blogs.length === 0 && (
        <EmptyState
          title="You haven't published anything yet"
          description="Once you write a post, it'll show up here."
          action={<Button onClick={() => navigate("/write")}>Write your first post</Button>}
        />
      )}

      {!isLoading && !error && blogs.length > 0 && (
        <>
          <p className={styles.count}>
            {pagination?.totalDocuments} {pagination?.totalDocuments === 1 ? "post" : "posts"}
          </p>
          <div className={styles.grid}>
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
          {pagination && (
            <PaginationNav
              page={pagination.page}
              totalPages={pagination.totalPages}
              onChange={handlePageChange}
            />
          )}
        </>
      )}
    </main>
  );
}
