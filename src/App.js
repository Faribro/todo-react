import React, { useState ,useRef} from "react";
import "./App.css";
import TodoList from "./TodoList";
const App = () => {
  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState([]);

  const edit = useRef(null)

  const itemEvent = (event) => {
    setInputList(event.target.value);
  };
  const listOfIteams = () => {
    setItems((oldItems) => {
      return [...oldItems, inputList];
    });
    setInputList("");
  };

  const deleteItems = (id) => {
    console.log("deleted");

    setItems((oldItems) => {
      return oldItems.filter((arrElem, index) => {
        return index !== id;
      });
    });
  };
  // edit
  const handleEdit=(id)=>{
    const val=items.find((val,index)=>id===index)
    setInputList(val)
    edit.current=id
  }

  const handleEditSubmit=()=>{
    const newIteams=items.map((val,index)=>{
      if(index===edit.current )return inputList
      return val
    })

    setItems(newIteams)
    edit.current=null
  }

  return (
    <>
      <div className="Main-div">
        <div className="center-div">
          <br />
          <h1>Todo List</h1>
          <br />
          <input type="text" placeholder="Add a Items" value={inputList} onChange={itemEvent} />
          <button onClick={edit.current!==null?handleEditSubmit:listOfIteams}>Add</button>
          <ol>
            {items.map((itemval, index) => {
              return (
                <TodoList
                  key={index}
                  id={index}
                  text={itemval}
                  onselect={deleteItems}
                  // edit
              onEdit={handleEdit}


                />
              );
            })}
          </ol>
      
          </div>
      </div>
    </>
  );
};

export default App;
