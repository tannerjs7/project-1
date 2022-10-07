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

// const deletePlanet = async _id => await axios.delete(`http://localhost:9000/planets/${_id}`)

// const Planet = ({planet: {name, size, info, isReal, imageUrl, _id}}) => {

//     // const [isEdit, toggleIsEdit] = useState(false);

//     // This would be altered row that's in edit mode
//     // if (isEdit) {
//     //     return (<></>)
//     // }

//     const deletePlanet = async _id => {
//         await axios.delete(`http://localhost:9000/planets/${_id}`)
//         // window.location.reload()
//     }

//     return (
//         <tr>
//             <td className="row-item">{name}</td>
//             <td className="row-item">{size}</td>
//             <td className="row-item">{info}</td>
//             <td className="row-item">{isReal ? 'Yes' : 'No'}</td>
//             <td className="row-item"><img height="100" src={imageUrl} alt={name} /></td>
//             <td className="row-item"><button onClick={() => deletePlanet(_id)}>Delete</button></td>
//         </tr>
//     )
// }

export const PlanetList = () => {

    const [planetList, setPlanetList] = useState([])
    const [isEdit, toggleIsEdit] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:9000/planets')
            .then(res => setPlanetList(res.data))
            .catch(err => console.error(err))
    }, [])

    const Planet = ({planet: {name, size, info, isReal, imageUrl, _id}}) => {

        const [planetData, setPlanetData] = useState({
            planetName: name,
            planetSize: size,
            planetInfo: info,
            planetIsReal: isReal,
            planetImageUrl: imageUrl
        })

        const deletePlanet = async id => {
            setPlanetList(current => 
                current.filter(p => p._id !== id)
            )
            await axios.delete(`http://localhost:9000/planets/${id}`)
        }

        const handleSubmit = async id => {
            setPlanetList(current => 
                current.map(p => p._id === id ? {...planetData} : p)
            )
            const res = await axios.put(`http://localhost:9000/planets/${id}`, {...planetData})
        }
    
        if (!isEdit) {
            return (
                <tr>
                    <td className="row-item">{name}</td>
                    <td className="row-item">{size}</td>
                    <td className="row-item">{info}</td>
                    <td className="row-item">{isReal ? 'Yes' : 'No'}</td>
                    <td className="row-item"><img height="100" src={imageUrl} alt={name} /></td>
                    <td className="row-item"><button onClick={() => deletePlanet(_id)}>Delete</button></td>
                    <td className="row-item"><button onClick={() => toggleIsEdit(!isEdit)}>Edit</button></td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td className="row-item">
                        <input
                            value={planetData.planetName}
                            size="10"
                            onChange={e => setPlanetData({...planetData, planetName: e.target.value})}
                        />
                    </td>
                    <td className="row-item">
                        <input
                            type="number"
                            value={planetData.planetSize}
                            onChange={e => setPlanetData({...planetData, planetSize: e.target.value})}
                        />
                    </td>
                    <td className="row-item">
                        <input
                            value={planetData.planetInfo}
                            onChange={e => setPlanetData({...planetData, planetInfo: e.target.value})}
                        />
                    </td>
                    <td className="row-item">
                        <input
                            type="checkbox"
                            checked={planetData.planetIsReal}
                            onChange={e => setPlanetData({...planetData, planetIsReal: e.target.value})}
                        />
                    </td>
                    <td className="row-item">
                        <input
                            value={planetData.planetImageUrl}
                            onChange={e => setPlanetData({...planetData, planetImageUrl: e.target.value})}
                        />
                    </td>
                    <td className="row-item"><button onClick={() => deletePlanet(_id)}>Delete</button></td>
                    <td className="row-item"><button onClick={() => {toggleIsEdit(!isEdit); handleSubmit(_id)}}>Submit</button></td>
                </tr>
            )
        }
    }
    
    return (
        <>
            <PlanetForm setPlanetList={setPlanetList} />
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