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
        align-items: center;
        justify-content: center;
    }
`

type Props = {
    summonerDesc:any;
    win:boolean;
    runeIcons:any;
    spellIcon1:any;
    spellIcon2:any;
}

export default function SummonerDesc(props: Props) {
    const Desc = props.summonerDesc
    const spellIcon1 = props.spellIcon1
    const spellIcon2 = props.spellIcon2
    const runeIcons = props.runeIcons

    function itemImgCheck(imgCode:any){
        if(imgCode===0){
            return (<div className='blackPerk'/>)
        }
        else return (<img className='item' src={"https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/"+imgCode+".png"} alt={imgCode} />)
    }

    return (
        <SummonerDescStyle win={props.win}>
            <img className='championImg' src={"https://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/"+Desc.championName+".png"} alt={Desc.championName} />
            <img className='spell' src={"https://ddragon.leagueoflegends.com/cdn/12.18.1/img/spell/"+spellIcon1} alt={Desc.summoner1Id} />
            <img className='spell' src={"https://ddragon.leagueoflegends.com/cdn/12.18.1/img/spell/"+spellIcon2} alt={Desc.summoner2Id} />
            <div className='perkBox'><img src={"https://ddragon.leagueoflegends.com/cdn/img/"+runeIcons[0]} alt={Desc.perks.styles[0].selections[0].perk} /></div>
            <div className='perkBoxSmall'><img src={"https://ddragon.leagueoflegends.com/cdn/img/"+runeIcons[1]} alt={Desc.perks.styles[1].style} /></div>
            <div className='kdaBox'>kda</div>
            {itemImgCheck(Desc.item0)}
            {itemImgCheck(Desc.item1)}
            {itemImgCheck(Desc.item2)}
            {itemImgCheck(Desc.item6)}
            {itemImgCheck(Desc.item3)}
            {itemImgCheck(Desc.item4)}
            {itemImgCheck(Desc.item5)}
        </SummonerDescStyle>
    )
}