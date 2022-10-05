import styled from "styled-components";

const AsideStyle = styled.aside`
    min-width: 220px;
    max-width: 220px;
    div{
        width: 100%;
        height: 100%;
        /* background-color: var(--color-red-bg); */
    }
`

type Props = {}

function Aside(props: Props) {
    return (
    <AsideStyle>
        {/* <div>aside</div> */}
    </AsideStyle>
    )
}

export default Aside