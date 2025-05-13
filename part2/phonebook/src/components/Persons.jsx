const Persons = ({ personsToShow }) => {
    return (
      <ul>
        {personsToShow.map((person, index) => (
          <li key={index}>
            {person.name} — {person.number}
          </li>
        ))}
      </ul>
    );
  };
  
  export default Persons;
  