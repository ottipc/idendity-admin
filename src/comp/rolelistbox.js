import React from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import dataProvider from '../api/dataProvider';
import {UserRightBox} from "./userrightlistbox";
import {SimpleForm} from "react-admin";

const options = [{
    value: 'one',
    label: 'Option One'
},
    {
        value: 'two',
        label: 'Option Two'
    },
];

export class RoleListBox extends React.Component {

    state = {
        selected: ['1', '2']
    };

    constructor(props) {
        super(props);
        console.log("*** CONSTRUCT ROLE LIST BOX ***");

        // Don't call this.setState() here!
        this.state = {
            allrolesrow: [],
            allroles: [],
            userroles: [],
            deletedroles: [],
            selected: [1],
            initialroles: [],
            relationobjects: []
        };
        this.handleClick = this.updateRoles.bind(this);
        //this.props.hurensohn = "was";
    }


    componentDidMount() {
        console.log("*** ROLE LIST BOX DID MOUNT ***");
        this.setAllRolesToState();
        this.getUserRolesToState();

    }

    // send HTTP request to get User Roles
    // save UserRoles to the state
    getUserRolesToState() {
        let userroles = [];
        let relations = [];
        this.fetchRoleListForUser().then(response => response)
            .then(response => {
                response.data.map(function (val) {
                    userroles.push(val.role_id);
                    relations.push(val);
                });
                this.setState({
                    selected: userroles,
                    initialroles: userroles,
                    relationobjects: relations
                })
            }).catch(err => {
            console.log(err);
        });
    }

    fetchRoleListForUser() {
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
                user_id: this.props.record.id
            },
        });
    }

// send HTTP request to get All Roles
    // save AllRoles to the state
    setAllRolesToState() {
        this.fetchAllRoleObjects().then(response => {
                this.setState({
                    allrolesraw: response.data,
                    allroles: JSON.stringify(response.data)
                })
            }).catch(err => {
            console.log(err);
        });
    }


    fetchAllRoleObjects() {
        return dataProvider.getList('role', {
            pagination: {
                page: 1,
                perPage: 20
            },
            sort: {
                field: 'name',
                order: 'ASC'
            },
            filter: {},
        })
    }

    updateRoles(event) {
        event.preventDefault();
        function createUserRole(payload) {
            dataProvider
                .create('user_role', {data: payload})
                .then(response => {
                    // success side effects go here
                    //console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        function deleteUserRole(relationId) {
            dataProvider
                .delete('user_role', {id: relationId})
                .then(response => {
                    // success side effects go here
                    //console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        if (this) {
            let initials = this.state.initialroles;
            let selected = this.state.selected;
            let currentUserId = this.props.record.id;
            let realtions = this.state.relationobjects;
            var tocreate = [];
            var todelete = [];

            this.state.allrolesraw.map(function (val) {

                console.log("------- VALUE  ----------------");
                //console.log(val.id);
                let roleId = val.id;
                if (initials.includes(roleId) && !selected.includes(roleId)) {
                    let idToDelete = realtions.map(function (val) {
                        //console.log(JSON.stringify(val));
                        let definedrelation = JSON.parse(JSON.stringify(val));
                        if (definedrelation.user_id == currentUserId && definedrelation.role_id == roleId) {
                            todelete.push(roleId);
                            deleteUserRole(definedrelation.id);
                            return definedrelation.id;
                        }
                    });

                } else if (!initials.includes(roleId) && selected.includes(roleId)) {
                    tocreate.push(roleId);
                    //only possible to post one entry
                    createUserRole({"role_id": roleId, "user_id": currentUserId});
                }
            });
        }
    }

    onSave = (selected) => {
        alert(this.state.selected)
    };


    onChange = (selected) => {
        alert(selected)
        this.setState({
            selected: selected,
            userroles: selected
        });
        //UserRightBox.getDerivedStateFromProps();
    };

    changingRightsChild(text) {
    }

    render() {
        console.log("************* RENDER ROLE LIST BOX ******************");
        if (this.state.allroles && this.state.allroles.length > 0) {
            var fickdich = JSON.parse(this.state.allroles.replace(/id/g, "value").replace(/name/g, "label"));
            fickdich.map(function (val) {
                delete val.created_at;
                delete val.updated_at;
            })
            return (<div><DualListBox options={fickdich} selected={this.state.selected}
                                      onChange={this.onChange}/>
                <button className="fwaves-effect waves-light btn"  onChange={(e) => this.changingRightsChild(e.target.value)} onClick={(event) => this.updateRoles(event)}>Save
                    Roles
                </button>
                <UserRightBox selected={this.state.selected} userid={this.props.user_id} id="deioma"/>
            </div>);

        }
        return (<div><DualListBox options={options} selected={this.state.selected}/></div>);
    }
}

export default RoleListBox;
