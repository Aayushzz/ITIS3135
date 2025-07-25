"use strict";

const MAX_LENGTH = 200;

const authors = ['Tyrone', 'Ava', 'Elijah', 'Lucas', 'Ebony', 'Keisha', 'Jemila', 'Daniel'];

const articles = [
  {
    title: 'CSS Selectors',
    author: 'Tyrone',
    date: new Date(2023, 1, 20),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, dolore? Eveniet numquam quam qui quae laboriosam maxime deleniti aperiam quasi culpa veniam, voluptatibus molestias soluta error ratione assumenda sunt. Sapiente doloribus, nulla a tempora assumenda nostrum est enim corporis fugit quasi ipsam eveniet distinctio impedit dolorum eum dolor. Distinctio, reiciendis!'
  },

  {
    title: 'Cascading',
    author: 'Jemila',
    date: new Date(2023, 2, 1),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, voluptatum iste? Nisi exercitationem, consectetur unde ab placeat nemo deserunt consequuntur.'
  },

  {
    title: 'CSS Grid',
    author: 'Keisha',
    date: new Date(2023, 2, 12),
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur laboriosam aliquam debitis dolores dolorem corporis ipsum itaque culpa, et eaque? Aliquam, est eveniet voluptatem nemo doloremque esse odit dolorum dicta consectetur ipsam corrupti perspiciatis voluptas cupiditate et sapiente. Eligendi modi fugiat pariatur facere, molestiae nihil accusamus animi a impedit laboriosam tempora, eum in iure tenetur fugit praesentium consectetur mollitia ut obcaecati delectus ipsa dolores commodi? Rerum, temporibus velit eum iste praesentium modi amet molestiae illum enim quos pariatur quasi vero quidem, minus placeat assumenda recusandae fugit sunt voluptatem est neque qui! Ut optio quis accusamus placeat ipsa laboriosam laborum debitis.'
  }
];

articles.forEach(article=>{
  addEntry(article);
});


/**
 * This function creates a DOM element with information from the article object, and adds the element into the DOM.
 * @param {object} article - an article
 */
function addEntry(article) {
  const wrapper = document.querySelector('.articles-wrapper');

  // Create article element
  const articleElem = document.createElement('article');
  articleElem.classList.add('article-container');
  wrapper.appendChild(articleElem);

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = '✕';
  articleElem.appendChild(deleteBtn);

  // Article header
  const headerDiv = document.createElement('div');
  headerDiv.classList.add('article-header');

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('avatar');

  const authorIndex = authors.indexOf(article.author);
  if (authorIndex !== -1) {
    avatarImg.src = `images/avatar${authorIndex}.png`; // Corrected +1 offset
  } else {
    avatarImg.src = `images/default.jpeg`;
  }
  avatarImg.alt = 'avatar picture';

  const authorDateDiv = document.createElement('div');
  authorDateDiv.textContent = `${article.author} · ${article.date.toDateString()}`;

  headerDiv.appendChild(avatarImg);
  headerDiv.appendChild(authorDateDiv);
  articleElem.appendChild(headerDiv);

  // Article body
  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('article-body');

  const titleH3 = document.createElement('h3');
  titleH3.textContent = article.title;
  bodyDiv.appendChild(titleH3);

  const pElem = document.createElement('p');

  if (article.content.length <= MAX_LENGTH) {
    pElem.textContent = article.content;
    bodyDiv.appendChild(pElem);
  } else {
    const firstPart = article.content.substring(0, MAX_LENGTH);
    const secondPart = article.content.substring(MAX_LENGTH);

    pElem.textContent = firstPart;

    const spanDots = document.createElement('span');
    spanDots.textContent = '...';
    pElem.appendChild(spanDots);

    const spanHidden = document.createElement('span');
    spanHidden.classList.add('hidden');
    spanHidden.textContent = secondPart;
    pElem.appendChild(spanHidden);

    bodyDiv.appendChild(pElem);

    const readMoreBtn = document.createElement('button');
    readMoreBtn.classList.add('btn');
    readMoreBtn.textContent = 'Read More';
    bodyDiv.appendChild(readMoreBtn);
  }

  articleElem.appendChild(bodyDiv);
}

