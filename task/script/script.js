class CarouselController {
    #images;
    #prevButton;
    #nextButton;
    #position
    constructor(data) {
        this.#images = document.getElementById("images");
        this.#initializeCats(data);

        this.#position = 0;

        this.#prevButton = document.getElementById("prev");
        this.#nextButton = document.getElementById("next");

        this.#prevButton.addEventListener("click", this.#handlePrevButtonClick.bind(this));
        this.#nextButton.addEventListener("click", this.#handleNextButtonClick.bind(this));
    }

    #initializeCats(data){
        const catArray = JSON.parse(data);

        for (const index in catArray) {
            const catImage = document.createElement("img")
            catImage.src = catArray[index].imageUrl;
            catImage.onerror = ()=>{
                catImage.src = "images/cat.webp"
            }
            this.#images.appendChild(catImage);
        }
        console.log("initialized")
    }

    #handlePrevButtonClick(event) {
        console.log("prev btn clicked")
        this.#position--;
        this.#changePosition();
    }

    #handleNextButtonClick(event) {
        console.log("next btn clicked")
        this.#position++;
        this.#changePosition();
    }

    #changePosition = () => {
        if (this.#position > this.#images.children.length - 1) {
            this.#position = 0
        } else if (this.#position < 0) {
            this.#position = this.#images.children.length - 1;
        }

        this.#images.style.transform = `translateX(${-this.#position * 640}px)`;
        console.log("pos changed")
    }
}

window.addEventListener("DOMContentLoaded", (event)=>{
    new CarouselController(imagesJson);
})








