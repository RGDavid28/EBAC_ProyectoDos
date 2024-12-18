const creCastCard = (cast) => {
      const card = document.createElement("article");
      card.classList.add("cast-card");

      const  infoCast = document.createElement("article");
      infoCast.classList.add("cast-info");


      const namePeopleT = document.createElement("h2");
      namePeopleT.classList.add("cast-nameT");
      namePeopleT.textContent = "Person Name: ";

      const namePeople = document.createElement("h2");
      namePeople.classList.add("cast-name");
      namePeople.textContent = cast.person.name;

      const nameCharacterT = document.createElement("h2");
      nameCharacterT.classList.add("cast-characterT");
      nameCharacterT.textContent = "Character : ";

      const nameCharacter = document.createElement("h2");
      nameCharacter.classList.add("cast-character");
      nameCharacter.textContent = cast.character.name;

      infoCast.appendChild(namePeopleT);
      infoCast.appendChild(namePeople);

      infoCast.appendChild(nameCharacterT);
      infoCast.appendChild(nameCharacter);

      const imageContainer = document.createElement("article");
      imageContainer.classList.add("cast-image-container");

      const image = document.createElement("img");
      image.classList.add("cast-image");
      image.src = cast.person.image.original;
      image.alt = cast.person.name;

      imageContainer.appendChild(image);

      card.appendChild(infoCast);
      card.appendChild(imageContainer);

      return card;
}

function castPrincipal(selectedShowA) {
     
      fetch(`https://api.tvmaze.com/shows/${selectedShowA}/cast`)
      .then((response) => response.json())
      .then((data) => {
            const castGrid = document.getElementById("cast-grid");
            castGrid.innerHTML="";
            if (Array.isArray(data) && data.length === 0) {

                  const card = document.createElement("article");
                  card.classList.add("cast-card");
                             
                  const emptyMessage = document.createElement("h1");
                  emptyMessage.classList.add("message");
                  emptyMessage.textContent = "There isn't CAST information";
                  castGrid.appendChild(emptyMessage);
                                                                 
            }else{                                    
                  data.forEach((cast) => {
                        const castPeopleName= cast.person.name;
                        const castCard = creCastCard(cast);
                        castGrid.appendChild(castCard); 
                  }) 
            }      
      })      
                        
      .catch((error) => {
            console.log(error);
      })           
}

const selectedShowA = sessionStorage.getItem("selectedShow");
const selectedNameA = sessionStorage.getItem("selectedName");

const theTitle=document.getElementById("principalTitle");
theTitle.innerHTML = selectedNameA + " - Cast";
castPrincipal(selectedShowA);