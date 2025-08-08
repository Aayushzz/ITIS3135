"use strict";

const BASE_URL = "http://localhost:3000/blogs";

const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notification = document.querySelector(".notification");
const notificationContainer = document.querySelector(".notification-container");
const closeBtn = document.querySelector(".close");

let blogId = null;

function showError(message) {
  notification.textContent = message;
  notificationContainer.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  notificationContainer.classList.add("hidden");
});

function getBlogIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadBlog() {
  blogId = getBlogIdFromURL();

  if (!blogId) {
    showError("Invalid blog ID.");
    return;
  }

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
    showError("Please fill out the form correctly.");
    return;
  }

  const updatedBlog = {
    title: updatedTitle,
    content: updatedContent,
    date: new Date().toISOString()
  };

  try {
    const res = await fetch(`${BASE_URL}/${blogId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedBlog)
    });

    if (!res.ok) throw new Error("Failed to update blog.");

    window.location.href = `details.html?id=${blogId}`;
  } catch (err) {
    showError(err.message);
  }
});

window.addEventListener("DOMContentLoaded", loadBlog);
