import React from 'react'
import styled from "styled-components";

type Props = {
    summonerData:any
    leagueIsLoading:boolean
    league:any
}

const SummonerInfoStyle = styled.article`
	display: flex;
	flex-direction: column;
`

export default function SummonerInfo (props: Props) {
    return (
        <SummonerInfoStyle>
            <h1>{props.summonerData.name}</h1>
            {props.leagueIsLoading?"Loading":
                <div>
                    <p>솔로랭크 : {props.league[0].tier} {props.league[0].rank} </p>
                    <p>자유랭크 : {props.league[1].tier} {props.league[1].rank} </p>
                </div>
            }
        </SummonerInfoStyle>
    )
}