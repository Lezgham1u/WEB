// unused
const ChooseEntity = ({profilMdp,setProfilMdp}) => {
    const changeProfilMdp = (e) => {
        profilMdp[0].entity = e;
        profilMdp[0].profil = "ADMIN_ENTITY";           
        setProfilMdp({...profilMdp});
        // console.log(profilMdp);
    }
    return <select 
                className='selectTable' 
                        value={profilMdp.entity}
                        onChange={(e) => {
                            changeProfilMdp(e.target.value)
                            
                        
                        }}
                    >
                        <option value={"0"}>CNEN</option>
                        <option value={"1"}>CNEPE</option>
                        <option value={"2"}>SFL(Y)</option>
                        <option value={"3"}>SFL(W)</option>
                        <option value={"4"}>ANP</option>
                        <option value={"5"}>ALS</option>
                        <option value={"6"}>AMEC</option>
                        <option value={"7"}>RRN</option>
                    </select>
                    
}
export default ChooseEntity