import './TrackList.css'

import Track from '../Track/Track'

const TrackList = ({ tracks, onAdd, onRemove, isRemoval }) => {
    return (
        <div className="TrackList">
            {
                tracks.map(track => {
                    const { name, artist, album, id } = track;
                    return (
                        <Track 
                            track={track} 
                            key={id} 
                            name={name}
                            artist={artist}
                            album={album}

                            onAdd={onAdd} 
                            onRemove={onRemove} 
                            isRemoval={isRemoval}

                        />
                    )
                })
            }
        </div>
    )
}

export default TrackList