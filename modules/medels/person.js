const { v4  }= require('uuid');
class Person {
    id = 0;
    constructor(firstName, lastName, age, dayOfBirth, address) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.dayOfBirth = dayOfBirth;
        this.address = address;
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
function uuidv4() {// GUID generator - unikalniy ID 
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
module.exports = { Person, Address }