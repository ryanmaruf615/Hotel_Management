import {currencyFormatter} from "../../actions/stripe";
import {diffDays} from "../../actions/hotel";
import {Link, useHistory} from 'react-router-dom';
import {Fragment} from "react";
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'



const SmallCard = ({h,handleHotelDelete = (f) =>f,owner = false ,
                   showViewMoreButton = true,
                   }) =>{

    const history = useHistory();
    return(
    <Fragment>
    <div className="card mb-3">
        <div className="row no-gutters ">
            <div className="col-md-4">
                {h.image && h.image.contentType ? (
                    <img
                        src={`${process.env.REACT_APP_API}/hotel/image/${h._id}`}
                        alt=" default hotel image"
                        className="card-image img img-fluid cardImg"/>
                ) :
                    <img
                        src="https://via.placeholder.com/350x350.png?text=Hotel+Booking"
                        alt=" default hotel image"
                        className="card-image img img-fluid"/>
                }
            </div>
            <div className="col-md-8">
               <div className="card-body">
                   <h3 className="card-title">{h.title} <span className="float-right text-primary">
                       {currencyFormatter({
                           amount:h.price,
                           currency:"bdt",
                       })}
                   </span></h3>
                   <p className="alert alert-info">{h.location}</p>
                   <p className="card-text">{`${h.content.substring(0,200)}...`}</p>
                   <p className="card-text">
                       <span className="float-right text-primary">For : {diffDays(h.from,h.to)}
                           {diffDays(h.from,h.to) <= 1 ? " Day" : " Days"}
                       </span></p>
                   <p className="card-text">{h.bed} bed</p>
                   <p className="card-text">Available From {new Date(h.from).toDateString()} </p>

                    
                   
                   <div className="d-flex flex-row-reverse h3 card-class">
                       {owner && (
                           <>

                           <Link  to={`/hotel/edit/${h._id}`}>
                           <EditOutlined className="m-3" />
                           </Link>
                           </>
                       )}
                       {showViewMoreButton && (<button onClick={() => history.push(`/hotel/${h._id}`)} className="btn btn-primary m-3">Show More</button>
                       )}
                   </div>

               </div>
            </div>
        </div>
    </div>
    </Fragment>
)};

export default SmallCard;
