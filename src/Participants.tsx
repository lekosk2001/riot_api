import Summoner from './Summoner'
import styled from 'styled-components'

const ParticipantsStyle = styled.div<{ win:boolean ,teamA:boolean,teamB:boolean }>`
    width: 100%;

    .score{
        height: 40px;
        background-color: ${props => props.win?"var(--color-blue-3bg)":"var(--color-red-3bg)"}; 
        border-radius: 5px;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        
        .kda{
            display: flex;
            gap: 8px;
            align-items: center;
        }

        p{
            color: #000;
            font-weight: 600;
        }

        .teamAwin{
            color: ${props => props.teamA?"var(--color-blue)":"var(--color-red)"}; 
        }
        
        .teamBwin{
            color: ${props => props.teamB?"var(--color-blue)":"var(--color-red)"}; 
        }
    }

    .teamBox{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap: nowrap;
        gap:10px;

        .teamA, .teamB{
        }
    }
`

type Props = {
    participants:any;
    teamA:any;
    teamB:any;
    dataKey:string;
    summonerDesc:any;
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
                    searchedSummoner={props.summonerDesc}
                />
            )
        }
        else if(participant.teamId===200){
            teamB.push(
                <Summoner
                    dataKey={props.dataKey}
                    key={participant.summonerName}
                    summoner={participant}
                    searchedSummoner={props.summonerDesc}
                />
            )
        }
    }

    return (
        <ParticipantsStyle win={props.summonerDesc.win} teamA={props.teamA.win} teamB={props.teamB.win}>
            <div className='score'>
                <p className='teamAwin'>{props.teamA.win?"???":"???"}</p>
                <div className='kda'> <h3>{props.teamA.objectives.champion.kills}</h3> <p> vs </p> <h3>{props.teamB.objectives.champion.kills}</h3> </div>
                <p className='teamBwin'>{props.teamB.win?"???":"???"}</p>
            </div>

            <div className='teamBox'>
                <span className='teamA'>{teamA}</span>
                <span className='teamB'>{teamB}</span>
            </div> 

            {/* <h3>B???</h3>
            <p>?????? {props.teamB.objectives.baron.kills}</p>
            <p>????????? {props.teamB.objectives.dragon.kills}</p>
            <p>?????? {props.teamB.objectives.tower.kills}</p>
            <p>????????? {props.teamB.objectives.champion.kills}</p> */}

        </ParticipantsStyle>
    )
}