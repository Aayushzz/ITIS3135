"use strict";

const BASE_URL = "http://localhost:3000/blogs";
const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const contentInput = document.getElementById("content");
const notificationContainer = document.querySelector(".notification-container");
const notification = document.querySelector(".notification");
const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => notificationContainer.classList.add("hidden"));

function showError(message) {
  notification.textContent = message;
  notificationContainer.classList.remove("hidden");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (
    titleInput.value.trim().length < 3 ||
    authorInput.value.trim().length < 3 ||
    contentInput.value.trim().length < 10
  ) {
    return showError("Please fill out all fields correctly.");
  }

  const newBlog = {
    title: titleInput.value.trim(),
    author: authorInput.value.trim(),
    content: contentInput.value.trim(),
    profile: "images/default.jpeg",
    date: new Date().toISOString()
  };

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog)
    });
    if (!response.ok) throw new Error("Failed to post blog.");
    window.location.href = "index.html";
  } catch (err) {
    showError(err.message);
  }
});
