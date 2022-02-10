import './SearchResults.css'

// import Track from '../Track/Track'
import TrackList from '../TrackList/TrackList'

const SearchResults = ({ searchedTracks, onAdd }) => {
    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList  tracks={searchedTracks} onAdd={onAdd} isRemoval={false}/>
        </div>
    )
}
// const SearchResults = (props) => {
//     return (
//         <div className="SearchResults">
//             <h2>Results</h2>
//             <div>
//                 {
//                     props.tracks.map(track => {
//                         return (
//                             <Track 
//                                 track={track}
//                             />
//                             )
//                     }) 
//                 }
//             </div>
//         </div>
//     )
// }

export default SearchResults