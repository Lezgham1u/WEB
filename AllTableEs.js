//UNUSED §
// theadData contains the data that you’ll display in the header row.
import '../styles/AllTable.css';
import { useState } from 'react';
import {FaAngleUp, FaAngleDown} from 'react-icons/fa';
import {HiPlus} from "react-icons/hi";
import {GrClose, GrEdit, GrCheckmark, GrClear} from "react-icons/gr";
import DeleteConfirm from './DeleteConfirm';




function isEmpty(obj) {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

const AllTableEs =( {name, theadData, data,  eData, setEData, sendData, setSendData, dataId, setDataId,setDeleteData, setUpdateData, newData, setNewData, entity}) => {
    
    const [tbodyData, setTbodyData] = useState(data);
    // i create an array of true that has  as many true as there are data in my tbodyData, for each 'row' the value by default is true 
    // so later on a verify if the valid is true, i 'print' the data, if not i print the data in an input, i change for each row the isEditing to false by clicking on a button called edit
    const editable = tbodyData.map((element) => {return false})
    const [isEditing, setEditing] = useState(editable);
    const [showData, setShowData] = useState(false);
    const [dialog, setDialog] = useState({message:"", isLoading:false, nameData:""});
    const [create, setCreate] = useState(true);
    

    const disabled = tbodyData.map((element, index) => {return index % 5 === 0 && index % 3 === 0? true : false});
    // console.log(disabled);

    // i create a new data object eData where i give it empty value for each key of the data json
    var jsonString = {};
    jsonString = theadData.map((key,index) => {return `${theadData[index]}`}).slice(1);
    // console.log(jsonString);

    var result = {};
            jsonString.forEach((element) =>{ result[element] = {}; 
                                             result[element] = "";
                                            });
    // console.log('result',result);
    // console.log('edata',eData);

    // console.log('edata[0] is',eData[0]); 
    
    // create an json element with empty attribute exp [{nni ='', name =''}] and update the eData
    const createData = () => {
        if(create){
            setCreate(false);
            setEData([result]);
            // console.log(eData);
            setTbodyData(
                [
                eData,
                ...tbodyData]);

    }   
    };
    
    // we add data to our json element and update the eData exp [{..., name='TEST',..}]
    // TO DO create an object instead of passing the profil + mdp
    const addData = (info, index) => {
        eData[0][theadData.slice(1)[index]] = info;
        setEData({...eData});
        // setTbodyData({...tbodyData});
    };
    // console.log('edata',eData[0]);

    // we stock the id that we get from pressing the delete button in the usestate dataId and we send it in the delete axios request!
    const removeData = (id) => {
        setDataId(id);
        dialog.isLoading = true;
        dialog.message = `Delete ${id} ?` 
        dialog.nameData = id;
        setDialog({...dialog})
        // setDeleteData(true);
        // window.location.reload(true);
    };


    // similar to add data, we take the inputs from the users and we stock in newData, we then send it in the put axios request!
    const changeValue = (e, index) => {      
        // eData[0][theadData[index]] = e.target.value;
        // setEData({...eData});    
        
        newData[0][theadData.slice(1)[index]] = e.target.value;
        setNewData({...newData});

        }
    
    // i can get the key from the value of an object
    const getKeyByValue = (object, value) => {
        return Object.keys(object).find(key => object[key] === value);
    } 
    // every time I press the button I reset all values to true and change the row pressed into false 
    const handleEdit = (indexBody) => {
        setCreate(false);
        setEditing(editable);
        setEditing(isEditing => isEditing.map((item, idx) => idx === indexBody? !item:item));
        for(let i = 1; i<theadData.length; i++){
            newData[0][theadData[i]] = tbodyData[indexBody][theadData[i]];  
            setNewData({...newData});

        }  
        // console.log(newData);        
        // console.log('new data after update', newData);
        setNewData({...newData});
    }

    // we sort data depending on the button clicked !
    const sortDataUp = (heading) => {
        // console.log('HEADING', heading);
        // console.log('tbody Data', tbodyData);
        const sortedData = [...tbodyData].sort((a,b) => a[heading] < b[heading]? -1 : 1);
        setTbodyData(sortedData);
        // console.log('sorted Data', sortedData);

    }
    const sortDataDown = (heading) => {
        // console.log('HEADING', heading);
        // console.log('tbody Data', tbodyData);
        const sortedData = [...tbodyData].sort((a,b) => a[heading] < b[heading]? 1 : -1);
        setTbodyData(sortedData);
        // console.log('sorted Data', sortedData);

    }
        return(
            <section className='main' >
            <button 
                className='update'
                onClick={() => setShowData(!showData)}>
                    {/* <GrUpdate/> */}
                    Edit
                    </button>
            <table className='tableau'>
            <caption className='caption' id='topPage'>{name}</caption>
                {/* we display the first row that contains the attributes */}
                <thead>
                    <tr>
                        {theadData.slice(1).map(heading => 
                            {return <th key={heading}>
                            <div className='heading'>
                                <div className='attribute'>{heading.toUpperCase()}</div>
                                <div className='sortingDiv'>
                                    <FaAngleUp 
                                        className='sorting' 
                                        onClick={() => sortDataUp(heading)}/>
                                            
                                        <FaAngleDown 
                                            className='sorting' 
                                            onClick={() => sortDataDown(heading)}/>
                                </div>
                            </div>
                                {/* <button>down</button> */}
                        </th>})}
                        
                        {showData? 
                            <th>
                                <HiPlus 
                                    onClick={createData} 
                                    className='iconImage'/>
                            </th> : null}
                        
                    </tr>
                </thead>
                <tbody>
                {/* two loops, one on the datas (every row) and the other on the attributes (every column) */}
                    {tbodyData.map((row,indexBody) => {
                        // console.log('index1',indexBody);
                        // console.log('row' ,row[theadData[0]]);
                        // console.log('tbodydata is', tbodyData[indexBody]);
                        // console.log('mycreated element', eData);

                        return <tr key={indexBody}>
                            {/* if the row has keys because in order to post a new user we create an empty json ! which has no keys, in that case we display empty inputs! */}
                            {theadData.slice(1).map((key,index) => {if (Object.keys(row).length !== 0)
                                {
                                    return (
                                        // we test whether the isEditing is true or not for each row, isEditing will be true if we press the button,
                                        // meaning we want to edit, we have input, otherwise we simply print
                                         !isEditing[indexBody]? 
                                                (<td key={`${row[key]}-${index}`}>{row[key]}</td>)
                                                :
                                                key !== 'service'?
                                                    key !== 'type'?  
                                                        (<td key={`${row[key]}-${index}`}>
                                                            <input 
                                                            // value={tbodyData[indexBody][key]} 
                                                            // || '' allows us to solve the controlled/uncontrolled input types !
                                                            value={newData[0][theadData.slice(1)[index]] || ''}
                                                            onChange={(e) => {changeValue(e, index);}}
                                                            // placeholder={tbodyData[indexBody][key]}
                                                            />
                                                        </td>)
                                                        :
                                                        <td key={`${row[key]}-${index}`}> 
                                                        <input  
                                                            value={newData[0][theadData.slice(1)[index]]}
                                                            disabled
                                                            /></td>

                                                    :
                                                    entity === "-1"?
                                                        <td key={`${theadData[index]}`}>
                                                            <select 
                                                                style={{ "padding":"6.5px",
                                                                        "borderRadius":"4px"}}
                                                                value={newData[0][theadData.slice(1)[index]]}
                                                                onChange={(e) => {
                                                                    changeValue(e, index);                 
                                                                }}
                                                            >
                                                                <option value={null} selected disabled hidden>Service?</option>
                                                                <option value={"0"}>CNEN</option>
                                                                <option value={"1"}>CNEPE</option>
                                                                <option value={"2"}>SFL(Y)</option>
                                                                <option value={"3"}>SFL(W)</option>
                                                                <option value={"4"}>ANP</option>
                                                                <option value={"5"}>ALS</option>
                                                                <option value={"6"}>AMEC</option>
                                                                <option value={"7"}>RRN</option>
                                                            </select>
                                                        </td>
                                                        :
                                                        <td key={`${theadData[index]}`}>
                                                            {entity}        
                                                        </td>
                                                 )
                                }
                                // if the json object has no keys !
                                else 
                                    {return key !== 'service'?  
                                                key !== 'type'?
                                                <td key={`${theadData[index]}`}>
                                                <input 
                                                    // type={"text"}
                                                    // value={theadData[index]}
                                                    placeholder={theadData.slice(1)[index]}
                                                    onChange={
                                                        (e) => addData(e.target.value,index)
                                                        // (e) => {eData[0][theadData[index]] = e.target.value;
                                                        //             setEData({...eData});}
                                                                        }/>
                                                </td>
                                                :
                                                    eData[0]?
                                                    <td key={`${theadData[index]}`}>
                                                        <select
                                                            style={{ "padding":"6.5px",
                                                            "borderRadius":"4px"}}
                                                            onChange={(e) => {
                                                                addData(e.target.value,index)                  
                                                            }}
                                                            >
                                                            <option value = {null} selected hidden>Type</option>
                                                            <option value = "TXP">TXP</option>
                                                            <option value = "TXS">TXS</option>
                                                            <option value = "Unicorn">Unicorn</option>
                                                        </select>
                                                    </td>
                                                    :
                                                    null
                                            : 
                                            eData[0]?
                                                entity === "-1" ?
                                                <td key={`${theadData[index]}`}>
                                                    <select 
                                                        style={{ "padding":"6.5px",
                                                                "borderRadius":"4px"}}
                                                        value={eData[0][theadData.slice(1)[index]]}
                                                        onChange={(e) => {
                                                            addData(e.target.value,index)                  
                                                        }}
                                                    >
                                                        <option value={null} selected hidden>Service</option>
                                                        <option value={"0"}>CNEN</option>
                                                        <option value={"1"}>CNEPE</option>
                                                        <option value={"2"}>SFL(Y)</option>
                                                        <option value={"3"}>SFL(W)</option>
                                                        <option value={"4"}>ANP</option>
                                                        <option value={"5"}>ALS</option>
                                                        <option value={"6"}>AMEC</option>
                                                        <option value={"7"}>RRN</option>
                                                    </select>
                                                </td>
                                                :
                                                <td key={`${theadData[index]}`}>
                                                    {entity}        
                                                </td>
                                            :
                                            null
                                    
                            
                            }
                            })}
                                
                            {/* if the row got key (not empty) we check whether isEditing is true ie we pressed the button to edit, then we check if we want the button to be displayed (pressed on Update?) */}
                            {/* we either render the buttons button that when clicked create a new data type and send it or a button that update the data and send it post/put */}
                            {Object.keys(row).length !== 0 ? 
                                (!isEditing[indexBody]? 
                                    showData? 
                                    <td>
                                        <GrEdit className='iconImage' 
                                                onClick={()=> {handleEdit(indexBody); 
                                                                setEData([result]); 
                                                                setDataId(row[theadData[0]]);}}/>
                                    </td> 
                                    :
                                    null
                                :
                                showData? 
                                    <td>
                                        <GrCheckmark 
                                            className='iconImage' 
                                            onClick={() => {setUpdateData(true);
                                                            // window.location.reload(true);
                                                            }}/>
                                    </td>
                                    :
                                    null)
                            : showData? 
                                <td>
                                    <GrCheckmark 
                                        className='editData' 
                                        disabled={sendData} 
                                        onClick={() => {
                                            setSendData(true);
                                            setCreate(true);
                                            }}/>
                                </td> 
                                :
                                null }
                            {/* we verify if we pressed the edit button or if we add a new user, so the delete button only cancels the edit, otherwise the delete button deletes the user */}
                            {!isEditing[indexBody]?  
                                showData? 
                                    (Object.keys(row).length !== 0?  
                                        <td>
                                            <GrClose 
                                                className='iconImage' 
                                                onClick={() => removeData(row[theadData[0]])}/>
                                        </td>  
                                        : 
                                        <td>
                                            <GrClear 
                                                className='iconImage'
                                                onClick={() => {window.location.reload(true);}}/>
                                        </td>)
                                    : 
                                    null
                                :
                                showData? 
                                    <td>
                                        
                                        <GrClear className='iconImage' 
                                            onClick={() => {
                                                setEditing(...isEditing, isEditing[indexBody]=!isEditing[indexBody]);
                                                setCreate(true);
                                                setEData([]);
                                                }}/>
                                    </td>
                                    : 
                                    null}
                                                                                                     
                        </tr>;}
                        
                    )}
                </tbody>                    
            </table>
            {dialog.isLoading?  (<DeleteConfirm 
                                                dialog={dialog}
                                                setDialog={setDialog}
                                                setDeleteData={setDeleteData}
                                                // message={dialog.message}
                                                // onDialog={dialog.isLoading}
                                                // nameData={dialog.nameData}
                                                    />) : null}
            {/* <a href='#topPage' className='goingUp' 
                // onClick={() => window.location.reload(true)}
                     >Going up!</a> */}
                     
            </section>
        )
    }
export default AllTableEs