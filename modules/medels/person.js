const { v4 } = require('uuid');
class Person {
    id = 0;
    constructor(firstName, lastName, age, dayOfBirth, address, avatar) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.dayOfBirth = dayOfBirth;
        this.address = address;
        this.avatar = avatar;
        this.id = v4()
    }
}
class Address {
    constructor(region, city, addressLine1) {
        this.regionId = region;
        this.city = city;
        this.addressLine1 = addressLine1;
    }
}

module.exports = { Person, Address }