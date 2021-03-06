const form = document.querySelector('form');
const name = document.querySelector('#name');
const price = document.querySelector('#price');
const error = document.querySelector('#error');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent to submit empty form
  if(name.value && parseInt(price.value)) {
    const item = {
        name: name.value,
        price: parseInt(price.value) // type number
    }

    // Send to db in promise then reset fields
    db.collection('spending').add(item).then(res => {
        error.textContent = "";
        name.value = "";
        price.value = "";
  });

  } else {
      if(!parseInt(price.value) && name.value){
        error.textContent = 'Please add a number as price';
      }
      else {
        error.textContent = 'Fill in both fields to continue';
      }
  }
})