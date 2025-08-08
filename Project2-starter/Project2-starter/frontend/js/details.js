"use strict";

const API_URL = "http://localhost:3000/blogs";
const wrapper = document.querySelector(".wrapper");
const notificationContainer = document.querySelector(".notification-container");
const notification = document.querySelector(".notification");
const closeBtn = document.querySelector(".close");
const blogId = new URLSearchParams(window.location.search).get("id");

window.addEventListener("DOMContentLoaded", fetchBlog);

async function fetchBlog() {
  try {
    const res = await fetch(`${API_URL}/${blogId}`);
    if (!res.ok) throw new Error(`Cannot find blog with id ${blogId}`);
    renderBlog(await res.json());
  } catch (error) {
    showError(error.message);
  }
}

function renderBlog(blog) {
  wrapper.innerHTML = `
    <h2>${blog.title}</h2>
    <div class="article-header">
      <img class="avatar" src="${blog.profile}" alt="${blog.author}">
      <p>${blog.author}</p>
      <p>${new Date(blog.date).toLocaleDateString()}</p>
      <div class="btn-container">
        <a class="btn" href="edit.html?id=${blog.id}"><i class="fa-regular fa-pen-to-square"></i></a>
        <button class="btn delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
    <div class="article-body">${blog.content}</div>
  `;
  wrapper.querySelector(".delete").addEventListener("click", deleteBlog);
}

async function deleteBlog() {
  try {
    const res = await fetch(`${API_URL}/${blogId}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete blog");
    window.location.href = "index.html";
  } catch (error) {
    showError(error.message);
  }
}

function showError(message) {
  notification.textContent = message;
  notificationContainer.classList.remove("hidden");
  closeBtn.addEventListener("click", () => notificationContainer.classList.add("hidden"));
}
