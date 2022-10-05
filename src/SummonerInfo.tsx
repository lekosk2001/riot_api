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

    .profile{
        display: flex;
        gap: 10px;
        line-height: 80px;
        align-items: center;

        .profileImgBox{
            width: 80px;
            height: 80px;
            overflow: hidden;
            background: #000;
            border-radius: 10px;
        }
    }

`

export default function SummonerInfo (props: Props) {
    return (
        <SummonerInfoStyle>
            <div className='profile'>
                <span className='profileImgBox'>
                    <img src="" alt=""/>
                </span>
                <h1>{props.summonerData.name}</h1>
            </div>

            {props.leagueIsLoading?"Loading":
                <div>
                    <p>솔로랭크 : {props.league[0].tier} {props.league[0].rank} </p>
                    <p>자유랭크 : {props.league[1].tier} {props.league[1].rank} </p>
                </div>
            }
        </SummonerInfoStyle>
    )
}