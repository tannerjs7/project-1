import axios from 'axios'
import { useState } from 'react'

// const ourPlanets = [
//     <option>Please Select a Planet</option>,
//     <option>Mercury</option>,
//     <option>Venus</option>,
//     <option>Earth</option>,
//     <option>Mars</option>,
//     <option>Jupiter</option>,
//     <option>Saturn</option>,
//     <option>Uranus</option>,
//     <option>Neptune</option>,
//     <option>Pluto</option>,
// ]

export const PlanetForm = ({setPlanetList}) => {

    const [planetData, setPlanetData] = useState({
        name: '',
        size: 0,
        info: null,
        isReal: false,
        imageUrl: null
    })

    const handleClear = () => {
        setPlanetData({
            name: '',
            size: 0,
            info: null,
            isReal: false,
            imageUrl: null
        });
    }

    const handleSubmit = async event => {
        event.preventDefault() // Prevents page from refreshing
        try {
            const res = await axios.post('http://localhost:9000/planets', {...planetData})
            setPlanetList(p => [...p, res.data])
            event.target.reset()
            handleClear()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="planet-form">
            <div id="planet-submission">
                <u>Planet Submission Form:</u>
            </div>
            <div>
                <label htmlFor="planet-name">Planet Name: </label>
                <input 
                    id="planet-name"
                    value={planetData.name}
                    onChange={e => setPlanetData({...planetData, name: e.target.value})} 
                />
            </div>
            <div>
                <label htmlFor="planet-size">Planet Size: </label>
                <input 
                    id="planet-size"
                    type="number"
                    value={planetData.size}
                    onChange={e => setPlanetData({...planetData, size: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="planet-info">Description: </label>
                <input 
                    id="planet-info"
                    value={planetData.info}
                    onChange={e => setPlanetData({...planetData, info: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="is-real">Is it a Real Planet? </label>
                <input id="is-real"
                    type="checkbox"
                    onChange={() => setPlanetData({...planetData, isReal: !planetData.isReal})}
                />
            </div>
            <div>
                <label htmlFor="image-url">Image URL: </label>
                <input id="image-url"
                    value={planetData.imageUrl}
                    onChange={e => setPlanetData({...planetData, imageUrl: e.target.value})}/>
            </div>
            <button type="reset" onClick={handleClear}>Clear</button>
            <button>Submit</button>
        </form>
    )
}