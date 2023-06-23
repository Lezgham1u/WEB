// UNUSED
// theadData contains the data that you’ll display in the header row.
import { useEffect, useState } from 'react';
import '../styles/AllTable.css';
import newIcon from "../images/ico_new_colored.png";
import deleteIcon from "../images/ico_delete_colored.png";
import saveIcon from "../images/ico_save.png";
import {FaAngleUp, FaAngleDown, FaAddressBook} from 'react-icons/fa';
import {FcCancel, FcOk} from 'react-icons/fc';
import {HiDotsHorizontal, HiPlus} from "react-icons/hi";
import {GrUpdate, GrClose, GrEdit, GrCheckmark, GrClear, GrAdd} from "react-icons/gr";
import DeleteConfirm from './DeleteConfirm';
import ChooseEntity from './ChooseEntity';




function isEmpty(obj) {
    for(var prop in obj) {
      if(Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }
  
    return JSON.stringify(obj) === JSON.stringify({});
  }

const AllTable =( {name, theadData, data,  eData, setEData, sendData, setSendData, dataId, setDataId,setDeleteData, setUpdateData, newData, setNewData, profilMdp, entity,setUserEntity, setProfilMdp}) => {

    const [tbodyData, setTbodyData] = useState(data);
        

    // i create an array of true that has  as many true as there are data in my tbodyData, for each 'row' the value by default is true 
    // so later on a verify if the valid is true, i 'print' the data, if not i print the data in an input, i change for each row the isEditing to false by clicking on a button called edit
    const editable = tbodyData.map((element) => {return false});
    const [isEditing, setEditing] = useState(editable);
    const [showData, setShowData] = useState(false);
    const [dialog, setDialog] = useState({message:"", isLoading: false, nameData:""});
    const [create, setCreate] = useState(true);
    const [clicked, setClicked] = useState(false);
    
    const disabled = tbodyData.map((element, index) => {return index % 5 === 0 || (index % 3 === 0 && entity !== '-1')? true : false});

    // i create a new data object eData where i give it empty value for each key of the data json
    var jsonString = {};
    jsonString = theadData.map((key,index) => {return `${theadData[index]}`});

    var result = {};
            jsonString.forEach((element) =>{ result[element] = {}; 
                                             result[element] = "";
                                            });
    
    
    // create an json element with empty attribute exp [{nni ='', name =''}] and update the eData
    const createData = () => {
        if(create){
            setClicked(true);
            setCreate(false);
            setEData([result]);
            setTbodyData(
                [
                eData,
                ...tbodyData]);

    }
    };
    
    // we add data to our json element and update the eData exp [{..., name='TEST',..}]
    // TO DO create an object instead of passing the profil + mdp
    const addData = (info, index) => {
        eData[0][theadData[index]] = info;
        if(profilMdp){
            // console.log(profilMdp[0]);
            Object.assign(eData[0], profilMdp[0]);
        }
        setEData({...eData});
        // setTbodyData({...tbodyData});
    };

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
        
        newData[0][theadData[index]] = e.target.value;
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
        for(let i = 1; i<=theadData.length; i++){
            newData[0][theadData[i]] = tbodyData[indexBody][theadData[i]];  
            setNewData({...newData});

        }  
        setNewData({...newData});
    }

    // we sort data depending on the button clicked !
    const sortDataUp = (heading) => {
        const sortedData = [...tbodyData].sort((a,b) => a[heading] < b[heading]? -1 : 1);
        setTbodyData(sortedData);
    }
    const sortDataDown = (heading) => {
        const sortedData = [...tbodyData].sort((a,b) => a[heading] < b[heading]? 1 : -1);
        setTbodyData(sortedData);
    }
        const changeProfilMdp = (e) => {
            profilMdp[0].entity = e;
            // profilMdp[0].profil = "ADMIN_ENTITY";           
            setProfilMdp({...profilMdp});
        }

        return(
            <section className='main'>
            <button 
                className='update'
                onClick={() => {setShowData(!showData);
                                setClicked(false);}}>
                    {/* <GrUpdate/> */}
                    Edit
                    </button>
                    {/* if we want to create data and we are admin project, we have to choose the entity that we want ! */}
            {/* {clicked && entity === '-1'? 
                    <ChooseEntity 
                        profilMdp={profilMdp}
                        setProfilMdp={setProfilMdp}
                        />
                    :
                    null} */}
            <table className='tableau'>
            <caption className='caption' id='topPage'>{name}</caption>
                {/* we display the first row that contains the attributes */}
                <thead>
                    <tr>
                        {theadData.map(heading => 
                            {return <th key={heading}>
                            <div className='heading'>
                            <div className='attribute'>{heading.toUpperCase()}</div>
                                <div className='sortingDiv'>
                                    <FaAngleUp className='sorting' onClick={() => sortDataUp(heading)}/>        
                                    <FaAngleDown className='sorting' onClick={() => sortDataDown(heading)}/>
                                </div>
                            </div>
                        </th>})}
                        
                        {showData? 
                            <th>
                                <HiPlus onClick={() => createData()} className='iconImage'/>                                        
                            </th> 
                            :
                            null}
                        
                    </tr>
                </thead>
                <tbody>
                {/* two loops, one on the datas (every row) and the other on the attributes (every column) */}
                    {tbodyData.map((row,indexBody) => {

                        return <tr key={indexBody}>
                            {/* if the row has keys because in order to post a new user we create an empty json ! which has no keys, in that case we display empty inputs! */}
                            {theadData.map((key,index) => {if (Object.keys(row).length !== 0)
                                {
                                    return (
                                        // we test whether the isEditing is true or not for each row, isEditing will be true if we press the button,
                                        // meaning we want to edit, we have input, otherwise we simply print
                                         !isEditing[indexBody]? 
                                            (<td key={`${row[key]}-${index}`}>{row[key]}</td>)
                                            :
                                                // we test if it's the first column because we want the input to be disabled !! we cant change the id of the postgres table
                                            (name === 'Users'?
                                                !disabled[index]?
                                                // we test if it s the admin project, cuz he can change the entity of the user, if its the admin entity we want the entity field to be disabled!
                                                    entity != "-1" ? 
                                                    (<td key={`${row[key]}-${index}`}>
                                                    <input 
                                                    // || '' allows us to solve the controlled/uncontrolled input types !
                                                    value={newData[0][theadData[index]] || ''}
                                                    onChange={(e) => {changeValue(e, index);}}
                                                    />
                                                    </td>)
                                                    :
                                                        key !='entity' ?
                                                        (<td key={`${row[key]}-${index}`}>
                                                        <input 
                                                        
                                                        // || '' allows us to solve the controlled/uncontrolled input types !
                                                        value={newData[0][theadData[index]] || ''}
                                                        onChange={(e) => {changeValue(e, index);}}
                                                        />
                                                        </td>)
                                                        :
                                                        <td key={`${row[key]}-${index}`}>
                                                            <select 
                                                                style={{ "padding":"6.5px",
                                                                        "borderRadius":"4px"}}
                                                                value={newData[0][theadData[index]]}
                                                                onChange={(e) => {
                                                                    changeValue(e, index);                 
                                                                }}
                                                            >   
                                                                <option value={null} selected disabled hidden>Service</option>
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
                                                    (<td key={`${row[key]}-${index}`}>
                                                    <input 
                                                    // || '' allows us to solve the controlled/uncontrolled input types !
                                                        value={newData[theadData[index]] || ''}
                                                        onChange={(e) => {changeValue(e, index);}}
                                                        placeholder={tbodyData[indexBody][key]}
                                                        disabled/>
                                                    </td>)
                                                :
                                                key ==='entity' || key === 'nni'?
                                                    (<td key={`${row[key]}-${index}`}>
                                                    <input 
                                                    // || '' allows us to solve the controlled/uncontrolled input types !
                                                    value={newData[theadData[index]] || ''}
                                                    onChange={(e) => {changeValue(e, index);}}
                                                    placeholder={tbodyData[indexBody][key]}
                                                    disabled/>
                                                    </td>)    
                                                    : 
                                                    (<td key={`${row[key]}-${index}`}>
                                                    <input 
                                                    // || '' allows us to solve the controlled/uncontrolled input types !
                                                    value={newData[0][theadData[index]] || ''}
                                                    onChange={(e) => {changeValue(e, index);}}
                                                    placeholder={tbodyData[indexBody][key]}
                                                    />
                                                    </td>)     
                                            )
                                                 )
                                }
                                // if the json object has no keys !
                                else{
                                    return key !='entity'?  
                                        <td key={`${theadData[index]}`}>
                                            <input 
                                                // type={"text"}
                                                // value={theadData[index]}

                                                placeholder={theadData[index]}
                                                onChange={
                                                    (e) => addData(e.target.value,index)
                                                    // (e) => {eData[0][theadData[index]] = e.target.value;
                                                    //             setEData({...eData});}
                                                                    }/>
                                            </td>
                                    : entity === "-1"?
                                        <td key={`${theadData[index]}`}>
                                            <select 
                                                style={{ "padding":"6.5px",
                                                        "borderRadius":"4px"}}
                                                value={profilMdp.entity}
                                                onChange={(e) => {
                                                    changeProfilMdp(e.target.value)                  
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

                            }
                            })}
                                
                            {/* if the row got key (not empty) we check whether isEditing is true ie we pressed the button to edit, then we check if we want the button to be displayed (pressed on Update?) */}
                            {/* we either render the buttons button that when clicked create a new data type and send it or a button that update the data and send it post/put */}
                            {Object.keys(row).length !== 0 ?
                                (!isEditing[indexBody]? 
                                    showData? 
                                        <td>
                                            <GrEdit 
                                                className='iconImage' 
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
                                        className='editData' disabled={sendData} 
                                        onClick={() => {
                                            setSendData(true);
                                            setCreate(true);
                                            setClicked(false);
                                            // window.location.reload(true);
                                            }}/>
                                            </td> : null
                                            }
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
                                                onClick={() => {
                                                    window.location.reload(true);
                                                    setCreate(true);
                                                    setEData([]);
                                                }}/>
                                        </td>)
                                : null                                         :
                            showData? 
                                <td>
                                    <GrClear 
                                    className='iconImage' 
                                        onClick={() => {setEditing(...isEditing, isEditing[indexBody]=!isEditing[indexBody]);
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
                                                    />) : null}
            {/* <a href='#topPage' className='goingUp' 
                // onClick={() => window.location.reload(true)}
                     >Going up!</a> */}
            </section>
        )
    }
export default AllTable