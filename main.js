const $primary = document.querySelector('.wrapper');
const $orderPanel = createElem("div",["nav"]);

const checkedPizza = {
    obj: undefined,
    isRenderPanel: false,
    domElems: {},
    checkedOptions: {
        pizzaSize: undefined,
        sauce: undefined,
        price: undefined,
    },
    isShowResult: false,
}

const sauces = [
    "чесночный",
    "сырный",
    "кисло-сладкий",
    "кетчуп"
]

function changeCheckedPizza(obj) {
    if((checkedPizza.obj !== undefined) && (obj !== checkedPizza.obj)){
        if(checkedPizza.obj.$box.classList.contains("active")) {
            checkedPizza.obj.$box.classList.remove("active");
        }
    }
    checkedPizza.obj = obj;
}

function showOrderPanel() {
    if (!checkedPizza.isRenderPanel) {
        $primary.appendChild($orderPanel);
        checkedPizza.isRenderPanel = true;

        // size
        const $pizzaSize = createElem("select", [], {"name": "size", "id": "pizza_size"});
        $orderPanel.appendChild($pizzaSize);
        checkedPizza.domElems.$pizzaSize = $pizzaSize;

        // sauce
        const $sauce = createElem("select", [], {"name": "sauce", "id": "choose_sauce"});
        $orderPanel.appendChild($sauce);
        checkedPizza.domElems.$sauce = $sauce;

        // confirm
        const $button = createElem("button", []);
        $orderPanel.appendChild($button);
        checkedPizza.domElems.$button = $button;
    }

    // confirm
    checkedPizza.domElems.$button.innerText = "заказать";
    checkedPizza.domElems.$button.disabled = true;
    checkedPizza.domElems.$button.addEventListener("click", () => {
            checkedPizza.checkedOptions.pizzaSize = checkedPizza.domElems.$pizzaSize.value;
            checkedPizza.checkedOptions.sauce = checkedPizza.domElems.$sauce.value;
            checkedPizza.obj.options.forEach((elem) => {
                if(elem.size == checkedPizza.checkedOptions.pizzaSize){
                    checkedPizza.checkedOptions.price = elem.price;
                }
            });
            checkedPizza.isShowResult = true;
            const $back_result = createElem("div",["order_back"]);
            const $order_result = createElem("div",["order_result"]);
            $primary.appendChild($back_result);
            $primary.appendChild($order_result);
            const $pizza_name = createElem("p",[]);
            $pizza_name.innerText = checkedPizza.obj.name;
            const $pizza_size = createElem("p",[]);
            $pizza_size.innerText = checkedPizza.checkedOptions.pizzaSize;
            const $sauce = createElem("p",[]);
            $sauce.innerText = checkedPizza.checkedOptions.sauce;
            const $price = createElem("p",[]);
            $price.innerText = checkedPizza.checkedOptions.price;
            $order_result.appendChild($pizza_name);
            $order_result.appendChild($pizza_size);
            $order_result.appendChild($price);
            $order_result.appendChild($sauce);

            $back_result.addEventListener("click", ()=>{
                const $back_order = document.querySelector('.order_back');
                const $order = document.querySelector('.order_result');
                $back_order.remove();
                $order.remove();
            })
    })

    // sauce
    removeAllChildNodes(checkedPizza.domElems.$sauce); // delete old child
    checkedPizza.domElems.$sauce.addEventListener("click", () => {
        checkedPizza.domElems.$button.disabled = false;
    })
    sauces.forEach((elem) => {
        const $opt = createElem("option", [], {"value": elem});
        checkedPizza.domElems.$sauce.appendChild($opt);
        $opt.text = elem;
    });
    checkedPizza.domElems.$sauce.disabled = true;

    // size
    removeAllChildNodes(checkedPizza.domElems.$pizzaSize); // delete old child
    checkedPizza.domElems.$pizzaSize.addEventListener("click", () => {
        checkedPizza.domElems.$sauce.disabled = false;
    })
    checkedPizza.obj.options.forEach((elem) => {
        const $opt = createElem("option", [], {"value": elem.size});
        checkedPizza.domElems.$pizzaSize.appendChild($opt);
        $opt.text = elem.size;
    });
}

const PizzaConstructor = function(isAvailable, name, options, image){
    this.isAvailable = isAvailable;
    this.name = name;
    this.imageSrc = image;
    this.options = [];
    options.forEach((elem) => {
        const obj = {...elem};
        this.options.push(obj);
    });
    this.createDomEl = function () {
        const $box = createElem("div", ["box"]);
        this.$box = $box;
        $box.addEventListener("click", () => {
            $box.classList.add("active");
            changeCheckedPizza(this);
            showOrderPanel();
        })
        const $title = createElem("p", ["title"]);
        const $node = document.createTextNode(this.name);
        $title.appendChild($node);
        const $img = createElem("img", [], {"src": this.imageSrc});
        $box.appendChild($title);
        $box.appendChild($img);
        $primary.appendChild($box);
    }
    this.createDomEl();
}

function createElem(type, classes, otherProp){
    const $elem = document.createElement(type);
    classes.forEach((className) => {
        $elem.classList.add(className);
    })
    if(otherProp !== undefined){
        Object.entries(otherProp).forEach(([key, value]) => $elem[key] = value);
    }
    return $elem
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

let pizza1 = new PizzaConstructor(true, "peperroni", [
        {size: 21, price: 200},
        {size: 26, price: 300},
        {size: 31, price: 320},
        {size: 45, price: 340},
    ],
    "https://magillo.pl/wp-content/uploads/2019/10/magillo-pizza.png"
);
let pizza2 = new PizzaConstructor(true, "margarita", [
        {size: 21, price: 200},
        {size: 26, price: 300},
        {size: 31, price: 320},
        {size: 45, price: 340},
    ],
    "https://pizzafeliciana.pl/assets/gfx/pizza/pizza-feliciana-margherita-600.png"
);
let pizza3 = new PizzaConstructor(true, "4 cheeses", [
        {size: 21, price: 300},
        {size: 26, price: 400},
        {size: 31, price: 520},
        {size: 45, price: 740},
    ],
    "https://pizzapapas.ru/image/cache/catalog/1pizza/4syra-500x500.png"
);
let pizza4 = new PizzaConstructor(true, "peperroni2", [
        {size: 21, price: 100},
        {size: 26, price: 200},
        {size: 31, price: 220},
        {size: 45, price: 240},
    ],
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr6sKyR3d67JHmK-hZ1W1esNqLs6Xen3ZfXQ&usqp=CAU"
);
