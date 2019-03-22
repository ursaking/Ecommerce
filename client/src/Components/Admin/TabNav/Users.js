import React from 'react';
import {
    Create,
    Edit,
    EmailField,
    UrlField,
    List,
    Datagrid,
    TextField,
    ReferenceManyField,
    ReferenceArrayField,
    ArrayField,
    SingleFieldList,
    ChipField,
    EditButton,
    SelectInput,
    LongTextInput,
    DisabledInput,
    SimpleForm,
    ReferenceInput,
    TextInput,
} from 'react-admin';

export const UserList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <TextField source="firstname"/>
            <TextField source="lastname"/>
            <EmailField source="email"/>
            <TextField source="apiToken"/>
            <TextField source="password"/>
            <TextField source="roles"/>
            <ArrayField source="addresses">
                <SingleFieldList>
                    <TextField source="country"/>
                </SingleFieldList>
            </ArrayField>
            <EditButton/>
        </Datagrid>
    </List>
);

export const UserEdit = props => (
    <Edit title="Modifier un utilisateur" {...props}>
        <SimpleForm>
            <DisabledInput source="id"/>
            <TextInput source="firstname"/>
            <TextInput source="lastname"/>
            <TextInput source="email"/>
            <DisabledInput source="password"/>
            <LongTextInput source="apiToken"/>
            <TextInput source="roles"/>
            <ArrayField source="addresses">
                <SingleFieldList>
                    <TextInput source="country"/>
                </SingleFieldList>
            </ArrayField>
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="email"/>
            <TextInput source="password"/>
            <TextInput source="firstname"/>
            <TextInput source="lastname"/>
            <TextInput source="country"/>
            <ArrayField source="roles">
                <TextInput source="roles"/>
            </ArrayField>
        </SimpleForm>
    </Create>
);