let colorChange = document.querySelector("input[type=checkbox]");
let body = document.querySelector('body');
let input = document.querySelector('.input-dictionary');
let select = document.querySelector('.custom-select');
let audio = document.querySelector('.audio')
let playBtn = document.querySelector('.dictionary__info-audio')
let error__wrapper = document.querySelector('.dictionary__error-wrapper')
let main__wrapper = document.querySelector('.dictionary__main-wrapper')


////////////////////// theme swither /////////////////////////////////

colorChange.addEventListener('change', function() {
    if (this.checked) {
      body.style.backgroundColor = '#050505'
     
      input.style.background = '#1F1F1F'
      input.style.color = 'white'
      select.style.backgroundColor = '#050505'
      select.style.color = '#FFFFFF';
      document.documentElement.style.setProperty('--main-color', 'white');
      document.querySelector('.dictionary__error-title').style.color = 'white'
       
      
    } else {
        body.style.backgroundColor = 'white'
        input.style.background = '#F4F4F4'
        input.style.color = '#2D2D2D'
        select.style.backgroundColor = 'white'
      select.style.color = '#2D2D2D'
      document.documentElement.style.setProperty('--main-color', '#2D2D2D');
      
      document.querySelector('.dictionary__error-title').style.color = '#2D2D2D'
    }
  });


  



//////////////////////////// font switcher ///////////////////////////////////////////////////


select.addEventListener('change' , () => {

  switch(select.value) {
    case 'mono':
      body.style.fontFamily = 'monospace';
      break;
    case 'sans':
      body.style.fontFamily = 'sans-serif';
      break;
    case 'serif':
      body.style.fontFamily = 'serif';
      break;
  }
})




///////////////////////////////////// word input search ///////////////////////////////////////////

  let word = {
    fetchWord: function (word) {
      fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}` 
          
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error( 
              error__wrapper.style.display = 'block',
              main__wrapper.style.display = 'none'
             
           
             
            ) ;
          }else {
            error__wrapper.style.display = 'none',
            main__wrapper.style.display = 'block'
          }
          return response.json();
        })
        .then((data) => this.displayInfo(data));
    },
    displayInfo: function (data) {
     
     let ul = document.querySelector('.list');
     let verb__list = document.querySelector('.verb__list')
     document.querySelector(".dictionary__info-h1").innerText = data[0].word;


     document.querySelector(".dictionary__info-trs").innerText = data[0].phonetics[0].text ? data[0].phonetics[0].text : data[0].phonetics[1].text;  

    

     document.querySelector(".dictionary__noun-syn").innerText = data[0].meanings[0].synonyms;
     document.querySelector('#source__link').innerText = data[0].sourceUrls[0];

     let audioArr = ''
     data[0].phonetics.forEach(item=> {
      if(item.audio) {
        return audioArr = item.audio
      }
     })
     
     audio.setAttribute('src', audioArr)
  
   
     console.log(audioArr)
    let newArr = data[0].meanings[0].definitions;

        let newURL = data[0].sourceUrls[0];
        document.getElementById("source__link").href = newURL;

     newArr.map((item) => {
        if(item.example) {
         
          document.querySelector('.verb__meaning').innerText = item.example;
        } 
     })
     

      let noneArr = data[0].meanings[0].partOfSpeech === 'noun' ? data[0].meanings[0].definitions : []; 

      let verbArr = data[0].meanings[0].partOfSpeech === 'verb' ? data[0].meanings[0].definitions : [];
      let verbArrCheck = data[0].meanings[1] !== undefined ? data[0].meanings[1].definitions : [];
      
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

   
      if(verbArr !== []) {
        verb(verbArr)
      }else {
        verb(verbArrCheck)
      }
    
   
          verb(verbArrCheck);
      
     

    
      

    },
    search: function () {
      if(document.querySelector(".input-dictionary").value) {
        this.fetchWord(document.querySelector(".input-dictionary").value);
      }else {
        document.querySelector(".input-dictionary-error").style.display = 'block'
        document.querySelector(".input-dictionary").style.border = '1px solid #FF5252';
      }
    
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


    ///////////////////////////////////////////// Audio ///////////////////////////////////////////
    playBtn.addEventListener('click', () => {
      play();
    })

    function play() {
      audio.play();
    }
  
  word.fetchWord('hello');