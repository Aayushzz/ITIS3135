"use strict";

const BASE_URL = "http://localhost:3000/blogs";
const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notificationContainer = document.querySelector(".notification-container");
const notification = document.querySelector(".notification");
const closeBtn = document.querySelector(".close");
const blogId = new URLSearchParams(window.location.search).get("id");

closeBtn.addEventListener("click", () => notificationContainer.classList.add("hidden"));

function showError(message) {
  notification.textContent = message;
  notificationContainer.classList.remove("hidden");
}

async function loadBlog() {
  if (!blogId) return showError("Invalid blog ID.");
  try {
    const res = await fetch(`${BASE_URL}/${blogId}`);
    if (!res.ok) throw new Error("Failed to fetch blog.");
    const blog = await res.json();
    titleInput.value = blog.title;
    contentInput.value = blog.content;
  } catch (err) {
    showError(err.message);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const updatedTitle = titleInput.value.trim();
  const updatedContent = contentInput.value.trim();

  if (updatedTitle.length < 3 || updatedContent.length < 10) {
    return showError("Please fill out the form correctly.");
  }

  try {
    const res = await fetch(`${BASE_URL}/${blogId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: updatedTitle,
        content: updatedContent,
        date: new Date().toISOString()
      })
    });
    if (!res.ok) throw new Error("Failed to update blog.");
    window.location.href = `details.html?id=${blogId}`;
  } catch (err) {
    showError(err.message);
  }
});

window.addEventListener("DOMContentLoaded", loadBlog);
