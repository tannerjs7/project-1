import { useState, useEffect, } from 'react'
import axios from 'axios'
import { PlanetForm } from '../Form/PlanetForm'

export const PlanetList = ({systemNum}) => {

    const [planetList, setPlanetList] = useState([])
    const [isEdit, toggleIsEdit] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:9000/planets`)
            .then(res => setPlanetList(res.data.filter(p => p.system === systemNum)))
            .catch(err => console.error(err))
    }, [systemNum])

    const Planet = ({planet: {name, size, info, isReal, imageUrl, _id}}) => {

        const [planetData, setPlanetData] = useState({
            id: _id,
            name: name,
            size: size,
            info: info,
            isReal: isReal,
            imageUrl: imageUrl
        })

        const deletePlanet = async planetId => {
            setPlanetList(current => current.filter(p => p._id !== planetId))
            await axios.delete(`http://localhost:9000/planets/${planetId}`)
        }

        const editPlanet = async planetId => {
            setPlanetList(current => current.map(p => p._id === planetId ? {...planetData} : {...p}))
            await axios.put(`http://localhost:9000/planets/${planetId}`, {...planetData})
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
                    <td className="row-item" id="edit-button"><button onClick={() => {toggleIsEdit(!isEdit); editPlanet(_id)}}>Submit</button></td>
                </tr>
            )
        }
    }

    return (
        <>
            <br/>
            <div id="system-capacity">System Capacity: {planetList.length} / 10</div>
            <br/>
            {planetList.length >= 10 ? <div id="at-capacity">This system is at capacity. Remove one or more planets in order to add.</div> :
                <PlanetForm setPlanetList={setPlanetList} planetList={planetList} systemNum={`${systemNum}`}/>}
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