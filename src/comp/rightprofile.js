import React, { useState, useEffect } from 'react';
import { useDataProvider, Loading, Error } from 'react-admin';
import dataProvider from "../api/dataProvider";

const RightProfile = props => {
    //const dataProvider = useDataProvider();
    const [right, setRight] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    console.log("-------------------- PROPERTIES ---------------------------");
    console.log(props);
    console.log("-------------------- HURRE ---------------------------");
    console.log(right);
    console.log("-------------------- SCGHALMLE ---------------------------");
    console.log(this);
    let itemid =  props.record.id;
    useEffect(() => {
        //alert("Hure");
        dataProvider.getOne('right', { id: itemid})
            .then(({ data }) => {
                setRight(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, []);

    if (loading) return <Loading />;
    if (error) return <Error />;
    //console.log(right);
    if (!right) return null;

    return (
        <ul>
            <li>Name: {right[0].name}</li>
        </ul>
    )
};

export default RightProfile
