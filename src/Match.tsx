import axios from "axios";
import { useEffect,useState } from "react";
import Participants from './Participants'
import styled from "styled-components";
import SummonerDesc from "./SummonerDesc";

const MatchStyle = styled.div<{ win:boolean }>`
    max-width: 390px;
    background-color: ${props => props.win?"var(--color-blue-bg)":"var(--color-red-bg)"};
    padding: 30px;
    padding-bottom: 40px;
    border-radius: 10px;

    h2{
        color: ${props => props.win?"var(--color-blue)":"var(--color-red)"}; 
    }

    p{
        font-size:14px;
        color:var(--color-60per);
    }

    .matchInfo{
        border-bottom: 1px solid var(--color-80per);
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
        
        & p:first-child{
            font-weight: 800;
        }
    }

    .matchDesc{
        display: flex;
        gap: 25px;
        /* flex-wrap: wrap; */
    }
`

type Props = {
    matchId:string;
    dataKey:string;
    summonerData:any;
    allRunesData:any;
    allSummonersData:any;
}

export default function Match (props: Props) {
	const [isLoading,setIsLoading] = useState(true);
	const [info,setInfo] = useState() as any;
    const [summonerDesc,setSummonerDesc] = useState() as any;
    const [runeIcons,setRuneIcons] = useState() as any;
    const [spellIcon1,setSpellIcon1]= useState() as any;
    const [spellIcon2,setSpellIcon2]= useState() as any;

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

                const participant = info.participants.filter((participant:any)=>props.summonerData.puuid===participant.puuid)
                setSummonerDesc(participant[0])

                const runeIcon1 = props.allRunesData.filter((rune:any)=>rune.id===participant[0].perks.styles[0].style)
                const runeIcon2 = props.allRunesData.filter((rune:any)=>rune.id===participant[0].perks.styles[1].style)
                const runeIcon1Detail = runeIcon1[0].slots[0].runes.filter((rune:any)=>rune.id===participant[0].perks.styles[0].selections[0].perk)
                setRuneIcons([runeIcon1Detail[0].icon,runeIcon2[0].icon])
                
                const spells =  props.allSummonersData
                for (const spell in spells) {
                    if (spells[spell].key.toString()===participant[0].summoner1Id.toString()) {
                        const spell1 = spells[spell]
                        setSpellIcon1(spell1.image.full)
                    }
                    if (spells[spell].key.toString()===participant[0].summoner2Id.toString()) {
                        const spell2 = spells[spell]
                        setSpellIcon2(spell2.image.full)
                    }
                }
		})
		setIsLoading(false)
	}

	useEffect(() => {
		getMatchData(props.matchId)
	},[])

    return (
        <MatchStyle key={props.matchId} win={isLoading?null:summonerDesc.win}>
            {isLoading?"Loading":
                <>
                    <div className="matchInfo">
                        <div className="matchInfo_up">
                            <h2>{summonerDesc.win?"승리":"패배"}</h2>
                            <p>{longToDate(info.gameCreation)}</p>
                        </div>
                        <div className="matchInfo_down">
                            <p> {info.gameMode==="CLASSIC"?"소환사의 협곡":"칼바람 나락"} </p>
                            <p> {convertHMS(info.gameDuration)} </p>
                        </div>
                    </div>
                    <div className="matchDesc">
                        <SummonerDesc
                            summonerDesc={summonerDesc}
                            win={summonerDesc.win}
                            runeIcons={runeIcons}
                            spellIcon1={spellIcon1}
                            spellIcon2={spellIcon2}
                            team={summonerDesc.win===info.teams[0].win?info.teams[0]:info.teams[1]}
                            />
                        <Participants
                            summonerDesc={summonerDesc}
                            dataKey={props.dataKey}
                            participants={info.participants}
                            teamA={info.teams[0]}
                            teamB={info.teams[1]}
                        />
                    </div>

                </>
			}
        </MatchStyle>
    )
}