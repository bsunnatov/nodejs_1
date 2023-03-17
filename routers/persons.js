const express = require('express')
const fs = require('fs');
const { Person, Address } = require('../modules/medels/person');
const personsRouter = express.Router();
personsRouter.post('/', function (req, res) {
    const { firstName, lastName, age, dayOfBirth, address, avatar } = req.body;

    const person_string = fs.readFileSync('person.json', 'utf-8');
    const persons = [...JSON.parse(person_string)];
    persons.push(new Person(firstName, lastName, age, dayOfBirth,
        new Address(address?.regionId, '', address?.addressLine1),
        avatar
    ));
    fs.writeFileSync('person.json', JSON.stringify(persons));
    res.status(200)
    res.setHeader('Content-Type', 'application/json')
    res.json({ message: `${firstName}, ${lastName} bazaga saqlandi` });
})
personsRouter.get('/:id', function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.send(`person Id - ${req.params.id} person bazadan topildi`);
})
personsRouter.put('/:id', function (req, res) {
    const { firstName, lastName, age, dayOfBirth, address, avatar } = req.body;
    const person_string = fs.readFileSync('person.json', 'utf-8');
    const persons = [...JSON.parse(person_string)];
    const item = persons.find(a => a.id === req.params.id);
    item.firstName = firstName;
    item.lastName = lastName;
    item.age = age;
    item.address = address;
    item.dayOfBirth = dayOfBirth;
    item.avatar = avatar;
    fs.writeFileSync('person.json', JSON.stringify(persons));
    res.send(`person with Id - ${req.params.id} update...`);
})
personsRouter.delete('/:id', function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    const person_string = fs.readFileSync('person.json', 'utf-8');
    const persons = [...JSON.parse(person_string)];
    const index = persons.findIndex(a => a.id === req.params.id);
    persons.splice(index, 1);
    fs.writeFileSync('person.json', JSON.stringify(persons));
    res.send(`person Id - ${req.params.id} person bazadan uchirildi`);
})

personsRouter.get('/', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    const persons = fs.readFileSync('person.json', 'utf-8')
    res.send(persons);
})
module.exports = personsRouter