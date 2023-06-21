class CarouselController {
    #images;
    #position

    constructor(data, images, prevButton, nextButton) {
        this.#images = images;
        this.#initializeCats(data);

        this.#position = 0;

        prevButton.on("click", this.#handlePrevButtonClick.bind(this));
        nextButton.on("click", this.#handleNextButtonClick.bind(this));
    }

    #initializeCats(data) {
        const catArray = JSON.parse(data);

        const html = catArray.map(value => {
                const cat = $(`<img alt="" src=${value.imageUrl} />`);

                cat.on("error", () => {
                    cat.attr('src', '../images/cat.webp');
                });

                console.log($(cat))

                return `<div class="catContainer">
                    ${cat.prop("outerHTML")}
                    <div class="description">
                        <span>Created: ${value.createdAt}</span>
                        <span>Author: ${value.author}</span>
                        <span>Author Link: ${value.authorLink}</span>
                    </div>
                </div>`
            }
        ).join('');

        this.#images.html(html);
    }

    #handlePrevButtonClick() {
        this.#position--;
        this.#changePosition();
    }

    #handleNextButtonClick() {
        this.#position++;
        this.#changePosition();
    }

    #changePosition = () => {
        if (this.#position > this.#images.children().length - 1) {
            this.#position = 0
        } else if (this.#position < 0) {
            this.#position = this.#images.children().length - 1;
        }

        this.#images.css('transform', `translateX(${-this.#position * 640}px)`);
    }
}