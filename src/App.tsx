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
	justify-content: center;
	align-items: center;
	height: 200px;
`

function App() {
	const dataKey = "RGAPI-3b66d873-4378-4843-9738-eeb4a00d732d"
	const 소환사명= "레코스크"

	// 스테이트
	const [isLoading,setIsLoading] = useState(true);
	const [leagueIsLoading,setLeagueIsLoading] = useState(true);
	const [summonerData,setSummonerData] = useState([]) as any;
	const [league,setLeague]=useState([{}]) as any;
	const [matches,setMatches]=useState([]) as any;

	// 마운트시, 소환사명과 key를 통해 puuid를 확인하여, 매치정보를 불러옴.
	async function getData(소환사명:string,dataKey:string){
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
				})
				.catch((error) => {
					console.log(error)
				})

				//매치 데이터
				axios.get("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/"+summonerData.puuid+"/ids?start=0&count=6&api_key="+dataKey)
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
		getData(소환사명,dataKey)
	}, [])

	return (
		<>
			<GlobalStyle />
			<Header
				submit={getData}
				dataKey={dataKey}
			/>
			{isLoading?<Main>Loading</Main>:
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
			<Footer>푸터</Footer>
		</>
	);
}

export default App;
