import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import "slim-select/dist/slimselect.css";
import Notiflix from 'notiflix';



const refs = {
  select:  document.querySelector('.breed-select'),
  load: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInformation: document.querySelector('.cat-info'),
}
const {select,load,error,catInformation} = refs;

error.classList.add('is-hidden');


function getCatslist(data) {
  select.insertAdjacentHTML('beforeend', data.map((cat) => `<option value="${cat.id}">${cat.name}</option>`).join('\n'));
  
}

function catBreedMarkup (data){
  const infoAbtCat = data[0].breeds;
  const catImg = data[0];
catInformation.innerHTML = (infoAbtCat.map(({name,description,temperament}) =>
`<img src="${catImg.url}" alt="${name} width=500">
<ul class="js-list">
<li class="js-list-item"><h2 class="js-text js-cat-name">${name}</h2></li>
<li class="js-list-item"><h3 class="js-text">${description}</h3></li>
<li class="js-list-item"><h3 class="js-text"><span class="js-text js-span-text">Temperametn:</span>${temperament}</h3></li>
</ul>`).join(''))
}

function fetchCats (){
  fetchBreeds()
  .then((data) => {
    getCatslist(data);
    new SlimSelect ({select: `.breed-select` });
  })
  .catch(()=>  {
    Notiflix.Notify.failure(
      `Oops! Something went wrong! Try reloading the page!`,
      { timeout: 4000, userIcon: false }
    );
  })
  .finally(() => load.classList.add('is-hidden'))
}


select.addEventListener('change',onSelect);
function onSelect(evt) {
  evt.preventDefault();
  fetchCatByBreed(select.value)
  .then(data => catBreedMarkup(data))
  .catch(()=>  {
    Notiflix.Notify.failure(
      `Oops! Something went wrong! Try reloading the page!`,
      { timeout: 4000, userIcon: false }
    );
  })
  .finally(() => load.classList.add('is-hidden'))

}

fetchCats();  


