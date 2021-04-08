import {useSelector} from "react-redux";
import {Card, Avatar, Badge} from "antd";
import moment from "moment";
import {Fragment} from "react";



const {Meta} = Card;
const { Ribbon } = Badge;

const ConnectNav = () =>{

    const {auth} = useSelector((state) => ({...state}));
    const {user} = auth;


    return(
        <div className="d-flex justify-content-around">
            <Card>
                <Meta avatar={<Avatar>{user.name[0]}</Avatar>}
                      title={user.name}
                description={`Joined${moment(user.createdAt).fromNow()}`}
                />
            </Card>
            {auth && auth.user && auth.user.stripe_seller &&
            auth.user.stripe_seller.details_submitted && (
            <Fragment>
                <Ribbon text="settings" color="red">
                    <Card className="bg-light pt-1">
                        payout Settings
                    </Card>
                </Ribbon>
            </Fragment>
            )}
        </div>
    )
};
export default ConnectNav;