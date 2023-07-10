export default async function decorate(block) {
   
    const aempublishurl = 'https://publish-p55117-e571178.adobeaemcloud.com'
    const persistedquery = '/graphql/execute.json/securbank/OfferByPath'
    const cfpath = '/content/dam/securbank/en/offers/998'
    const variationname = 'main'

    const url = aempublishurl + persistedquery + `;path=${cfpath};variation=${variationname};ts=${Math.random()*1000}`;
    const options = {};

    const cfReq = await fetch(url, options)
    .then((response) => response.json())
    .then((contentfragment) => {
        if(contentfragment.data) {
            let offer = contentfragment.data.offerByPath.item;
            console.log(offer);
            return offer;
        } else {
            console.log("no data");
        }
    });


    block.innerHTML = "<h3>" + cfReq.headline + "</h3>";


}