import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";
import NeedVolunteerCard from "./NeedVolunteerCard";

const NeedVolunteer = () => {
  const data = useLoaderData();
  const [searchData, setSearchData] = useState(data);


const handleSearch = ()=>{
  const searchField = document.getElementById('search');
  const searchText = searchField.value;
  // console.log(searchText);
  fetch(`http://localhost:5174/search/${searchText}`)
  .then(res=> res.json())
  .then(data=>{
    setSearchData(data)
  })
}
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Volunteer Need Post|MAD</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="flex justify-center items-center">
        <input
          type="text"
          id = 'search'
          placeholder="Search Post-Title Here"
          className="input input-bordered w-full max-w-xs mr-2"
        />
        <button onClick={ handleSearch} className="btn btn-active btn-accent">Search</button>
      </div>
      <div className="md:grid md:grid-cols-3 gap-6 mt-20 ">
        {searchData?.map((i) => (
          <NeedVolunteerCard key={i._id} needCard={i}></NeedVolunteerCard>
        ))}
      </div>
    </div>
  );
};

export default NeedVolunteer;
