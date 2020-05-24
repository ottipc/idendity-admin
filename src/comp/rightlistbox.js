import React from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import dataProvider from '../api/dataProvider';
import apiService from '../api/apiService';

export class RightListBox extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            allRightsrow: [],
            allRights: [],
            roleRights: [],
            deletedRights: [],
            selected: [1],
            initialRights: [],
            relationobjects: []
        };
         this.handleClick = this.updateRights.bind(this);
        //this.props.hurensohn = "was";
    }


    componentDidMount() {
        this.setAllRightsToState();
        this.getroleRightsToState();

    }

    // send HTTP request to get Role Rights
    // save roleRights to the state
    getroleRightsToState() {
        console.log("------- Set Role Rights ----------------")
        let roleRights = [];
        let relations = [];
        this.fetchRightIdsForRole().then(response => response)
            .then(response => {
                response.data.map(function (val) {
                    roleRights.push(val.right_id);
                    relations.push(val);
                });
                console.log(roleRights);
                this.setState({
                    selected: roleRights,
                    initialRights : roleRights,
                    relationobjects : relations
                })
            }).catch(err => {
            console.log(err);
        });
    }

    fetchRightIdsForRole() {
        return dataProvider.getList('role_right', {
            pagination: {
                page: 1,
                perPage: 50
            },
            sort: {
                field: 'id',
                order: 'ASC'
            },
            filter: {
                role_id: this.props.record.id
            },
        });
    }

// send HTTP request to get All Rights
    // save AllRights to the state
    setAllRightsToState() {
        console.log("------- Set All Rights ----------------")
        apiService.fetchAllRights().then(response => response)
            .then(response => {
                //  console.log(JSON.stringify(response.data));
                this.setState({
                    allRightsraw : response.data,
                    allRights: JSON.stringify(response.data)
                })
            }).catch(err => {
            console.log(err);
        });
    }


    updateRights(e) {

        e.preventDefault();
        function createRoleRight(payload) {
            dataProvider
                .create('role_right', {data: payload})
                .then(response => {
                    // success side effects go here
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }


        function deleteRoleRight(relationId) {

            dataProvider
                .delete('role_right', {id: relationId})
                .then(response => {
                    // success side effects go here
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        //console.log("------- Update Rights ----------------");
        //console.log(this.props);

        //console.log(roleRights);


        if (this) {
            console.log("------- Now we aggregating ----------------");
            console.log(this.props);

            let initials = this.state.initialRights;
            let selected = this.state.selected;
            let currentRoleId = this.props.record.id;
            let realtions = this.state.relationobjects;
          //  console.log("------- Initials ----------------");
            console.log(initials);

           // console.log("------- Selected ----------------");
            console.log(selected);

           // console.log("------- Role id ----------------");
            console.log(currentRoleId);

            var tocreate = [];
            var todelete = [];

            this.state.allRightsraw.map(function (val) {

                console.log("------- VALUE  ----------------");
                console.log(val.id);
                let rightId = val.id;
                if(initials.includes(rightId) && !selected.includes(rightId)){
                    console.log("------- Deleting .....  ----------------");

                    console.log("--------- REALTIONS -----------------");

                    let idToDelete = realtions.map(function (val) {
                        console.log(JSON.stringify(val));
                        let definedrelation  = JSON.parse(JSON.stringify(val));
                        if(definedrelation.role_id == currentRoleId && definedrelation.right_id ==rightId){
                            //console.log("ID : " + definedrelation.id);
                            //console.log(rightId);
                            todelete.push(rightId);
                            deleteRoleRight(definedrelation.id);
                            return definedrelation.id;
                        }
                    });

                }
                else if(!initials.includes(rightId) && selected.includes(rightId)){
                    console.log("------- Creating .....  ----------------");

                    tocreate.push(rightId);
                    //only possible to post one entry
                    let payload = JSON.stringify({right_id : rightId , role_id : currentRoleId});
                    console.log(payload);
                    createRoleRight({"right_id" : rightId , "role_id" : currentRoleId});
                }
            });

          //console.log(payload);


        }
    }


    onSave = (selected) => {
        alert(this.state.selected)
    };


    onChange = (selected) => {
        this.setState({
            selected
        });
    };

    render() {
        if (this.state.allRights.length && this.state.allRights.length != 0) {
            var fickdich = JSON.parse(this.state.allRights.replace(/id/g, "value").replace(/name/g, "label"));
            fickdich.map(function (val) {
                delete val.created_at;
                delete val.updated_at;
            })
            return (<div><DualListBox options={fickdich} selected={this.state.selected} onChange={this.onChange}/>
                <button className="waves-effect waves-light btn" onClick={this.updateRights.bind(this)}>Save rights</button>
            </div>);

        }
        return (<div><DualListBox options={this.state.selected} selected={this.state.selected}/></div>);
    }
}

export default RightListBox;
