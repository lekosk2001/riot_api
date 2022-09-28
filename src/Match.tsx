import axios from "axios";
import { useEffect,useState } from "react";
import Participants from './Participants'

type Props = {
    matchId:string;
    dataKey:string;
}

export default function Match (props: Props) {
    
	const [isLoading,setIsLoading] = useState(true);
	const [info,setInfo] = useState([] as any);

// 마운트시, 각 매치 별 데이터 호출.
    async function getMatchData(matchId:string){
		await axios.get('https://asia.api.riotgames.com/lol/match/v5/matches/'+matchId+'?api_key='+props.dataKey).then(
			response => {
                const {
                    data:{ info }
                }= response
                setInfo(info)
		})
		setIsLoading(false)
	}

	useEffect(() => {
		getMatchData(props.matchId)
	},[])

    return (
        <div key={props.matchId}>
            {isLoading?"Loading":
				<div>
                    <h2>{info.gameMode==="CLASSIC"?"--소환사의 협곡--":"--칼바람 나락--"}</h2>
                    <p>{props.matchId}</p>
                    <Participants
                        dataKey={props.dataKey}
                        participants={info.participants}
                        teamA={info.teams[0]}
                        teamB={info.teams[1]}
                    />
                </div>
			}
        </div>
    )
}