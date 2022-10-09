import axios from 'axios'
import { useState } from 'react'

export const PlanetForm = props => {

    /**
     * Set up state for planet data.
     * Name and size are required, with size being between 1 and 1000.
     */
    const [planetData, setPlanetData] = useState({
        name: '',
        size: 1,
        info: null,
        isReal: false,
        imageUrl: null
    })

    /**
     * Clear form data.
     * Called when clear or submit button is clicked.
     */
    const handleClear = () => {
        setPlanetData({
            name: '',
            size: 1,
            info: null,
            isReal: false,
            imageUrl: null
        })
    }

    // Submit new planet and clear form.
    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const res = await axios.post('http://localhost:9000/planets', {...planetData, system: props.systemNum})
            props.setPlanetList(p => [...p, res.data])
            event.target.reset()
            handleClear()
            console.log(123)
        } catch (err) {
            console.error(err)
        }
    }

    // Planet submission form.
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
                <label htmlFor="planet-size">Size (1 - 1000): </label>
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
                    size="50"
                    value={planetData.info}
                    onChange={e => setPlanetData({...planetData, info: e.target.value})}
                />
            </div>
            <div>
                <label htmlFor="is-real">Is it a Real Planet? </label>
                <input
                    class="check"
                    id="is-real"
                    type="checkbox"
                    checked={planetData.isReal}
                    onChange={() => setPlanetData({...planetData, isReal: !planetData.isReal})}
                />
            </div>
            <div>
                <label htmlFor="image-url">Image URL: </label>
                <input
                    id="image-url"
                    size="50"
                    value={planetData.imageUrl}
                    onChange={e => setPlanetData({...planetData, imageUrl: e.target.value})}/>
            </div>
            <button className="form-button" id="for"type="reset" onClick={handleClear}>Clear</button>
            <button className="form-button">Submit</button>
        </form>
    )
}