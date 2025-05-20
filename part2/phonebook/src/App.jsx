import { useState, useEffect } from "react";
import personService from './services/persons';

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`);
    if (!confirmDelete) return;

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
      })
      .catch(error => {
        alert(`The person '${name}' was already removed from server.`);
        setPersons(persons.filter(person => person.id !== id));
      });
  };

 const addPerson = (event) => {
  event.preventDefault();

  const existingPerson = persons.find((person) => person.name === newName);

  if (existingPerson) {
    const confirmUpdate = window.confirm(
      `${newName} is already added to phonebook. Replace the old number with a new one?`
    );

    if (confirmUpdate) {
      const updatedPerson = { ...existingPerson, number: newNumber };

      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p =>
            p.id !== existingPerson.id ? p : returnedPerson
          ));
          setNewName("");
          setNewNumber("");
        })
        .catch(error => {
          alert(`Information of ${newName} has already been removed from the server.`);
          setPersons(persons.filter(p => p.id !== existingPerson.id));
        });

      return;
    } else {
      return; 
    }
  }

  const nameObject = {
    name: newName,
    number: newNumber,
  };

  personService
    .create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
};


  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>

      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <Persons 
        personsToShow={personsToShow}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;

