let colorChange = document.querySelector("input[type=checkbox]");
let body = document.querySelector('body');
let input = document.querySelector('.input-dictionary');
let select = document.querySelector('.custom-select');


colorChange.addEventListener('change', function() {
    if (this.checked) {
      body.style.backgroundColor = '#050505'
      input.style.background = '#1F1F1F'
      input.style.color = 'white'
      select.style.backgroundColor = '#050505'
      select.style.color = '#FFFFFF';
      document.documentElement.style.setProperty('--main-color', 'white');
      
    } else {
        body.style.backgroundColor = 'white'
        input.style.background = '#F4F4F4'
        input.style.color = '#2D2D2D'
        select.style.backgroundColor = 'white'
      select.style.color = '#2D2D2D'
      document.documentElement.style.setProperty('--main-color', '#2D2D2D');
    }
  });





  let word = {
    fetchWord: function (word) {
      fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}` 
          
      )
        .then((response) => {
          if (!response.ok) {
            alert("No word found.");
            throw new Error("No word found.");
          }
          return response.json();
        })
        .then((data) => this.displayInfo(data));
    },
    displayInfo: function (data) {
      console.log(data[0].phonetics[0])
      let ul = document.querySelector('.list');
      let verb__list = document.querySelector('.verb__list')
      document.querySelector(".dictionary__info-h1").innerText = data[0].word;


      document.querySelector(".dictionary__info-trs").innerText = data[0].phonetics[0].text ? data[0].phonetics[0].text : data[0].phonetics[1].text;  // need to fix //

     

      document.querySelector(".dictionary__noun-syn").innerText = data[0].meanings[0].synonyms;
      document.querySelector('.source__link').innerText = data[0].sourceUrls[0];


      // if(data[0].meanings[2].definitions[0].example) {
      //   document.querySelector('.verb__meaning').innerText = data[0].meanings[2].definitions[0].example;
      // } else {
      //   document.querySelector('.verb__meaning').innerText = 'There is no examples'
      // }   // need to fix //


     
     

      let noneArr = data[0].meanings[0].partOfSpeech === 'noun' ? data[0].meanings[0].definitions : []; 
      let verbArr = data[0].meanings[0].partOfSpeech === 'verb' ? data[0].meanings[0].definitions : data[0].meanings[1].definitions;


    


      let listItem = document.querySelectorAll('.list__item');

      listItem.forEach((item) => {
        item.remove()
      })
      
    
       
      
    function noun(arr) {
      arr.map((item) => {
      
          
          const newLi = document.createElement("li");
          const newContent = document.createTextNode(item.definition);
          newLi.appendChild(newContent);
          newLi.classList.add('list__item')
          ul.append(newLi)

    })
    }
        
    noun(noneArr);

    function verb(arr) {
      arr.map((item) => {
      
          
          const newLi = document.createElement("li");
          const newContent = document.createTextNode(item.definition);
          newLi.appendChild(newContent);
          newLi.classList.add('list__item')
          verb__list.append(newLi)

    })
    }
        
    verb(verbArr);
     

    
      

    },
    search: function () {
      this.fetchWord(document.querySelector(".input-dictionary").value);
    },
  };
  
  document.querySelector(".dictionary__input-search").addEventListener("click", function () {
    word.search();
  }); 
  
  document
    .querySelector(".input-dictionary")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        word.search();
        
      
      }
    });
  
  word.fetchWord("study");