/* eslint-disable no-underscore-dangle */
export default async function decorate(block) {
  const aempublishurl = 'https://publish-p55117-e571178.adobeaemcloud.com';
  const persistedquery = '/graphql/execute.json/securbank/OfferByPath';
  const cfpath = '/content/dam/securbank/en/offers/';
  const offerid = block.querySelector(':scope div:nth-child(1) > div').innerHTML;
  const variationname = block.querySelector(':scope div:nth-child(2) > div').innerHTML;
  const url = `${aempublishurl}${persistedquery};path=${cfpath}${offerid};variation=${variationname};ts=${Math.random() * 1000}`;
  const options = {};

  const cfReq = await fetch(url, options)
    .then((response) => response.json())
    .then((contentfragment) => {
      let offer = '';
      if (contentfragment.data) {
        offer = contentfragment.data.offerByPath.item;
      }
      return offer;
    });

  block.innerHTML = `
    <div class='banner-content'>
        <div class='banner-detail' style="background-image: linear-gradient(90deg,rgba(0,0,0,0.6), rgba(0,0,0,0.1) 80%) ,url(${aempublishurl + cfReq.heroImage._dynamicUrl});">
            <p class='pretitle'>${cfReq.pretitle}</p>
            <p class='headline'>${cfReq.headline}</p>
            <p class='detail'>${cfReq.detail.plaintext}</p>
        </div>
        <div class='banner-logo'>
        </div>
    </div>
`;
}
