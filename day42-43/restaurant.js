/**
 * @param       {number} cash
 * @param       {number} seats
 * @param       {Array} staff
 * @param       {Array} bookedMeal
 * @constructor
 */
function Restaurant(cash, seats, staff, bookedMeal) {
    this.cash = cash;
    this.seats = seats;
    this.staff = staff;
    this.bookedMeal = bookedMeal;
}

/**
 * @param  {Staff} p
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
    this.seats -= o.seats;
}

/**
 * @param  {Order} o
 * @return {void}
 */
Restaurant.prototype.finishOrder = function (o) {
    this.cash += o.price;
    this.seats += o.seats;
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


function Waiter(id, name, salary) {
    Staff.call(this, id, name, salary);

}

// Waiter.prototype = new Staff();
Waiter.prototype = Object.create(Staff.prototype);
Waiter.prototype.constructor = Waiter;
Waiter.prototype.finishWork = function (a) {
    if (isArray(a)) {
        return order(a);
    } else {
        return serve();
    }
}


function Chef(id, name, salary) {
    Staff.call(this, id, name, salary);

}

Chef.prototype = new Staff();
Chef.prototype.constructor = Chef;
Chef.prototype.finishWork = function (a) {
    return cook(a);
}


/**
 * @param       {number} id
 * @param       {Array} m
 * @constructor
 */
function Customer(id, m) {
    this.id = id;
    this.mealList = mealList;
}

Customer.prototype.order = function (r, m) {
    if (!(r instanceof Restaurant)
        || !(m instanceof Meal)) {
          return ;
    }
    this.mealList.push(m);
    r.beginOrder(m);
};

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
 * @param       {number} seats
 * @param       {number} customerId
 * @constructor
 */
function Order(id, mealList, seats, customerId) {
    this.id = id;
    this.mealList = mealList;
    this.seats = seats;
    this.customerId = customerId;
    this.cost = mealList.reduce(function (prev, curr, index, array) {
        return curr.cost + prev.cost;
    });
    this.price = mealList.reduce(function (prev, curr, index, array) {
        return curr.price + prev.price;
    });
}
