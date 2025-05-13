import { useState } from "react";

import Filter from "./components/Filter";
import PersonsForm from "./components/PersonForm";
import Persons from "./components/Persons";


const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

     <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonsForm 
      newName = {newName}
      newNumber = {newNumber}
      handleNameChange = {handleNameChange}
      handleNumberChange = {handleNumberChange}
      addPerson = {addPerson}
      />

      <h2>Numbers</h2>

      <Persons 
       personsToShow={persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )}
      />

      
    </div>
  );
};

export default App;
