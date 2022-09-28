// import styled from "styled-components";
import axios from "axios";
import { useEffect,useState } from "react";
import Form from "./Form";
import Match from "./Match"

function App() {
	const dataKey = "RGAPI-631bc0cf-5e03-4d8b-a6a4-20844a46f246"

	// 스테이트
	const [isLoading,setIsLoading] = useState(true);
	const [summonerData,setSummonerData] = useState() as any;
	const [league,setLeague]=useState([]) as any;
	const [matches,setMatches]=useState([]);

	// long 타입 날짜 변환
	function longToDate(longTypeDate:number){
		let date = new Date(longTypeDate);
		let yyyy=date.getFullYear().toString();
		let mm = (date.getMonth()+1).toString();
		let dd = date.getDate().toString();
		let Str = '';
		Str += yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' +(dd[1] ? dd : '0' + dd[0]);
		return Str;
	}

	// 매치 데이터 컴포넌트 생성
	const allMatches=[]
	for (let i = 0; i < matches.length; i++) {
		allMatches.push(
			<Match
				matchId={matches[i]}
				dataKey={dataKey}
				key={i}
			/>
		)
	}
	
	// 마운트시, 소환사명과 key를 통해 puuid를 확인하여, 매치정보를 불러옴.
	async function getData(소환사명:string,key:string){
		await axios.get('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+소환사명+'?api_key='+key).then(
			(response) => {
				const summonerData = response.data;
				setSummonerData(summonerData)

				// 리그 데이터
				axios.get("https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/"+summonerData.id+"?api_key="+key)
				.then((response) => {
					setLeague(response.data)
				})

				//매치 데이터
				axios.get("https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/"+summonerData.puuid+"/ids?start=0&count=5&api_key="+key)
				.then((response) => {
					setMatches(response.data)
				})
		})
		setIsLoading(false)
	}

	// 마운트 시
	useEffect(() => {
		// getGameData("8ec5a02e253b4570b671ea4fcdb0daea")
		getData("레코스크",dataKey)
	}, [])

		// async function getGameData(key:string){
	// 	await axios.get('https://api.rawg.io/api/platforms?key='+key).then(
	// 		(response) => {
	// 			const data = response.data;
	// 			const results = data.results;
	// 			console.log(results)
	// 	})
	// }
	
	return (
		<div className="App">
			<Form/>
			{isLoading?"Loading":
				<div>
					<p>id : {summonerData.id}</p>
					<p>accountId : {summonerData.accountId}</p>
					<p>puuid : {summonerData.puuid}</p>
					<p>소환사명 : {summonerData.name}</p>
					<p>profileIconId : {summonerData.profileIconId}</p>
					<p>프로필 수정일 : {longToDate(summonerData.revisionDate)}</p>
					<p>summonerLevel : {summonerData.summonerLevel}</p>
					{allMatches}
				</div>
			}
		</div>
	);
}

export default App;
