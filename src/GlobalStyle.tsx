import {createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	body{
		margin: 0px;
		padding: 0px;
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
		color:#e84057;
	}
`

export default GlobalStyle;