import axios from "axios";
import { useEffect,useState } from "react";
import Participants from './Participants'
import styled from "styled-components";

const MatchStyle = styled.div<{ win:any }>`
    max-width: 390px;
    background-color: ${props => props.win?"#ecf2ff":"#fdecee"};
    padding: 30px;
    border-radius: 10px;

    h2{
        color: ${props => props.win?"#5383e8":"#e84057"}; 
    }

    p{
        font-size:14px;
        color:hsl(0, 0%, 60%);
    }

    .matchInfo{
        border-bottom: 1px solid hsl(0, 0%, 80%);
        padding-bottom:10px;
        margin-bottom: 15px;
    }
    
    .matchInfo_up{
        margin-bottom: 3px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .matchInfo_down{
        display: flex;
        gap:10px;
    }
    & p:first-child{
        font-weight: 800;
    }
`

type Props = {
    matchId:string;
    dataKey:string;
}

export default function Match (props: Props) {
    
	const [isLoading,setIsLoading] = useState(true);
	const [info,setInfo] = useState([] as any);

// long 타입 날짜 변환
	function longToDate(longTypeDate:number){
		let date = new Date(longTypeDate);
		let yyyy=date.getFullYear().toString();
		let mm = (date.getMonth()+1).toString();
		let dd = date.getDate().toString();
		let Str = '';
		Str += yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' +(dd[1] ? dd : '0' + dd[0]);
		return Str;
	}

// long 타입 시간 변환
    function convertHMS(value:any) {
        const sec = parseInt(value, 10);
        let hours   = Math.floor(sec / 3600);
        let minutes = Math.floor((sec - (hours * 3600)) / 60);
        let seconds = sec - (hours * 3600) - (minutes * 60);
		let Str = '';
		Str += (hours===0?"":(hours>9 ? hours : '0' + hours) + ':') + (minutes>9 ? minutes : '0' + minutes) + ':' +(seconds>9 ? seconds : '0' + seconds);
		return Str;
    }

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
        <MatchStyle key={props.matchId} win={isLoading?null:info.teams[0].win}>
            {isLoading?"Loading":
                <>
                    <div className="matchInfo">
                        <div className="matchInfo_up">
                            <h2>{info.teams[0].win?"승리":"패배"}</h2>
                            <p>{longToDate(info.gameCreation)}</p>
                        </div>
                        <div className="matchInfo_down">
                            <p> {info.gameMode==="CLASSIC"?"소환사의 협곡":"칼바람 나락"} </p>
                            <p> {convertHMS(info.gameDuration)} </p>
                        </div>
                    </div>

                    <Participants
                        dataKey={props.dataKey}
                        participants={info.participants}
                        teamA={info.teams[0]}
                        teamB={info.teams[1]}
                    />
                </>
			}
        </MatchStyle>
    )
}