import { useState, useEffect, } from 'react'
import axios from 'axios'
import { PlanetForm } from '../Form/PlanetForm'

/**
 * For UPDATE AND DELETE operations:
 * 
 * PUT: 
 *      Have two modes to your table row, update mode and not updating (isEdit) state
 *      Use conditional rendering to render the table as normal if !isEdit
 *      If isEdit is true, instead, display an altered table where each data is an input
 *      Or create a form/modal that updates a given pokemon when you click on the edit button
 * 
 * DELETE:
 *      Add a delete button to the table row and clicking on it extracts the _id from the pokemon object
 *      and shoots off a DELETE http request using axios. From there, manually remove the pokemon
 *      from the list OR refetch data 
 */

export const PlanetList = () => {

    const [planetList, setPlanetList] = useState([])
    const [isEdit, toggleIsEdit] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:9000/planets')
            .then(res => {console.log(res.data); setPlanetList(res.data)})
            .catch(err => console.error(err))
    }, [])

    const Planet = ({planet: {name, size, info, isReal, imageUrl, _id}}) => {

        const [planetData, setPlanetData] = useState({
            _id: _id,
            name: name,
            size: size,
            info: info,
            isReal: isReal,
            imageUrl: imageUrl
        })

        const deletePlanet = async id => {
            setPlanetList(current => 
                current.filter(p => p._id !== id)
            )
            await axios.delete(`http://localhost:9000/planets/${id}`)
        }

        const handleSubmit = async id => {
            console.log(planetList)
            setPlanetList(current =>
                current.map(p => p._id === id ? {...planetData} : {...p})
            )
            await axios.put(`http://localhost:9000/planets/${id}`, {...planetData})
        }

        if (!isEdit) {
            return (
                <tr>
                    <td className="row-item" id="name-view">{name}</td>
                    <td className="row-item" id="size-view">{size}</td>
                    <td className="row-item" id="info-view">{info}</td>
                    <td className="row-item" id="isReal-view">{isReal ? 'Yes' : 'No'}</td>
                    <td className="row-item" id="imageUrl-view"><img height="100" src={imageUrl} alt={name} /></td>
                    <td className="row-item" id="delete-button"><button onClick={() => deletePlanet(_id)}>Delete</button></td>
                    <td className="row-item" id="edit-button"><button onClick={() => toggleIsEdit(!isEdit)}>Edit</button></td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td className="row-item" id="name-edit">
                        <input
                            id="name-input"
                            value={planetData.name}
                            onChange={e => setPlanetData({...planetData, name: e.target.value})}
                        />
                    </td>
                    <td className="row-item" id="size-edit">
                        <input
                            id="size-input"
                            type="number"
                            value={planetData.size}
                            onChange={e => setPlanetData({...planetData, size: e.target.value})}
                        />
                    </td>
                    <td className="row-item" id="info-edit">
                        <input
                            id="info-input"
                            value={planetData.info}
                            onChange={e => setPlanetData({...planetData, info: e.target.value})}
                        />
                    </td>
                    <td className="row-item" id="isReal-edit">
                        <input
                            type="checkbox"
                            checked={planetData.isReal}
                            onChange={() => setPlanetData({...planetData, isReal: !planetData.isReal})}
                        />
                    </td>
                    <td className="row-item" id="imageUrl-edit">
                        <input
                            id="imageUrl-input"
                            value={planetData.imageUrl}
                            onChange={e => setPlanetData({...planetData, imageUrl: e.target.value})}
                        />
                    </td>
                    <td className="row-item" id="delete-button"><button onClick={() => deletePlanet(_id)}>Delete</button></td>
                    <td className="row-item" id="edit-button"><button onClick={() => {toggleIsEdit(!isEdit); handleSubmit(_id)}}>Submit</button></td>
                </tr>
            )
        }
    }
    
    return (
        <>
            <br/>
            <PlanetForm setPlanetList={setPlanetList} />
            <br/>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Info</th>
                        <th>Real</th>
                        <th>Image</th>
                        <th>Delete?</th>
                        <th>Edit?</th>
                    </tr>
                </thead>
                <tbody>
                    {planetList.map(planet => <Planet key={planet._id} planet={planet} />)}
                </tbody>
            </table>
        </>
    )
}