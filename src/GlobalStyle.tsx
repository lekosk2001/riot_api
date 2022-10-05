import {createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

	:root {
		--color-90per:hsl(0,0%,90%);
		--color-80per:hsl(0,0%,80%);
		--color-60per:hsl(0,0%,60%);
		--color-40per:hsl(0,0%,40%);

		--color-blue-bg: #ecf2ff;
		--color-blue-3bg: #dae6ff;
		--color-blue: #5383e8;

		--color-red-bg: #fdecee;
		--color-red-3bg: #f9cacf;
		--color-red: #e84057;
		}

	body{
		margin: 0px;
		padding: 0px;
		background-color: hsl(0,0%,96%);
	};

	h1,h2,h3,h4,h5,h6,p{
		margin: 0px;
		padding: 0px;
	};

	h1{
		font-size: 72px;
	}

	.bold{
		font-weight: 800;
	}
	
	.color_red{
		color:var(--font-red);
	}
`

export default GlobalStyle;