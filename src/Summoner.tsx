import axios from "axios";
import { useState,MouseEvent } from "react";

type CustomMouseEvent = MouseEvent<HTMLElement>

type Props = {
    summoner:any;
    dataKey:string;
}

export default function Summoner (props: Props) {

    const summoner = props.summoner;
    const dataKey = props.dataKey
    const kda = ((summoner.kills+summoner.assists)/summoner.deaths).toFixed(2);

	const [isLoading,setIsLoading] = useState(true);
	const [summonerLeagueData,setSummonerLeagueData] = useState([{}] as any);

    async function getSummonerData(event: CustomMouseEvent){
        if (isLoading) {
            await axios.get("https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/"+summoner.summonerId+"?api_key="+dataKey)
            .then((response) => {

                const allLeague = [];
                const league = response.data;
                for (let i = 0; i < response.data.length; i++) {
                    allLeague.push(<p key={i}>{league[i].queueType==="RANKED_SOLO_5x5"?"솔로랭크":"자유랭크"} : {league[i].tier} {league[i].rank} </p>)
                }
                setSummonerLeagueData(allLeague)
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
        }
	}

    return (
        <div key={summoner.participantId} onMouseOver={getSummonerData}>
            <h4>{summoner.summonerName} {summoner.individualPosition==="Invalid"?"":" : "+summoner.individualPosition}</h4>
            <p>{summoner.championName}│Lv.{summoner.champLevel}</p>
            <p>{summoner.kills} / {summoner.deaths} / {summoner.assists} ({kda}:1)</p>
            <p>챔피언에게 가한 피해량 : {summoner.totalDamageDealtToChampions}</p>
            <p>CS : {summoner.totalMinionsKilled}</p>
            <div>
                <p>아이템 : {summoner.item0} │ {summoner.item1} │ {summoner.item2} │ {summoner.item3} │ {summoner.item4} │ {summoner.item5} │ {summoner.item6}</p>
            </div>
            
            {isLoading?
                <button onClick={getSummonerData}>랭크보기</button>:
                    <div>
                        {summonerLeagueData.length===0?"랭크없음":summonerLeagueData}
                    </div>
                }
        </div>
    )
}