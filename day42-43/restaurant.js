function Restaurant() {
    this.cost = 0;
    this.seats = [];
    this.staffs = [];
}

Restaurant.prototype.recruitStaff = function () {

};

Restaurant.prototype.fireStaff = function () {

};

function Staff(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
}

Staff.prototype.finishWork = function () {

};

function Waiter() {

}

Waiter.prototype = new Staff();
Waiter.prototype.constructor = Waiter;

function Chef() {

}

Chef.prototype = new Staff();
Chef.prototype.constructor = Chef;

function Customer() {

}

Customer.prototype.order = function () {

};

Customer.prototype.eat = function () {

};

function Meal(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}
