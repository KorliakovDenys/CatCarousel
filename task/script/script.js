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
            const catContainer = document.createElement("div")
            catContainer.classList.add("catContainer")

            const catImage = document.createElement("img")
            catImage.src = catArray[index].imageUrl;
            catImage.onerror = ()=>{
                catImage.src = "images/cat.webp"
            }
            catContainer.appendChild(catImage);

            const catDescription = document.createElement("div");
            catDescription.classList.add("description")

            const createdAt = document.createElement("span");
            const author = document.createElement("span");
            const authorLink = document.createElement("span");

            createdAt.textContent = "Created: " + catArray[index].createdAt;
            author.textContent = "Author: " + catArray[index].author;
            authorLink.textContent = "Author Link: " + catArray[index].authorLink;

            catDescription.appendChild(createdAt)
            catDescription.appendChild(author)
            catDescription.appendChild(authorLink)

            catContainer.appendChild(catDescription)

            this.#images.appendChild(catContainer);
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








