import { fetchPlaceholders } from '../../scripts/lib-franklin.js';

export function createElement(tagName, options = {}) {
  const { classes = [], props = {} } = options;
  const elem = document.createElement(tagName);
  const isString = typeof classes === 'string';
  if (classes || (isString && classes !== '') || (!isString && classes.length > 0)) {
    const classesArr = isString ? [classes] : classes;
    elem.classList.add(...classesArr);
  }
  if (!isString && classes.length === 0) elem.removeAttribute('class');

  if (props) {
    Object.keys(props).forEach((propName) => {
      const value = propName === props[propName] ? '' : props[propName];
      elem.setAttribute(propName, value);
    });
  }

  return elem;
}
export default async function decorate(block) {
  const contentWrapper = block.querySelector(':scope > div > div:first-child');
  contentWrapper.className = 'feature-content-wrapper';

  const picture = block.querySelector('picture');
  const pictureWrapper = picture.closest('p');
  const contentContainer = createElement('div', { classes: 'feature-content-container' });

  const mediaWrapper = createElement('div', { classes: 'feature-content-media' });
  mediaWrapper.appendChild(pictureWrapper);
  const parentContainer = contentWrapper.parentElement.parentElement;
  parentContainer.prepend(mediaWrapper);

  const callOutWrapper = block.querySelector(':scope > div > div:last-child');
  callOutWrapper.className = 'feature-callout-wrapper';
  const placeholders = await fetchPlaceholders('');
  const { interestrate } = placeholders;
  const interest = createElement('p', { classes: 'feature-interest-rate' });
  interest.innerHTML = `<strong>${interestrate}%</strong><sup>APR</sup>`;
  callOutWrapper.appendChild(interest);

  contentContainer.appendChild(contentWrapper);
  parentContainer.appendChild(contentContainer);
  parentContainer.appendChild(callOutWrapper);
  contentContainer.prepend(mediaWrapper);
}
