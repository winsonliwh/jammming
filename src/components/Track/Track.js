import './Track.css'

const Track = ({ track, id, name, artist, album, onAdd, onRemove, isRemoval }) => {

    const renderAction = () => {
        if (isRemoval) {
            return <button className="Track-action" onClick={removeTrack}>-</button>
        } else {
            return <button className="Track-action" onClick={addTrack}>+</button>
        }
    }

    const addTrack = () => {
        onAdd(track)
    }

    const removeTrack = () => {
        onRemove(track)
    }

    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{name}</h3>
                <p>{artist} | {album}</p>
            </div>
            {renderAction()}
        </div>
    )
}

export default Track