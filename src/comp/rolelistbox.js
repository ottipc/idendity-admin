import React from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import dataProvider from '../api/dataProvider';


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
        console.log("****************** PROPERTIE **************************");
        console.log(props.record);
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
        this.setAllRolesToState();
        this.getUserRolesToState();

    }

    // send HTTP request to get User Roles
    // save UserRoles to the state
    getUserRolesToState() {
        console.log("------- Set User Roles ----------------")
        let userroles = [];
        let relations = [];
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
        }).then(response => response)
            .then(response => {
                response.data.map(function (val) {
                    userroles.push(val.role_id);
                    relations.push(val);
                });
                console.log(userroles);

                this.setState({
                    selected: userroles,
                    initialroles : userroles,
                    relationobjects : relations
                })
            }).catch(err => {
            console.log(err);
        });
    }

    // send HTTP request to get All Roles
    // save AllRoles to the state
    setAllRolesToState() {
        console.log("------- Set All Roles ----------------")
        dataProvider.getList('role', {
            pagination: {
                page: 1,
                perPage: 20
            },
            sort: {
                field: 'name',
                order: 'ASC'
            },
            filter: {},
        }).then(response => response)
            .then(response => {
                //  console.log(JSON.stringify(response.data));
                this.setState({
                    allrolesraw : response.data,
                    allroles: JSON.stringify(response.data)
                })
            }).catch(err => {
            console.log(err);
        });
    }


    updateRoles(e) {

        function createUserRole(payload) {
            dataProvider
                .create('user_role', {data: payload})
                .then(response => {
                    // success side effects go here
                    console.log(response);
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
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }

        //console.log("------- Update Roles ----------------");
        //console.log(this.props);

        //console.log(userroles);


        if (this) {
            console.log("------- Now we aggregating ----------------");
            console.log(this.props);

            let initials = this.state.initialroles;
            let selected = this.state.selected;
            let currentUserId = this.props.record.id;
            let realtions = this.state.relationobjects;
          //  console.log("------- Initials ----------------");
            console.log(initials);

           // console.log("------- Selected ----------------");
            console.log(selected);

           // console.log("------- User id ----------------");
            console.log(currentUserId);

            var tocreate = [];
            var todelete = [];

            this.state.allrolesraw.map(function (val) {

                console.log("------- VALUE  ----------------");
                console.log(val.id);
                let roleId = val.id;
                if(initials.includes(roleId) && !selected.includes(roleId)){
                    console.log("------- Deleting .....  ----------------");

                    console.log("--------- REALTIONS -----------------");

                    let idToDelete = realtions.map(function (val) {
                        console.log(JSON.stringify(val));
                        let definedrelation  = JSON.parse(JSON.stringify(val));
                        if(definedrelation.user_id == currentUserId && definedrelation.role_id ==roleId){
                            //console.log("ID : " + definedrelation.id);
                            //console.log(roleId);
                            todelete.push(roleId);
                            deleteUserRole(definedrelation.id);
                            return definedrelation.id;
                        }
                    });

                }
                else if(!initials.includes(roleId) && selected.includes(roleId)){
                    console.log("------- Creating .....  ----------------");

                    tocreate.push(roleId);
                    //only possible to post one entry
                    let payload = JSON.stringify({role_id : roleId , user_id : currentUserId});
                    console.log(payload);
                    createUserRole({"role_id" : roleId , "user_id" : currentUserId});
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
        if (this.state.allroles.length && this.state.allroles.length != 0) {
            var fickdich = JSON.parse(this.state.allroles.replace(/id/g, "value").replace(/name/g, "label"));
            fickdich.map(function (val) {
                delete val.created_at;
                delete val.updated_at;
            })
            return (<div><DualListBox options={fickdich} selected={this.state.selected} onChange={this.onChange}/>
                <button onClick={this.updateRoles.bind(this)}></button>
            </div>);

        }
        return (<div><DualListBox options={options} selected={this.state.selected}/></div>);
    }
}

export default RoleListBox;
