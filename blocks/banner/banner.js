/* eslint-disable dot-notation */
/* eslint-disable prefer-template */
/* eslint-disable-next-line dot-notation */
export default function decorate(block) {
  const queryString = window.location.search;
  const content = block.querySelector('div');

  const bannercontent = document.createElement('div');
  bannercontent.classList.add('banner-content');

  const bannertext = content.querySelector('div');
  const bannertextdiv = document.createElement('div');
  bannertextdiv.classList.add('banner-text');
  bannertextdiv.append(bannertext);

  const bannerpic = bannertext.querySelector('picture');
  const bannerpicdiv = document.createElement('div');
  bannerpicdiv.classList.add('banner-pic');
  bannerpicdiv.append(bannerpic);

  bannercontent.append(bannerpicdiv);
  bannercontent.append(bannertextdiv);
  block.append(bannercontent);

  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    const cf = urlParams.get('cf');
    let options = {};
    const aemauthorurl = 'https://author-p55117-e571178.adobeaemcloud.com';
    const aemurl = `/graphql/execute.json/securbank/OfferByPath;path=${cf};ts=${Math.random() * 1000}`;
    const url = aemauthorurl + aemurl;
    options = { credentials: 'include' };
    fetch(url + '?ts=' + Math.random() * 1000, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          const cfList = data.data.offerByPath.item;
          const newbannerpic = document.getElementsByClassName('banner-pic');
          newbannerpic[0].innerHTML = '<picture><img loading="lazy" alt="" type="image/jpeg" src="' + cfList.heroImage['_publishUrl'] + '" width="1600" height="634"></picture>';
          const newbannertext = document.getElementsByClassName('banner-text');
          newbannertext[0].innerHTML = '<p></p><p>' + cfList.headline + '</p><p>' + cfList.pretitle + '</p><p>' + cfList.detail['plaintext'] + '</p><p class="button-container"><a href="#" title="Find Out More" class="button primary">' + cfList.callToAction + '</a></p>';
        }
      });
  }
}
