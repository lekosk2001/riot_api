import axios from "axios";
import { useEffect,useState } from "react";
import styled from "styled-components";
import Match from "./Match"

type Props = {
    datakey:string;
    matches:any;
	summonerData:any;
}

const MatchesStyle = styled.section`
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
`

export default function Matches (props: Props) {

	const [allRunesData,setAllRunesData]=useState() as any;
	const [allSummonersData,setAllSummonersData]=useState() as any;

	async function getMatchData(){
		await axios.get('https://ddragon.leagueoflegends.com/cdn/12.18.1/data/ko_KR/runesReforged.json').then(
			response => {
				const {
                    data
                }= response
				setAllRunesData(data)
		})

		await axios.get("https://ddragon.leagueoflegends.com/cdn/12.18.1/data/ko_KR/summoner.json").then(
			response => {
				const {
                    data:{data}
                }= response
				setAllSummonersData(data)
		})
	}

	useEffect(() => {
		getMatchData()
	},[])

	const allMatches=[]
	for (let i = 0; i < props.matches.length; i++) {
		allMatches.push(
			<Match
				summonerData={props.summonerData}
				matchId={props.matches[i]}
				dataKey={props.datakey}
				key={i}
				allRunesData={allRunesData}
				allSummonersData={allSummonersData}
			/>
		)
	}

    return (
        <MatchesStyle>
        {allMatches}
        </MatchesStyle>
    )
}