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
    <Fragment>
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <EditButton />
                <RightProfile>
                </RightProfile>
            </Datagrid>
        </List>
    </Fragment>
);
