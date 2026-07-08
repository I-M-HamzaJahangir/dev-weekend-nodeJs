import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { listBlogs } from "../api/blogs";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import type { Blog, Pagination as PaginationType } from "../types";
import BlogCard from "../components/BlogCard";
import PaginationNav from "../components/Pagination";
import Spinner from "../components/Spinner";
import EmptyState from "../components/EmptyState";
import styles from "./Home.module.css";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") ?? "";

  const [searchInput, setSearchInput] = useState(search);
  const debouncedInput = useDebouncedValue(searchInput, 350);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Push the debounced input into the URL as the user types, so the fetch
  // effect below (keyed off the URL) picks it up and pagination resets.
  useEffect(() => {
    const trimmed = debouncedInput.trim();
    if (trimmed === search) return;

    const next = new URLSearchParams(searchParams);
    if (trimmed) next.set("search", trimmed);
    else next.delete("search");
    next.delete("page");
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput]);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError("");

    listBlogs({ page, search })
      .then((res) => {
        if (cancelled) return;
        setBlogs(res.data);
        setPagination(res.pagination);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load posts. Is the server running?");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams();
    if (searchInput.trim()) next.set("search", searchInput.trim());
    setSearchParams(next);
  };

  const handlePageChange = (nextPage: number) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchParams({});
  };

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>A quiet corner for writing</p>
          <h1 className={styles.heroTitle}>Stories, ideas, and notes worth reading twice.</h1>
          <p className={styles.heroDesc}>
            Marginalia is a small publishing space — browse what people are writing, or start
            your own thread.
          </p>
          <form className={styles.searchForm} onSubmit={handleSearch}>
            <svg
              className={styles.searchIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11.5 11.5L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              className={styles.searchInput}
              type="search"
              placeholder="Search posts…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>
        </div>
      </section>

      <main className={styles.main}>
        {!isLoading && !error && (
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>
              {pagination?.totalDocuments ?? 0}{" "}
              {pagination?.totalDocuments === 1 ? "post" : "posts"}
              {search && ` for “${search}”`}
            </span>
            {search && (
              <button className={styles.clearSearch} onClick={clearSearch}>
                Clear search
              </button>
            )}
          </div>
        )}

        {isLoading && <Spinner />}

        {!isLoading && error && (
          <EmptyState title="Something went wrong" description={error} />
        )}

        {!isLoading && !error && blogs.length === 0 && (
          <EmptyState
            title={search ? "No posts match your search" : "No posts yet"}
            description={
              search ? "Try a different keyword." : "Be the first to publish something here."
            }
          />
        )}

        {!isLoading && !error && blogs.length > 0 && (
          <>
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
    </>
  );
}
