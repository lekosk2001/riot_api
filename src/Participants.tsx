import Summoner from './Summoner'

type Props = {
    participants:any;
    teamA:any;
    teamB:any;
}

export default function Participants (props: Props) {

    const teamA = [];
    const teamB = [];
    for ( var participant of props.participants) {
        if (participant.teamId===100){
            teamA.push(
                <Summoner
                    key={participant.summonerName}
                    summoner={participant}
                />
            )
        }
        else if(participant.teamId===200){
            teamB.push(
                <Summoner
                    key={participant.summonerName}
                    summoner={participant}
                />
            )
        }
    }

    return (
        <div>
            <h3>A팀</h3>
            <p>{props.teamA.win?"승리":"패배"}</p>
            <p>바론 {props.teamA.objectives.baron.kills}</p>
            <p>드래곤 {props.teamA.objectives.dragon.kills}</p>
            <p>타워 {props.teamA.objectives.tower.kills}</p>
            <p>챔피언 {props.teamA.objectives.champion.kills}</p>
            {teamA}

            <h3>B팀</h3>
            <p>{props.teamB.win?"승리":"패배"}</p>
            {teamB}
        </div>
    )
}