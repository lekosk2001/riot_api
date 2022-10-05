import axios from "axios";
import styled from 'styled-components'
import { useState,MouseEvent } from "react";

type CustomMouseEvent = MouseEvent<HTMLElement>

type Props = {
    summoner:any;
    dataKey:string;
    searchedSummoner:any;
}

const SummonerStyle = styled.div<{ 일치:boolean }>`
    display: flex;
    gap: 5px;
    flex-wrap: nowrap;
    margin-bottom: 5px;

    p{
        font-size: 12px;
    }

    .summonerName{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: ${props => props.일치?"#000":"var(--color-40per)"};
        max-width: 70px;
        line-height: 20px;
        font-weight:${props => props.일치?"600":null};;
    }

    .championImgBox{
        width: 20px;
        height: 20px;
        overflow: hidden;
        background: #000;
        border-radius: ${props => props.일치?"10px":null};

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`

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
        <SummonerStyle key={summoner.participantId} onMouseOver={getSummonerData} 일치={props.searchedSummoner.summonerName===summoner.summonerName}>
            <div className="championImgBox">
                <img className='championImg'
                    src={summoner.championName==="FiddleSticks"?"https://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/Fiddlesticks.png":"https://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/"+summoner.championName+".png"} // 피들스틱 임시 수정.
                    alt={summoner.championName} />
            </div>
            <p className="summonerName">{summoner.summonerName}</p>
            {/* {summoner.individualPosition==="Invalid"?"":" : "+summoner.individualPosition} */}
            {/* <p>{summoner.championName}│Lv.{summoner.champLevel}</p>
            <p>{summoner.kills} / {summoner.deaths} / {summoner.assists} ({kda}:1)</p>
            <p>챔피언에게 가한 피해량 : {summoner.totalDamageDealtToChampions}</p>
            <p>CS : {summoner.totalMinionsKilled}</p>
            <div>
                <p>아이템 : {summoner.item0} │ {summoner.item1} │ {summoner.item2} │ {summoner.item3} │ {summoner.item4} │ {summoner.item5} │ {summoner.item6}</p>
            </div> */}
            
            {/* {isLoading?
                <button onClick={getSummonerData}>랭크보기</button>:
                    <div>
                        {summonerLeagueData.length===0?<p>랭크없음</p>:summonerLeagueData}
                    </div>
                } */}
        </SummonerStyle>
    )
}