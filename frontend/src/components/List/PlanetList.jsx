import { useState, useEffect, } from 'react'
import axios from 'axios'
import { PlanetForm } from '../Form/PlanetForm'

/**
 * For UPDATE AND DELETE operations:
 * 
 * PUT: 
 *      Have two modes to your table row, update mode and not updating (isEdit) state
 *      Use conditional rendering to render the table as normal if !isEdit
 *      If isEdit is true, instead, display a altered table where each data is an input
 *      Or create a form/modal that updates a given pokemon when you click on the edit button
 * 
 * DELETE:
 *      Add a delete button to the table row and clicking on it extract the _id from the pokemon object
 *      and shoots off a DELETE http request using axios. From there, manually the remove the pokemon
 *      from the list OR refetch data 
 */

const Planet = ({planet: {name, size, info, isReal, imageUrl}}) => {

    // const [isEdit, toggleIsEdit] = useState(false);

    // This would be altered row that's in edit mode
    // if (isEdit) {
    //     return (<></>)
    // }
    return (
        <tr>
            <td className="row-item">{name}</td>
            <td className="row-item">{size}</td>
            <td className="row-item">{info}</td>
            <td className="row-item">{isReal ? 'Yes' : 'No'}</td>
            <td className="row-item"><img height="100" src={imageUrl} alt={name} /></td>
        </tr>
    )
}

export const PlanetList = () => {

    const [planetList, setPlanetList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:9000/planets')
            .then(res => {setPlanetList(res.data); console.log(res.data)})
            .catch(err => console.error(err))
    }, [])
    
    return (
        <>
            <PlanetForm setPlanetList={setPlanetList}/>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Info</th>
                        <th>Real?</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {planetList.map(planet => <Planet key={planet._id} planet={planet} />)}
                </tbody>
            </table>
        </>
    )
}