import { request } from "./client";
import type { Blog, BlogListResponse } from "../types";

export interface ListBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const listBlogs = ({ page = 1, limit = 9, search = "" }: ListBlogsParams = {}) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.set("search", search);
  return request<BlogListResponse>(`/blogs?${params.toString()}`);
};

export const listMyBlogs = ({ page = 1, limit = 9, search = "" }: ListBlogsParams = {}) => {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (search) params.set("search", search);
  return request<BlogListResponse>(`/blogs/mine?${params.toString()}`);
};

export const getBlog = (id: string) => request<{ success: boolean; data: Blog }>(`/blog/${id}`);

export interface BlogFormInput {
  title: string;
  content: string;
  coverImage?: File | null;
}

function toFormData({ title, content, coverImage }: BlogFormInput) {
  const form = new FormData();
  form.append("title", title);
  form.append("content", content);
  if (coverImage) form.append("coverImageUrl", coverImage);
  return form;
}

export const createBlog = (input: BlogFormInput) =>
  request<{ msg: string; blog: Blog }>("/blog", {
    method: "POST",
    body: toFormData(input),
    isForm: true,
  });

export const updateBlog = (id: string, input: BlogFormInput) =>
  request<{ success: boolean; data: Blog }>(`/blog/${id}`, {
    method: "PUT",
    body: toFormData(input),
    isForm: true,
  });

export const deleteBlog = (id: string) =>
  request<{ success: boolean }>(`/blog/${id}`, { method: "DELETE" });
