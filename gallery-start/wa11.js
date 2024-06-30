const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */


const images = ['../img/elliecomo2.jpeg', `../img/gizmo2.jpeg`, `./wa6/balloon-sq1.jpg`, `../wa6/balloon-sq2.jpg`, `../wa6/balloon-sq3.jpg`];
const alts = {
  '../img/elliecomo2.jpeg' : 'Ellie in Lake Como',
  '../img/gizmo2.jpeg' : 'Gizmo',
  '../wa6/balloon-sq1.jpg' : 'Purple and white pansies',
  '../wa6/balloon-sq2.jpg' : 'Section of wall from a pharoah\'s tomb',
  '../wa6/balloon-sq3.jpg' : 'Large moth on a leaf'
}

/* Looping through images */

const newImage = document.createElement('img');
newImage.setAttribute('src', xxx);
newImage.setAttribute('alt', xxx);
thumbBar.appendChild(newImage);

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
    const btnClass = btn.getAttribute('class');
    if (btnClass === 'dark') {
      btn.setAttribute('class','light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
      btn.setAttribute('class','dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
  });
