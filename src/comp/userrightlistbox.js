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
        console.log("------- RIGHT BOX USer ROLE ----------------")
        console.log("RECORD : " + this.props.record.id);
        var self = this;
        let tempuserroles = [];
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
            console.log("userRoleResponse")
            console.log(userRoleResponse)
            return userRoleResponse; // pass the data as promise to next then block
        }).then(function (userroleresponse) {

            console.log("------- FUCK THE DATA ----------------")
            console.log(userroleresponse.data)
            let tempuserrights = [];
            let roleids = new Array();
            userroleresponse.data.map(function (userRole) {
                console.log("------- PUSHING ----------------")
                console.log(userRole.role_id)
                roleids.unshift(userRole.role_id);
            }); // make a 2nd request and return a promise
            console.log("------- ROLEIDS ----------------")
            console.log(roleids);
            let jsonsthurensohn = [];
            jsonsthurensohn['role_id'] = roleids;
            console.log(jsonsthurensohn);
            console.log(jsonsthurensohn.toJSON);

            dataProvider.getList('role_right', {
                pagination: {
                    page: 1,
                    perPage: 50
                },
                sort: {
                    field: 'id',
                    order: 'ASC'
                },
                filter: {role_id : JSON.stringify(roleids)},
            }).then(function (roleRightResponse) {
                console.log("------- RoleRightResponse ----------------")
                console.log(roleRightResponse)
                if (roleRightResponse.data.length > 0) {
                    tempuserrights.push(roleRightResponse.data[0]);
                    self.state.roleRights = tempuserrights;
                    console.log(self.state.roleRights)
                }
                return tempuserrights; // pass the data as promise to next then block
            }).catch(err => {
                console.log(err);
            });
        })
    }

    // send HTTP request to get Role Rights
    // save roleRights to the state
    getRoleRightsToState() {
        console.log("------- RIGHT BOX  ROLE RIGHTS ----------------")
        let userrolesforrights = this.state.userroles;
        console.log(userrolesforrights);

        userrolesforrights.map(function (userRole) {
            let roleRights = [];
            let relations = [];
            dataProvider.getList('role_right', {
                pagination: {
                    page: 1,
                    perPage: 50
                },
                sort: {
                    field: 'id',
                    order: 'ASC'
                },
                filter: {
                    role_id: userRole.role_id
                },
            }).then(response => response)
                .then(response => {
                    response.data.map(function (val) {
                        roleRights.push(val.right_id);
                    });
                    console.log(roleRights);

                    this.setState({
                        roleRights: roleRights
                    })
                }).catch(err => {
                console.log(err);
            });
        });
    }


    render() {

        console.log("-------------------------Rendering---------------");
        if (this) {
            console.log("WAS PASIERT HIER");
            console.log(this.state.roleRights);
            const elements = this.state.roleRights;
            return (
                <ul>
                    {elements.map((value, index) => {
                        return <Chip
                            key={index}
                            className="foeztchen"
                            label={value}
                        />
                    })}
                </ul>
            )
        }
        return null;
    }
}

export default UserRightBox;
