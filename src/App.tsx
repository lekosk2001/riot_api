import styled from "styled-components";
import axios from "axios";
import { useEffect,useState } from "react";
// import Aside from "./Aside"
import Header from "./Header";
import Matches from "./Matches"
import GlobalStyle from "./GlobalStyle";
import SummonerInfo from "./SummonerInfo";

const Main = styled.main`
	display: flex;
	padding: 0px 40px;
	gap: 20px;
	margin-top: 120px;
	justify-content: center;

	.matchData{
		max-width: 1300px;
	}
`

const Footer = styled.footer`
	padding: 0px 40px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 160px;

	p{
		font-size: 12px;
		color:var(--color-60per);
	}
`

function App() {
	const dataKey = "RGAPI-c8b8c615-24e8-4d16-bbe1-944cc7172822"

	// 스테이트
	const [isLoading,setIsLoading] = useState(true);
	const [leagueIsLoading,setLeagueIsLoading] = useState(true);
	const [summonerData,setSummonerData] = useState([]) as any;
	const [league,setLeague]=useState([{}]) as any;
	const [matches,setMatches]=useState([]) as any;
	// const [matchType,setMatceType]=useState("") as any;

	// 마운트시, 소환사명과 key를 통해 puuid를 확인하여, 매치정보를 불러옴.
	async function getData(소환사명:string, dataKey:string, matcheType:string){
		//서머너 데이터
		await axios.get('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+소환사명+'?api_key='+dataKey).then(
			(response) => {
				const summonerData = response.data;
				setSummonerData(summonerData)

				// 리그 데이터
				axios.get("https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/"+summonerData.id+"?api_key="+dataKey)
				.then((response) => {
					setLeague(response.data)
					setLeagueIsLoading(false) // 리그데이터 로딩 해제.
					setMatches([]) // 매치 데이터 초기화.
				})
				.catch((error) => {
					console.log(error)
				})

				//매치 데이터
				axios.get("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/"+summonerData.puuid+"/ids?type="+matcheType+"&start=0&count=6&api_key="+dataKey)
				.then((response) => {
					setMatches(response.data)
				})
				.catch((error) => {
					console.log(error)
				})
			setIsLoading(false)
		})
		.catch((error) => {
			console.log(error)
		})
	}

	// 마운트 시
	useEffect(() => {
		// getData(소환사명,dataKey)
	}, [])

	return (
		<>
			<GlobalStyle />
			<Header
				submit={getData}
				dataKey={dataKey}
				// matchType={matchType}
			/>
				{isLoading?
					<Main>
						<h2>소환사명을 입력해주세요.</h2>
					</Main>:
					<Main>
						{/* <Aside/> */}
						<div className="matchData">
							<SummonerInfo
								summonerData={summonerData}
								leagueIsLoading={leagueIsLoading}
								league={league}
							/>
							<Matches
								summonerData={summonerData}
								matches={matches}
								datakey={dataKey}
							/>
						</div>
					</Main>
				}
			<Footer>
				<p>© 2022 LGSP Games, Inc. All rights reserved.</p>
				<p>LGSP Games are trademarks, service marks, and registered trademarks of LGSP Games, Inc.</p>
			</Footer>
		</>
	);
}

export default App;
