const creShowCard = (show) => {
      const card = document.createElement("article");
      card.classList.add("show-card");

      const  infoShow = document.createElement("article");
      infoShow.classList.add("show-info");

      const showid = document.createElement("h3");
      showid.classList.add("show-id");
      showid.textContent = show.id;

      const showidL = document.createElement("hr");

      const name = document.createElement("h2");
      name.classList.add("show-name");
      name.textContent = show.name;

      const daysArt = document.createElement("article");
      daysArt.classList.add("show-days");
      
      const scheduleDays = show.schedule.days;
      scheduleDays.forEach((day)=> {
            const daySpan = document.createElement("span");
            daySpan.classList.add("show-day", day);
            daySpan.textContent = day;
            daysArt.appendChild(daySpan);
      })

      infoShow.appendChild(showid);
      infoShow.appendChild(showidL);
      infoShow.appendChild(name);
      infoShow.appendChild(daysArt);

      const imageContainer = document.createElement("article");
      imageContainer.classList.add("show-image-container");

      const image = document.createElement("img");
      image.classList.add("show-image");
      image.src = show.image.original;
      image.alt = show.name;

      imageContainer.appendChild(image);

      card.appendChild(infoShow);
      card.appendChild(imageContainer);

      return card;
}

const loadShows = async () => {
      const showType = document.getElementById("show-search").value.toLowerCase();
      try {
            const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${showType}`);
            
            const shows   = response.data;

            const showGrid = document.getElementById("show-grid");
            showGrid.innerHTML="";

            for ( const show of shows ) {
                  const onlyShowInf=show.show;
                  const showCard = creShowCard(onlyShowInf);
                  showGrid.appendChild(showCard); 

                  const showAllId = showGrid.querySelectorAll("h3.show-id");
                                    
                  const theTitleP=document.getElementById("showTitle");
                  theTitleP.innerHTML = " Click in the Show Number";

                  showAllId.forEach( (idElementArray) => {
                        idElementArray.addEventListener("click", function(e) {
                              const selectedShow = idElementArray.textContent; 
                              const selectedNr   = idElementArray.nextSibling;
                              const selectedName = selectedNr.nextSibling.textContent;                         
                              sessionStorage.setItem("selectedShow", selectedShow);
                              sessionStorage.setItem("selectedName", selectedName);
                              location.href ="moredata.html";
                        }) 
                  })
            }
      }catch (error) {
            console.log(error);
      }           
}   

document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("search-button").addEventListener("click", function(e) {
            loadShows();
      })
})     