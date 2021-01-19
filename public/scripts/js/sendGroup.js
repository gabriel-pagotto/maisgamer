let step = 1;

const groupCard = document.querySelector('.group-card');
const sendGroup = document.querySelector('.send-group-submit');
const groupAdded = document.querySelector('.group-added');
const completedOptions = document.querySelector('.completed-options');

groupAdded.style.display = 'none';
completedOptions.style.display = 'none';
groupCard.style.display = 'none';
sendGroup.style.display = 'none';
sendGroup.addEventListener('click', sendGroupOnSubmit);

const searchGroupForm = document.querySelector('.search-group');
const searchGroupInput = document.querySelector('.search-data');
const groupSearch = document.querySelector('.group-search');
const searchLoader = document.querySelector('.search-loader');

const groupIcon = document.querySelector('.group-icon');
const groupName = document.querySelector('.header-name');
const groupDescription = document.querySelector('.group-card-description');
const setDescription = document.querySelector('.set-description');

const infos = document.querySelector('.groups-infos')

searchGroupForm.addEventListener('submit', sendData);

function sendData() {
  event.preventDefault();
  groupSearch.style.display = 'none';
  searchLoader.style.display = 'flex';
  const xhr = new XMLHttpRequest;

  xhr.open('get', `/gaming-groups/get-whatsapp-group-informations?link=${searchGroupInput.value}`);
  xhr.onload = () => {
    if (xhr.readyState === 4 & xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      groupIcon.src = response.icon;
      groupName.innerHTML = response.name;
      groupDescription.innerHTML = setDescription.value;

      searchLoader.style.display = 'none';
      infos.style.display = 'none'
      groupCard.style.display = 'block';
      sendGroup.style.display = 'block';
      return;
    } else {
      const response = JSON.parse(xhr.responseText);
      const searchError = document.querySelector('.search-error-show');

      groupSearch.style.display = 'block';
      searchLoader.style.display = 'none';

      console.log(response.error)
      if (response.error === 'The group link already exists') {
        return searchError.innerHTML = 'Este grupo já foi adicionado ao site.';
      }
      
      if (response.error === 'The group not exists') {
        return searchError.innerHTML = 'Este grupo não existe';
      }

      return searchError.innerHTML = 'O link está inválido'; 
    }
  }
  xhr.send();
}

let groupId;

function sendGroupOnSubmit() {
  const xhr = new XMLHttpRequest;

  xhr.open('post', '/gaming-groups/add');
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = () => {
    if (xhr.readyState === 4 & xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      groupId = response.id;

      groupCard.style.display = 'none';
      sendGroup.style.display = 'none'; 
      groupAdded.style.display = 'block';
      completedOptions.style.display = 'block';
      infos.style.display = 'none';

    } else {
      console.log(JSON.parse(xhr.response));
    }
  }

  const data = JSON.stringify({
    name: groupName.innerHTML,
    description: groupDescription.innerHTML,
    url: searchGroupInput.value,
    icon: groupIcon.src,
  })

  xhr.send(data);
}

const addAnotherGroup = document.querySelector('#add-another-group');
const seeGroup = document.querySelector('#see-group');

addAnotherGroup.addEventListener('click', () => window.location.reload());
seeGroup.addEventListener('click', () => {
  console.log('okay')
})