import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import DetailsHeader from "../components/DetailsHeader"

import { setActiveSong, playPause } from '../redux/features/playerSlice'
import { useGetSongDetailsQuery } from "../redux/services/shazamCore"

const SongDetails = () => {
    const dispatch = useDispatch();
    const { songId } = useParams()
    const { activeSong, isPlaying } = useSelector((state) => state.player);
  
    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songId })
    console.log(songData);

    return (
    <div className="flex flex-col">
      <DetailsHeader 
        artistId={artistId}
        songData={songData}
      />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS'
            ? songData?.sections[1].text.map((line, i) => (
              <p className="text-gray-400 text-base my-1">{line}</p>
            ))
          : (
            <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default SongDetails
