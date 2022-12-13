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

	ul{
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
		justify-content: center;
	}

	.sort{
		display: flex;
		gap: 10px;
		margin-bottom: 20px;

		button{
			height: 40px;
			border-radius: 5px;
			background-color: var(--color-90per);
			display:flex;
			justify-content: center;
			align-items: center;
			padding: 0px 10px;
			cursor: pointer;
			transition: 0.2s ease;

			p{
				font-size: 14px;
			}

			&:hover{
				background-color: var(--color-80per);
			}
		}

		.active{
			background-color: black;

			p{
				color: #fff;
			}

			&:hover{
				background-color: black;
			}
		}

	}
`

export default function Matches (props: Props) {

	const [allRunesData,setAllRunesData]=useState() as any;
	const [allSummonersData,setAllSummonersData]=useState() as any;
	// const [matchType,setMatchType]=useState("") as any;

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
			{/* <div className="sort">
				<button
					// onClick={setMatchType("")}
					className="active"><p>전체</p></button>
				<button
					// onClick={setMatchType("ranked")}
				><p>랭크</p></button>
				<button
					// onClick={setMatchType("normal")}
				><p>일반</p></button>
			</div> */}

			<ul>
				{allMatches}
			</ul>
        </MatchesStyle>
    )
}