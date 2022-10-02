import styled from "styled-components";
import axios from "axios";
import { useEffect,useState } from "react";
import Form from "./Form";
import Matches from "./Matches"
import GlobalStyle from "./GlobalStyle";
import SummonerInfo from "./SummonerInfo";

const Main = styled.main`
	display: flex;
	padding: 0px 40px;
	gap: 20px;
`
const Aside = styled.aside`
	width: 220px;
`

function App() {
	const dataKey = "RGAPI-8666ca75-a87e-42ee-93e2-b97c2dadd160"
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
				axios.get("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/"+summonerData.puuid+"/ids?start=0&count=5&api_key="+dataKey)
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
		<div>
			<GlobalStyle />
			<Form
				submit={getData}
				dataKey={dataKey}
			/>
			{isLoading?<Main>Loading</Main>:
				<Main>
					<Aside/>
					<div>
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
		</div>
	);
}

export default App;
