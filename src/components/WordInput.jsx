import axios from "axios";
import { useEffect, useState } from "react";
import style from "./style.css";
const WordInput = () => {
  //state to store input data
  const [inputStore, setInputStore] = useState("");

  //to save data coming from api
  const [storeData, setStoreData] = useState([]);

  //to make sure data is loading
  const [loading, setLoading] = useState(false)

  //function to get apis data
  const getDicData = async () => {
    
    
   if(inputStore.length<=0){
       alert("Hello")
   }else{
    setLoading(true)
    let words = await axios.get(
        "https://api.dictionaryapi.dev/api/v2/entries/en/" + inputStore
      );
      // console.log(words.data);
      setStoreData(words.data);
     setLoading(false)
   }
    // setStoreData("")
  };
//   useEffect(() => {
//     getDicData();
//   }, []);

  //function to handle input field
  const inputHandler = (e) => {
    let inputdata = e.target.value;
    setInputStore(inputdata);
  };
  return (
    <div className="main">
    {/* input start */}
    <div className="input">
          <input
            type="text"
            placeholder="Enter Word"
            value={inputStore}
            onChange={inputHandler}
          />{" "}
          <span >
            <button disabled={loading} onClick={getDicData} className="btn">Search</button>
          </span>
        </div>
        {/* input section end */}

    {
        loading?"Data is Loading...":
      <div className="cards">
        

        {/* start of show data block */}
        <div className="datashow">
          {storeData.map((data, index) => {
            return (
              <div key={index}>
                {/* {console.log(storeData)} */}
                {/* original word shows what we typed */}
                <strong>{data.word}</strong> <br />
                {/* audio  */}
                <audio controls src={data.phonetics[0].audio}>
                  Play
                </audio>{" "}
                <br />
                {/* phonetic word */}
                {data.phonetics[0].text} <br />
                {/* mapping meaning  */}
                {data.meanings.map((define, index) => {
                  return (
                    <div key={index}>
                      <strong>{define.partOfSpeech}</strong> <br /> <br />{" "}
                      <hr />
                      {define.definitions.map((defm, index) => {
                        return (
                          <div key={index}>
                            <strong>Defination:</strong> {defm.definition}{" "}
                            <br /> <br />
                            <strong>Example:s</strong> {defm.example} <br />{" "}
                            <br />
                            <hr />
                            <strong>synonyms</strong> <br />
                            {defm.synonyms.map((datas,index) => {
                              return (
                                <div key={index}>
                                  <ul>
                                    <li>{datas}</li>
                                  </ul>
                                </div>
                              );
                            })}{" "}
                            <hr />
                            {/* to map a antonyms */}
                            <strong>Antonyms</strong> <br />
                            {defm.antonyms.map((antonyms, index) => {
                              return (
                                <div key={index}>
                                  <ul>
                                    <ol>
                                      {antonyms} <br />
                                    </ol>
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {/* end of data show block */}
      </div>
}
    </div>
  );
};
export default WordInput;
