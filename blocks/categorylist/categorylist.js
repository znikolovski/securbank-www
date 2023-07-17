import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {
  const indexResponse = await fetch('/query-index.json');
  if (!indexResponse.ok) {
    return;
  }

  const category = block.querySelector(':scope div:nth-child(1) > div').innerHTML;
  const index = await indexResponse.json();
  const container = document.createElement('ul');
  container.classList.add('category-list');
  container.classList.add(`category-list--${category}`);

  index.data
    .forEach((post) => {
      if (post.category !== category) {
        return;
      }
      const li = document.createElement('li');
      const picture = createOptimizedPicture(post.image, '', false, [{ width: 500 }]);
      const date = post['publication-date'];

      li.innerHTML = `
      <a href="${post.path}">
          <div class="picture">
          ${picture.outerHTML}
          </div>
          <div class="content">
            <h4>${post.title}</h4>
            <p>${post.description}</p>
          </div>
      </a>
    `;
      container.append(li);
    });

  block.innerHTML = container.outerHTML;
}
