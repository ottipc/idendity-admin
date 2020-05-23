import React from 'react';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import Chip from '@material-ui/core/Chip';
import LinkAnyFieldButton from "./linkAnyFieldButton";
import dataProvider from "../api/dataProvider";
import {Redirect} from 'react-router-dom'
import { UrlField } from 'react-admin';
import {SingleFieldList,ChipField, SelectInput, TextInput, BooleanInput,List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';

function updateState(text){
    this.setState({text})
}

export class UserRightBox extends React.Component {


    constructor(props) {
        super(props);
        console.log("*** CONSTRUCT USER RIGHT BOX ***");
        // Don't call this.setState() here!
        this.state = {
            userroles: [],
            roleRights: [],
            rightObjects: []
        };
        this.setRightOfUser = this.setRightOfUser.bind(this);
        updateState = updateState.bind(this)
    }

    updateState() {
        this.setState({ shown: false });
    }


    componentDidUpdate(prevProps, prevState) {
        console.log("************* USER RIGHT BOX DID UPDATE ******************");
        //console.log(prevState)
        //console.log(this.state)
        console.log(prevProps)
        console.log(this.props)
        if(JSON.stringify(prevProps.selected)!=JSON.stringify(this.props.selected)){
            this.setRightOfUser();
        }

    }


    componentDidMount() {
        console.log("************* USER RIGHT BOX DID MOUNT ******************");
        this.setRightOfUser();
    }


    static getDerivedStateFromProps(props, state){
        console.log("************* USER RIGHT BOX GET DERIVED STATE FROM PROPS ******************");
        console.log(props);
        console.log(state);

        return null;
        return {
            cachedSomeProp: props,
            // ... other derived state properties
        };
    }




    // send HTTP request to get User Roles
    // save UserRoles to the state
    setRightOfUser2() {
        var self = this;
        console.log("************* USER RIGHT BOX SET RIGHT OF USER ******************");
        console.log(this.props);
        let currentselected = this.props.selected;
        if(this){
            this.fetchRightIdsForRoles(currentselected).then(function (roleRightResponse) {
                    self.setState({
                        roleRights: roleRightResponse.data
                    })
                    return roleRightResponse.data; // pass the data as promise to next then block
                }).then(function (userRightResponse) {


                    self.fetchRightObjectsFOrId(userRightResponse).then(function (rightResponse) {
                        console.log("-------------SETTING NEW RIGHTS IN STATE ------------------------");
                        self.setState({
                            rightObjects: rightResponse.data
                        })
                    })
                }).catch(err => {
                    console.log(err);
                });
        }}


    // send HTTP request to get User Roles
    // save UserRoles to the state
    setRightOfUser() {
        var self = this;
        console.log("************* USER RIGHT BOX SET RIGHT OF USER ******************");
        console.log(this.props);
        let currentselected = this.props.selected;
        if(this){
            self.fetchRightIdsForRoles(currentselected).then(function (roleRightResponse) {
                let roleRights = roleRightResponse == [] ? [] :  roleRightResponse.data;
                self.setState({
                        roleRights: roleRights
                })
                console.log("**TRESPONSE*");
                console.log(roleRights);
                return roleRights; // pass the data as promise to next then block
            }).then(function (userRightResponse) {
                let roleRightIds = [];
                userRightResponse.map((value, index) => {
                    roleRightIds.push(value.right_id);
                })
                self.fetchRightObjectsFOrId(roleRightIds).then(function (rightResponse) {
                    console.log("-------------SETTING NEW RIGHTS IN STATE ------------------------");
                    let rightObjects =  rightResponse == [] ? rightResponse :  rightResponse.data;
                    self.setState({
                            rightObjects: rightObjects
                        })
                })
            }).catch(err => {
                console.log(err);
            });
    }}

    fetchRightObjectsFOrId(userRightIds) {
        return dataProvider.getManyOr('right', {
            id: userRightIds
        });
    }

    fetchRightIdsForRoles(roleIds) {
        return dataProvider.getManyOr('role_right', {
            role_id: roleIds
        });
    }

    fetchRolesForuser(userId) {
        return dataProvider.getList('user_role', {
            pagination: {
                page: 1,
                perPage: 50
            },
            sort: {
                field: 'id',
                order: 'ASC'
            },
            filter: {
                user_id: userId
            },
        });
    }


    render() {
        console.log("************* RENDER USER RIGHT BOX ******************");
        //const elements = this.setRightOfUser();
        if (this) {
            const rights = this.state.rightObjects;
            return (
                <div id = {this.props.id}>
                <ul>
                    {rights.map((value, index) => {
                        let url="/right/"+value.id
                        return <LinkAnyFieldButton to={url}>
                            <Chip label={value.name}></Chip>
                        </LinkAnyFieldButton>

                     })
                    }
                </ul>
                </div>
            )
        }
        return null;
    }
}
export default UserRightBox;
