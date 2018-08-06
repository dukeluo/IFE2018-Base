/**
 * @param       {number}  cash
 * @param       {number}  seat
 * @param       {Array}   staff
 * @constructor
 */
function Restaurant(cash, seat, staff) {
    this.cash = cash;
    this.seat = seat;
    this.staff = staff;
    this.bookedMeal = [];
    this.orderList = [];
}

/**
 * @param  {Staff} s
 * @return {void}
 */
Restaurant.prototype.recruitStaff = function (s) {
    if (!(s instanceof Staff)) {
        return ;
    }
    this.staff.push(s);
};

/**
 * @param  {number} id
 * @return {void}
 */
Restaurant.prototype.fireStaff = function (id) {
    if (typeof id !== "number") {
        return ;
    }
    this.staff = this.staff.filter(function (item, index, array) {
        return item.id !== id;
    });
};

/**
 * @param  {Order} o
 * @return {void}
 */
Restaurant.prototype.beginOrder = function (o) {
    this.bookedMeal = this.bookedMeal.concat(o.mealList);
    this.cash -= o.cost;
    this.seat -= o.seat;
    this.orderList.push(o);
}

/**
 * @param  {Order} o
 * @return {void}
 */
Restaurant.prototype.finishOrder = function (o) {
    this.cash += o.price;
    this.seat += o.seat;
}


/**
 * @param       {number} id
 * @param       {string} name
 * @param       {number} salary
 * @constructor
 */
function Staff(id, name, salary) {
    this.id = id;
    this.name = name;
    this.salary = salary;
}


/**
 * @param       {number} id
 * @param       {string} name
 * @param       {number} salary
 * @constructor
 */
function Waiter(id, name, salary) {
    Staff.call(this, id, name, salary);

}

Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;

/**
 *
 * @param  {number}       customerId
 * @param  {number}       seat
 * @param  {Array}        mealList
 * @param  {Restaurant}   r
 * @return {void}
 */
Waiter.prototype.submitOrder = function (customerId, seat, mealList, r) {
    var o = new Order(Date.now(), mealList, seat, mealList);

    r.beginOrder(o);
};
// TODO:
Waiter.prototype.serve = function (customerId) {
};


/**
 * @param       {number} id
 * @param       {string} name
 * @param       {number} salary
 * @constructor
 */
function Chef(id, name, salary) {
    Staff.call(this, id, name, salary);

}

Chef.prototype = Object.create(Staff.prototype);
Chef.prototype.constructor = Chef;
// TODO:
Chef.prototype.cook = function (m) {
};


/**
 * @param       {number}  id
 * @param       {number}  seat
 * @param       {Array}   mealList
 * @constructor
 */
function Customer(id, seat, mealList) {
    this.id = id;
    this.seat = seat;
    this.mealList = mealList;
}

Customer.prototype.order = function (w) {
    if (!(w instanceof Waiter)) {
        return ;
    }
    return w.submitOrder(this.id, this.seat, this.mealList);
};
// TODO: 
Customer.prototype.eat = function (r, m) {
};


/**
 * @param       {string} name
 * @param       {number} cost
 * @param       {number} price
 * @constructor
 */
function Meal(name, cost, price) {
    this.name = name;
    this.cost = cost;
    this.price = price;
}


/**
 * @param       {number} id
 * @param       {Array} mealList
 * @param       {number} seat
 * @param       {number} customerId
 * @constructor
 */
function Order(id, mealList, seat, customerId) {
    this.id = id;
    this.mealList = mealList;
    this.seat = seat;
    this.customerId = customerId;
    this.cost = mealList.reduce(function (prev, curr, index, array) {
        return curr.cost + prev.cost;
    });
    this.price = mealList.reduce(function (prev, curr, index, array) {
        return curr.price + prev.price;
    });
}



var ifeRestaurant = new Restaurant(1000000, 20, []);
var newCook = new Chef(1, "Tony", 10000);
console.log(newCook.constructor);

console.log(ifeRestaurant.staff);
ifeRestaurant.recruitStaff(newCook);
console.log(ifeRestaurant.staff);
ifeRestaurant.fireStaff(newCook.id);
console.log(ifeRestaurant.staff);
