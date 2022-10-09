import { useState, useEffect, } from 'react'
import axios from 'axios'
import { PlanetForm } from '../Form/PlanetForm'

export const PlanetList = ({systemId}) => {

    const [planetList, setPlanetList] = useState([])
    const [isEdit, toggleIsEdit] = useState(false)
    const [systemPlanets, setSystemPlanets] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:9000/systems/${systemId}`)
            .then(res => setSystemPlanets(res.data.planets))
            .catch(err => console.error(err))
    }, [systemId])

    useEffect(() => {
        systemPlanets.forEach(current =>
            axios.get(`http://localhost:9000/planets/${current}`)
                .then(res2 => setPlanetList(p => [...p, res2.data]))
                .catch(err => console.error(err))
        )
    }, [systemPlanets])

    const Planet = ({planet: {name, size, info, isReal, imageUrl, _id: id}}) => {

        const [planetData, setPlanetData] = useState({
            id: id,
            name: name,
            size: size,
            info: info,
            isReal: isReal,
            imageUrl: imageUrl
        })

        const deletePlanet = async planetId => {
            setPlanetList(current => current.filter(p => p.id !== planetId))
            await axios.delete(`http://localhost:9000/planets/${planetId}`)
            setSystemPlanets(current => current.filter(p => p !== planetId))
            await axios.put(`http://localhost:9000/systems/${systemId}`, {planets: systemPlanets})
        }

        const editPlanet = async planetId => {
            await axios.put(`http://localhost:9000/planets/${planetId}`, {...planetData})
            setPlanetList(current =>
                current.map(p => p.id === planetId ? {...planetData} : {...p})
            )
        }

        if (!isEdit) {
            return (
                <tr>
                    <td className="row-item" id="name-view">{name}</td>
                    <td className="row-item" id="size-view">{size}</td>
                    <td className="row-item" id="info-view">{info}</td>
                    <td className="row-item" id="isReal-view">{isReal ? 'Yes' : 'No'}</td>
                    <td className="row-item" id="imageUrl-view"><img height="100" src={imageUrl} alt={name} /></td>
                    <td className="row-item" id="delete-button"><button onClick={() => deletePlanet(id)}>Delete</button></td>
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
                    <td className="row-item" id="delete-button"><button onClick={() => deletePlanet(id)}>Delete</button></td>
                    <td className="row-item" id="edit-button"><button onClick={() => {toggleIsEdit(!isEdit); editPlanet(id)}}>Submit</button></td>
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
                    {planetList.map(planet => <Planet key={planet.id} planet={planet} />)}
                </tbody>
            </table>
        </>
    )
}