import React from 'react'
import styled from "styled-components";

type Props = {
    summonerData:any
    leagueIsLoading:boolean
    league:any
}

const SummonerInfoStyle = styled.section`
	display: flex;
	flex-direction: column;
    margin-bottom: 30px;

    .profile{
        display: flex;
        gap: 15px;
        line-height: 80px;
        align-items: center;
        margin-bottom: 10px;

        .profileImgBox{
            width: 80px;
            height: 80px;
            overflow: hidden;
            background: #000;
            border-radius: 10px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }

    .profileInfo{
        display: flex;
        gap: 20px;

        p{
            font-size: 14px;
            color:var(--color-40per);
        }
    }

`

export default function SummonerInfo (props: Props) {
    return (
        <SummonerInfoStyle>
            <div className='profile'>
                <span className='profileImgBox'>
                    <img src={"https://ddragon.leagueoflegends.com/cdn/12.18.1/img/profileicon/"+props.summonerData.profileIconId+".png"} alt={props.summonerData.name}/>
                </span>
                <h1>{props.summonerData.name}</h1>
            </div>

            {props.leagueIsLoading?"Loading":
                <div className='profileInfo'>
                    <p>소환사레벨 : {props.summonerData.summonerLevel} </p>
                    <p>솔로랭크 : {props.league[0].tier} {props.league[0].rank} </p>
                    <p>자유랭크 : {props.league[1].tier} {props.league[1].rank} </p>
                </div>
            }
        </SummonerInfoStyle>
    )
}