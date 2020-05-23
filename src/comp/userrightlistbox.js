import React from 'react';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import Chip from '@material-ui/core/Chip';
import dataProvider from "../api/dataProvider";

export class UserRightBox extends React.Component {


    constructor(props) {
        super(props);
        console.log("****************** PROPERTIE **************************");
        console.log(props.record);
        // Don't call this.setState() here!
        this.state = {
            userroles: [],
            roleRights: [],
            rightObjects: []
        };
        this.getUserRolesToState = this.getUserRolesToState.bind(this);
        //this.props.hurensohn = "was";
    }

    componentWillMount() {
        //this.getUserRolesToState();
        //this.getRoleRightsToState();
        this.getUserRolesToState();
        //this.getRoleRightsToState();

    }

    componentDidMount() {


    }

    // send HTTP request to get User Roles
    // save UserRoles to the state
    getUserRolesToState() {
        //console.log("------- RIGHT BOX USer ROLE ----------------")
        //console.log("RECORD : " + this.props.record.id);
        var self = this;
        dataProvider.getList('user_role', {
            pagination: {
                page: 1,
                perPage: 50
            },
            sort: {
                field: 'id',
                order: 'ASC'
            },
            filter: {
                user_id: this.props.record.id
            },
        }).then(function (userRoleResponse) {
            return userRoleResponse; // pass the data as promise to next then block
        }).then(function (userroleresponse) {
            let roleIds = new Array();
            userroleresponse.data.map(function (userRole) {
                roleIds.unshift(userRole.role_id);
            }); // make a 2nd request and return a promise
            dataProvider.getManyOr('role_right', {
                role_id: roleIds
            }).then(function (roleRightResponse) {
                self.setState({
                        roleRights: roleRightResponse.data
                })
                return roleRightResponse.data; // pass the data as promise to next then block
            }).then(function (userRightResponse) {
                let ids =[];
                userRightResponse.map(function (roleRight) {
                    ids.unshift(roleRight.right_id);
                });

                dataProvider.getManyOr('right', {
                    id: ids
                }).then(function (rightResponse) {
                    console.log("RIGHT RESPONSEEEEEEEE");
                    console.log(rightResponse);
                        self.setState({
                            rightObjects: rightResponse.data
                        })
                })
            }).catch(err => {
                console.log(err);
            });
        })
    }
    fuckingUpdate(){
        this.forceUpdate();
    }

    render() {
        if (this) {
            const rights = this.state.rightObjects;
            return (
                <ul>
                    {rights.map((value, index) => {
                        return <Chip
                            key={index}
                            className="foeztchen"
                            label={value.name}
                        />
                    })}
                </ul>
            )
        }
        return null;
    }
}
export default UserRightBox;
