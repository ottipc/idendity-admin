import React from 'react';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import dataProvider from '../api/dataProvider';
import {UserRightBox} from "./userrightlistbox";
import {SimpleForm} from "react-admin";
import apiService from '../api/apiService';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from "@material-ui/core/styles";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { createNotification } from './Notification';
//const displayNotification = createNotification(type, title, message);
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    root: {
        //flexGrow: 1,
    }, heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

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
        console.log("------------------NUTTEN-------------------------------------")
        console.log(this.props)
        apiService.fetchRoleListForUser(this.props.user_id).then(response => response)
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

    // send HTTP request to get All Roles
    // save AllRoles to the state
    setAllRolesToState() {
        apiService.fetchAllRoleObjects().then(response => {
                this.setState({
                    allrolesraw: response.data,
                    allroles: JSON.stringify(response.data)
                })
            }).catch(err => {
            console.log(err);
        });
    }

    updateRoles(event) {
        event.preventDefault();
        if (this) {
            let initials = this.state.initialroles;
            let selected = this.state.selected;
            let currentUserId = this.props.user_id;
            let realtions = this.state.relationobjects;
            let toCreate = [];
            let toDelete = [];

            this.state.allrolesraw.map(function (val) {

                console.log("------- VALUE  ----------------");
                //console.log(val.id);
                let roleId = val.id;
                if (initials.includes(roleId) && !selected.includes(roleId)) {
                    let idToDelete = realtions.map(function (val) {
                        //console.log(JSON.stringify(val));
                        let definedRelation = JSON.parse(JSON.stringify(val));
                        if (definedRelation.user_id == currentUserId && definedRelation.role_id == roleId) {
                            toDelete.push(roleId);
                            apiService.deleteUserRole(definedRelation.id);
                            return definedRelation.id;
                        }
                    });

                } else if (!initials.includes(roleId) && selected.includes(roleId)) {
                    toCreate.push(roleId);
                    //only possible to post one entry
                    apiService.createUserRole({"role_id": roleId, "user_id": currentUserId});
                }
            });
        }
        createNotification("success", "Role saved","Role for User persisted");
    }

    onSave = (selected) => {
        alert("Hello")
        alert(this.state.selected)
    };


    onChange = (selected) => {
        //alert(selected)
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
            var parsedJsonObject = JSON.parse(this.state.allroles.replace(/id/g, "value").replace(/name/g, "label"));
            parsedJsonObject.map(function (val) {
                delete val.created_at;
                delete val.updated_at;
            })
            return (<div><DualListBox options={parsedJsonObject} selected={this.state.selected}
                                      onChange={this.onChange}/>
                <button className="MuiButtonBase-root MuiButton-root MuiButton-contained RaSaveButton-button-514 MuiButton-containedPrimary"  onChange={(e) => this.changingRightsChild(e.target.value)} onClick={(event) => this.updateRoles(event)}>Save
                    Roles
                </button>
                <NotificationContainer/>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        expanded={true}
                    >
                        <Typography className={useStyles.heading}>User Rechte</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <UserRightBox selected={this.state.selected} userid={this.props.user_id} id="deioma"/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>



            </div>);

        }
        return (<div><DualListBox options={options} selected={this.state.selected}/></div>);
    }
}
export default RoleListBox;
