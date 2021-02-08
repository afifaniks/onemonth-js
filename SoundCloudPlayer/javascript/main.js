let SoundCloudAPI = {};

SoundCloudAPI.init = function() {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
      });
};

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(searchKey){
    SC.get('/tracks', {
        q: searchKey,
      }).then(function(tracks) {
        SoundCloudAPI.renderCards(tracks);
      });
};


SoundCloudAPI.renderCards = function(tracks) {
    // Remove previous nodes
    const container = document.querySelector(".js-search-results");
    container.innerHTML = "";

    tracks.forEach(function(track) {
        let card = document.createElement("div");
        card.classList.add("card");

        // Add image
        let imageContainer = document.createElement("div");
        imageContainer.classList.add("image");
        let img = document.createElement("img");
        img.className = "image_img";
        img.src = track.artwork_url;
        imageContainer.appendChild(img)
    
        // Add content
        let url = document.createElement("a");
        url.href = track.permalink_url;
        url.target = "_blank";
        url.innerHTML = track.title;
    
        let header = document.createElement("div")
        header.classList.add("header")
        header.appendChild(url);

        let contentContainer = document.createElement("div")
        contentContainer.classList.add("content")
        contentContainer.appendChild(header);
    
        // Add to playlist
        let icon = document.createElement("i")
        icon.classList.add("add", "icon");
        let span = document.createElement("span");
        span.innerHTML = "Add to playlist";
    
        let plContainer = document.createElement("div");
        plContainer.classList.add("ui", "bottom", "attached", "button", "js-button");
        plContainer.appendChild(icon);
        plContainer.appendChild(span);

        plContainer.addEventListener(
            'click',
            function() {
                SoundCloudAPI.play(url.href);
            }
        )

        // Add to root
        card.appendChild(imageContainer)
        card.appendChild(contentContainer)
        card.appendChild(plContainer);

        container.appendChild(card);
    });

}

SoundCloudAPI.play = function(url) {
  SC.oEmbed(url, {
  auto_play: true
}).then(function(embed){
  console.log('oEmbed response: ', embed);
  let sideBar = document.querySelector(".js-playlist");

  var box = document.createElement("div");
  box.innerHTML = embed.html;

  sideBar.insertBefore(box, sideBar.firstChild);
  // Saving playList locally
  localStorage.setItem("sideBar", sideBar.innerHTML);
});
}

const searchBtn = document.querySelector(".js-submit");
searchBtn.addEventListener('click', function() {
    const searchKey = document.querySelector(".js-search").value
    
    // Search with API
    SoundCloudAPI.getTrack(searchKey);
})

// Load sidebar
let sideBar = document.querySelector(".js-playlist");
sideBar.innerHTML = localStorage.getItem("sideBar");