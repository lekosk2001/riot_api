type Props = {
    summoner:any
}

export default function Summoner (props: Props) {

    const summoner = props.summoner;
    const kda = ((summoner.kills+summoner.assists)/summoner.deaths).toFixed(2);

    return (
        <div key={summoner.participantId}>
            <h4>{summoner.summonerName} {summoner.individualPosition==="Invalid"?"":" : "+summoner.individualPosition}</h4>
            <p> {summoner.championName}│Lv.{summoner.champLevel}</p>
            <p>{summoner.kills} / {summoner.deaths} / {summoner.assists} ({kda}:1)</p>
            <p>챔피언에게 가한 피해량 : {summoner.totalDamageDealtToChampions}</p>
            <p>CS : {summoner.totalMinionsKilled}</p>
            <div>
                <p>아이템 : {summoner.item0} │ {summoner.item1} │ {summoner.item2} │ {summoner.item3} │ {summoner.item4} │ {summoner.item5} │ {summoner.item6}</p>
            </div>
        </div>
    )
}