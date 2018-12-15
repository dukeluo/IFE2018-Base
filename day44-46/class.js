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
    this.mealQueue = [];
    this.orderQueue = [];
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
 * @param  {Staff} s
 * @return {void}
 */

Restaurant.prototype.fireStaff = function (s) {
    if (!(s instanceof Staff)) {
        return ;
    }

    this.staff = this.staff.filter(function (item, index, array) {
        return !item.isSame(s);
    });
};

/**
 * @return {number} the id of the processing order
 */
Restaurant.prototype.beginOrder = function () {
    var targetOrder = this.orderQueue.shift(),
        mealList = targetOrder.mealList,
        processingMealObject,
        i;

    this.cash -= targetOrder.cost;
    this.seat -= targetOrder.seat;
    for (i = 0; i < mealList.length; i++) {
        processingMealObject = {};
        processingMealObject.meal = mealList[i];
        processingMealObject.customer = customerId;
        this.orderQueue.push(processingMealObject);
    }
    return targetOrder.id;
}

/**
 *
 * @param  {number} orderID
 * @return {void}
 */
Restaurant.prototype.finishOrder = function (orderID) {
    var targetOrder,
        i;

    if (typeof +orderID !== "number") {
        return ;
    }
    for (i = 0; i < this.orderQueue.length; i++) {
        if (orderID === this.orderQueue[i].id) {
            targetOrder = this.orderQueue[i];
            break;
        }
    }
    if (!targetOrder) {
        console.error("No this order: " + orderID);
    }
    this.cash += targetOrder.price;
    this.seat += targetOrder.seat;
    this.orderQueue = this.orderQueue.filter(function (item, index, array) {
        return !item.isSame(targetOrder);
    });
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
 * @param  {Staff} s
 * @return {boolean}
 */
Staff.prototype.isSame = function (s) {
    return areObjectsSame(this, s);
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
    var newOrder = new Order(Date.now(), mealList, seat, customerId);

    r.orderQueue.push(newOrder);
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

Customer.prototype.orderMeals = function (w, r) {
    if (!(w instanceof Waiter) || !(r instanceof Restaurant)) {
        return ;
    }
    return w.submitOrder(this.id, this.seat, this.mealList, r);
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
 * @param       {Array} mealList    an array of Meal
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

/**
 *
 * @param  {order} o
 * @return {boolean}
 */
Order.prototype.isSame = function (o) {
    return areObjectsSame(this, o);
}


/**
 * Helper Function
 * Determine if the two objects are the same
 * @param  {Object} a
 * @param  {Object} b
 * @return {boolean}
 */
function areObjectsSame(a, b) {
    var keys = Object.keys(a),
        length = keys.length,
        key;

    if (Object.keys(b).length !== length) {
        return false;
    }
    while (length--) {
        key = keys[length];
        if (!(b.hasOwnProperty(key)) && b.key !== a.key) {
            return false;
        }
    }
    return true;
}

// var ifeRestaurant = new Restaurant(1000000, 20, []);
// var newCook = new Chef(1, "Tony", 10000);
//
// console.log(newCook.constructor);     // [Function: Chef]
// console.log(ifeRestaurant.staff);     // []
// ifeRestaurant.recruitStaff(newCook);
// console.log(ifeRestaurant.staff);     // [ Chef { id: 1, name: 'Tony', salary: 10000 } ]
// ifeRestaurant.fireStaff(newCook);
// console.log(ifeRestaurant.staff);     // []
