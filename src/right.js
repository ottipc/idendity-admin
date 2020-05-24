import React, {Fragment} from 'react';
import {
    Create,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    BooleanInput,
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    DateField, ReferenceManyField, SingleFieldList, ChipField
} from 'react-admin';
import RightProfile from './comp/rightprofile';
import RightQuickCreateButton from "./comp/RightQuickCreateButton";
import {Button, Drawer} from "@material-ui/core";
import {UserCreate} from "./user";
import {makeStyles} from "@material-ui/core/styles";
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


export default function CreateRightDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleRightDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({...state, [anchor]: open});
    };

    return (
        <div>
            {['left', 'right', 'top', 'bottom'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleRightDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleRightDrawer(anchor, false)}>
                        <RightCreate {...props}/>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}


// in src/posts.js
export const  RightCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>

    </Create>



);
export const RightEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

export const RightList = (props) => (
    <React.Fragment>
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <EditButton />
            </Datagrid>
        </List>
        {CreateRightDrawer(props)}
    </React.Fragment>
);
