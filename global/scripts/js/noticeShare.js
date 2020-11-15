const facebook = document.querySelector('#facebook');
const twitter = document.querySelector('#twitter');
const whatsapp = document.querySelector('#whatsapp');
const url = window.location.href;
const description = document.querySelector('.twitter-description').content;

facebook.href = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
twitter.href = 'https://twitter.com/intent/tweet?url=' + url + '&text=' + description;
whatsapp.href = 'https://api.whatsapp.com/send?text=' + url;
