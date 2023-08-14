export default async function decorate(block) {
  const container = document.createElement('ul');
  const url = 'https://20092-securbankdemo-stage.adobeio-static.net/api/v1/web/dx-excshell-1/forex';
  const options = {};
  const forexReq = await fetch(url, options);
  const index = await forexReq.json();
  index.currencies
    .forEach((currency) => {
      const li = document.createElement('li');
      li.innerHTML = `
      <p>${currency.title} - ${currency.forex}</p>
      `;
      container.append(li);
    });
  block.innerHTML = '';
  block.append('Exchange Rates');
  block.append(container);
}
