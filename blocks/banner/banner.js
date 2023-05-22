export default function decorate(block) {

    const queryString = window.location.search;
    console.log(queryString);
    

 
    const content = block.querySelector('div'); 

    const bannercontent = document.createElement("div");
    bannercontent.classList.add(`banner-content`);

    const bannertext = content.querySelector('div'); 
    const bannertextdiv = document.createElement("div");
    bannertextdiv.classList.add(`banner-text`);
    bannertextdiv.append(bannertext);

    const bannerpic = bannertext.querySelector('picture');
    const bannerpicdiv = document.createElement("div");
    bannerpicdiv.classList.add(`banner-pic`);
    bannerpicdiv.append(bannerpic);
 


    bannercontent.append(bannerpicdiv);
    bannercontent.append(bannertextdiv);
    
    block.append(bannercontent);
    

    if (queryString) {
        const urlParams = new URLSearchParams(queryString);

        console.log("Its preview time!");
        const cf = urlParams.get('cf')
        console.log(cf);
        let options = {};
        const aemauthorurl = 'https://author-p55117-e571178.adobeaemcloud.com';
        const aemurl = `/graphql/execute.json/securbank/OfferByPath;path=${cf};ts=${Math.random()*1000}`;
        let url = aemauthorurl + aemurl
        console.log(url);
        options = {credentials: "include"};
        
        const cfReq = fetch(url+"?ts="+Math.random()*1000, options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.data) {
                const cfList = data.data.offerByPath.item;
                console.log(cfList.headline);
                let newbannerpic = document.getElementsByClassName('banner-pic');
                newbannerpic[0].innerHTML = '<picture><img loading="lazy" alt="" type="image/jpeg" src="' + cfList.heroImage['_publishUrl'] + '" width="1600" height="634"></picture>';
                let newbannertext = document.getElementsByClassName('banner-text');
                newbannertext[0].innerHTML = '<p></p><p>' + cfList.headline + '</p><p>' + cfList.pretitle + '</p><p>' + cfList.detail['plaintext'] + '</p><p class="button-container"><a href="#" title="Find Out More" class="button primary">' + cfList.callToAction + '</a></p>';
            
            }
        })
        
    } else {

    }


}
