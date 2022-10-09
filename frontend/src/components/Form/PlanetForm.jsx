import axios from 'axios'
import { useState } from 'react'

export const PlanetForm = (props) => {

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
        })
    }

    const handleSubmit = async event => {
        event.preventDefault() // Prevents page from refreshing
        try {
            if (props.planetList.length < 10) {
                const res = await axios.post('http://localhost:9000/planets', {...planetData, system: props.systemNum})
                props.setPlanetList(p => [...p, res.data])
            }
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
                <label htmlFor="planet-name">Name (Required): </label>
                <input 
                    id="planet-name"
                    value={planetData.name}
                    onChange={e => setPlanetData({...planetData, name: e.target.value})} 
                />
            </div>
            <div>
                <label htmlFor="planet-size">Size (Required): </label>
                <input 
                    id="planet-size"
                    type="number"
                    value={planetData.size}
                    onChange={e => setPlanetData({...planetData, size: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="planet-info">Information: </label>
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
            <button className="form-button" id="for"type="reset" onClick={handleClear}>Clear</button>
            <button className="form-button">Submit</button>
        </form>
    )
}