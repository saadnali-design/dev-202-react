export default  function Fetchc(props){
    let adress=props.user.address.street+' - '+props.user.address.suite+' - '+props.user.address.city
    return (
        <div style={{ marginBottom: '30px' ,
                    border : '2px solid red',
                    padding: '20px',
                    boxShadow:'12px 12px 20px black ',
                    borderRadius: '15px'
                    }}>
             Name    :    {props.user.name}
             <br/>
             E-mail  :    {props.user.email}
             <br/>
             Phone   :    {props.user.phone}
             <br/>
             Address :    {adress}
             <br/>
             Company :    {props.user.company.name}

        </div>
    )
}