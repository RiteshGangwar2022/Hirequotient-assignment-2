import React, { useEffect, useState } from "react";
import Pages from "./components/Pages";
import axios from "axios";

const App = () => {

  const [data, setdata] = useState([]);
 
  //fetching data from provided API
  const fetchdata = async () => {
    const res = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    setdata(res.data);
  };

  useEffect(() => {
    fetchdata();
  },[]);

  return (
    <div>
      <Pages data={data} setdata={setdata} />
    </div>
  );
};

export default App;
