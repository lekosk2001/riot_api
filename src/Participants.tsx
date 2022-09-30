import Summoner from './Summoner'

type Props = {
    participants:any;
    teamA:any;
    teamB:any;
    dataKey:string;
}

export default function Participants (props: Props) {

    const teamA = [];
    const teamB = [];
    for ( var participant of props.participants) {
        if (participant.teamId===100){
            teamA.push(
                <Summoner
                    dataKey={props.dataKey}
                    key={participant.summonerName}
                    summoner={participant}
                />
            )
        }
        else if(participant.teamId===200){
            teamB.push(
                <Summoner
                    dataKey={props.dataKey}
                    key={participant.summonerName}
                    summoner={participant}
                />
            )
        }
    }

    return (
        <div>
            <h3>A팀</h3>
            <p>바론 {props.teamA.objectives.baron.kills}</p>
            <p>드래곤 {props.teamA.objectives.dragon.kills}</p>
            <p>타워 {props.teamA.objectives.tower.kills}</p>
            <p>챔피언 {props.teamA.objectives.champion.kills}</p>
            {teamA}

            <h3>B팀</h3>
            <p>바론 {props.teamB.objectives.baron.kills}</p>
            <p>드래곤 {props.teamB.objectives.dragon.kills}</p>
            <p>타워 {props.teamB.objectives.tower.kills}</p>
            <p>챔피언 {props.teamB.objectives.champion.kills}</p>
            {teamB}
        </div>
    )
}