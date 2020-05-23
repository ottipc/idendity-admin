import React from 'react';
import { Drawer, Button } from '@material-ui/core';
import {useQuery} from 'react-admin';
import { Route } from 'react-router';
import { Resource,Create, Edit, DateField, ReferenceManyField, SimpleForm, ReferenceInput,ReferenceArrayField}  from 'react-admin';
import {SingleFieldList,ChipField, SelectInput, TextInput, BooleanInput,List, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';
import dataProvider from './api/dataProvider';
import {RoleCreate, RoleEdit, RoleList, RoleMinimalList} from './roles';
import {RoleListBox} from './comp/rolelistbox';
import {UserRightBox} from "./comp/userrightlistbox";
import { CardActions, CreateButton } from 'react-admin';
// in src/posts.js
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';



export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <BooleanInput source="activated" />
        </SimpleForm>
    </Create>
);


export const UserEdit = props => (
    <Edit {...props}>
        <SimpleForm >
            <TextInput source="name" />
            <BooleanInput source="activated" />
            <RoleListBox user_id="1"/>
            <UserRightBox/>
        </SimpleForm>
    </Edit>

);



const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function CreateDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            {['left', 'right', 'top', 'bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <UserCreate {...props}/>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}



export const UserList = (props) => (
    <React.Fragment>
    <List {...props} sort={{ field: 'name', order: 'ASC' }} >
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" type="email" />
            <TextField source="activated" type="boolean" />
            <DateField source="created_at" />
            <DateField source="updated_at" />
            <ReferenceManyField label="Roles " reference="user_role" target="user_id">
                <SingleFieldList>
                    <ReferenceField source="role_id" reference="role">
                        <ChipField source="name" />
                    </ReferenceField>
                </SingleFieldList>

            </ReferenceManyField>
            <EditButton />
        </Datagrid>
    </List>
        {CreateDrawer(props)}
    </React.Fragment>
);
