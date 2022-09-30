import styled from "styled-components";
import Match from "./Match"

type Props = {
    datakey:string;
    matches:any;
}

const MatchesStyle = styled.section`
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
`

export default function Matches (props: Props) {

	const allMatches=[]
	for (let i = 0; i < props.matches.length; i++) {
		allMatches.push(
			<Match
				matchId={props.matches[i]}
				dataKey={props.datakey}
				key={i}
			/>
		)
	}

    return (
        <MatchesStyle>
        {allMatches}
        </MatchesStyle>
    )
}