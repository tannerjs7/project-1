import { useState, useEffect } from 'react'
import axios from 'axios'
import { PlanetForm } from '../Form/PlanetForm'

export const PlanetList = ({systemNum}) => {

    // Set up state for the list of planets and edit mode.
    const [planetList, setPlanetList] = useState([])
    const [isEdit, toggleIsEdit] = useState(false)

    /** 
    * Populate planet list with data from the database.
    * systemNum never changes so only runs on mount.
    */
    useEffect(() => {
        axios.get(`http://localhost:9000/planets`)
            .then(res => setPlanetList(res.data.filter(p => p.system === systemNum)))
            .catch(err => console.error(err))
    }, [systemNum])

    const Planet = ({planet: {name, size, info, isReal, imageUrl, _id}}) => {

        // Set up state for planet data.
        const [planetData, setPlanetData] = useState({
            _id: _id,
            name: name,
            size: size,
            info: info,
            isReal: isReal,
            imageUrl: imageUrl
        })

        // Remove the planet from state and the database.
        const deletePlanet = async planetId => {
            try {
                await axios.delete(`http://localhost:9000/planets/${planetId}`)
                setPlanetList(current => current.filter(p => p._id !== planetId))
            } catch (err) {
                console.error(err)
            }
        }

        // Update the planet in state and in the database.
        const editPlanet = async planetId => {
            try {
                await axios.put(`http://localhost:9000/planets/${planetId}`, {...planetData})
                setPlanetList(current => current.map(p => p._id === planetId ? {...planetData} : {...p}))
            } catch (err) {
                console.error(err)
            }
        }

        // View only mode.
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
            // Edit mode.
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
                    <td className="row-item" id="edit-button"><button onClick={() => {editPlanet(_id); toggleIsEdit(!isEdit)}}>Submit</button></td>
                </tr>
            )
        }
    }

    return (
        <>
            {/* Display system name and capacity. */}
            <div id="system-capacity">System {systemNum} Capacity: {planetList.length} / 10</div>

            {/* Show data entry form only if the system isn't full. */}
            {planetList.length >= 10 ? <div id="at-capacity">This system is at capacity. Remove one or more planets in order to add more.</div> :
                <PlanetForm setPlanetList={setPlanetList} planetList={planetList} systemNum={`${systemNum}`}/>}

            {/* Planet data table. */}
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
                    {/* Populate rows using planets from planetList. */}
                    {planetList.map(planet => <Planet key={planet._id} planet={planet} />)}
                </tbody>
            </table>
        </>
    )
}