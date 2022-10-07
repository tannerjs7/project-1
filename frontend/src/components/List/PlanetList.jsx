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
 *      Add a delete button to the table row and clicking on it extracts the _id from the pokemon object
 *      and shoots off a DELETE http request using axios. From there, manually the remove the pokemon
 *      from the list OR refetch data 
 */

// const deletePlanet = async _id => await axios.delete(`http://localhost:9000/planets/${_id}`)

const Planet = ({planet: {name, size, info, isReal, imageUrl, _id}}) => {

    // const [isEdit, toggleIsEdit] = useState(false);

    // This would be altered row that's in edit mode
    // if (isEdit) {
    //     return (<></>)
    // }

    const deletePlanet = async _id => {
        await axios.delete(`http://localhost:9000/planets/${_id}`)
        // window.location.reload()
    }

    return (
        <tr>
            <td className="row-item">{name}</td>
            <td className="row-item">{size}</td>
            <td className="row-item">{info}</td>
            <td className="row-item">{isReal ? 'Yes' : 'No'}</td>
            <td className="row-item"><img height="100" src={imageUrl} alt={name} /></td>
            <td className="row-item"><button onClick={() => deletePlanet(_id)}>Delete</button></td>
        </tr>
    )
}

export const PlanetList = () => {

    const [planetList, setPlanetList] = useState([])

    useEffect(() => {
        axios.get('http://localhost:9000/planets')
            .then(res => setPlanetList(res.data))
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
                        <th>Real</th>
                        <th>Image</th>
                        <th>Delete?</th>
                    </tr>
                </thead>
                <tbody>
                    {planetList.map(planet => <Planet key={planet._id} planet={planet} />)}
                    {/* <button onClick={() => deletePlanet(Planet._id)}>Delete</button> */}
                    {/* {planetList.map(planet =>
                        <tr key = {planet._id}>
                            <td>{planet.name}</td>
                            <td>{planet.size}</td>
                            <td>{planet.info}</td>
                            <td>{planet.isReal}</td>
                            <td>{planet.imageUrl}</td>
                            <td>
                                <button onClick={() => deletePlanet(planet._id)}>Delete</button>
                            </td>
                        </tr>
                        )} */}
                </tbody>
            </table>
        </>
    )
}