export default async function decorate(block) {
    const container = document.createElement('ul');
    const url = 'https://20092-securbankdemo-stage.adobeio-static.net/api/v1/web/dx-excshell-1/forex';
    const options = {};
    const forexReq = await fetch(url, options)
    const index = await forexReq.json();
    console.log(index);
    index.currencies
    .forEach((currency) => {
        const li = document.createElement('li');
        li.innerHTML = `
        <p>${currency.title}</p>
        <p>${currency.forex}</p>
        `;
        container.append(li);
    });
    block.append(container);
}
