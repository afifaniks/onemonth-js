const inputText = document.querySelector(".js-userinput");
const button = document.querySelector(".js-go");
let container = document.querySelector(".js-container");
let endpointURL = "http://api.giphy.com/v1/gifs/search?api_key=XTAK7GIzzJxjBgzTExuMKBjmV2fJE9IL&limit=20&q="

inputText.addEventListener(
    'keyup',
    function (e) {    
        if (e.key === "Enter")
            pushDOM();
    }
)

button.addEventListener(
    'click',
    function () {
        pushDOM();        
    }
)

function pushDOM() {
    const key = inputText.value;
    endpointURL += key;

    let ajaxCall = new XMLHttpRequest();
    ajaxCall.open('GET', endpointURL);
    ajaxCall.send();

    ajaxCall.addEventListener(
        'load',
        function(e) {
            const response = JSON.parse(e.target.response);
            response.data.forEach(element => {
                const imageURL = element.images.fixed_height.url;
                const child = document.createElement("img");
                child.src = imageURL;
                child.className = "container-image";
                
                container.appendChild(child);
            });
        }
    )
}
