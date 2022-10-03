import React from 'react'
import styled from "styled-components";

const SummonerDescStyle = styled.div<{ win:boolean }>`
    display: grid;
    grid-template-columns: 30px 30px 30px 30px;
    grid-template-rows : 30px 30px 65px 30px 30px;
    gap: 5px;

    .championImg{
        border-radius: 5px;
        background-color: hsl(0, 0%, 90%);
        grid-column-start: 1;
        grid-column-end: 3;
        grid-row-start: 1;
        grid-row-end: 3;
        overflow: hidden;
        width: 100%;
    }

    .perkBox,.perkBoxSmall{
        border-radius: 30px;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background: #000;
        display:flex;
        justify-content: center;
        align-items: center;

        img{
            margin: auto auto;
        }
    }

    .perkBox img{
            height: 80%;
    }

    .perkBoxSmall img{
            height: 60%;
    }

    .item, .spell{
        border-radius: 5px;
        width: 100%;
        overflow: hidden;
    }

    .blackPerk{
        background-color: ${props => props.win?"#cadaff":"#f9cacf"}; 
        border-radius: 5px;        
    }

    .kdaBox{
        grid-column-start: 1;
        grid-column-end: 5;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap:1px;

        .kda{
        display: flex;
        gap: 8px;
        align-items: center;

        h3{
            font-size: 20px;
        }
        }
        .kdaDesc{
            display: flex;
            gap:2px;
        }
    }
`

type Props = {
    summonerDesc:any;
    win:boolean;
    runeIcons:any;
    spellIcon1:any;
    spellIcon2:any;
    team:any;
}

export default function SummonerDesc(props: Props) {
    const desc = props.summonerDesc
    const team = props.team
    const spellIcon1 = props.spellIcon1
    const spellIcon2 = props.spellIcon2
    const runeIcons = props.runeIcons
    const kda = ((desc.kills+desc.assists)/desc.deaths).toFixed(2);
    const killRate = (((desc.kills+desc.assists)/team.objectives.champion.kills)*100).toFixed();

    function itemImgCheck(imgCode:any){
        if(imgCode===0){
            return (<div className='blackPerk'/>)
        }
        else return (<img className='item' src={"https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/"+imgCode+".png"} alt={imgCode} />)
    }


    console.log(team)
    return (
        <SummonerDescStyle win={props.win}>
            <img className='championImg' src={"https://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/"+desc.championName+".png"} alt={desc.championName} />
            <img className='spell' src={"https://ddragon.leagueoflegends.com/cdn/12.18.1/img/spell/"+spellIcon1} alt={desc.summoner1Id} />
            <img className='spell' src={"https://ddragon.leagueoflegends.com/cdn/12.18.1/img/spell/"+spellIcon2} alt={desc.summoner2Id} />
            <div className='perkBox'><img src={"https://ddragon.leagueoflegends.com/cdn/img/"+runeIcons[0]} alt={desc.perks.styles[0].selections[0].perk} /></div>
            <div className='perkBoxSmall'><img src={"https://ddragon.leagueoflegends.com/cdn/img/"+runeIcons[1]} alt={desc.perks.styles[1].style} /></div>
            <div className='kdaBox'>
                <div className='kda'><h3>{desc.kills}</h3> <p>/</p> <h3 className='color_red'>{desc.deaths}</h3> <p>/</p> <h3>{desc.assists}</h3></div>
                <div className='kdaDesc'><p className='bold'>{kda}점</p><p>(킬관여 {killRate}%)</p></div>
            </div>
            {itemImgCheck(desc.item0)}
            {itemImgCheck(desc.item1)}
            {itemImgCheck(desc.item2)}
            {itemImgCheck(desc.item6)}
            {itemImgCheck(desc.item3)}
            {itemImgCheck(desc.item4)}
            {itemImgCheck(desc.item5)}
        </SummonerDescStyle>
    )
}